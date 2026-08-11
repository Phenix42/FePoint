import {
  ArrowRight,
  Braces,
  ChartNoAxesColumnIncreasing,
  Code2,
  Network,
  Route,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { DsaNav } from '@/components/dsa/DsaNav';
import { dsaPatterns } from '@/content/dsa/dsaPatterns';
import { dsaProblems } from '@/content/dsa/dsaProblems';
import { dsaTopics } from '@/content/dsa/dsaTopics';
import { useAppStore } from '@/store/useAppStore';

const topicGroups = [
  {
    kind: 'fundamental',
    title: 'Start with the mental model',
    description: 'Complexity and recursion before pattern memorisation.',
  },
  {
    kind: 'data-structure',
    title: 'Choose how data is organised',
    description: 'Arrays, maps, stacks, queues, lists, trees, graphs, and tries.',
  },
  {
    kind: 'algorithm',
    title: 'Choose how work moves',
    description: 'Sorting, searching, and structured traversal.',
  },
] as const;

export default function DsaHomePage() {
  const progress = useAppStore((state) => state.dsaProgress);
  const attempted = Object.values(progress).filter((status) => status !== 'not-started').length;
  const solved = Object.values(progress).filter(
    (status) => status === 'solved-independently' || status === 'solved-with-hints',
  ).length;
  return (
    <>
      <Seo
        description="A beginner-first DSA roadmap for frontend developers with data structures, algorithms, patterns, worked JavaScript solutions, and local progress."
        path="/dsa"
        title="DSA for Frontend"
      />
      <PageHero
        aside={
          <div className="surface-card min-w-56 rounded-2xl p-5">
            <ChartNoAxesColumnIncreasing className="size-5 text-brand-500" />
            <strong className="mt-3 block text-2xl">
              {solved} / {dsaProblems.length}
            </strong>
            <span className="text-xs text-[var(--text-faint)]">
              problems solved · {attempted} attempted
            </span>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
              <div
                className="h-full bg-brand-500"
                style={{ width: `${(solved / dsaProblems.length) * 100}%` }}
              />
            </div>
          </div>
        }
        description="Learn the small set of structures and problem shapes that repeatedly appear in frontend interviews and real interface work."
        eyebrow="JavaScript-first · pattern-led"
        title="DSA for Frontend, without the mystery."
      />
      <div className="page-shell py-10 sm:py-14">
        <DsaNav />
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            className="surface-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-brand-500/40"
            to="/dsa/roadmap"
          >
            <Route className="size-6 text-brand-500" />
            <h2 className="mt-5 text-xl font-bold">A staged roadmap</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              Move from complexity and arrays through ten recognition patterns.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-500">
              See the path <ArrowRight className="size-3" />
            </span>
          </Link>
          <Link
            className="surface-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-brand-500/40"
            to="/dsa/patterns"
          >
            <Network className="size-6 text-violet-500" />
            <h2 className="mt-5 text-xl font-bold">{dsaPatterns.length} patterns</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              Learn prompt signals, invariants, visual steps, and reusable templates.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-500">
              Learn patterns <ArrowRight className="size-3" />
            </span>
          </Link>
          <Link
            className="surface-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-brand-500/40"
            to="/dsa/problems"
          >
            <Code2 className="size-6 text-cyan-500" />
            <h2 className="mt-5 text-xl font-bold">{dsaProblems.length} worked problems</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              Brute-force reasoning, optimisation, dry runs, solutions, and frontend connections.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-500">
              Start practising <ArrowRight className="size-3" />
            </span>
          </Link>
        </section>
        <section className="mt-14">
          <span className="eyebrow">Foundations</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Build the vocabulary before the shortcuts.
          </h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {topicGroups.map((group) => (
              <div className="surface-card rounded-2xl p-5" key={group.kind}>
                <Braces className="size-5 text-brand-500" />
                <h3 className="mt-4 font-bold">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                  {group.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {dsaTopics
                    .filter((topic) => topic.kind === group.kind)
                    .map((topic) => (
                      <Link
                        className="rounded-full border px-3 py-1.5 text-xs font-semibold hover:border-brand-500 hover:text-brand-500"
                        key={topic.id}
                        to={`/dsa/${group.kind === 'algorithm' ? 'algorithms' : 'data-structures'}/${topic.slug}`}
                      >
                        {topic.title}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-14 rounded-3xl border border-brand-500/25 bg-brand-500/7 p-6 sm:p-8">
          <span className="eyebrow">A frontend lens</span>
          <h2 className="mt-3 text-2xl font-extrabold">You already use data structures.</h2>
          <p className="mt-3 max-w-3xl leading-7 text-[var(--text-soft)]">
            A component tree is a tree. Route dependencies form a graph. A browser history behaves
            like stacks. Entity caches use maps. Autocomplete benefits from prefix trees. DSA gives
            you names and trade-offs for reasoning you already do.
          </p>
        </section>
      </div>
    </>
  );
}
