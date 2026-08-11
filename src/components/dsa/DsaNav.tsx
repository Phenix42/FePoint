import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Overview', href: '/dsa' },
  { label: 'Roadmap', href: '/dsa/roadmap' },
  { label: 'Patterns', href: '/dsa/patterns' },
  { label: 'Problems', href: '/dsa/problems' },
];

export function DsaNav() {
  const location = useLocation();
  return (
    <nav
      aria-label="DSA section"
      className="flex gap-1 overflow-x-auto rounded-2xl border bg-[var(--surface)] p-2"
    >
      {links.map((link) => (
        <Link
          className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition ${location.pathname === link.href ? 'bg-brand-500 text-[var(--bg)]' : 'text-[var(--text-soft)] hover:bg-[var(--surface-muted)]'}`}
          key={link.href}
          to={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
