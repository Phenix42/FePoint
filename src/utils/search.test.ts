import { describe, expect, it } from 'vitest';
import { searchContent } from '@/utils/search';

describe('searchContent', () => {
  it('finds a close title match across content', () => {
    const results = searchContent('event loop');
    expect(results.some((item) => item.title.toLowerCase().includes('event loop'))).toBe(true);
  });

  it('filters by content type', () => {
    const results = searchContent('react', 'tutorial');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.type === 'tutorial')).toBe(true);
  });

  it('returns browsable content for an empty query', () => {
    expect(searchContent('', 'company', 4)).toHaveLength(4);
  });

  it('indexes glossary, practice, DSA, and system-design concepts', () => {
    expect(searchContent('DNS', 'glossary').some((item) => item.title === 'DNS')).toBe(true);
    expect(searchContent('two pointers', 'dsa-pattern').length).toBeGreaterThan(0);
    expect(searchContent('palindrome', 'dsa-problem').length).toBeGreaterThan(0);
    expect(searchContent('availability reliability', 'system-design').length).toBeGreaterThan(0);
  });
});
