import { readFile, writeFile } from 'node:fs/promises';

const siteUrl = new URL(process.env.VITE_SITE_URL ?? 'https://fepoint.example.com');
const siteBasePath = siteUrl.pathname.replace(/\/$/, '');
const curriculum = JSON.parse(
  await readFile(new URL('../src/data/frontendCurriculum.json', import.meta.url), 'utf8'),
);
const tutorialRoutes = curriculum.flatMap((category) => [
  `/tutorials/${category.id}`,
  ...category.lessons.map((lesson) => `/tutorials/${category.id}/${lesson.slug}`),
]);
const routes = [
  '/',
  '/roadmap',
  '/tutorials',
  ...tutorialRoutes,
  '/practice',
  '/practice/javascript',
  '/practice/react',
  '/practice/typescript',
  '/machine-coding',
  '/system-design',
  '/system-design/fundamentals',
  '/system-design/framework',
  '/interview-questions',
  '/companies',
  '/resources',
  '/glossary',
  '/dsa',
  '/dsa/roadmap',
  '/dsa/patterns',
  '/dsa/problems',
  '/about',
  '/contact',
  '/contribute',
  '/privacy',
  '/terms',
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url><loc>${new URL(`${siteBasePath}${route}`, siteUrl.origin).toString()}</loc><changefreq>weekly</changefreq></url>`,
  )
  .join('\n')}
</urlset>
`;

await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml, 'utf8');
console.log(`Generated sitemap with ${routes.length} public routes.`);
