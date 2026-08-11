import { BookOpenText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getGlossaryTerm } from '@/content/glossary/glossaryTerms';

export function TerminologyPopover({ termId, label }: { termId: string; label: string }) {
  const term = getGlossaryTerm(termId);
  if (!term) return <span>{label}</span>;
  return (
    <details className="group relative inline-block">
      <summary className="inline-flex cursor-help list-none items-center gap-1 rounded-md border-b border-dashed border-brand-500 font-semibold text-[var(--text)]">
        {label}
        <BookOpenText className="size-3 text-brand-500" />
      </summary>
      <div className="glass-card absolute left-0 z-30 mt-2 w-72 rounded-xl p-4 text-left text-sm shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <strong>{term.term}</strong>
          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-brand-500">
            {term.category}
          </span>
        </div>
        <p className="mt-2 leading-6 text-[var(--text-soft)]">{term.simpleDefinition}</p>
        <p className="mt-2 border-t pt-2 text-xs leading-5 text-[var(--text-faint)]">
          {term.analogy}
        </p>
        <Link
          className="mt-3 inline-flex text-xs font-bold text-brand-500 hover:underline"
          to={`/glossary?term=${term.slug}`}
        >
          Open in glossary →
        </Link>
      </div>
    </details>
  );
}
