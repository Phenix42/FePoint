import { describe, expect, it, vi } from 'vitest';
import { safeStorage } from '@/utils/storage';

describe('safeStorage', () => {
  it('reads and writes JSON values', () => {
    expect(safeStorage.set('progress', { complete: 3 })).toBe(true);
    expect(safeStorage.get('progress', { complete: 0 })).toEqual({ complete: 3 });
  });

  it('returns the fallback for malformed localStorage data', () => {
    window.localStorage.setItem('progress', '{broken');
    expect(safeStorage.get('progress', { complete: 0 })).toEqual({ complete: 0 });
  });

  it('does not throw when storage writes fail', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('full');
    });
    expect(safeStorage.set('progress', 1)).toBe(false);
    spy.mockRestore();
  });
});
