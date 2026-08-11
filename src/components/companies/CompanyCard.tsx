import { ArrowUpRight, Building2, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import type { Company } from '@/types/content';

export function CompanyCard({ company }: { company: Company }) {
  const href = '/companies/' + company.slug;
  return (
    <article className="surface-card group relative flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-brand-500/35 hover:shadow-xl hover:shadow-brand-500/5">
      <Link aria-label={company.name + ' interview guide'} className="absolute inset-0" to={href} />
      <div className="relative flex items-center justify-between pointer-events-none">
        <span className="grid size-12 place-items-center rounded-2xl bg-[var(--text)] text-sm font-black text-[var(--bg)] shadow-lg">
          {company.monogram}
        </span>
        <BookmarkButton
          className="pointer-events-auto relative"
          contentId={company.id}
          description={company.overview}
          title={company.name}
          type="company"
          url={href}
        />
      </div>
      <h3 className="relative mt-4 text-lg font-bold pointer-events-none">{company.name}</h3>
      <p className="relative mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-soft)] pointer-events-none">
        {company.overview}
      </p>
      <div className="relative mt-auto flex items-center gap-3 pt-5 pointer-events-none">
        <DifficultyBadge difficulty={company.difficulty} />
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
          <Layers3 className="size-3.5" /> {company.rounds.length} rounds
        </span>
        <Building2 className="size-3.5 text-[var(--text-faint)]" />
        <ArrowUpRight className="ml-auto size-4 text-[var(--text-faint)] transition group-hover:text-brand-500" />
      </div>
    </article>
  );
}
