import { writeFile } from 'node:fs/promises';

const siteUrl = new URL(process.env.VITE_SITE_URL ?? 'https://fepoint.example.com');
const siteBasePath = siteUrl.pathname.replace(/\/$/, '');
const routes = [
  '/',
  '/roadmap',
  '/tutorials',
  '/tutorials/browser',
  '/tutorials/html',
  '/tutorials/css',
  '/tutorials/javascript',
  '/tutorials/typescript',
  '/tutorials/react',
  '/tutorials/nextjs',
  '/tutorials/computer-fundamentals',
  '/tutorials/internet',
  '/tutorials/dom',
  '/tutorials/git-and-tools',
  '/tutorials/state-and-api',
  '/tutorials/testing',
  '/tutorials/performance',
  '/tutorials/security',
  '/tutorials/accessibility',
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
