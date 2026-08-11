import type { Difficulty } from '@/types/content';

export interface SourceTutorialSeed {
  title: string;
  plainEnglish: string;
  practice: string;
}

export interface SourceTutorialGroup {
  category: string;
  label: string;
  subcategory: string;
  difficulty: Difficulty;
  topics: SourceTutorialSeed[];
}

export const sourceTutorialGroups: SourceTutorialGroup[] = [
  {
    category: 'interview-preparation',
    label: 'Interview Preparation',
    subcategory: 'Planning and communication',
    difficulty: 'Beginner',
    topics: [
      {
        title: 'How frontend interviews work',
        plainEnglish:
          'A frontend interview is usually a series of conversations and coding tasks that check your web knowledge, problem solving, communication, and ability to build usable interfaces.',
        practice:
          'Write down the rounds in your next interview and one skill that each round is likely to test.',
      },
      {
        title: 'Build a frontend interview study plan',
        plainEnglish:
          'A study plan turns a large list of topics into small daily tasks, so you always know what to learn, practise, and review next.',
        practice:
          'Choose an interview date and divide your available days between fundamentals, coding, building, design, and review.',
      },
      {
        title: 'One-week frontend interview plan',
        plainEnglish:
          'A one-week plan is a focused revision sprint: cover only high-value fundamentals, common coding patterns, and one realistic interface each day.',
        practice:
          'Create seven two-hour sessions and give every session one learning task and one hands-on task.',
      },
      {
        title: 'One-month frontend interview plan',
        plainEnglish:
          'A one-month plan gives you enough time to rotate through HTML, CSS, JavaScript, React, DSA, machine coding, and system design without cramming everything at once.',
        practice:
          'Plan four weekly themes and leave the final two days of every week for mixed revision.',
      },
      {
        title: 'Three-month frontend interview plan',
        plainEnglish:
          'A three-month plan builds knowledge in layers: learn the basics first, practise them next, then rehearse full interview rounds under time limits.',
        practice:
          'Split twelve weeks into foundation, deliberate practice, and mock-interview phases.',
      },
      {
        title: 'Revise HTML for interviews',
        plainEnglish:
          'HTML revision means checking that you can choose meaningful elements, build forms, handle media, and explain how good markup helps accessibility and search engines.',
        practice:
          'Build a small article page and explain why you chose each landmark, heading, label, and button.',
      },
      {
        title: 'Revise CSS for interviews',
        plainEnglish:
          'CSS revision means understanding the box model, cascade, specificity, layout, responsive design, and the reasons behind common visual bugs.',
        practice:
          'Recreate a responsive card layout once with Flexbox and once with Grid, then compare them.',
      },
      {
        title: 'Revise JavaScript for interviews',
        plainEnglish:
          'JavaScript revision connects language basics with runtime behaviour: scope, closures, objects, asynchronous work, the event loop, and common utility functions.',
        practice:
          'Explain the output of one closure example and one promise example without running the code first.',
      },
      {
        title: 'Revise React for interviews',
        plainEnglish:
          'React revision is about explaining how props, state, rendering, effects, context, and component boundaries work together to produce an interface.',
        practice:
          'Build a searchable list and explain which values are state and which values can be calculated during rendering.',
      },
      {
        title: 'Revise browser fundamentals',
        plainEnglish:
          'Browser revision follows a request from the address bar through DNS, HTTP, parsing, layout, paint, JavaScript, storage, and browser security rules.',
        practice:
          'Draw the journey from entering a URL to seeing and interacting with the finished page.',
      },
      {
        title: 'Think aloud while coding',
        plainEnglish:
          'Thinking aloud means sharing your assumptions, options, and checks while you work, so the interviewer can understand your reasoning even before the code is complete.',
        practice:
          'Solve a small array problem while saying what you know, what you are unsure about, and what you will test.',
      },
      {
        title: 'Ask useful clarifying questions',
        plainEnglish:
          'Clarifying questions remove hidden assumptions about users, data, accessibility, scale, and edge cases before you spend time building the wrong solution.',
        practice:
          'For an autocomplete task, write five questions you would ask before opening the editor.',
      },
      {
        title: 'Explain technical trade-offs',
        plainEnglish:
          'A trade-off is a choice where improving one quality may cost another, such as choosing a simpler solution now instead of a more flexible but complex design.',
        practice:
          'Compare local component state with global state for a shopping cart and explain when each choice is reasonable.',
      },
      {
        title: 'Test code during an interview',
        plainEnglish:
          'Testing during an interview means checking a normal example, an empty value, a boundary value, and a failure case instead of only saying that the code should work.',
        practice: 'Write four test cases for a function that groups a list of people by age.',
      },
      {
        title: 'Handle an unfamiliar interview question',
        plainEnglish:
          'When a question is unfamiliar, reduce it to facts you do know, ask for constraints, try a small example, and build a basic correct solution before improving it.',
        practice:
          'Choose a problem you have never solved and spend five minutes writing only examples and constraints.',
      },
      {
        title: 'Use the STAR method',
        plainEnglish:
          'STAR is a simple story structure: describe the Situation, your Task, the Actions you personally took, and the measurable Result.',
        practice:
          'Write a two-minute STAR answer about a bug, performance problem, disagreement, or difficult deadline.',
      },
      {
        title: 'Talk about a frontend project',
        plainEnglish:
          'A good project explanation covers the user problem, your responsibilities, important technical choices, difficulties, results, and what you would improve now.',
        practice:
          'Prepare a three-minute explanation of one project without listing every library you used.',
      },
      {
        title: 'Prepare for a company-specific interview',
        plainEnglish:
          'Company-specific preparation means learning the expected rounds and role level, then spending more time on the skills that company actually tests.',
        practice:
          'Create a one-page brief containing the company rounds, likely topics, two projects, and five questions to ask.',
      },
      {
        title: 'Run a frontend mock interview',
        plainEnglish:
          'A mock interview is a timed rehearsal with realistic rules, spoken reasoning, follow-up questions, and feedback recorded immediately afterward.',
        practice:
          'Run a 45-minute mock containing ten minutes of discussion and thirty-five minutes of coding.',
      },
      {
        title: 'Frontend interview final-day checklist',
        plainEnglish:
          'The final day is for calm review and setup checks, not for learning a large new subject that will increase stress and reduce recall.',
        practice:
          'Check your editor, browser, meeting link, microphone, project stories, question list, and sleep plan.',
      },
    ],
  },
  {
    category: 'machine-coding-guide',
    label: 'Machine Coding Guides',
    subcategory: 'Building interface challenges',
    difficulty: 'Intermediate',
    topics: [
      {
        title: 'How to approach a machine-coding round',
        plainEnglish:
          'A machine-coding round asks you to turn a short product brief into a working interface while showing clear state, component design, accessibility, and time management.',
        practice:
          'Take a 60-minute task and reserve time for planning, the main flow, edge cases, and final review.',
      },
      {
        title: 'Turn requirements into user actions',
        plainEnglish:
          'User actions translate a vague brief into concrete sentences such as “the user opens a panel” or “the user retries a failed search.”',
        practice: 'Rewrite a todo-list brief as a checklist of actions and visible results.',
      },
      {
        title: 'Plan component boundaries',
        plainEnglish:
          'A component boundary is a sensible place to separate responsibility, state, reuse, or testing—not a rule that every small piece of markup needs its own file.',
        practice: 'Sketch the component tree for an autocomplete without writing code.',
      },
      {
        title: 'Model interface state',
        plainEnglish:
          'State modelling means naming every value that can change and avoiding combinations that should be impossible, such as loading and success being true together.',
        practice:
          'List the states of a file upload and the events that move it between those states.',
      },
      {
        title: 'Handle loading, empty, error and success states',
        plainEnglish:
          'A complete interface explains what is happening before data arrives, when no data exists, when something fails, and when the task succeeds.',
        practice: 'Add four visible states to a small data-fetching component.',
      },
      {
        title: 'Add keyboard support to UI components',
        plainEnglish:
          'Keyboard support lets a person reach, operate, and leave interactive controls without needing a mouse or touch screen.',
        practice:
          'Use Tab, Enter, Space, Escape, and arrow keys to test a component you already built.',
      },
      {
        title: 'Test a machine-coding solution',
        plainEnglish:
          'Test the behaviour users care about: the main flow, an empty case, an error, keyboard operation, and one rapid or repeated interaction.',
        practice: 'Write five test scenarios for a modal before implementing the tests.',
      },
      {
        title: 'Build an autocomplete',
        plainEnglish:
          'Autocomplete shows matching suggestions while someone types and must handle delays, stale requests, keyboard movement, selection, and no-result states.',
        practice:
          'Build a local autocomplete first, then add debounced remote results and stale-request protection.',
      },
      {
        title: 'Build an accessible accordion',
        plainEnglish:
          'An accordion is a list of headings with buttons that show or hide related panels while keeping the open state and accessibility attributes in sync.',
        practice: 'Build single-open and multiple-open accordion modes using real buttons.',
      },
      {
        title: 'Build a todo list',
        plainEnglish:
          'A todo list is a small CRUD application where users create, read, update, complete, filter, and delete items.',
        practice: 'Build a todo list with editing, filters, an empty state, and local persistence.',
      },
      {
        title: 'Build a star rating',
        plainEnglish:
          'A star rating lets someone preview a value, choose it, change it, and understand the current selection with both pointer and keyboard input.',
        practice:
          'Build a five-star input that supports arrow keys, hover preview, and a readable label.',
      },
      {
        title: 'Build tabs',
        plainEnglish:
          'Tabs switch between related panels while exposing which tab is selected and moving keyboard focus in a predictable way.',
        practice: 'Build tabs with arrow-key navigation and a separate selected and focused state.',
      },
      {
        title: 'Build an accessible modal',
        plainEnglish:
          'A modal temporarily moves attention into a dialog, keeps focus inside it, closes on Escape, and returns focus to the control that opened it.',
        practice:
          'Build a confirmation dialog and verify focus before, during, and after it opens.',
      },
      {
        title: 'Build an image carousel',
        plainEnglish:
          'A carousel moves through a collection of slides and must communicate the current slide, offer controls, and avoid unexpected automatic movement.',
        practice: 'Build previous, next, and direct-slide controls before considering autoplay.',
      },
      {
        title: 'Build infinite scrolling',
        plainEnglish:
          'Infinite scrolling loads another page near the end of a list while preventing duplicate requests and preserving loading, error, and finished states.',
        practice:
          'Use Intersection Observer to load paginated data and add a manual fallback button.',
      },
      {
        title: 'Build pagination',
        plainEnglish:
          'Pagination divides a large result set into pages and keeps the current page, total count, disabled controls, and URL state consistent.',
        practice:
          'Build first, previous, numbered, next, and last controls for a changing result count.',
      },
      {
        title: 'Build nested comments',
        plainEnglish:
          'Nested comments form a tree where each comment can have replies, and every add, edit, or delete operation must update the correct branch.',
        practice:
          'Render recursive replies and add reply and delete operations using stable identifiers.',
      },
      {
        title: 'Build a file explorer',
        plainEnglish:
          'A file explorer renders nested folders and files while preserving which folders are expanded and supporting selection and keyboard navigation.',
        practice:
          'Render an unknown-depth folder tree and keep expansion state separate from the data.',
      },
      {
        title: 'Build a progress bar controller',
        plainEnglish:
          'A controlled progress bar has explicit start, pause, resume, restart, and finish transitions instead of relying on a visual animation alone.',
        practice:
          'Build progress controls and announce meaningful percentage changes to assistive technology.',
      },
      {
        title: 'Build a Kanban board',
        plainEnglish:
          'A Kanban board organises tasks into columns and must update ordering correctly when cards move within or between columns.',
        practice: 'Support card movement with buttons before adding drag and drop.',
      },
      {
        title: 'Build a chat interface',
        plainEnglish:
          'A chat interface handles ordered messages, sending states, retries, scrolling, long content, and clear ownership of each message.',
        practice: 'Build optimistic message sending with a visible failed state and retry action.',
      },
      {
        title: 'Build a poll widget',
        plainEnglish:
          'A poll widget lets someone choose an option, submit once, and then understand the result counts and percentages.',
        practice: 'Build a poll that prevents duplicate votes locally and handles a tied result.',
      },
      {
        title: 'Build tic-tac-toe',
        plainEnglish:
          'Tic-tac-toe is a small state-machine exercise: alternate players, reject invalid moves, detect a winner, detect a draw, and reset cleanly.',
        practice:
          'Keep the board as data and calculate the winner instead of storing a second winner state.',
      },
      {
        title: 'Build an image gallery',
        plainEnglish:
          'An image gallery combines responsive media, loading behaviour, search or filtering, selection, and an accessible full-size view.',
        practice: 'Build a searchable gallery with lazy images and a keyboard-accessible preview.',
      },
      {
        title: 'Build a day calendar',
        plainEnglish:
          'A day calendar places events on a time axis and must handle overlaps, scrolling, time labels, and readable event details.',
        practice: 'Render events from start and end minutes, including two events that overlap.',
      },
    ],
  },
  {
    category: 'javascript-coding',
    label: 'JavaScript Coding',
    subcategory: 'Common implementation exercises',
    difficulty: 'Intermediate',
    topics: [
      {
        title: 'Implement Array map',
        plainEnglish:
          'Map visits every array item, creates a new value for it, and returns a new array without changing the original array.',
        practice:
          'Write a map function that supports the value, index, and original array arguments.',
      },
      {
        title: 'Implement Array filter',
        plainEnglish:
          'Filter tests every item and returns a new array containing only the items whose test result is true.',
        practice: 'Write filter from a loop and test it with an empty array and a sparse array.',
      },
      {
        title: 'Implement Array reduce',
        plainEnglish:
          'Reduce carries one accumulated value through an array and uses each item to produce the next accumulated value.',
        practice: 'Implement reduce with and without an explicit initial value.',
      },
      {
        title: 'Implement Array flat',
        plainEnglish:
          'Flat removes a chosen number of nested array levels while keeping the item order unchanged.',
        practice: 'Write recursive and iterative versions that accept a depth.',
      },
      {
        title: 'Implement debounce',
        plainEnglish:
          'Debounce waits until calls have stopped for a chosen time, then runs the latest call once.',
        practice: 'Build a debounced search handler with cancellation and preserved arguments.',
      },
      {
        title: 'Implement throttle',
        plainEnglish:
          'Throttle limits a function so it can run at most once during each time window, even when events arrive more often.',
        practice: 'Build a throttle with clear leading and trailing-call behaviour.',
      },
      {
        title: 'Implement curry',
        plainEnglish:
          'Currying changes a function that takes several arguments into a chain of functions that each collect part of those arguments.',
        practice: 'Curry a three-argument function and support partial calls of different sizes.',
      },
      {
        title: 'Implement memoize',
        plainEnglish:
          'Memoisation remembers a result for an input so repeated calls can return the saved value instead of doing the work again.',
        practice:
          'Memoise a pure function and decide how object arguments should become cache keys.',
      },
      {
        title: 'Implement once',
        plainEnglish:
          'Once wraps a function so only the first call runs it; later calls return the first result.',
        practice: 'Preserve the original function arguments, return value, and this value.',
      },
      {
        title: 'Implement deep clone',
        plainEnglish:
          'A deep clone creates new nested objects instead of sharing nested references with the original value.',
        practice:
          'Start with arrays and plain objects, then list the types your version does not support.',
      },
      {
        title: 'Implement groupBy',
        plainEnglish:
          'GroupBy sorts items into named buckets using a function that returns the bucket key for each item.',
        practice: 'Group people by age range without changing the input array.',
      },
      {
        title: 'Implement an EventEmitter',
        plainEnglish:
          'An event emitter stores listeners by event name and lets code subscribe, unsubscribe, and notify those listeners later.',
        practice: 'Implement on, off, once, and emit with safe listener iteration.',
      },
      {
        title: 'Implement Promise all',
        plainEnglish:
          'Promise.all waits for every input to succeed, keeps the original order of results, and rejects as soon as one input fails.',
        practice: 'Support plain values, promises, an empty list, ordering, and early rejection.',
      },
      {
        title: 'Implement Promise allSettled',
        plainEnglish:
          'Promise.allSettled waits for every input and returns a success or failure description for each one instead of rejecting early.',
        practice: 'Return status objects in the same order as the inputs.',
      },
      {
        title: 'Implement Promise race',
        plainEnglish:
          'Promise.race settles with the first input that settles, whether that first result is a success or a failure.',
        practice: 'Race a request against a timeout and explain what happens to the slower work.',
      },
      {
        title: 'Implement retry with backoff',
        plainEnglish:
          'Retry with backoff repeats failed temporary work while increasing the wait between attempts to avoid making an outage worse.',
        practice: 'Retry only selected errors and stop after a fixed number of attempts.',
      },
      {
        title: 'Implement a concurrency limiter',
        plainEnglish:
          'A concurrency limiter runs only a chosen number of asynchronous tasks at once and starts another when one finishes.',
        practice: 'Run ten promise-returning tasks with a maximum concurrency of three.',
      },
      {
        title: 'Implement compose and pipe',
        plainEnglish:
          'Compose and pipe connect small functions so the output of one becomes the input of the next; they differ mainly in direction.',
        practice: 'Build both helpers and use them to clean, transform, and format a string.',
      },
      {
        title: 'Implement get by object path',
        plainEnglish:
          'A path getter safely walks through nested object keys and returns a default value when part of the path is missing.',
        practice:
          'Support dot paths, array paths, missing values, and values that are intentionally undefined.',
      },
      {
        title: 'Implement a cancellable delay',
        plainEnglish:
          'A cancellable delay returns a promise that finishes after a timeout unless a cancellation signal stops it first.',
        practice: 'Use AbortController and make sure the timer is always cleaned up.',
      },
    ],
  },
  {
    category: 'dsa-interview-guide',
    label: 'DSA Interview Guides',
    subcategory: 'Problem-solving foundations',
    difficulty: 'Beginner',
    topics: [
      {
        title: 'How to start a DSA problem',
        plainEnglish:
          'Start by restating the problem, writing a tiny example, naming the input and output, and listing constraints before choosing an algorithm.',
        practice: 'Use this five-minute routine on a problem without writing code.',
      },
      {
        title: 'Understand time complexity',
        plainEnglish:
          'Time complexity describes how the amount of work grows when the input becomes larger; it is about growth, not exact stopwatch time.',
        practice: 'Label simple loops as constant, linear, quadratic, or logarithmic.',
      },
      {
        title: 'Understand space complexity',
        plainEnglish:
          'Space complexity describes how much extra memory an algorithm needs as the input grows.',
        practice: 'Compare copying an array with changing it in place and list the trade-offs.',
      },
      {
        title: 'Solve array problems',
        plainEnglish:
          'Array problems often become easier when you track positions, running totals, frequencies, or a smaller window instead of checking every pair.',
        practice: 'Solve move-zeroes and best-time-to-buy-stock using one pass.',
      },
      {
        title: 'Solve string problems',
        plainEnglish:
          'String problems usually treat text as an ordered sequence and use counting, two pointers, a window, or a stack.',
        practice: 'Solve valid palindrome and valid anagram using two different patterns.',
      },
      {
        title: 'Use a hash map for fast lookup',
        plainEnglish:
          'A hash map stores a value under a key so you can usually find, add, or update it without scanning the entire collection.',
        practice: 'Solve two-sum and group-anagrams with a Map.',
      },
      {
        title: 'Understand linked lists',
        plainEnglish:
          'A linked list stores each value in a node that points to another node, so movement follows links instead of numeric indexes.',
        practice: 'Draw and then reverse a three-node linked list by hand.',
      },
      {
        title: 'Use stacks and queues',
        plainEnglish:
          'A stack removes the most recently added item first, while a queue removes the earliest added item first.',
        practice: 'Use a stack for brackets and a queue for breadth-first traversal.',
      },
      {
        title: 'Recognise binary search',
        plainEnglish:
          'Binary search repeatedly removes half of an ordered search space, which makes it much faster than checking every value.',
        practice: 'Write the loop and test missing values and one-item arrays.',
      },
      {
        title: 'Recognise the two-pointer pattern',
        plainEnglish:
          'Two pointers track two positions that move according to a rule, often avoiding a nested loop in ordered data.',
        practice: 'Solve a sorted two-sum problem and a palindrome check.',
      },
      {
        title: 'Recognise the sliding-window pattern',
        plainEnglish:
          'A sliding window keeps information about one continuous range and updates that information as the range moves.',
        practice: 'Find the longest substring without repeating characters.',
      },
      {
        title: 'Understand recursion',
        plainEnglish:
          'Recursion solves a problem by calling the same logic on a smaller version until it reaches a case that needs no more calls.',
        practice: 'Trace factorial and a tree traversal on paper before coding.',
      },
      {
        title: 'Traverse a binary tree',
        plainEnglish:
          'Tree traversal visits nodes in a chosen order, such as depth-first for a branch at a time or breadth-first for a level at a time.',
        practice: 'Implement preorder and level-order traversal.',
      },
      {
        title: 'Understand binary search trees',
        plainEnglish:
          'A binary search tree keeps smaller values on one side and larger values on the other, allowing ordered search when the tree stays balanced.',
        practice: 'Insert values and validate whether a sample tree follows the ordering rule.',
      },
      {
        title: 'Use a heap for priorities',
        plainEnglish:
          'A heap keeps the smallest or largest item easy to remove, which is useful when you repeatedly need the next highest-priority value.',
        practice: 'Use a small heap to keep the three largest values seen so far.',
      },
      {
        title: 'Recognise backtracking',
        plainEnglish:
          'Backtracking tries a choice, explores what follows, then removes that choice when it needs to try another path.',
        practice: 'Generate all subsets of a three-item array.',
      },
      {
        title: 'Recognise greedy algorithms',
        plainEnglish:
          'A greedy algorithm takes the best-looking choice at each step and only works when those local choices can be proven to produce a correct final answer.',
        practice: 'Solve assign-cookies and explain why the sorting choice works.',
      },
      {
        title: 'Recognise dynamic programming',
        plainEnglish:
          'Dynamic programming saves answers to repeated smaller problems so the same work is not calculated again.',
        practice: 'Solve climbing stairs first with recursion, then memoisation, then a loop.',
      },
      {
        title: 'Traverse a graph',
        plainEnglish:
          'A graph is a set of values connected by edges, and traversal uses a visited set to avoid processing the same value forever.',
        practice: 'Implement breadth-first and depth-first traversal for an adjacency list.',
      },
      {
        title: 'Dry-run an algorithm',
        plainEnglish:
          'A dry run means manually tracking variables and data changes for one example so you can find mistakes before or after writing code.',
        practice: 'Create a table of variable values for a two-pointer solution.',
      },
    ],
  },
  {
    category: 'framework-fundamentals',
    label: 'Framework Fundamentals',
    subcategory: 'React, Angular, Vue and Svelte',
    difficulty: 'Beginner',
    topics: [
      {
        title: 'How to choose a frontend framework',
        plainEnglish:
          'Choose a framework by considering the team, product needs, ecosystem, hiring, maintenance, and delivery constraints—not by chasing popularity alone.',
        practice:
          'Compare React, Angular, Vue, and Svelte for a small dashboard and a large enterprise app.',
      },
      {
        title: 'Angular introduction',
        plainEnglish:
          'Angular is a complete TypeScript framework with built-in patterns for components, templates, dependency injection, routing, forms, and HTTP work.',
        practice: 'Create an Angular component that receives input and emits a user action.',
      },
      {
        title: 'Angular components and templates',
        plainEnglish:
          'An Angular component connects a TypeScript class with an HTML template and styles, then updates the view through bindings.',
        practice: 'Build a filtered list using property, event, and two-way binding.',
      },
      {
        title: 'Angular services and dependency injection',
        plainEnglish:
          'An Angular service holds reusable logic, while dependency injection provides that service where it is needed without constructing it manually everywhere.',
        practice: 'Move data loading from a component into an injected service.',
      },
      {
        title: 'Vue introduction',
        plainEnglish:
          'Vue is a progressive framework that combines templates, reactive state, and components with an approachable path from small widgets to full applications.',
        practice: 'Build a Vue counter and a filtered list.',
      },
      {
        title: 'Vue Composition API',
        plainEnglish:
          'The Vue Composition API groups reactive state and related behaviour together using functions such as ref, reactive, and computed.',
        practice: 'Extract reusable search behaviour into a Vue composable.',
      },
      {
        title: 'Vue state management',
        plainEnglish:
          'Vue state management moves shared application data into a predictable store while keeping temporary local UI state near the component.',
        practice: 'Model a shopping cart with local component state and a Pinia-style store.',
      },
      {
        title: 'Svelte introduction',
        plainEnglish:
          'Svelte compiles components into focused JavaScript updates, so much of its reactivity feels like ordinary variables and assignments.',
        practice: 'Build a Svelte counter, derived total, and conditional message.',
      },
      {
        title: 'Svelte reactivity',
        plainEnglish:
          'Svelte reactivity updates dependent interface work when reactive values change, with the compiler helping generate the update code.',
        practice: 'Create a derived filtered list and inspect when it recalculates.',
      },
      {
        title: 'Compare React and Angular',
        plainEnglish:
          'React provides a UI library and flexible ecosystem, while Angular provides a larger built-in application framework with stronger conventions.',
        practice:
          'Compare routing, forms, data access, and state choices for the same application.',
      },
      {
        title: 'Compare React and Vue',
        plainEnglish:
          'React commonly describes UI with JavaScript and JSX, while Vue commonly separates a template from script and styles inside a component file.',
        practice: 'Build the same small form in both mental models and compare state updates.',
      },
      {
        title: 'Compare React and Svelte',
        plainEnglish:
          'React performs component rendering through a runtime model, while Svelte moves more work into a compile step that generates targeted updates.',
        practice: 'Compare a derived value, an effect, and a list update in both approaches.',
      },
    ],
  },
];

export const sourceTutorialDetails = new Map(
  sourceTutorialGroups.flatMap((group) =>
    group.topics.map((topic) => [`${group.category}:${topic.title}`, topic] as const),
  ),
);
