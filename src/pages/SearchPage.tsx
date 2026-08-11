import { ArrowRight, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useAppStore } from '@/store/useAppStore';
import type { ContentType } from '@/types/content';
import { searchContent } from '@/utils/search';
import { cn } from '@/utils/cn';

const filters: Array<{ label: string; value: ContentType | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Tutorials', value: 'tutorial' },
  { label: 'Questions', value: 'question' },
  { label: 'Practice', value: 'practice' },
  { label: 'Challenges', value: 'challenge' },
  { label: 'System design', value: 'system-design' },
  { label: 'Companies', value: 'company' },
  { label: 'Resources', value: 'resource' },
  { label: 'Glossary', value: 'glossary' },
  { label: 'DSA topics', value: 'dsa-topic' },
  { label: 'DSA patterns', value: 'dsa-pattern' },
  { label: 'DSA problems', value: 'dsa-problem' },
];

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [type, setType] = useState<ContentType | 'all'>('all');
  const debouncedQuery = useDebouncedValue(query);
  const addSearch = useAppStore((state) => state.addSearch);
  const history = useAppStore((state) => state.searchHistory);
  const clearSearchHistory = useAppStore((state) => state.clearSearchHistory);
  const results = useMemo(() => searchContent(debouncedQuery, type), [debouncedQuery, type]);

  const submit = () => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    addSearch(cleanQuery);
    setParams({ q: cleanQuery });
  };

  return (
    <>
      <Seo
        description="Search tutorials, interview questions, challenges, case studies, company guides, and resources."
        path={'/search' + (debouncedQuery ? '?q=' + encodeURIComponent(debouncedQuery) : '')}
        title="Search"
      />
      <PageHero
        description="Search every tutorial, question, challenge, company guide, case study, and curated resource in one place."
        eyebrow="Global discovery"
        title="Find the concept you need, right now."
      />
      <div className="page-shell py-10 sm:py-14">
        <form
          className="glass-card mx-auto flex max-w-3xl items-center gap-3 rounded-2xl p-2"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Search className="ml-3 size-5 shrink-0 text-[var(--text-faint)]" />
          <label className="sr-only" htmlFor="search-page-input">
            Search all content
          </label>
          <input
            autoComplete="off"
            className="h-12 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[var(--text-faint)]"
            id="search-page-input"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try ‘event loop’ or ‘autocomplete’"
            value={query}
          />
          <Button type="submit">Search</Button>
        </form>

        <div className="mx-auto mt-5 flex max-w-3xl gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              aria-pressed={type === filter.value}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition',
                type === filter.value
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'bg-[var(--surface)] text-[var(--text-soft)] hover:border-brand-500/40',
              )}
              key={filter.value}
              onClick={() => setType(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>

        {!debouncedQuery.trim() && history.length > 0 && (
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">Recent searches</h2>
              <button
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-faint)] hover:text-red-500"
                onClick={clearSearchHistory}
                type="button"
              >
                <Trash2 className="size-3.5" /> Clear
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {history.map((item) => (
                <button
                  className="rounded-full bg-[var(--surface-muted)] px-3 py-2 text-xs font-semibold hover:text-brand-500"
                  key={item}
                  onClick={() => {
                    setQuery(item);
                    setParams({ q: item });
                  }}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--text-soft)]">
              {debouncedQuery.trim() ? (
                <>
                  <strong className="text-[var(--text)]">{results.length}</strong> results for “
                  {debouncedQuery}”
                </>
              ) : (
                'Popular content'
              )}
            </p>
          </div>
          <div className="space-y-3">
            {results.length ? (
              results.map((result) => {
                const external = result.url.startsWith('http');
                const content = (
                  <>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-bold">
                          <HighlightedText query={debouncedQuery} text={result.title} />
                        </span>
                        <Badge tone="blue">{result.type.replace('-', ' ')}</Badge>
                      </span>
                      <span className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-soft)]">
                        <HighlightedText query={debouncedQuery} text={result.description} />
                      </span>
                      <span className="mt-2 block text-xs font-semibold text-[var(--text-faint)]">
                        {result.category}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-[var(--text-faint)] transition group-hover:translate-x-1 group-hover:text-brand-500" />
                  </>
                );
                const classes =
                  'surface-card group flex items-start gap-4 rounded-2xl p-5 transition hover:border-brand-500/35';
                return external ? (
                  <a
                    className={classes}
                    href={result.url}
                    key={result.id}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {content}
                  </a>
                ) : (
                  <Link className={classes} key={result.id} to={result.url}>
                    {content}
                  </Link>
                );
              })
            ) : (
              <EmptyState
                description="Try a shorter keyword, another technology, or remove the category filter."
                title="No close matches found"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return text;
  const escaped = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp('(' + escaped + ')', 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === cleanQuery.toLowerCase() ? (
      <mark className="rounded bg-amber-300/25 px-0.5 text-inherit" key={index}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
