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
      contentId: 'tutorial-javascript-functions-and-scope',
      type: 'tutorial' as const,
      title: 'Functions and Scope',
      description: 'Reusable behavior and lexical scope',
      url: '/tutorials/javascript/functions-and-scope',
    };
    useAppStore.getState().toggleBookmark(bookmark);
    expect(useAppStore.getState().bookmarks).toHaveLength(1);
    useAppStore.getState().toggleBookmark(bookmark);
    expect(useAppStore.getState().bookmarks).toHaveLength(0);
  });

  it('tracks completion and roadmap progress independently', () => {
    useAppStore.getState().toggleCompleted('tutorial', 'tutorial-javascript-functions-and-scope');
    useAppStore.getState().toggleRoadmapItem('javascript', 'Functions and Scope');
    expect(
      useAppStore.getState().completed['tutorial:tutorial-javascript-functions-and-scope'],
    ).toBe(true);
    expect(useAppStore.getState().roadmapCompleted['javascript:Functions and Scope']).toBe(true);
  });

  it('exports and imports a validated progress snapshot', () => {
    useAppStore.getState().toggleCompleted('tutorial', 'tutorial-javascript-functions-and-scope');
    const snapshot = useAppStore.getState().exportSnapshot();
    resetStore();
    const result = useAppStore.getState().importSnapshot(snapshot);
    expect(result.success).toBe(true);
    expect(
      useAppStore.getState().completed['tutorial:tutorial-javascript-functions-and-scope'],
    ).toBe(true);
  });

  it('rejects invalid imports without changing current data', () => {
    useAppStore.getState().toggleCompleted('tutorial', 'tutorial-javascript-functions-and-scope');
    const result = useAppStore.getState().importSnapshot({ completed: 'invalid' });
    expect(result.success).toBe(false);
    expect(
      useAppStore.getState().completed['tutorial:tutorial-javascript-functions-and-scope'],
    ).toBe(true);
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

  it('removes progress for retired tutorials without touching other content', () => {
    const result = useAppStore.getState().importSnapshot({
      bookmarks: [],
      completed: { 'tutorial:tutorial-javascript-1': true, 'dsa-problem:dsa-problem-001': true },
      roadmapCompleted: {},
      recentItems: [],
      searchHistory: [],
      notes: [],
      readingProgress: {},
    });
    expect(result.success).toBe(true);
    expect(useAppStore.getState().completed['tutorial:tutorial-javascript-1']).toBeUndefined();
    expect(useAppStore.getState().completed['dsa-problem:dsa-problem-001']).toBe(true);
    expect(useAppStore.getState().practiceAttempts).toEqual({});
  });
});
