import type { Difficulty, Tutorial } from '@/types/content';

export type TutorialSort = 'popular' | 'newest' | 'shortest';

export interface TutorialFilterOptions {
  query: string;
  difficulty: Difficulty | 'All';
  maxTime: 'All' | '10' | '15';
  sort: TutorialSort;
}

export const filterTutorials = (
  tutorials: Tutorial[],
  { query, difficulty, maxTime, sort }: TutorialFilterOptions,
) => {
  const normalised = query.trim().toLowerCase();
  const results = tutorials.filter(
    (tutorial) =>
      (!normalised ||
        tutorial.title.toLowerCase().includes(normalised) ||
        tutorial.description.toLowerCase().includes(normalised) ||
        tutorial.tags.some((tag) => tag.includes(normalised))) &&
      (difficulty === 'All' || tutorial.difficulty === difficulty) &&
      (maxTime === 'All' || tutorial.estimatedReadTime <= Number(maxTime)),
  );
  return [...results].sort((a, b) => {
    if (sort === 'shortest') return a.estimatedReadTime - b.estimatedReadTime;
    if (sort === 'newest') return b.updatedAt.localeCompare(a.updatedAt);
    return b.popularity - a.popularity;
  });
};
