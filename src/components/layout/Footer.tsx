import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/layout/Logo';

const columns: Array<{ title: string; links: Array<[string, string]> }> = [
  {
    title: 'Learn',
    links: [
      ['Roadmap', '/roadmap'],
      ['Tutorials', '/tutorials'],
      ['Practice', '/practice'],
      ['System design', '/system-design'],
    ],
  },
  {
    title: 'Prepare',
    links: [
      ['Interview questions', '/interview-questions'],
      ['Company guides', '/companies'],
      ['Machine coding', '/machine-coding'],
      ['Bookmarks', '/bookmarks'],
    ],
  },
  {
    title: 'Project',
    links: [
      ['About', '/about'],
      ['Contribute', '/contribute'],
      ['Contact', '/contact'],
      ['Resources', '/resources'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-[var(--surface)]">
      <div className="page-shell grid gap-12 py-14 lg:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-6 text-[var(--text-soft)]">{siteConfig.description}</p>
          <p className="mt-4 inline-flex rounded-full border bg-emerald-500/8 px-3 py-1.5 text-xs font-bold text-emerald-500">
            Free forever · No signup
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      className="text-sm text-[var(--text-soft)] transition hover:text-brand-500"
                      to={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t">
        <div className="page-shell flex flex-col gap-3 py-5 text-xs text-[var(--text-faint)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Built in public, for the frontend
            community.
          </span>
          <a
            className="inline-flex items-center gap-2 font-semibold hover:text-brand-500"
            href={siteConfig.githubUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Github className="size-3.5" /> Contribute on GitHub <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
