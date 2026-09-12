import { glossaryTerms } from '@/content/glossary/glossaryTerms';
import { dsaProblems } from '@/content/dsa/dsaProblems';
import { systemDesignLearningTopics } from '@/content/system-design/systemDesignTopics';
import { machineCodingChallenges } from '@/data/machineCoding';
import { practiceQuestionSchema, validateUniqueIds } from '@/schemas/contentSchemas';
import type { PracticeQuestion } from '@/types/content';

const categoryContext: Record<string, string> = {
  'Computer fundamentals':
    'reasoning about how programs use hardware and operating-system resources',
  Internet: 'following a browser request from the user to a remote service and back',
  Security: 'protecting users and data while information moves through a system',
  Browser: 'understanding how source files become an interactive page',
  Performance: 'making repeat visits and common operations feel faster',
  HTML: 'building meaningful, accessible document structure',
  Accessibility: 'making interfaces understandable and operable for more people',
  CSS: 'creating resilient layouts and visual presentation',
  JavaScript: 'reasoning about program execution and user interactions',
  TypeScript: 'catching value-shape mistakes before code runs',
  React: 'building interfaces from reusable components and predictable data flow',
  DSA: 'choosing an efficient way to organise data and solve a problem',
  'System design': 'planning software that remains dependable as usage grows',
};

const tutorialByCategory: Record<string, string> = {
  Internet: 'how-websites-work',
  Browser: 'browser-client-server',
  HTML: 'html-elements-and-semantics',
  Accessibility: 'accessibility',
  CSS: 'css-fundamentals',
  JavaScript: 'async-javascript',
  TypeScript: 'typescript-fundamentals',
  React: 'react-fundamentals',
};

const option = (id: string, label: string) => ({ id, label });

const generatedQuestions: PracticeQuestion[] = glossaryTerms.flatMap((term, index) => {
  const distractors = [1, 2, 3].map(
    (offset) => glossaryTerms[(index + offset * 11) % glossaryTerms.length]!,
  );
  const context = categoryContext[term.category] ?? 'making sound frontend engineering decisions';
  const paired = glossaryTerms[(index + 7) % glossaryTerms.length]!;
  const firstDistractor = distractors[0]!;
  const definitionQuestion = practiceQuestionSchema.parse({
    id: `practice-definition-${term.slug}`,
    title: `${term.term}: explain the idea`,
    question: `Which explanation most accurately describes ${term.term}?`,
    category: term.category,
    subcategory: term.term,
    difficulty: 'Beginner',
    experienceLevel: 'Foundation',
    questionType: 'Multiple choice',
    options: [
      option('correct', term.definition),
      ...distractors.map((item, distractorIndex) =>
        option(`distractor-${distractorIndex + 1}`, item.definition),
      ),
    ],
    correctAnswers: ['correct'],
    detailedExplanation: `${term.definition} This matters when ${context}. ${term.analogy}`,
    simpleExplanation: term.simpleDefinition,
    commonWrongAnswer: firstDistractor.definition,
    whyWrong: `That answer describes ${firstDistractor.term}, which solves a different problem from ${term.term}.`,
    hint: `Think about this analogy: ${term.analogy}`,
    relatedTutorialSlug: tutorialByCategory[term.category],
    relatedQuestionIds: [`practice-application-${term.slug}`],
    tags: [term.category.toLowerCase(), term.slug, 'fundamentals'],
    estimatedMinutes: 2,
    companies: [],
  });

  const formats: PracticeQuestion['questionType'][] = [
    'Scenario',
    'True or false',
    'Fill in the blank',
    'Multiple answer',
    'Architecture decision',
    'Conceptual',
  ];
  const format = formats[index % formats.length]!;
  const isMultiple = format === 'Multiple answer';
  const questionByFormat: Partial<Record<PracticeQuestion['questionType'], string>> = {
    Scenario: `A teammate is ${context}. Why should they understand ${term.term}?`,
    'True or false': `True or false: using ${term.term} knowledge can help with ${context}.`,
    'Fill in the blank': `Complete the idea: ${term.term} is most closely connected to _____.`,
    'Multiple answer': `Which two statements about ${term.term} are accurate?`,
    'Architecture decision': `During ${context}, which description should guide a decision involving ${term.term}?`,
    Conceptual: `In your frontend mental model, what role does ${term.term} play?`,
  };
  const applicationOptions = [
    option('correct-primary', `${term.simpleDefinition} It is relevant when ${context}.`),
    option('correct-analogy', term.analogy),
    option('wrong-paired', `${paired.term} and ${term.term} always mean exactly the same thing.`),
    option(
      'wrong-ignore',
      `${term.term} has no effect on frontend development or user experience.`,
    ),
  ];
  const applicationQuestion = practiceQuestionSchema.parse({
    id: `practice-application-${term.slug}`,
    title: `${term.term}: apply the concept`,
    question: questionByFormat[format]!,
    category: term.category,
    subcategory: term.term,
    difficulty: index % 4 === 0 ? 'Intermediate' : 'Beginner',
    experienceLevel: index % 4 === 0 ? 'Junior' : 'Foundation',
    questionType: format,
    options:
      format === 'True or false'
        ? [option('true', 'True'), option('false', 'False')]
        : applicationOptions,
    correctAnswers:
      format === 'True or false'
        ? ['true']
        : isMultiple
          ? ['correct-primary', 'correct-analogy']
          : ['correct-primary'],
    detailedExplanation: `${term.definition} In practice, it supports ${context}. The analogy “${term.analogy}” is a memory aid, while the technical definition guides implementation.`,
    simpleExplanation: `${term.simpleDefinition} That is why it belongs in a frontend developer's mental model.`,
    commonWrongAnswer: `${paired.term} and ${term.term} always mean exactly the same thing.`,
    whyWrong: `The ideas are related learning vocabulary, but ${paired.term} and ${term.term} have different definitions and responsibilities.`,
    hint: `Connect the definition to ${context}.`,
    relatedTutorialSlug: tutorialByCategory[term.category],
    relatedQuestionIds: [`practice-definition-${term.slug}`],
    tags: [term.category.toLowerCase(), term.slug, 'applied'],
    estimatedMinutes: 3,
    companies: [],
  });

  return [definitionQuestion, applicationQuestion];
});

const handcraftedSeeds: PracticeQuestion[] = [
  {
    id: 'practice-output-event-loop',
    title: 'Predict asynchronous output',
    question: 'What is the exact output order of this JavaScript program?',
    category: 'JavaScript',
    subcategory: 'Event loop',
    difficulty: 'Intermediate',
    experienceLevel: 'Junior',
    questionType: 'Predict the output',
    options: [
      option('correct', 'start, end, promise, timer'),
      option('wrong-one', 'start, promise, end, timer'),
      option('wrong-two', 'start, timer, promise, end'),
      option('wrong-three', 'start, end, timer, promise'),
    ],
    correctAnswers: ['correct'],
    detailedExplanation:
      'Synchronous logs run first. Promise reactions use the microtask queue, which is drained before the timer task can run.',
    simpleExplanation: 'Current code finishes, urgent Promise work runs, and then the timer runs.',
    code: "console.log('start');\nsetTimeout(() => console.log('timer'), 0);\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('end');",
    commonWrongAnswer: 'start, end, timer, promise',
    whyWrong:
      'A zero-millisecond timer is still a task, while the Promise callback is a microtask processed first.',
    hint: 'Separate synchronous work, microtasks, and tasks.',
    relatedTutorialSlug: 'async-javascript',
    relatedQuestionIds: ['practice-definition-event-loop', 'practice-definition-promise'],
    tags: ['javascript', 'event-loop', 'output'],
    estimatedMinutes: 4,
    companies: ['Amazon', 'Microsoft'],
  },
  {
    id: 'practice-bug-form-label',
    title: 'Find the inaccessible label',
    question: 'What is the most important accessibility bug in this form?',
    category: 'Accessibility',
    subcategory: 'Forms',
    difficulty: 'Beginner',
    experienceLevel: 'Foundation',
    questionType: 'Find the bug',
    options: [
      option('correct', 'The label is not programmatically associated with the input.'),
      option('wrong-one', 'Every input must use a placeholder instead of a label.'),
      option('wrong-two', 'The input must be replaced by a contenteditable div.'),
      option('wrong-three', 'The form needs role="form" before it can be submitted.'),
    ],
    correctAnswers: ['correct'],
    detailedExplanation:
      'A visible label needs an htmlFor value matching the input id, or it must wrap the input. That creates an accessible name and a larger click target.',
    simpleExplanation: 'The browser needs an explicit connection between the words and the field.',
    code: '<label>Email address</label>\n<input type="email" />',
    commonWrongAnswer: 'Add a placeholder and remove the label.',
    whyWrong:
      'A placeholder disappears as the user types and is not a reliable replacement for a persistent label.',
    hint: 'Ask how assistive technology knows which text names the field.',
    relatedTutorialSlug: 'accessibility',
    relatedQuestionIds: ['practice-definition-aria', 'practice-definition-semantic-html'],
    tags: ['accessibility', 'forms', 'html'],
    estimatedMinutes: 3,
    companies: [],
  },
  {
    id: 'practice-correct-react-key',
    title: 'Choose a stable React key',
    question: 'Which change best prevents state from moving to the wrong row after reordering?',
    category: 'React',
    subcategory: 'Reconciliation',
    difficulty: 'Intermediate',
    experienceLevel: 'Junior',
    questionType: 'Correct the code',
    options: [
      option('correct', 'Use key={item.id}, where id is stable and unique among siblings.'),
      option('wrong-one', 'Keep the array index and also add Math.random().'),
      option('wrong-two', 'Remove the key so React guesses from the text.'),
      option('wrong-three', 'Use the current Date as the key on every render.'),
    ],
    correctAnswers: ['correct'],
    detailedExplanation:
      'Keys identify sibling elements across renders. A stable data id lets reconciliation preserve the component instance belonging to each item.',
    simpleExplanation:
      'Give each row a lasting name that does not change when its position changes.',
    code: '{items.map((item, index) => <EditableRow key={index} item={item} />)}',
    commonWrongAnswer: 'Use Math.random() so every key is guaranteed to be unique.',
    whyWrong:
      'A random key changes every render, forcing remounts and discarding local component state.',
    hint: 'Identity should come from the data, not the current position.',
    relatedTutorialSlug: 'react-fundamentals',
    relatedQuestionIds: ['practice-definition-reconciliation', 'practice-definition-react-render'],
    tags: ['react', 'keys', 'debugging'],
    estimatedMinutes: 4,
    companies: ['Meta'],
  },
  {
    id: 'practice-code-deduplicate',
    title: 'Deduplicate an array',
    question: 'Which implementation returns unique primitive values without mutating the input?',
    category: 'DSA',
    subcategory: 'Hashing',
    difficulty: 'Beginner',
    experienceLevel: 'Junior',
    questionType: 'Coding challenge',
    options: [
      option('correct', 'const unique = values => [...new Set(values)];'),
      option('wrong-one', 'const unique = values => values.sort();'),
      option('wrong-two', 'const unique = values => values.pop();'),
      option('wrong-three', 'const unique = values => new Map(values);'),
    ],
    correctAnswers: ['correct'],
    detailedExplanation:
      'A Set keeps one occurrence of each primitive value, and spreading it into a new array preserves the caller-owned input.',
    simpleExplanation: 'A Set remembers each primitive once, then a new array is created from it.',
    commonWrongAnswer: 'Sort the original array and return it.',
    whyWrong:
      'Sorting alone does not remove duplicates and it mutates the original array unless a copy is made.',
    hint: 'Use a data structure that only stores unique values.',
    relatedQuestionIds: [
      'practice-definition-data-structure',
      'practice-definition-time-complexity',
    ],
    tags: ['dsa', 'set', 'arrays'],
    estimatedMinutes: 5,
    companies: [],
  },
  {
    id: 'practice-architecture-pagination',
    title: 'Choose a feed pagination strategy',
    question:
      'A live feed frequently receives new items. Which API pagination choice best avoids duplicate or skipped items?',
    category: 'System design',
    subcategory: 'Data fetching',
    difficulty: 'Advanced',
    experienceLevel: 'Senior',
    questionType: 'Architecture decision',
    options: [
      option('correct', 'Use a stable cursor based on the ordering boundary.'),
      option('wrong-one', 'Always request every item again from the first page.'),
      option('wrong-two', 'Use a random page number for each request.'),
      option('wrong-three', 'Store the entire feed in a URL fragment.'),
    ],
    correctAnswers: ['correct'],
    detailedExplanation:
      'Cursor pagination anchors the next request to a stable position in the ordered result, making inserts less disruptive than numeric offsets.',
    simpleExplanation: 'Continue after a known item instead of assuming page positions stay fixed.',
    commonWrongAnswer:
      'Offset pagination is always correct because page two always starts at the same record.',
    whyWrong:
      'New records inserted ahead of the offset can shift positions and cause duplicates or gaps.',
    hint: 'Imagine a new record arriving between the first and second request.',
    relatedQuestionIds: ['practice-definition-scalability', 'practice-definition-cache'],
    tags: ['system-design', 'pagination', 'api'],
    estimatedMinutes: 6,
    companies: ['Netflix', 'LinkedIn'],
  },
].map((question) => practiceQuestionSchema.parse(question));

const systemDesignQuestions: PracticeQuestion[] = systemDesignLearningTopics.flatMap(
  (topic, topicIndex) =>
    Array.from({ length: 4 }, (_, variant) => {
      const other =
        systemDesignLearningTopics[(topicIndex + variant + 5) % systemDesignLearningTopics.length]!;
      const prompts = [
        `Which explanation best describes ${topic.title}?`,
        `Which frontend impact matters when designing around ${topic.title}?`,
        `Which trade-off should be discussed for ${topic.title}?`,
        `An interviewer asks about ${topic.title}. Which answer is the most complete?`,
      ];
      const answers = [
        topic.simpleExplanation,
        topic.frontendImpact,
        topic.tradeOffs.join(' and '),
        topic.developerExplanation,
      ];
      return practiceQuestionSchema.parse({
        id: `practice-system-${topic.slug}-${variant + 1}`,
        title: `${topic.title}: system design ${variant + 1}`,
        question: prompts[variant]!,
        category: 'Frontend system design',
        subcategory: topic.title,
        difficulty: variant < 2 ? 'Intermediate' : 'Advanced',
        experienceLevel: variant < 2 ? 'Mid-level' : 'Senior',
        questionType:
          variant === 2 ? 'Multiple answer' : variant === 3 ? 'Architecture decision' : 'Scenario',
        options: [
          option('correct', answers[variant]!),
          option(
            'correct-context',
            `Define the requirement first, then justify ${topic.title} through measurable behaviour and failure modes.`,
          ),
          option('wrong-unrelated', other.simpleExplanation),
          option(
            'wrong-absolute',
            `${topic.title} has no trade-offs and should be used in every system.`,
          ),
        ],
        correctAnswers: variant === 2 ? ['correct', 'correct-context'] : ['correct'],
        detailedExplanation: `${topic.developerExplanation} For frontend teams: ${topic.frontendImpact}`,
        simpleExplanation: topic.simpleExplanation,
        commonWrongAnswer: `${topic.title} has no trade-offs and should be used in every system.`,
        whyWrong: `Architecture depends on requirements. ${topic.tradeOffs.join('; ')} are explicit trade-offs that prevent an absolute answer.`,
        hint: topic.analogy,
        relatedQuestionIds: [],
        tags: [topic.group, topic.slug, 'system-design'],
        estimatedMinutes: 5,
        companies: [],
      });
    }),
);

const dsaAssessmentQuestions: PracticeQuestion[] = dsaProblems.flatMap((problem) =>
  Array.from({ length: 6 }, (_, variant) => {
    const questions = [
      `Which pattern best fits ${problem.title}?`,
      `What is the target time complexity for ${problem.title}?`,
      `Which frontend situation is connected to ${problem.title}?`,
      `Which edge case should be tested for ${problem.title}?`,
      `What should be stated before optimising ${problem.title}?`,
      `Which invariant should remain true while solving ${problem.title}?`,
    ];
    const correct = [
      problem.patternSlug.replaceAll('-', ' '),
      problem.optimisedSolutions[0]!.complexity.time,
      problem.frontendConnection,
      problem.edgeCases[0]!,
      problem.bruteForceThinking,
      problem.optimisationSteps[1]!,
    ];
    return practiceQuestionSchema.parse({
      id: `practice-dsa-${problem.slug}-${variant + 1}`,
      title: `${problem.title}: reasoning check ${variant + 1}`,
      question: questions[variant]!,
      category: 'DSA',
      subcategory: problem.patternSlug.replaceAll('-', ' '),
      difficulty: problem.difficulty,
      experienceLevel: problem.difficulty === 'Advanced' ? 'Senior' : 'Junior',
      questionType:
        variant === 4 ? 'Conceptual' : variant === 5 ? 'Coding challenge' : 'Multiple choice',
      options: [
        option('correct', correct[variant]!),
        option(
          'wrong-quadratic',
          'Always use two nested loops without checking for repeated work.',
        ),
        option('wrong-mutate', 'Mutate every input immediately because ownership never matters.'),
        option(
          'wrong-syntax',
          'Choose whichever syntax is shortest without defining an invariant.',
        ),
      ],
      correctAnswers: ['correct'],
      detailedExplanation: `${problem.summary} The optimised solution uses ${problem.patternSlug.replaceAll('-', ' ')} with ${problem.optimisedSolutions[0]!.complexity.time} time and ${problem.optimisedSolutions[0]!.complexity.space} auxiliary space.`,
      simpleExplanation: `Name the pattern and invariant before memorising the code for ${problem.title}.`,
      commonWrongAnswer: 'Always use two nested loops without checking for repeated work.',
      whyWrong: `The worked optimisation removes repeated work and reaches ${problem.optimisedSolutions[0]!.complexity.time} time.`,
      hint: problem.hints[0]!,
      relatedQuestionIds: [],
      tags: [problem.patternSlug, problem.dataStructure, 'dsa'],
      estimatedMinutes: 4,
      companies: [],
    });
  }),
);

const machineCodingQuestions: PracticeQuestion[] = machineCodingChallenges.flatMap((challenge) =>
  [0, 1].map((variant) =>
    practiceQuestionSchema.parse({
      id: `practice-machine-${challenge.slug}-${variant + 1}`,
      title: `${challenge.title}: ${variant === 0 ? 'requirements' : 'architecture'}`,
      question:
        variant === 0
          ? `Which requirement should be clarified before coding ${challenge.title}?`
          : `Which architecture habit best supports ${challenge.title}?`,
      category: 'Machine coding',
      subcategory: challenge.title,
      difficulty: challenge.difficulty,
      experienceLevel: challenge.difficulty === 'Advanced' ? 'Senior' : 'Mid-level',
      questionType: variant === 0 ? 'Scenario' : 'Architecture decision',
      options: [
        option(
          'correct',
          variant === 0 ? challenge.functionalRequirements[0]! : challenge.evaluationCriteria[0]!,
        ),
        option(
          'wrong-ignore',
          'Skip loading, empty, error, keyboard, and narrow-screen behaviour.',
        ),
        option('wrong-global', 'Put every value in one global store before defining ownership.'),
        option(
          'wrong-polish',
          'Start with visual polish before the core interaction contract works.',
        ),
      ],
      correctAnswers: ['correct'],
      detailedExplanation: `${challenge.description} A strong implementation clarifies behaviour, models state ownership, delivers the core flow, then handles accessibility, failure, and performance.`,
      simpleExplanation: `Clarify the user flow and state before writing components for ${challenge.title}.`,
      commonWrongAnswer: 'Start with visual polish before the core interaction contract works.',
      whyWrong:
        'A polished surface cannot compensate for undefined behaviour, broken state transitions, or inaccessible interactions.',
      hint: challenge.hints[0]!,
      relatedQuestionIds: [],
      tags: [challenge.technology, challenge.kind, 'machine-coding'],
      estimatedMinutes: 5,
      companies: [],
    }),
  ),
);

export const practiceQuestions = validateUniqueIds(
  [
    ...generatedQuestions,
    ...handcraftedSeeds,
    ...systemDesignQuestions,
    ...dsaAssessmentQuestions,
    ...machineCodingQuestions,
  ],
  'practice question',
);

export const practiceCategories = [
  ...new Set(practiceQuestions.map((item) => item.category)),
].sort();
export const practiceQuestionTypes = [
  ...new Set(practiceQuestions.map((item) => item.questionType)),
].sort();
