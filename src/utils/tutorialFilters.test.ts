import { describe, expect, it } from 'vitest';
import { tutorials } from '@/data/tutorials';
import { filterTutorials } from '@/utils/tutorialFilters';

describe('filterTutorials', () => {
  it('combines keyword, difficulty, and reading-time filters', () => {
    const results = filterTutorials(tutorials, {
      query: 'semantic',
      difficulty: 'Beginner',
      maxTime: '15',
      sort: 'popular',
    });
    expect(results.map((item) => item.title)).toContain('HTML Elements and Semantic Structure');
    expect(results.every((item) => item.estimatedReadTime <= 15)).toBe(true);
  });

  it('sorts by shortest reading time', () => {
    const results = filterTutorials(tutorials, {
      query: '',
      difficulty: 'All',
      maxTime: 'All',
      sort: 'shortest',
    });
    expect(results[0]?.estimatedReadTime).toBeLessThanOrEqual(
      results.at(-1)?.estimatedReadTime ?? 0,
    );
  });
});
