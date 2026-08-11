import { Bookmark, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { useAppStore } from '@/store/useAppStore';
import type { ContentType } from '@/types/content';

export default function BookmarksPage() {
  const bookmarks = useAppStore((state) => state.bookmarks);
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);
  const clearBookmarks = useAppStore((state) => state.clearBookmarks);
  const [query, setQuery] = useState('');
  const [type, setType] = useState<ContentType | 'all'>('all');
  const filtered = bookmarks.filter(
    (bookmark) =>
      (type === 'all' || bookmark.type === type) &&
      (!query.trim() ||
        bookmark.title.toLowerCase().includes(query.toLowerCase()) ||
        bookmark.description.toLowerCase().includes(query.toLowerCase())),
  );
  const types = Array.from(new Set(bookmarks.map((bookmark) => bookmark.type)));

  return (
    <>
      <Seo
        description="Your locally saved FEPoint tutorials, questions, challenges, case studies, and companies."
        path="/bookmarks"
        title="Bookmarks"
      />
      <PageHero
        aside={
          <div className="surface-card rounded-2xl p-5 text-center">
            <strong className="text-3xl">{bookmarks.length}</strong>
            <span className="mt-1 block text-xs text-[var(--text-faint)]">saved locally</span>
          </div>
        }
        description="Save useful learning material without an account. These bookmarks stay private in this browser and can be exported from your progress page."
        eyebrow="Your local library"
        title="Bookmarks worth returning to."
      />
      <div className="page-shell py-10 sm:py-14">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="surface-card flex h-11 flex-1 items-center gap-2 rounded-xl px-3">
            <Search className="size-4 text-[var(--text-faint)]" />
            <span className="sr-only">Search bookmarks</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search bookmarks…"
              value={query}
            />
          </label>
          <label className="surface-card flex h-11 items-center rounded-xl px-3">
            <span className="sr-only">Bookmark type</span>
            <select
              className="bg-transparent text-sm font-semibold outline-none"
              onChange={(event) => setType(event.target.value as ContentType | 'all')}
              value={type}
            >
              <option value="all">All types</option>
              {types.map((item) => (
                <option key={item} value={item}>
                  {item.replace('-', ' ')}
                </option>
              ))}
            </select>
          </label>
          {bookmarks.length > 0 && (
            <Button
              onClick={() => window.confirm('Clear all bookmarks?') && clearBookmarks()}
              variant="danger"
            >
              <Trash2 className="size-4" /> Clear all
            </Button>
          )}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.length ? (
            filtered.map((bookmark) => {
              const external = bookmark.url.startsWith('http');
              const inner = (
                <>
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                      <Bookmark className="size-4 fill-current" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <Badge tone="blue">{bookmark.type.replace('-', ' ')}</Badge>
                      <strong className="mt-2 block">{bookmark.title}</strong>
                      <span className="mt-1 line-clamp-2 block text-sm leading-6 text-[var(--text-soft)]">
                        {bookmark.description}
                      </span>
                    </span>
                    <button
                      aria-label="Remove bookmark"
                      className="relative z-10 grid size-8 place-items-center rounded-lg text-[var(--text-faint)] hover:bg-red-500/10 hover:text-red-500"
                      onClick={(event) => {
                        event.preventDefault();
                        toggleBookmark({
                          contentId: bookmark.contentId,
                          type: bookmark.type,
                          title: bookmark.title,
                          description: bookmark.description,
                          url: bookmark.url,
                        });
                      }}
                      type="button"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </>
              );
              const classes = 'surface-card rounded-2xl p-5 transition hover:border-brand-500/35';
              return external ? (
                <a
                  className={classes}
                  href={bookmark.url}
                  key={bookmark.id}
                  rel="noreferrer"
                  target="_blank"
                >
                  {inner}
                </a>
              ) : (
                <Link className={classes} key={bookmark.id} to={bookmark.url}>
                  {inner}
                </Link>
              );
            })
          ) : (
            <EmptyState
              description="Use the bookmark control on any tutorial, question, challenge, case study, or company guide."
              title={
                bookmarks.length
                  ? 'No bookmarks match this filter'
                  : 'Your bookmark library is empty'
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
