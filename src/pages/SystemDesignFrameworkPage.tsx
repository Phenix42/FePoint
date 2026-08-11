import { CheckCircle2, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';

const framework = [
  {
    title: 'Clarify requirements',
    prompt:
      'Who uses it, what are the essential read/write journeys, and what is explicitly out of scope?',
    output: 'Functional requirements and assumptions',
  },
  {
    title: 'Name quality goals',
    prompt:
      'What must feel fast, remain available, work offline, be accessible, or stay consistent?',
    output: 'Prioritised non-functional requirements',
  },
  {
    title: 'Estimate the shape',
    prompt:
      'How many users, items, updates, uploads, and concurrent connections affect the client?',
    output: 'Order-of-magnitude constraints',
  },
  {
    title: 'Define contracts and data',
    prompt:
      'Which entities have stable identity, and which task-oriented API operations does the UI need?',
    output: 'Data model and API contracts',
  },
  {
    title: 'Draw the high-level flow',
    prompt:
      'Place client, CDN, gateway, services, stores, queues, and real-time channels only where justified.',
    output: 'One readable architecture diagram',
  },
  {
    title: 'Deep-dive the frontend',
    prompt:
      'Explain routes, component boundaries, server versus URL versus form state, cache keys, and rendering.',
    output: 'Frontend architecture and ownership',
  },
  {
    title: 'Walk the critical journey',
    prompt:
      'Trace one request and one mutation through loading, optimistic feedback, success, and reconciliation.',
    output: 'End-to-end sequence and state transitions',
  },
  {
    title: 'Design failure and recovery',
    prompt:
      'What if requests are slow, duplicated, reordered, offline, unauthorised, or partially successful?',
    output: 'Failure modes and recovery actions',
  },
  {
    title: 'Find bottlenecks',
    prompt:
      'Check request waterfalls, main-thread work, large lists, cache invalidation, hot services, and fan-out.',
    output: 'Measured optimisation priorities',
  },
  {
    title: 'Close with trade-offs',
    prompt:
      'Name what your design optimises, what complexity it accepts, and what you would monitor next.',
    output: 'Defensible decisions and follow-ups',
  },
];

export default function SystemDesignFrameworkPage() {
  return (
    <>
      <Seo
        description="A repeatable ten-step frontend system design interview framework covering requirements, estimates, APIs, architecture, failure modes, bottlenecks, and trade-offs."
        path="/system-design/framework"
        title="System design interview framework"
      />
      <PageHero
        aside={
          <div className="surface-card min-w-48 rounded-2xl p-5">
            <MessageSquareText className="size-5 text-violet-500" />
            <strong className="mt-3 block text-2xl">10 steps</strong>
            <span className="text-xs text-[var(--text-faint)]">one coherent conversation</span>
          </div>
        }
        description="Use this sequence to turn an ambiguous product prompt into a clear, evidence-based architecture conversation."
        eyebrow="Reusable interview method"
        title="A framework you can use under pressure."
      />
      <main className="page-shell py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <Link className="text-sm font-bold text-brand-500 hover:underline" to="/system-design">
            ← System design overview
          </Link>
          <div className="mt-8 space-y-4">
            {framework.map((step, index) => (
              <article
                className="surface-card grid gap-4 rounded-2xl p-5 sm:grid-cols-[3rem_1fr_15rem] sm:items-center"
                key={step.title}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-brand-500/10 font-mono text-sm font-bold text-brand-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-bold">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{step.prompt}</p>
                </div>
                <div className="rounded-xl bg-[var(--surface-muted)] p-3 text-xs leading-5 text-[var(--text-faint)]">
                  <CheckCircle2 className="mb-2 size-4 text-emerald-500" />
                  {step.output}
                </div>
              </article>
            ))}
          </div>
          <section className="mt-10 rounded-2xl border border-brand-500/25 bg-brand-500/7 p-6">
            <h2 className="text-xl font-bold">A useful opening sentence</h2>
            <p className="mt-3 leading-7 text-[var(--text-soft)]">
              “I’ll clarify the primary user journey and quality goals, estimate the scale that
              changes our decisions, then sketch the high-level flow before deep-diving the
              frontend, failures, and trade-offs.”
            </p>
          </section>
          <section className="mt-6 surface-card rounded-2xl p-6">
            <h2 className="text-xl font-bold">Keep the conversation balanced</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                'Ask before assuming.',
                'State why a component exists.',
                'Separate server and client responsibility.',
                'Name failure and recovery together.',
                'Use numbers only when they change a decision.',
                'End with metrics that validate the design.',
              ].map((item) => (
                <li className="flex gap-2 text-sm text-[var(--text-soft)]" key={item}>
                  <CheckCircle2 className="size-4 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
