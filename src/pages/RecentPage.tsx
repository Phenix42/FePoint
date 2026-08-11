import { Clock3, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { useAppStore } from '@/store/useAppStore';

export default function RecentPage() {
  const recentItems = useAppStore((state) => state.recentItems);
  const clearRecent = useAppStore((state) => state.clearRecent);
  return (
    <>
      <Seo
        description="Recently viewed FEPoint learning content stored locally in your browser."
        path="/recent"
        title="Recently viewed"
      />
      <PageHero
        description="Pick up where you stopped. This history never leaves the current browser."
        eyebrow="Local history"
        title="Recently explored."
      />
      <div className="page-shell py-10 sm:py-14">
        {recentItems.length > 0 && (
          <div className="mb-5 flex justify-end">
            <Button onClick={clearRecent} variant="danger">
              <Trash2 className="size-4" /> Clear history
            </Button>
          </div>
        )}
        <div className="space-y-3">
          {recentItems.length ? (
            recentItems.map((item) => (
              <Link
                className="surface-card flex items-start gap-4 rounded-2xl p-5 transition hover:border-brand-500/35"
                key={item.id}
                to={item.url}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--surface-muted)] text-[var(--text-faint)]">
                  <Clock3 className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <strong>{item.title}</strong>
                    <Badge tone="blue">{item.type.replace('-', ' ')}</Badge>
                  </span>
                  <span className="mt-1 line-clamp-1 block text-sm text-[var(--text-soft)]">
                    {item.description}
                  </span>
                </span>
                <time
                  className="hidden text-xs text-[var(--text-faint)] sm:block"
                  dateTime={item.viewedAt}
                >
                  {new Date(item.viewedAt).toLocaleDateString()}
                </time>
              </Link>
            ))
          ) : (
            <EmptyState
              description="Tutorials, challenges, system-design cases, and company guides you open will appear here."
              title="No recent activity yet"
            />
          )}
        </div>
      </div>
    </>
  );
}
