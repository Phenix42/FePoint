import {
  BarChart3,
  BookOpen,
  Bookmark,
  Building2,
  ChevronDown,
  Clock3,
  Code2,
  FileText,
  Layers3,
  Menu,
  Network,
  Search,
  X,
} from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { cn } from '@/utils/cn';

const SearchModal = lazy(() =>
  import('@/components/search/SearchModal').then((module) => ({ default: module.SearchModal })),
);

const primaryLinks = [
  {
    label: 'Home',
    href: '/',
    matches: (pathname: string) => pathname === '/',
  },
  {
    label: 'Learn',
    href: '/roadmap',
    matches: (pathname: string) =>
      ['/roadmap', '/tutorials', '/glossary'].some((path) => pathname.startsWith(path)),
  },
  {
    label: 'Practice',
    href: '/practice',
    matches: (pathname: string) =>
      ['/practice', '/dsa', '/machine-coding'].some((path) => pathname.startsWith(path)),
  },
  {
    label: 'Interview prep',
    href: '/interview-questions',
    matches: (pathname: string) =>
      ['/interview-questions', '/system-design', '/companies'].some((path) =>
        pathname.startsWith(path),
      ),
  },
] as const;

const exploreLinks = [
  {
    label: 'Tutorial library',
    description: 'Browse every frontend topic',
    href: '/tutorials',
    icon: BookOpen,
  },
  {
    label: 'DSA for frontend',
    description: 'Patterns and JS problems',
    href: '/dsa',
    icon: Layers3,
  },
  {
    label: 'Machine coding',
    description: 'Timed interface challenges',
    href: '/machine-coding',
    icon: Code2,
  },
  {
    label: 'System design',
    description: 'Architecture case studies',
    href: '/system-design',
    icon: Network,
  },
  {
    label: 'Company guides',
    description: 'Target a specific interview',
    href: '/companies',
    icon: Building2,
  },
  {
    label: 'Glossary',
    description: 'Plain-language definitions',
    href: '/glossary',
    icon: FileText,
  },
] as const;

const personalLinks = [
  { label: 'My progress', href: '/completed', icon: BarChart3 },
  { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { label: 'Recently viewed', href: '/recent', icon: Clock3 },
] as const;

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-[var(--surface-raised)] backdrop-blur-xl">
        <div className="page-shell flex h-16 items-center gap-3">
          <Logo />

          <nav aria-label="Primary navigation" className="ml-6 hidden items-center gap-1 lg:flex">
            {primaryLinks.map((item) => (
              <Link
                aria-current={item.matches(location.pathname) ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text)]',
                  item.matches(location.pathname) &&
                    'bg-brand-500/10 text-brand-700 dark:text-brand-500',
                )}
                key={item.href}
                to={item.href}
              >
                {item.label}
              </Link>
            ))}

            <details className="group relative">
              <summary className="flex list-none items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text)] [&::-webkit-details-marker]:hidden">
                Explore
                <ChevronDown className="size-3.5 transition group-open:rotate-180" />
              </summary>
              <div className="absolute left-1/2 top-[calc(100%+0.7rem)] w-[31rem] -translate-x-1/2 rounded-2xl border bg-[var(--surface)] p-2 shadow-2xl shadow-slate-950/10 dark:shadow-black/30">
                <div className="grid grid-cols-2 gap-1">
                  {exploreLinks.map(({ label, description, href, icon: Icon }) => (
                    <Link
                      className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-[var(--surface-muted)]"
                      key={href}
                      onClick={(event) => {
                        event.currentTarget.closest('details')?.removeAttribute('open');
                      }}
                      to={href}
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-700 dark:text-brand-500">
                        <Icon className="size-4" />
                      </span>
                      <span>
                        <strong className="block text-xs">{label}</strong>
                        <span className="mt-1 block text-[0.68rem] leading-4 text-[var(--text-faint)]">
                          {description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              aria-label="Open search"
              className="hidden h-9 items-center gap-2 rounded-xl border bg-[var(--surface)] px-3 text-xs text-[var(--text-faint)] transition hover:border-brand-500/40 sm:flex xl:w-44"
              onClick={() => setSearchOpen(true)}
              type="button"
            >
              <Search className="size-4" />
              <span>Search</span>
              <kbd className="ml-auto hidden rounded border px-1.5 py-0.5 font-sans text-[0.58rem] xl:inline">
                ⌘ K
              </kbd>
            </button>
            <button
              aria-label="Open search"
              className="grid size-9 place-items-center rounded-xl border bg-[var(--surface)] text-[var(--text-soft)] sm:hidden"
              onClick={() => setSearchOpen(true)}
              type="button"
            >
              <Search className="size-4" />
            </button>
            <ThemeToggle />
            <Link
              className="hidden h-9 items-center gap-2 rounded-xl bg-brand-600 px-3 text-xs font-bold text-white shadow-sm transition hover:bg-brand-500 md:flex dark:text-slate-950"
              to="/completed"
            >
              <BarChart3 className="size-4" /> My progress
            </Link>
            <button
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              className="grid size-9 place-items-center rounded-xl border bg-[var(--surface)] lg:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              type="button"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t bg-[var(--surface)] lg:hidden">
            <nav
              aria-label="Mobile navigation"
              className="page-shell max-h-[calc(100vh-4rem)] overflow-y-auto py-4"
            >
              <div className="grid gap-1 sm:grid-cols-2">
                {primaryLinks.map((item) => (
                  <Link
                    aria-current={item.matches(location.pathname) ? 'page' : undefined}
                    className={cn(
                      'rounded-xl px-4 py-3 text-sm font-semibold text-[var(--text-soft)] hover:bg-[var(--surface-muted)]',
                      item.matches(location.pathname) &&
                        'bg-brand-500/10 text-brand-700 dark:text-brand-500',
                    )}
                    key={item.href}
                    onClick={() => setMobileOpen(false)}
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <p className="mb-2 mt-5 px-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--text-faint)]">
                Explore the library
              </p>
              <div className="grid gap-1 sm:grid-cols-2">
                {exploreLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-soft)] hover:bg-[var(--surface-muted)]"
                    key={href}
                    onClick={() => setMobileOpen(false)}
                    to={href}
                  >
                    <Icon className="size-4 text-[var(--text-faint)]" /> {label}
                  </Link>
                ))}
              </div>

              <p className="mb-2 mt-5 px-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--text-faint)]">
                Your space
              </p>
              <div className="grid gap-1 sm:grid-cols-2">
                {personalLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-soft)] hover:bg-[var(--surface-muted)]"
                    key={href}
                    onClick={() => setMobileOpen(false)}
                    to={href}
                  >
                    <Icon className="size-4 text-[var(--text-faint)]" /> {label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>
      {searchOpen && (
        <Suspense fallback={null}>
          <SearchModal onClose={() => setSearchOpen(false)} open={searchOpen} />
        </Suspense>
      )}
    </>
  );
}
