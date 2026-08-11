import { ArrowUpRight, Search, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { resources } from '@/data/resources';

export default function ResourcesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = useMemo(
    () => ['All', ...new Set(resources.map((resource) => resource.category))],
    [],
  );
  const filtered = resources.filter(
    (resource) =>
      (category === 'All' || resource.category === category) &&
      (!query.trim() ||
        resource.name.toLowerCase().includes(query.toLowerCase()) ||
        resource.tags.some((tag) => tag.includes(query.toLowerCase()))),
  );
  return (
    <>
      <Seo
        description="Curated frontend documentation, tools, libraries, testing, accessibility, performance, and design resources."
        path="/resources"
        title="Frontend resources"
      />
      <PageHero
        aside={
          <span className="surface-card grid size-24 place-items-center rounded-3xl">
            <Wrench className="size-8 text-brand-500" />
          </span>
        }
        description="A focused directory of trustworthy documentation, browser tools, testing utilities, accessibility references, and design resources."
        eyebrow="Curated toolbox"
        title="Useful links without the tab avalanche."
      />
      <div className="page-shell py-10 sm:py-14">
        <div className="surface-card grid gap-3 rounded-2xl p-3 md:grid-cols-[1fr_16rem]">
          <label className="flex h-11 items-center gap-2 rounded-xl border bg-[var(--surface-muted)] px-3">
            <Search className="size-4 text-[var(--text-faint)]" />
            <span className="sr-only">Search resources</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources…"
              value={query}
            />
          </label>
          <label className="flex h-11 items-center rounded-xl border px-3">
            <span className="sr-only">Resource category</span>
            <select
              className="w-full bg-transparent text-sm font-semibold outline-none"
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((resource) => (
            <a
              className="surface-card group flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-brand-500/35 hover:shadow-xl hover:shadow-brand-500/5"
              href={resource.url}
              key={resource.id}
              rel="noreferrer"
              target="_blank"
            >
              <div className="flex items-start justify-between gap-3">
                <Badge tone="blue">{resource.category}</Badge>
                <ArrowUpRight className="size-4 text-[var(--text-faint)] transition group-hover:text-brand-500" />
              </div>
              <h2 className="mt-4 text-lg font-bold">{resource.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-[var(--text-soft)]">
                {resource.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Badge tone={resource.pricing === 'Free' ? 'green' : 'orange'}>
                  {resource.pricing}
                </Badge>
                {resource.tags.slice(0, 2).map((tag) => (
                  <span className="text-[0.68rem] font-semibold text-[var(--text-faint)]" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
