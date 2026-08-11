import type { AppSnapshot } from '@/store/useAppStore';

export const progressDefaults = {
  bookmarks: [],
  completed: {},
  roadmapCompleted: {},
  recentItems: [],
  searchHistory: [],
  notes: [],
  readingProgress: {},
  practiceAttempts: {},
  dsaProgress: {},
  patternMastery: {},
  revisionQueue: [],
} satisfies AppSnapshot;

export const migrateProgressSnapshot = (persistedState: unknown): AppSnapshot => {
  if (!persistedState || typeof persistedState !== 'object') return { ...progressDefaults };
  const previous = persistedState as Partial<AppSnapshot>;
  return {
    bookmarks: Array.isArray(previous.bookmarks) ? previous.bookmarks : [],
    completed: previous.completed ?? {},
    roadmapCompleted: previous.roadmapCompleted ?? {},
    recentItems: Array.isArray(previous.recentItems) ? previous.recentItems : [],
    searchHistory: Array.isArray(previous.searchHistory) ? previous.searchHistory : [],
    notes: Array.isArray(previous.notes) ? previous.notes : [],
    readingProgress: previous.readingProgress ?? {},
    practiceAttempts: previous.practiceAttempts ?? {},
    dsaProgress: previous.dsaProgress ?? {},
    patternMastery: previous.patternMastery ?? {},
    revisionQueue: Array.isArray(previous.revisionQueue) ? previous.revisionQueue : [],
  };
};
