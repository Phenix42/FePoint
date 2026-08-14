import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { useThemeStore } from '@/store/useAppStore';

export function AppLayout() {
  const location = useLocation();
  const theme = useThemeStore((state) => state.theme);
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && media.matches);
      document.documentElement.classList.toggle('dark', isDark);
    };
    applyTheme();
    media.addEventListener('change', applyTheme);
    return () => media.removeEventListener('change', applyTheme);
  }, [theme]);

  return (
    <div className="min-h-screen">
      <a
        className="fixed left-3 top-2 z-[100] -translate-y-20 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-[var(--bg)] transition focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <Header />
      <div className="flex min-h-screen min-w-0 flex-col xl:pl-72">
        <main className="min-w-0 flex-1 pt-16 xl:pt-0" id="main-content">
          <Outlet />
        </main>
        {!isLandingPage && <Footer />}
      </div>
    </div>
  );
}
