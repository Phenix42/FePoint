import { Filter, MessageSquareText, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { companies } from '@/data/companies';
import { interviewQuestions, interviewTechnologies } from '@/data/interviewQuestions';
import type { Difficulty, InterviewQuestion } from '@/types/content';

export default function InterviewQuestionsPage() {
  const { technology: routeTechnology } = useParams();
  const routed = interviewTechnologies.find(
    (item) => item.toLowerCase().replace(/[^a-z0-9]+/g, '-') === routeTechnology,
  );
  const [query, setQuery] = useState('');
  const [technology, setTechnology] = useState(routed ?? 'All');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');
  const [company, setCompany] = useState('All');
  const [type, setType] = useState<InterviewQuestion['type'] | 'All'>('All');

  const filtered = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return interviewQuestions.filter(
      (question) =>
        (!cleanQuery ||
          question.question.toLowerCase().includes(cleanQuery) ||
          question.tags.some((tag) => tag.includes(cleanQuery))) &&
        (technology === 'All' || question.technology === technology) &&
        (difficulty === 'All' || question.difficulty === difficulty) &&
        (company === 'All' || question.companies.includes(company)) &&
        (type === 'All' || question.type === type),
    );
  }, [company, difficulty, query, technology, type]);

  return (
    <>
      <Seo
        description="Frontend interview questions with concise answers, detailed explanations, common traps, code, and follow-ups."
        path={routeTechnology ? '/interview-questions/' + routeTechnology : '/interview-questions'}
        title={routed ? routed + ' interview questions' : 'Frontend interview questions'}
      />
      <PageHero
        aside={
          <div className="surface-card min-w-52 rounded-2xl p-5">
            <MessageSquareText className="size-5 text-brand-500" />
            <strong className="mt-3 block text-2xl">1,000+</strong>
            <span className="text-xs text-[var(--text-faint)]">questions in the growing bank</span>
          </div>
        }
        description="Review crisp answers, then open the reasoning, examples, common traps, and follow-up questions that reveal real depth."
        eyebrow="Interview preparation"
        title="Practise explaining, not just remembering."
      />
      <div className="page-shell py-10 sm:py-14">
        <div className="surface-card grid gap-3 rounded-2xl p-3 md:grid-cols-2 xl:grid-cols-[1.4fr_repeat(4,1fr)]">
          <label className="flex h-11 items-center gap-2 rounded-xl border bg-[var(--surface-muted)] px-3">
            <Search className="size-4 text-[var(--text-faint)]" />
            <span className="sr-only">Search questions</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-faint)]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions…"
              value={query}
            />
          </label>
          <QuestionSelect
            label="Technology"
            onChange={setTechnology}
            options={['All', ...interviewTechnologies]}
            value={technology}
          />
          <QuestionSelect
            label="Difficulty"
            onChange={(value) => setDifficulty(value as Difficulty | 'All')}
            options={['All', 'Beginner', 'Intermediate', 'Advanced']}
            value={difficulty}
          />
          <QuestionSelect
            label="Company"
            onChange={setCompany}
            options={['All', ...companies.map((item) => item.name)]}
            value={company}
          />
          <QuestionSelect
            label="Question type"
            onChange={(value) => setType(value as InterviewQuestion['type'] | 'All')}
            options={['All', 'Conceptual', 'Output', 'Coding', 'Scenario', 'Behavioural']}
            value={type}
          />
        </div>
        <p className="mt-6 text-sm font-semibold text-[var(--text-soft)]">
          Showing <strong className="text-[var(--text)]">{filtered.length}</strong> questions
        </p>
        <div className="mt-5 space-y-4">
          {filtered.length ? (
            filtered.map((question) => <QuestionCard key={question.id} question={question} />)
          ) : (
            <EmptyState
              description="Remove one of the filters or search for a broader concept."
              title="No questions match this combination"
            />
          )}
        </div>
      </div>
    </>
  );
}

function QuestionSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex h-11 items-center gap-2 rounded-xl border px-3">
      <Filter className="size-4 shrink-0 text-[var(--text-faint)]" />
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="min-w-0 flex-1 bg-transparent text-xs font-bold outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
