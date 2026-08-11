import { ArrowUpRight, BookOpen, Bug, Code2, FileQuestion, GitPullRequest } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { buttonStyles } from '@/components/common/Button';
import { siteConfig } from '@/config/site';

const contributionTypes = [
  [
    BookOpen,
    'Add a tutorial',
    'Create typed lesson data with objectives, sections, examples, mistakes, practice, and related topics.',
  ],
  [
    FileQuestion,
    'Add questions',
    'Contribute concise answers, deeper reasoning, realistic traps, and useful follow-ups.',
  ],
  [
    Code2,
    'Improve the platform',
    'Work on accessible components, filtering, local state, tests, performance, or content tooling.',
  ],
  [
    Bug,
    'Report an issue',
    'Include a reproducible path, expected behaviour, actual behaviour, browser, and screenshots where helpful.',
  ],
] as const;

export default function ContributePage() {
  return (
    <>
      <Seo
        description="How to contribute tutorials, questions, code, and issue reports to FEPoint."
        path="/contribute"
        title="Contribute"
      />
      <PageHero
        actions={
          <a
            className={buttonStyles()}
            href={siteConfig.githubUrl}
            rel="noreferrer"
            target="_blank"
          >
            <GitPullRequest className="size-4" /> Open GitHub <ArrowUpRight className="size-4" />
          </a>
        }
        description="FEPoint is structured so subject-matter experts and engineers can add useful material without rewriting the application shell."
        eyebrow="Build in public"
        title="Help make frontend learning clearer."
      />
      <div className="page-shell section-space">
        <div className="grid gap-4 md:grid-cols-2">
          {contributionTypes.map(([Icon, title, description]) => (
            <section className="surface-card rounded-2xl p-6" key={title}>
              <Icon className="size-5 text-brand-500" />
              <h2 className="mt-4 text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{description}</p>
            </section>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <span className="eyebrow">Contribution flow</span>
          <ol className="mt-6 space-y-4">
            {[
              'Open or claim an issue before large changes.',
              'Fork the repository and create a focused branch.',
              'Keep static content in src/data and use the typed models in src/types.',
              'Run npm run lint, npm test, and npm run build.',
              'Open a pull request explaining content sources, UI decisions, and verification.',
            ].map((step, index) => (
              <li className="flex gap-4" key={step}>
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-500/10 font-mono text-xs font-bold text-brand-500">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6 text-[var(--text-soft)]">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-2xl bg-[#060606] p-5 font-mono text-sm leading-7 text-slate-300">
            <p className="text-slate-500"># local verification</p>
            <p>npm install</p>
            <p>npm run lint</p>
            <p>npm test</p>
            <p>npm run build</p>
          </div>
        </div>
      </div>
    </>
  );
}
