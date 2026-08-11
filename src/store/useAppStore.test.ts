import { beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from '@/store/useAppStore';

const resetStore = () =>
  useAppStore.setState({
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
  });

describe('local progress store', () => {
  beforeEach(resetStore);

  it('toggles bookmarks without duplicates', () => {
    const bookmark = {
      contentId: 'closures',
      type: 'tutorial' as const,
      title: 'Closures',
      description: 'Lexical environments',
      url: '/tutorials/javascript/closures',
    };
    useAppStore.getState().toggleBookmark(bookmark);
    expect(useAppStore.getState().bookmarks).toHaveLength(1);
    useAppStore.getState().toggleBookmark(bookmark);
    expect(useAppStore.getState().bookmarks).toHaveLength(0);
  });

  it('tracks completion and roadmap progress independently', () => {
    useAppStore.getState().toggleCompleted('tutorial', 'closures');
    useAppStore.getState().toggleRoadmapItem('javascript', 'Closures');
    expect(useAppStore.getState().completed['tutorial:closures']).toBe(true);
    expect(useAppStore.getState().roadmapCompleted['javascript:Closures']).toBe(true);
  });

  it('exports and imports a validated progress snapshot', () => {
    useAppStore.getState().toggleCompleted('tutorial', 'closures');
    const snapshot = useAppStore.getState().exportSnapshot();
    resetStore();
    const result = useAppStore.getState().importSnapshot(snapshot);
    expect(result.success).toBe(true);
    expect(useAppStore.getState().completed['tutorial:closures']).toBe(true);
  });

  it('rejects invalid imports without changing current data', () => {
    useAppStore.getState().toggleCompleted('tutorial', 'closures');
    const result = useAppStore.getState().importSnapshot({ completed: 'invalid' });
    expect(result.success).toBe(false);
    expect(useAppStore.getState().completed['tutorial:closures']).toBe(true);
  });

  it('rejects unrelated objects instead of treating them as an empty legacy export', () => {
    const result = useAppStore.getState().importSnapshot({ unrelated: true });
    expect(result.success).toBe(false);
  });

  it('records practice accuracy and queues wrong answers for revision', () => {
    useAppStore.getState().recordPracticeAnswer('event-loop-output', false);
    useAppStore.getState().recordPracticeAnswer('event-loop-output', true);
    expect(useAppStore.getState().practiceAttempts['event-loop-output']).toMatchObject({
      attempts: 2,
      correctAttempts: 1,
      lastResult: 'correct',
    });
    expect(useAppStore.getState().revisionQueue).toHaveLength(0);
  });

  it('tracks DSA status and pattern mastery locally', () => {
    useAppStore.getState().setDsaStatus('dsa-problem-001', 'needs-revision');
    useAppStore.getState().setPatternMastery('dsa-pattern-01', 83);
    expect(useAppStore.getState().dsaProgress['dsa-problem-001']).toBe('needs-revision');
    expect(useAppStore.getState().patternMastery['dsa-pattern-01']).toBe(83);
    expect(useAppStore.getState().revisionQueue[0]?.contentType).toBe('dsa-problem');
  });

  it('migrates a legacy progress export without losing completion', () => {
    const result = useAppStore.getState().importSnapshot({
      bookmarks: [],
      completed: { 'tutorial:closures': true },
      roadmapCompleted: {},
      recentItems: [],
      searchHistory: [],
      notes: [],
      readingProgress: {},
    });
    expect(result.success).toBe(true);
    expect(useAppStore.getState().completed['tutorial:closures']).toBe(true);
    expect(useAppStore.getState().practiceAttempts).toEqual({});
  });
});
