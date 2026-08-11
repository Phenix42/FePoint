import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { DsaNav } from '@/components/dsa/DsaNav';
import { dsaPatterns } from '@/content/dsa/dsaPatterns';
import { dsaProblems } from '@/content/dsa/dsaProblems';
import { useAppStore } from '@/store/useAppStore';
import type { Difficulty, DsaProgressStatus } from '@/types/content';

export default function DsaProblemsPage() {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');
  const [pattern, setPattern] = useState('All');
  const [status, setStatus] = useState<DsaProgressStatus | 'All'>('All');
  const progress = useAppStore((state) => state.dsaProgress);
  const filtered = useMemo(
    () =>
      dsaProblems.filter(
        (problem) =>
          (!query ||
            `${problem.title} ${problem.summary} ${problem.dataStructure}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (difficulty === 'All' || problem.difficulty === difficulty) &&
          (pattern === 'All' || problem.patternSlug === pattern) &&
          (status === 'All' || (progress[problem.id] ?? 'not-started') === status),
      ),
    [difficulty, pattern, progress, query, status],
  );
  const selectClass =
    'h-11 rounded-xl border bg-[var(--surface)] px-3 text-sm font-semibold outline-none';
  return (
    <>
      <Seo
        description="Twenty-five worked DSA problems with JavaScript and TypeScript solutions, dry runs, complexity, edge cases, and local status tracking."
        path="/dsa/problems"
        title="DSA problem library"
      />
      <PageHero
        description="Attempt first, reveal only what you need, and record whether you solved independently, with hints, or need revision."
        eyebrow="25 worked examples"
        title="A focused frontend DSA problem library."
      />
      <div className="page-shell py-10 sm:py-14">
        <DsaNav />
        <div className="surface-card mt-7 grid gap-3 rounded-2xl p-3 md:grid-cols-[1fr_repeat(3,13rem)]">
          <label className="flex h-11 items-center gap-2 rounded-xl border px-3">
            <Search className="size-4 text-[var(--text-faint)]" />
            <input
              aria-label="Search DSA problems"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title or structure…"
              value={query}
            />
          </label>
          <select
            aria-label="Difficulty"
            className={selectClass}
            onChange={(event) => setDifficulty(event.target.value as Difficulty | 'All')}
            value={difficulty}
          >
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            aria-label="Pattern"
            className={selectClass}
            onChange={(event) => setPattern(event.target.value)}
            value={pattern}
          >
            <option>All</option>
            {dsaPatterns.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
          <select
            aria-label="Progress status"
            className={selectClass}
            onChange={(event) => setStatus(event.target.value as DsaProgressStatus | 'All')}
            value={status}
          >
            {[
              'All',
              'not-started',
              'attempted',
              'solved-independently',
              'solved-with-hints',
              'reviewed',
              'needs-revision',
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <p className="mt-5 text-sm text-[var(--text-faint)]">
          {filtered.length} of {dsaProblems.length} problems
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {filtered.map((problem, index) => {
            const current = progress[problem.id] ?? 'not-started';
            return (
              <Link
                className="surface-card group rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-brand-500/40"
                key={problem.id}
                to={`/dsa/problems/${problem.slug}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brand-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <DifficultyBadge difficulty={problem.difficulty} />
                  <Badge tone="blue">{problem.dataStructure}</Badge>
                  <span
                    className={`ml-auto rounded-full px-2.5 py-1 text-[0.65rem] font-bold ${current === 'needs-revision' ? 'bg-red-500/10 text-red-500' : current.startsWith('solved') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[var(--surface-muted)] text-[var(--text-faint)]'}`}
                  >
                    {current.replaceAll('-', ' ')}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold group-hover:text-brand-500">
                  {problem.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{problem.summary}</p>
                <div className="mt-4 flex items-center justify-between border-t pt-4 text-xs">
                  <span className="text-[var(--text-faint)]">{problem.collection}</span>
                  <strong className="text-brand-500">Open worked solution →</strong>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
