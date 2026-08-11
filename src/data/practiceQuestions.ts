import type { CodingProblem } from '@/types/content';

export { practiceQuestions } from '@/content/practice/practiceQuestionBank';

/* Retained in git history only; the validated question bank above is the public source.
export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 'practice-event-loop',
    question: 'What is logged by the event-loop snippet?',
    answer: 'start, end, promise, timer',
    explanation:
      'Synchronous statements run first, the Promise callback is a microtask, and the timer callback is a task.',
    technology: 'JavaScript',
    difficulty: 'Intermediate',
    type: 'Output-based',
    code: "console.log('start');\nsetTimeout(() => console.log('timer'), 0);\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('end');",
  },
  {
    id: 'practice-css-grid',
    question: 'Which declaration creates as many responsive columns as fit without a media query?',
    answer: 'grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));',
    explanation:
      'auto-fit collapses unused tracks while minmax gives each column a minimum and flexible maximum.',
    technology: 'CSS',
    difficulty: 'Intermediate',
    type: 'Multiple choice',
    options: [
      'grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));',
      'grid-template-columns: auto;',
      'display: columns;',
      'flex-columns: wrap;',
    ],
  },
  {
    id: 'practice-form-label',
    question: 'How should a visible text label be associated with an input?',
    answer: 'Use a label whose htmlFor matches the input id, or nest the input inside the label.',
    explanation: 'The association expands the click target and exposes a reliable accessible name.',
    technology: 'HTML',
    difficulty: 'Beginner',
    type: 'Conceptual',
  },
  {
    id: 'practice-react-state',
    question: 'Why can two setCount(count + 1) calls produce only one increment?',
    answer: 'Both updates capture the same render snapshot. Use setCount(current => current + 1).',
    explanation:
      'State behaves like a snapshot within one render. Updater functions are queued and receive the latest pending value.',
    technology: 'React',
    difficulty: 'Beginner',
    type: 'Debugging',
  },
  {
    id: 'practice-ts-narrowing',
    question: 'How can you safely read a message from a caught value typed as unknown?',
    answer: 'Narrow it first, for example: error instanceof Error ? error.message : String(error).',
    explanation:
      'Unknown prevents unsafe property access until runtime evidence establishes a type.',
    technology: 'TypeScript',
    difficulty: 'Intermediate',
    type: 'Coding',
  },
  {
    id: 'practice-cors',
    question: 'Does CORS stop another server from requesting your API?',
    answer:
      'No. CORS is enforced by browsers for frontend JavaScript; it is not server authentication.',
    explanation:
      'A non-browser client can still send the request. APIs must implement authentication and authorization separately.',
    technology: 'Browser',
    difficulty: 'Intermediate',
    type: 'Conceptual',
  },
  {
    id: 'practice-next-cache',
    question: 'When should a Next.js route use dynamic rendering?',
    answer:
      'When the response depends on request-time information or must always show uncached data.',
    explanation:
      'Static rendering and revalidation are better defaults for cacheable content; dynamic work should be introduced at the smallest necessary boundary.',
    technology: 'Next.js',
    difficulty: 'Advanced',
    type: 'Scenario-based',
  },
  {
    id: 'practice-a11y-focus',
    question:
      'A dropdown opens visually but keyboard focus stays on the trigger. What should you inspect?',
    answer:
      'The interaction pattern: whether focus should enter the popup, arrow-key handling, Escape, and restoration.',
    explanation:
      'Focus behaviour depends on whether this is a menu, listbox, disclosure, or navigation. Name the pattern before adding ARIA.',
    technology: 'Accessibility',
    difficulty: 'Advanced',
    type: 'Debugging',
  },
]; */

interface ProblemSeed {
  title: string;
  difficulty: CodingProblem['difficulty'];
  complexity: string;
}

const problemSeeds: ProblemSeed[] = [
  { title: 'Reverse a string', difficulty: 'Beginner', complexity: 'O(n)' },
  { title: 'Remove duplicates from an array', difficulty: 'Beginner', complexity: 'O(n)' },
  { title: 'Find the second-largest number', difficulty: 'Beginner', complexity: 'O(n)' },
  { title: 'Flatten a nested array', difficulty: 'Intermediate', complexity: 'O(n)' },
  { title: 'Count character frequency', difficulty: 'Beginner', complexity: 'O(n)' },
  { title: 'Group objects by property', difficulty: 'Intermediate', complexity: 'O(n)' },
  { title: 'Implement debounce', difficulty: 'Intermediate', complexity: 'O(1) per call' },
  { title: 'Implement throttle', difficulty: 'Intermediate', complexity: 'O(1) per call' },
  { title: 'Implement memoisation', difficulty: 'Intermediate', complexity: 'O(1) average lookup' },
  { title: 'Implement custom map', difficulty: 'Beginner', complexity: 'O(n)' },
  { title: 'Implement custom filter', difficulty: 'Beginner', complexity: 'O(n)' },
  { title: 'Implement custom reduce', difficulty: 'Intermediate', complexity: 'O(n)' },
  { title: 'Implement Promise.all', difficulty: 'Advanced', complexity: 'O(n)' },
  { title: 'Deep clone an object', difficulty: 'Advanced', complexity: 'O(n)' },
  { title: 'Create an event emitter', difficulty: 'Advanced', complexity: 'O(1) subscription' },
  { title: 'Create an LRU cache', difficulty: 'Advanced', complexity: 'O(1) get and put' },
  { title: 'Retry failed API calls', difficulty: 'Advanced', complexity: 'O(attempts)' },
];

const problemSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const codingProblems: CodingProblem[] = problemSeeds.map((seed, index) => ({
  id: 'coding-' + (index + 1),
  slug: problemSlug(seed.title),
  title: seed.title,
  difficulty: seed.difficulty,
  statement:
    'Implement ' +
    seed.title.toLowerCase() +
    ' in JavaScript. Define the behaviour for invalid or empty input and keep the public API easy to test.',
  examples: [
    'Given representative input, return the expected transformed result.',
    'Handle an empty input without throwing.',
  ],
  constraints: [
    'Do not mutate caller-owned input.',
    'Explain edge-case behaviour.',
    'Use no external libraries.',
  ],
  hints: [
    'Write down the invariant before choosing a data structure.',
    'Separate input validation from the core transformation.',
  ],
  basicSolution:
    '// Start with a readable reference implementation.\n// Iterate once, record the required state, and return a new value.',
  optimisedSolution:
    '// Optimise only after stating the bottleneck.\n// Prefer one pass and bounded intermediate allocations.',
  timeComplexity: seed.complexity,
  spaceComplexity: seed.title.includes('cache') ? 'O(capacity)' : 'O(n)',
  followUps: [
    'How would the API change for async input?',
    'Which tests expose the most likely bug?',
  ],
}));
