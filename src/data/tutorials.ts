import type { CodeExample, Difficulty, Tutorial } from '@/types/content';
import { sourceTutorialDetails, sourceTutorialGroups } from '@/data/sourceTutorials';

interface TutorialGroup {
  category: string;
  label: string;
  subcategory: string;
  difficulty: Difficulty;
  topics: string[];
}

const baseGroups: TutorialGroup[] = [
  {
    category: 'browser',
    label: 'Browser',
    subcategory: 'Web platform',
    difficulty: 'Beginner',
    topics: [
      'What happens when you enter a URL?',
      'DOM and CSSOM',
      'Browser rendering process',
      'Cookies vs localStorage vs sessionStorage',
      'CORS',
    ],
  },
  {
    category: 'html',
    label: 'HTML',
    subcategory: 'Markup',
    difficulty: 'Beginner',
    topics: ['HTML document structure', 'Semantic HTML', 'Forms', 'Accessibility', 'SEO basics'],
  },
  {
    category: 'css',
    label: 'CSS',
    subcategory: 'Layout and styling',
    difficulty: 'Beginner',
    topics: ['Box model', 'Flexbox', 'CSS Grid', 'Responsive design', 'Positioning'],
  },
  {
    category: 'javascript',
    label: 'JavaScript',
    subcategory: 'Language fundamentals',
    difficulty: 'Intermediate',
    topics: [
      'Scope',
      'Hoisting',
      'Closures',
      'Promises',
      'Async and await',
      'Event loop',
      'Call, apply and bind',
      'Debounce and throttle',
      'Array methods',
      'Prototype',
    ],
  },
  {
    category: 'typescript',
    label: 'TypeScript',
    subcategory: 'Type systems',
    difficulty: 'Intermediate',
    topics: [
      'Interfaces vs types',
      'Generics',
      'Utility types',
      'Type guards',
      'TypeScript with React',
    ],
  },
  {
    category: 'react',
    label: 'React',
    subcategory: 'UI engineering',
    difficulty: 'Intermediate',
    topics: [
      'Components and props',
      'State',
      'useEffect',
      'useMemo',
      'useCallback',
      'Context API',
      'Redux Toolkit',
      'React Query',
      'React performance',
      'Custom hooks',
    ],
  },
  {
    category: 'nextjs',
    label: 'Next.js',
    subcategory: 'React frameworks',
    difficulty: 'Advanced',
    topics: [
      'App Router',
      'Server and client components',
      'Data fetching',
      'Caching',
      'Metadata',
      'Server actions',
    ],
  },
];

const curriculumAdditions: Record<string, string[]> = {
  browser: [
    'What is a browser?',
    'Browser architecture',
    'Browser engine',
    'Rendering engine',
    'JavaScript engine',
    'Chrome V8 engine',
    'HTML parsing',
    'CSS parsing',
    'DOM',
    'CSSOM',
    'Render tree',
    'Layout',
    'Paint',
    'Composite',
    'Critical rendering path',
    'Reflow',
    'Repaint',
    'Browser event loop',
    'Browser storage',
    'Cookies',
    'localStorage',
    'sessionStorage',
    'IndexedDB',
    'Browser cache',
    'Service workers',
    'Web workers',
    'Same-origin policy',
    'Content Security Policy',
    'Browser developer tools',
  ],
  html: [
    'HTML introduction',
    'Elements',
    'Tags',
    'Attributes',
    'Headings',
    'Paragraphs',
    'Formatting elements',
    'Links',
    'Images',
    'Lists',
    'Tables',
    'Input types',
    'Labels',
    'Buttons',
    'Select and option',
    'Textarea',
    'Form validation',
    'Header element',
    'Footer element',
    'Main element',
    'Section element',
    'Article element',
    'Aside element',
    'Nav element',
    'Audio',
    'Video',
    'iframe',
    'Canvas introduction',
    'SVG introduction',
    'Meta tags',
    'Open Graph tags',
    'SEO-friendly HTML',
    'ARIA basics',
    'Responsive images',
    'Picture element',
    'Source element',
    'Data attributes',
    'HTML entities',
    'Web components introduction',
    'Custom elements',
    'Shadow DOM introduction',
  ],
  css: [
    'CSS introduction',
    'Inline, internal and external CSS',
    'Selectors',
    'Specificity',
    'Cascade',
    'Inheritance',
    'Colours',
    'Units',
    'Typography',
    'Margin',
    'Padding',
    'Border',
    'Width and height',
    'Display',
    'Overflow',
    'Z-index',
    'Stacking context',
    'Media queries',
    'Mobile-first design',
    'Pseudo-classes',
    'Pseudo-elements',
    'Transitions',
    'Transformations',
    'Animations',
    'CSS variables',
    'Gradients',
    'Shadows',
    'Object-fit',
    'Aspect ratio',
    'Container queries',
    'CSS functions',
    'calc',
    'clamp',
    'min and max',
    'CSS Modules',
    'SCSS',
    'BEM methodology',
    'Tailwind CSS',
    'CSS-in-JS',
    'Design tokens',
    'CSS architecture',
    'Cross-browser compatibility',
    'CSS accessibility',
    'CSS performance',
  ],
  javascript: [
    'JavaScript introduction',
    'How JavaScript runs',
    'Variables',
    'var, let and const',
    'Data types',
    'Primitive and reference values',
    'Operators',
    'Type conversion',
    'Truthy and falsy values',
    'Conditions',
    'switch',
    'Loops',
    'Functions',
    'Function expressions',
    'Arrow functions',
    'Parameters',
    'Return values',
    'Arrays',
    'Objects',
    'Strings',
    'Numbers',
    'Date',
    'Math',
    'Set',
    'Map',
    'WeakSet',
    'WeakMap',
    'Destructuring',
    'Spread operator',
    'Rest operator',
    'Template literals',
    'Optional chaining',
    'Nullish coalescing',
    'Modules',
    'Error handling',
    'Execution context',
    'Call stack',
    'Memory heap',
    'Scope chain',
    'Lexical scope',
    'Temporal Dead Zone',
    'this keyword',
    'Prototype chain',
    'Constructor functions',
    'Classes',
    'Inheritance',
    'Encapsulation',
    'Polymorphism',
    'Microtask queue',
    'Macrotask queue',
    'Callbacks',
    'Callback hell',
    'Promise chaining',
    'Promise.all',
    'Promise.allSettled',
    'Promise.race',
    'Promise.any',
    'Fetch API',
    'AbortController',
    'Generators',
    'Iterators',
    'Currying',
    'Partial application',
    'Composition',
    'Pure functions',
    'Immutability',
    'Memoisation',
    'Shallow copy',
    'Deep copy',
    'Garbage collection',
    'Memory leaks',
    'Event delegation',
    'Event bubbling',
    'Event capturing',
    'Custom events',
    'Polyfills',
    'Functional programming',
    'Object-oriented programming',
    'JavaScript design patterns',
  ],
  typescript: [
    'TypeScript introduction',
    'Type inference',
    'Primitive types',
    'Arrays',
    'Tuples',
    'Objects',
    'Functions',
    'Interfaces',
    'Type aliases',
    'Optional properties',
    'Readonly properties',
    'Union types',
    'Intersection types',
    'Literal types',
    'Enums',
    'unknown',
    'never',
    'void',
    'Generic constraints',
    'keyof',
    'typeof',
    'Indexed access types',
    'Type narrowing',
    'Mapped types',
    'Conditional types',
    'Template literal types',
    'Declaration files',
    'TypeScript configuration',
    'Typing API responses',
    'Typing reusable components',
    'Advanced TypeScript interview questions',
  ],
  react: [
    'React introduction',
    'Why React exists',
    'SPA concepts',
    'JSX',
    'Components',
    'Props',
    'Events',
    'Conditional rendering',
    'Lists and keys',
    'Forms',
    'Controlled components',
    'Uncontrolled components',
    'Lifting state',
    'Composition',
    'Children',
    'Fragments',
    'Portals',
    'Refs',
    'Forward refs',
    'React Router',
    'Error boundaries',
    'Lazy loading',
    'Suspense',
    'Code splitting',
    'React.memo',
    'useState',
    'useContext',
    'useReducer',
    'useRef',
    'useLayoutEffect',
    'useImperativeHandle',
    'useTransition',
    'useDeferredValue',
    'useId',
    'React rendering',
    'Virtual DOM',
    'Reconciliation',
    'React Fiber introduction',
    'State batching',
    'Strict Mode',
    'Component lifecycle',
    'Higher-order components',
    'Render props',
    'Compound components',
    'Controlled component patterns',
    'React design patterns',
    'React accessibility',
    'React security',
    'React testing',
  ],
  nextjs: [
    'Next.js introduction',
    'React versus Next.js',
    'Project structure',
    'Pages',
    'Layouts',
    'Nested routes',
    'Dynamic routes',
    'Route groups',
    'Parallel routes',
    'Intercepting routes',
    'Rendering strategies',
    'Static rendering',
    'Dynamic rendering',
    'Server-side rendering',
    'Static-site generation',
    'Incremental static regeneration',
    'Streaming',
    'Suspense',
    'Revalidation',
    'Route handlers',
    'Middleware',
    'SEO',
    'Image optimisation',
    'Font optimisation',
    'Authentication concepts',
    'Error handling',
    'Loading UI',
    'Internationalisation',
    'Security',
    'Testing',
    'Performance',
    'Deployment',
  ],
};

const additionalGroups: TutorialGroup[] = [
  {
    category: 'computer-fundamentals',
    label: 'Computer Fundamentals',
    subcategory: 'How computers work',
    difficulty: 'Beginner',
    topics: [
      'What is a computer?',
      'Hardware and software',
      'CPU',
      'RAM',
      'Storage',
      'Operating system',
      'Files and folders',
      'Programs and processes',
      'How applications run',
      'Command line basics',
      'Terminal basics',
      'Environment variables',
      'Binary numbers',
      'How computers store text',
      'Unicode and character encoding',
    ],
  },
  {
    category: 'internet',
    label: 'Internet Fundamentals',
    subcategory: 'Networks and web communication',
    difficulty: 'Beginner',
    topics: [
      'What is the internet?',
      'Internet versus web',
      'Client and server',
      'IP address',
      'Domain name',
      'DNS',
      'URL structure',
      'Ports',
      'Protocols',
      'HTTP',
      'HTTPS',
      'HTTP request and response',
      'HTTP methods',
      'Status codes',
      'Headers',
      'Request body',
      'Query parameters',
      'Path parameters',
      'Cookies',
      'Sessions',
      'CDN',
      'Proxy',
      'Reverse proxy',
      'Load balancer',
      'WebSocket',
      'REST API',
      'GraphQL introduction',
    ],
  },
  {
    category: 'dom',
    label: 'DOM and Browser Programming',
    subcategory: 'Web APIs',
    difficulty: 'Intermediate',
    topics: [
      'Selecting elements',
      'Creating elements',
      'Updating elements',
      'Removing elements',
      'Attributes',
      'Classes',
      'Inline styles',
      'DOM traversal',
      'Event listeners',
      'Form events',
      'Keyboard events',
      'Mouse events',
      'Touch events',
      'Drag and drop',
      'Intersection Observer',
      'Mutation Observer',
      'Resize Observer',
      'Clipboard API',
      'Geolocation API',
      'Notification API',
      'History API',
      'Web Storage API',
      'File API',
      'Canvas basics',
    ],
  },
  {
    category: 'git-and-tools',
    label: 'Git and Development Tools',
    subcategory: 'Developer workflow',
    difficulty: 'Beginner',
    topics: [
      'Git introduction',
      'GitHub introduction',
      'Repository',
      'Clone',
      'Add',
      'Commit',
      'Push',
      'Pull',
      'Branch',
      'Merge',
      'Rebase',
      'Stash',
      'Cherry-pick',
      'Reset',
      'Revert',
      'Merge conflict',
      'Pull requests',
      'Git workflows',
      'npm',
      'package.json',
      'Semantic versioning',
      'npm scripts',
      'Vite',
      'Webpack',
      'Babel',
      'ESLint',
      'Prettier',
      'Browser DevTools',
      'Debugging',
      'Source maps',
    ],
  },
  {
    category: 'state-and-api',
    label: 'State and API Management',
    subcategory: 'Application data',
    difficulty: 'Intermediate',
    topics: [
      'Client state',
      'Server state',
      'Local state',
      'Global state',
      'Context API',
      'Redux',
      'Redux Toolkit',
      'Redux middleware',
      'Redux Thunk',
      'Zustand',
      'TanStack Query',
      'Query keys',
      'Caching',
      'Stale data',
      'Background refetching',
      'Pagination',
      'Infinite queries',
      'Optimistic updates',
      'API error handling',
      'Axios',
      'Fetch',
      'API interceptors',
      'Request cancellation',
      'Retry strategy',
    ],
  },
  {
    category: 'testing',
    label: 'Testing',
    subcategory: 'Quality engineering',
    difficulty: 'Intermediate',
    topics: [
      'Why testing matters',
      'Unit testing',
      'Integration testing',
      'End-to-end testing',
      'Test pyramid',
      'Vitest',
      'Jest',
      'React Testing Library',
      'Testing components',
      'Testing hooks',
      'Testing forms',
      'Testing APIs',
      'Mocking',
      'Spies',
      'Cypress introduction',
      'Playwright introduction',
      'Accessibility testing',
      'Snapshot testing',
      'Test coverage',
    ],
  },
  {
    category: 'performance',
    label: 'Web Performance',
    subcategory: 'Speed and responsiveness',
    difficulty: 'Intermediate',
    topics: [
      'Performance fundamentals',
      'Core Web Vitals',
      'Largest Contentful Paint',
      'Interaction to Next Paint',
      'Cumulative Layout Shift',
      'Time to First Byte',
      'Bundle size',
      'Tree shaking',
      'Code splitting',
      'Lazy loading',
      'Image optimisation',
      'Font optimisation',
      'Caching',
      'CDN',
      'Resource hints',
      'Preload',
      'Prefetch',
      'Memoisation',
      'Virtualisation',
      'Performance profiling',
      'Network waterfall',
      'Lighthouse',
      'Performance budgets',
    ],
  },
  {
    category: 'security',
    label: 'Web Security',
    subcategory: 'Frontend security',
    difficulty: 'Intermediate',
    topics: [
      'Authentication versus authorisation',
      'HTTPS',
      'CORS',
      'Same-origin policy',
      'XSS',
      'CSRF',
      'SQL injection introduction',
      'Content Security Policy',
      'Secure cookies',
      'HttpOnly',
      'SameSite',
      'JWT concepts',
      'OAuth concepts',
      'Input validation',
      'Output encoding',
      'Dependency security',
      'Clickjacking',
      'Rate limiting',
      'Safe file uploads',
      'Frontend secrets',
      'Environment variables',
    ],
  },
  {
    category: 'accessibility',
    label: 'Accessibility',
    subcategory: 'Inclusive interfaces',
    difficulty: 'Beginner',
    topics: [
      'Accessibility introduction',
      'WCAG fundamentals',
      'Semantic HTML',
      'Keyboard navigation',
      'Focus management',
      'Screen readers',
      'ARIA',
      'Accessible forms',
      'Accessible tables',
      'Accessible modals',
      'Accessible menus',
      'Colour contrast',
      'Reduced motion',
      'Accessibility testing',
      'Common accessibility interview questions',
    ],
  },
];

const groups: TutorialGroup[] = [
  ...baseGroups.map((group) => ({
    ...group,
    topics: [
      ...group.topics,
      ...(curriculumAdditions[group.category] ?? []).filter(
        (topic) => !group.topics.includes(topic),
      ),
    ],
  })),
  ...additionalGroups,
  ...sourceTutorialGroups.map((group) => ({
    category: group.category,
    label: group.label,
    subcategory: group.subcategory,
    difficulty: group.difficulty,
    topics: group.topics.map((topic) => topic.title),
  })),
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const categoryContext: Record<string, string> = {
  'computer-fundamentals':
    'Computer fundamentals explain the hardware, operating system, files, memory, and encodings underneath every frontend tool.',
  internet:
    'Internet fundamentals connect names, addresses, protocols, requests, servers, security, and delivery infrastructure into one understandable path.',
  browser:
    'The browser coordinates networking, parsing, style calculation, layout, paint, and JavaScript while protecting users with a strict security model.',
  html: 'HTML gives content meaning. Strong semantics improve accessibility, resilience, SEO, and collaboration before any CSS is added.',
  css: 'CSS resolves a cascade of declarations into layout and pixels. Understanding that pipeline makes responsive interfaces much easier to debug.',
  javascript:
    'JavaScript is single-threaded at the language level and works with host APIs through an event-driven runtime.',
  typescript:
    'TypeScript checks assumptions before runtime. The best types model real domain constraints without hiding how JavaScript behaves.',
  react:
    'React turns state into interface descriptions. Predictable components keep rendering pure and move synchronization into explicit boundaries.',
  nextjs:
    'Next.js combines React with routing, server rendering, caching, and deployment conventions for complete web applications.',
  dom: 'DOM and browser APIs let JavaScript inspect documents, respond to input, observe changes, and use device capabilities through permission-aware interfaces.',
  'git-and-tools':
    'Developer tools make code repeatable to build, inspect, collaborate on, test, format, and ship safely.',
  'state-and-api':
    'State and API architecture separates local interaction, shareable URL state, remote server data, caching, and recoverable mutations.',
  testing:
    'Testing creates fast feedback about behaviour and contracts at unit, integration, accessibility, and complete-journey levels.',
  performance:
    'Web performance turns network, rendering, JavaScript, media, caching, and user timing evidence into faster experiences.',
  security:
    'Web security protects users and data through explicit trust boundaries, safe output, server enforcement, and browser policy.',
  accessibility:
    'Accessibility combines semantic structure, keyboard operation, focus, perceivable feedback, and testing for diverse users.',
  'interview-preparation':
    'Interview preparation is a repeatable cycle of reviewing fundamentals, practising realistic tasks, explaining decisions, and revisiting weak areas.',
  'machine-coding-guide':
    'Machine-coding practice turns a short product brief into a working, accessible interface under a realistic time limit.',
  'javascript-coding':
    'JavaScript implementation exercises reveal how familiar language utilities work instead of treating them as magic.',
  'dsa-interview-guide':
    'DSA practice teaches you to recognise reusable problem shapes and reason about correctness, time, and memory.',
  'framework-fundamentals':
    'Framework fundamentals help you understand the shared component ideas and important differences between modern frontend tools.',
};

const categoryPlainMeaning: Record<string, string> = {
  'computer-fundamentals':
    'This is one of the basic ideas that explains what your computer is doing while you write and run frontend code.',
  internet:
    'This is part of the journey that moves information between a browser and another computer on the internet.',
  browser: 'This is one job the browser performs while it loads, displays, or protects a web page.',
  html: 'This is an HTML idea used to give web content structure or meaning.',
  css: 'This is a CSS idea used to decide how an element looks, fits, or is positioned on the page.',
  javascript:
    'This is a JavaScript idea that affects how values, functions, objects, or asynchronous work behave.',
  typescript:
    'This is a TypeScript idea used to describe which values are allowed before the code runs.',
  react: 'This is a React idea used to turn changing data into predictable interface output.',
  nextjs:
    'This is a Next.js idea that connects React components with routing, server work, caching, or deployment.',
  dom: 'This is a browser API idea that lets JavaScript read or change the current document and respond to user input.',
  'git-and-tools':
    'This is a developer-workflow idea that helps you build, inspect, share, or safely change code.',
  'state-and-api':
    'This is a data-management idea that helps an interface know what changed, where the value belongs, and when it should refresh.',
  testing:
    'This is a testing idea that provides evidence that an important user behaviour still works.',
  performance:
    'This is a performance idea that helps a page load, respond, or update with less waiting and wasted work.',
  security: 'This is a security idea that reduces what untrusted input or code is allowed to do.',
  accessibility:
    'This is an accessibility idea that helps more people perceive, understand, and operate an interface.',
};

const categoryApproach: Record<string, string> = {
  'interview-preparation':
    'Write the goal in one sentence. Break it into a small preparation task, a hands-on task, and a short review. Keep the result visible so tomorrow’s next step is obvious.',
  'machine-coding-guide':
    'First list user actions and visible states. Next sketch the data and component boundaries. Build the smallest complete flow, then add keyboard support, failures, and tests.',
  'javascript-coding':
    'Begin with two tiny input and output examples. Write the simplest correct loop or function, test an empty value, then add the language details that make the real utility reliable.',
  'dsa-interview-guide':
    'Restate the problem, draw a small example, and write a basic correct approach. Only then look for repeated work or a known pattern that can make it faster.',
  'framework-fundamentals':
    'Connect the new framework idea to concepts you already know: components, input, state, events, derived values, side effects, routing, and data loading.',
};

const plainDefinitions: Record<string, string> = {
  'what-is-a-browser':
    'A browser is an application that requests web files, turns them into a page, runs JavaScript, and gives the user safe ways to interact with the result.',
  'what-happens-when-you-enter-a-url':
    'Entering a URL begins a chain of work: the browser understands the address, finds the server, requests files, reads them, draws the page, and enables interaction.',
  dom: 'The DOM is the browser’s object-shaped representation of the HTML document. JavaScript can read and change these objects to update the page.',
  cssom:
    'The CSSOM is the browser’s object-shaped representation of the stylesheets it has read and understood.',
  'html-document-structure':
    'An HTML document has a predictable skeleton that tells the browser where page information ends and visible content begins.',
  'semantic-html':
    'Semantic HTML means choosing an element for what the content means, such as a button for an action and nav for navigation.',
  forms:
    'A form groups controls that collect and submit information, such as a name, email address, search query, or payment choice.',
  accessibility:
    'Accessibility means designing and building the interface so people with different bodies, senses, devices, and situations can use it.',
  'box-model':
    'The CSS box model treats every element as content surrounded by padding, a border, and margin.',
  flexbox:
    'Flexbox arranges items in one main direction and gives you tools for sizing, spacing, alignment, and wrapping.',
  'css-grid':
    'CSS Grid arranges content in rows and columns, making it useful when both directions matter to the layout.',
  'responsive-design':
    'Responsive design lets the same content adapt to different available spaces instead of assuming one fixed screen size.',
  variables:
    'A variable is a named place that lets your program remember a value and use that value later.',
  'data-types':
    'A data type describes the kind of value you have, such as text, a number, a true-or-false value, an object, or no value.',
  functions:
    'A function is a reusable block of instructions that can receive values, do work, and return a result.',
  arrays:
    'An array stores an ordered list of values and gives each position a numeric index starting at zero.',
  objects:
    'An object groups related values under named keys, which makes it useful for describing one thing such as a user or product.',
  scope: 'Scope is the rule that decides where a variable can be read or changed in your code.',
  closures:
    'A closure is a function that remembers variables from the place where it was created, even after that outer code has finished.',
  promises:
    'A Promise is an object that represents work that will either produce a value later or fail with a reason.',
  'async-and-await':
    'Async and await are syntax for working with Promises in a step-by-step style while the program can continue doing other work.',
  'event-loop':
    'The event loop decides when queued asynchronous callbacks can move onto the JavaScript call stack and run.',
  'debounce-and-throttle':
    'Debounce waits for repeated events to stop, while throttle limits how often a function may run during repeated events.',
  'interfaces-vs-types':
    'Interfaces and type aliases both describe allowed value shapes; their differences matter mainly when extending and combining types.',
  generics:
    'A generic is a type placeholder that lets one reusable function or component preserve information about the value it receives.',
  'components-and-props':
    'A React component describes part of the interface, and props are the input values its parent provides.',
  state:
    'State is information a component remembers between renders and can change in response to a user action or external event.',
  useeffect:
    'useEffect runs synchronization work after React updates the page, such as connecting to a browser API or external system.',
  'context-api':
    'React Context makes one value available to many nested components without passing it through every level as props.',
  'app-router':
    'The Next.js App Router turns folders and files into routes and lets layouts, loading states, and server components live near those routes.',
  'server-and-client-components':
    'Server components run on the server and send rendered output, while client components include browser-side JavaScript for interaction.',
};

const categoryExamples: Record<string, CodeExample> = {
  browser: {
    title: 'Observe a network request',
    language: 'javascript',
    code: "const response = await fetch('/api/profile');\nconst data = await response.json();\nconsole.log(response.status, data);",
    explanation:
      'The browser resolves the URL, applies security and cache rules, performs the request, then exposes a response to JavaScript.',
  },
  html: {
    title: 'A meaningful document outline',
    language: 'html',
    code: '<main>\n  <article>\n    <h1>Accessible interfaces</h1>\n    <p>Start with meaningful HTML.</p>\n  </article>\n</main>',
    explanation:
      'Landmarks and headings expose useful structure to browsers and assistive technology.',
  },
  css: {
    title: 'A resilient responsive grid',
    language: 'css',
    code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));\n  gap: 1rem;\n}',
    explanation:
      'The grid adapts to available space without relying on device-specific breakpoints.',
  },
  javascript: {
    title: 'Keep state in a closure',
    language: 'javascript',
    code: 'function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst next = createCounter();\nconsole.log(next()); // 1',
    explanation:
      'The returned function retains access to the lexical environment where it was created.',
  },
  typescript: {
    title: 'Preserve a value type with a generic',
    language: 'typescript',
    code: 'function first<T>(items: readonly T[]): T | undefined {\n  return items[0];\n}\n\nconst value = first([1, 2, 3]); // number | undefined',
    explanation: 'The generic connects the input element type to the return type without a cast.',
  },
  react: {
    title: 'Derive UI from state',
    language: 'tsx',
    code: "function Status({ online }: { online: boolean }) {\n  return <span aria-live=\"polite\">{online ? 'Online' : 'Offline'}</span>;\n}",
    explanation: 'The component stays pure: the same props always describe the same interface.',
  },
  nextjs: {
    title: 'A server-rendered route',
    language: 'tsx',
    code: 'export default async function Page() {\n  const lessons = await getLessons();\n  return <LessonList lessons={lessons} />;\n}',
    explanation:
      'Server components can load data near the route without shipping that data-fetching code to the browser.',
  },
  'interview-preparation': {
    title: 'Turn preparation into small tasks',
    language: 'json',
    code: '{\n  "learn": "Review one concept",\n  "practice": "Solve two questions",\n  "build": "Improve one component",\n  "review": "Write what was difficult"\n}',
    explanation:
      'A useful plan contains a small learning task, hands-on work, and a review step instead of a vague instruction to study everything.',
  },
  'machine-coding-guide': {
    title: 'Model visible interface states',
    language: 'typescript',
    code: "type ViewState =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; items: string[] }\n  | { status: 'error'; message: string };",
    explanation:
      'A small state model prevents impossible combinations and makes every visible screen easier to render and test.',
  },
  'javascript-coding': {
    title: 'Build from a tiny contract',
    language: 'javascript',
    code: 'function once(fn) {\n  let called = false;\n  let result;\n  return function (...args) {\n    if (!called) {\n      called = true;\n      result = fn.apply(this, args);\n    }\n    return result;\n  };\n}',
    explanation:
      'The wrapper keeps private state in a closure and preserves the original function context, arguments, and result.',
  },
  'dsa-interview-guide': {
    title: 'Use a Set for a fast membership check',
    language: 'javascript',
    code: 'function hasDuplicate(items) {\n  const seen = new Set();\n  for (const item of items) {\n    if (seen.has(item)) return true;\n    seen.add(item);\n  }\n  return false;\n}',
    explanation:
      'The Set remembers previously visited values so the algorithm does not need a nested loop.',
  },
  'framework-fundamentals': {
    title: 'The shared component idea',
    language: 'tsx',
    code: 'function Welcome({ name }: { name: string }) {\n  return <h1>Hello, {name}</h1>;\n}',
    explanation:
      'Modern frameworks use different syntax, but they all help connect input data, changing state, and reusable interface pieces.',
  },
};

const descriptions: Record<string, string> = {
  'what-happens-when-you-enter-a-url':
    'Trace a navigation from URL parsing and DNS through HTTP, browser parsing, rendering, and interactivity.',
  'dom-and-cssom':
    'Learn how document and stylesheet bytes become the two object models used to construct the render tree.',
  closures:
    'Understand lexical environments, retained state, practical patterns, and the memory trade-offs of closures.',
  'event-loop':
    'Build a reliable mental model for call stacks, tasks, microtasks, rendering opportunities, and async output.',
  'semantic-html':
    'Choose elements by meaning to create interfaces that are accessible, searchable, and resilient.',
  flexbox:
    'Master one-dimensional layout, flexible sizing, alignment, wrapping, and common overflow traps.',
  generics:
    'Express relationships between values with reusable types while preserving useful inference.',
  useeffect:
    'Synchronize React with external systems, clean up correctly, and avoid effects for derived values.',
  'server-and-client-components':
    'Choose the correct rendering boundary and understand how data and interactivity cross it.',
};

const buildTutorial = (
  group: TutorialGroup,
  title: string,
  order: number,
  globalOrder: number,
): Tutorial => {
  const slug = slugify(title);
  const sourceDetail = sourceTutorialDetails.get(`${group.category}:${title}`);
  const description =
    sourceDetail?.plainEnglish ??
    descriptions[slug] ??
    'Learn ' +
      title.toLowerCase() +
      ' in plain English, then connect it to a small example, common mistakes, and practical frontend work.';
  const context = categoryContext[group.category] ?? '';
  const simpleMeaning =
    sourceDetail?.plainEnglish ??
    plainDefinitions[slug] ??
    `${categoryPlainMeaning[group.category] ?? 'This is a frontend development concept.'} In this lesson, you will see where ${title.toLowerCase()} fits and what problem it helps you solve.`;
  const simpleApproach =
    categoryApproach[group.category] ??
    `Start with one small example of ${title.toLowerCase()}. Identify the input, the visible result, and the rule connecting them. Change one thing at a time and use the browser or test output to check your understanding.`;
  const practicePrompt =
    sourceDetail?.practice ??
    `Create the smallest working example of ${title.toLowerCase()}, then explain each important line in your own words.`;

  return {
    id: 'tutorial-' + group.category + '-' + (order + 1),
    slug,
    title,
    description,
    category: group.category,
    categoryLabel: group.label,
    subcategory: group.subcategory,
    difficulty: group.difficulty,
    estimatedReadTime: 7 + ((order * 3 + globalOrder) % 10),
    order,
    prerequisites:
      order === 0 ? ['No prerequisites'] : [group.topics[order - 1] ?? 'Core fundamentals'],
    learningObjectives: [
      'Explain the idea behind “' + title + '” in plain English',
      'Connect the concept to a small frontend example',
      'Recognise one common mistake and one useful edge case',
    ],
    sections: [
      {
        id: 'plain-english',
        title: 'In plain English',
        content: simpleMeaning,
      },
      {
        id: 'why-it-matters',
        title: 'Why it matters',
        content: `${context} You do not need to memorise every API at once. Focus on the problem this idea solves, the information it receives, and the result a user or developer can observe.`,
      },
      {
        id: 'step-by-step',
        title: 'A simple step-by-step approach',
        content: simpleApproach,
      },
      {
        id: 'try-it',
        title: 'Try it yourself',
        content: `${practicePrompt} After it works, test an empty value, an unexpected value, and the smallest useful screen size.`,
      },
      {
        id: 'interview-lens',
        title: 'How to explain it in an interview',
        content: `Begin with one plain sentence that defines the topic. Give a small example of “${title}”, explain why it is useful, and finish with one mistake, limitation, or trade-off. If you make an assumption, say it aloud.`,
      },
    ],
    codeExamples: [categoryExamples[group.category]].filter(
      (example): example is CodeExample => example !== undefined,
    ),
    commonMistakes: [
      `Memorising steps or syntax for “${title}” without understanding the problem being solved.`,
      'Ignoring empty, loading, error, keyboard, and narrow-screen states.',
      'Trying to add advanced optimisations before the smallest version works correctly.',
    ],
    bestPractices: [
      'Use clear names and keep the first example small enough to understand without scrolling.',
      'Test normal behaviour and at least one boundary or failure case.',
      'Explain why the solution works before trying to make it shorter.',
    ],
    interviewQuestions: [
      `How would you explain “${title}” to a junior engineer?`,
      'Which edge case would you test first, and why?',
      'What trade-off would change your implementation?',
    ],
    practiceExercises: [
      practicePrompt,
      `Explain “${title}” to a new learner without using unexplained jargon.`,
    ],
    relatedTopics: group.topics.filter((topic) => topic !== title).slice(0, 3),
    tags: [group.category, group.subcategory.toLowerCase(), slug],
    updatedAt: '2026-08-11',
    popularity: 96 - ((globalOrder * 7) % 31),
  };
};

let tutorialIndex = 0;
export const tutorials: Tutorial[] = groups.flatMap((group) =>
  group.topics.map((title, order) => buildTutorial(group, title, order, tutorialIndex++)),
);

export const tutorialCategories = groups.map((group) => ({
  slug: group.category,
  label: group.label,
  description: categoryContext[group.category] ?? '',
  count: group.topics.length,
}));

export const getTutorial = (category: string | undefined, slug: string | undefined) =>
  tutorials.find((tutorial) => tutorial.category === category && tutorial.slug === slug);

export const getTutorialsByCategory = (category: string | undefined) =>
  category ? tutorials.filter((tutorial) => tutorial.category === category) : tutorials;
