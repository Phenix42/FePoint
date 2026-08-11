import { ArrowUpRight, BookOpen, CheckCircle2, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { isCompleted, useAppStore } from '@/store/useAppStore';
import type { Tutorial } from '@/types/content';
import { cn } from '@/utils/cn';

export function TutorialCard({
  tutorial,
  compact = false,
}: {
  tutorial: Tutorial;
  compact?: boolean;
}) {
  const completed = useAppStore((state) => state.completed);
  const done = isCompleted(completed, 'tutorial', tutorial.id);
  const href = '/tutorials/' + tutorial.category + '/' + tutorial.slug;

  return (
    <article
      className={cn(
        'surface-card group relative flex h-full flex-col rounded-2xl transition duration-200 hover:-translate-y-0.5 hover:border-brand-500/35 hover:shadow-xl hover:shadow-brand-500/5',
        compact ? 'p-4' : 'p-5',
      )}
    >
      <Link aria-label={tutorial.title} className="absolute inset-0 rounded-2xl" to={href} />
      <div className="relative flex items-start justify-between gap-3 pointer-events-none">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{tutorial.categoryLabel}</Badge>
          {!compact && <DifficultyBadge difficulty={tutorial.difficulty} />}
        </div>
        <BookmarkButton
          className="pointer-events-auto relative"
          contentId={tutorial.id}
          description={tutorial.description}
          title={tutorial.title}
          type="tutorial"
          url={href}
        />
      </div>
      <div className="relative mt-4 pointer-events-none">
        <h3 className={cn('font-bold tracking-[-0.025em]', compact ? 'text-base' : 'text-lg')}>
          {tutorial.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-soft)]">
          {tutorial.description}
        </p>
      </div>
      <div className="relative mt-auto flex items-center gap-3 pt-5 text-[0.68rem] font-semibold text-[var(--text-faint)] pointer-events-none">
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3.5" /> {tutorial.estimatedReadTime} min
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="size-3.5" /> {tutorial.codeExamples.length} example
        </span>
        {done ? (
          <span className="ml-auto inline-flex items-center gap-1 text-emerald-500">
            <CheckCircle2 className="size-3.5" /> Done
          </span>
        ) : (
          <ArrowUpRight className="ml-auto size-4 text-[var(--text-faint)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
        )}
      </div>
    </article>
  );
}
