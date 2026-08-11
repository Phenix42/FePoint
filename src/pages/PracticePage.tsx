import {
  ArrowLeft,
  ArrowRight,
  BookmarkCheck,
  Brain,
  Check,
  Clock3,
  Code2,
  Eye,
  Filter,
  Lightbulb,
  RotateCcw,
  Shuffle,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { Button } from '@/components/common/Button';
import { CodeBlock } from '@/components/common/CodeBlock';
import { CompletionButton } from '@/components/common/CompletionButton';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import {
  practiceCategories,
  practiceQuestionTypes,
  practiceQuestions,
} from '@/content/practice/practiceQuestionBank';
import { codingProblems } from '@/data/practiceQuestions';
import { tutorials } from '@/data/tutorials';
import { useAppStore } from '@/store/useAppStore';
import type { Difficulty, PracticeQuestion } from '@/types/content';

type PracticeMode =
  'Browse' | 'Random' | 'Topic test' | 'Daily 10' | 'Timed test' | 'Wrong answers' | 'Revision';
type SolvedFilter = 'All' | 'Unanswered' | 'Correct' | 'Wrong';

const modes: Array<{ id: PracticeMode; icon: typeof Brain; description: string }> = [
  { id: 'Browse', icon: Brain, description: 'Use filters and move at your pace' },
  { id: 'Random', icon: Shuffle, description: 'Jump between mixed concepts' },
  { id: 'Topic test', icon: Filter, description: 'A 20-question filtered assessment' },
  { id: 'Daily 10', icon: Sparkles, description: 'A repeatable set for today' },
  { id: 'Timed test', icon: Clock3, description: '15 questions in 15 minutes' },
  { id: 'Wrong answers', icon: RotateCcw, description: 'Retry your latest misses' },
  { id: 'Revision', icon: BookmarkCheck, description: 'Items in your review queue' },
];

const sameAnswers = (selected: string[], correct: string[]) =>
  selected.length === correct.length &&
  [...selected].sort().every((answer, index) => answer === [...correct].sort()[index]);

const dateSeed = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  return Math.floor((today.getTime() - start.getTime()) / 86_400_000);
};

const formatTimer = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export default function PracticePage() {
  const { technology: routeTechnology } = useParams();
  const routeCategory = practiceCategories.find(
    (item) =>
      item.toLowerCase().replace(/[^a-z]/g, '') ===
      routeTechnology?.toLowerCase().replace(/[^a-z]/g, ''),
  );
  const [mode, setMode] = useState<PracticeMode>('Browse');
  const [category, setCategory] = useState(routeCategory ?? 'All');
  const [subcategory, setSubcategory] = useState('All');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');
  const [experience, setExperience] = useState<PracticeQuestion['experienceLevel'] | 'All'>('All');
  const [questionType, setQuestionType] = useState<PracticeQuestion['questionType'] | 'All'>('All');
  const [solved, setSolved] = useState<SolvedFilter>('All');
  const [company, setCompany] = useState('All');
  const [bookmarkFilter, setBookmarkFilter] = useState('All');
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const attempts = useAppStore((state) => state.practiceAttempts);
  const bookmarks = useAppStore((state) => state.bookmarks);
  const revisionQueue = useAppStore((state) => state.revisionQueue);
  const recordPracticeAnswer = useAppStore((state) => state.recordPracticeAnswer);
  const toggleRevision = useAppStore((state) => state.toggleRevision);

  const subcategories = useMemo(
    () =>
      [
        ...new Set(
          practiceQuestions
            .filter((question) => category === 'All' || question.category === category)
            .map((question) => question.subcategory),
        ),
      ].sort(),
    [category],
  );
  const companies = useMemo(
    () => [...new Set(practiceQuestions.flatMap((question) => question.companies))].sort(),
    [],
  );

  const filteredQuestions = useMemo(() => {
    const revisionIds = new Set(
      revisionQueue.filter((item) => item.contentType === 'practice').map((item) => item.contentId),
    );
    const bookmarkedIds = new Set(
      bookmarks.filter((item) => item.type === 'practice').map((item) => item.contentId),
    );
    return practiceQuestions.filter((question) => {
      const attempt = attempts[question.id];
      const matchesSolved =
        solved === 'All' ||
        (solved === 'Unanswered' && !attempt) ||
        (solved === 'Correct' && attempt?.lastResult === 'correct') ||
        (solved === 'Wrong' && attempt?.lastResult === 'incorrect');
      const matchesMode =
        (mode !== 'Wrong answers' || attempt?.lastResult === 'incorrect') &&
        (mode !== 'Revision' || revisionIds.has(question.id));
      const matchesBookmark =
        bookmarkFilter === 'All' ||
        (bookmarkFilter === 'Bookmarked' && bookmarkedIds.has(question.id)) ||
        (bookmarkFilter === 'Not bookmarked' && !bookmarkedIds.has(question.id));
      return (
        (category === 'All' || question.category === category) &&
        (subcategory === 'All' || question.subcategory === subcategory) &&
        (difficulty === 'All' || question.difficulty === difficulty) &&
        (experience === 'All' || question.experienceLevel === experience) &&
        (questionType === 'All' || question.questionType === questionType) &&
        (company === 'All' || question.companies.includes(company)) &&
        matchesSolved &&
        matchesMode &&
        matchesBookmark
      );
    });
  }, [
    attempts,
    bookmarkFilter,
    bookmarks,
    category,
    company,
    difficulty,
    experience,
    mode,
    questionType,
    revisionQueue,
    solved,
    subcategory,
  ]);

  const questions = useMemo(() => {
    if (mode === 'Daily 10' && filteredQuestions.length) {
      const start = dateSeed() % filteredQuestions.length;
      return [...filteredQuestions.slice(start), ...filteredQuestions.slice(0, start)].slice(0, 10);
    }
    if (mode === 'Timed test') return filteredQuestions.slice(0, 15);
    if (mode === 'Topic test') return filteredQuestions.slice(0, 20);
    return filteredQuestions;
  }, [filteredQuestions, mode]);

  const activeIndex = questions.length ? index % questions.length : 0;
  const question = questions[activeIndex];
  const relatedTutorial = question?.relatedTutorialSlug
    ? tutorials.find((tutorial) => tutorial.slug === question.relatedTutorialSlug)
    : undefined;
  const result =
    question && revealed ? sameAnswers(selectedAnswers, question.correctAnswers) : undefined;
  const solvedCount = Object.keys(attempts).length;
  const correctCount = Object.values(attempts).filter(
    (attempt) => attempt.lastResult === 'correct',
  ).length;

  const resetQuestionState = () => {
    setIndex(0);
    setSelectedAnswers([]);
    setRevealed(false);
    setHintVisible(false);
  };

  useEffect(() => {
    if (mode !== 'Timed test') return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  const go = (nextIndex: number) => {
    setIndex((nextIndex + questions.length) % questions.length);
    setSelectedAnswers([]);
    setRevealed(false);
    setHintVisible(false);
  };

  const selectAnswer = (answerId: string) => {
    if (!question || revealed) return;
    if (question.questionType === 'Multiple answer') {
      setSelectedAnswers((current) =>
        current.includes(answerId)
          ? current.filter((answer) => answer !== answerId)
          : [...current, answerId],
      );
      return;
    }
    setSelectedAnswers([answerId]);
  };

  const checkAnswer = () => {
    if (!question || !selectedAnswers.length || revealed) return;
    const correct = sameAnswers(selectedAnswers, question.correctAnswers);
    setRevealed(true);
    recordPracticeAnswer(question.id, correct);
  };

  const selectClass =
    'h-11 min-w-0 rounded-xl border bg-[var(--surface)] px-3 text-sm font-semibold outline-none focus:border-brand-500';

  return (
    <>
      <Seo
        description="Practise 1,000+ frontend questions with topic tests, daily sets, timed tests, filters, explanations, and private local progress."
        path={routeTechnology ? '/practice/' + routeTechnology : '/practice'}
        title="Frontend practice"
      />
      <PageHero
        aside={
          <div className="surface-card min-w-56 rounded-2xl p-5">
            <Code2 className="size-5 text-violet-500" />
            <strong className="mt-3 block text-2xl">{practiceQuestions.length}</strong>
            <span className="text-xs text-[var(--text-faint)]">validated practice questions</span>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
              <div
                className="h-full bg-brand-500"
                style={{
                  width: `${Math.min(100, (solvedCount / practiceQuestions.length) * 100)}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-[var(--text-faint)]">
              {solvedCount} attempted · {correctCount} currently correct
            </p>
          </div>
        }
        description="Build recall with immediate feedback, simple and detailed explanations, daily review, and local-only analytics."
        eyebrow="Active recall"
        title="Turn frontend knowledge into confident answers."
      />

      <div className="page-shell py-10 sm:py-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modes.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={`surface-card rounded-2xl p-4 text-left transition hover:-translate-y-0.5 hover:border-brand-500/40 ${mode === item.id ? 'border-brand-500 bg-brand-500/6' : ''}`}
                key={item.id}
                onClick={() => {
                  setMode(item.id);
                  if (item.id === 'Timed test') setSecondsLeft(15 * 60);
                  resetQuestionState();
                }}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <strong className="block text-sm">{item.id}</strong>
                    <span className="text-xs text-[var(--text-faint)]">{item.description}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="surface-card mt-6 rounded-2xl p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold">
            <Filter className="size-4 text-brand-500" /> Focus filters
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              aria-label="Category"
              className={selectClass}
              onChange={(event) => {
                setCategory(event.target.value);
                setSubcategory('All');
                resetQuestionState();
              }}
              value={category}
            >
              <option>All</option>
              {practiceCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              aria-label="Company"
              className={selectClass}
              onChange={(event) => {
                setCompany(event.target.value);
                resetQuestionState();
              }}
              value={company}
            >
              <option>All</option>
              {companies.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              aria-label="Bookmark status"
              className={selectClass}
              onChange={(event) => {
                setBookmarkFilter(event.target.value);
                resetQuestionState();
              }}
              value={bookmarkFilter}
            >
              {['All', 'Bookmarked', 'Not bookmarked'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              aria-label="Subtopic"
              className={selectClass}
              onChange={(event) => {
                setSubcategory(event.target.value);
                resetQuestionState();
              }}
              value={subcategory}
            >
              <option>All</option>
              {subcategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              aria-label="Difficulty"
              className={selectClass}
              onChange={(event) => {
                setDifficulty(event.target.value as Difficulty | 'All');
                resetQuestionState();
              }}
              value={difficulty}
            >
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              aria-label="Experience level"
              className={selectClass}
              onChange={(event) => {
                setExperience(event.target.value as PracticeQuestion['experienceLevel'] | 'All');
                resetQuestionState();
              }}
              value={experience}
            >
              {['All', 'Foundation', 'Junior', 'Mid-level', 'Senior'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              aria-label="Question type"
              className={selectClass}
              onChange={(event) => {
                setQuestionType(event.target.value as PracticeQuestion['questionType'] | 'All');
                resetQuestionState();
              }}
              value={questionType}
            >
              <option>All</option>
              {practiceQuestionTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              aria-label="Attempt status"
              className={selectClass}
              onChange={(event) => {
                setSolved(event.target.value as SolvedFilter);
                resetQuestionState();
              }}
              value={solved}
            >
              {['All', 'Unanswered', 'Correct', 'Wrong'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {mode === 'Timed test' && (
          <div
            className={`mt-6 flex items-center justify-between rounded-2xl border px-5 py-3 ${secondsLeft < 120 ? 'border-red-500/40 bg-red-500/8 text-red-500' : 'bg-[var(--surface)]'}`}
          >
            <span className="text-sm font-semibold">15-question focused test</span>
            <strong className="font-mono text-lg">{formatTimer(secondsLeft)}</strong>
          </div>
        )}

        {question ? (
          <div className="mx-auto mt-8 max-w-4xl">
            <div className="surface-card overflow-hidden rounded-3xl">
              <div className="border-b px-5 py-4 sm:px-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="blue">{question.category}</Badge>
                  <DifficultyBadge difficulty={question.difficulty} />
                  <Badge>{question.questionType}</Badge>
                  <span className="ml-auto text-xs font-semibold text-[var(--text-faint)]">
                    {activeIndex + 1} / {questions.length}
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-500">
                  {question.subcategory} · {question.experienceLevel}
                </p>
                <h2 className="mt-3 text-xl font-bold leading-8 sm:text-2xl">
                  {question.question}
                </h2>
                {question.code && (
                  <CodeBlock
                    code={question.code}
                    explanation="Trace the snippet before selecting an answer."
                    language="javascript"
                    title="Question snippet"
                  />
                )}
                <div className="mt-6 grid gap-3">
                  {question.options?.map((answer) => {
                    const selected = selectedAnswers.includes(answer.id);
                    const correct = revealed && question.correctAnswers.includes(answer.id);
                    const incorrect =
                      revealed && selected && !question.correctAnswers.includes(answer.id);
                    return (
                      <button
                        aria-pressed={selected}
                        className={`flex min-h-12 items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm leading-6 transition ${correct ? 'border-emerald-500/40 bg-emerald-500/10' : incorrect ? 'border-red-500/40 bg-red-500/10' : selected ? 'border-brand-500 bg-brand-500/8' : 'hover:border-brand-500/35'}`}
                        disabled={revealed}
                        key={answer.id}
                        onClick={() => selectAnswer(answer.id)}
                        type="button"
                      >
                        <span
                          className={`mt-0.5 grid size-5 shrink-0 place-items-center border ${question.questionType === 'Multiple answer' ? 'rounded-md' : 'rounded-full'}`}
                        >
                          {correct && <Check className="size-3 text-emerald-500" />}
                          {incorrect && <X className="size-3 text-red-500" />}
                        </span>
                        <span>{answer.label}</span>
                      </button>
                    );
                  })}
                </div>

                {!revealed ? (
                  <div className="mt-7 flex flex-wrap gap-2">
                    <Button
                      disabled={
                        !selectedAnswers.length || (mode === 'Timed test' && secondsLeft === 0)
                      }
                      onClick={checkAnswer}
                    >
                      <Check className="size-4" /> Check answer
                    </Button>
                    <Button onClick={() => setHintVisible((value) => !value)} variant="secondary">
                      <Lightbulb className="size-4" /> Hint
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`mt-7 rounded-2xl border p-5 ${result ? 'border-emerald-500/30 bg-emerald-500/7' : 'border-red-500/30 bg-red-500/7'}`}
                    aria-live="polite"
                  >
                    <p
                      className={`text-xs font-bold uppercase tracking-wider ${result ? 'text-emerald-500' : 'text-red-500'}`}
                    >
                      {result
                        ? 'Correct — good reasoning'
                        : 'Not yet — add this to your mental model'}
                    </p>
                    <p className="mt-3 font-semibold leading-7">{question.simpleExplanation}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                      {question.detailedExplanation}
                    </p>
                    {!result && (
                      <div className="mt-4 border-t pt-4">
                        <strong className="text-sm">Why the common answer fails</strong>
                        <p className="mt-1 text-sm leading-6 text-[var(--text-soft)]">
                          {question.whyWrong}
                        </p>
                      </div>
                    )}
                    {relatedTutorial && (
                      <Link
                        className="mt-4 inline-flex text-sm font-bold text-brand-500 hover:underline"
                        to={`/tutorials/${relatedTutorial.category}/${relatedTutorial.slug}`}
                      >
                        Review the related lesson →
                      </Link>
                    )}
                  </div>
                )}
                {hintVisible && !revealed && (
                  <p className="mt-4 rounded-xl bg-brand-500/8 p-4 text-sm leading-6">
                    <strong>Hint:</strong> {question.hint}
                  </p>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-2 border-t pt-6">
                  <CompletionButton contentId={question.id} type="practice" />
                  <BookmarkButton
                    contentId={question.id}
                    description={question.detailedExplanation}
                    showLabel
                    title={question.title}
                    type="practice"
                    url="/practice"
                  />
                  <Button onClick={() => toggleRevision(question.id, 'practice')} variant="ghost">
                    <BookmarkCheck className="size-4" />{' '}
                    {revisionQueue.some(
                      (item) => item.contentType === 'practice' && item.contentId === question.id,
                    )
                      ? 'In revision'
                      : 'Revise later'}
                  </Button>
                  <Button
                    className="ml-auto"
                    onClick={() => go(Math.floor(Math.random() * questions.length))}
                    variant="ghost"
                  >
                    <Shuffle className="size-4" /> Random
                  </Button>
                </div>
              </div>
              <div className="flex justify-between border-t bg-[var(--surface-muted)]/50 p-3">
                <Button onClick={() => go(activeIndex - 1)} variant="ghost">
                  <ArrowLeft className="size-4" /> Previous
                </Button>
                <Button onClick={() => go(activeIndex + 1)} variant="ghost">
                  Next <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center">
            <Eye className="mx-auto size-7 text-[var(--text-faint)]" />
            <h2 className="mt-4 text-xl font-bold">No questions in this view yet</h2>
            <p className="mt-2 text-sm text-[var(--text-faint)]">
              Adjust a filter, or answer a few questions before opening a review mode.
            </p>
          </div>
        )}

        {(category === 'All' || category === 'JavaScript' || category === 'DSA') && (
          <section className="mt-16 border-t pt-12">
            <span className="eyebrow">Coding problems</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              JavaScript implementation practice
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-soft)]">
              Solve in your editor, then compare the target complexity and follow-up decisions.
            </p>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {codingProblems.map((problem, problemIndex) => (
                <details className="surface-card rounded-2xl p-5" key={problem.id}>
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-brand-500">
                        {String(problemIndex + 1).padStart(2, '0')}
                      </span>
                      <strong className="flex-1">{problem.title}</strong>
                      <DifficultyBadge difficulty={problem.difficulty} />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                      {problem.statement}
                    </p>
                  </summary>
                  <div className="mt-5 border-t pt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                      Hints
                    </p>
                    {problem.hints.map((hint) => (
                      <p className="mt-2 text-sm text-[var(--text-soft)]" key={hint}>
                        • {hint}
                      </p>
                    ))}
                    <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                      Complexity target
                    </p>
                    <p className="mt-2 text-sm">
                      Time {problem.timeComplexity} · Space {problem.spaceComplexity}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
