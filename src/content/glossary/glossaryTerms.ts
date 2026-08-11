import { glossaryTermSchema, validateUniqueIds } from '@/schemas/contentSchemas';
import type { GlossaryTerm } from '@/types/content';

type GlossarySeed = Pick<
  GlossaryTerm,
  'term' | 'category' | 'simpleDefinition' | 'definition' | 'analogy'
>;

const seeds: GlossarySeed[] = [
  {
    term: 'Computer',
    category: 'Computer fundamentals',
    simpleDefinition:
      'A machine that follows tiny instructions to receive, remember, change, and show information.',
    definition:
      'A computer is an electronic machine that processes input according to stored instructions and produces output.',
    analogy:
      'It is like a very fast helper that follows a recipe exactly but cannot guess missing steps.',
  },
  {
    term: 'CPU',
    category: 'Computer fundamentals',
    simpleDefinition: 'The part of a computer that performs instructions one small step at a time.',
    definition:
      'The central processing unit executes program instructions, performs calculations, and coordinates other hardware.',
    analogy:
      'It is the cook in a kitchen, reading each recipe instruction and doing the requested work.',
  },
  {
    term: 'RAM',
    category: 'Computer fundamentals',
    simpleDefinition: 'Short-term working space that holds information while programs are running.',
    definition:
      'Random-access memory provides fast temporary storage for code and data currently used by the operating system and applications.',
    analogy: 'RAM is a school desk: a larger desk lets you keep more open books within easy reach.',
  },
  {
    term: 'Operating system',
    category: 'Computer fundamentals',
    simpleDefinition: 'The main program that helps applications use the computer safely.',
    definition:
      'An operating system manages hardware, files, memory, processes, permissions, and common services for applications.',
    analogy:
      'It is a school principal who schedules rooms and makes sure each class gets the resources it needs.',
  },
  {
    term: 'Process',
    category: 'Computer fundamentals',
    simpleDefinition: 'A program that is currently running.',
    definition:
      'A process is a running instance of a program with its own memory, resources, and execution state.',
    analogy: 'A recipe is a program; cooking one copy of that recipe is a process.',
  },
  {
    term: 'Internet',
    category: 'Internet',
    simpleDefinition: 'A worldwide network that lets connected computers exchange information.',
    definition:
      'The internet is a network of networks that moves packets between devices using agreed communication protocols.',
    analogy:
      'It is a global road system; information travels in small delivery vehicles called packets.',
  },
  {
    term: 'Web',
    category: 'Internet',
    simpleDefinition: 'A collection of linked pages and services that use the internet.',
    definition:
      'The World Wide Web is an information system of addressable resources commonly transferred with HTTP and viewed in browsers.',
    analogy:
      'The internet is the road system, while the web is one delivery service using those roads.',
  },
  {
    term: 'Client',
    category: 'Internet',
    simpleDefinition: 'A device or program that asks another program for information or work.',
    definition: 'A client initiates a request to a server and uses the returned data or service.',
    analogy: 'A customer ordering food is the client because the customer starts the request.',
  },
  {
    term: 'Server',
    category: 'Internet',
    simpleDefinition: 'A computer program that waits for requests and sends back useful responses.',
    definition:
      'A server listens for network requests, performs authorised work, and returns resources or structured data.',
    analogy:
      'A restaurant kitchen receives orders, prepares results, and sends them back to customers.',
  },
  {
    term: 'IP address',
    category: 'Internet',
    simpleDefinition: 'A number used to locate a device on a network.',
    definition:
      'An Internet Protocol address identifies a network interface so packets can be routed to and from it.',
    analogy: 'It works like a delivery address that helps a parcel reach the correct building.',
  },
  {
    term: 'DNS',
    category: 'Internet',
    simpleDefinition: 'A directory that turns easy website names into network addresses.',
    definition:
      'The Domain Name System resolves human-readable domain names to IP addresses and other records.',
    analogy:
      'It is the contacts app that turns a friend’s name into the phone number needed to call them.',
  },
  {
    term: 'URL',
    category: 'Internet',
    simpleDefinition: 'The complete address of one resource on the web.',
    definition:
      'A Uniform Resource Locator describes how and where to access a resource using a scheme, host, path, query, and optional fragment.',
    analogy:
      'It is a full postal address including the building, floor, room, and any delivery instructions.',
  },
  {
    term: 'HTTP',
    category: 'Internet',
    simpleDefinition: 'A set of rules browsers and servers use to exchange web messages.',
    definition:
      'Hypertext Transfer Protocol defines request and response messages for transferring representations of web resources.',
    analogy: 'It is an order form whose boxes and labels both the customer and kitchen understand.',
  },
  {
    term: 'HTTPS',
    category: 'Security',
    simpleDefinition: 'HTTP protected so outsiders cannot easily read or change the messages.',
    definition:
      'HTTPS carries HTTP through an authenticated, encrypted TLS connection to protect data in transit.',
    analogy: 'It is a locked delivery box that also proves which shop packed it.',
  },
  {
    term: 'API',
    category: 'Internet',
    simpleDefinition:
      'A documented way for one program to ask another program for data or actions.',
    definition:
      'An application programming interface defines operations, inputs, outputs, and errors that software can use without knowing internal implementation details.',
    analogy:
      'A restaurant menu lists what can be ordered without showing every step inside the kitchen.',
  },
  {
    term: 'Browser',
    category: 'Browser',
    simpleDefinition:
      'An application that retrieves web files and turns them into pages you can use.',
    definition:
      'A browser coordinates networking, security, parsing, layout, painting, JavaScript execution, storage, and user interaction.',
    analogy:
      'It is a translator and stage crew that turns scripts, costumes, and instructions into a live play.',
  },
  {
    term: 'Rendering',
    category: 'Browser',
    simpleDefinition: 'The work of turning page instructions into pixels on the screen.',
    definition:
      'Rendering converts document and style information through layout, paint, and compositing into a visual frame.',
    analogy:
      'It is like reading a building plan, measuring every room, painting surfaces, and assembling the final model.',
  },
  {
    term: 'DOM',
    category: 'Browser',
    simpleDefinition: 'A tree-shaped JavaScript view of the HTML elements on a page.',
    definition:
      'The Document Object Model represents parsed document nodes and exposes methods for reading, changing, and listening to them.',
    analogy:
      'It is a family tree where every page element has a place and relationships to other elements.',
  },
  {
    term: 'CSSOM',
    category: 'Browser',
    simpleDefinition: 'A tree-shaped model of the CSS rules that apply to a page.',
    definition:
      'The CSS Object Model represents parsed stylesheets and supplies style information used to calculate final element styles.',
    analogy: 'If the DOM lists the rooms, the CSSOM lists the decorating rules for those rooms.',
  },
  {
    term: 'Cache',
    category: 'Performance',
    simpleDefinition: 'A nearby copy saved so the same information can be used faster next time.',
    definition:
      'A cache stores reusable results or resources and serves them until freshness rules require validation or replacement.',
    analogy:
      'Keeping a frequently used book on your desk is faster than walking to the library every time.',
  },
  {
    term: 'HTML',
    category: 'HTML',
    simpleDefinition: 'A language that describes the meaning and structure of web content.',
    definition:
      'HyperText Markup Language uses elements and attributes to create a semantic document tree.',
    analogy:
      'It is the labelled skeleton of a page, identifying headings, paragraphs, buttons, and other parts.',
  },
  {
    term: 'Element',
    category: 'HTML',
    simpleDefinition: 'One meaningful piece of an HTML page.',
    definition:
      'An HTML element is a document node represented by a tag, its attributes, and usually its content.',
    analogy: 'A page is a box of building blocks, and each labelled block is an element.',
  },
  {
    term: 'Attribute',
    category: 'HTML',
    simpleDefinition: 'Extra information placed on an HTML element.',
    definition:
      'An attribute configures an element or supplies metadata such as an identifier, link destination, image description, or form value.',
    analogy: 'It is a name sticker attached to a school bag that adds information about the bag.',
  },
  {
    term: 'Semantic HTML',
    category: 'HTML',
    simpleDefinition: 'Choosing HTML elements because their meaning matches the content.',
    definition:
      'Semantic HTML communicates document structure and purpose to browsers, assistive technology, search engines, and developers.',
    analogy: 'Labelled drawers are easier to understand than identical boxes with no names.',
  },
  {
    term: 'ARIA',
    category: 'Accessibility',
    simpleDefinition:
      'Extra accessibility information used when normal HTML cannot express a custom control.',
    definition:
      'Accessible Rich Internet Applications attributes add roles, states, and relationships to accessibility APIs when native semantics are insufficient.',
    analogy:
      'ARIA is an audio label added to a custom object whose purpose is not already obvious.',
  },
  {
    term: 'CSS',
    category: 'CSS',
    simpleDefinition: 'A language that controls how web content looks and is arranged.',
    definition:
      'Cascading Style Sheets select document elements and apply visual, layout, responsive, and animation rules.',
    analogy:
      'HTML builds the house; CSS chooses the paint, spacing, furniture arrangement, and responsive floor plan.',
  },
  {
    term: 'Cascade',
    category: 'CSS',
    simpleDefinition:
      'The rule system CSS uses when more than one style wants to control the same thing.',
    definition:
      'The cascade orders declarations by origin, importance, layer, specificity, scoping proximity, and source order.',
    analogy:
      'It is a tie-breaking rulebook that decides which instruction wins when teachers give different directions.',
  },
  {
    term: 'Box model',
    category: 'CSS',
    simpleDefinition: 'The layers of content, padding, border, and margin around every CSS box.',
    definition:
      'The CSS box model defines how an element’s content size combines with padding, borders, and margins to occupy space.',
    analogy:
      'A framed picture has the photo, empty mat space, a frame, and space separating it from other pictures.',
  },
  {
    term: 'Flexbox',
    category: 'CSS',
    simpleDefinition: 'A CSS layout tool for arranging items mainly in one row or one column.',
    definition:
      'Flexible Box Layout distributes space and aligns items along a main axis and a cross axis.',
    analogy:
      'Books on one shelf can spread out, squeeze, wrap, and align according to simple shelf rules.',
  },
  {
    term: 'CSS Grid',
    category: 'CSS',
    simpleDefinition: 'A CSS layout tool for arranging content in rows and columns together.',
    definition:
      'CSS Grid defines two-dimensional tracks, placement rules, and alignment for complex responsive layouts.',
    analogy: 'It is graph paper where content can occupy named rows, columns, or larger areas.',
  },
  {
    term: 'JavaScript',
    category: 'JavaScript',
    simpleDefinition:
      'A programming language that lets web pages make decisions and respond to people.',
    definition:
      'JavaScript is a dynamic programming language executed by browser and server runtimes to implement application behaviour.',
    analogy:
      'HTML builds a toy and CSS paints it; JavaScript adds the batteries and instructions that make it react.',
  },
  {
    term: 'Variable',
    category: 'JavaScript',
    simpleDefinition: 'A named place that refers to a value.',
    definition:
      'A variable is a binding between an identifier and a value that code can read and sometimes reassign.',
    analogy:
      'It is a labelled storage box whose contents can be checked and, when allowed, replaced.',
  },
  {
    term: 'Function',
    category: 'JavaScript',
    simpleDefinition:
      'A reusable group of instructions that can receive values and return a result.',
    definition:
      'A function packages executable statements behind a callable value with parameters, local scope, and an optional return value.',
    analogy: 'It is a juice machine: give it fruit, let it perform known steps, and receive juice.',
  },
  {
    term: 'Scope',
    category: 'JavaScript',
    simpleDefinition: 'The area of code where a name can be seen and used.',
    definition:
      'Scope is the set of rules that determines which identifiers are accessible at a particular location in a program.',
    analogy: 'A classroom rule may apply inside that room but not throughout the entire school.',
  },
  {
    term: 'Closure',
    category: 'JavaScript',
    simpleDefinition: 'A function that remembers the surrounding values from where it was created.',
    definition:
      'A closure combines a function with continued access to its lexical environment after the outer execution has finished.',
    analogy: 'It is a backpack a function carries, containing the local values it may need later.',
  },
  {
    term: 'Runtime',
    category: 'JavaScript',
    simpleDefinition:
      'The environment that actually runs a program and provides useful tools around it.',
    definition:
      'A runtime executes language instructions and supplies host capabilities such as timers, networking, files, or browser APIs.',
    analogy:
      'A written play is code; the theatre, actors, lights, and stage together form its runtime.',
  },
  {
    term: 'Call stack',
    category: 'JavaScript',
    simpleDefinition: 'A stack that remembers which function is running and where to return next.',
    definition:
      'The call stack stores active execution frames in last-in, first-out order as functions call and return.',
    analogy:
      'It is a stack of unfinished homework sheets; you finish the top sheet before returning to the one below.',
  },
  {
    term: 'Event loop',
    category: 'JavaScript',
    simpleDefinition:
      'The coordinator that lets JavaScript handle later work after current work finishes.',
    definition:
      'The event loop schedules tasks, drains microtasks after stack completion, and coordinates browser rendering opportunities.',
    analogy:
      'A teacher finishes the current question, checks the urgent note tray, then calls the next student in line.',
  },
  {
    term: 'Promise',
    category: 'JavaScript',
    simpleDefinition: 'An object representing a result that may arrive later or fail.',
    definition:
      'A Promise tracks an asynchronous operation through pending, fulfilled, or rejected states and schedules reaction callbacks.',
    analogy:
      'It is a claim ticket for food: later you receive either the meal or news that the order failed.',
  },
  {
    term: 'Asynchronous',
    category: 'JavaScript',
    simpleDefinition: 'Work that can finish later without freezing every other activity.',
    definition:
      'Asynchronous programming starts an operation and handles its eventual completion without blocking the current execution flow.',
    analogy:
      'You can start laundry, do homework while it runs, and return when the machine signals completion.',
  },
  {
    term: 'TypeScript',
    category: 'TypeScript',
    simpleDefinition:
      'JavaScript with a checker that catches many value-shape mistakes before running.',
    definition:
      'TypeScript extends JavaScript with a static type system and compiles to ordinary JavaScript.',
    analogy:
      'It is a spelling and safety checker for code that warns before the instructions are used.',
  },
  {
    term: 'Component',
    category: 'React',
    simpleDefinition: 'A reusable piece of a user interface with its own job.',
    definition:
      'A component is an independently understandable UI unit that receives inputs and describes rendered output.',
    analogy:
      'A toy set has reusable wheels, doors, and windows that combine into many different models.',
  },
  {
    term: 'Props',
    category: 'React',
    simpleDefinition: 'Information a parent gives to a component.',
    definition:
      'Props are read-only inputs passed into a React component to configure the interface it describes.',
    analogy:
      'They are an order slip telling a reusable sandwich component which fillings to display.',
  },
  {
    term: 'State',
    category: 'React',
    simpleDefinition: 'Information a user interface remembers that can change over time.',
    definition:
      'State is data owned by an interface boundary whose changes can trigger a new render.',
    analogy: 'A light switch remembers whether it is currently on or off.',
  },
  {
    term: 'React render',
    category: 'React',
    simpleDefinition: 'React asking components what the interface should look like now.',
    definition:
      'During rendering React calls components to calculate a new element tree from the current props and state.',
    analogy:
      'It is redrawing a plan after someone changes one requirement, before the builders update the room.',
  },
  {
    term: 'Reconciliation',
    category: 'React',
    simpleDefinition:
      'React comparing old and new interface descriptions to find necessary changes.',
    definition:
      'Reconciliation matches element identity and computes which host updates are required between renders.',
    analogy: 'It is comparing two shopping lists and buying only the items that changed.',
  },
  {
    term: 'Algorithm',
    category: 'DSA',
    simpleDefinition: 'A clear sequence of steps for solving a problem.',
    definition:
      'An algorithm is a finite procedure that transforms input into output with defined behaviour.',
    analogy:
      'A recipe is an algorithm because it gives ordered steps that turn ingredients into a meal.',
  },
  {
    term: 'Data structure',
    category: 'DSA',
    simpleDefinition: 'A chosen way to organise information so certain jobs are easier.',
    definition:
      'A data structure arranges values and defines operations with particular performance characteristics.',
    analogy:
      'A pencil case, bookshelf, and filing cabinet organise objects differently because they support different jobs.',
  },
  {
    term: 'Time complexity',
    category: 'DSA',
    simpleDefinition: 'A way to describe how quickly work grows when the input grows.',
    definition:
      'Time complexity expresses the growth rate of algorithmic operations relative to input size, commonly with Big O notation.',
    analogy:
      'It asks whether doubling homework roughly doubles the work or makes it four times larger.',
  },
  {
    term: 'Recursion',
    category: 'DSA',
    simpleDefinition: 'A solution where a function solves a smaller version of the same problem.',
    definition:
      'Recursion occurs when a function calls itself toward a base case that stops further calls.',
    analogy: 'Opening nested gift boxes repeats the same action until the smallest box is reached.',
  },
  {
    term: 'Scalability',
    category: 'System design',
    simpleDefinition: 'A system’s ability to keep working as users and data grow.',
    definition:
      'Scalability is the capacity to handle increasing load by adding or improving resources without unacceptable degradation.',
    analogy: 'A shop scales when it can add checkout counters as more customers arrive.',
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const glossaryTerms: GlossaryTerm[] = validateUniqueIds(
  seeds.map((seed, index) => {
    const previous = seeds[(index - 1 + seeds.length) % seeds.length];
    const next = seeds[(index + 1) % seeds.length];
    return glossaryTermSchema.parse({
      ...seed,
      id: 'glossary-' + String(index + 1).padStart(3, '0'),
      slug: slugify(seed.term),
      relatedTerms: [previous?.term, next?.term].filter(
        (term): term is string => term !== undefined,
      ),
    });
  }),
  'glossary term',
);

export const getGlossaryTerm = (value: string) => {
  const normalised = value.trim().toLowerCase();
  return glossaryTerms.find(
    (item) =>
      item.id === value || item.slug === normalised || item.term.toLowerCase() === normalised,
  );
};
