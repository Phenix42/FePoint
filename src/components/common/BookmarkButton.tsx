import { Bookmark } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import type { ContentType } from '@/types/content';
import { cn } from '@/utils/cn';

interface BookmarkButtonProps {
  contentId: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
  showLabel?: boolean;
  className?: string;
}

export function BookmarkButton({
  contentId,
  type,
  title,
  description,
  url,
  showLabel = false,
  className,
}: BookmarkButtonProps) {
  const bookmarks = useAppStore((state) => state.bookmarks);
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);
  const active = bookmarks.some((item) => item.contentId === contentId && item.type === type);

  return (
    <button
      aria-label={active ? 'Remove bookmark' : 'Add bookmark'}
      aria-pressed={active}
      className={cn(
        'inline-flex h-9 items-center justify-center gap-2 rounded-lg border bg-[var(--surface)] px-2.5 text-xs font-semibold text-[var(--text-soft)] transition hover:border-brand-500/40 hover:text-brand-500',
        active && 'border-brand-500/25 bg-brand-500/10 text-brand-500',
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleBookmark({ contentId, type, title, description, url });
      }}
      type="button"
    >
      <Bookmark aria-hidden="true" className={cn('size-4', active && 'fill-current')} />
      {showLabel && (active ? 'Saved' : 'Save')}
    </button>
  );
}
