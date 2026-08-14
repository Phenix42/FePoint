const environment = import.meta.env as unknown as Record<string, string | undefined>;
const assetBase = environment.BASE_URL ?? '/';

export const siteConfig = {
  name: 'FePoint',
  shortName: 'FE',
  description:
    'A free, no-signup learning platform for frontend tutorials, practice, system design, and interview preparation.',
  url: environment.VITE_SITE_URL ?? 'https://fepoint.example.com',
  githubUrl: environment.VITE_GITHUB_URL ?? 'https://github.com/your-org/fepoint',
  discordUrl: environment.VITE_DISCORD_URL ?? 'https://discord.com/',
  email: 'hello@fepoint.dev',
  logoUrl: assetBase + 'fepoint-logo.svg',
  iconUrl: assetBase + 'fepoint-icon.svg',
  stats: [
    { value: '640+', label: 'Tutorials' },
    { value: '1,000+', label: 'Practice questions' },
    { value: '25', label: 'DSA walkthroughs' },
    { value: '34', label: 'System design cases' },
    { value: 'Free', label: 'Forever' },
  ],
  nav: [
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Practice', href: '/practice' },
    { label: 'DSA for Frontend', href: '/dsa' },
    { label: 'Glossary', href: '/glossary' },
    { label: 'Machine Coding', href: '/machine-coding' },
    { label: 'System Design', href: '/system-design' },
    { label: 'Interview', href: '/interview-questions' },
    { label: 'Companies', href: '/companies' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
