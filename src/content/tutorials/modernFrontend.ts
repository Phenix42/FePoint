import { defineTutorials } from '@/content/tutorials/tutorialDraft';

export const modernFrontendTutorials = defineTutorials([
  {
    slug: 'frontend-tooling-fundamentals',
    title: 'Frontend Tooling Fundamentals',
    description:
      'Understand the small set of tools that install dependencies, run a local app, check code, test behavior, and create a production build.',
    category: 'frontend-tooling',
    categoryLabel: 'Frontend Tooling',
    subcategory: 'Workflow and build tools',
    difficulty: 'Intermediate',
    estimatedReadTime: 18,
    prerequisites: ['javascript-fundamentals'],
    learningObjectives: [
      'Explain the job of a package manager, development server, compiler, linter, formatter, test runner, and bundler.',
      'Read package.json scripts and run the correct quality checks before creating a production build.',
      'Separate tools that transform code from tools that only report possible problems.',
    ],
    definition:
      'Frontend tooling is the collection of programs that help developers create, check, test, package, and ship frontend code. These tools support the development workflow; they are not the website itself.',
    explanation: {
      what: 'A modern frontend project usually has a package manager such as npm, a development server and build tool such as Vite, a type checker such as TypeScript, a linter such as ESLint, a formatter such as Prettier, and a test runner such as Vitest. package.json records the project dependencies and gives common commands memorable names.',
      why: 'Browsers cannot provide every team workflow on their own. Tooling makes dependency versions repeatable, catches mistakes before users see them, shortens the edit-and-refresh loop, and converts source files into optimized assets that a production server can deliver.',
      how: [
        'The package manager reads package.json and a lockfile, then installs the exact dependency tree expected by the project.',
        'The development server serves source code locally and updates the browser quickly while files change.',
        'Independent checks inspect different qualities: TypeScript checks types, ESLint checks configured code rules, and tests execute behavior.',
        'The build command transforms and bundles source modules into deployable HTML, CSS, JavaScript, and asset files.',
        "Continuous integration runs the same scripted checks on a clean machine so a result does not depend on one developer's computer.",
      ],
      where: [
        'Starting and maintaining React or TypeScript projects',
        'Running automated checks before merging a pull request',
        'Producing optimized files for a production deployment',
        'Keeping a team on consistent dependency versions and commands',
      ],
    },
    example: {
      title: 'Create one repeatable project check',
      language: 'json',
      code: `{
  "scripts": {
    "dev": "vite",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run",
    "build": "vite build",
    "check": "npm run typecheck && npm run lint && npm run test"
  }
}`,
      explanation:
        'Each script gives a tool command a project-wide name. Running npm run check performs the type, lint, and behavior checks in order; the chain stops if one command fails. The build remains separate because checking source and producing deployable files are different jobs.',
      walkthrough: [
        {
          code: '"dev": "vite"',
          explanation:
            'npm run dev starts Vite in development mode so the browser can load the app while you edit it.',
        },
        {
          code: '"typecheck": "tsc --noEmit"',
          explanation:
            'The TypeScript compiler checks the program without writing JavaScript output.',
        },
        {
          code: '"check": "npm run typecheck && npm run lint && npm run test"',
          explanation:
            'The double ampersands run the next check only after the previous check succeeds.',
        },
        {
          code: '"build": "vite build"',
          explanation:
            'The production build creates optimized deployable assets; it does not deploy them by itself.',
        },
      ],
      output: `> npm run check
> npm run typecheck
> npm run lint
> npm run test

All configured checks passed.`,
    },
    realWorldExample: {
      title: 'A safe pull-request workflow',
      description:
        'A team can use the same commands locally and in continuous integration to catch a broken type, lint rule, or user flow before code reaches production.',
      steps: [
        'A developer creates a small branch and commits focused source changes with Git.',
        'They run npm run check and fix any type, lint, or test failure reported by the responsible tool.',
        'They run npm run build to catch production-only transformation or bundling failures.',
        'The remote continuous-integration job installs from the lockfile and repeats the checks on a clean machine.',
        "After review and successful checks, the generated build can be deployed by the project's hosting system.",
      ],
    },
    visualFlow: [
      'Source files and package.json',
      'Install dependencies from the lockfile',
      'Develop with the local server',
      'Type-check, lint, and test',
      'Create the production build',
      'Deploy generated assets',
    ],
    keyPoints: [
      'package.json describes dependencies and exposes repeatable project scripts.',
      'A linter, formatter, type checker, test runner, and bundler solve different problems.',
      'A lockfile makes dependency resolution more repeatable across machines.',
      'A successful development server does not prove that a production build will succeed.',
      'Automation is most useful when local and continuous-integration commands match.',
    ],
    commonMistakes: [
      {
        title: 'Treating every tool as a compiler',
        explanation:
          'Prettier formats text and ESLint reports configured rule violations; neither proves that application behavior is correct.',
      },
      {
        title: 'Editing installed dependency files',
        explanation:
          'Files inside node_modules are generated installation output and can be replaced on the next install. Change source or dependency configuration instead.',
      },
      {
        title: 'Ignoring the lockfile',
        explanation:
          'Installing without the committed lockfile can resolve different transitive versions and create results that work on one machine only.',
      },
      {
        title: 'Putting secrets in frontend environment variables',
        explanation:
          'Values included in a browser build can be inspected by users. Frontend environment variables are configuration, not a secret vault.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is the purpose of package.json in a frontend project?',
        answer:
          'It describes the project, lists its dependencies, and defines named scripts for common commands such as development, testing, and building.',
      },
      {
        level: 'Intermediate',
        question: 'How are a linter, type checker, and test runner different?',
        answer:
          'A linter checks configured code patterns, a type checker analyzes type relationships, and a test runner executes code and verifies expected behavior.',
        deepDive:
          'Their findings overlap sometimes, but none replaces the others. A program can be type-correct and still behave incorrectly, or pass tests while violating an important lint rule.',
      },
      {
        level: 'Advanced',
        question: 'Why should continuous integration install from a lockfile?',
        answer:
          'A lockfile pins the resolved dependency graph so clean builds use the same package versions that were reviewed and tested.',
        deepDive:
          'Reproducible installation reduces accidental version drift, but teams must still review and update dependencies because a lockfile does not make packages trustworthy or secure.',
      },
    ],
    relatedSlugs: ['typescript-fundamentals', 'frontend-testing'],
    sources: [
      {
        label: 'npm package.json documentation',
        url: 'https://docs.npmjs.com/cli/v11/configuring-npm/package-json',
      },
      { label: 'Vite guide', url: 'https://vite.dev/guide/' },
      {
        label: 'ESLint getting started',
        url: 'https://eslint.org/docs/latest/use/getting-started',
      },
      { label: 'Git tutorial', url: 'https://git-scm.com/docs/gittutorial' },
    ],
    tags: ['tooling', 'npm', 'vite', 'eslint', 'build'],
  },
  {
    slug: 'typescript-fundamentals',
    title: 'TypeScript Fundamentals',
    description:
      'Learn how TypeScript checks JavaScript code before it runs, models values with types, narrows uncertainty, and improves editor feedback without validating runtime data.',
    category: 'typescript',
    categoryLabel: 'TypeScript',
    subcategory: 'Type-safe JavaScript',
    difficulty: 'Intermediate',
    estimatedReadTime: 24,
    prerequisites: ['frontend-tooling-fundamentals'],
    learningObjectives: [
      'Describe static type checking, inference, compilation, and type erasure in accurate beginner language.',
      'Model objects and functions with aliases, interfaces, unions, optional properties, and generics.',
      'Use unknown and narrowing at runtime boundaries instead of assuming external data is safe.',
    ],
    definition:
      'TypeScript is JavaScript with syntax for describing types. Its compiler checks those descriptions before the program runs and then erases the type syntax to produce JavaScript.',
    explanation: {
      what: 'TypeScript lets a developer describe values such as strings, product objects, function parameters, and possible status values. The checker compares how values are created and used, while type inference often discovers a useful type without an explicit annotation.',
      why: 'JavaScript discovers many invalid operations only when the affected line runs. TypeScript can report a large class of mismatches during development, makes refactoring safer, and gives editors enough information for navigation and autocomplete.',
      how: [
        'The compiler parses JavaScript plus TypeScript type syntax and builds a model of how values flow through the program.',
        'Annotations provide information where needed, while inference derives types from initial values, return statements, and surrounding context.',
        'Union types describe alternatives, and control-flow checks such as typeof, equality checks, or discriminant properties narrow a union before use.',
        'Generics connect types across inputs and outputs without replacing them with any.',
        'After checking, TypeScript erases types. Runtime values from JSON, forms, storage, or APIs still require validation.',
      ],
      where: [
        'Typing component props, state, events, and reusable hooks',
        'Describing API request and response shapes after validation',
        'Building shared utilities and libraries with clear contracts',
        'Refactoring large JavaScript applications with editor support',
      ],
    },
    example: {
      title: 'Calculate a typed product label',
      language: 'typescript',
      code: `type Product = {
  name: string;
  price: number;
  discount?: number;
};

function getSaleLabel(product: Product): string {
  const discount = product.discount ?? 0;
  const finalPrice = product.price * (1 - discount);

  return product.name + ': $' + finalPrice.toFixed(2);
}

const keyboard = {
  name: 'Keyboard',
  price: 80,
  discount: 0.25,
};

console.log(getSaleLabel(keyboard));`,
      explanation:
        'The Product alias describes the required object shape. TypeScript infers the keyboard object properties, checks that it can be passed to getSaleLabel, and confirms that the function returns a string. The optional discount is handled before arithmetic.',
      walkthrough: [
        {
          code: 'discount?: number',
          explanation:
            'The question mark means the property may be absent, so reading it produces number or undefined.',
        },
        {
          code: 'const discount = product.discount ?? 0',
          explanation:
            'Nullish coalescing supplies zero only when the optional value is null or undefined.',
        },
        {
          code: 'function getSaleLabel(product: Product): string',
          explanation:
            'The parameter must have the Product structure, and the returned value must be a string.',
        },
        {
          code: 'getSaleLabel(keyboard)',
          explanation:
            'TypeScript uses structural typing: the value is compatible because it has the required properties with compatible types.',
        },
      ],
      output: 'Keyboard: $60.00',
    },
    realWorldExample: {
      title: 'Receive product data from an API safely',
      description:
        'An API response crosses a runtime boundary. A TypeScript type documents the desired result, but the application must verify the actual JSON before treating it as a Product.',
      steps: [
        'Fetch the response and initially treat parsed external data as unknown.',
        'Validate required properties and business rules with deliberate checks or a runtime schema library.',
        'Return a typed Product only after validation succeeds.',
        'Show a useful error state when validation fails instead of forcing the value with a type assertion.',
        'Use the validated value throughout components, calculations, and tests.',
      ],
    },
    visualFlow: [
      'Write JavaScript plus type descriptions',
      'TypeScript analyzes relationships',
      'Developer fixes reported mismatches',
      'Compiler erases type syntax',
      'JavaScript runs with normal runtime behavior',
    ],
    keyPoints: [
      'TypeScript checks code statically and preserves JavaScript runtime behavior.',
      'Types and assertions are erased, so they cannot validate API or user data at runtime.',
      'Inference is useful; annotate contracts and boundaries rather than every local value.',
      'unknown preserves uncertainty until code narrows it, while any turns checking off.',
      'Interfaces and object type aliases are structurally checked and overlap in many common uses.',
      'Strict checking gives stronger guarantees and should be explicit in project configuration.',
    ],
    commonMistakes: [
      {
        title: 'Using an assertion as validation',
        explanation:
          'Writing response.json() as Product only tells the checker to trust you. It does not inspect the received object at runtime.',
        code: `const product = (await response.json()) as Product; // No runtime check happened.`,
      },
      {
        title: 'Replacing uncertainty with any',
        explanation:
          'any allows arbitrary property access and spreads missing type information into other code. Prefer unknown and narrow it.',
      },
      {
        title: 'Annotating every obvious value',
        explanation:
          'Repeated annotations such as const name: string = "Mina" add noise when inference already knows the exact useful type.',
      },
      {
        title: 'Using boxed primitive names',
        explanation:
          'Use string, number, and boolean for normal values, not the rarely appropriate wrapper object types String, Number, and Boolean.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What does TypeScript add to JavaScript?',
        answer:
          'It adds syntax and tooling for static type checking, then produces JavaScript whose runtime behavior follows JavaScript.',
      },
      {
        level: 'Intermediate',
        question: 'What is the difference between unknown and any?',
        answer:
          'Both can receive any value, but unknown must be narrowed before most operations while any disables checking for its uses.',
        deepDive:
          'unknown is appropriate at uncertain boundaries because the compiler keeps the uncertainty visible. A typeof check, property validation, or type predicate can narrow it safely.',
      },
      {
        level: 'Advanced',
        question: 'Do TypeScript types protect an application from invalid API data at runtime?',
        answer:
          'No. Type information is erased, so external data must be validated at runtime before the application relies on its shape.',
        deepDive:
          'A static response type describes the contract developers expect. Runtime validation checks whether an actual response honors that contract and should handle failure explicitly.',
      },
    ],
    relatedSlugs: ['frontend-tooling-fundamentals', 'react-fundamentals'],
    sources: [
      {
        label: 'TypeScript for the New Programmer',
        url: 'https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html',
      },
      {
        label: 'TypeScript Everyday Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
      },
      {
        label: 'TypeScript Narrowing',
        url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
      },
      {
        label: 'TypeScript Generics',
        url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
      },
      {
        label: 'TypeScript strict option',
        url: 'https://www.typescriptlang.org/tsconfig/strict.html',
      },
    ],
    tags: ['typescript', 'types', 'narrowing', 'generics', 'strict-mode'],
  },
  {
    slug: 'react-fundamentals',
    title: 'React Fundamentals',
    description:
      'Build a clear mental model of components, JSX, props, state, events, rendering, lists, forms, and Effects before reaching for advanced abstractions.',
    category: 'react',
    categoryLabel: 'React',
    subcategory: 'Component-driven interfaces',
    difficulty: 'Intermediate',
    estimatedReadTime: 26,
    prerequisites: ['typescript-fundamentals'],
    learningObjectives: [
      'Explain how React turns component output, props, and state into updates to the browser interface.',
      'Choose minimal state and derive display values during rendering without unnecessary Effects.',
      'Update state immutably and render accessible lists, controls, and forms with stable identities.',
    ],
    definition:
      'React is a JavaScript library for building user interfaces from components. A component describes what part of the interface should look like for its current props, state, and context.',
    explanation: {
      what: 'React components are JavaScript functions that return markup, commonly written with JSX. Props carry input from a parent, while state lets a component remember information between renders. Event handlers request state changes in response to user actions.',
      why: 'Interactive pages contain many related states: a selected product, typed search text, an open menu, or a submitted form. React lets developers describe the interface for each state and composes small responsibilities into a larger application.',
      how: [
        'React calls component functions to calculate a new tree of elements; this render calculation must stay pure.',
        'During commit, React applies the required changes to the host environment such as the browser DOM.',
        'State belongs to a particular position in the rendered tree and behaves like a snapshot inside one render.',
        'A state setter queues another render. Updater functions are useful when the next value depends on the previous value.',
        'Effects run after commit to synchronize with systems outside React, such as a media player or network connection; derived display data normally belongs in render.',
      ],
      where: [
        'Search, filtering, carts, forms, dashboards, and account settings',
        'Reusable design-system controls and page sections',
        'Single-page applications and framework-based React applications',
        'Interfaces that update in response to user input or remote data',
      ],
    },
    example: {
      title: 'Filter products without duplicate state',
      language: 'tsx',
      code: `import { useState } from 'react';

type Product = { id: string; name: string };

export function ProductSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');

  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section>
      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <p>{visibleProducts.length} results</p>
      <ul>
        {visibleProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}`,
      explanation:
        'The component stores only the text the user can change. The filtered list and result count are calculated from props and state during every render, so they cannot drift out of sync and do not require an Effect.',
      walkthrough: [
        {
          code: "const [query, setQuery] = useState('')",
          explanation:
            'query is the component memory for the controlled input, and setQuery requests the next render.',
        },
        {
          code: 'const visibleProducts = products.filter(...)',
          explanation:
            'The visible list is derived data, so it is calculated instead of being copied into another state variable.',
        },
        {
          code: 'onChange={(event) => setQuery(event.currentTarget.value)}',
          explanation:
            'The event handler reads the latest input value and requests a state update.',
        },
        {
          code: '<li key={product.id}>{product.name}</li>',
          explanation:
            'The stable product ID helps React match each item with the same item across list updates.',
        },
      ],
      output: `Initial view:
3 results
Keyboard
Mouse
Monitor

After typing "mo":
2 results
Mouse
Monitor`,
    },
    realWorldExample: {
      title: 'An e-commerce product filter',
      description:
        'A product page can combine server-provided products with local search and category controls while keeping only user choices in React state.',
      steps: [
        'A parent loads or receives the product collection and passes it into the filter component as props.',
        'The search input event updates the query state.',
        'React renders again and derives the matching products from the latest props and query snapshot.',
        'React commits only the DOM changes needed for the new result list and count.',
        'If analytics must observe searches, a separate Effect or event-side integration can synchronize with that external system without storing another filtered list.',
      ],
    },
    visualFlow: [
      'User types into the input',
      'Event handler queues query state',
      'React renders the component again',
      'Filtered products are derived',
      'React commits the changed list',
      'Browser displays the new results',
    ],
    keyPoints: [
      'Components calculate UI from props, state, and context and must keep render logic pure.',
      'Props are parent-provided inputs; state is component memory that changes over time.',
      'State is a snapshot, and calling its setter schedules a later render.',
      'Store the minimal changing data and calculate redundant values during rendering.',
      'Treat props and state objects and arrays as immutable when producing updates.',
      'Effects are escape hatches for external synchronization, not a default place for calculations.',
    ],
    commonMistakes: [
      {
        title: 'Mutating state directly',
        explanation:
          'Changing an existing object or array does not create the new snapshot React expects and can produce missing updates or corrupted history.',
        code: `products.push(newProduct); // Do not mutate state.
setProducts([...products, newProduct]); // Create the next array instead.`,
      },
      {
        title: 'Using an Effect for derived data',
        explanation:
          'Saving a filtered list in an Effect creates an extra render and another value that can become stale. Calculate it during render when possible.',
      },
      {
        title: 'Using an unstable list key',
        explanation:
          'An array index or random value can make state follow the wrong row or reset on every render when items are inserted, removed, or reordered.',
      },
      {
        title: 'Calling Hooks conditionally',
        explanation:
          'Hooks must be called at the top level of React components or custom Hooks so React sees them in a consistent order.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is the difference between props and state in React?',
        answer:
          'Props are inputs passed by a parent, while state is memory owned by a rendered component position and updated through a setter.',
      },
      {
        level: 'Intermediate',
        question: 'Why should a filtered list usually not be stored in state?',
        answer:
          'If it can be calculated from existing props and state, storing it duplicates information and creates synchronization bugs and extra updates.',
        deepDive:
          'Calculate inexpensive derived values during render. Memoize an actually expensive calculation only after measurement shows that caching it is useful.',
      },
      {
        level: 'Advanced',
        question: 'What happens after a React state setter is called?',
        answer:
          'React queues an update, renders using the next state, compares the result with the current tree, and commits the required host changes.',
        deepDive:
          "The current event handler still sees its render's state snapshot. When multiple updates depend on previous state, updater functions let React process the queued transitions correctly.",
      },
    ],
    relatedSlugs: ['typescript-fundamentals', 'advanced-react', 'accessibility'],
    sources: [
      { label: 'React Quick Start', url: 'https://react.dev/learn' },
      { label: 'React Adding Interactivity', url: 'https://react.dev/learn/adding-interactivity' },
      { label: 'React Render and Commit', url: 'https://react.dev/learn/render-and-commit' },
      { label: 'React Managing State', url: 'https://react.dev/learn/managing-state' },
      {
        label: 'React You Might Not Need an Effect',
        url: 'https://react.dev/learn/you-might-not-need-an-effect',
      },
      { label: 'React Rules of Hooks', url: 'https://react.dev/reference/rules/rules-of-hooks' },
    ],
    tags: ['react', 'components', 'state', 'props', 'effects'],
  },
  {
    slug: 'advanced-react',
    title: 'Advanced React',
    description:
      'Scale React code with deliberate state models, reducers, Context, Effect discipline, transitions, Suspense, error boundaries, and measured performance work.',
    category: 'react',
    categoryLabel: 'React',
    subcategory: 'Scalable React applications',
    difficulty: 'Advanced',
    estimatedReadTime: 30,
    prerequisites: ['react-fundamentals'],
    learningObjectives: [
      'Model related state transitions explicitly and choose between local state, reducers, and Context based on ownership.',
      'Use Effects, refs, Suspense, transitions, and error boundaries for the problems they actually solve.',
      'Measure rendering work before applying memoization and distinguish React correctness from performance hints.',
    ],
    definition:
      'Advanced React is the practice of designing predictable component boundaries and update flows as an application grows. It applies React’s core rules to complex state, asynchronous work, performance, failure handling, and server/client composition.',
    explanation: {
      what: 'Advanced React is less about collecting Hooks and more about choosing clear ownership. Reducers describe related transitions, Context makes a value available below a provider, custom Hooks package a focused stateful behavior, and escape hatches connect React to systems that React does not control.',
      why: 'As interfaces grow, duplicated state, broad providers, unnecessary Effects, unstable dependencies, and premature caching can make updates hard to explain. Strong models keep impossible states out, isolate failures, and let React pause or prioritize work safely.',
      how: [
        'Keep state near the smallest common owner, remove redundant values, and use a reducer when many events update related fields.',
        'Use Context to distribute genuinely shared values, not as an automatic replacement for props or all application state.',
        'Keep rendering pure. Put user-caused work in event handlers and use Effects only to synchronize with external systems, with cleanup that mirrors setup.',
        'Use transitions and deferred values for non-urgent rendering, Suspense for supported asynchronous resources, and Error Boundaries for render-tree failures.',
        'Profile a production-like build before adding memo, useMemo, or useCallback; these APIs cache work but do not repair incorrect logic.',
        'Use a framework for Server Components. The use server directive marks Server Functions, not Server Components.',
      ],
      where: [
        'Dashboards with coordinated loading, saving, success, and error states',
        'Shared authentication, theme, locale, or feature configuration',
        'Large searchable lists where urgent input and slower results update differently',
        'Streaming framework applications with Suspense and server/client boundaries',
      ],
    },
    example: {
      title: 'Model a save operation with a reducer',
      language: 'tsx',
      code: `import { useReducer } from 'react';

type State =
  | { status: 'idle'; message: string }
  | { status: 'saving'; message: string }
  | { status: 'saved'; message: string }
  | { status: 'error'; message: string };

type Action =
  | { type: 'save-started' }
  | { type: 'save-succeeded' }
  | { type: 'save-failed'; message: string };

function reducer(_state: State, action: Action): State {
  switch (action.type) {
    case 'save-started':
      return { status: 'saving', message: 'Saving…' };
    case 'save-succeeded':
      return { status: 'saved', message: 'Profile saved' };
    case 'save-failed':
      return { status: 'error', message: action.message };
  }
}

export function SaveProfileButton() {
  const [state, dispatch] = useReducer(reducer, {
    status: 'idle',
    message: 'No changes saved yet',
  });

  async function handleSave() {
    dispatch({ type: 'save-started' });

    try {
      const response = await fetch('/api/profile', { method: 'POST' });
      if (!response.ok) throw new Error('Save failed');
      dispatch({ type: 'save-succeeded' });
    } catch {
      dispatch({ type: 'save-failed', message: 'Please try again' });
    }
  }

  return (
    <div>
      <button disabled={state.status === 'saving'} onClick={handleSave}>
        Save profile
      </button>
      <p role="status">{state.message}</p>
    </div>
  );
}`,
      explanation:
        'A discriminated union represents one valid save state at a time, and the reducer converts named events into the next state. The network request belongs in the click handler because the click caused it; an Effect is unnecessary.',
      walkthrough: [
        {
          code: "status: 'idle' | 'saving' | 'saved' | 'error'",
          explanation:
            'The union makes mutually exclusive states explicit instead of combining booleans that could contradict one another.',
        },
        {
          code: 'function reducer(_state: State, action: Action): State',
          explanation:
            'The reducer is a pure function: given an action, it calculates and returns the next state without performing the request.',
        },
        {
          code: "dispatch({ type: 'save-started' })",
          explanation:
            'The event describes what happened, keeping transition logic centralized in the reducer.',
        },
        {
          code: 'async function handleSave()',
          explanation:
            'The user event starts the external work and dispatches success or failure when that work finishes.',
        },
        {
          code: '<p role="status">{state.message}</p>',
          explanation:
            'The visible status also exposes an accessible live status semantic to assistive technology.',
        },
      ],
      output: `Before the click: No changes saved yet
During the request: Saving…
After a successful response: Profile saved
After a failed response: Please try again`,
    },
    realWorldExample: {
      title: 'A responsive search dashboard',
      description:
        'A large search screen can separate urgent typing from expensive result rendering, isolate loading UI, and keep remote synchronization inside a focused data layer.',
      steps: [
        'Keep the text input as urgent local state so each keystroke remains responsive.',
        'Use a deferred value or transition for a result update only when rendering it is observably expensive.',
        'Let a framework or Suspense-enabled data source provide a Promise that a Suspense boundary can handle.',
        'Place a useful skeleton around the result region and an Error Boundary around work that can fail while rendering.',
        'Profile the interaction and field performance before and after optimization instead of assuming memoization helped.',
      ],
    },
    visualFlow: [
      'User event or external change occurs',
      'Event handler or Effect performs its specific job',
      'Reducer or state setter queues the next model',
      'Pure render calculates the next interface',
      'Suspense or Error Boundary handles supported waiting or failure',
      'React commits prioritized visible changes',
    ],
    keyPoints: [
      'A reducer is useful when named events coordinate several related state transitions.',
      'Context distributes a value; it does not decide how that value should be modeled or updated.',
      'Custom Hooks share reusable stateful logic, but each call has its own state unless it subscribes to a shared store.',
      'Effects synchronize with external systems and need complete dependencies plus matching cleanup.',
      'Suspense responds only to supported resources, not ordinary fetch calls started inside an Effect.',
      'Memoization is a performance optimization and should follow measurement.',
      'Server Components require framework support, and use server denotes Server Functions.',
    ],
    commonMistakes: [
      {
        title: 'Turning every event into an Effect',
        explanation:
          'If work happens because the user clicked Save, run it from that event. An Effect loses the direct reason and can repeat after unrelated renders or remounts.',
      },
      {
        title: 'Using Context for all state',
        explanation:
          'A broad frequently changing provider can couple unrelated consumers. Keep state local unless distant components truly need the same value.',
      },
      {
        title: 'Depending on memoization for correctness',
        explanation:
          'React may discard cached values for supported reasons. Code must remain correct when a memoized calculation runs again.',
      },
      {
        title: 'Expecting Suspense to catch Effect fetching',
        explanation:
          'A normal fetch started after commit inside useEffect does not activate a Suspense boundary. Use a supported framework or resource integration.',
      },
      {
        title: 'Catching child render failures with try and catch',
        explanation:
          'A parent try/catch around returned JSX cannot catch later child rendering. Use an Error Boundary at an intentional recovery boundary.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'When is useReducer a reasonable choice over useState?',
        answer:
          'It is useful when several named events produce related state transitions and centralizing those transitions makes them easier to understand and test.',
      },
      {
        level: 'Intermediate',
        question: 'What problem does React Context solve?',
        answer:
          'Context lets a component provide a value to descendants without passing that value through every intermediate component.',
        deepDive:
          'Context is a transport mechanism, not a complete state-management strategy. Ownership, update frequency, provider scope, and state shape still need deliberate decisions.',
      },
      {
        level: 'Advanced',
        question: 'How do Suspense and an Error Boundary differ?',
        answer:
          'Suspense shows fallback UI while a supported resource is pending; an Error Boundary shows recovery UI when descendant rendering throws an uncaught error.',
        deepDive:
          'They are often composed around the same region but handle different outcomes. Expected request failures may also belong in explicit returned state rather than being thrown.',
      },
      {
        level: 'Advanced',
        question: 'Why can Strict Mode run rendering and Effects more than once in development?',
        answer:
          'It intentionally repeats selected work to expose impure rendering and missing Effect or ref cleanup before those bugs reach users.',
        deepDive:
          'These checks are development-only. The correct response is to make setup and cleanup resilient, not to add flags that hide unintended repeated behavior.',
      },
    ],
    relatedSlugs: [
      'react-fundamentals',
      'nextjs-fundamentals',
      'frontend-performance',
      'frontend-architecture',
    ],
    sources: [
      {
        label: 'React Choosing the State Structure',
        url: 'https://react.dev/learn/choosing-the-state-structure',
      },
      {
        label: 'React Reducer and Context',
        url: 'https://react.dev/learn/scaling-up-with-reducer-and-context',
      },
      {
        label: 'React Components and Hooks Must Be Pure',
        url: 'https://react.dev/reference/rules/components-and-hooks-must-be-pure',
      },
      { label: 'React Suspense', url: 'https://react.dev/reference/react/Suspense' },
      { label: 'React Strict Mode', url: 'https://react.dev/reference/react/StrictMode' },
      {
        label: 'React Server Components',
        url: 'https://react.dev/reference/rsc/server-components',
      },
    ],
    tags: ['react', 'reducers', 'context', 'suspense', 'performance'],
  },
  {
    slug: 'nextjs-fundamentals',
    title: 'Next.js Fundamentals',
    description:
      'Learn the current Next.js 16 App Router model for routes, layouts, Server and Client Components, data, streaming, caching, mutations, errors, security, and deployment.',
    category: 'nextjs',
    categoryLabel: 'Next.js',
    subcategory: 'Full-stack React framework',
    difficulty: 'Intermediate',
    estimatedReadTime: 30,
    prerequisites: ['advanced-react'],
    learningObjectives: [
      'Explain the App Router file conventions and the boundary between Server and Client Components.',
      'Choose explicit fetching, streaming, caching, revalidation, and mutation behavior using current Next.js 16 APIs.',
      'Treat Server Actions and Route Handlers as externally callable security boundaries.',
    ],
    definition:
      'Next.js is a React framework for building web applications with routing, server rendering, data access, asset optimization, and production build behavior. Its App Router maps folders and special files to route segments and React boundaries.',
    explanation: {
      what: 'Next.js adds an application framework around React. In the App Router, page.tsx exposes a route, layout.tsx provides shared UI, loading.tsx creates a Suspense fallback, error.tsx creates an error boundary, and route.ts defines an HTTP handler.',
      why: 'A production React application needs more than component rendering. It needs URLs, initial HTML, data loading, mutations, caching, metadata, optimized assets, failure states, and a deployment runtime. Next.js connects these concerns with documented conventions.',
      how: [
        'Layouts and pages are Server Components by default, so they can await data and avoid sending their component code to the browser.',
        'A use client directive creates a client module boundary for state, events, Effects, and browser-only APIs; its imported descendants join the client graph.',
        'Next.js prerenders eligible output or renders dynamically at request time, then can stream slower regions through Suspense.',
        'In the current model, fetch is not cached by default. Cache Components are opt-in, and use cache plus cacheLife or tags makes reuse explicit.',
        'Server Functions handle mutations and can integrate with revalidation, while Route Handlers expose HTTP Request and Response behavior.',
        'Authentication and authorization must be checked near every protected data operation, Server Action, and Route Handler.',
      ],
      where: [
        'Content sites that need metadata, fast initial HTML, and selective revalidation',
        'Authenticated dashboards with server data and interactive client controls',
        'E-commerce applications with product pages, carts, forms, and mutations',
        'React applications that need one framework for routing, rendering, and deployment output',
      ],
    },
    example: {
      title: 'Opt into cached product data explicitly',
      language: 'tsx',
      code: `// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;

// app/products/page.tsx
import { cacheLife } from 'next/cache';

type Product = { id: string; name: string };

async function getProducts(): Promise<Product[]> {
  'use cache';
  cacheLife('minutes');

  const response = await fetch('https://api.example.com/products');
  if (!response.ok) throw new Error('Could not load products');
  return response.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}`,
      explanation:
        'The page is an async Server Component. Cache Components are enabled in configuration, and the data function explicitly opts into caching with use cache and a cache lifetime. Without that choice, a normal current-model fetch is not cached by default.',
      walkthrough: [
        {
          code: 'cacheComponents: true',
          explanation:
            'This enables the Next.js 16 Cache Components model used by use cache and cacheLife.',
        },
        {
          code: "'use cache'",
          explanation:
            'The directive opts this function result into caching; it is not the same as React cache request memoization.',
        },
        {
          code: "cacheLife('minutes')",
          explanation:
            'The cache profile describes how long the cached result may remain reusable and when it should revalidate.',
        },
        {
          code: 'export default async function ProductsPage()',
          explanation:
            'A Server Component may await data while rendering and send its rendered result rather than its component implementation to the browser.',
        },
      ],
      output: `Products
• Mechanical Keyboard
• Wireless Mouse
• 4K Monitor`,
    },
    realWorldExample: {
      title: 'A product detail route with a cart',
      description:
        'A store can keep product content on the server, stream recommendations, and send only the interactive cart controls into the client JavaScript graph.',
      steps: [
        'Create app/products/[id]/page.tsx and await the current Promise-based params before looking up the product.',
        'Render product text and metadata in Server Components so database credentials and server-only modules stay off the client.',
        'Wrap slower recommendations in Suspense and provide a meaningful loading skeleton.',
        'Move the Add to Cart control into a small Client Component because it needs an event and immediate local feedback.',
        'Use a Server Action for the mutation, then validate input and verify the user is authorized before changing cart data.',
        'Revalidate the precise cache tag or path required by the successful mutation and expose a useful failure state.',
      ],
    },
    visualFlow: [
      'Request enters an App Router route',
      'Next.js renders Server Component segments',
      'Cached or fresh data work resolves',
      'HTML and Server Component payload stream to the browser',
      'Client Component JavaScript hydrates interactive regions',
      'Later mutations call protected server boundaries and revalidate data',
    ],
    keyPoints: [
      'The App Router uses special files for pages, layouts, loading, errors, not-found UI, and HTTP handlers.',
      'Pages and layouts are Server Components by default; use client defines a client module boundary.',
      'A Client Component can be prerendered into initial HTML and then hydrated in the browser.',
      'Current Next.js 16 fetch calls are not cached by default, and Cache Components are explicitly enabled.',
      'Server Actions and Route Handlers require server-side input validation, authentication, and authorization.',
      'Current Next.js uses proxy.ts for the network boundary formerly commonly taught as middleware.ts.',
      'App Router lessons should not mix in Pages Router data APIs such as getServerSideProps.',
    ],
    commonMistakes: [
      {
        title: 'Adding use client to an entire page',
        explanation:
          'This moves the page and its imported module graph into the client bundle. Place the boundary around the smallest region that needs client features.',
      },
      {
        title: 'Repeating old fetch caching rules',
        explanation:
          'Current Next.js 16 guidance says fetch is not cached by default. Teach the configured caching model instead of older App Router defaults.',
      },
      {
        title: 'Trusting a hidden UI control',
        explanation:
          'A user can call a Server Action or Route Handler without using the visible button. The server operation must perform its own authorization check.',
      },
      {
        title: 'Using use server to identify a Server Component',
        explanation:
          'There is no Server Component directive. use server marks a Server Function that can cross the network boundary.',
      },
      {
        title: 'Teaching middleware.ts as the current name',
        explanation:
          'Next.js 16 renamed this convention to proxy.ts to make its request-boundary role clearer.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What does page.tsx do in the Next.js App Router?',
        answer:
          'It makes a route segment publicly accessible and renders the UI for that route at its position inside nested layouts.',
      },
      {
        level: 'Intermediate',
        question: 'When does a Next.js component need use client?',
        answer:
          'It needs a client boundary when it uses state, event handlers, Effects, browser-only APIs, or client-only Hooks.',
        deepDive:
          'The directive defines a module-graph boundary. Its imports become part of the client graph, so keeping that boundary small can reduce shipped JavaScript.',
      },
      {
        level: 'Advanced',
        question: 'Are fetch requests cached by default in the current Next.js 16 model?',
        answer:
          'No. Current fetch requests are not cached by default; Cache Components and use cache make reusable work explicit when enabled.',
        deepDive:
          'Caching behavior is version-sensitive. With Cache Components enabled, use cache, cacheLife, cacheTag, updateTag, revalidateTag, and revalidatePath express freshness and invalidation choices.',
      },
      {
        level: 'Advanced',
        question: 'Why must a Server Action perform authorization?',
        answer:
          'It is an externally invokable server boundary, so hiding its UI caller does not prevent an unauthorized request from reaching it.',
        deepDive:
          'Validate the submitted payload, authenticate the session, authorize the specific resource and operation, and return only safe error information before mutating data.',
      },
    ],
    relatedSlugs: ['advanced-react', 'frontend-performance', 'frontend-security'],
    sources: [
      { label: 'Next.js App Router', url: 'https://nextjs.org/docs/app' },
      {
        label: 'Next.js Server and Client Components',
        url: 'https://nextjs.org/docs/app/getting-started/server-and-client-components',
      },
      {
        label: 'Next.js Fetching Data',
        url: 'https://nextjs.org/docs/app/getting-started/fetching-data',
      },
      {
        label: 'Next.js Updating Data',
        url: 'https://nextjs.org/docs/app/getting-started/updating-data',
      },
      {
        label: 'Next.js Revalidating',
        url: 'https://nextjs.org/docs/app/getting-started/revalidating',
      },
      {
        label: 'Next.js Authentication Guide',
        url: 'https://nextjs.org/docs/app/guides/authentication',
      },
      { label: 'Next.js 16 release', url: 'https://nextjs.org/blog/next-16' },
    ],
    tags: ['nextjs', 'app-router', 'server-components', 'caching', 'server-actions'],
  },
  {
    slug: 'frontend-performance',
    title: 'Frontend Performance',
    description:
      'Measure loading, responsiveness, and visual stability; diagnose their causes; and make changes that improve real user experience instead of chasing a score.',
    category: 'performance',
    categoryLabel: 'Frontend Performance',
    subcategory: 'Measuring and optimizing experiences',
    difficulty: 'Advanced',
    estimatedReadTime: 26,
    prerequisites: ['nextjs-fundamentals'],
    learningObjectives: [
      'Measure current Core Web Vitals correctly and distinguish field data from controlled lab diagnostics.',
      'Connect network, rendering, JavaScript, image, font, and caching work to user-visible delays.',
      'Choose and verify targeted improvements instead of applying universal optimization recipes.',
    ],
    definition:
      'Frontend performance is how quickly and smoothly a website becomes useful and responds for real users. It includes loading speed, interaction responsiveness, visual stability, resource cost, and continued behavior throughout a visit.',
    explanation: {
      what: 'Performance work measures user-centered outcomes and traces a poor result back to concrete browser work. The current Core Web Vitals are Largest Contentful Paint for loading, Interaction to Next Paint for responsiveness, and Cumulative Layout Shift for visual stability.',
      why: 'A page can be visually polished yet unusable on a slower phone or network. Large scripts occupy the main thread, late images delay key content, missing dimensions move controls, and incorrect caching repeats work. Measurement reveals which cost matters for affected users.',
      how: [
        'Use field or real-user monitoring to discover what users experience across devices and networks, and use lab tools to reproduce and diagnose a problem.',
        'Evaluate Core Web Vitals at the 75th percentile separately for mobile and desktop: LCP at most 2.5 seconds, INP at most 200 milliseconds, and CLS at most 0.1 are the current good thresholds.',
        'Inspect the network waterfall and critical rendering path to find late discovery, slow server responses, render-blocking resources, and transfer cost.',
        'Inspect the main thread for script parsing, long tasks, layout, paint, and large rendering work that delay the next frame.',
        'Apply a focused change such as resizing an image, reserving space, splitting code, caching a safe response, or moving CPU work to a worker, then measure again.',
      ],
      where: [
        'Landing and product pages where fast meaningful content affects conversion',
        'Search, editor, and dashboard interactions that must remain responsive',
        'Media-heavy pages with images, video, and custom fonts',
        'Production monitoring and performance regression checks',
      ],
    },
    example: {
      title: 'Report the current Core Web Vitals',
      language: 'javascript',
      code: `import { onCLS, onINP, onLCP } from 'web-vitals';

function report(metric) {
  const value =
    metric.name === 'CLS'
      ? metric.value.toFixed(3)
      : Math.round(metric.value) + ' ms';

  console.log(metric.name, value, metric.rating);
}

onLCP(report);
onINP(report);
onCLS(report);`,
      explanation:
        'The web-vitals library observes browser performance APIs and invokes the callback when metric values are available. LCP and INP are displayed in milliseconds, while CLS is a unitless score. Production code would send the measurement and useful context to an analytics endpoint.',
      walkthrough: [
        {
          code: "import { onCLS, onINP, onLCP } from 'web-vitals'",
          explanation:
            'These functions provide the current three Core Web Vitals without manually reproducing their detailed calculation rules.',
        },
        {
          code: "metric.name === 'CLS'",
          explanation:
            'CLS has no time unit, so the example formats it differently from the millisecond metrics.',
        },
        {
          code: 'metric.rating',
          explanation:
            'The rating classifies the observed value using the current good, needs-improvement, and poor thresholds.',
        },
        {
          code: 'onINP(report)',
          explanation:
            'INP needs real interaction. A passive Lighthouse load cannot provide the same field value and commonly uses TBT as a lab proxy.',
        },
      ],
      output: `Example from one visit; actual values vary:
LCP 1840 ms good
INP 128 ms good
CLS 0.032 good`,
    },
    realWorldExample: {
      title: 'Fix a slow product hero',
      description:
        'Field data shows poor LCP on mobile product pages. The team traces the metric to a large hero image that the browser discovers late.',
      steps: [
        'Confirm the affected route, devices, percentile, and LCP element using field attribution data.',
        'Reproduce the page with network and CPU throttling and inspect the request waterfall.',
        'Put the correctly sized image URL in discoverable initial markup, use an efficient format, and avoid loading="lazy" on the likely LCP image.',
        'Use preload or fetch priority only if measurement shows resource discovery or priority remains the bottleneck.',
        'Reserve the image dimensions so the improvement does not introduce layout shift.',
        'Verify the lab trace, deploy gradually, and confirm that mobile field LCP improves without harming INP or CLS.',
      ],
    },
    visualFlow: [
      'Collect field measurements',
      'Choose an affected user journey',
      'Reproduce and record a lab trace',
      'Find the largest causal bottleneck',
      'Apply one focused optimization',
      'Measure again in lab and field',
    ],
    keyPoints: [
      'Current Core Web Vitals are LCP, INP, and CLS; FID is no longer one of them.',
      'Good thresholds are LCP at most 2.5 seconds, INP at most 200 milliseconds, and CLS at most 0.1 at the 75th percentile.',
      'Field data reveals real experience, while lab tools provide controlled diagnosis; neither replaces the other.',
      'JavaScript costs download, parse, compile, and execution time and can block interactions on the main thread.',
      'The likely LCP image should be discoverable early and should not be lazy-loaded.',
      'SSR, static rendering, CSR, streaming, and hydration have different trade-offs rather than a universal winner.',
      'Every optimization should be verified because improving one metric can regress another.',
    ],
    commonMistakes: [
      {
        title: 'Treating a Lighthouse score as all users',
        explanation:
          'A Lighthouse run is a controlled sample. It cannot represent every device, network, route, session, or real interaction in field data.',
      },
      {
        title: 'Lazy-loading the LCP image',
        explanation:
          "Deferring an above-the-fold hero image delays discovery and can directly worsen the page's main loading metric.",
      },
      {
        title: 'Preloading many resources',
        explanation:
          'Early bandwidth is limited. When everything receives high priority, critical resources compete and the hint can make performance worse.',
      },
      {
        title: 'Memoizing every React value',
        explanation:
          'Memoization adds dependencies and comparison work. Profile a production-like interaction and optimize a demonstrated expensive path.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What are the current Core Web Vitals?',
        answer:
          'They are LCP for loading, INP for interaction responsiveness, and CLS for visual stability.',
      },
      {
        level: 'Intermediate',
        question: 'What is the difference between lab and field performance data?',
        answer:
          'Lab data uses controlled conditions for reproducible diagnosis; field data records the varied devices, networks, pages, and interactions of real visits.',
        deepDive:
          'Start with field data to prioritize a genuine user problem, reproduce it in a lab trace, then return to field data after deployment to verify impact.',
      },
      {
        level: 'Advanced',
        question: 'Why can a server-rendered page still have poor responsiveness?',
        answer:
          'It can send fast HTML but still ship enough JavaScript and hydration or rendering work to block the main thread when users interact.',
        deepDive:
          'Rendering strategy changes where work happens; it does not remove work automatically. Measure HTML delivery, shipped JavaScript, hydration boundaries, long tasks, and actual INP together.',
      },
    ],
    relatedSlugs: ['nextjs-fundamentals', 'frontend-testing', 'frontend-architecture'],
    sources: [
      { label: 'web.dev Web Vitals', url: 'https://web.dev/articles/vitals' },
      { label: 'web.dev Optimize LCP', url: 'https://web.dev/articles/optimize-lcp' },
      { label: 'web.dev Optimize INP', url: 'https://web.dev/articles/optimize-inp' },
      { label: 'web.dev Optimize CLS', url: 'https://web.dev/articles/optimize-cls' },
      {
        label: 'web.dev Critical Rendering Path',
        url: 'https://web.dev/learn/performance/understanding-the-critical-path',
      },
      {
        label: 'web.dev Rendering on the Web',
        url: 'https://web.dev/articles/rendering-on-the-web',
      },
      {
        label: 'Chrome Lighthouse documentation',
        url: 'https://developer.chrome.com/docs/lighthouse/',
      },
    ],
    tags: ['performance', 'core-web-vitals', 'lcp', 'inp', 'cls'],
  },
  {
    slug: 'frontend-testing',
    title: 'Frontend Testing',
    description:
      'Build confidence with focused unit checks, user-centered React component tests, realistic browser journeys, stable selectors, and useful coverage evidence.',
    category: 'testing',
    categoryLabel: 'Testing',
    subcategory: 'Automated confidence',
    difficulty: 'Intermediate',
    estimatedReadTime: 24,
    prerequisites: ['frontend-tooling-fundamentals', 'react-fundamentals'],
    learningObjectives: [
      'Choose unit, component, integration, or end-to-end scope based on the behavior and risk being checked.',
      'Use Vitest as a runner and assertion framework while using Testing Library to interact with rendered UI like a user.',
      'Write isolated asynchronous tests with semantic queries and reserve mocking for deliberate system boundaries.',
    ],
    definition:
      'Frontend testing is the practice of executing code and checking that important user-visible behavior matches an expected result. Different test scopes provide different levels of speed, realism, and diagnostic detail.',
    explanation: {
      what: 'A unit test checks a small calculation, a component or integration test renders connected UI behavior, and an end-to-end test drives the application in a real browser. Vitest can discover and run tests; Testing Library provides user-centered DOM queries; Playwright controls browsers and provides web-aware waiting and assertions.',
      why: 'Types and lint rules catch useful classes of mistakes but cannot prove that a user can submit a form or recover from a failed request. Tests create repeatable evidence around valuable behavior and reduce the fear of changing code.',
      how: [
        'Describe an observable behavior, arrange the needed state, perform an action, and assert the result a user or caller can observe.',
        'Use getByRole and accessible names for existing UI, getByLabelText for labeled fields, and findBy queries when an element will appear asynchronously.',
        'Use user-event for full interactions such as clicking or typing; it dispatches the related event sequence and checks basic interactability.',
        'Keep tests isolated so their storage, cookies, mocks, and created data do not depend on execution order.',
        'Use a real browser for behavior that depends on layout, navigation, browser APIs, multiple engines, or an entire deployed stack.',
        'Treat coverage as a map of executed code, then review whether assertions cover meaningful normal, edge, and failure behavior.',
      ],
      where: [
        'Pure formatting, validation, sorting, and state-transition utilities',
        'React forms, dialogs, search results, and loading or error states',
        'Critical sign-in, checkout, publishing, and account-management journeys',
        'Continuous integration checks that prevent known regressions from merging',
      ],
    },
    example: {
      title: 'Test a sign-in flow through accessible controls',
      language: 'tsx',
      code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('welcomes the user after a successful sign in', async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText('Email'), 'mina@example.com');
    await user.type(screen.getByLabelText('Password'), 'correct-password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Welcome, Mina',
    );
  });
});`,
      explanation:
        'Vitest defines and runs the test and supplies expect. React Testing Library renders the component and finds controls by their accessible labels and roles. user-event performs realistic interactions, while findByRole waits for the asynchronous success message.',
      walkthrough: [
        {
          code: "it('welcomes the user after a successful sign in', async () => {})",
          explanation:
            'The test name states behavior and outcome rather than an internal function or state variable.',
        },
        {
          code: 'const user = userEvent.setup()',
          explanation:
            'A user controller is created for asynchronous typing and clicking interactions.',
        },
        {
          code: "screen.getByLabelText('Email')",
          explanation:
            'The query uses the label a user and assistive technology use to identify the field.',
        },
        {
          code: "screen.getByRole('button', { name: 'Sign in' })",
          explanation:
            'The button is located by semantic role and accessible name instead of a CSS implementation detail.',
        },
        {
          code: "await screen.findByRole('status')",
          explanation:
            'findBy retries for asynchronous UI until the status appears or the configured timeout expires.',
        },
      ],
      output: `✓ LoginForm > welcomes the user after a successful sign in

Test Files  1 passed
Tests       1 passed`,
    },
    realWorldExample: {
      title: 'Protect a checkout journey at several scopes',
      description:
        'A checkout is too important to trust to one large test or dozens of disconnected implementation checks. Each scope can cover the risk it observes best.',
      steps: [
        'Unit-test pure price, tax, discount, and validation functions with normal and boundary values.',
        'Render the checkout form and test labels, validation messages, keyboard interaction, pending state, and a successful submission response.',
        'Use a controlled API fake at the network boundary to reproduce declined-card and unavailable-product responses deterministically.',
        'Run a small Playwright journey through cart, checkout, and confirmation in a real browser with isolated test data.',
        'Record traces or screenshots only where they improve failure diagnosis, and fix flaky synchronization rather than adding arbitrary delays.',
        'Monitor production failures because automated tests sample known scenarios rather than proving the absence of every bug.',
      ],
    },
    visualFlow: [
      'Choose an important observable behavior',
      'Select the smallest realistic test scope',
      'Arrange isolated data and boundaries',
      'Interact through public or user-facing interfaces',
      'Await and assert the visible result',
      'Run in continuous integration and diagnose failures',
    ],
    keyPoints: [
      'Vitest is a test runner and assertion framework; Testing Library is not a runner.',
      'Tests should usually observe behavior rather than component state, private methods, or DOM structure.',
      'Semantic role, name, and label queries make tests resilient and can expose accessibility problems.',
      'user-event simulates fuller interactions than dispatching one low-level event, but it is still not a complete real browser.',
      'Playwright locators and web-first assertions include waiting designed for changing web pages.',
      'Tests should be isolated and must not depend on another test running first.',
      'Coverage shows executed code, not the quality of an assertion or complete product correctness.',
    ],
    commonMistakes: [
      {
        title: 'Testing implementation details',
        explanation:
          'Assertions about internal state, private methods, or a specific child component can fail during a safe refactor even when user behavior is unchanged.',
      },
      {
        title: 'Using a fixed sleep',
        explanation:
          'A timeout guesses how long work needs and becomes slow or flaky. Await the specific UI state with findBy, waitFor, or a web-first assertion.',
      },
      {
        title: 'Mocking every dependency',
        explanation:
          'Heavy mocking can produce a test of the mock arrangement rather than the integrated behavior. Fake a deliberate boundary and keep useful real collaboration.',
      },
      {
        title: 'Choosing elements by CSS structure',
        explanation:
          'Long CSS and XPath selectors are tied to markup arrangement. Prefer user-facing attributes or an explicit test ID when no semantic query fits.',
      },
      {
        title: 'Treating high coverage as high confidence',
        explanation:
          'A line can execute without checking its result. Review behavior, risk, edge cases, and assertion quality in addition to a percentage.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is the difference between Vitest and React Testing Library?',
        answer:
          'Vitest finds and runs tests and provides assertions and mocks; React Testing Library renders React UI and provides user-centered DOM queries.',
      },
      {
        level: 'Intermediate',
        question: 'Why is getByRole often preferred over a CSS selector?',
        answer:
          'It finds the interface through semantics and accessible name, which is closer to user behavior and less coupled to markup styling.',
        deepDive:
          'Role queries also encourage controls with correct semantics. A test ID remains useful as an explicit contract when no suitable user-facing query exists.',
      },
      {
        level: 'Advanced',
        question: 'How would you reduce end-to-end test flakiness?',
        answer:
          'Keep tests isolated, use resilient locators and web-first assertions, control test data, and wait for observable conditions instead of fixed timeouts.',
        deepDive:
          'Also remove cross-test state, avoid testing third-party systems you do not control, inspect traces, and identify whether failures come from the product, environment, data, or synchronization.',
      },
    ],
    relatedSlugs: ['frontend-tooling-fundamentals', 'react-fundamentals', 'frontend-security'],
    sources: [
      { label: 'Vitest guide', url: 'https://vitest.dev/guide/' },
      { label: 'Vitest mocking guide', url: 'https://vitest.dev/guide/mocking' },
      { label: 'Vitest coverage guide', url: 'https://vitest.dev/guide/coverage.html' },
      { label: 'Testing Library introduction', url: 'https://testing-library.com/docs/' },
      { label: 'Testing Library queries', url: 'https://testing-library.com/docs/queries/about/' },
      {
        label: 'Testing Library user-event',
        url: 'https://testing-library.com/docs/user-event/intro/',
      },
      { label: 'Playwright best practices', url: 'https://playwright.dev/docs/best-practices' },
      { label: 'Playwright assertions', url: 'https://playwright.dev/docs/test-assertions' },
    ],
    tags: ['testing', 'vitest', 'testing-library', 'playwright', 'automation'],
  },
  {
    slug: 'frontend-security',
    title: 'Frontend Security',
    description:
      'Understand browser trust boundaries, untrusted data, XSS, CSRF, CORS, sessions, storage, authorization, and why important defenses must be enforced on the server.',
    category: 'security',
    categoryLabel: 'Frontend Security',
    subcategory: 'Browser and application defense',
    difficulty: 'Advanced',
    estimatedReadTime: 28,
    prerequisites: ['nextjs-fundamentals'],
    learningObjectives: [
      'Explain the same-origin policy and distinguish CORS, authentication, authorization, XSS, and CSRF.',
      'Treat every browser-controlled value as untrusted and place validation and authorization at server boundaries.',
      'Choose safer rendering, cookie, storage, CSP, and third-party-script practices without describing one control as complete protection.',
    ],
    definition:
      'Frontend security is the practice of protecting users and application data across the browser’s trust boundaries. Browser defenses help, but the client is controlled by the user and cannot enforce secrets, data integrity, or authorization on its own.',
    explanation: {
      what: 'The browser isolates origins, restricts cross-origin reads, applies security headers, and can keep some cookies unavailable to JavaScript. Application code still handles untrusted URLs, form values, API responses, stored values, messages, and third-party scripts that may become attack inputs.',
      why: 'Frontend code runs on a device an attacker can inspect and change. If a server trusts a hidden button, claimed role, price, or object ID from the client, the attacker can send a different request. Unsafe DOM rendering can also turn data into executable code inside another user’s trusted session.',
      how: [
        'Start with the same-origin policy: an origin is based on scheme, host, and port, and CORS response headers selectively relax browser cross-origin access.',
        'Treat untrusted values as data. Prefer text rendering and context-appropriate encoding; sanitize with a maintained library when trusted product requirements truly allow HTML.',
        'Use Content Security Policy as an additional layer that limits allowed resource and script execution, not as a replacement for safe rendering.',
        'For cookie-authenticated mutations, use an appropriate CSRF defense such as a verified token plus restrictive SameSite cookies.',
        'Use Secure, HttpOnly, narrowly scoped, short-lived session cookies where appropriate and enforce session expiry on the server.',
        'At every protected endpoint, validate syntax and business meaning, authenticate the session, authorize the exact action and resource, and return only necessary data.',
      ],
      where: [
        'Sign-in, account recovery, checkout, and administrative interfaces',
        'Rendering comments, search parameters, rich text, and API-provided content',
        'Cross-origin API requests and embedded third-party resources',
        'Session, token, browser storage, and Server Action design',
      ],
    },
    example: {
      title: 'Send a protected mutation without pretending the client authorizes it',
      language: 'typescript',
      code: `function readCsrfToken(): string {
  const element = document.querySelector<HTMLMetaElement>(
    'meta[name="csrf-token"]',
  );

  if (!element?.content) throw new Error('Missing CSRF token');
  return element.content;
}

export async function deleteOrder(orderId: string): Promise<void> {
  const response = await fetch('/api/orders/' + encodeURIComponent(orderId), {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': readCsrfToken(),
    },
  });

  if (response.status === 403) {
    throw new Error('You are not allowed to delete this order');
  }

  if (!response.ok) throw new Error('Could not delete the order');
}`,
      explanation:
        'The browser includes same-origin credentials and a CSRF token with a state-changing request. The server must verify that token, authenticate the session, authorize this user for this exact order, validate the identifier, and only then delete. The TypeScript parameter and hidden UI are not security controls.',
      walkthrough: [
        {
          code: 'encodeURIComponent(orderId)',
          explanation:
            'Encoding prevents the value from changing the URL path structure, but the server must still validate its allowed format and meaning.',
        },
        {
          code: "credentials: 'same-origin'",
          explanation:
            'Same-origin cookies can accompany the request; sensitive session cookies should generally be Secure and HttpOnly.',
        },
        {
          code: "'X-CSRF-Token': readCsrfToken()",
          explanation:
            'The request presents a token that the server must compare using its CSRF design. Merely sending a header does not create protection.',
        },
        {
          code: 'if (response.status === 403)',
          explanation:
            'The UI handles denied authorization, while the decisive authorization check remains on the server.',
        },
      ],
      output: `Authorized request: the server returns 204 and the order disappears.
Unauthorized request: the server returns 403 and the UI shows "You are not allowed to delete this order".`,
    },
    realWorldExample: {
      title: 'Protect an administrative comment screen',
      description:
        'An administrator views user-generated comments and can remove abusive content, combining a high-value session with attacker-controlled text.',
      steps: [
        "Render comment text through the framework's normal text interpolation rather than inserting it as HTML.",
        'If a product requirement allows rich HTML, sanitize it with a maintained allowlist-based sanitizer before reaching an HTML sink.',
        'Deploy a tested CSP in report-only mode first, then enforce it as defense in depth against unexpected script execution.',
        'Keep the administrator session in a Secure, HttpOnly, restrictive SameSite cookie with appropriate server-enforced expiry.',
        'Protect each delete request against CSRF and verify the administrator role plus access to the target comment on the server.',
        'Log security-relevant failures without returning secrets or sensitive internal details to the browser.',
      ],
    },
    visualFlow: [
      'Browser creates an untrusted request',
      'TLS and browser policies protect transport and origin rules',
      'Server validates token and input shape',
      'Server authenticates the session',
      'Server authorizes the exact resource action',
      'Server performs the operation and returns minimal data',
      'Frontend safely renders the result',
    ],
    keyPoints: [
      'The browser is an untrusted client; server-side enforcement protects data and operations.',
      'CORS relaxes browser same-origin reading rules and is not authentication or authorization.',
      'Treat untrusted data as text unless sanitized HTML is an explicit requirement.',
      'CSP reduces impact as defense in depth but does not replace safe output handling.',
      'Client validation improves feedback; server validation enforces syntax and business rules.',
      'SameSite is only part of CSRF defense, and XSS can undermine many client-visible controls.',
      'Current OWASP guidance warns against storing session IDs or authentication tokens in localStorage or sessionStorage.',
      'Frontend build-time environment values can be inspected and must not contain secrets.',
    ],
    commonMistakes: [
      {
        title: 'Using CORS as authorization',
        explanation:
          'CORS tells a browser which origins may read responses. It does not stop direct requests or prove that a caller may access a resource.',
      },
      {
        title: 'Trusting client validation',
        explanation:
          'An attacker can skip the form and send a request directly. Repeat validation and all authorization rules at the server boundary.',
      },
      {
        title: 'Placing session tokens in Web Storage',
        explanation:
          'JavaScript running in the origin can read localStorage and sessionStorage, so one XSS flaw can expose stored credentials.',
      },
      {
        title: 'Rendering untrusted HTML directly',
        explanation:
          'APIs such as innerHTML or dangerouslySetInnerHTML interpret markup and can create XSS when data has not been correctly sanitized for that sink.',
      },
      {
        title: 'Hiding unauthorized controls only',
        explanation:
          'Conditional UI is useful feedback, but the attacker can construct the underlying request. The server must deny it independently.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is the difference between authentication and authorization?',
        answer:
          'Authentication verifies identity; authorization decides whether that identity may perform a specific action on a specific resource.',
      },
      {
        level: 'Intermediate',
        question: 'Why is CORS not an access-control system?',
        answer:
          'CORS is enforced by browsers to control cross-origin response access; non-browser clients can still send requests, so the server needs real authorization.',
        deepDive:
          'A permissive CORS policy can expose responses to hostile origins, but a restrictive policy cannot replace authentication, object-level authorization, or CSRF protection.',
      },
      {
        level: 'Advanced',
        question: 'How do HttpOnly, SameSite, and CSP reduce different risks?',
        answer:
          'HttpOnly blocks JavaScript cookie reads, SameSite limits some cross-site cookie sending, and CSP restricts allowed content and script execution.',
        deepDive:
          'Each is partial defense: HttpOnly does not stop injected code from acting as the user, SameSite is not complete CSRF protection, and CSP does not replace output encoding or sanitization.',
      },
    ],
    relatedSlugs: ['nextjs-fundamentals', 'frontend-testing', 'frontend-architecture'],
    sources: [
      {
        label: 'MDN Same-origin policy',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy',
      },
      {
        label: 'OWASP XSS Prevention Cheat Sheet',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
      },
      {
        label: 'OWASP CSRF Prevention Cheat Sheet',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html',
      },
      {
        label: 'OWASP Session Management Cheat Sheet',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html',
      },
      {
        label: 'OWASP Content Security Policy Cheat Sheet',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html',
      },
      {
        label: 'MDN Secure Cookie Configuration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Cookies',
      },
      { label: 'OWASP Top 10 2025', url: 'https://owasp.org/Top10/2025/0x00_2025-Introduction/' },
    ],
    tags: ['security', 'xss', 'csrf', 'cors', 'authorization'],
  },
  {
    slug: 'accessibility',
    title: 'Frontend Accessibility',
    description:
      'Create interfaces that people can perceive, understand, navigate, and operate with different devices and assistive technologies by starting with semantic HTML.',
    category: 'advanced-frontend',
    categoryLabel: 'Advanced Frontend',
    subcategory: 'Inclusive interfaces',
    difficulty: 'Advanced',
    estimatedReadTime: 24,
    prerequisites: ['react-fundamentals'],
    learningObjectives: [
      'Use semantic HTML, accessible names, focus order, keyboard behavior, and status communication as core interface requirements.',
      'Build a React disclosure control whose visual, keyboard, and accessibility states remain synchronized.',
      'Combine automated checks, keyboard review, assistive-technology testing, and human judgment without claiming that one tool proves conformance.',
    ],
    definition:
      'Web accessibility means designing and building content so people with different abilities can perceive, understand, navigate, and operate it. It is a product quality that begins with structure and behavior, not a final automated scan.',
    explanation: {
      what: 'Accessible interfaces expose meaningful structure, names, roles, values, states, instructions, focus, and feedback to browsers and assistive technologies. They also support zoom, reflow, contrast needs, reduced motion preferences, and input methods beyond a mouse.',
      why: 'People use keyboards, switches, screen readers, voice control, magnification, touch, and many combinations of technology. A custom control that only reacts to a pointer or has no programmatic name can block an otherwise simple task.',
      how: [
        'Start with the native element that already has the required meaning and interaction, such as button, label, input, heading, nav, or dialog.',
        'Give controls a visible or programmatically available accessible name and connect instructions and errors to the relevant field.',
        'Keep keyboard focus visible and logical, move it only for a clear interaction reason, and restore it when temporary UI such as a modal closes.',
        'Expose custom component state with the correct ARIA attribute only when native semantics cannot express it.',
        'Test at multiple viewport sizes and zoom levels, with a keyboard, with automated tools, and with representative assistive technology and users where possible.',
      ],
      where: [
        'Navigation, forms, dialogs, accordions, tabs, menus, and data tables',
        'Loading, error, success, and live-updating application states',
        'Responsive layouts used with zoom, reflow, touch, and keyboard input',
        'Design systems whose component choices affect many product screens',
      ],
    },
    example: {
      title: 'Build a semantic disclosure',
      language: 'tsx',
      code: `import { useId, useState } from 'react';

export function ShippingDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <section>
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
        >
          Shipping details
        </button>
      </h2>

      <div id={panelId} hidden={!isOpen}>
        Orders usually arrive within three business days.
      </div>
    </section>
  );
}`,
      explanation:
        'A real button supplies focus, keyboard activation, role, and disabled behavior without recreating them. React keeps the visible panel and aria-expanded state driven by the same boolean, while aria-controls references the controlled panel.',
      walkthrough: [
        {
          code: '<button type="button">',
          explanation:
            'The native button can be reached with Tab and activated with Enter or Space and exposes its button role automatically.',
        },
        {
          code: 'aria-expanded={isOpen}',
          explanation:
            'Assistive technology receives the same expanded or collapsed state that controls the visual panel.',
        },
        {
          code: 'aria-controls={panelId}',
          explanation:
            'The relationship points from the disclosure button to the unique panel it controls.',
        },
        {
          code: '<div id={panelId} hidden={!isOpen}>',
          explanation:
            'The hidden attribute removes the collapsed content from display and the accessibility tree in the normal browser model.',
        },
      ],
      output: `Collapsed:
Shipping details, button, collapsed

After activation:
Shipping details, button, expanded
Orders usually arrive within three business days.`,
    },
    realWorldExample: {
      title: 'Make checkout errors usable',
      description:
        'A checkout form must explain problems visually and programmatically without forcing users to hunt through the page or identify meaning from color alone.',
      steps: [
        'Use a persistent visible label for every input and clear instructions before submission.',
        'Validate on the server as the authority, then return field-specific errors in a structured response.',
        'Render error text next to its field and connect it with aria-describedby or the appropriate semantic relationship.',
        'Provide an error summary and move focus deliberately when it helps a user understand a failed submission.',
        'Keep focus indicators visible and ensure every correction and resubmission works with a keyboard.',
        'Test zoom, narrow reflow, screen-reader announcements, contrast, and the loading and success states as well as the initial form.',
      ],
    },
    visualFlow: [
      'Semantic element exposes name and role',
      'User reaches it with their input method',
      'User activates or changes the control',
      'Visual and programmatic state update together',
      'Status or error feedback is announced meaningfully',
      'Focus remains visible and logically placed',
    ],
    keyPoints: [
      'Use native HTML semantics before adding ARIA or recreating built-in interaction.',
      'Every interactive control needs a meaningful accessible name and keyboard operation.',
      'Visual state, programmatic state, and available actions must agree.',
      'Keyboard focus needs a visible indicator and a predictable order.',
      'Do not use color, position, sound, or placeholder text as the only way to convey essential information.',
      'WCAG success criteria are testable requirements, but meeting them still requires human evaluation.',
      'Automated tools find some issue types and cannot prove complete accessibility or WCAG conformance.',
    ],
    commonMistakes: [
      {
        title: 'Using a clickable div as a button',
        explanation:
          'A div does not automatically provide focus, Enter and Space activation, button semantics, or disabled behavior. Use a button when the action is a button.',
      },
      {
        title: 'Adding ARIA before checking HTML',
        explanation:
          'ARIA can expose semantics but does not create all native behavior. Prefer the native element that already implements the interaction.',
      },
      {
        title: 'Removing the focus outline',
        explanation:
          'Keyboard and switch users need a visible indication of the current control. Replace an unsuitable outline with an accessible focus style rather than removing it.',
      },
      {
        title: 'Using placeholder text as the label',
        explanation:
          'Placeholder text can disappear after typing, often has weak contrast, and does not reliably replace a persistent label and instructions.',
      },
      {
        title: 'Stopping after an automated scan',
        explanation:
          'Automation cannot judge every name, instruction, focus decision, reading order, cognitive issue, or real assistive-technology experience.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'Why should developers prefer a button over a div with an onClick handler?',
        answer:
          'A button already supplies the correct semantics, keyboard activation, focus behavior, and disabled support expected by users and assistive technology.',
      },
      {
        level: 'Intermediate',
        question: 'What is an accessible name?',
        answer:
          'It is the programmatically determined text assistive technology uses to identify a control or element, often coming from visible text or a label.',
        deepDive:
          'A control can have the right role but remain unusable when its name is missing or misleading. Test the role and name together and keep visible wording aligned.',
      },
      {
        level: 'Advanced',
        question: 'Can an automated accessibility test prove WCAG conformance?',
        answer:
          'No. It can reliably detect some rule violations, but many success criteria and usability decisions require manual and human evaluation.',
        deepDive:
          'Combine automation with semantic review, keyboard use, zoom and reflow checks, screen-reader testing, and feedback from people with disabilities when possible.',
      },
    ],
    relatedSlugs: ['react-fundamentals', 'frontend-testing', 'frontend-architecture'],
    sources: [
      { label: 'W3C WCAG 2.2', url: 'https://www.w3.org/TR/WCAG22/' },
      { label: 'WAI ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' },
      {
        label: 'WAI Accordion Pattern',
        url: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
      },
      {
        label: 'MDN Accessibility',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility',
      },
      {
        label: 'Playwright Accessibility Testing',
        url: 'https://playwright.dev/docs/accessibility-testing',
      },
    ],
    tags: ['accessibility', 'wcag', 'aria', 'keyboard', 'semantic-html'],
  },
  {
    slug: 'frontend-architecture',
    title: 'Frontend Architecture',
    description:
      'Organize a growing frontend around clear ownership, feature boundaries, state and data responsibilities, public interfaces, failure handling, and measurable quality attributes.',
    category: 'advanced-frontend',
    categoryLabel: 'Advanced Frontend',
    subcategory: 'Scalable application organization',
    difficulty: 'Advanced',
    estimatedReadTime: 28,
    prerequisites: [
      'advanced-react',
      'frontend-performance',
      'frontend-testing',
      'frontend-security',
      'accessibility',
    ],
    learningObjectives: [
      'Choose component, feature, state, routing, and data boundaries from responsibilities and change patterns rather than a fashionable folder diagram.',
      'Separate local UI state, URL state, server data, form state, and durable browser state to avoid duplicate sources of truth.',
      'Design module interfaces and cross-cutting checks that allow a team to change code without weakening accessibility, security, performance, or tests.',
    ],
    definition:
      'Frontend architecture is the set of boundaries and decisions that determine how an interface is organized, how data and state flow, and how teams change it safely. A good architecture fits the product’s actual constraints and can evolve with them.',
    explanation: {
      what: 'Architecture describes responsibilities rather than only directories. It identifies route and rendering boundaries, feature modules, reusable UI, state ownership, data access, error recovery, dependencies, and the quality rules that apply across the application.',
      why: 'Without clear ownership, the same server record may be copied into several stores, feature code reaches through unrelated modules, and one small change causes unpredictable updates. Useful boundaries reduce the number of concepts a developer must change together.',
      how: [
        'Begin with user journeys, business capabilities, team ownership, release needs, and quality attributes such as accessibility, security, performance, and reliability.',
        'Break the interface into components by responsibility and state ownership, then group closely changing code by feature or route where that improves understanding.',
        'Classify changing data: keep temporary interaction state local, share only genuinely common client state, represent shareable navigation in the URL, and let a data layer own server-state fetching and freshness.',
        'Expose a small public interface from each module and keep implementation details private so callers depend on behavior rather than internal files.',
        'Place loading, empty, error, and permission states at boundaries that can recover independently.',
        'Enforce important boundaries with types, lint rules, tests, build checks, runtime monitoring, and documentation rather than relying on memory.',
        'Revisit the design when evidence changes; monorepos and micro-frontends are organizational trade-offs, not automatic end goals.',
      ],
      where: [
        'Applications with several routes, product areas, and engineering teams',
        'Design systems shared by many screens or applications',
        'Dashboards with local interaction state and remotely cached server data',
        'Products that need independent releases, migrations, or gradual modernization',
      ],
    },
    example: {
      title: 'Keep API validation outside a presentational component',
      language: 'tsx',
      code: `// features/products/model.ts
export type Product = { id: string; name: string };

export function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string' && typeof item.name === 'string';
}

// features/products/api.ts
import { isProduct, type Product } from './model';

export async function loadProducts(signal: AbortSignal): Promise<Product[]> {
  const response = await fetch('/api/products', { signal });
  if (!response.ok) throw new Error('Could not load products');

  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error('Invalid product response');
  }

  return data;
}

// features/products/ProductList.tsx
import type { Product } from './model';

type ProductListProps = {
  products: Product[];
  onSelect: (productId: string) => void;
};

export function ProductList({ products, onSelect }: ProductListProps) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <button onClick={() => onSelect(product.id)}>{product.name}</button>
        </li>
      ))}
    </ul>
  );
}`,
      explanation:
        'The feature owns a runtime-checked Product model, an API boundary, and a UI component. ProductList receives validated data and reports a user intent through a callback, so it does not know URLs, caching, authentication, or page navigation details.',
      walkthrough: [
        {
          code: 'export function isProduct(value: unknown): value is Product',
          explanation:
            'The model boundary checks runtime data before the rest of the feature relies on its TypeScript shape.',
        },
        {
          code: 'export async function loadProducts(signal: AbortSignal)',
          explanation:
            'The API module owns transport and validation and accepts cancellation without coupling it to one screen.',
        },
        {
          code: 'type ProductListProps = { products: Product[]; onSelect: ... }',
          explanation:
            'The component public interface states exactly what it renders and what intent it reports.',
        },
        {
          code: 'onSelect(product.id)',
          explanation:
            'The component reports a stable identifier; its route or workflow owner decides what selection means.',
        },
      ],
      output: `• Mechanical Keyboard
• Wireless Mouse

Selecting "Wireless Mouse" calls onSelect with its product ID.`,
    },
    realWorldExample: {
      title: 'Structure a checkout capability',
      description:
        'Checkout combines cart data, delivery details, payment integration, authentication, validation, analytics, and several recoverable failures, so ownership matters more than the number of folders.',
      steps: [
        'Write the user journey and identify product rules, regulated data, performance targets, accessibility needs, and team ownership.',
        'Keep cart and checkout capabilities separate behind small public interfaces even if they first deploy together.',
        'Keep input editing near each form, share only the validated checkout draft required across steps, and avoid copying server totals into an unrelated global store.',
        'Place payment-provider code behind an adapter so UI components do not depend directly on vendor-specific objects.',
        'Design loading, declined-payment, expired-cart, retry, and success boundaries before implementing only the happy path.',
        'Enforce server-calculated prices and authorization, then test the user flow and monitor failures and performance after release.',
        'Split deployment units only if independent ownership and release evidence justify the additional operational cost.',
      ],
    },
    visualFlow: [
      'Product requirements and quality attributes',
      'Routes and user-journey boundaries',
      'Feature modules with explicit public interfaces',
      'Components with local state and reported intents',
      'Data layer validates and synchronizes server state',
      'Cross-cutting tests, security, accessibility, and performance checks',
      'Monitoring informs the next architectural change',
    ],
    keyPoints: [
      'There is no universal frontend folder structure; consistency and clear responsibility matter more than a template.',
      'Colocate code that changes together and expose small public module interfaces.',
      'Keep state in the smallest appropriate owner and avoid redundant or duplicated sources of truth.',
      'Server data, local UI state, URL state, form state, and persistent browser state have different lifecycles.',
      'A frontend data layer can validate, transform, cache, and observe requests, but server authorization remains authoritative.',
      'Loading, empty, error, and permission states are architecture, not finishing details.',
      'Micro-frontends and monorepos solve particular organizational constraints and introduce their own costs.',
    ],
    commonMistakes: [
      {
        title: 'Putting all state in one global store',
        explanation:
          'Temporary local state becomes coupled to unrelated screens, persists longer than needed, and creates broad update and testing surfaces.',
      },
      {
        title: 'Copying server data into several places',
        explanation:
          'Duplicated records develop conflicting freshness and mutation rules. Give server-state synchronization a clear owner and derive views from it.',
      },
      {
        title: 'Organizing only by technical file type',
        explanation:
          'A large global components, hooks, and utils tree can scatter one business change across the repository. Use feature or route cohesion where it helps the team.',
      },
      {
        title: 'Creating a shared abstraction after one use',
        explanation:
          'Premature generalization hides simple code behind an API designed without enough examples. Wait for a stable repeated responsibility.',
      },
      {
        title: 'Choosing micro-frontends by default',
        explanation:
          'Independent deployments can help separate autonomous teams, but duplicated dependencies, integration, consistency, observability, and performance become harder.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What makes a useful frontend component boundary?',
        answer:
          'It groups one understandable responsibility, has a clear public interface, and owns or receives the state needed for that responsibility.',
      },
      {
        level: 'Intermediate',
        question: 'How do you decide whether state should be local or global?',
        answer:
          'Keep it local by default and lift or share it only when multiple distant consumers need the same source of truth and lifetime.',
        deepDive:
          'Also ask whether the value is actually server data, URL navigation, form editing, or durable browser preference because each has a more natural owner than a generic global store.',
      },
      {
        level: 'Advanced',
        question: 'When might micro-frontends be justified?',
        answer:
          'They may fit when autonomous teams need genuinely independent ownership and release cycles across well-defined product boundaries.',
        deepDive:
          'The decision should account for shared runtime cost, duplicated libraries, design consistency, routing, authentication, observability, testing, failure isolation, and user performance.',
      },
    ],
    relatedSlugs: [
      'advanced-react',
      'frontend-performance',
      'frontend-testing',
      'frontend-security',
      'accessibility',
      'frontend-system-design',
    ],
    sources: [
      { label: 'React Thinking in React', url: 'https://react.dev/learn/thinking-in-react' },
      {
        label: 'React Choosing the State Structure',
        url: 'https://react.dev/learn/choosing-the-state-structure',
      },
      {
        label: 'Next.js Project Structure',
        url: 'https://nextjs.org/docs/app/getting-started/project-structure',
      },
      {
        label: 'TypeScript Modules',
        url: 'https://www.typescriptlang.org/docs/handbook/2/modules.html',
      },
      {
        label: 'web.dev Rendering on the Web',
        url: 'https://web.dev/articles/rendering-on-the-web',
      },
      { label: 'W3C WCAG 2.2', url: 'https://www.w3.org/TR/WCAG22/' },
    ],
    tags: ['architecture', 'components', 'state-management', 'modules', 'micro-frontends'],
  },
  {
    slug: 'frontend-system-design',
    title: 'Frontend System Design',
    description:
      'Learn a repeatable way to design large frontend experiences by clarifying requirements, drawing boundaries, choosing data and rendering strategies, and defending trade-offs.',
    category: 'system-design',
    categoryLabel: 'Frontend System Design',
    subcategory: 'System design method',
    difficulty: 'Advanced',
    estimatedReadTime: 32,
    prerequisites: ['frontend-architecture', 'frontend-performance', 'frontend-security'],
    learningObjectives: [
      'Lead a frontend system-design discussion from requirements and constraints through a clear high-level design.',
      'Choose rendering, API, caching, state, pagination, real-time, offline, accessibility, and security strategies from explicit trade-offs.',
      'Describe reliability, observability, testing, and evolution instead of presenting only a happy-path component diagram.',
    ],
    definition:
      'Frontend system design is the process of deciding how a large web experience should behave and be structured across browsers, edge delivery, APIs, data, and UI boundaries. The result is a reasoned set of trade-offs, not one universally correct diagram.',
    explanation: {
      what: 'A frontend system design connects product behavior with technical choices. It covers routes, rendering location, component and state ownership, API contracts, loading and error behavior, caching, real-time updates, performance, security, accessibility, analytics, tests, and deployment constraints.',
      why: 'Choosing a library before understanding users and scale produces impressive diagrams that may solve the wrong problem. A design method makes assumptions visible and lets an interviewer or team evaluate why each boundary exists and how the experience behaves under delay or failure.',
      how: [
        'Clarify users, primary actions, content, permissions, devices, network conditions, browser support, traffic shape, data size, update frequency, and privacy constraints.',
        'Prioritize functional requirements and measurable qualities such as p75 interaction latency, availability, accessibility level, freshness, bundle budget, and recovery behavior.',
        'Draw the browser, CDN or edge, backend-for-frontend or API, and downstream service boundaries before expanding individual components.',
        'Choose per-route rendering: static or cached output for reusable content, request rendering for request-specific needs, and client rendering for interaction after enough useful HTML is available.',
        'Define API shapes, stable identifiers, cursor or page pagination, cancellation, deduplication, errors, retries, and cache keys before selecting a data library.',
        'Use polling for simple periodic refresh, Server-Sent Events for server-to-client streams, or WebSocket for bidirectional low-latency messaging when requirements justify connection complexity.',
        'Finish with security boundaries, keyboard and assistive-technology behavior, observability, test layers, rollout, and a path for future scale.',
      ],
      where: [
        'Autocomplete, search, feeds, dashboards, and real-time notifications',
        'E-commerce catalogs, carts, checkout, and personalized accounts',
        'Video browsing and playback experiences',
        'Collaborative editors and other high-frequency synchronized interfaces',
      ],
    },
    example: {
      title: 'Design a cancellable cursor-based search client',
      language: 'typescript',
      code: `type SearchItem = { id: string; label: string };

type SearchResponse = {
  items: SearchItem[];
  nextCursor: string | null;
};

function isSearchResponse(value: unknown): value is SearchResponse {
  if (typeof value !== 'object' || value === null) return false;
  const result = value as Record<string, unknown>;
  return (
    Array.isArray(result.items) &&
    result.items.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Record<string, unknown>).id === 'string' &&
        typeof (item as Record<string, unknown>).label === 'string',
    ) &&
    (typeof result.nextCursor === 'string' || result.nextCursor === null)
  );
}

export async function search(
  query: string,
  cursor: string | null,
  signal: AbortSignal,
): Promise<SearchResponse> {
  const parameters = new URLSearchParams({ q: query, limit: '20' });
  if (cursor) parameters.set('cursor', cursor);

  const response = await fetch('/api/search?' + parameters, { signal });
  if (!response.ok) throw new Error('Search unavailable');

  const data: unknown = await response.json();
  if (!isSearchResponse(data)) throw new Error('Invalid search response');
  return data;
}`,
      explanation:
        'The contract uses stable IDs, a bounded page size, and an opaque next cursor. The caller can abort a stale request when the query changes, while runtime validation protects the UI from a malformed boundary response. Debouncing, caching, and stale-result suppression belong in the coordinating search feature.',
      walkthrough: [
        {
          code: 'nextCursor: string | null',
          explanation:
            'The server supplies an opaque continuation token; null means there is no next page.',
        },
        {
          code: "new URLSearchParams({ q: query, limit: '20' })",
          explanation:
            'The query and bounded page size form an explicit request contract without manually concatenating raw user text.',
        },
        {
          code: 'signal: AbortSignal',
          explanation:
            'The UI can cancel superseded network work, reducing waste and preventing an old query from remaining active unnecessarily.',
        },
        {
          code: 'const data: unknown = await response.json()',
          explanation:
            'External JSON stays unknown until runtime checks confirm the fields this frontend expects.',
        },
        {
          code: 'if (!response.ok)',
          explanation:
            'Fetch resolves for HTTP error statuses, so the client handles non-success responses explicitly.',
        },
      ],
      output: `Request: GET /api/search?q=keyboards&limit=20

Result:
20 matching items
nextCursor: "eyJvZmZzZXQiOjIwfQ"

The next request sends that cursor without interpreting its contents.`,
    },
    realWorldExample: {
      title: 'Design an accessible autocomplete',
      description:
        'Autocomplete looks small but combines fast typing, remote data, stale requests, keyboard behavior, caching, privacy, failure states, and traffic protection.',
      steps: [
        'Clarify data size, supported languages, result freshness, peak query rate, target devices, privacy rules, and the latency budget for suggestions.',
        'Define keyboard behavior, accessible name, active option, selection, no-results, loading, and error announcements before choosing components.',
        'Keep typed text and active-option state local, place the current query in the URL only when sharing or navigation requires it, and avoid a global store by default.',
        'Debounce enough to reduce needless requests without making typing feel delayed, require a useful minimum query length, and abort superseded fetches.',
        'Use a backend-for-frontend or search endpoint to validate input, enforce authorization and rate limits, normalize results, and hide internal services.',
        'Cache only responses whose privacy and freshness allow reuse, using normalized query and locale in the cache key and a clear invalidation or expiry rule.',
        "Ignore a late response unless it still matches the active request, render stable IDs as options, and offer retry without clearing the user's text.",
        'Measure p75 response and interaction latency, request volume, error rate, empty-result rate, abandonment, and accessibility regressions after rollout.',
      ],
    },
    visualFlow: [
      'User types in an accessible combobox',
      'Client normalizes, debounces, and cancels stale work',
      'Browser requests a bounded search contract',
      'Edge or API checks a safe reusable cache entry',
      'Backend validates, authorizes, and queries search services',
      'Client validates and ignores stale responses',
      'Results render with keyboard and assistive-technology state',
      'Metrics and errors feed production monitoring',
    ],
    keyPoints: [
      'Begin with users, requirements, constraints, and measurable quality targets before naming technologies.',
      'Choose rendering per route and content need; static, server, and client rendering are trade-offs that can coexist.',
      'API contracts need pagination, errors, cancellation, validation, and stable identifiers as well as happy-path fields.',
      'Caching requires a correct key, privacy decision, freshness rule, and invalidation or expiry strategy.',
      'Polling, SSE, and WebSocket provide different communication shapes and operational costs.',
      'The browser can improve feedback but cannot enforce server authorization or protect embedded secrets.',
      'Accessibility, performance, reliability, privacy, observability, and testability belong in the initial design.',
      'A strong design explains failure behavior and evolution, not only the normal request path.',
    ],
    commonMistakes: [
      {
        title: 'Choosing technology before requirements',
        explanation:
          'Starting with WebSocket, micro-frontends, or a state library makes the design defend a tool rather than solve measured user and team needs.',
      },
      {
        title: 'Caching personalized responses publicly',
        explanation:
          "A shared cache can serve one user's data to another when keys and Cache-Control rules ignore identity or personalization. Classify data before caching it.",
      },
      {
        title: 'Using WebSocket for every update',
        explanation:
          'Long-lived bidirectional connections add reconnection, ordering, backpressure, authentication, scaling, and observability concerns that simple polling or SSE may avoid.',
      },
      {
        title: 'Drawing only the happy path',
        explanation:
          'Real users experience slow, empty, partial, stale, offline, unauthorized, and failed states. Recovery behavior is part of the system design.',
      },
      {
        title: 'Estimating backend scale but ignoring clients',
        explanation:
          'Frontend design must include device CPU, memory, network variability, bundle and media size, cache behavior, browser support, and interaction frequency.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What should you clarify first in a frontend system-design interview?',
        answer:
          'Clarify the users, main actions, scope, data, permissions, devices, scale, freshness, and the quality attributes that matter most.',
      },
      {
        level: 'Intermediate',
        question: 'How would you choose between polling, SSE, and WebSocket?',
        answer:
          'Use update direction, latency, frequency, connection scale, browser support, and operational complexity to choose the simplest option that meets requirements.',
        deepDive:
          'Polling is simple periodic request-response, SSE provides a server-to-client event stream, and WebSocket provides bidirectional messages but requires more lifecycle and flow-control design.',
      },
      {
        level: 'Advanced',
        question: 'What makes a frontend cache design complete?',
        answer:
          'It defines what may be cached, the cache key and location, freshness and expiry, invalidation, privacy, failure behavior, and how effectiveness is measured.',
        deepDive:
          'Also describe browser versus CDN versus application caches, personalized data isolation, stale-while-revalidate behavior, mutation consistency, eviction, and how cache misses or stale data affect the UI.',
      },
      {
        level: 'Advanced',
        question:
          'How would you prevent stale autocomplete responses from replacing newer results?',
        answer:
          'Cancel superseded requests when possible and only commit a response if its request identity still matches the active query.',
        deepDive:
          'Debouncing reduces request volume but does not guarantee response order. AbortController, monotonically increasing request IDs, or query-library cancellation can enforce latest-request behavior.',
      },
    ],
    relatedSlugs: [
      'frontend-architecture',
      'frontend-performance',
      'frontend-security',
      'accessibility',
      'nextjs-fundamentals',
    ],
    sources: [
      { label: 'W3C Architecture of the Web', url: 'https://www.w3.org/TR/webarch/' },
      {
        label: 'MDN HTTP Overview',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview',
      },
      {
        label: 'MDN HTTP Caching',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching',
      },
      {
        label: 'MDN WebSocket',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket',
      },
      {
        label: 'MDN Server-sent Events',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events',
      },
      {
        label: 'web.dev Rendering on the Web',
        url: 'https://web.dev/articles/rendering-on-the-web',
      },
      { label: 'web.dev Web Vitals', url: 'https://web.dev/articles/vitals' },
      { label: 'W3C WCAG 2.2', url: 'https://www.w3.org/TR/WCAG22/' },
    ],
    tags: ['system-design', 'caching', 'rendering', 'real-time', 'scalability'],
  },
]);
