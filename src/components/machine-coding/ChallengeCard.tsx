import { ArrowUpRight, Clock3, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { isCompleted, useAppStore } from '@/store/useAppStore';
import type { MachineCodingChallenge } from '@/types/content';

export function ChallengeCard({ challenge }: { challenge: MachineCodingChallenge }) {
  const completed = useAppStore((state) => state.completed);
  const done = isCompleted(completed, 'challenge', challenge.id);
  const href = '/machine-coding/' + challenge.slug;

  return (
    <article className="surface-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-violet-500/35 hover:shadow-xl hover:shadow-violet-500/5">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent opacity-0 transition group-hover:opacity-100"
      />
      <Link aria-label={challenge.title} className="absolute inset-0" to={href} />
      <div className="relative flex items-center justify-between pointer-events-none">
        <DifficultyBadge difficulty={challenge.difficulty} />
        <BookmarkButton
          className="pointer-events-auto relative"
          contentId={challenge.id}
          description={challenge.description}
          title={challenge.title}
          type="challenge"
          url={href}
        />
      </div>
      <div className="relative mt-4 pointer-events-none">
        <h3 className="text-lg font-bold tracking-[-0.025em]">{challenge.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-soft)]">
          {challenge.description}
        </p>
      </div>
      <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-5 text-xs pointer-events-none">
        <Badge tone="purple">{challenge.technology}</Badge>
        <span className="inline-flex items-center gap-1.5 text-[var(--text-faint)]">
          <Clock3 className="size-3.5" /> {challenge.estimatedMinutes} min
        </span>
        <span className="inline-flex items-center gap-1.5 text-[var(--text-faint)]">
          <Layers3 className="size-3.5" /> {challenge.kind}
        </span>
        <ArrowUpRight
          className={
            done ? 'ml-auto size-4 text-emerald-500' : 'ml-auto size-4 text-[var(--text-faint)]'
          }
        />
      </div>
    </article>
  );
}
