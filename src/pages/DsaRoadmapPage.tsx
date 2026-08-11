import { CheckCircle2, Circle, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { DsaNav } from '@/components/dsa/DsaNav';

const stages = [
  {
    title: 'Complexity and JavaScript mechanics',
    weeks: '2–3 days',
    items: ['Big O vocabulary', 'Arrays and strings', 'Map and Set', 'Mutation vs new values'],
    href: '/dsa/data-structures/big-o',
  },
  {
    title: 'Linear structures',
    weeks: '4–5 days',
    items: ['Stacks and queues', 'Linked lists', 'Pointer invariants', 'Recursion basics'],
    href: '/dsa/data-structures/stacks-and-queues',
  },
  {
    title: 'Trees and graphs',
    weeks: '1 week',
    items: ['Tree vocabulary', 'DFS and BFS', 'Visited tracking', 'Shortest unweighted path'],
    href: '/dsa/data-structures/trees',
  },
  {
    title: 'Recognition patterns',
    weeks: '2 weeks',
    items: ['Two pointers', 'Sliding window', 'Hashing and stack', 'Search and intervals'],
    href: '/dsa/patterns',
  },
  {
    title: 'Interview practice loop',
    weeks: 'Ongoing',
    items: [
      'Clarify the contract',
      'State brute force',
      'Name the invariant',
      'Dry-run and test edges',
    ],
    href: '/dsa/problems',
  },
];

export default function DsaRoadmapPage() {
  return (
    <>
      <Seo
        description="A staged DSA roadmap for frontend developers, from complexity basics through patterns and interview practice."
        path="/dsa/roadmap"
        title="DSA roadmap"
      />
      <PageHero
        description="A five-stage path that builds the mental model before asking you to recognise and optimise interview problems."
        eyebrow="Learn in dependency order"
        title="Your frontend DSA roadmap."
      />
      <div className="page-shell py-10 sm:py-14">
        <DsaNav />
        <div className="mx-auto mt-10 max-w-4xl">
          {stages.map((stage, index) => (
            <article
              className="relative grid gap-4 pb-10 pl-12 sm:grid-cols-[1fr_auto]"
              key={stage.title}
            >
              {index < stages.length - 1 && (
                <div className="absolute left-[1.18rem] top-10 h-[calc(100%-1rem)] w-px bg-[var(--border-strong)]" />
              )}
              <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border-2 border-brand-500 bg-[var(--surface)] font-mono text-sm font-bold text-brand-500">
                {index + 1}
              </span>
              <div className="surface-card rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold">{stage.title}</h2>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--text-faint)]">
                    <Clock3 className="size-3" /> {stage.weeks}
                  </span>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {stage.items.map((item) => (
                    <li
                      className="flex items-center gap-2 text-sm text-[var(--text-soft)]"
                      key={item}
                    >
                      <Circle className="size-3 text-brand-500" /> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-500 hover:underline"
                  to={stage.href}
                >
                  Start this stage <CheckCircle2 className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto max-w-3xl rounded-2xl bg-[var(--surface-muted)] p-5 text-sm leading-7 text-[var(--text-soft)]">
          <strong className="text-[var(--text)]">Suggested practice loop:</strong> spend 20 minutes
          understanding a pattern, 25 minutes attempting one problem without a solution, then 15
          minutes comparing invariants and recording what needs revision.
        </div>
      </div>
    </>
  );
}
