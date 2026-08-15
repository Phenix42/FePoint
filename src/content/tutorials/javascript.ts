import { defineTutorials } from '@/content/tutorials/tutorialDraft';

export const javascriptTutorials = defineTutorials([
  {
    slug: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    description:
      'Learn what JavaScript is, which work belongs to the language, and how browser APIs help it create interactive webpages.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Language introduction',
    difficulty: 'Beginner',
    estimatedReadTime: 9,
    prerequisites: ['Basic HTML and CSS'],
    learningObjectives: [
      'Explain the role JavaScript plays in a webpage.',
      'Distinguish the JavaScript language from APIs supplied by a browser.',
      'Run a small script and follow its result.',
    ],
    definition:
      'JavaScript is a programming language used to add behavior and interactivity to websites. It can calculate values and make decisions, while a host such as a browser provides APIs for tasks like changing a page, handling clicks, using timers, and requesting data.',
    explanation: {
      what: 'JavaScript is the language standardized as ECMAScript. A JavaScript engine reads and executes its values, expressions, conditions, loops, and functions. Features such as the DOM, events, fetch, console, and timers are not part of the core language; they are Web APIs supplied by the browser.',
      why: 'HTML describes content and CSS presents it, but many interfaces must react after the page loads. JavaScript lets an application validate a form, reveal a menu, update a cart total, or process data when the user does something.',
      how: [
        'A browser loads a script and its JavaScript engine parses and executes the instructions.',
        'The instructions work with values and control flow defined by ECMAScript.',
        'When the code needs the page, network, a timer, or another browser capability, it calls a host Web API.',
      ],
      where: [
        'Interactive forms, menus, search suggestions, shopping carts, and dashboards.',
        'Browser applications, server runtimes, build tools, command-line programs, and test runners.',
      ],
    },
    example: {
      title: 'Build a small status message',
      language: 'javascript',
      code: `const action = "Save";
const isReady = true;

const message = action + ": " + isReady;
console.log(message);`,
      explanation:
        'This script stores two values, combines them into new text, and sends the result to the host console so you can observe it.',
      walkthrough: [
        {
          code: 'const action = "Save";',
          explanation: 'Creates a binding named action whose value is the string "Save".',
        },
        {
          code: 'const isReady = true;',
          explanation: 'Stores a Boolean value that can represent a yes-or-no state.',
        },
        {
          code: 'const message = action + ": " + isReady;',
          explanation: 'Uses the + operator to combine the values into one string.',
        },
        {
          code: 'console.log(message);',
          explanation: 'Asks the host console API to display the finished value.',
        },
      ],
      output: 'Save: true',
    },
    realWorldExample: {
      title: 'Live search suggestions',
      description:
        'A search page can use JavaScript to react as a shopper types and replace the visible suggestions without loading a completely new page.',
      steps: [
        'The browser reports that the search field value changed.',
        'JavaScript reads the current text and decides whether it is long enough to search.',
        'The application obtains matching items and updates the suggestion list.',
      ],
    },
    keyPoints: [
      'JavaScript is a programming language standardized as ECMAScript.',
      'A browser supplies host APIs such as the DOM, events, fetch, and timers.',
      'JavaScript can calculate, decide, repeat work, and organize reusable behavior.',
      'Interactive behavior should build on meaningful HTML rather than replace it unnecessarily.',
    ],
    commonMistakes: [
      {
        title: 'Calling every browser feature JavaScript',
        explanation:
          'The language and the browser work together, but document, fetch, event, and timer objects are host Web APIs rather than ECMAScript language features.',
      },
      {
        title: 'Running heavy work on the main thread',
        explanation:
          'A long synchronous calculation can prevent the browser from responding to input or painting updates until that calculation finishes.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is JavaScript?',
        answer:
          'JavaScript is a programming language used to create behavior in web applications and many other kinds of programs.',
      },
      {
        level: 'Intermediate',
        question: 'What is the difference between JavaScript and a Web API?',
        answer:
          'JavaScript defines language features such as values and functions. A Web API is functionality supplied by the browser, such as the DOM, fetch, events, or timers.',
        deepDive:
          'The same JavaScript language can run in different hosts. Each host exposes a different set of APIs while the ECMAScript language rules remain shared.',
      },
    ],
    relatedSlugs: ['variables', 'data-types'],
    sources: [
      {
        label: 'MDN: JavaScript language overview',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview',
      },
      { label: 'ECMAScript language specification', url: 'https://tc39.es/ecma262/' },
    ],
    tags: ['javascript', 'ecmascript', 'web-platform', 'fundamentals'],
  },
  {
    slug: 'variables',
    title: 'Variables',
    description:
      'Use named bindings to keep track of values, update application state deliberately, and understand the difference between let, const, and var.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Bindings and state',
    difficulty: 'Beginner',
    estimatedReadTime: 10,
    prerequisites: ['JavaScript Fundamentals'],
    learningObjectives: [
      'Declare and initialize values with const and let.',
      'Choose const by default and use let when reassignment is required.',
      'Explain why const does not freeze an object.',
    ],
    definition:
      'A JavaScript variable declaration creates a named binding to a value. Use const when the binding will not be reassigned and let when it must point to a different value later.',
    explanation: {
      what: 'A binding connects a name such as cart or status to a value. Declaring a binding and assigning its first value is called initialization. Modern code generally uses const and let; var has older function-scoping and hoisting behavior that is easier to misuse.',
      why: 'Applications need names for information that will be read again, such as the current user, a price, or whether a dialog is open. Clear names make later calculations and updates understandable.',
      how: [
        'const creates a block-scoped binding that cannot be reassigned after initialization.',
        'let creates a block-scoped binding that may be reassigned while the binding remains in scope.',
        'If a const binding points to an object, the binding stays fixed but the object itself may still be changed unless it is separately protected.',
      ],
      where: [
        'Form values, counters, loading states, selected items, and calculated totals.',
        'Function-local intermediate results and module-level configuration values.',
      ],
    },
    example: {
      title: 'Track a cart and its status',
      language: 'javascript',
      code: `const cart = { itemCount: 1 };
let status = "idle";

cart.itemCount += 1;
status = "ready";

console.log(cart.itemCount, status);`,
      explanation:
        'The cart binding never points to a different object, so const is appropriate. The object property can still change. The status binding is reassigned, so it uses let.',
      walkthrough: [
        {
          code: 'const cart = { itemCount: 1 };',
          explanation: 'Creates a fixed binding to a mutable object.',
        },
        {
          code: 'let status = "idle";',
          explanation: 'Creates a binding whose value is expected to change.',
        },
        {
          code: 'cart.itemCount += 1;',
          explanation: 'Changes a property of the same cart object; it does not reassign cart.',
        },
        {
          code: 'status = "ready";',
          explanation: 'Reassigns the let binding to a different string value.',
        },
      ],
      output: '2 ready',
    },
    realWorldExample: {
      title: 'A checkout button state',
      description:
        'A checkout screen may keep a stable cart object while a separate status binding moves through idle, submitting, success, or error states.',
      steps: [
        'The page starts with a cart value and an idle status.',
        'Submitting the order changes the status while the cart still represents the same basket.',
        'The visible button label is derived from the latest status.',
      ],
    },
    keyPoints: [
      'Variables are named bindings to values.',
      'const prevents reassignment of the binding; it does not make an object immutable.',
      'let supports reassignment and both let and const are block-scoped.',
      'Prefer the narrowest scope that contains every use of a binding.',
    ],
    commonMistakes: [
      {
        title: 'Treating const as deep immutability',
        explanation:
          'const only prevents assigning a different value to the name. Properties inside a referenced object can still change.',
        code: 'const user = { name: "Asha" };\nuser.name = "Mina"; // Valid\nuser = {}; // TypeError',
      },
      {
        title: 'Using var without needing its legacy behavior',
        explanation:
          'var is function-scoped rather than block-scoped and is initialized differently during execution setup, which can produce surprising code.',
      },
      {
        title: 'Reading a binding before initialization',
        explanation:
          'let and const exist in a temporal dead zone from the start of their block until the declaration is evaluated, so an early read throws a ReferenceError.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'When should you use const instead of let?',
        answer:
          'Use const when the binding will not be reassigned. Use let only when the name must receive a different value later.',
      },
      {
        level: 'Intermediate',
        question: 'Why can an object declared with const still change?',
        answer:
          'const protects the binding, not the object. The name cannot point elsewhere, but properties on the same object can be added, removed, or updated.',
        deepDive:
          'Object.freeze() can prevent direct changes to one object, but it is shallow and does not automatically freeze nested objects.',
      },
    ],
    relatedSlugs: ['javascript-fundamentals', 'data-types', 'functions-and-scope'],
    sources: [
      {
        label: 'MDN: Grammar and types',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types',
      },
      {
        label: 'ECMAScript: let and const declarations',
        url: 'https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations',
      },
    ],
    tags: ['javascript', 'variables', 'const', 'let', 'scope'],
  },
  {
    slug: 'data-types',
    title: 'Data Types',
    description:
      'Understand JavaScript values through its seven primitive types and Object, including mutability, dynamic typing, and reference behavior.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Values and types',
    difficulty: 'Beginner',
    estimatedReadTime: 12,
    prerequisites: ['Variables'],
    learningObjectives: [
      'Name JavaScript’s seven primitive types and the Object type.',
      'Distinguish immutable primitive values from mutable objects.',
      'Use typeof while recognizing its important limitations.',
    ],
    definition:
      'A data type describes the kind of value a program is working with. JavaScript has seven primitive types—string, number, bigint, boolean, undefined, symbol, and null—plus Object for non-primitive values such as arrays and functions.',
    explanation: {
      what: 'Types determine which operations make sense for a value. JavaScript is dynamically typed: a binding does not permanently own one type, although every value has a type at runtime. Primitive values are immutable, while objects can contain changing properties.',
      why: 'Knowing the type of a value helps you choose valid operations and predict behavior. A price needs numeric handling, a label needs string handling, and a product record needs named object properties.',
      how: [
        'Primitive values represent text, numbers, very large integers, true-or-false states, missing states, and unique symbols.',
        'Everything that is not a primitive is an Object; arrays and callable functions are specialized objects.',
        'Assigning an object to another binding copies a reference to the same object, while assigning a primitive copies its value.',
      ],
      where: [
        'API response fields, form inputs, prices, feature flags, identifiers, and missing values.',
        'Arrays of results, product objects, callback functions, dates, maps, and other built-in objects.',
      ],
    },
    example: {
      title: 'Inspect several runtime types',
      language: 'javascript',
      code: `const username = "Hussain";
const itemCount = 3;
const isSignedIn = true;
const product = { id: 42 };

console.log(typeof username);
console.log(typeof itemCount);
console.log(typeof isSignedIn);
console.log(typeof product);`,
      explanation:
        'typeof reports useful type strings for these common values. The product record is an object, while the other values are primitives.',
      walkthrough: [
        {
          code: 'const username = "Hussain";',
          explanation: 'Creates a string primitive used for text.',
        },
        {
          code: 'const itemCount = 3;',
          explanation: 'Creates a number primitive used for this count.',
        },
        {
          code: 'const isSignedIn = true;',
          explanation: 'Creates a boolean primitive for a two-state decision.',
        },
        {
          code: 'const product = { id: 42 };',
          explanation: 'Creates an object that groups a value under the id key.',
        },
      ],
      output: 'string\nnumber\nboolean\nobject',
    },
    realWorldExample: {
      title: 'A product returned by an API',
      description:
        'An e-commerce response may use a string for the name, a number for the price, a boolean for stock status, null for a missing discount, and an object to group those fields.',
      steps: [
        'The application receives a structured product object.',
        'Code reads each field according to the value it actually contains.',
        'The UI formats the values into a readable product card.',
      ],
    },
    keyPoints: [
      'JavaScript has seven primitive types and Object.',
      'Primitives are immutable, while object properties can be changed.',
      'Arrays and functions are specialized kinds of objects.',
      'JavaScript is dynamically typed, but every runtime value still has a type.',
      'typeof null returns "object" because of a historical language behavior.',
    ],
    commonMistakes: [
      {
        title: 'Forgetting null in the primitive list',
        explanation:
          'null is one of the seven primitives even though typeof null returns "object" for historical compatibility.',
      },
      {
        title: 'Expecting an object assignment to make a copy',
        explanation:
          'Two bindings can refer to the same object. A mutation through either binding is visible through the other.',
        code: 'const first = { count: 1 };\nconst second = first;\nsecond.count = 2;\nconsole.log(first.count); // 2',
      },
      {
        title: 'Treating form values as numbers automatically',
        explanation:
          'Values read from ordinary input elements are strings, so numeric calculations need deliberate parsing and validation.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What are the JavaScript data types?',
        answer:
          'The seven primitives are string, number, bigint, boolean, undefined, symbol, and null. Every non-primitive value is an Object.',
      },
      {
        level: 'Intermediate',
        question: 'How do primitive and object assignments differ?',
        answer:
          'A primitive assignment copies the primitive value. An object assignment copies a reference, so both bindings can refer to the same mutable object.',
        deepDive:
          'The spread syntax can create a new outer object or array, but that copy is shallow and still shares nested object references.',
      },
    ],
    relatedSlugs: ['variables', 'operators', 'arrays-and-objects'],
    sources: [
      {
        label: 'MDN: JavaScript data structures',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures',
      },
      {
        label: 'ECMAScript data types and values',
        url: 'https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html',
      },
    ],
    tags: ['javascript', 'data-types', 'primitives', 'objects', 'typeof'],
  },
  {
    slug: 'operators',
    title: 'Operators',
    description:
      'Combine, compare, assign, and test values with JavaScript operators while avoiding accidental coercion and precedence mistakes.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Expressions',
    difficulty: 'Beginner',
    estimatedReadTime: 11,
    prerequisites: ['Data Types'],
    learningObjectives: [
      'Use arithmetic, assignment, comparison, and logical operators.',
      'Prefer strict equality for predictable comparisons.',
      'Explain short-circuit evaluation and operator precedence.',
    ],
    definition:
      'An operator is a symbol or keyword that performs an operation on one or more values. Operators can calculate a result, compare values, assign a value, or combine conditions.',
    explanation: {
      what: 'Operators form expressions such as price * quantity or role === "admin". Common groups include arithmetic operators, comparison operators, logical operators, assignment operators, and conditional syntax.',
      why: 'Programs need to turn input into decisions and results. Operators let a cart calculate its total, a form compare values, and an authorization check combine several requirements.',
      how: [
        'JavaScript evaluates operands according to operator precedence and associativity; parentheses can make the intended grouping explicit.',
        'Strict equality, ===, compares without first coercing operands to another type, so it is the safer default for application code.',
        'The && and || operators short-circuit: they may skip the right operand and return one of their operand values rather than an automatic boolean.',
      ],
      where: [
        'Price calculations, validation rules, permissions, filters, and feature conditions.',
        'Default values, optional work, counters, and comparisons in tests.',
      ],
    },
    example: {
      title: 'Check whether a user may continue',
      language: 'javascript',
      code: `const enteredPin = "1234";
const savedPin = "1234";
const attempts = 1;

const canContinue = enteredPin === savedPin && attempts < 3;
console.log(canContinue);`,
      explanation:
        'The expression requires both a strict PIN match and fewer than three attempts. Because both comparisons are true, the combined result is true.',
      walkthrough: [
        {
          code: 'enteredPin === savedPin',
          explanation: 'Compares both value and type without coercion.',
        },
        {
          code: 'attempts < 3',
          explanation: 'Checks whether the numeric attempt count is below the limit.',
        },
        {
          code: 'conditionA && conditionB',
          explanation: 'Requires the left and right conditions to be truthy.',
        },
      ],
      output: 'true',
    },
    realWorldExample: {
      title: 'Enabling a payment button',
      description:
        'A checkout can enable its payment action only when the form is valid, the cart is not empty, and a request is not already running.',
      steps: [
        'Each part of the page produces a boolean condition.',
        'Logical operators combine those conditions into one canPay value.',
        'The button disabled state is derived from that final result.',
      ],
    },
    keyPoints: [
      'Operators turn operands into expression results.',
      'Use === and !== as the normal equality operators.',
      'Parentheses make grouping clear when several operators appear together.',
      'Logical operators short-circuit and return operand values.',
    ],
    commonMistakes: [
      {
        title: 'Using assignment inside a comparison',
        explanation:
          'A single = assigns a value; it does not test equality. An accidental assignment can change state and make a condition behave unexpectedly.',
        code: 'if (status = "ready") { /* assignment, not comparison */ }',
      },
      {
        title: 'Using loose equality by default',
        explanation:
          'The == operator applies type coercion before some comparisons. Prefer === unless a specific coercion rule is intentional and documented.',
      },
      {
        title: 'Assuming logical operators always return booleans',
        explanation:
          'The result of a && or || expression is one of its operands. Convert explicitly with Boolean() when a true boolean is required.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is the difference between == and ===?',
        answer:
          '== may coerce operands before comparing them. === compares without type coercion, so both type and value must match.',
      },
      {
        level: 'Intermediate',
        question: 'What does short-circuit evaluation mean?',
        answer:
          'JavaScript stops evaluating a logical expression as soon as its result is determined, so the right operand may not run.',
        deepDive:
          'The expression a && b returns a when a is falsy and otherwise returns b. The expression a || b returns a when a is truthy and otherwise returns b.',
      },
    ],
    relatedSlugs: ['data-types', 'conditions'],
    sources: [
      {
        label: 'MDN: Expressions and operators',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators',
      },
      {
        label: 'MDN: Strict equality',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality',
      },
      {
        label: 'ECMAScript equality operators',
        url: 'https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-equality-operators',
      },
    ],
    tags: ['javascript', 'operators', 'strict-equality', 'expressions'],
  },
  {
    slug: 'conditions',
    title: 'Conditions',
    description:
      'Make JavaScript choose between paths with if, else, switch, and conditional expressions that communicate business rules clearly.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Control flow',
    difficulty: 'Beginner',
    estimatedReadTime: 9,
    prerequisites: ['Operators'],
    learningObjectives: [
      'Write if, else if, and else branches.',
      'Choose between if, switch, and a conditional expression.',
      'Recognize truthy and falsy values without hiding important checks.',
    ],
    definition:
      'A condition lets a program choose which code to run based on whether an expression is truthy or falsy. JavaScript provides if and switch statements, plus the conditional operator for choosing a value.',
    explanation: {
      what: 'Conditional control flow creates branches. An if statement checks its expression first, optional else if branches check further cases, and else handles the remaining path. A switch compares one expression with several case values using strict equality semantics.',
      why: 'Interfaces do not always show the same result. They need different behavior for valid and invalid forms, signed-in and signed-out users, available and unavailable products, or successful and failed operations.',
      how: [
        'JavaScript evaluates the condition and converts its result to a boolean for the branch decision.',
        'Only the first matching branch in an if/else-if chain runs.',
        'A switch enters the matching case and continues until a break, return, throw, or the end of the statement.',
      ],
      where: [
        'Validation messages, permission checks, loading states, stock labels, and route guards.',
        'Choosing a display value with a short conditional expression when both alternatives are simple.',
      ],
    },
    example: {
      title: 'Choose a stock message',
      language: 'javascript',
      code: `const stock = 2;
let message;

if (stock === 0) {
  message = "Out of stock";
} else if (stock < 5) {
  message = "Only a few left";
} else {
  message = "In stock";
}

console.log(message);`,
      explanation:
        'The first condition is false, the second is true, so JavaScript assigns the low-stock message and skips the final branch.',
      walkthrough: [
        {
          code: 'if (stock === 0)',
          explanation: 'Checks the most specific unavailable case first.',
        },
        {
          code: 'else if (stock < 5)',
          explanation: 'Checks the low-stock case only because the first branch did not run.',
        },
        {
          code: 'else',
          explanation: 'Provides a fallback for every other stock count.',
        },
      ],
      output: 'Only a few left',
    },
    realWorldExample: {
      title: 'Showing an account screen',
      description:
        'An account route can show a sign-in prompt, a loading indicator, an error message, or the user profile according to the current application state.',
      steps: [
        'The route checks whether authentication is still loading.',
        'It then handles an error or missing user explicitly.',
        'Only a known signed-in state displays private account content.',
      ],
    },
    keyPoints: [
      'Conditions choose which path of code runs.',
      'Order branches from specific cases to a sensible fallback.',
      'Truthy and falsy conversion can be useful, but explicit comparisons often express rules better.',
      'Use a conditional expression for a value choice, not a long sequence of side effects.',
    ],
    commonMistakes: [
      {
        title: 'Leaving a switch case open accidentally',
        explanation:
          'Without break, return, or throw, execution continues into later cases. That fall-through should be intentional and easy to see.',
      },
      {
        title: 'Treating every falsy value as missing',
        explanation:
          'The values 0, an empty string, false, null, undefined, and NaN are falsy, but some of them may be valid application data.',
      },
      {
        title: 'Nesting too many decisions',
        explanation:
          'Deep nesting hides the main path. Early returns or small named functions can make separate rules easier to follow.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'How does an if statement choose a branch?',
        answer:
          'It converts the condition to a boolean and runs the associated block when that result is true; otherwise it tries the next branch.',
      },
      {
        level: 'Intermediate',
        question: 'When is switch a reasonable choice?',
        answer:
          'switch is useful when one expression is compared against several exact case values. if is often clearer for ranges or unrelated conditions.',
        deepDive:
          'Case matching follows strict comparison behavior, and execution falls through until it reaches a break or another abrupt completion.',
      },
    ],
    relatedSlugs: ['operators', 'loops', 'functions-and-scope'],
    sources: [
      {
        label: 'MDN: Conditional statements',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#conditional_statements',
      },
      {
        label: 'ECMAScript if statement',
        url: 'https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-if-statement',
      },
    ],
    tags: ['javascript', 'conditions', 'if', 'switch', 'control-flow'],
  },
  {
    slug: 'loops',
    title: 'Loops',
    description:
      'Repeat work safely with for, while, and for-of loops while managing termination, indexes, and collection changes deliberately.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Iteration',
    difficulty: 'Beginner',
    estimatedReadTime: 10,
    prerequisites: ['Conditions'],
    learningObjectives: [
      'Choose a loop that matches the data and stopping rule.',
      'Iterate over array values with for-of.',
      'Prevent infinite loops and common boundary errors.',
    ],
    definition:
      'A loop repeats a block of code while a rule allows it or for each value in a collection. JavaScript includes for, while, do-while, for-of, and for-in statements for different kinds of iteration.',
    explanation: {
      what: 'Iteration means processing a repeated sequence of steps. A traditional for loop exposes setup, condition, and update expressions. while repeats from a condition, and for-of visits values produced by an iterable such as an array.',
      why: 'Frontend data usually arrives in collections. Instead of writing the same instruction for every product, notification, or form field, a loop can process an unknown number of values consistently.',
      how: [
        'Before each iteration, the loop determines whether another step should run or requests the next value.',
        'The body performs its work; continue can skip to the next iteration and break can leave the loop.',
        'A condition-based loop must eventually change the data used by its stopping condition.',
      ],
      where: [
        'Calculating totals, validating fields, transforming results, and searching collections.',
        'Polling with an explicit stopping rule, tree traversal, and retry logic with limits.',
      ],
    },
    example: {
      title: 'Add the prices in a cart',
      language: 'javascript',
      code: `const prices = [10, 20, 30];
let total = 0;

for (const price of prices) {
  total += price;
}

console.log(total);`,
      explanation:
        'for-of provides each array value in order. The total binding starts at zero and is updated once for every price.',
      walkthrough: [
        {
          code: 'let total = 0;',
          explanation: 'Creates the accumulator that will hold the running sum.',
        },
        {
          code: 'for (const price of prices)',
          explanation: 'Visits the values 10, 20, and 30 without manually managing an index.',
        },
        {
          code: 'total += price;',
          explanation: 'Adds the current value to the result on each iteration.',
        },
      ],
      output: 'The console displays: 60',
    },
    realWorldExample: {
      title: 'Validate a checkout form',
      description:
        'A checkout can iterate through a list of required fields, collect a message for each invalid value, and focus the first field that needs attention.',
      steps: [
        'The program obtains the required field elements.',
        'A loop checks each current value against its rule.',
        'The page displays the collected errors after the loop finishes.',
      ],
    },
    keyPoints: [
      'Every condition-based loop needs a reachable stopping state.',
      'for-of reads iterable values; for-in enumerates property keys.',
      'break exits a loop and continue skips the rest of one iteration.',
      'Array methods may express common transformations more directly than a manual loop.',
    ],
    commonMistakes: [
      {
        title: 'Creating an infinite loop',
        explanation:
          'If the loop condition never becomes false and nothing breaks the loop, synchronous code can block the page indefinitely.',
        code: 'let count = 0;\nwhile (count < 3) {\n  console.log(count);\n  // count never changes\n}',
      },
      {
        title: 'Using for-in for array values',
        explanation:
          'for-in enumerates property keys and can include inherited enumerable properties. Use for-of or an array method when you need array values.',
      },
      {
        title: 'Using the wrong boundary',
        explanation:
          'Array indexes run from zero through length minus one, so an index loop normally checks index < array.length rather than <=.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is the difference between for and while?',
        answer:
          'Both repeat code. for groups initialization, condition, and update together, while is convenient when only the continuation condition is central.',
      },
      {
        level: 'Intermediate',
        question: 'How do break and continue differ?',
        answer:
          'break exits the nearest loop completely. continue skips the remaining body for the current iteration and proceeds with the next one.',
      },
    ],
    relatedSlugs: ['conditions', 'functions-and-scope', 'arrays-and-objects'],
    sources: [
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
      },
      {
        label: 'ECMAScript iteration statements',
        url: 'https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-iteration-statements',
      },
    ],
    tags: ['javascript', 'loops', 'iteration', 'for-of'],
  },
  {
    slug: 'functions-and-scope',
    title: 'Functions and Scope',
    description:
      'Organize reusable behavior with functions and understand how lexical scope controls which bindings each piece of code can access.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Functions and lexical scope',
    difficulty: 'Beginner',
    estimatedReadTime: 14,
    prerequisites: ['Conditions', 'Loops'],
    learningObjectives: [
      'Declare, call, and return a value from a function.',
      'Explain global, function, and block scope.',
      'Describe how a closure retains access to its lexical environment.',
    ],
    definition:
      'A function is a callable object that groups instructions and can receive arguments and return a value. Scope is the set of bindings that code can access from the place where that code was written.',
    explanation: {
      what: 'Functions turn a repeated operation into a named unit. Parameters are local bindings initialized from call arguments, and return sends a result back to the caller. JavaScript uses lexical scope, so access is determined by the nested structure of the source code.',
      why: 'Small functions reduce repetition, give important rules a name, and let code be tested in isolation. Scope prevents every temporary value from becoming global and helps each function depend on a clear set of inputs.',
      how: [
        'Calling a function creates a new execution context with parameter and local bindings.',
        'When code reads a name, JavaScript checks the current lexical environment and then its outer environments until it finds the binding or reaches the outermost scope.',
        'A returned inner function forms a closure over bindings it uses from an outer lexical environment, so those bindings remain available for later calls.',
      ],
      where: [
        'Validation helpers, formatting utilities, event handlers, data transformations, and component logic.',
        'Factories that create configured functions and modules that keep implementation details private.',
      ],
    },
    example: {
      title: 'Calculate a total with tax',
      language: 'javascript',
      code: `const taxRate = 0.18;

function totalWithTax(price) {
  const tax = price * taxRate;
  return price + tax;
}

console.log(totalWithTax(100));`,
      explanation:
        'The function receives a price, creates a local tax value, reads the outer taxRate binding through lexical scope, and returns the calculated total.',
      walkthrough: [
        {
          code: 'function totalWithTax(price)',
          explanation: 'Declares a reusable function with one parameter named price.',
        },
        {
          code: 'const tax = price * taxRate;',
          explanation: 'Creates a function-local value and reads taxRate from the outer scope.',
        },
        {
          code: 'return price + tax;',
          explanation: 'Finishes the call and provides the calculated number to its caller.',
        },
        {
          code: 'totalWithTax(100)',
          explanation: 'Calls the function with 100 as the argument for price.',
        },
      ],
      output: '118',
    },
    realWorldExample: {
      title: 'Reusable form validation',
      description:
        'A registration form can call separate functions for email, password, and username rules, then combine their returned results into one clear error summary.',
      steps: [
        'Each validation function receives one value rather than reading every field globally.',
        'The function returns either a useful error or a valid result.',
        'The submit handler combines those results and decides whether to continue.',
      ],
    },
    keyPoints: [
      'Functions can receive arguments and return values.',
      'Parameters and local declarations belong to the function call or nested block that contains them.',
      'Lexical scope follows where functions are defined, not where they are called.',
      'A closure preserves access to referenced bindings from an outer lexical environment.',
      'Small focused functions make behavior easier to reuse and test.',
    ],
    commonMistakes: [
      {
        title: 'Forgetting to return the result',
        explanation:
          'A function with no executed return statement produces undefined, even when it calculated a useful local value.',
        code: 'function double(value) {\n  value * 2;\n}\nconsole.log(double(4)); // undefined',
      },
      {
        title: 'Changing outer state without making it clear',
        explanation:
          'A function that silently mutates a global binding is harder to test and reuse than one that receives input and returns a result.',
      },
      {
        title: 'Assuming arrow functions have their own this',
        explanation:
          'Arrow functions capture this from their surrounding scope. That is useful for callbacks but different from normal function call semantics.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is the difference between a parameter and an argument?',
        answer:
          'A parameter is the local name in a function definition. An argument is the value supplied for that parameter when the function is called.',
      },
      {
        level: 'Intermediate',
        question: 'What is lexical scope?',
        answer:
          'Lexical scope means a function can access bindings based on where the function is written in the nested source code.',
        deepDive:
          'Name resolution starts in the current lexical environment and follows outer-environment links. Calling the function from another location does not change that chain.',
      },
      {
        level: 'Advanced',
        question: 'What is a closure?',
        answer:
          'A closure is a function together with access to the lexical environment in which that function was created.',
        deepDive:
          'Closures support private state and function factories, but retained references can also keep data alive longer than intended.',
      },
    ],
    relatedSlugs: ['variables', 'loops', 'arrays-and-objects', 'events'],
    sources: [
      {
        label: 'MDN: Functions',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
      },
      {
        label: 'MDN: Closures',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures',
      },
      {
        label: 'ECMAScript function definitions',
        url: 'https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html',
      },
    ],
    tags: ['javascript', 'functions', 'scope', 'closures', 'return-values'],
  },
  {
    slug: 'arrays-and-objects',
    title: 'Arrays and Objects',
    description:
      'Model frontend data with ordered arrays and keyed objects, then read, transform, and copy those collections without losing track of references.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Collections and records',
    difficulty: 'Beginner',
    estimatedReadTime: 14,
    prerequisites: ['Functions and Scope'],
    learningObjectives: [
      'Choose an array for ordered values and an object for named fields.',
      'Read and update array items and object properties.',
      'Use map and filter to create transformed arrays.',
      'Recognize shared references and shallow copies.',
    ],
    definition:
      'An array is an object designed to store an ordered collection whose elements use numeric indexes. An ordinary object groups values under property keys, which are strings or symbols.',
    explanation: {
      what: 'Arrays are useful when position and iteration matter, while objects describe entities through named properties. Both are mutable reference values. Arrays provide methods such as map, filter, find, push, and slice for common collection work.',
      why: 'Frontend applications handle lists of products, messages, and search results as well as records for users, settings, and form values. Choosing the right shape makes reading and updating that information more direct.',
      how: [
        'Array indexes start at zero, and length reports the position after the final indexed element in a dense array.',
        'Object properties can be read with dot notation or bracket notation; brackets are useful when the key is stored in another value.',
        'Methods such as map and filter return new arrays, while methods such as push, pop, and splice change the original array.',
      ],
      where: [
        'Product grids, navigation items, notifications, table rows, and API result lists.',
        'User profiles, configuration, normalized state, request payloads, and lookup tables.',
      ],
    },
    example: {
      title: 'Select available product names',
      language: 'javascript',
      code: `const products = [
  { name: "Keyboard", inStock: true },
  { name: "Monitor", inStock: false },
];

const availableNames = products
  .filter((product) => product.inStock)
  .map((product) => product.name);

console.log(availableNames.join(", "));`,
      explanation:
        'The array stores product objects. filter creates an array containing the available product, and map creates an array containing its name.',
      walkthrough: [
        {
          code: 'const products = [...]',
          explanation: 'Creates an ordered array whose values are product objects.',
        },
        {
          code: '.filter((product) => product.inStock)',
          explanation: 'Keeps only objects whose inStock property is truthy.',
        },
        {
          code: '.map((product) => product.name)',
          explanation: 'Transforms each remaining product object into its name string.',
        },
        {
          code: 'availableNames.join(", ")',
          explanation: 'Combines the name strings into readable output.',
        },
      ],
      output: 'Keyboard',
    },
    realWorldExample: {
      title: 'Render an order history',
      description:
        'An account page can hold orders in an array, represent each order as an object, filter by status, and render one row for each matching record.',
      steps: [
        'The API response supplies an array of order objects.',
        'The application filters or sorts the array for the selected view.',
        'Rendering code reads named fields such as id, total, and status from each object.',
      ],
    },
    keyPoints: [
      'Arrays are ordered, zero-indexed objects designed for collections.',
      'Objects group values under string or symbol property keys.',
      'map and filter return new arrays; several other array methods mutate the original.',
      'Assigning an array or object shares its reference instead of cloning its contents.',
      'Object and array spread create shallow copies only.',
    ],
    commonMistakes: [
      {
        title: 'Reading past the end of an array',
        explanation:
          'The final normal index is array.length - 1. Reading array[array.length] returns undefined rather than the last item.',
      },
      {
        title: 'Mutating caller-owned data unexpectedly',
        explanation:
          'Methods such as sort, reverse, splice, push, and pop change the original array, which can surprise code that shares the same reference.',
      },
      {
        title: 'Expecting spread to deep-clone nested values',
        explanation:
          'Spread creates a new outer array or object, but nested objects remain shared unless they are copied separately.',
        code: 'const copy = { ...original }; // nested objects are still shared',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'When would you use an array instead of an object?',
        answer:
          'Use an array for an ordered collection you will index or iterate. Use an object when named properties describe one record or lookup.',
      },
      {
        level: 'Intermediate',
        question: 'What is the difference between map and forEach?',
        answer:
          'map returns a new array containing each callback result. forEach visits values for side effects and returns undefined.',
      },
      {
        level: 'Advanced',
        question: 'Why is an object spread copy called shallow?',
        answer:
          'It copies the outer object’s own enumerable properties, but nested object values are still references to the same nested objects.',
        deepDive:
          'A deep copy needs behavior appropriate to the supported value types. structuredClone handles many built-in structured values, but cloning is not a substitute for deliberate state ownership.',
      },
    ],
    relatedSlugs: ['data-types', 'loops', 'functions-and-scope', 'apis-and-fetch'],
    sources: [
      {
        label: 'MDN: Indexed collections',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections',
      },
      {
        label: 'MDN: Working with objects',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects',
      },
      {
        label: 'ECMAScript array objects',
        url: 'https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array-objects',
      },
    ],
    tags: ['javascript', 'arrays', 'objects', 'map', 'filter', 'references'],
  },
  {
    slug: 'dom',
    title: 'DOM',
    description:
      'Use the browser’s Document Object Model to find, create, and update page nodes while keeping document structure and security in mind.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Browser document APIs',
    difficulty: 'Beginner',
    estimatedReadTime: 13,
    prerequisites: ['HTML fundamentals', 'Arrays and Objects'],
    learningObjectives: [
      'Explain the relationship between HTML and the DOM.',
      'Select an element and update its text and classes safely.',
      'Recognize that the DOM is a browser API rather than core JavaScript.',
    ],
    definition:
      'The DOM (Document Object Model) is a browser-provided object model that represents a document as a tree of nodes. JavaScript can use this Web API to read and change the page.',
    explanation: {
      what: 'When a browser parses an HTML document, it exposes a Document containing node objects for elements, text, and other document parts. DOM interfaces provide methods such as querySelector and createElement plus properties such as textContent and classList.',
      why: 'A static document cannot by itself reflect every change that happens after loading. DOM operations let an application show validation messages, insert search results, change a status, or remove an item in response to new state.',
      how: [
        'The HTML parser builds a document tree, and the browser exposes that tree through DOM interfaces.',
        'Selection methods locate nodes; creation and mutation methods change node content, attributes, classes, or relationships.',
        'A DOM change can make the browser recalculate style, layout, paint, or compositing work before the next visible update.',
      ],
      where: [
        'Menus, dialogs, validation messages, notification banners, and dynamic lists.',
        'Framework internals and small scripts that progressively enhance server-rendered HTML.',
      ],
    },
    example: {
      title: 'Update an order status element',
      language: 'javascript',
      code: `const statusElement = document.querySelector("#order-status");

if (statusElement) {
  statusElement.textContent = "Order confirmed";
  statusElement.classList.add("success");
}`,
      explanation:
        'The script asks the document for one element. Because a selector may find nothing, it checks the result before changing visible text and adding a styling class.',
      walkthrough: [
        {
          code: 'document.querySelector("#order-status")',
          explanation: 'Uses the Document API to find the first node matching the CSS selector.',
        },
        {
          code: 'if (statusElement)',
          explanation:
            'Protects later code from trying to use null when no matching element exists.',
        },
        {
          code: 'statusElement.textContent = "Order confirmed";',
          explanation: 'Replaces the element’s text content without parsing the value as HTML.',
        },
        {
          code: 'statusElement.classList.add("success");',
          explanation: 'Adds a class that CSS can use to style the confirmed state.',
        },
      ],
      output: 'The #order-status element displays “Order confirmed” and has the success class.',
    },
    realWorldExample: {
      title: 'Show form validation feedback',
      description:
        'After a user submits a form, JavaScript can locate the invalid field, connect it to a readable error message, and move focus when that improves the experience.',
      steps: [
        'The script reads the current form control values.',
        'Validation finds the fields that need correction.',
        'DOM operations update error text and accessibility attributes beside those controls.',
      ],
    },
    visualFlow: [
      'Browser parses HTML',
      'Browser builds the document tree',
      'JavaScript selects a DOM node',
      'JavaScript changes text, attributes, classes, or children',
      'Browser updates the rendered page when needed',
    ],
    keyPoints: [
      'The DOM is a browser Web API, not part of the ECMAScript language.',
      'The document is represented as connected node objects.',
      'A selector can return null, so code must handle a missing match.',
      'textContent is appropriate when content should remain plain text.',
      'Frequent DOM reads and writes can trigger browser rendering work.',
    ],
    commonMistakes: [
      {
        title: 'Assuming a selector always finds an element',
        explanation:
          'querySelector returns null when nothing matches. Calling a method on that null value throws a TypeError.',
      },
      {
        title: 'Putting untrusted text into innerHTML',
        explanation:
          'innerHTML parses markup. Inserting untrusted content without correct sanitization can create cross-site scripting vulnerabilities; use textContent for plain text.',
      },
      {
        title: 'Using div elements for every interaction',
        explanation:
          'DOM scripting does not replace semantic HTML. Native buttons, links, labels, and controls already provide important behavior and accessibility.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is the DOM?',
        answer:
          'The DOM is the browser-provided object model that represents a document as nodes JavaScript and other code can inspect or change.',
      },
      {
        level: 'Intermediate',
        question: 'What is the difference between HTML and the DOM?',
        answer:
          'HTML is source markup. The DOM is the current in-memory document model produced and maintained by the browser, and scripts can change it after parsing.',
        deepDive:
          'The live DOM may differ from the original HTML because parsing can correct markup and scripts or user actions can add, remove, or modify nodes.',
      },
    ],
    relatedSlugs: ['arrays-and-objects', 'events'],
    sources: [
      {
        label: 'MDN: Document Object Model',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model',
      },
      { label: 'WHATWG DOM Standard', url: 'https://dom.spec.whatwg.org/' },
    ],
    tags: ['javascript', 'dom', 'document', 'nodes', 'web-api'],
  },
  {
    slug: 'events',
    title: 'Events',
    description:
      'Respond to user and browser activity with event listeners, understand propagation, and keep default actions separate from event flow.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'User interaction',
    difficulty: 'Beginner',
    estimatedReadTime: 15,
    prerequisites: ['DOM', 'Functions and Scope'],
    learningObjectives: [
      'Register an event listener with addEventListener.',
      'Use target and currentTarget correctly during event propagation.',
      'Distinguish preventDefault from stopPropagation.',
      'Apply event delegation only to events that support the required propagation.',
    ],
    definition:
      'An event is a host-provided object that reports that something happened, such as a click, form submission, network change, or media update. An event listener is a function registered to run when a matching event is delivered to an EventTarget.',
    explanation: {
      what: 'Browsers expose an event system through the DOM EventTarget and Event interfaces. Elements, Document, Window, and several other Web API objects can receive events. The event object describes details such as its type, original target, current listener target, and whether it can bubble or be canceled.',
      why: 'An interface must wait for actions whose timing is unknown. Listeners let code respond when the user submits a form, selects a product, presses a key, or when the browser reports a relevant state change.',
      how: [
        'addEventListener stores a listener for an event type on a target without running that listener immediately.',
        'When an event is dispatched through a DOM tree, it follows its defined path through capture and target phases; it also has a bubble phase only when that event’s bubbles flag is true.',
        'The listener receives the Event object. preventDefault asks the browser not to perform a cancelable default action, while stopPropagation affects further movement along the event path.',
      ],
      where: [
        'Buttons, forms, menus, keyboard controls, drag interactions, media players, and responsive application state.',
        'Event delegation on a stable parent when many current or future child controls use the same bubbling event.',
      ],
    },
    example: {
      title: 'Delegate product-button clicks',
      language: 'javascript',
      code: `const list = document.querySelector("#product-list");

list?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("[data-product]");
  if (!button || !list.contains(button)) return;

  console.log("Added " + button.getAttribute("data-product"));
});`,
      explanation:
        'One listener on the list handles clicks from matching descendant controls. This works because click events bubble; the guard confirms that the original target can be inspected as an Element.',
      walkthrough: [
        {
          code: 'list?.addEventListener("click", (event) => {',
          explanation: 'Registers one click listener if the list element exists.',
        },
        {
          code: 'event.target instanceof Element',
          explanation:
            'Checks that the original event target supports Element methods such as closest.',
        },
        {
          code: 'event.target.closest("[data-product]")',
          explanation:
            'Finds the clicked product control even when a nested icon or span was the exact target.',
        },
        {
          code: 'list.contains(button)',
          explanation: 'Confirms the matched control belongs to this delegated list.',
        },
      ],
      output: 'Clicking a control with data-product="Keyboard" logs: Added Keyboard',
    },
    realWorldExample: {
      title: 'Add a product to the cart',
      description:
        'A product grid can listen for click events, identify the selected product, update cart state, and announce the new item count to the user.',
      steps: [
        'The user activates an Add to Cart button.',
        'The browser dispatches a click event to the button and along its event path.',
        'A registered listener reads the product identifier and runs the cart update.',
        'Application code updates the visible cart count and feedback message.',
      ],
    },
    visualFlow: [
      'User activates a control',
      'Browser creates and dispatches an event',
      'Capture phase follows the event path toward the target',
      'Target listeners run',
      'Bubble phase runs only when the event bubbles',
      'Application handler updates state or the interface',
    ],
    keyPoints: [
      'Events and EventTarget are host Web APIs, not core ECMAScript features.',
      'addEventListener supports multiple listeners and listener options.',
      'event.target is the original target; event.currentTarget is the target whose listener is running.',
      'Not every event bubbles, and propagation behavior must be checked for the event being used.',
      'preventDefault does not stop propagation, and stopPropagation does not cancel a default action.',
    ],
    commonMistakes: [
      {
        title: 'Confusing default prevention with propagation',
        explanation:
          'preventDefault cancels a cancelable browser action such as navigation or form submission. It does not stop the event from reaching other listeners.',
        code: 'event.preventDefault(); // default action\nevent.stopPropagation(); // event path',
      },
      {
        title: 'Assuming every event bubbles',
        explanation:
          'Delegation depends on the event’s propagation rules. Check Event.bubbles or the event documentation instead of assuming a parent listener will receive it.',
      },
      {
        title: 'Losing the listener reference needed for cleanup',
        explanation:
          'removeEventListener needs the same listener and capture setting. Recreating an anonymous function does not identify the previously registered function.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What does addEventListener do?',
        answer:
          'It registers a function or listener object to be called when a specified event type is delivered to an EventTarget.',
      },
      {
        level: 'Intermediate',
        question: 'How do preventDefault and stopPropagation differ?',
        answer:
          'preventDefault cancels a cancelable default browser action. stopPropagation prevents the event from continuing along its propagation path.',
        deepDive:
          'Neither method automatically performs the other job. A passive listener cannot successfully call preventDefault, and a non-cancelable event has no default action that method can cancel.',
      },
      {
        level: 'Advanced',
        question: 'What is event delegation?',
        answer:
          'Event delegation uses a listener on a stable ancestor to handle qualifying events from descendants, usually by inspecting event.target as a bubbling event travels upward.',
        deepDive:
          'Delegation reduces per-child listeners and handles later descendants, but it requires correct target matching, boundary checks, and an event whose propagation supports the design.',
      },
    ],
    relatedSlugs: ['functions-and-scope', 'dom', 'async-javascript'],
    sources: [
      {
        label: 'MDN: addEventListener',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener',
      },
      {
        label: 'MDN: Event preventDefault',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault',
      },
      { label: 'WHATWG DOM event model', url: 'https://dom.spec.whatwg.org/#events' },
    ],
    tags: ['javascript', 'events', 'event-listeners', 'propagation', 'delegation', 'web-api'],
  },
  {
    slug: 'async-javascript',
    title: 'Async JavaScript',
    description:
      'Coordinate work that finishes later with promises and async functions while understanding jobs, microtasks, timers, and concurrency.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Asynchronous execution',
    difficulty: 'Intermediate',
    estimatedReadTime: 17,
    prerequisites: ['Functions and Scope', 'Events'],
    learningObjectives: [
      'Explain why asynchronous code does not automatically run in parallel.',
      'Describe pending, fulfilled, and rejected promise states.',
      'Predict the order of synchronous code, promise reactions, and timer callbacks.',
      'Use async and await without hiding error handling.',
    ],
    definition:
      'Asynchronous JavaScript coordinates operations whose results become available later without making the current code wait synchronously for those results. Promises represent eventual completion, and async/await provides syntax for consuming promise-based work.',
    explanation: {
      what: 'JavaScript executes one job at a time within an agent, while its host can manage timers, network operations, user input, and other work outside the current call stack. Completion callbacks and promise reactions are scheduled so JavaScript can process them later.',
      why: 'Network requests, timers, and user actions do not finish at a predictable instant. If the main thread waited synchronously, the interface could stop responding. Asynchronous APIs let the current work finish and arrange what should happen when a result arrives.',
      how: [
        'A Promise constructor calls its executor synchronously. Resolving or rejecting records an outcome, while handlers registered with then, catch, or finally run asynchronously as promise-reaction jobs.',
        'In a browser event loop, promise reactions use the microtask queue, which is drained after the current task finishes and before the browser takes the next task such as an eligible timer callback.',
        'setTimeout is a host Web API. Its delay is a minimum waiting period, not an exact execution time, because the callback still waits for an opportunity to run.',
        'An async function returns a promise. await pauses only that async function’s continuation until the awaited value settles; it does not block all JavaScript.',
      ],
      where: [
        'Data loading, saving forms, authentication flows, image processing, and delayed interface feedback.',
        'Coordinating several independent operations with promise combinators when their requirements allow concurrency.',
      ],
    },
    example: {
      title: 'Follow synchronous, microtask, and timer order',
      language: 'javascript',
      code: `console.log("start");

const result = new Promise((resolve) => {
  console.log("executor");
  resolve("promise");
});

result.then((value) => console.log(value));
setTimeout(() => console.log("timer"), 0);

console.log("end");`,
      explanation:
        'The Promise executor runs during construction, so executor appears before end. The then handler runs as a microtask after the current script. The zero-delay timer becomes an eligible task and runs later; zero does not mean immediately.',
      walkthrough: [
        {
          code: 'console.log("start");',
          explanation: 'Runs immediately as part of the current script task.',
        },
        {
          code: 'new Promise((resolve) => { ... })',
          explanation: 'Creates the promise and calls its executor synchronously.',
        },
        {
          code: 'result.then((value) => console.log(value));',
          explanation:
            'Registers a reaction that will run later as a microtask after the current stack is empty.',
        },
        {
          code: 'setTimeout(() => console.log("timer"), 0);',
          explanation: 'Asks the host timer API to queue a task no sooner than the allowed delay.',
        },
        {
          code: 'console.log("end");',
          explanation: 'Finishes synchronously before queued microtasks and later tasks run.',
        },
      ],
      output: 'start\nexecutor\nend\npromise\ntimer',
    },
    realWorldExample: {
      title: 'Coordinate checkout validation',
      description:
        'A checkout may need current inventory and a delivery quote before confirming an order, while the page remains responsive and shows progress.',
      steps: [
        'The application starts the independent requests and immediately shows a loading state.',
        'The browser performs network work while JavaScript can respond to other events.',
        'Promise reactions continue the checkout when results arrive or show a recoverable error.',
        'The application clears the loading state in a finally step.',
      ],
    },
    visualFlow: [
      'Current JavaScript task runs',
      'Host API starts work or a promise settles',
      'Continuation is queued as a microtask or task',
      'Current call stack becomes empty',
      'Queued microtasks run to completion',
      'Browser may render, then selects a later task',
    ],
    keyPoints: [
      'Asynchronous behavior does not automatically mean parallel execution.',
      'A Promise executor runs synchronously, but its then, catch, and finally reactions run asynchronously.',
      'Promise reactions are microtasks in the browser event-loop model.',
      'Timers are host APIs and their delay is a minimum rather than an exact schedule.',
      'await suspends an async function’s continuation rather than blocking the entire runtime.',
      'Independent work can be started together only when dependencies and resource limits allow it.',
    ],
    commonMistakes: [
      {
        title: 'Assuming async means parallel',
        explanation:
          'Async code allows other work to make progress while waiting, but JavaScript jobs still execute one at a time per agent. Workers are one way a browser can run JavaScript in parallel.',
      },
      {
        title: 'Treating a timer delay as an appointment',
        explanation:
          'A delay of zero or any other value only makes the timer eligible later. Busy work, throttling, nesting rules, and scheduling can make it run after that minimum.',
      },
      {
        title: 'Making a Promise executor async',
        explanation:
          'The Promise constructor already captures synchronous executor throws, but an async executor creates another promise whose later rejection is not automatically connected to the constructed promise.',
      },
      {
        title: 'Awaiting independent work one item at a time',
        explanation:
          'Sequential await is correct when each step depends on the previous one. When operations are genuinely independent, starting them together may reduce total waiting time.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What are the states of a Promise?',
        answer:
          'A promise starts pending and eventually settles as fulfilled with a value or rejected with a reason.',
      },
      {
        level: 'Intermediate',
        question: 'Does a Promise executor run asynchronously?',
        answer:
          'No. The Promise constructor calls its executor synchronously. Registered promise reactions run asynchronously after settlement.',
        deepDive:
          'In browsers, promise reactions are queued as microtasks. They run after the current task’s stack is empty and before the event loop takes the next task.',
      },
      {
        level: 'Advanced',
        question: 'How do concurrency and parallelism differ in JavaScript?',
        answer:
          'Concurrency means multiple operations can be in progress with their continuations interleaved. Parallelism means work executes at the same instant on separate processing resources.',
        deepDive:
          'Promise-based I/O is commonly concurrent while JavaScript callbacks execute one job at a time in an agent. Web Workers can provide separate agents for parallel JavaScript execution.',
      },
    ],
    relatedSlugs: ['functions-and-scope', 'events', 'apis-and-fetch'],
    sources: [
      {
        label: 'MDN: Promise constructor',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise',
      },
      {
        label: 'MDN: JavaScript execution model',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model',
      },
      {
        label: 'WHATWG HTML timers',
        url: 'https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers',
      },
    ],
    tags: ['javascript', 'async', 'promises', 'microtasks', 'timers', 'event-loop'],
  },
  {
    slug: 'apis-and-fetch',
    title: 'APIs and Fetch',
    description:
      'Request application data with the Fetch API, inspect HTTP responses correctly, parse bodies, handle failures, and understand the role of CORS.',
    category: 'javascript',
    categoryLabel: 'JavaScript',
    subcategory: 'Network APIs',
    difficulty: 'Intermediate',
    estimatedReadTime: 16,
    prerequisites: ['Async JavaScript', 'Arrays and Objects'],
    learningObjectives: [
      'Explain how an API contract connects a frontend to another system.',
      'Use fetch with async and await to read JSON data.',
      'Check response.ok before treating an HTTP response as success.',
      'Explain why CORS is a browser sharing policy rather than authentication.',
    ],
    definition:
      'An API (Application Programming Interface) defines how software can request a capability or exchange data. The Fetch API is a host Web API that starts an HTTP request and returns a promise for a Response object.',
    explanation: {
      what: 'Frontend applications often use HTTP APIs whose contract describes endpoints, methods, request data, response data, and errors. fetch is the browser interface for creating requests and receiving responses. Reading JSON from a Response is a separate asynchronous body-consumption step.',
      why: 'Most useful applications need information that is not embedded permanently in the page. APIs let a frontend load products, save an order, authenticate a session, or search data managed by a server.',
      how: [
        'fetch creates a Request from the URL and options, applies browser security and credential rules, and asks the host networking layer to perform it.',
        'The returned promise fulfills with a Response when response information is available; normal HTTP error statuses such as 404 or 500 do not by themselves reject that promise.',
        'Code checks response.ok or status, then consumes the body with a method such as json, text, blob, or arrayBuffer.',
        'For cross-origin requests, CORS response headers determine whether browser JavaScript may access the response. CORS does not identify a user or grant application permissions.',
      ],
      where: [
        'Product catalogs, search, dashboards, user profiles, checkout, and form submission.',
        'Uploading files, downloading documents, calling route handlers, and connecting to third-party services.',
      ],
    },
    example: {
      title: 'Load a profile safely',
      language: 'javascript',
      code: `async function loadProfile() {
  const response = await fetch("/api/profile");

  if (!response.ok) {
    throw new Error("Request failed: " + response.status);
  }

  const profile = await response.json();
  console.log(profile.name);
}

loadProfile().catch((error) => console.error(error.message));`,
      explanation:
        'The function waits for the Response, rejects the application operation for a non-success HTTP status, then parses the JSON body. The caller handles both thrown HTTP errors and rejected fetch operations.',
      walkthrough: [
        {
          code: 'await fetch("/api/profile")',
          explanation:
            'Calls the browser Fetch API and waits inside this async function for a Response.',
        },
        {
          code: 'if (!response.ok)',
          explanation: 'Checks whether the HTTP status is in the successful 200–299 range.',
        },
        {
          code: 'await response.json()',
          explanation: 'Reads the response body and parses its JSON text into a JavaScript value.',
        },
        {
          code: 'loadProfile().catch(...)',
          explanation:
            'Handles a rejection from network failure, body parsing, or the explicit HTTP status error.',
        },
      ],
      output: 'For a successful response body {"name":"Hussain"}, the console displays: Hussain',
    },
    realWorldExample: {
      title: 'Load a dashboard with recoverable states',
      description:
        'A dashboard can request account metrics and show clear loading, success, empty, and error states instead of leaving the previous screen or a spinner forever.',
      steps: [
        'The page enters a loading state and starts the request.',
        'It checks the HTTP result and parses data according to the documented API contract.',
        'Success updates the dashboard, an empty result explains that no data exists, and failure offers a useful retry action.',
        'A newer request can cancel or supersede an older request so stale data does not replace current results.',
      ],
    },
    visualFlow: [
      'Frontend constructs a request',
      'Browser applies security, credential, cache, and CORS rules',
      'Request travels to the server',
      'Server returns an HTTP response',
      'fetch fulfills with a Response or rejects for a request-level failure',
      'Application checks response.ok and consumes the body',
      'UI shows success, empty, or error state',
    ],
    keyPoints: [
      'fetch is a host Web API and returns a promise for a Response.',
      'A fulfilled fetch promise can still contain an HTTP error response.',
      'Check response.ok or status before treating the operation as successful.',
      'Response bodies are streams and body-reading methods are asynchronous.',
      'CORS controls cross-origin response sharing in browsers; it is not authentication or authorization.',
      'Never place a private server secret in browser JavaScript.',
    ],
    commonMistakes: [
      {
        title: 'Skipping the HTTP status check',
        explanation:
          'fetch normally fulfills for 404 and 500 responses. Without checking response.ok, code may try to use an error body as successful data.',
      },
      {
        title: 'Treating CORS as authentication',
        explanation:
          'CORS is a browser-enforced cross-origin sharing protocol. Servers still need real authentication and authorization for protected data and actions.',
      },
      {
        title: 'Embedding a private API secret in frontend code',
        explanation:
          'Code and build-time values delivered to a browser can be inspected by users. Secret credentials must stay in a trusted server environment.',
      },
      {
        title: 'Ignoring stale or canceled requests',
        explanation:
          'Rapid searches or route changes can make an older response irrelevant. AbortController or a request identity check can prevent stale UI updates.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What does fetch return?',
        answer:
          'fetch returns a promise that fulfills with a Response object when response information is available.',
      },
      {
        level: 'Intermediate',
        question: 'Why should code check response.ok?',
        answer:
          'fetch does not normally reject for HTTP error statuses. response.ok tells you whether the status is in the 200–299 success range.',
        deepDive:
          'The promise rejects for failures such as an invalid request URL, an aborted request, or a network-level failure. Application-specific status handling still belongs in your code.',
      },
      {
        level: 'Advanced',
        question: 'What problem does CORS solve?',
        answer:
          'CORS lets a server state which origins may read its responses through browser scripts, extending the browser’s same-origin security model in a controlled way.',
        deepDive:
          'Some cross-origin requests require a preflight. CORS response headers govern browser access to the response; they do not prove user identity or replace server authorization.',
      },
    ],
    relatedSlugs: ['arrays-and-objects', 'async-javascript'],
    sources: [
      {
        label: 'MDN: Using the Fetch API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
      },
      { label: 'WHATWG Fetch Standard', url: 'https://fetch.spec.whatwg.org/' },
      {
        label: 'MDN: Cross-Origin Resource Sharing',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS',
      },
    ],
    tags: ['javascript', 'apis', 'fetch', 'http', 'cors', 'web-api'],
  },
]);
