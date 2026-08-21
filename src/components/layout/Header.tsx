import {
  BookOpenCheck,
  CalendarCheck2,
  ListChecks,
  Menu,
  MessageSquareCode,
  Network,
  PenLine,
  UsersRound,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState, type ComponentType } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { cn } from '@/utils/cn';

type NavigationItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  matches: (pathname: string) => boolean;
};

const navigationItems: NavigationItem[] = [
  {
    label: '<Getting Started/>',
    href: '/',
    icon: BookOpenCheck,
    matches: (pathname) => pathname === '/',
  },
  {
    label: 'Interview Questions',
    href: '/interview-questions',
    icon: MessageSquareCode,
    matches: (pathname) => pathname.startsWith('/interview-questions'),
  },
  {
    label: 'DSA Blind 75',
    href: '/dsa/problems',
    icon: ListChecks,
    matches: (pathname) => pathname.startsWith('/dsa'),
  },
  {
    label: 'System Design',
    href: '/system-design',
    icon: Network,
    matches: (pathname) => pathname.startsWith('/system-design'),
  },
  {
    label: 'Explore Experiences',
    href: '/companies',
    icon: UsersRound,
    matches: (pathname) => pathname.startsWith('/companies'),
  },
  {
    label: 'Share Your Experience',
    href: '/contribute',
    icon: PenLine,
    matches: (pathname) => pathname.startsWith('/contribute'),
  },
  {
    label: 'Interview Trail',
    href: '/interview-trail',
    icon: PenLine,
    matches: (pathname) => pathname.startsWith('/interview-trail'),
  },
  {
    label: 'Book a Mock Interview',
    href: '/contact',
    icon: CalendarCheck2,
    matches: (pathname) => pathname.startsWith('/contact'),
  },
];

export function Header() {
  const location = useLocation();
  const [drawerState, setDrawerState] = useState({ open: false, path: '' });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileOpen = drawerState.open && drawerState.path === location.pathname;

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleDrawerKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawerState((current) => ({ ...current, open: false }));
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === 'Tab') {
        const drawer = document.getElementById('mobile-navigation');
        const focusable = drawer?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleDrawerKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleDrawerKeyDown);
    };
  }, [mobileOpen]);

  const closeDrawer = (restoreFocus = false) => {
    setDrawerState((current) => ({ ...current, open: false }));
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r bg-[var(--surface)] px-5 py-7 xl:flex">
        <Logo className="px-3" />
        <Navigation currentPath={location.pathname} />
        <div className="mt-auto flex items-center justify-between border-t px-3 pt-5">
          <span className="text-xs font-semibold text-[var(--text-faint)]">Appearance</span>
          <ThemeToggle />
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b bg-[var(--surface-raised)] px-4 backdrop-blur-xl xl:hidden">
        <Logo />
        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label="Open navigation"
          className="grid size-10 place-items-center rounded-xl border bg-[var(--surface)] text-[var(--text)] transition hover:border-[#685cf6]/40 hover:bg-[var(--surface-muted)]"
          onClick={() => setDrawerState({ open: true, path: location.pathname })}
          ref={menuButtonRef}
          type="button"
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </header>

      <button
        aria-hidden={!mobileOpen}
        aria-label="Close navigation"
        className={cn(
          'fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => closeDrawer(true)}
        tabIndex={mobileOpen ? 0 : -1}
        type="button"
      />

      <aside
        aria-hidden={!mobileOpen}
        aria-label="Site navigation"
        aria-modal="true"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(86vw,20rem)] flex-col border-r bg-[var(--surface)] px-5 py-6 shadow-2xl transition-transform duration-300 ease-out xl:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        id="mobile-navigation"
        inert={!mobileOpen}
        role="dialog"
      >
        <div className="flex items-center justify-between px-2">
          <Logo />
          <button
            aria-label="Close navigation"
            className="grid size-10 place-items-center rounded-xl border bg-[var(--surface)] transition hover:border-[#685cf6]/40 hover:bg-[var(--surface-muted)]"
            onClick={() => closeDrawer(true)}
            ref={closeButtonRef}
            tabIndex={mobileOpen ? 0 : -1}
            type="button"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <Navigation
          currentPath={location.pathname}
          mobileOpen={mobileOpen}
          onNavigate={() => closeDrawer()}
        />
        <div className="mt-auto flex items-center justify-between border-t px-3 pt-5">
          <span className="text-xs font-semibold text-[var(--text-faint)]">Appearance</span>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}

function Navigation({
  currentPath,
  mobileOpen = true,
  onNavigate,
}: {
  currentPath: string;
  mobileOpen?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Primary navigation" className="mt-10">
      <p className="px-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--text-faint)]">
        Learn &amp; prepare
      </p>
      <ul className="mt-3 space-y-1">
        {navigationItems.map(({ label, href, icon: Icon, matches }) => {
          const active = matches(currentPath);

          return (
            <li key={href}>
              <Link
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-[0.84rem] font-semibold text-[var(--text-soft)] transition duration-200 hover:bg-[var(--surface-muted)] hover:text-[var(--text)]',
                  active &&
                    'bg-[#685cf6]/10 text-[#5549e5] shadow-[inset_0_0_0_1px_rgba(104,92,246,0.12)] hover:bg-[#685cf6]/12 hover:text-[#5549e5] dark:text-[#aaa4ff]',
                )}
                onClick={onNavigate}
                tabIndex={mobileOpen ? undefined : -1}
                to={href}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-[#685cf6]"
                  />
                )}
                <Icon
                  aria-hidden="true"
                  className={cn(
                    'size-[1.05rem] shrink-0 text-[var(--text-faint)] transition group-hover:text-[var(--text)]',
                    active && 'text-[#685cf6] group-hover:text-[#685cf6]',
                  )}
                />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
