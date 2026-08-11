import { CodeXml, Filter, Timer } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { ChallengeCard } from '@/components/machine-coding/ChallengeCard';
import { machineCodingChallenges } from '@/data/machineCoding';
import type { Difficulty, MachineCodingChallenge } from '@/types/content';

export default function MachineCodingPage() {
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');
  const [technology, setTechnology] = useState<MachineCodingChallenge['technology'] | 'All'>('All');
  const [kind, setKind] = useState<MachineCodingChallenge['kind'] | 'All'>('All');
  const [time, setTime] = useState<'All' | '30' | '60' | '90'>('All');
  const filtered = useMemo(
    () =>
      machineCodingChallenges.filter(
        (challenge) =>
          (difficulty === 'All' || challenge.difficulty === difficulty) &&
          (technology === 'All' || challenge.technology === technology) &&
          (kind === 'All' || challenge.kind === kind) &&
          (time === 'All' || challenge.estimatedMinutes === Number(time)),
      ),
    [difficulty, kind, technology, time],
  );

  return (
    <>
      <Seo
        description="Practise 30, 60, and 90-minute frontend machine-coding challenges with requirements, hints, solutions, and evaluation rubrics."
        path="/machine-coding"
        title="Machine-coding challenges"
      />
      <PageHero
        aside={
          <div className="surface-card flex min-w-56 items-center gap-4 rounded-2xl p-5">
            <Timer className="size-6 text-violet-500" />
            <span>
              <strong className="block text-2xl">30 / 60 / 90</strong>
              <small className="text-xs text-[var(--text-faint)]">minute interview modes</small>
            </span>
          </div>
        }
        description="Build realistic frontend interfaces under a local timer. Work from requirements, handle edge cases, then review the rubric and trade-offs."
        eyebrow="Build under pressure"
        title="Machine-coding challenges that feel like the real round."
      />
      <div className="page-shell py-10 sm:py-14">
        <div className="surface-card grid gap-3 rounded-2xl p-3 sm:grid-cols-2 xl:grid-cols-4">
          <FilterSelect
            label="Difficulty"
            onChange={(value) => setDifficulty(value as Difficulty | 'All')}
            options={['All', 'Beginner', 'Intermediate', 'Advanced']}
            value={difficulty}
          />
          <FilterSelect
            label="Technology"
            onChange={(value) =>
              setTechnology(value as MachineCodingChallenge['technology'] | 'All')
            }
            options={['All', 'React', 'JavaScript', 'TypeScript']}
            value={technology}
          />
          <FilterSelect
            label="Challenge type"
            onChange={(value) => setKind(value as MachineCodingChallenge['kind'] | 'All')}
            options={['All', 'UI component', 'Full application']}
            value={kind}
          />
          <FilterSelect
            label="Time"
            onChange={(value) => setTime(value as 'All' | '30' | '60' | '90')}
            options={['All', '30', '60', '90']}
            value={time}
          />
        </div>
        <div className="mt-7 flex items-center gap-3">
          <CodeXml className="size-5 text-violet-500" />
          <p className="text-sm font-semibold text-[var(--text-soft)]">
            <strong className="text-[var(--text)]">{filtered.length}</strong> challenges
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.length ? (
            filtered.map((challenge) => <ChallengeCard challenge={challenge} key={challenge.id} />)
          ) : (
            <EmptyState
              description="Try a different duration, technology, or difficulty."
              title="No challenges match these filters"
            />
          )}
        </div>
      </div>
    </>
  );
}

function FilterSelect({
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
      <Filter className="size-4 text-[var(--text-faint)]" />
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
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
