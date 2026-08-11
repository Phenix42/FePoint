import { Laptop, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/useAppStore';
import type { ThemePreference } from '@/types/content';

const themes: ThemePreference[] = ['light', 'dark', 'system'];

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length] ?? 'system';
  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Laptop;

  return (
    <button
      aria-label={'Theme: ' + theme + '. Switch to ' + nextTheme}
      className="grid size-9 place-items-center rounded-xl border bg-[var(--surface)] text-[var(--text-soft)] transition hover:border-brand-500/40 hover:text-brand-500"
      onClick={() => setTheme(nextTheme)}
      title={'Current theme: ' + theme}
      type="button"
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}
