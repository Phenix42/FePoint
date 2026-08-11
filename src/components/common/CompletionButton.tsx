import { Check, Circle } from 'lucide-react';
import { isCompleted, useAppStore } from '@/store/useAppStore';
import type { ContentType } from '@/types/content';
import { cn } from '@/utils/cn';

export function CompletionButton({
  contentId,
  type,
  compact = false,
  className,
}: {
  contentId: string;
  type: ContentType;
  compact?: boolean;
  className?: string;
}) {
  const completed = useAppStore((state) => state.completed);
  const toggleCompleted = useAppStore((state) => state.toggleCompleted);
  const active = isCompleted(completed, type, contentId);

  return (
    <button
      aria-pressed={active}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition',
        compact ? 'h-9' : 'h-11',
        active
          ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-500'
          : 'bg-[var(--surface)] text-[var(--text-soft)] hover:border-emerald-500/30 hover:text-emerald-500',
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
        toggleCompleted(type, contentId);
      }}
      type="button"
    >
      {active ? <Check className="size-4" /> : <Circle className="size-4" />}
      {!compact && (active ? 'Completed' : 'Mark complete')}
    </button>
  );
}
