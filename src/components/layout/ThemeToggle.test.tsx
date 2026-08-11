import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { useThemeStore } from '@/store/useAppStore';

describe('ThemeToggle', () => {
  beforeEach(() => useThemeStore.setState({ theme: 'system' }));

  it('cycles system to light', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole('button'));
    expect(useThemeStore.getState().theme).toBe('light');
  });
});
