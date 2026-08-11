import { ArrowRight, Boxes, Layers3, Network, Search, Workflow } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { SystemDesignCard } from '@/components/system-design/SystemDesignCard';
import { systemDesignCases, systemDesignTopics } from '@/data/systemDesign';

const icons = [Boxes, Layers3, Network, Workflow];

export default function SystemDesignPage() {
  const [query, setQuery] = useState('');
  const filtered = systemDesignCases.filter(
    (item) =>
      !query.trim() ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <Seo
        description="Learn frontend system design through architecture topics and complete product case studies."
        path="/system-design"
        title="Frontend system design"
      />
      <PageHero
        aside={
          <div className="surface-card relative grid h-32 w-64 place-items-center overflow-hidden rounded-2xl">
            <div className="soft-grid absolute inset-0 opacity-50" />
            <div className="relative flex items-center gap-3">
              <span className="rounded-lg border bg-[var(--surface)] px-3 py-2 text-xs font-bold">
                UI
              </span>
              <span className="h-px w-5 bg-brand-500" />
              <span className="rounded-lg border bg-[var(--surface)] px-3 py-2 text-xs font-bold">
                State
              </span>
              <span className="h-px w-5 bg-violet-500" />
              <span className="rounded-lg border bg-[var(--surface)] px-3 py-2 text-xs font-bold">
                API
              </span>
            </div>
          </div>
        }
        description="Learn to turn ambiguous product requirements into clear component boundaries, state ownership, API contracts, caching, performance, accessibility, and resilience."
        eyebrow="Architecture and trade-offs"
        title="Design frontend systems that stay understandable at scale."
      />
      <div className="page-shell py-12 sm:py-16">
        <section className="grid gap-4 md:grid-cols-3">
          <Link
            className="surface-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-brand-500/40"
            to="/system-design/fundamentals"
          >
            <Network className="size-6 text-cyan-500" />
            <h2 className="mt-5 text-xl font-bold">System fundamentals</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              Client/server, networks, scale, caches, data, queues, reliability, security, and
              frontend architecture.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-500">
              Build the vocabulary <ArrowRight className="size-3" />
            </span>
          </Link>
          <Link
            className="surface-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-brand-500/40"
            to="/system-design/framework"
          >
            <Workflow className="size-6 text-violet-500" />
            <h2 className="mt-5 text-xl font-bold">Interview framework</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              A repeatable ten-step conversation from requirements through failure modes and
              trade-offs.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-500">
              Learn the framework <ArrowRight className="size-3" />
            </span>
          </Link>
          <a
            className="surface-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-brand-500/40"
            href="#case-studies"
          >
            <Boxes className="size-6 text-brand-500" />
            <h2 className="mt-5 text-xl font-bold">{systemDesignCases.length} case studies</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              Practise product requirements, contracts, state, performance, accessibility, security,
              and resilience.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-500">
              Choose a product <ArrowRight className="size-3" />
            </span>
          </a>
        </section>
        <section className="mt-16">
          <span className="eyebrow">Core architecture topics</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Build your design vocabulary
          </h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {systemDesignTopics.map((topic, index) => {
              const Icon = icons[index % icons.length] ?? Boxes;
              return (
                <div className="surface-card flex items-center gap-3 rounded-2xl p-4" key={topic}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-500">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm font-semibold">{topic}</span>
                </div>
              );
            })}
          </div>
        </section>
        <section className="mt-16 border-t pt-12" id="case-studies">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Product case studies</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                Practise the complete conversation
              </h2>
            </div>
            <label className="flex h-11 w-full items-center gap-2 rounded-xl border bg-[var(--surface)] px-3 sm:w-72">
              <Search className="size-4 text-[var(--text-faint)]" />
              <span className="sr-only">Filter case studies</span>
              <input
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter case studies…"
                value={query}
              />
            </label>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((caseStudy) => (
              <SystemDesignCard caseStudy={caseStudy} key={caseStudy.id} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
