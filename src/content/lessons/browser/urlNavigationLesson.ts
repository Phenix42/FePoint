import { lessonSchema } from '@/schemas/contentSchemas';
import type { Lesson } from '@/types/content';

export const urlNavigationLesson: Lesson = lessonSchema.parse({
  id: 'lesson-browser-url-navigation',
  slug: 'what-happens-when-you-enter-a-url',
  category: 'browser',
  title: 'What happens when you enter a URL?',
  description:
    'Follow one navigation from typed address to interactive pixels, with a beginner mental model and deeper interview-ready detail.',
  difficulty: 'Beginner',
  estimatedMinutes: 18,
  objectives: [
    {
      id: 'url-parts',
      text: 'Recognise the important parts of a URL and what the browser does with them.',
    },
    {
      id: 'network-path',
      text: 'Explain DNS, connections, HTTP requests, and responses in the correct order.',
    },
    {
      id: 'render-path',
      text: 'Connect downloaded HTML, CSS, and JavaScript to DOM, CSSOM, layout, paint, and interactivity.',
    },
  ],
  prerequisites: [
    'You can use a browser and recognise a website address. No programming experience is required.',
  ],
  terminology: [
    { termId: 'url', label: 'URL' },
    { termId: 'dns', label: 'DNS' },
    { termId: 'ip-address', label: 'IP address' },
    { termId: 'http', label: 'HTTP' },
    { termId: 'server', label: 'server' },
    { termId: 'dom', label: 'DOM' },
    { termId: 'cssom', label: 'CSSOM' },
    { termId: 'rendering', label: 'rendering' },
  ],
  analogy:
    'Opening a web page resembles ordering from a distant restaurant: you identify the restaurant, travel over connected roads, place a precise order, receive several packages, and arrange everything before serving it.',
  whyItExists:
    'People need memorable names and interactive pages, while networks need precise addresses and agreed message formats. The navigation pipeline connects those two worlds.',
  problemItSolves:
    'Without a shared navigation process, browsers would not know where a site lives, how to request it securely, or how to turn returned files into usable pixels.',
  simpleExplanation:
    'The browser reads the address, finds the website computer, opens a protected connection, asks for a page, downloads its files, and follows the HTML and CSS instructions to draw the page. JavaScript then adds behaviour.',
  developerExplanation:
    'The browser parses the URL, checks policy and caches, resolves the host through DNS, negotiates a transport and often TLS, sends an HTTP request, processes the response, streams bytes into parsers, constructs DOM and CSSOM trees, creates a render tree, performs layout and paint, and runs scripts according to scheduling rules.',
  interviewExplanation:
    'Start by stating assumptions such as HTTPS and a cold or warm cache. Walk through URL parsing, DNS, connection reuse or negotiation, TLS, HTTP, caching and redirects, streaming, critical-resource discovery, DOM/CSSOM construction, JavaScript execution, layout, paint, compositing, and post-load hydration or event handling. Mention that many stages overlap.',
  advancedExplanation:
    'Modern browsers may use service workers, speculative preloading, partitioned caches, HTTP/2 multiplexing or HTTP/3 over QUIC, process isolation, incremental parsing, preload scanning, priority hints, GPU compositing, and framework hydration. A navigation is a coordinated pipeline rather than a strictly serial checklist.',
  sections: [
    {
      id: 'read-address',
      title: '1. Read and normalise the address',
      simpleExplanation:
        'The browser separates the address into useful parts and checks whether it already knows an answer.',
      detailedExplanation:
        'The scheme selects rules such as HTTPS, the hostname identifies a service, and the path and query identify a resource. Browser policy, history, service workers, and caches may affect the next action.',
    },
    {
      id: 'find-server',
      title: '2. Find the server',
      simpleExplanation: 'DNS changes the website name into a network address.',
      detailedExplanation:
        'The browser and operating system check caches before asking configured resolvers. DNS can return several records, and routing then carries packets toward a selected address.',
    },
    {
      id: 'connect',
      title: '3. Connect and request',
      simpleExplanation: 'The browser creates a connection and sends an HTTP request.',
      detailedExplanation:
        'The browser may reuse a connection or negotiate TCP plus TLS, or QUIC for HTTP/3. The request includes method, path, headers, cookies allowed by policy, and sometimes a body.',
    },
    {
      id: 'receive',
      title: '4. Receive the response',
      simpleExplanation: 'The server replies with a status, instructions, and page bytes.',
      detailedExplanation:
        'Status and response headers describe redirects, caching, content type, compression, and security policy. The body may stream progressively instead of waiting for the complete document.',
    },
    {
      id: 'build',
      title: '5. Build page models',
      simpleExplanation: 'HTML becomes the DOM and CSS becomes the CSSOM.',
      detailedExplanation:
        'Incremental parsers build object trees while a preload scanner discovers resources. Scripts can change parsing behaviour, so loading attributes and resource priority matter.',
    },
    {
      id: 'draw',
      title: '6. Draw and make interactive',
      simpleExplanation: 'The browser measures boxes, paints pixels, and attaches behaviour.',
      detailedExplanation:
        'Style calculation and the render tree lead to layout, paint, and compositing. JavaScript listeners or framework hydration make controls interactive; later changes may repeat parts of this pipeline.',
    },
  ],
  walkthrough: {
    language: 'javascript',
    title: 'Observe one request with fetch',
    lines: [
      {
        line: 1,
        code: "const response = await fetch('/api/profile');",
        explanation:
          'Ask the current site for the /api/profile resource and wait for response headers.',
      },
      {
        line: 2,
        code: 'if (!response.ok) throw new Error(`HTTP ${response.status}`);',
        explanation:
          'A completed request can still be an HTTP error, so check the response status.',
      },
      {
        line: 3,
        code: 'const profile = await response.json();',
        explanation: 'Read the response body and decode its JSON text into a JavaScript value.',
      },
      {
        line: 4,
        code: 'console.log(profile.name);',
        explanation: 'Use one property after the network and parsing work has completed.',
      },
    ],
    output: 'The console prints the returned profile name, or the code throws a useful HTTP error.',
  },
  commonMistakes: [
    'Saying the browser always performs every step from scratch; several layers cache and reuse work.',
    'Treating DNS, HTTP, and the internet as the same thing instead of related layers.',
    'Claiming the page waits for every file before any pixels can appear.',
  ],
  edgeCases: [
    'A service worker can answer without reaching the network.',
    'A redirect begins another request, possibly with different security and cache rules.',
    'Offline, expired certificates, DNS failure, or blocked mixed content can stop the pipeline.',
  ],
  bestPractices: [
    'Compress and cache static assets with content-based filenames.',
    'Keep the critical rendering path small and give images dimensions to avoid layout shifts.',
    'Use semantic HTML first so useful content exists before optional JavaScript enhancement.',
  ],
  performanceNotes: [
    'Connection reuse, caching, smaller critical resources, streaming, and fewer render-blocking dependencies often improve perceived loading speed.',
  ],
  exercises: [
    'Open browser developer tools, reload a page, and identify the document request, status, protocol, and response headers.',
    'Draw the navigation as six boxes, then explain each box without using unexplained jargon.',
    'Disable the cache in developer tools and compare the second load with a normal cached reload.',
  ],
  miniProject:
    'Build a small “request journey” visualiser that lets a learner step through URL, DNS, connection, request, response, and rendering stages.',
  revisionNotes: [
    'A URL identifies how and where to request a resource.',
    'DNS resolves a readable host name to network records.',
    'HTTPS combines HTTP with an authenticated encrypted connection.',
    'The response contains status, headers, and usually a body.',
    'HTML forms the DOM; CSS forms the CSSOM.',
    'Layout calculates geometry; paint records visuals; compositing assembles layers.',
    'Caches and service workers can skip or alter network work.',
  ],
  relatedLessonSlugs: ['dom-and-cssom', 'browser-rendering-process', 'cors'],
  updatedAt: '2026-08-04',
});
