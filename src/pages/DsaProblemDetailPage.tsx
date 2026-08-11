import {
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  MonitorSmartphone,
  RotateCcw,
  TriangleAlert,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { CodeBlock } from '@/components/common/CodeBlock';
import { Seo } from '@/components/common/Seo';
import { getDsaProblem } from '@/content/dsa/dsaProblems';
import { useAppStore } from '@/store/useAppStore';
import type { DsaProgressStatus } from '@/types/content';

const statuses: DsaProgressStatus[] = [
  'not-started',
  'attempted',
  'solved-independently',
  'solved-with-hints',
  'reviewed',
  'needs-revision',
];

export default function DsaProblemDetailPage() {
  const { problemSlug } = useParams();
  const problem = getDsaProblem(problemSlug);
  const status = useAppStore((state) =>
    problem ? (state.dsaProgress[problem.id] ?? 'not-started') : 'not-started',
  );
  const setStatus = useAppStore((state) => state.setDsaStatus);
  if (!problem)
    return (
      <div className="page-shell py-24 text-center">
        <h1 className="text-3xl font-extrabold">Problem not found</h1>
        <Link className="mt-5 inline-flex text-brand-500" to="/dsa/problems">
          Back to problems
        </Link>
      </div>
    );
  const href = `/dsa/problems/${problem.slug}`;
  return (
    <>
      <Seo description={problem.summary} path={href} title={`${problem.title} solution`} />
      <div className="border-b bg-[var(--surface)]">
        <div className="page-shell flex flex-wrap items-center justify-between gap-3 py-4">
          <Link
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-soft)] hover:text-brand-500"
            to="/dsa/problems"
          >
            <ArrowLeft className="size-4" /> Problem library
          </Link>
          <label className="flex items-center gap-2 text-xs font-bold">
            Your status
            <select
              className="h-9 rounded-xl border bg-[var(--surface)] px-3 text-xs outline-none"
              onChange={(event) => setStatus(problem.id, event.target.value as DsaProgressStatus)}
              value={status}
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item.replaceAll('-', ' ')}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <main className="page-shell py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2">
            <DifficultyBadge difficulty={problem.difficulty} />
            <Badge tone="blue">{problem.dataStructure}</Badge>
            <Badge tone="purple">{problem.patternSlug.replaceAll('-', ' ')}</Badge>
            <Badge>{problem.collection}</Badge>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight">{problem.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--text-soft)]">
            {problem.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <BookmarkButton
              contentId={problem.id}
              description={problem.summary}
              showLabel
              title={problem.title}
              type="dsa-problem"
              url={href}
            />
            {problem.externalPracticeUrl && (
              <a
                className="inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold hover:border-brand-500/50"
                href={problem.externalPracticeUrl}
                rel="noreferrer"
                target="_blank"
              >
                External practice collection <ExternalLink className="size-4" />
              </a>
            )}
          </div>
          <section className="mt-10">
            <h2 className="text-2xl font-extrabold">Examples</h2>
            {problem.examples.map((example) => (
              <div className="surface-card mt-4 rounded-2xl p-5" key={example.input}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                      Input
                    </span>
                    <pre className="mt-2 overflow-x-auto rounded-xl bg-[var(--code)] p-3 text-xs text-slate-200">
                      {example.input}
                    </pre>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                      Output
                    </span>
                    <pre className="mt-2 overflow-x-auto rounded-xl bg-[var(--code)] p-3 text-xs text-slate-200">
                      {example.output}
                    </pre>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--text-soft)]">
                  {example.explanation}
                </p>
              </div>
            ))}
          </section>
          <section className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="surface-card rounded-2xl p-5">
              <h2 className="font-bold">Constraints and contract</h2>
              {problem.constraints.map((item) => (
                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]" key={item}>
                  • {item}
                </p>
              ))}
            </div>
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <h2 className="flex items-center gap-2 font-bold">
                <MonitorSmartphone className="size-4 text-cyan-500" /> Frontend connection
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                {problem.frontendConnection}
              </p>
            </div>
          </section>
          <section className="mt-10">
            <span className="eyebrow">Think before code</span>
            <h2 className="mt-3 text-2xl font-extrabold">Brute-force reasoning</h2>
            <p className="mt-3 leading-8 text-[var(--text-soft)]">{problem.bruteForceThinking}</p>
            <CodeBlock
              code={problem.bruteForceSolution.code}
              explanation={problem.bruteForceSolution.approach}
              language="javascript"
              title="Reference brute-force shape"
            />
            <p className="mt-3 text-sm text-[var(--text-faint)]">
              Reference complexity: time {problem.bruteForceSolution.complexity.time}, space{' '}
              {problem.bruteForceSolution.complexity.space}
            </p>
          </section>
          <section className="mt-10">
            <span className="eyebrow">Find the repeated work</span>
            <h2 className="mt-3 text-2xl font-extrabold">Optimisation steps</h2>
            <ol className="mt-5 grid gap-3 sm:grid-cols-3">
              {problem.optimisationSteps.map((item, index) => (
                <li
                  className="surface-card rounded-2xl p-4 text-sm leading-6 text-[var(--text-soft)]"
                  key={item}
                >
                  <strong className="mb-2 block font-mono text-brand-500">0{index + 1}</strong>
                  {item}
                </li>
              ))}
            </ol>
            {problem.optimisedSolutions.map((solution) => (
              <CodeBlock
                code={solution.code}
                explanation={`${solution.approach} Time ${solution.complexity.time}; space ${solution.complexity.space}.`}
                key={solution.language}
                language={solution.language}
                title={`${solution.language === 'javascript' ? 'JavaScript' : 'TypeScript'} solution`}
              />
            ))}
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-extrabold">Dry run</h2>
            <div className="mt-5 space-y-3">
              {problem.dryRun.map((item, index) => (
                <div className="flex gap-4 rounded-2xl bg-[var(--surface-muted)] p-4" key={item}>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-500/15 font-mono text-xs font-bold text-brand-500">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-[var(--text-soft)]">{item}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="surface-card rounded-2xl p-5">
              <h2 className="flex items-center gap-2 font-bold">
                <Lightbulb className="size-4 text-brand-500" /> Hints
              </h2>
              {problem.hints.map((item) => (
                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]" key={item}>
                  • {item}
                </p>
              ))}
            </div>
            <div className="surface-card rounded-2xl p-5">
              <h2 className="flex items-center gap-2 font-bold">
                <TriangleAlert className="size-4 text-red-500" /> Common mistakes
              </h2>
              {problem.commonMistakes.map((item) => (
                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]" key={item}>
                  • {item}
                </p>
              ))}
            </div>
            <div className="surface-card rounded-2xl p-5">
              <h2 className="flex items-center gap-2 font-bold">
                <RotateCcw className="size-4 text-violet-500" /> Edge cases
              </h2>
              {problem.edgeCases.map((item) => (
                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]" key={item}>
                  • {item}
                </p>
              ))}
            </div>
          </section>
          <section className="mt-10 rounded-2xl border border-brand-500/25 bg-brand-500/7 p-5">
            <h2 className="font-bold">Interview follow-ups</h2>
            {problem.interviewFollowUps.map((item) => (
              <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]" key={item}>
                • {item}
              </p>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
