import type { Difficulty, MachineCodingChallenge } from '@/types/content';

interface ChallengeSeed {
  title: string;
  difficulty: Difficulty;
  minutes: 30 | 60 | 90;
  technology: MachineCodingChallenge['technology'];
  kind: MachineCodingChallenge['kind'];
}

const beginner: ChallengeSeed[] = [
  ['Accordion', 'Beginner', 30, 'React', 'UI component'],
  ['Tabs', 'Beginner', 30, 'React', 'UI component'],
  ['Modal', 'Beginner', 30, 'React', 'UI component'],
  ['Star rating', 'Beginner', 30, 'React', 'UI component'],
  ['Progress bar', 'Beginner', 30, 'JavaScript', 'UI component'],
  ['Stopwatch', 'Beginner', 30, 'JavaScript', 'UI component'],
  ['Counter', 'Beginner', 30, 'React', 'UI component'],
  ['OTP input', 'Beginner', 30, 'TypeScript', 'UI component'],
  ['Pagination', 'Beginner', 30, 'React', 'UI component'],
  ['Todo application', 'Beginner', 60, 'TypeScript', 'Full application'],
].map(([title, difficulty, minutes, technology, kind]) => ({
  title,
  difficulty,
  minutes,
  technology,
  kind,
})) as ChallengeSeed[];

const intermediate: ChallengeSeed[] = [
  ['Autocomplete search', 'Intermediate', 60, 'React', 'UI component'],
  ['Image carousel', 'Intermediate', 60, 'React', 'UI component'],
  ['File explorer', 'Intermediate', 60, 'TypeScript', 'UI component'],
  ['Nested comments', 'Intermediate', 60, 'React', 'UI component'],
  ['Toast notification system', 'Intermediate', 60, 'TypeScript', 'UI component'],
  ['Multi-step form', 'Intermediate', 60, 'React', 'Full application'],
  ['Shopping cart', 'Intermediate', 60, 'TypeScript', 'Full application'],
  ['Data table', 'Intermediate', 60, 'React', 'UI component'],
  ['Calendar', 'Intermediate', 60, 'TypeScript', 'UI component'],
  ['Drag-and-drop board', 'Intermediate', 90, 'React', 'Full application'],
].map(([title, difficulty, minutes, technology, kind]) => ({
  title,
  difficulty,
  minutes,
  technology,
  kind,
})) as ChallengeSeed[];

const advanced: ChallengeSeed[] = [
  ['Trello clone', 'Advanced', 90, 'React', 'Full application'],
  ['Slack-style chat interface', 'Advanced', 90, 'TypeScript', 'Full application'],
  ['Google Drive file explorer', 'Advanced', 90, 'React', 'Full application'],
  ['Form builder', 'Advanced', 90, 'TypeScript', 'Full application'],
  ['Rich-text editor', 'Advanced', 90, 'JavaScript', 'Full application'],
  ['Spreadsheet', 'Advanced', 90, 'TypeScript', 'Full application'],
  ['Social media feed', 'Advanced', 90, 'React', 'Full application'],
  ['Dashboard builder', 'Advanced', 90, 'React', 'Full application'],
  ['E-commerce checkout', 'Advanced', 90, 'TypeScript', 'Full application'],
  ['Collaborative editor UI', 'Advanced', 90, 'React', 'Full application'],
].map(([title, difficulty, minutes, technology, kind]) => ({
  title,
  difficulty,
  minutes,
  technology,
  kind,
})) as ChallengeSeed[];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const tailoredRequirement: Record<string, string> = {
  accordion: 'Only one panel should be open when single-select mode is enabled.',
  modal: 'Trap focus, close on Escape, and restore focus to the trigger.',
  'autocomplete-search':
    'Debounce requests, support keyboard selection, and ignore stale responses.',
  'file-explorer': 'Render arbitrary nesting and preserve expanded folders independently.',
  'data-table': 'Support stable sorting, filters, pagination, and keyboard-accessible row actions.',
  'trello-clone':
    'Move cards across columns optimistically while retaining a reversible state update.',
  spreadsheet: 'Support cell selection, formulas, keyboard navigation, and a sparse data model.',
};

export const machineCodingChallenges: MachineCodingChallenge[] = [
  ...beginner,
  ...intermediate,
  ...advanced,
].map((seed, index) => {
  const slug = slugify(seed.title);
  return {
    id: 'challenge-' + (index + 1),
    slug,
    title: seed.title,
    description:
      'Build a production-minded ' +
      seed.title.toLowerCase() +
      ' while demonstrating component design, state modelling, accessibility, and clear trade-offs.',
    difficulty: seed.difficulty,
    estimatedMinutes: seed.minutes,
    technology: seed.technology,
    kind: seed.kind,
    functionalRequirements: [
      tailoredRequirement[slug] ??
        'Implement the complete primary user flow without a page refresh.',
      'Handle loading, empty, success, and error states explicitly.',
      'Keep data updates predictable and avoid mutating existing state.',
      'Make important actions work with both pointer and keyboard input.',
    ],
    uiRequirements: [
      'Create a clear visual hierarchy with visible focus states.',
      'Support a 360px viewport without horizontal page overflow.',
      'Communicate status changes without relying on colour alone.',
    ],
    edgeCases: [
      'Empty and unusually long content',
      'Rapid repeated interactions',
      'A refresh or failed asynchronous operation',
      'Keyboard-only navigation',
    ],
    evaluationCriteria: [
      'Correctness and edge-case handling',
      'Component boundaries and data flow',
      'Accessibility and responsive behaviour',
      'Readable TypeScript and focused tests',
      'Performance choices supported by evidence',
    ],
    componentStructure: [
      seed.title.replace(/[^a-zA-Z]/g, '') + 'Page',
      'Toolbar',
      'ContentView',
      'StatusRegion',
      'use' + seed.title.replace(/[^a-zA-Z]/g, '') + 'State',
    ],
    dataModel:
      'Use stable string identifiers, keep domain entities separate from view state, and derive display-only values during render.',
    starterCode:
      "import { useState } from 'react';\n\nexport function Challenge() {\n  const [state, setState] = useState<unknown>(null);\n\n  return (\n    <main>\n      {/* Build the first accessible user flow here. */}\n    </main>\n  );\n}",
    hints: [
      'Write state transitions before writing JSX.',
      'Build the keyboard interaction alongside the pointer interaction.',
      'Test one failure state before polishing visuals.',
    ],
    solution:
      'Start with a small domain reducer, render from normalised state, and isolate browser side effects. Use semantic controls, announce asynchronous changes, and test the primary user flow rather than component internals.',
    followUps: [
      'How would you persist and reconcile the data with a backend?',
      'What would break first with 10,000 records?',
      'Which accessibility decision depends on the exact interaction pattern?',
    ],
  };
});
