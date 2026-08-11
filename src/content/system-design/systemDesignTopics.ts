import { systemDesignTopicSchema, validateUniqueIds } from '@/schemas/contentSchemas';
import type { SystemDesignTopic } from '@/types/content';

interface TopicSeed {
  slug: string;
  title: string;
  group: SystemDesignTopic['group'];
  simple: string;
  analogy: string;
  frontend: string;
  tradeOffs: string[];
  related: string[];
}

const seeds: TopicSeed[] = [
  {
    slug: 'client-and-server',
    title: 'Client and server',
    group: 'fundamentals',
    simple:
      'A client asks for data or work; a server listens, authorises the request, and returns a response.',
    analogy: 'A diner places an order while the kitchen prepares and returns it.',
    frontend:
      'The browser client owns interaction and presentation but must treat server data and permissions as authoritative.',
    tradeOffs: [
      'Client responsiveness versus shipped code',
      'Server control versus network dependency',
    ],
    related: ['network-basics', 'api-design'],
  },
  {
    slug: 'network-basics',
    title: 'Network basics',
    group: 'fundamentals',
    simple:
      'Requests cross many connected networks in packets, with delay, loss, and changing routes.',
    analogy: 'Small parcels travel through several sorting centres before reaching their address.',
    frontend:
      'Latency, offline periods, retries, and partial responses shape loading, error, and optimistic UI states.',
    tradeOffs: [
      'More round trips versus larger payloads',
      'Aggressive retry versus duplicate load',
    ],
    related: ['latency', 'client-and-server'],
  },
  {
    slug: 'api-design',
    title: 'API design',
    group: 'backend-for-frontend',
    simple: 'An API is the explicit contract for allowed operations, inputs, outputs, and errors.',
    analogy: 'A menu lists what can be ordered and how each order is described.',
    frontend:
      'Stable, task-oriented contracts reduce request waterfalls, defensive transformation, and duplicated client logic.',
    tradeOffs: [
      'Flexible generic endpoints versus task-specific endpoints',
      'Version stability versus rapid evolution',
    ],
    related: ['client-and-server', 'databases'],
  },
  {
    slug: 'authentication-and-authorization',
    title: 'Authentication and authorization',
    group: 'fundamentals',
    simple:
      'Authentication proves identity; authorization checks whether that identity may perform an action.',
    analogy: 'A badge proves who you are, while a door policy decides which rooms it opens.',
    frontend:
      'The UI can hide unavailable controls for clarity, but only the server can enforce permission boundaries.',
    tradeOffs: ['Short sessions versus repeated sign-in', 'Central policy versus service autonomy'],
    related: ['security', 'api-design'],
  },
  {
    slug: 'scalability',
    title: 'Scalability',
    group: 'fundamentals',
    simple:
      'A scalable system handles growing users, data, or traffic without unacceptable slowdown or failure.',
    analogy: 'A shop adds checkout counters when the customer line grows.',
    frontend:
      'Clients need pagination, backpressure, stable cache keys, and graceful degradation as datasets and traffic grow.',
    tradeOffs: [
      'Vertical simplicity versus horizontal elasticity',
      'Consistency versus distribution cost',
    ],
    related: ['load-balancing', 'caching'],
  },
  {
    slug: 'latency',
    title: 'Latency and throughput',
    group: 'fundamentals',
    simple:
      'Latency measures one operation’s delay; throughput measures how many operations finish over time.',
    analogy: 'Trip duration is latency, while cars passing per minute is throughput.',
    frontend:
      'Perceived speed improves through immediate feedback, streaming, prefetching, and fewer blocking dependencies.',
    tradeOffs: ['Batch efficiency versus first-result delay', 'Prefetch speed versus wasted data'],
    related: ['network-basics', 'cdn'],
  },
  {
    slug: 'availability-and-reliability',
    title: 'Availability and reliability',
    group: 'fundamentals',
    simple:
      'Availability asks whether a system can be used now; reliability asks whether it behaves correctly over time.',
    analogy:
      'An open shop is available, but it is reliable only when orders are consistently correct.',
    frontend:
      'Error boundaries, retry choices, stale data, offline states, and clear recovery keep partial failures usable.',
    tradeOffs: [
      'Fast failover versus operational complexity',
      'Freshness versus serving stale-but-useful data',
    ],
    related: ['failure-design', 'observability'],
  },
  {
    slug: 'load-balancing',
    title: 'Load balancing',
    group: 'fundamentals',
    simple: 'A load balancer distributes requests across healthy service instances.',
    analogy: 'A host sends each arriving group to a suitable available table.',
    frontend:
      'Sticky sessions and instance changes affect real-time connections, uploads, and state that was incorrectly stored on one server.',
    tradeOffs: [
      'Session affinity versus even distribution',
      'Health-check sensitivity versus false removal',
    ],
    related: ['scalability', 'realtime-transport'],
  },
  {
    slug: 'caching',
    title: 'Caching',
    group: 'backend-for-frontend',
    simple:
      'A cache stores reusable results closer to where they are needed so repeat work is faster.',
    analogy:
      'Keep frequently used books on your desk instead of walking to the library every time.',
    frontend:
      'Browser, CDN, request, and application caches need explicit keys, freshness rules, invalidation, and optimistic reconciliation.',
    tradeOffs: ['Freshness versus hit rate', 'Memory and invalidation complexity versus speed'],
    related: ['cdn', 'api-design'],
  },
  {
    slug: 'cdn',
    title: 'Content delivery networks',
    group: 'fundamentals',
    simple: 'A CDN serves cacheable resources from locations closer to users.',
    analogy: 'Regional warehouses shorten the delivery trip from one distant factory.',
    frontend:
      'Hashed assets, image variants, cache headers, and edge delivery improve startup time for globally distributed users.',
    tradeOffs: ['Edge freshness versus origin control', 'Provider capability versus portability'],
    related: ['caching', 'latency'],
  },
  {
    slug: 'databases',
    title: 'Databases and data models',
    group: 'fundamentals',
    simple:
      'A database durably organises information and supports chosen read, write, and relationship patterns.',
    analogy: 'A library catalogue is organised around the questions people need to answer.',
    frontend:
      'Data model identity, pagination order, versions, and nullability directly shape client cache and interface states.',
    tradeOffs: [
      'Relational guarantees versus flexible documents',
      'Normalised writes versus read-optimised duplication',
    ],
    related: ['api-design', 'queues'],
  },
  {
    slug: 'queues',
    title: 'Queues and background work',
    group: 'fundamentals',
    simple:
      'A queue stores work to be processed asynchronously, smoothing spikes and separating services.',
    analogy: 'A ticket line keeps requests ordered while available workers handle them.',
    frontend:
      'Long-running actions need pending states, job identifiers, progress, cancellation, and eventual success or failure feedback.',
    tradeOffs: [
      'Fast acknowledgement versus eventual completion',
      'At-least-once delivery versus deduplication work',
    ],
    related: ['realtime-transport', 'availability-and-reliability'],
  },
  {
    slug: 'realtime-transport',
    title: 'WebSockets, SSE, and polling',
    group: 'backend-for-frontend',
    simple:
      'Polling repeatedly asks for changes; SSE streams server events; WebSockets support two-way messages.',
    analogy:
      'Polling checks the mailbox, SSE is a one-way announcement, and WebSocket is a phone call.',
    frontend:
      'Choose by direction, frequency, infrastructure, reconnect behaviour, ordering, and whether ordinary HTTP is sufficient.',
    tradeOffs: [
      'Connection cost versus update delay',
      'Bidirectional flexibility versus operational complexity',
    ],
    related: ['queues', 'load-balancing'],
  },
  {
    slug: 'monolith-and-microservices',
    title: 'Monoliths and microservices',
    group: 'fundamentals',
    simple:
      'A monolith deploys related capabilities together; microservices split them into independently operated services.',
    analogy: 'One department store contrasts with specialised shops that coordinate deliveries.',
    frontend:
      'Service boundaries can create request waterfalls and inconsistent contracts, motivating gateways or backend-for-frontend layers.',
    tradeOffs: [
      'Deployment simplicity versus independent scaling',
      'Local calls versus distributed failure modes',
    ],
    related: ['api-design', 'cloud-basics'],
  },
  {
    slug: 'cloud-basics',
    title: 'Cloud basics',
    group: 'fundamentals',
    simple:
      'Cloud platforms rent managed computing, storage, networking, and deployment capabilities on demand.',
    analogy: 'Rent an equipped workspace instead of constructing and maintaining a building.',
    frontend:
      'Object storage, edge functions, regions, serverless cold starts, and deployment previews affect architecture and user latency.',
    tradeOffs: [
      'Managed convenience versus vendor coupling',
      'Elastic billing versus cost predictability',
    ],
    related: ['cdn', 'observability'],
  },
  {
    slug: 'observability',
    title: 'Observability',
    group: 'fundamentals',
    simple: 'Logs, metrics, traces, and user signals help explain what a running system is doing.',
    analogy:
      'A cockpit combines gauges and records so pilots can understand both current and past behaviour.',
    frontend:
      'Real-user monitoring, web vitals, error context, trace identifiers, and privacy-safe events reveal production experience.',
    tradeOffs: [
      'Diagnostic detail versus privacy and cost',
      'Sampling savings versus missed rare failures',
    ],
    related: ['availability-and-reliability', 'analytics'],
  },
  {
    slug: 'security',
    title: 'Security fundamentals',
    group: 'fundamentals',
    simple:
      'Security protects confidentiality, integrity, availability, and user trust across every boundary.',
    analogy: 'Locks, identity checks, tamper seals, and emergency plans protect different risks.',
    frontend:
      'Treat rendered content as untrusted, keep secrets off the client, enforce permissions server-side, and use browser security policy.',
    tradeOffs: ['Friction versus risk reduction', 'Broad capability versus least privilege'],
    related: ['authentication-and-authorization', 'api-design'],
  },
  {
    slug: 'state-architecture',
    title: 'Frontend state architecture',
    group: 'frontend',
    simple:
      'Place each state value at the smallest reliable owner and separate server, URL, form, and ephemeral state.',
    analogy: 'Store a tool in the closest shared cupboard that actually needs to serve its users.',
    frontend:
      'Clear ownership prevents duplicated truth, effect loops, stale copies, and unnecessary global stores.',
    tradeOffs: [
      'Local clarity versus shared coordination',
      'Normalisation versus ergonomic view models',
    ],
    related: ['caching', 'component-boundaries'],
  },
  {
    slug: 'component-boundaries',
    title: 'Component and feature boundaries',
    group: 'frontend',
    simple:
      'Group interface code around stable responsibilities and change patterns rather than arbitrary file size.',
    analogy:
      'Rooms have clear purposes and doors; a building is not one hall or hundreds of closets.',
    frontend:
      'Boundaries define ownership, testing seams, lazy-loading opportunities, and how failures are contained.',
    tradeOffs: [
      'Reusable abstraction versus direct feature code',
      'Independent bundles versus shared consistency',
    ],
    related: ['state-architecture', 'design-systems'],
  },
  {
    slug: 'failure-design',
    title: 'Failure and resilience design',
    group: 'frontend',
    simple:
      'Plan loading, empty, stale, partial, offline, forbidden, and failed states as first-class product states.',
    analogy: 'A journey plan includes detours and safe stops, not only the perfect open road.',
    frontend:
      'Retry only safe operations, preserve drafts, scope error boundaries, and always provide a next action.',
    tradeOffs: [
      'Automatic recovery versus surprising repeated work',
      'Detailed errors versus cognitive load',
    ],
    related: ['availability-and-reliability', 'observability'],
  },
  {
    slug: 'design-systems',
    title: 'Design systems',
    group: 'frontend',
    simple:
      'Shared tokens, components, guidance, and governance make interface decisions consistent and reusable.',
    analogy:
      'A construction kit combines standard parts with rules for assembling safe structures.',
    frontend:
      'Accessible primitives and tokens reduce repeated decisions while still requiring product-specific composition.',
    tradeOffs: [
      'Consistency versus local flexibility',
      'Central governance versus contribution speed',
    ],
    related: ['component-boundaries', 'testing-strategy'],
  },
  {
    slug: 'testing-strategy',
    title: 'Testing strategy',
    group: 'frontend',
    simple:
      'Use different test levels to gain confidence in contracts, behaviour, integration, and critical journeys.',
    analogy:
      'Inspect individual parts, assembled systems, and the complete vehicle under real driving conditions.',
    frontend:
      'Prefer user-observable assertions, contract tests at boundaries, and a small reliable set of end-to-end journeys.',
    tradeOffs: ['Fast isolation versus realistic coverage', 'Mock control versus contract drift'],
    related: ['component-boundaries', 'observability'],
  },
  {
    slug: 'analytics',
    title: 'Product analytics',
    group: 'frontend',
    simple:
      'Analytics records privacy-aware events that answer explicit product and experience questions.',
    analogy:
      'A shop counts meaningful actions to improve layout without following every personal detail.',
    frontend:
      'Create a typed event taxonomy, validate payloads, respect consent, and avoid making analytics block interaction.',
    tradeOffs: ['Insight detail versus user privacy', 'Client immediacy versus server reliability'],
    related: ['observability', 'security'],
  },
];

export const systemDesignLearningTopics: SystemDesignTopic[] = validateUniqueIds(
  seeds.map((seed, index) =>
    systemDesignTopicSchema.parse({
      id: `system-topic-${String(index + 1).padStart(2, '0')}`,
      slug: seed.slug,
      title: seed.title,
      group: seed.group,
      simpleExplanation: seed.simple,
      developerExplanation: `${seed.title} is an architectural decision with behaviour, failure modes, operating cost, and ownership boundaries. Define the requirement first, then choose the simplest design whose trade-offs meet it.`,
      frontendImpact: seed.frontend,
      analogy: seed.analogy,
      tradeOffs: seed.tradeOffs,
      relatedSlugs: seed.related,
    }),
  ),
  'system design topic',
);

export const getSystemDesignTopic = (slug: string | undefined) =>
  systemDesignLearningTopics.find((topic) => topic.slug === slug);
