import { BookOpenText, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { Button } from '@/components/common/Button';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { glossaryTerms } from '@/content/glossary/glossaryTerms';

export default function GlossaryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const selectedSlug = searchParams.get('term');
  const categories = useMemo(
    () => [...new Set(glossaryTerms.map((term) => term.category))].sort(),
    [],
  );
  const filtered = useMemo(() => {
    const normalised = query.trim().toLowerCase();
    return glossaryTerms.filter(
      (term) =>
        (category === 'All' || term.category === category) &&
        (!normalised ||
          `${term.term} ${term.simpleDefinition} ${term.definition}`
            .toLowerCase()
            .includes(normalised)),
    );
  }, [category, query]);
  const selected = glossaryTerms.find((term) => term.slug === selectedSlug);

  return (
    <>
      <Seo
        description="A beginner-friendly frontend glossary with simple definitions, technical detail, analogies, and related vocabulary."
        path="/glossary"
        title="Frontend glossary"
      />
      <PageHero
        aside={
          <div className="surface-card min-w-48 rounded-2xl p-5">
            <BookOpenText className="size-5 text-brand-500" />
            <strong className="mt-3 block text-2xl">{glossaryTerms.length}</strong>
            <span className="text-xs text-[var(--text-faint)]">connected terms</span>
          </div>
        }
        description="Open unfamiliar words without leaving your learning path. Every definition includes a plain-language version and an analogy."
        eyebrow="No jargon left behind"
        title="Frontend words, explained like a human."
      />
      <div className="page-shell py-10 sm:py-14">
        <div className="surface-card sticky top-20 z-20 grid gap-3 rounded-2xl p-3 sm:grid-cols-[1fr_15rem]">
          <label className="flex h-11 items-center gap-2 rounded-xl border px-3">
            <Search className="size-4 text-[var(--text-faint)]" />
            <span className="sr-only">Search glossary</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a word or definition…"
              value={query}
            />
          </label>
          <select
            aria-label="Glossary category"
            className="h-11 rounded-xl border bg-[var(--surface)] px-3 text-sm font-semibold outline-none"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            <option>All</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[var(--text-faint)]">Showing {filtered.length} terms</p>
          <div className="hidden gap-1 sm:flex">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <a
                className="grid size-7 place-items-center rounded-md text-[0.65rem] font-bold text-[var(--text-faint)] hover:bg-brand-500/10 hover:text-brand-500"
                href={`#letter-${letter}`}
                key={letter}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((term, index) => {
            const showLetter =
              index === 0 ||
              filtered[index - 1]?.term[0]?.toUpperCase() !== term.term[0]?.toUpperCase();
            return (
              <article
                className="surface-card rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-brand-500/35"
                id={showLetter ? `letter-${term.term[0]?.toUpperCase()}` : undefined}
                key={term.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge tone="blue">{term.category}</Badge>
                    <h2 className="mt-3 text-xl font-bold">{term.term}</h2>
                  </div>
                  <BookmarkButton
                    contentId={term.id}
                    description={term.simpleDefinition}
                    title={term.term}
                    type="glossary"
                    url={`/glossary?term=${term.slug}`}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                  {term.simpleDefinition}
                </p>
                <button
                  className="mt-4 text-xs font-bold text-brand-500 hover:underline"
                  onClick={() => setSearchParams({ term: term.slug })}
                  type="button"
                >
                  Definition and analogy →
                </button>
              </article>
            );
          })}
        </div>
        {!filtered.length && (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold">No matching term</h2>
            <p className="mt-2 text-sm text-[var(--text-faint)]">Try a broader word or category.</p>
          </div>
        )}
      </div>

      {selected && (
        <div
          aria-labelledby="glossary-dialog-title"
          aria-modal="true"
          className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm"
          role="dialog"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSearchParams({});
          }}
        >
          <div className="glass-card max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge tone="blue">{selected.category}</Badge>
                <h2 className="mt-3 text-3xl font-extrabold" id="glossary-dialog-title">
                  {selected.term}
                </h2>
              </div>
              <Button
                aria-label="Close definition"
                onClick={() => setSearchParams({})}
                size="sm"
                variant="ghost"
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="mt-6 rounded-2xl bg-brand-500/8 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-500">
                In simple words
              </p>
              <p className="mt-2 leading-7">{selected.simpleDefinition}</p>
            </div>
            <section className="mt-6">
              <h3 className="font-bold">Developer definition</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                {selected.definition}
              </p>
            </section>
            <section className="mt-6">
              <h3 className="font-bold">Remember it like this</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">{selected.analogy}</p>
            </section>
            <section className="mt-6 border-t pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                Related vocabulary
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.relatedTerms.map((term) => (
                  <button
                    className="rounded-full border px-3 py-1.5 text-xs font-semibold hover:border-brand-500 hover:text-brand-500"
                    key={term}
                    onClick={() => {
                      const related = glossaryTerms.find((item) => item.term === term);
                      if (related) setSearchParams({ term: related.slug });
                    }}
                    type="button"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
