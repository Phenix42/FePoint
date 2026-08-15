import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Copy,
  ExternalLink,
  KeyRound,
  Lightbulb,
  ListChecks,
  Menu,
  Network,
  Sparkles,
} from 'lucide-react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { buttonStyles } from '@/components/common/Button';
import { CodeBlock } from '@/components/common/CodeBlock';
import { CompletionButton } from '@/components/common/CompletionButton';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Seo } from '@/components/common/Seo';
import { siteConfig } from '@/config/site';
import {
  getAdjacentTutorials,
  getTutorial,
  getTutorialPosition,
  getTutorialsByCategory,
} from '@/data/tutorials';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useAppStore } from '@/store/useAppStore';
import type { Tutorial, TutorialInterviewQuestion } from '@/types/content';
import { cn } from '@/utils/cn';

const sectionLinks = [
  ['definition', 'Definition'],
  ['explanation', 'Explanation'],
  ['example', 'Example'],
  ['real-world-example', 'Real-world example'],
  ['visual-explanation', 'Visual explanation'],
  ['key-points', 'Key points'],
  ['common-mistakes', 'Common mistakes'],
  ['interview-questions', 'Interview questions'],
] as const;

export default function TutorialDetailPage() {
  const { category, topic } = useParams();
  const tutorial = getTutorial(category, topic);
  const setReadingProgress = useAppStore((state) => state.setReadingProgress);
  const readingProgress = useAppStore((state) =>
    tutorial ? (state.readingProgress[tutorial.id] ?? 0) : 0,
  );

  useRecentlyViewed(
    tutorial
      ? {
          type: 'tutorial',
          title: tutorial.title,
          description: tutorial.description,
          url: '/tutorials/' + tutorial.category + '/' + tutorial.slug,
        }
      : undefined,
  );

  useEffect(() => {
    if (!tutorial) return undefined;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 100;
        setReadingProgress(tutorial.id, progress);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, [setReadingProgress, tutorial]);

  if (!tutorial) {
    return (
      <div className="page-shell py-24 text-center">
        <span className="eyebrow">Content not found</span>
        <h1 className="mt-4 text-4xl font-extrabold">This lesson is no longer in the course.</h1>
        <p className="mt-3 text-[var(--text-soft)]">
          Open the current curriculum to continue from the right place.
        </p>
        <Link className={buttonStyles({ className: 'mt-7' })} to="/tutorials">
          Browse the course
        </Link>
      </div>
    );
  }

  const href = '/tutorials/' + tutorial.category + '/' + tutorial.slug;
  const categoryTutorials = getTutorialsByCategory(tutorial.category);
  const { previous, next } = getAdjacentTutorials(tutorial);
  const position = getTutorialPosition(tutorial);

  return (
    <>
      <Seo description={tutorial.description} path={href} title={tutorial.title + ' tutorial'} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: tutorial.title,
            description: tutorial.description,
            dateModified: tutorial.updatedAt,
            proficiencyLevel: tutorial.difficulty,
            mainEntityOfPage: new URL(href, siteConfig.url).toString(),
            publisher: { '@type': 'Organization', name: siteConfig.name },
          })}
        </script>
      </Helmet>

      <div className="sticky top-16 z-40 h-0.5 bg-[var(--surface-muted)]">
        <div
          className="h-full bg-gradient-to-r from-[#685cf6] via-violet-500 to-cyan-400 transition-[width]"
          style={{ width: readingProgress + '%' }}
        />
      </div>

      <div className="border-b bg-[var(--surface)]">
        <div className="page-shell py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-[var(--text-faint)]"
          >
            <Link className="hover:text-[#685cf6]" to="/tutorials">
              Tutorials
            </Link>
            <ChevronRight aria-hidden="true" className="size-3" />
            <Link className="hover:text-[#685cf6]" to={'/tutorials/' + tutorial.category}>
              {tutorial.categoryLabel}
            </Link>
            <ChevronRight aria-hidden="true" className="size-3" />
            <span className="truncate text-[var(--text-soft)]">{tutorial.title}</span>
          </nav>
        </div>
      </div>

      <div className="page-shell grid items-start gap-8 py-8 xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
        <aside className="xl:sticky xl:top-24">
          <details className="surface-card rounded-2xl xl:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 p-4 text-sm font-bold">
              <Menu aria-hidden="true" className="size-4" /> Lessons in {tutorial.categoryLabel}
            </summary>
            <LessonNavigation currentId={tutorial.id} tutorials={categoryTutorials} />
          </details>
          <div className="hidden xl:block">
            <p className="eyebrow">{tutorial.categoryLabel} path</p>
            <h2 className="mt-2 font-bold">Course lessons</h2>
            <div className="mt-4 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 scrollbar-thin">
              <LessonNavigation currentId={tutorial.id} tutorials={categoryTutorials} />
            </div>
          </div>
        </aside>

        <article className="min-w-0">
          <header>
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">{tutorial.categoryLabel}</Badge>
              <DifficultyBadge difficulty={tutorial.difficulty} />
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
              {tutorial.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--text-soft)]">{tutorial.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[var(--text-faint)]">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 aria-hidden="true" className="size-3.5" /> {tutorial.estimatedReadTime} min
                read
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="size-3.5" /> Updated{' '}
                {new Date(tutorial.updatedAt).toLocaleDateString('en', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#5549e5] dark:text-[#aaa4ff]">
                <BookOpen aria-hidden="true" className="size-3.5" /> {tutorial.categoryLabel} •{' '}
                {position.categoryIndex} of {position.categoryTotal}
              </span>
            </div>
          </header>

          <section className="mt-9 rounded-2xl border border-[#685cf6]/20 bg-[#685cf6]/6 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <Sparkles aria-hidden="true" className="size-4 text-[#685cf6]" /> By the end of this
              lesson
            </h2>
            <ul className="mt-4 grid gap-2">
              {tutorial.learningObjectives.map((objective) => (
                <li
                  className="flex gap-2 text-sm leading-6 text-[var(--text-soft)]"
                  key={objective}
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-[#685cf6]"
                  />{' '}
                  {objective}
                </li>
              ))}
            </ul>
          </section>

          <LessonSection icon={Lightbulb} id="definition" label="01" title="Definition">
            <MarkdownText>{tutorial.definition}</MarkdownText>
          </LessonSection>

          <LessonSection icon={Network} id="explanation" label="02" title="Explanation">
            <ExplanationBlock title="What is it?">{tutorial.explanation.what}</ExplanationBlock>
            <ExplanationBlock title="Why do we need it?">
              {tutorial.explanation.why}
            </ExplanationBlock>
            <div className="mt-8">
              <h3 className="text-lg font-bold">How does it work?</h3>
              <ol className="mt-4 grid gap-3">
                {tutorial.explanation.how.map((step, index) => (
                  <li className="surface-card flex gap-3 rounded-xl p-4" key={step}>
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#685cf6]/10 font-mono text-[0.65rem] font-bold text-[#685cf6]">
                      {index + 1}
                    </span>
                    <MarkdownText className="text-sm leading-6">{step}</MarkdownText>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold">Where is it used?</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {tutorial.explanation.where.map((useCase) => (
                  <li
                    className="flex gap-2 rounded-xl bg-[var(--surface-muted)] px-3 py-2.5 text-sm leading-6 text-[var(--text-soft)]"
                    key={useCase}
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-[#685cf6]"
                    />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </LessonSection>

          <LessonSection icon={ListChecks} id="example" label="03" title="Example">
            <p className="text-sm leading-7 text-[var(--text-soft)]">
              {tutorial.example.explanation}
            </p>
            <CodeBlock
              code={tutorial.example.code}
              explanation={tutorial.example.explanation}
              language={tutorial.example.language}
              title={tutorial.example.title}
            />
            <div className="space-y-3">
              {tutorial.example.walkthrough.map((item) => (
                <div
                  className="grid gap-2 rounded-xl border p-4 sm:grid-cols-[minmax(8rem,.45fr)_1fr]"
                  key={item.code}
                >
                  <code className="self-start rounded-lg bg-[var(--surface-muted)] px-2.5 py-2 text-xs text-[var(--text)]">
                    {item.code}
                  </code>
                  <p className="text-sm leading-6 text-[var(--text-soft)]">{item.explanation}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-[var(--text)] p-4 text-[var(--bg)]">
              <strong className="text-xs uppercase tracking-wider">Output / result</strong>
              <pre className="mt-2 whitespace-pre-wrap font-mono text-sm leading-6">
                {tutorial.example.output}
              </pre>
            </div>
          </LessonSection>

          <LessonSection
            icon={Sparkles}
            id="real-world-example"
            label="04"
            title="Real-World Example"
          >
            <h3 className="text-lg font-bold">{tutorial.realWorldExample.title}</h3>
            <p className="mt-3 leading-7 text-[var(--text-soft)]">
              {tutorial.realWorldExample.description}
            </p>
            <ol className="mt-5 space-y-3">
              {tutorial.realWorldExample.steps.map((step, index) => (
                <li className="flex gap-3 text-sm leading-6 text-[var(--text-soft)]" key={step}>
                  <strong className="text-[#685cf6]">{index + 1}.</strong>
                  {step}
                </li>
              ))}
            </ol>
          </LessonSection>

          {tutorial.visualFlow && (
            <LessonSection
              icon={Network}
              id="visual-explanation"
              label="05"
              title="Visual Explanation"
            >
              <div className="mx-auto max-w-xl">
                {tutorial.visualFlow.map((step, index) => (
                  <div className="flex flex-col items-center" key={step}>
                    <div className="surface-card w-full rounded-xl px-4 py-3 text-center text-sm font-semibold">
                      {step}
                    </div>
                    {index < tutorial.visualFlow!.length - 1 && (
                      <ArrowDown
                        aria-hidden="true"
                        className="my-2 size-4 text-[var(--text-faint)]"
                      />
                    )}
                  </div>
                ))}
              </div>
            </LessonSection>
          )}

          <LessonSection icon={KeyRound} id="key-points" label="06" title="Key Points">
            <ul className="grid gap-3">
              {tutorial.keyPoints.map((point) => (
                <li className="flex gap-3 text-sm leading-6 text-[var(--text-soft)]" key={point}>
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-[#685cf6]"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </LessonSection>

          {tutorial.commonMistakes.length > 0 && (
            <LessonSection
              icon={CircleAlert}
              id="common-mistakes"
              label="07"
              title="Common Mistakes"
            >
              <div className="space-y-4">
                {tutorial.commonMistakes.map((mistake) => (
                  <article
                    className="rounded-xl border border-red-500/20 bg-red-500/5 p-4"
                    key={mistake.title}
                  >
                    <h3 className="font-bold">{mistake.title}</h3>
                    {mistake.code && (
                      <pre className="mt-3 overflow-x-auto rounded-lg bg-[var(--code)] p-3 font-mono text-xs leading-5 text-slate-200">
                        <code>{mistake.code}</code>
                      </pre>
                    )}
                    <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                      {mistake.explanation}
                    </p>
                  </article>
                ))}
              </div>
            </LessonSection>
          )}

          <section className="mt-12 border-t pt-10" id="interview-questions">
            <span className="eyebrow">Final review</span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Interview Questions</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              Answer each question aloud before opening the concise interview-ready answer.
            </p>
            <div className="mt-6 space-y-3">
              {tutorial.interviewQuestions.map((question) => (
                <InterviewQuestion key={question.question} question={question} />
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 border-y py-6 sm:flex-row sm:items-center sm:justify-between">
            <BookmarkButton
              contentId={tutorial.id}
              description={tutorial.description}
              showLabel
              title={tutorial.title}
              type="tutorial"
              url={href}
            />
            <CompletionButton contentId={tutorial.id} type="tutorial" />
          </div>

          <div className="mt-6 rounded-2xl bg-[var(--surface-muted)] p-4">
            <div className="flex items-center justify-between gap-3 text-xs font-bold">
              <span>
                {tutorial.categoryLabel} • {position.categoryIndex} of {position.categoryTotal}
              </span>
              <span className="text-[var(--text-faint)]">
                Course {position.courseIndex} of {position.courseTotal}
              </span>
            </div>
            <ProgressBar
              className="mt-3"
              value={(position.courseIndex / position.courseTotal) * 100}
            />
          </div>

          <nav aria-label="Lesson pagination" className="grid gap-3 py-7 sm:grid-cols-2">
            {previous ? <LessonLink direction="previous" tutorial={previous} /> : <span />}
            {next && <LessonLink direction="next" tutorial={next} />}
          </nav>
        </article>

        <aside className="hidden xl:sticky xl:top-24 xl:block">
          <p className="eyebrow">On this page</p>
          <nav aria-label="Table of contents" className="mt-4 border-l pl-4">
            {sectionLinks
              .filter(([id]) => {
                if (id === 'visual-explanation') return Boolean(tutorial.visualFlow);
                if (id === 'common-mistakes') return tutorial.commonMistakes.length > 0;
                return true;
              })
              .map(([id, label]) => (
                <a
                  className="block py-1.5 text-xs leading-5 text-[var(--text-soft)] hover:text-[#685cf6]"
                  href={'#' + id}
                  key={id}
                >
                  {label}
                </a>
              ))}
          </nav>
          <div className="mt-6">
            <ProgressBar label="Reading progress" value={readingProgress} />
          </div>
          <button
            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-soft)] hover:text-[#685cf6]"
            onClick={() => void navigator.clipboard.writeText(window.location.href)}
            type="button"
          >
            <Copy aria-hidden="true" className="size-3.5" /> Copy lesson link
          </button>
          <div className="mt-7 border-t pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
              Prerequisites
            </p>
            {tutorial.prerequisites.map((item) => (
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]" key={item}>
                {item}
              </p>
            ))}
          </div>
          <div className="mt-7 border-t pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
              Official references
            </p>
            <ul className="mt-2 space-y-2">
              {tutorial.sources.map((source) => (
                <li key={source.url}>
                  <a
                    className="inline-flex gap-1 text-xs leading-5 text-[var(--text-soft)] hover:text-[#685cf6]"
                    href={source.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {source.label}{' '}
                    <ExternalLink aria-hidden="true" className="mt-1 size-3 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

function LessonSection({
  id,
  label,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  title: string;
  icon: typeof Lightbulb;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 scroll-mt-24 border-t pt-10" id={id}>
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-[#685cf6]/10 text-[#685cf6]">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <span>
          <span className="block font-mono text-[0.62rem] font-bold tracking-wider text-[var(--text-faint)]">
            {label}
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        </span>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ExplanationBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="mt-7 first:mt-0">
      <h3 className="text-lg font-bold">{title}</h3>
      <MarkdownText className="mt-3">{children}</MarkdownText>
    </div>
  );
}

function MarkdownText({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn('prose-lesson text-base', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

function InterviewQuestion({ question }: { question: TutorialInterviewQuestion }) {
  const tone =
    question.level === 'Basic' ? 'green' : question.level === 'Intermediate' ? 'orange' : 'purple';

  return (
    <article className="surface-card overflow-hidden rounded-2xl">
      <div className="p-5">
        <Badge tone={tone}>{question.level}</Badge>
        <h3 className="mt-3 font-bold leading-6">{question.question}</h3>
      </div>
      <details className="group border-t">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-bold text-[#5549e5] transition hover:bg-[#685cf6]/6 dark:text-[#aaa4ff]">
          <span className="group-open:hidden">View Answer</span>
          <span className="hidden group-open:inline">Hide Answer</span>
          <ChevronRight
            aria-hidden="true"
            className="size-4 transition-transform group-open:rotate-90"
          />
        </summary>
        <div className="border-t bg-[var(--surface-muted)]/45 px-5 py-5">
          <p className="text-sm leading-7 text-[var(--text-soft)]">{question.answer}</p>
          {question.deepDive && (
            <details className="mt-4 rounded-xl border bg-[var(--surface)]">
              <summary className="cursor-pointer px-4 py-3 text-xs font-bold">Deep Dive</summary>
              <p className="border-t px-4 py-3 text-xs leading-6 text-[var(--text-soft)]">
                {question.deepDive}
              </p>
            </details>
          )}
        </div>
      </details>
    </article>
  );
}

function LessonNavigation({
  tutorials: items,
  currentId,
}: {
  tutorials: Tutorial[];
  currentId: string;
}) {
  const completed = useAppStore((state) => state.completed);
  return (
    <nav aria-label="Course lessons" className="space-y-1 p-2 xl:p-0">
      {items.map((item, itemIndex) => {
        const active = item.id === currentId;
        const done = Boolean(completed['tutorial:' + item.id]);
        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-xs leading-5 transition',
              active
                ? 'bg-[#685cf6]/10 font-bold text-[#5549e5] dark:text-[#aaa4ff]'
                : 'text-[var(--text-soft)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]',
            )}
            key={item.id}
            to={'/tutorials/' + item.category + '/' + item.slug}
          >
            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border text-[0.55rem]">
              {done ? <CheckCircle2 className="size-3 text-emerald-500" /> : itemIndex + 1}
            </span>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

function LessonLink({
  tutorial,
  direction,
}: {
  tutorial: Tutorial;
  direction: 'previous' | 'next';
}) {
  const previous = direction === 'previous';
  return (
    <Link
      className={cn(
        'surface-card group rounded-2xl p-4 transition hover:border-[#685cf6]/35',
        !previous && 'text-right',
      )}
      to={'/tutorials/' + tutorial.category + '/' + tutorial.slug}
    >
      <span
        className={cn(
          'flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]',
          !previous && 'justify-end',
        )}
      >
        {previous && <ArrowLeft aria-hidden="true" className="size-3.5" />}
        {previous ? 'Previous topic' : 'Next topic'}
        {!previous && <ArrowRight aria-hidden="true" className="size-3.5" />}
      </span>
      <strong className="mt-2 block group-hover:text-[#685cf6]">{tutorial.title}</strong>
      <span className="mt-1 block text-xs text-[var(--text-faint)]">{tutorial.categoryLabel}</span>
    </Link>
  );
}
