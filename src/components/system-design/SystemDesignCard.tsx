import { ArrowUpRight, Boxes, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import type { SystemDesignCaseStudy } from '@/types/content';

export function SystemDesignCard({ caseStudy }: { caseStudy: SystemDesignCaseStudy }) {
  const href = '/system-design/' + caseStudy.slug;
  return (
    <article className="surface-card group relative flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-cyan-500/35 hover:shadow-xl hover:shadow-cyan-500/5">
      <Link aria-label={caseStudy.title} className="absolute inset-0" to={href} />
      <div className="relative flex items-center justify-between pointer-events-none">
        <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-500">
          <Boxes className="size-5" />
        </span>
        <BookmarkButton
          className="pointer-events-auto relative"
          contentId={caseStudy.id}
          description={caseStudy.description}
          title={caseStudy.title}
          type="system-design"
          url={href}
        />
      </div>
      <h3 className="relative mt-4 text-lg font-bold tracking-[-0.025em] pointer-events-none">
        {caseStudy.title}
      </h3>
      <p className="relative mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-soft)] pointer-events-none">
        {caseStudy.description}
      </p>
      <div className="relative mt-auto flex items-center gap-3 pt-5 pointer-events-none">
        <DifficultyBadge difficulty={caseStudy.difficulty} />
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
          <Clock3 className="size-3.5" /> {caseStudy.estimatedReadTime} min
        </span>
        <ArrowUpRight className="ml-auto size-4 text-[var(--text-faint)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-500" />
      </div>
    </article>
  );
}
