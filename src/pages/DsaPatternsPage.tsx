import { ArrowRight, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/common/PageHero';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Seo } from '@/components/common/Seo';
import { DsaNav } from '@/components/dsa/DsaNav';
import { dsaPatterns } from '@/content/dsa/dsaPatterns';
import { useAppStore } from '@/store/useAppStore';

export default function DsaPatternsPage() {
  const mastery = useAppStore((state) => state.patternMastery);
  return (
    <>
      <Seo
        description="Ten reusable DSA patterns explained with recognition signals, visual steps, templates, mistakes, and worked problems."
        path="/dsa/patterns"
        title="DSA patterns"
      />
      <PageHero
        aside={
          <div className="surface-card min-w-48 rounded-2xl p-5">
            <Network className="size-5 text-violet-500" />
            <strong className="mt-3 block text-2xl">{dsaPatterns.length}</strong>
            <span className="text-xs text-[var(--text-faint)]">recognition patterns</span>
          </div>
        }
        description="Learn what to notice in the prompt, which invariant to maintain, and why the pointer or data structure moves."
        eyebrow="Pattern recognition"
        title="Stop memorising problems. Recognise their shape."
      />
      <div className="page-shell py-10 sm:py-14">
        <DsaNav />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {dsaPatterns.map((pattern, index) => (
            <Link
              className="surface-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-brand-500/40"
              key={pattern.id}
              to={`/dsa/patterns/${pattern.slug}`}
            >
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 font-mono text-sm font-bold text-brand-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold group-hover:text-brand-500">{pattern.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    {pattern.simpleExplanation}
                  </p>
                  <div className="mt-4">
                    <ProgressBar label="Self-rated mastery" value={mastery[pattern.id] ?? 0} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pattern.keywords.map((keyword) => (
                      <span
                        className="rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[0.65rem] font-semibold text-[var(--text-faint)]"
                        key={keyword}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="size-4 shrink-0 text-[var(--text-faint)] group-hover:text-brand-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
