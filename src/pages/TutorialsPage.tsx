import { BookOpen, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { TutorialCard } from '@/components/tutorial/TutorialCard';
import { tutorialCategories, getTutorialsByCategory } from '@/data/tutorials';
import type { Difficulty } from '@/types/content';
import { cn } from '@/utils/cn';
import { filterTutorials, type TutorialSort } from '@/utils/tutorialFilters';

export default function TutorialsPage() {
  const { category } = useParams();
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');
  const [sort, setSort] = useState<TutorialSort>('popular');
  const [maxTime, setMaxTime] = useState<'All' | '10' | '15'>('All');
  const activeCategory = tutorialCategories.find((item) => item.slug === category);
  const categoryTutorials = getTutorialsByCategory(activeCategory ? category : undefined);

  const filtered = useMemo(
    () => filterTutorials(categoryTutorials, { query, difficulty, maxTime, sort }),
    [categoryTutorials, difficulty, maxTime, query, sort],
  );

  return (
    <>
      <Seo
        description={
          activeCategory?.description ??
          'Browse free frontend tutorials from browser fundamentals through React and Next.js.'
        }
        path={category ? '/tutorials/' + category : '/tutorials'}
        title={activeCategory ? activeCategory.label + ' tutorials' : 'Frontend tutorials'}
      />
      <PageHero
        aside={
          <div className="surface-card flex min-w-56 items-center gap-4 rounded-2xl p-5">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
              <BookOpen className="size-5" />
            </span>
            <span>
              <strong className="block text-2xl">{filtered.length}</strong>
              <small className="text-xs text-[var(--text-faint)]">matching tutorials</small>
            </span>
          </div>
        }
        description={
          activeCategory?.description ??
          'Build durable mental models with focused explanations, production examples, practice prompts, and interview-ready review.'
        }
        eyebrow={
          activeCategory ? activeCategory.label + ' learning path' : 'Free knowledge library'
        }
        title={
          activeCategory
            ? activeCategory.label + ' tutorials'
            : 'Learn the frontend, one clear concept at a time.'
        }
      />

      <div className="page-shell py-10 sm:py-14">
        <nav aria-label="Tutorial categories" className="flex gap-2 overflow-x-auto pb-3">
          <Link
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition',
              !activeCategory
                ? 'border-brand-500 bg-brand-500 text-[var(--bg)]'
                : 'bg-[var(--surface)] text-[var(--text-soft)] hover:border-brand-500/40',
            )}
            to="/tutorials"
          >
            All topics
          </Link>
          {tutorialCategories.map((item) => (
            <Link
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition',
                activeCategory?.slug === item.slug
                  ? 'border-brand-500 bg-brand-500 text-[var(--bg)]'
                  : 'bg-[var(--surface)] text-[var(--text-soft)] hover:border-brand-500/40',
              )}
              key={item.slug}
              to={'/tutorials/' + item.slug}
            >
              {item.label} <span className="ml-1 opacity-65">{item.count}</span>
            </Link>
          ))}
        </nav>

        <div className="surface-card mt-5 grid gap-3 rounded-2xl p-3 md:grid-cols-[1fr_auto_auto_auto]">
          <label className="flex h-11 items-center gap-2 rounded-xl border bg-[var(--surface-muted)] px-3">
            <Search className="size-4 text-[var(--text-faint)]" />
            <span className="sr-only">Filter tutorials</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-faint)]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter tutorials…"
              value={query}
            />
          </label>
          <Select
            icon={Filter}
            label="Difficulty"
            onChange={(value) => setDifficulty(value)}
            options={['All', 'Beginner', 'Intermediate', 'Advanced']}
            value={difficulty}
          />
          <Select
            icon={BookOpen}
            label="Reading time"
            onChange={(value) => setMaxTime(value)}
            options={['All', '10', '15']}
            renderLabel={(value) => (value === 'All' ? 'Any length' : '≤ ' + value + ' min')}
            value={maxTime}
          />
          <Select
            icon={SlidersHorizontal}
            label="Sort tutorials"
            onChange={(value) => setSort(value)}
            options={['popular', 'newest', 'shortest']}
            renderLabel={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
            value={sort}
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--text-soft)]">
            Showing <strong className="text-[var(--text)]">{filtered.length}</strong> tutorials
          </p>
          {(difficulty !== 'All' || maxTime !== 'All') && <Badge tone="blue">Filters active</Badge>}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.length ? (
            filtered.map((tutorial) => <TutorialCard key={tutorial.id} tutorial={tutorial} />)
          ) : (
            <EmptyState
              description="Try another category, remove a filter, or use a broader keyword."
              title="No tutorials match these filters"
            />
          )}
        </div>
      </div>
    </>
  );
}

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  renderLabel = (item) => item,
  icon: Icon,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
  renderLabel?: (value: T) => string;
  icon: typeof Filter;
}) {
  return (
    <label className="relative flex h-11 min-w-36 items-center gap-2 rounded-xl border bg-[var(--surface)] px-3">
      <Icon className="size-4 text-[var(--text-faint)]" />
      <span className="sr-only">{label}</span>
      <select
        className="min-w-0 flex-1 appearance-none bg-transparent pr-4 text-xs font-bold outline-none"
        onChange={(event) => onChange(event.target.value as T)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {renderLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
