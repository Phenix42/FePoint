import { defineTutorials } from '@/content/tutorials/tutorialDraft';

export const foundationTutorials = defineTutorials([
  {
    slug: 'what-is-the-web',
    title: 'What is the Web?',
    description:
      'Understand what the World Wide Web is, how it differs from the Internet, and how links connect resources together.',
    category: 'web-fundamentals',
    categoryLabel: 'Web Fundamentals',
    subcategory: 'Web foundations',
    difficulty: 'Beginner',
    estimatedReadTime: 8,
    prerequisites: ['Comfort using a web browser to visit a website'],
    learningObjectives: [
      'Explain the difference between the Web and the Internet',
      'Describe webpages, websites, resources, URLs, and hyperlinks',
      'Outline how a browser requests a resource from a web server',
      'Recognize HTML, HTTP, and URLs as separate parts of the Web',
    ],
    definition:
      'The World Wide Web is a system of linked pages and other resources that people access over the Internet, usually with a web browser. The Internet is the network infrastructure underneath it, while the Web uses technologies such as URLs, HTTP, and HTML.',
    explanation: {
      what: 'The Web is the collection of resources you can open and connect through links. A resource can be an HTML page, an image, a video, a stylesheet, a data file, or something else. Each published resource has an address called a URL (Uniform Resource Locator), and hyperlinks let people move from one resource to another.',
      why: 'Frontend code does not run in isolation. It becomes part of a web resource that a browser locates, requests, and displays. Understanding this larger system makes later topics such as HTML links, API requests, loading errors, and deployment much easier to reason about.',
      how: [
        'A person gives a browser a URL, often by entering it or following a link.',
        'The browser works out where the resource is available. This can involve cached information and DNS, which helps resolve a domain name.',
        'The browser sends an HTTP request to a web server through the Internet.',
        'The server sends an HTTP response. The response may contain the resource, a redirect, or an error status.',
        'If the response contains a webpage, the browser processes its HTML and related resources and presents the result to the person.',
      ],
      where: [
        'News sites whose stories are connected by hyperlinks',
        'Online stores with pages for products, carts, and checkout',
        'Web applications such as email, maps, and project dashboards',
        'Documentation sites that connect guides and reference pages',
      ],
    },
    example: {
      title: 'Create a hyperlink to another web resource',
      language: 'html',
      code: `<p>
  Learn more from
  <a href="https://developer.mozilla.org/">MDN Web Docs</a>.
</p>`,
      explanation:
        'This HTML creates a paragraph containing a hyperlink. The browser shows the link text to the user and uses the URL in the href attribute when the link is activated.',
      walkthrough: [
        {
          code: '<p>...</p>',
          explanation: 'The p element marks the content as a paragraph.',
        },
        {
          code: '<a href="https://developer.mozilla.org/">',
          explanation:
            'The a element creates a hyperlink. Its href attribute contains the destination URL.',
        },
        {
          code: 'MDN Web Docs',
          explanation: 'This is the visible, descriptive text that the user activates.',
        },
      ],
      output:
        'The page displays “Learn more from MDN Web Docs.” The words “MDN Web Docs” are a link, and activating them asks the browser to navigate to that URL.',
    },
    realWorldExample: {
      title: 'Opening a news story',
      description:
        'A news homepage is a familiar example of the Web connecting resources. Each headline can point to a different story URL.',
      steps: [
        'The homepage displays a headline as a hyperlink.',
        'The reader activates the headline.',
        'The browser requests the story URL from a server.',
        'The server responds, and the browser presents the story page.',
      ],
    },
    visualFlow: [
      'Person opens a URL or follows a link',
      'Browser locates the server',
      'Browser sends an HTTP request over the Internet',
      'Server sends an HTTP response',
      'Browser presents the requested resource',
    ],
    keyPoints: [
      'The Internet and the Web are related, but they are not the same thing.',
      'The Internet connects computers; the Web is a system built on that network.',
      'A URL identifies where a resource can be found.',
      'HTTP defines messages used to request and respond with web resources.',
      'Hyperlinks connect resources and make navigation across the Web possible.',
    ],
    commonMistakes: [
      {
        title: 'Using “Internet” and “Web” as identical terms',
        explanation:
          'The Internet is the underlying network. The Web is one service that uses it; email and online games can also use the Internet without being webpages.',
      },
      {
        title: 'Confusing a browser with a search engine',
        explanation:
          'A browser is software that retrieves and displays web resources. A search engine is a website or service used inside a browser to discover resources.',
      },
      {
        title: 'Thinking every URL represents a complete webpage',
        explanation:
          'A URL can identify many kinds of resources, including images, stylesheets, scripts, documents, and API data.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is the World Wide Web?',
        answer:
          'The Web is a system of linked pages and resources that are identified by URLs and accessed over a network, usually with a browser using HTTP.',
      },
      {
        level: 'Basic',
        question: 'What is a hyperlink?',
        answer:
          'A hyperlink is an element that points to another URL and lets a user navigate to that resource.',
      },
      {
        level: 'Intermediate',
        question: 'How is the Web different from the Internet?',
        answer:
          'The Internet is the global network infrastructure that connects devices. The Web is a system of linked resources and standards that operates on top of that network.',
        deepDive:
          'Other services, such as email, also use Internet infrastructure. This is why “Internet” and “Web” are not interchangeable technical terms.',
      },
      {
        level: 'Intermediate',
        question: 'What different jobs do a URL, HTTP, and HTML perform?',
        answer:
          'A URL identifies a resource, HTTP defines how clients and servers exchange request and response messages, and HTML describes the content and structure of a webpage.',
      },
    ],
    relatedSlugs: ['how-websites-work', 'browser-client-server', 'html-fundamentals'],
    sources: [
      {
        label: 'MDN: The web standards model',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/The_web_standards_model',
      },
      {
        label: 'MDN: How does the Internet work?',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work',
      },
      {
        label: 'MDN: What is a URL?',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL',
      },
    ],
    tags: ['web', 'internet', 'url', 'http', 'hyperlink', 'beginner'],
  },
  {
    slug: 'how-websites-work',
    title: 'How Websites Work',
    description:
      'Follow a website from its files and server response to the page assembled and displayed by a browser.',
    category: 'web-fundamentals',
    categoryLabel: 'Web Fundamentals',
    subcategory: 'Web foundations',
    difficulty: 'Beginner',
    estimatedReadTime: 11,
    prerequisites: ['What is the Web?'],
    learningObjectives: [
      'Describe a website as a collection of pages and related resources',
      'Explain the roles of HTML, CSS, and JavaScript at a high level',
      'Trace a simplified page load from URL to rendered pixels',
      'Understand that a page usually requires multiple resource requests',
    ],
    definition:
      'A website is a collection of related webpages and resources that share a domain and are made available by one or more web servers. A browser requests those resources, processes them, and builds the page a user sees and interacts with.',
    explanation: {
      what: 'A webpage is usually an HTML document plus resources such as CSS, JavaScript, images, and fonts. A website groups related pages and resources under a common identity, often a domain name. Some responses contain stored files, while others are generated by server code using current data.',
      why: 'Frontend developers work on files that depend on one another. Knowing how those resources are discovered and loaded helps explain missing styles, broken images, scripts that run too early, slow pages, and network errors.',
      how: [
        'The browser parses the URL and may use caches, redirects, or a service worker before going to the network.',
        'When needed, DNS helps resolve the domain, and the browser establishes an appropriate network connection. HTTPS also protects the exchange with TLS.',
        'The browser sends an HTTP request and receives a response, commonly starting with an HTML document.',
        'As HTML is parsed, the browser builds the DOM and discovers referenced resources such as stylesheets, scripts, images, and fonts.',
        'CSS is processed to work out styles. JavaScript may change the document or respond to later user actions.',
        'The browser calculates layout, paints visual content, and may composite layers. Loading, parsing, and rendering can overlap rather than forming one rigid sequence.',
      ],
      where: [
        'Static portfolio sites served mostly as stored files',
        'Stores whose product pages are generated from database data',
        'Dashboards that load an initial page and then request updated data',
        'Content sites that load images, fonts, analytics, and advertisements from several servers',
      ],
    },
    example: {
      title: 'See the resources referenced by one HTML page',
      language: 'html',
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Neighborhood Bakery</title>
    <link rel="stylesheet" href="styles.css">
    <script src="app.js" defer></script>
  </head>
  <body>
    <h1>Fresh bread today</h1>
    <img src="bread.jpg" alt="Two fresh loaves of bread">
  </body>
</html>`,
      explanation:
        'This document gives the browser the page structure and references three additional resources. The files may come from a local development server, the website server, a cache, or another permitted origin.',
      walkthrough: [
        {
          code: '<link rel="stylesheet" href="styles.css">',
          explanation:
            'The link element tells the browser to obtain a CSS stylesheet named styles.css.',
        },
        {
          code: '<script src="app.js" defer></script>',
          explanation:
            'The script element references JavaScript. defer lets a classic external script download while parsing continues and runs it after the document has been parsed.',
        },
        {
          code: '<img src="bread.jpg" alt="Two fresh loaves of bread">',
          explanation:
            'The img element causes the image resource to be requested. The alt text describes the meaningful image when it cannot be seen.',
        },
        {
          code: '<h1>Fresh bread today</h1>',
          explanation: 'The h1 element provides the main heading in the HTML structure.',
        },
      ],
      output:
        'The browser displays a bakery page with a heading and image. styles.css can change its appearance, and app.js can add behavior after the HTML has been parsed.',
    },
    realWorldExample: {
      title: 'Loading an online product page',
      description:
        'A product page is assembled from several resources and may continue changing after its first render.',
      steps: [
        'The server responds with HTML for the product page.',
        'The browser discovers and requests CSS, JavaScript, product images, and fonts.',
        'The browser can begin presenting useful content before every non-critical resource finishes.',
        'JavaScript may later request current price or stock data and update the DOM.',
        'A failed image request can show a broken image while the rest of the page still works.',
      ],
    },
    visualFlow: [
      'URL navigation',
      'HTTP request and response',
      'HTML bytes are parsed into the DOM',
      'Referenced CSS, JavaScript, images, and fonts are requested',
      'Styles are calculated and layout is determined',
      'Content is painted and composited on screen',
    ],
    keyPoints: [
      'A website normally contains multiple pages and supporting resources.',
      'HTML provides content and structure, CSS controls presentation and layout, and JavaScript adds programmable behavior.',
      'Loading one page usually creates several HTTP requests.',
      'The browser parses HTML incrementally and can discover more resources while it works.',
      'Browser loading and rendering are optimized processes, not one universal rigid sequence.',
    ],
    commonMistakes: [
      {
        title: 'Thinking the complete website arrives in one response',
        explanation:
          'The initial HTML commonly references separate stylesheets, scripts, images, fonts, and data. Each can require its own request unless a usable cached response or another mechanism supplies it.',
      },
      {
        title: 'Assuming the browser waits for every resource before showing anything',
        explanation:
          'Browsers parse and render incrementally. Some resources can block particular work, but non-critical resources may finish after useful content is already visible.',
      },
      {
        title: 'Treating HTML, CSS, and JavaScript as interchangeable',
        explanation:
          'They cooperate but have different responsibilities: HTML describes structure, CSS applies presentation, and JavaScript supplies programming logic.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What files commonly make up a webpage?',
        answer:
          'A webpage commonly uses an HTML document together with CSS, JavaScript, images, fonts, and other media or data resources.',
      },
      {
        level: 'Basic',
        question: 'What are the main roles of HTML, CSS, and JavaScript?',
        answer:
          'HTML describes content and structure, CSS controls presentation and layout, and JavaScript adds programmable behavior and interactivity.',
      },
      {
        level: 'Intermediate',
        question: 'Why can opening one webpage create many network requests?',
        answer:
          'The initial HTML can reference separate stylesheets, scripts, images, fonts, and data. The browser requests the resources it needs unless they are already available through a cache or another mechanism.',
      },
      {
        level: 'Intermediate',
        question: 'Does browser rendering always wait until every page resource has downloaded?',
        answer:
          'No. Browsers load, parse, and render incrementally. Certain resources can delay parsing or rendering, but other resources may complete after initial content is visible.',
        deepDive:
          'The exact work varies by browser and document. A useful high-level pipeline is DOM and style processing, followed by layout, paint, and sometimes compositing, but these activities can overlap and repeat.',
      },
      {
        level: 'Advanced',
        question: 'Why is the browser rendering pipeline described as a simplified model?',
        answer:
          'Browser engines optimize and overlap loading, parsing, style calculation, layout, paint, and compositing. The high-level model explains observable responsibilities without claiming one fixed implementation.',
      },
    ],
    relatedSlugs: ['what-is-the-web', 'browser-client-server', 'html-fundamentals'],
    sources: [
      {
        label: 'MDN: How the web works',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works',
      },
      {
        label: 'MDN: How browsers load websites',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_browsers_load_websites',
      },
      {
        label: 'MDN: Overview of HTTP',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview',
      },
      {
        label: 'web.dev: Rendering performance',
        url: 'https://web.dev/articles/rendering-performance',
      },
      {
        label: 'HTML Standard: The script element',
        url: 'https://html.spec.whatwg.org/multipage/scripting.html#the-script-element',
      },
    ],
    tags: ['website', 'browser', 'rendering', 'html', 'css', 'javascript', 'http'],
  },
  {
    slug: 'browser-client-server',
    title: 'Browsers, Clients, and Servers',
    description:
      'Learn who sends a web request, who answers it, and where browser and server responsibilities begin and end.',
    category: 'web-fundamentals',
    categoryLabel: 'Web Fundamentals',
    subcategory: 'Web foundations',
    difficulty: 'Beginner',
    estimatedReadTime: 9,
    prerequisites: ['What is the Web?', 'How Websites Work'],
    learningObjectives: [
      'Define browser, client, and server in a web context',
      'Distinguish a browser from a search engine',
      'Explain the HTTP request and response relationship',
      'Identify typical client-side and server-side responsibilities',
    ],
    definition:
      'A client is software that requests a resource or service, and a server is software that receives requests and sends responses. In everyday web use, the browser acts as an HTTP client, while a web server makes pages, files, or data available.',
    explanation: {
      what: 'A browser is a user agent: it lets a person navigate the Web, sends requests, processes responses, runs permitted frontend code, and presents content. “Client” and “server” describe roles in a communication, not necessarily two special kinds of physical machine. During development, client and server software can even run on the same computer.',
      why: 'Frontend developers need to know which work belongs in the browser and which work requires a server. The difference affects security, data storage, authentication, validation, performance, and the kinds of errors a user can experience.',
      how: [
        'The client creates a request that identifies a resource and the intended action.',
        'The request travels to a server directly or through intermediaries such as caches and proxies.',
        'The server reads the request, performs allowed work, and creates a response.',
        'The response includes a status, headers, and sometimes a body containing HTML, JSON, an image, or other data.',
        'The browser interprets the response according to web standards and the security rules of the browser.',
      ],
      where: [
        'A browser requests the HTML for a landing page',
        'A search form sends a query and receives matching results',
        'A dashboard client requests current account data from an API server',
        'A checkout server validates price and stock instead of trusting values from the browser',
      ],
    },
    example: {
      title: 'Let a browser submit a search request',
      language: 'html',
      code: `<form action="/search" method="get">
  <label for="product-search">Search products</label>
  <input id="product-search" name="q" type="search" />
  <button type="submit">Search</button>
</form>`,
      explanation:
        'You do not need to memorize this HTML yet. Focus on the communication: after a user enters a term and submits the form, the browser acts as the client and creates a request for the server.',
      walkthrough: [
        {
          code: 'action="/search"',
          explanation: 'The action gives the relative URL that should receive the form submission.',
        },
        {
          code: 'method="get"',
          explanation:
            'The GET method asks for a representation of search results. The form data is encoded into the request URL.',
        },
        {
          code: 'name="q"',
          explanation:
            'The name becomes the key for the entered value. If the user enters “shoes”, the query can become ?q=shoes.',
        },
        {
          code: '<button type="submit">Search</button>',
          explanation: 'Activating this button submits the form through the browser.',
        },
      ],
      output:
        'If the user enters “shoes”, the browser can navigate to /search?q=shoes. The server decides how to handle that request and returns an HTTP response, such as a page of matching products.',
    },
    realWorldExample: {
      title: 'Signing in to an application',
      description:
        'A sign-in screen demonstrates why client and server responsibilities must be separated.',
      steps: [
        'The browser displays the form and collects the user input.',
        'The client sends the credentials through a protected HTTPS request.',
        'The server checks the credentials against trusted server-side data.',
        'The server returns a success or failure response.',
        'The browser updates the interface, but it does not make the final authentication decision.',
      ],
    },
    visualFlow: [
      'User action in browser',
      'Browser client creates request',
      'Web server receives and processes request',
      'Web server creates response',
      'Browser client processes response',
      'User sees the result',
    ],
    keyPoints: [
      'A browser is a common type of web client.',
      'A web server is software that understands web requests and returns responses.',
      'Client and server describe roles; they can run on the same machine during development.',
      'A search engine is a service used through a browser, not the browser itself.',
      'Sensitive authorization decisions must be enforced by a trusted server, not only by browser code.',
    ],
    commonMistakes: [
      {
        title: 'Calling a search engine a browser',
        explanation:
          'Chrome, Firefox, Safari, and Edge are browsers. A search engine such as Google Search is a web service that a browser can open.',
      },
      {
        title: 'Thinking a server is the same thing as a database',
        explanation:
          'A server may communicate with a database, but the roles are different. Server software handles requests and responses; a database stores and retrieves structured data.',
      },
      {
        title: 'Trusting a value because it came from the browser',
        explanation:
          'Users can inspect or change client-side requests. A server must independently validate important data and enforce permissions.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is a client in web development?',
        answer:
          'A client is software that requests a resource or service. A web browser commonly acts as an HTTP client.',
      },
      {
        level: 'Basic',
        question: 'What does a web server do?',
        answer:
          'A web server receives HTTP requests and sends HTTP responses containing a status and, when appropriate, a resource or data.',
      },
      {
        level: 'Intermediate',
        question: 'Can client and server software run on the same computer?',
        answer:
          'Yes. Client and server describe communication roles, not physical distance. A developer often runs a browser and a local development server on one computer.',
      },
      {
        level: 'Intermediate',
        question: 'Why must a server validate important data sent by a browser?',
        answer:
          'Browser requests can be inspected and modified by users. The trusted server must enforce validation, authentication, and authorization instead of relying only on client-side checks.',
      },
    ],
    relatedSlugs: ['what-is-the-web', 'how-websites-work', 'html-fundamentals'],
    sources: [
      {
        label: 'MDN: Browsing the web',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Browsing_the_web',
      },
      {
        label: 'MDN: What is a web server?',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server',
      },
      {
        label: 'MDN: Overview of HTTP',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview',
      },
      {
        label: 'MDN: Client-server overview',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview',
      },
    ],
    tags: ['browser', 'client', 'server', 'request', 'response', 'http'],
  },
  {
    slug: 'html-fundamentals',
    title: 'HTML Fundamentals',
    description:
      'Build a complete first HTML document and understand how its structure becomes a webpage.',
    category: 'html',
    categoryLabel: 'HTML',
    subcategory: 'Markup fundamentals',
    difficulty: 'Beginner',
    estimatedReadTime: 11,
    prerequisites: ['What is the Web?', 'How Websites Work', 'Browsers, Clients, and Servers'],
    learningObjectives: [
      'Explain what HTML does and why it is a markup language',
      'Recognize the required parts of a basic HTML document',
      'Separate document metadata from visible page content',
      'Create and open a small valid HTML file',
    ],
    definition:
      'HTML (HyperText Markup Language) is the language used to describe the content, structure, and meaning of a webpage. A browser parses HTML into an in-memory document structure that it can display and expose to CSS and JavaScript.',
    explanation: {
      what: 'HTML uses elements to identify parts of content, such as headings, paragraphs, links, images, and forms. It is a markup language rather than a programming language: it describes what content is and how it is structured, but it does not provide general programming logic such as loops and calculations.',
      why: 'A browser needs structured information, not just an unlabelled block of text. Good HTML gives browsers, search tools, assistive technologies, CSS, JavaScript, and other developers a shared understanding of the document.',
      how: [
        'The doctype asks the browser to process the document in standards mode.',
        'The html element is the document element, and its lang attribute declares the primary language.',
        'The head contains metadata and references that describe the document but are not the page body.',
        'The body contains the content presented as the webpage.',
        'The browser parses the markup and creates a tree of document nodes. Browsers can repair some invalid markup, so the resulting tree is not always identical to the source text.',
      ],
      where: [
        'The structure of every conventional webpage',
        'Article headings, paragraphs, links, and images',
        'Forms used for search, registration, and checkout',
        'The initial document rendered by React and other frontend applications',
      ],
    },
    example: {
      title: 'Create a complete first HTML document',
      language: 'html',
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, web!</h1>
    <p>I built my first webpage.</p>
  </body>
</html>`,
      explanation:
        'Save this code in a file named index.html and open it in a browser. The head supplies information about the document, while the body contains the heading and paragraph shown on the page.',
      walkthrough: [
        {
          code: '<!doctype html>',
          explanation:
            'The doctype is a required preamble for modern HTML documents and causes browsers to use standards mode.',
        },
        {
          code: '<html lang="en">',
          explanation:
            'The html element wraps the document. lang="en" says that its primary language is English.',
        },
        {
          code: '<meta charset="utf-8">',
          explanation: 'This declares UTF-8 as the document character encoding.',
        },
        {
          code: '<meta name="viewport" content="width=device-width, initial-scale=1">',
          explanation: 'This helps the layout viewport match the device width on mobile browsers.',
        },
        {
          code: '<title>My first page</title>',
          explanation:
            'The title names the document and is commonly shown in the browser tab or window.',
        },
        {
          code: '<h1>Hello, web!</h1>\n<p>I built my first webpage.</p>',
          explanation:
            'The h1 marks the main heading, and the p element marks a paragraph in the visible page content.',
        },
      ],
      output:
        'The browser tab is titled “My first page”. The webpage shows a large “Hello, web!” heading followed by the sentence “I built my first webpage.”',
    },
    realWorldExample: {
      title: 'Structuring a recipe page',
      description:
        'A recipe is easier for people and software to understand when each part has an HTML meaning.',
      steps: [
        'The document title identifies the recipe in the browser tab.',
        'A main heading names the dish.',
        'Paragraphs describe the recipe.',
        'A list groups the ingredients in a meaningful structure.',
        'Later, CSS can change the appearance without removing that HTML meaning.',
      ],
    },
    visualFlow: [
      'HTML source text',
      'Browser HTML parser',
      'Tree of document nodes (the DOM)',
      'Content receives styles and layout',
      'Page is presented to the user',
    ],
    keyPoints: [
      'HTML describes webpage content, structure, and meaning.',
      'HTML is a markup language, not a general-purpose programming language.',
      'The head contains metadata; the body contains page content.',
      'The title element and the main visible heading have different jobs.',
      'Correct nesting makes the intended document structure clear.',
    ],
    commonMistakes: [
      {
        title: 'Calling HTML a programming language',
        explanation:
          'HTML marks up content and structure. It does not provide general programming control flow such as conditions, loops, and functions.',
      },
      {
        title: 'Putting visible page content in the head',
        explanation:
          'The head is for metadata and resource references. Content meant to appear as part of the page belongs in the body.',
      },
      {
        title: 'Overlapping elements instead of nesting them',
        code: `<p>This is <strong>important.</p></strong>`,
        explanation:
          'An element opened inside another element should normally close before its parent closes. Write <p>This is <strong>important.</strong></p> instead.',
      },
      {
        title: 'Omitting the document language',
        explanation:
          'A correct lang value helps assistive technologies pronounce content and helps other software process the page.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is HTML?',
        answer:
          'HTML is a markup language used to describe the content, structure, and semantics of webpages.',
      },
      {
        level: 'Basic',
        question: 'What is the difference between the head and body?',
        answer:
          'The head contains document metadata and resource references. The body contains the content presented as the webpage.',
      },
      {
        level: 'Intermediate',
        question: 'Why is the doctype included in a modern HTML document?',
        answer:
          'The <!doctype html> preamble tells browsers to process the document using standards mode instead of a legacy quirks mode.',
      },
      {
        level: 'Intermediate',
        question: 'Is the parsed DOM always identical to the written HTML source?',
        answer:
          'No. The browser parses the source according to HTML rules and can insert implied elements or repair some invalid markup, so the resulting DOM tree can differ from the source text.',
      },
    ],
    relatedSlugs: ['how-websites-work', 'html-elements-and-semantics', 'css-fundamentals'],
    sources: [
      {
        label: 'MDN: Structuring content with HTML',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content',
      },
      {
        label: 'MDN: Basic HTML syntax',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax',
      },
      {
        label: 'MDN: Webpage metadata',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata',
      },
      {
        label: 'HTML Living Standard: Writing HTML documents',
        url: 'https://html.spec.whatwg.org/multipage/syntax.html#writing-html-documents',
      },
      {
        label: 'HTML Living Standard: Parsing HTML documents',
        url: 'https://html.spec.whatwg.org/multipage/parsing.html',
      },
    ],
    tags: ['html', 'markup', 'document', 'metadata', 'doctype', 'beginner'],
  },
  {
    slug: 'html-elements-and-semantics',
    title: 'HTML Elements and Semantic Structure',
    description:
      'Use elements for their meaning so people, browsers, and assistive technologies can understand the page structure.',
    category: 'html',
    categoryLabel: 'HTML',
    subcategory: 'Markup fundamentals',
    difficulty: 'Beginner',
    estimatedReadTime: 12,
    prerequisites: ['HTML Fundamentals'],
    learningObjectives: [
      'Distinguish elements, tags, content, and attributes',
      'Explain what semantic HTML means',
      'Choose native elements according to purpose rather than appearance',
      'Create a small semantic page structure with accessible controls',
    ],
    definition:
      'An HTML element represents a part of a document, while tags are the source-code syntax commonly used to mark its beginning and end. Semantic elements communicate the purpose of their content, such as navigation, an article, a heading, or a button.',
    explanation: {
      what: 'Most HTML elements have an opening tag, content, and a closing tag; some, such as img and input, are void elements and do not have closing tags or child content. Attributes add information or configuration to an element. Semantic structure means choosing elements for what the content is or does, rather than choosing them only for their default appearance.',
      why: 'Meaningful HTML is easier to maintain and gives browsers built-in behavior. It also gives assistive technologies useful roles, names, and navigation landmarks. CSS can change appearance, so there is no need to misuse an element just because it initially looks a certain way.',
      how: [
        'Identify the purpose of the content or control before choosing an element.',
        'Use heading, paragraph, list, link, button, form, and landmark elements when their native meaning fits.',
        'Use attributes to provide required information, such as a link destination, image text alternative, input name, or document language.',
        'Nest elements to represent their parent, child, and sibling relationships.',
        'Use div and span as neutral containers when no more meaningful native element fits.',
        'Add ARIA only when native HTML cannot provide the needed semantics and behavior.',
      ],
      where: [
        'Header, navigation, main content, article, aside, and footer regions',
        'Links that navigate and buttons that perform actions',
        'Product cards, news stories, documentation articles, and search results',
        'Forms whose labels and controls must be understandable and keyboard accessible',
      ],
    },
    example: {
      title: 'Mark up a product with meaningful elements',
      language: 'html',
      code: `<header>
  <p>Sound Store</p>
  <nav aria-label="Primary navigation">
    <a href="/products">Products</a>
    <a href="/support">Support</a>
  </nav>
</header>

<main>
  <article>
    <h1>Noise-canceling headphones</h1>
    <p>Comfortable headphones for focused listening.</p>
    <button type="button">Add to cart</button>
  </article>
</main>`,
      explanation:
        'The markup describes a site header, primary navigation, unique main content, a self-contained product article, and an action button. The choice of elements communicates structure even before CSS is added.',
      walkthrough: [
        {
          code: '<header>...</header>',
          explanation: 'The header groups introductory content for this page.',
        },
        {
          code: '<nav aria-label="Primary navigation">...</nav>',
          explanation:
            'The nav element identifies an important navigation region. Its label distinguishes it if the page later has more than one navigation region.',
        },
        {
          code: '<main>...</main>',
          explanation: 'The main element identifies the content unique to this page.',
        },
        {
          code: '<article>...</article>',
          explanation:
            'The article groups product content that can make sense as a self-contained item.',
        },
        {
          code: '<button type="button">Add to cart</button>',
          explanation:
            'A native button represents an action and already has expected keyboard and accessibility behavior. type="button" prevents accidental form submission if the component is later placed in a form.',
        },
      ],
      output:
        'Without custom CSS, the browser displays navigation links, a product heading and description, and an operable “Add to cart” button. The document also exposes meaningful regions and controls to assistive technology.',
    },
    realWorldExample: {
      title: 'Building an accessible storefront card',
      description:
        'An online store needs navigation and actions that work for mouse, keyboard, touch, and assistive-technology users.',
      steps: [
        'Use a link for the product name or image when activating it navigates to a product page.',
        'Use a button for “Add to cart” because it performs an action on the current interface.',
        'Use a real heading so the product is part of the document outline.',
        'Give meaningful product images an alt description based on their purpose.',
        'Apply CSS later to make the semantic elements match the visual design.',
      ],
    },
    visualFlow: [
      'Document',
      'Header → site name and navigation',
      'Main → unique page content',
      'Article → product heading, description, and action',
    ],
    keyPoints: [
      'Tags are markup syntax; elements are parts of the parsed document.',
      'Attributes provide extra information or configuration for elements.',
      'Semantic HTML describes purpose, not visual appearance.',
      'Native links, buttons, and form controls include useful behavior and semantics.',
      'Use div and span when no more meaningful native element fits.',
      'ARIA supplements HTML; it does not add missing interaction behavior by itself.',
    ],
    commonMistakes: [
      {
        title: 'Using a div as a button',
        code: `<div onclick="addToCart()">Add to cart</div>`,
        explanation:
          'A div is not a native interactive control. A button supplies button semantics, keyboard focus, and expected activation behavior without recreating them manually.',
      },
      {
        title: 'Choosing a heading because of its default size',
        explanation:
          'Heading levels express document hierarchy. Choose the appropriate level for the structure, then use CSS to control its size.',
      },
      {
        title: 'Using a button for navigation',
        explanation:
          'Use a link with an href when the purpose is navigation to a URL. Use a button when the purpose is an action, such as submitting, toggling, or adding an item.',
      },
      {
        title: 'Adding ARIA that duplicates or contradicts native meaning',
        explanation:
          'Native HTML should be the first choice. Incorrect ARIA can misrepresent an element to assistive technologies and does not automatically implement keyboard behavior.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is an HTML element?',
        answer:
          'An HTML element is a part of the document represented in markup, commonly by an opening tag, content, and a closing tag, with void elements as an exception.',
      },
      {
        level: 'Basic',
        question: 'What is semantic HTML?',
        answer:
          'Semantic HTML means choosing elements that describe the meaning or purpose of their content, such as nav, main, article, button, and heading elements.',
      },
      {
        level: 'Intermediate',
        question: 'Why should a native button usually be used instead of a clickable div?',
        answer:
          'A native button already supplies button semantics, focusability, and expected keyboard activation. A clickable div requires the developer to recreate and test those behaviors.',
      },
      {
        level: 'Intermediate',
        question: 'What is the difference between a link and a button?',
        answer:
          'A link navigates to a URL or document location. A button performs an action, such as submitting a form or changing the current interface.',
      },
      {
        level: 'Intermediate',
        question: 'When should a div be used?',
        answer:
          'Use a div as a generic block container when no native element describes the content more accurately. Its meaning usually comes from its contents and context, not from the div itself.',
      },
    ],
    relatedSlugs: ['html-fundamentals', 'css-fundamentals', 'javascript-fundamentals'],
    sources: [
      {
        label: 'MDN: Basic HTML syntax',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax',
      },
      {
        label: 'MDN: Structuring documents',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents',
      },
      {
        label: 'MDN: HTML accessibility',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML',
      },
      {
        label: 'W3C: ARIA Authoring Practices — Read Me First',
        url: 'https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/',
      },
      {
        label: 'HTML Living Standard: The elements of HTML',
        url: 'https://html.spec.whatwg.org/multipage/semantics.html',
      },
    ],
    tags: ['html', 'elements', 'semantics', 'accessibility', 'structure', 'aria'],
  },
  {
    slug: 'css-fundamentals',
    title: 'CSS Fundamentals',
    description:
      'Learn how CSS selects HTML elements and applies reusable presentation rules to a webpage.',
    category: 'css',
    categoryLabel: 'CSS',
    subcategory: 'Styling fundamentals',
    difficulty: 'Beginner',
    estimatedReadTime: 12,
    prerequisites: ['HTML Fundamentals', 'HTML Elements and Semantic Structure'],
    learningObjectives: [
      'Explain the responsibility of CSS in a webpage',
      'Read a CSS rule containing a selector and declarations',
      'Apply a class selector to HTML',
      'Describe the cascade without reducing it to “the last rule wins”',
      'Connect a style change to the browser rendering process',
    ],
    definition:
      'CSS (Cascading Style Sheets) is a rule-based language used to control the presentation and layout of structured documents such as HTML pages. A browser matches CSS selectors to elements and uses the cascade to resolve which property values apply.',
    explanation: {
      what: 'A CSS rule contains a selector followed by a declaration block. The selector identifies elements, while each declaration pairs a property with a value. CSS can control color, spacing, typography, borders, sizing, layout, transitions, animations, and adaptations for different devices or user preferences.',
      why: 'HTML should describe content and meaning without repeating visual instructions on every element. CSS keeps presentation rules reusable, lets many pages share a design, supports responsive layouts, and makes visual changes easier to maintain.',
      how: [
        'The browser obtains CSS from an external stylesheet, a style element, or an element style attribute.',
        'It parses valid rules and matches their selectors against elements in the document.',
        'When declarations compete for the same property, the cascade considers relevance, origin and importance, cascade layers, specificity, scoping proximity where applicable, and source order.',
        'The browser determines computed property values. Some properties inherit from an ancestor, while many do not.',
        'Styles that affect geometry can lead to layout work; visual details are painted, and some results may be composited into the displayed frame.',
      ],
      where: [
        'Consistent colors, typography, and spacing across a website',
        'Responsive page layouts for narrow and wide screens',
        'Navigation bars, product grids, forms, cards, and dialogs',
        'Visible hover and keyboard-focus states for interactive controls',
        'Motion that respects user preferences such as reduced motion',
      ],
    },
    example: {
      title: 'Style a product card with a reusable class',
      language: 'html',
      code: `<style>
  .product-card {
    max-width: 20rem;
    padding: 1rem;
    border: 2px solid #2563eb;
    border-radius: 0.75rem;
    background-color: #eff6ff;
  }

  .product-card h2 {
    margin-top: 0;
    color: #1d4ed8;
  }
</style>

<article class="product-card">
  <h2>Starter headphones</h2>
  <p>Comfortable sound for everyday listening.</p>
</article>`,
      explanation:
        'The HTML still describes an article, heading, and paragraph. The CSS selects that structure and changes its presentation without changing its semantic meaning.',
      walkthrough: [
        {
          code: '.product-card',
          explanation:
            'A dot starts a class selector. It matches an element whose class attribute contains product-card.',
        },
        {
          code: 'padding: 1rem;',
          explanation:
            'This declaration adds space between the card content and its border. rem is relative to the root element font size.',
        },
        {
          code: 'border: 2px solid #2563eb;',
          explanation: 'The border shorthand sets width, line style, and color around the card.',
        },
        {
          code: '.product-card h2',
          explanation:
            'This descendant selector matches h2 elements that are inside an element with the product-card class.',
        },
        {
          code: 'class="product-card"',
          explanation:
            'The HTML class connects this article to rules that use the .product-card selector.',
        },
      ],
      output:
        'The browser displays a light-blue product card with padding, a blue rounded border, and a blue heading. The card can shrink with the available space, while max-width limits its content box to 20rem.',
    },
    realWorldExample: {
      title: 'Reusing one card style across a store',
      description:
        'An e-commerce results page can show many products with the same visual pattern while preserving meaningful HTML.',
      steps: [
        'Each product is marked up as an article with the product-card class.',
        'One CSS rule supplies shared spacing, border, color, and sizing.',
        'A more specific modifier class can represent a special state such as an unavailable product.',
        'A responsive layout can rearrange the cards when available space changes.',
        'Updating the shared rule changes all matching product cards consistently.',
      ],
    },
    visualFlow: [
      'HTML provides elements and class names',
      'CSS is parsed into style rules',
      'Selectors match document elements',
      'The cascade resolves competing declarations',
      'Computed styles influence layout and paint',
      'Styled pixels appear on screen',
    ],
    keyPoints: [
      'CSS controls presentation while HTML continues to describe structure and meaning.',
      'A rule contains a selector and one or more property-value declarations.',
      'Class selectors are reusable and begin with a dot in CSS.',
      'The cascade resolves conflicts; source order is only one part of that process.',
      'Some properties inherit, but inheritance is not automatic for every property.',
      'Responsive CSS should work with available space instead of assuming one device size.',
    ],
    commonMistakes: [
      {
        title: 'Forgetting the dot in a class selector',
        code: `product-card {
  padding: 1rem;
}`,
        explanation:
          'This selector targets an element named product-card, not class="product-card". Write .product-card to select the class.',
      },
      {
        title: 'Writing an invalid declaration',
        code: `.product-card {
  color = blue;
}`,
        explanation:
          'CSS declarations use a colon between the property and value. The valid form is color: blue;. A browser ignores an invalid declaration rather than applying it.',
      },
      {
        title: 'Assuming the last declaration always wins',
        code: `#offer {
  color: red;
}

.offer {
  color: blue;
}`,
        explanation:
          'For the same element and property, the later class rule does not automatically beat the earlier ID rule. The cascade considers origin, importance, layers, specificity, and other criteria before source order.',
      },
      {
        title: 'Giving flexible content a fixed height',
        explanation:
          'Text can grow because of translation, zoom, or a narrow screen. An unnecessary fixed height can cause content to overflow or overlap.',
      },
    ],
    interviewQuestions: [
      {
        level: 'Basic',
        question: 'What is CSS?',
        answer:
          'CSS is a rule-based language used to control the presentation and layout of structured documents such as HTML pages.',
      },
      {
        level: 'Basic',
        question: 'What are a selector, property, and value?',
        answer:
          'A selector identifies elements to style. A property names the feature to change, and a value specifies the setting for that property.',
      },
      {
        level: 'Intermediate',
        question: 'What does the “cascading” part of CSS mean?',
        answer:
          'It refers to the algorithm that resolves competing declarations and produces the winning value for each property on each element.',
        deepDive:
          'The cascade considers factors including origin and importance, layers, specificity, scoping proximity where relevant, and source order. “The last rule wins” is only true after earlier criteria tie.',
      },
      {
        level: 'Intermediate',
        question: 'What is the difference between the cascade and inheritance?',
        answer:
          'The cascade chooses among declarations that apply to an element. Inheritance lets certain properties take the computed value from an ancestor when the property rules allow it.',
      },
      {
        level: 'Intermediate',
        question: 'Why are classes commonly used for reusable styles?',
        answer:
          'The same class can be applied to multiple elements, allowing one set of CSS rules to style a repeated component consistently without changing its HTML meaning.',
      },
    ],
    relatedSlugs: ['html-fundamentals', 'html-elements-and-semantics', 'javascript-fundamentals'],
    sources: [
      {
        label: 'MDN: What is CSS?',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/What_is_CSS',
      },
      {
        label: 'MDN: CSS styling basics',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics',
      },
      {
        label: 'MDN: Handling conflicts',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts',
      },
      {
        label: 'MDN: CSS values and units',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units',
      },
      {
        label: 'W3C: CSS Cascading and Inheritance',
        url: 'https://www.w3.org/TR/css-cascade-6/',
      },
    ],
    tags: ['css', 'selectors', 'declarations', 'cascade', 'styles', 'beginner'],
  },
]);
