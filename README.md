# FEPoint

FEPoint is a free, no-signup frontend learning and interview-preparation platform. It combines a structured roadmap, long-form tutorials, practice questions, JavaScript problems, machine-coding challenges, frontend system-design case studies, company guides, fuzzy search, bookmarks, notes, and progress tracking in one responsive React application.

All personal data stays in browser `localStorage`. There is no backend, authentication, subscription, payment, or premium content.

## Highlights

- Interactive 102-topic learning roadmap across eight stages
- 640+ typed tutorial records across 21 modules, including beginner fundamentals, interview planning, machine coding, JavaScript implementation exercises, frontend DSA, and framework comparisons
- Documentation-style lesson reader with progressive Simple/Developer/Interview/Advanced explanations, MDX, terminology popovers, line-by-line code walkthroughs, reading progress, and related lessons
- Validated 1,000+ question practice engine with browse, topic-test, random, Daily 10, timed, wrong-answer, and revision modes
- Beginner-friendly glossary with 51 connected terms, plain definitions, technical detail, and analogies
- DSA for Frontend roadmap with 12 foundations, 10 recognition patterns, and 25 worked problems in JavaScript and TypeScript
- Interview question bank with technology, difficulty, company, and question-type filters
- 30 machine-coding challenges with locally persisted timers, rubrics, hints, solutions, bookmarks, completion, and notes
- 34 frontend system-design case studies, 23 linked fundamentals, and a 10-step interview framework
- 20 company-specific frontend interview guides
- Fuse.js fuzzy search across every content type
- Light, dark, and system themes
- Local bookmarks, completion, roadmap progress, practice analytics, DSA status, pattern mastery, revision queues, history, reading progress, notes, JSON export/import, and one-click reset
- Route-level lazy loading, dynamic metadata, TechArticle structured data, sitemap generation, and SPA deployment fallbacks
- WCAG-minded keyboard navigation, skip link, semantic landmarks, focus treatment, accessible dialogs/tabs/forms, and reduced-motion support

## Technology

- React 19 and TypeScript in strict mode
- Vite 8
- React Router 7
- Tailwind CSS 4 plus reusable custom components
- Zustand persisted stores
- React Hook Form and Zod
- Fuse.js
- React Markdown, MDX, remark-gfm, and Prism React Renderer
- React Helmet Async
- Lucide React
- Vitest, React Testing Library, and user-event
- ESLint and Prettier

## Quick start

Requirements:

- Node.js 20.19 or newer
- npm 10 or newer

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

The environment file is optional for local development. The application has safe placeholder defaults.

## Commands

```bash
npm run dev              # Start the Vite development server
npm run build            # Type-check, generate sitemap, and create production output
npm run preview          # Preview the production build locally
npm run lint             # Run strict ESLint checks
npm test                 # Run the Vitest suite once
npm run test:watch       # Run tests interactively
npm run test:coverage    # Generate coverage
npm run validate:content # Validate collection counts, links, IDs, and rich fields
npm run format           # Format source and configuration files
npm run format:check     # Check formatting without changing files
npm run generate:sitemap # Regenerate public/sitemap.xml
```

## Environment variables

| Variable                  | Purpose                                       | Default                                |
| ------------------------- | --------------------------------------------- | -------------------------------------- |
| `VITE_SITE_URL`           | Canonical production URL and sitemap base     | `https://fepoint.example.com`          |
| `VITE_GITHUB_URL`         | Repository and contribution links             | Placeholder repository                 |
| `VITE_FORMSPREE_ENDPOINT` | Optional contact-form endpoint                | Empty; form runs in demonstration mode |
| `VITE_BASE_PATH`          | Deployment base path, mainly for GitHub Pages | `/`                                    |

Only expose values safe for a browser bundle through `VITE_*` variables.

## Project structure

```text
Frontendwarrior/
├── .github/workflows/       # CI and GitHub Pages deployment
├── public/                  # Favicon, robots, sitemap, SPA fallback
├── scripts/                 # Sitemap and post-build scripts
├── src/
│   ├── components/
│   │   ├── common/          # Buttons, badges, progress, code, SEO, notes
│   │   ├── companies/
│   │   ├── interview/
│   │   ├── layout/          # App shell, header, footer, theme
│   │   ├── machine-coding/
│   │   ├── search/
│   │   ├── system-design/
│   │   ├── tutorial/
│   │   └── dsa/
│   ├── content/             # Validated lessons, glossary, practice, DSA, and system design
│   ├── config/              # Replaceable application identity and stats
│   ├── data/                # Static, typed learning content
│   ├── hooks/               # Debouncing and recent-history behaviour
│   ├── pages/               # Lazy-loaded route screens
│   ├── routes/              # Browser router configuration
│   ├── schemas/             # Zod content contracts and collection validation
│   ├── store/               # Zustand theme and local progress stores
│   ├── styles/              # Tailwind entry and design tokens
│   ├── test/                # Shared Vitest setup
│   ├── types/               # Content and local-state contracts
│   └── utils/               # Search, filters, storage, class merging
├── netlify.toml
├── vercel.json
└── vite.config.ts
```

## Architecture

Static educational content and interactive user state are deliberately separated:

```text
src/content + src/data + src/types + src/schemas
        │
        ├── route pages ── reusable cards/readers ── browser UI
        │
        └── search index ── Fuse.js ──────────────── search UI

Zustand persisted stores
        ├── theme preference
        └── bookmarks / completion / practice / DSA / revision / notes / history / reading progress
                                  │
                                  └── localStorage only
```

The route tree is lazy-loaded at page level. Static data remains framework-independent, so the content can later move to Markdown/MDX, a CMS, or a Next.js renderer without changing the feature contracts.

### Local progress schema

`useAppStore` owns one versioned, validated snapshot:

- bookmarks
- completed content keys
- completed roadmap keys
- recently viewed items
- recent searches
- personal notes
- reading percentages
- practice attempts and latest accuracy
- DSA problem status and pattern mastery
- revision queue entries

The persisted schema is versioned. Legacy snapshots receive safe defaults, and imports are validated with Zod before the store changes. Malformed JSON and invalid snapshots leave existing data untouched.

## Branding

Change the name, description, statistics, navigation, URLs, and contact address in:

```text
src/config/site.ts
```

The monochrome FEPoint artwork is stored as scalable SVG files in `public/fepoint-logo.svg`, `public/fepoint-icon.svg`, and `public/favicon.svg`. The responsive bracketed wordmark lives in `src/components/layout/Logo.tsx`.

## Adding content

1. Choose the relevant typed model in `src/types/content.ts`.
2. Add structured content under `src/content` (or legacy collections under `src/data`).
3. Keep stable IDs and URL-safe slugs.
4. Add practical explanation, failure states, accessibility considerations, and interview trade-offs.
5. Verify search results and direct routes.
6. Run `npm run validate:content`, lint, tests, and the production build.

Lesson content supports learning objectives, MDX, four explanation depths, terminology, analogies, walkthroughs, visual stages, mistakes, edge cases, performance, exercises, mini projects, revision notes, and metadata. Large collections stay outside page components and are parsed through strict Zod schemas.

## Testing

The suite covers:

- safe localStorage parsing and write failures
- bookmark toggling and completion tracking
- validated progress export/import
- schema-validated content counts and cross-links
- practice scoring, DSA status, revision queues, and legacy progress migration
- fuzzy search and content-type filters
- tutorial filtering and sorting
- theme switching
- content-card routing

```bash
npm run lint
npm test
npm run build
```

## Deployment

### Vercel

1. Import the repository.
2. Use framework preset **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add the production environment variables.

`vercel.json` provides the SPA rewrite and baseline security/cache headers.

### Netlify

Import the repository. `netlify.toml` configures the build, publish directory, asset cache, and SPA fallback automatically.

### GitHub Pages

GitHub Actions automatically builds and deploys the site whenever a commit is pushed to `main`. The **Deploy GitHub Pages** workflow can also be started manually from the repository's Actions tab.

The workflow reads the production URL and repository base path from GitHub Pages, then uploads `dist`. The post-build script creates `dist/404.html` so direct SPA routes can recover on GitHub Pages. React Router also receives Vite's base path.

## Privacy and security notes

- There is no user database, session, authentication token, analytics profile, payment path, or server-side execution.
- Notes and progress never leave the browser unless the user explicitly exports a JSON file.
- Imported progress is shape-validated.
- Tutorial examples are displayed, not executed.
- External resources open with `rel="noreferrer"`.
- Production hosting configurations set content-type, referrer, permissions, and immutable-asset headers.

## Future improvements

- Expand the MDX editorial workflow to additional tutorial bodies
- Add a sandboxed HTML/CSS/JavaScript playground
- Add worker-based code evaluation without a privileged backend process
- Generate the sitemap from a build-time content manifest including every detail route
- Add Playwright visual and end-to-end coverage
- Add optional offline support through a service worker
- Add a contribution preview command for new content records

## License

Choose and add an open-source license before accepting external contributions. Third-party documentation and company names remain the property of their respective owners.
