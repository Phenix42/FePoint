import { ArrowLeft, CheckCircle2, Gauge, Lightbulb, TriangleAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { CodeBlock } from '@/components/common/CodeBlock';
import { Seo } from '@/components/common/Seo';
import { DsaNav } from '@/components/dsa/DsaNav';
import { getDsaPattern } from '@/content/dsa/dsaPatterns';
import { dsaProblems } from '@/content/dsa/dsaProblems';
import { useAppStore } from '@/store/useAppStore';

export default function DsaPatternDetailPage() {
  const { patternSlug } = useParams();
  const pattern = getDsaPattern(patternSlug);
  const setMastery = useAppStore((state) => state.setPatternMastery);
  const mastery = useAppStore((state) => (pattern ? (state.patternMastery[pattern.id] ?? 0) : 0));
  if (!pattern)
    return (
      <div className="page-shell py-24 text-center">
        <h1 className="text-3xl font-extrabold">Pattern not found</h1>
        <Link className="mt-5 inline-flex text-brand-500" to="/dsa/patterns">
          Back to patterns
        </Link>
      </div>
    );
  const problems = [
    pattern.beginnerProblemSlug,
    pattern.intermediateProblemSlug,
    pattern.advancedProblemSlug,
  ]
    .map((slug) => dsaProblems.find((problem) => problem.slug === slug))
    .filter((problem) => problem !== undefined);
  return (
    <>
      <Seo
        description={pattern.description}
        path={`/dsa/patterns/${pattern.slug}`}
        title={`${pattern.title} pattern`}
      />
      <div className="border-b bg-[var(--surface)]">
        <div className="page-shell py-5">
          <DsaNav />
        </div>
      </div>
      <main className="page-shell py-10">
        <Link
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-soft)] hover:text-brand-500"
          to="/dsa/patterns"
        >
          <ArrowLeft className="size-4" /> All patterns
        </Link>
        <div className="mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article>
            <Badge tone="purple">Recognition pattern</Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{pattern.title}</h1>
            <p className="mt-4 text-lg leading-8 text-[var(--text-soft)]">{pattern.description}</p>
            <section className="mt-8 rounded-2xl bg-brand-500/8 p-5">
              <span className="eyebrow">Simple mental model</span>
              <p className="mt-3 leading-8">{pattern.simpleExplanation}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                <strong>Analogy:</strong> {pattern.analogy}
              </p>
            </section>
            <section className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="surface-card rounded-2xl p-5">
                <h2 className="flex items-center gap-2 font-bold">
                  <Lightbulb className="size-4 text-brand-500" /> Identify it when
                </h2>
                <ul className="mt-4 space-y-3">
                  {pattern.identifyWhen.map((item) => (
                    <li className="flex gap-2 text-sm leading-6 text-[var(--text-soft)]" key={item}>
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="surface-card rounded-2xl p-5">
                <h2 className="font-bold">Prompt keywords</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pattern.keywords.map((item) => (
                    <span
                      className="rounded-full bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-semibold"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-[var(--text-faint)]">
                  Keywords are clues, not proof. Confirm the invariant before choosing the pattern.
                </p>
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-2xl font-extrabold">Visual steps</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {pattern.visualSteps.map((step, index) => (
                  <div className="surface-card rounded-2xl p-4" key={step}>
                    <span className="font-mono text-xs font-bold text-brand-500">0{index + 1}</span>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{step}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-2xl font-extrabold">Reusable templates</h2>
              <CodeBlock
                code={pattern.javascriptTemplate}
                explanation="Adapt the state and movement condition to the invariant in the prompt."
                language="javascript"
                title="JavaScript template"
              />
              <CodeBlock
                code={pattern.typescriptTemplate}
                explanation="Types document the input contract; the pattern and complexity stay the same."
                language="typescript"
                title="TypeScript template"
              />
            </section>
            <section className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                <h2 className="flex items-center gap-2 font-bold">
                  <TriangleAlert className="size-4 text-red-500" /> Common mistakes
                </h2>
                {pattern.commonMistakes.map((item) => (
                  <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]" key={item}>
                    • {item}
                  </p>
                ))}
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <h2 className="flex items-center gap-2 font-bold">
                  <Gauge className="size-4 text-emerald-500" /> Complexity
                </h2>
                <p className="mt-3 font-mono text-sm">
                  Time {pattern.complexity.time} · Space {pattern.complexity.space}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                  {pattern.complexity.explanation}
                </p>
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-2xl font-extrabold">Worked practice ladder</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {problems.map((problem) => (
                  <Link
                    className="surface-card rounded-2xl p-4 transition hover:border-brand-500/40"
                    key={problem.id}
                    to={`/dsa/problems/${problem.slug}`}
                  >
                    <Badge>{problem.difficulty}</Badge>
                    <strong className="mt-3 block">{problem.title}</strong>
                    <span className="mt-3 block text-xs font-bold text-brand-500">
                      Work through it →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </article>
          <aside className="surface-card rounded-2xl p-5 lg:sticky lg:top-24">
            <label className="text-sm font-bold" htmlFor="mastery">
              How confident are you?
            </label>
            <p className="mt-1 text-xs leading-5 text-[var(--text-faint)]">
              Rate recognition and explanation, not memorised code.
            </p>
            <input
              className="mt-5 w-full accent-[var(--color-brand-500)]"
              id="mastery"
              max="100"
              min="0"
              onChange={(event) => setMastery(pattern.id, Number(event.target.value))}
              step="10"
              type="range"
              value={mastery}
            />
            <div className="mt-2 flex justify-between text-xs font-bold">
              <span>Learning</span>
              <span className="text-brand-500">{mastery}%</span>
            </div>
            <div className="mt-6 border-t pt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                Interview checks
              </h2>
              {pattern.interviewQuestions.map((item) => (
                <p className="mt-3 text-xs leading-5 text-[var(--text-soft)]" key={item}>
                  • {item}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
