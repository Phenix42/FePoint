import { ArrowRight, Clock3, Search, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useAppStore } from '@/store/useAppStore';
import { searchContent } from '@/utils/search';

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const history = useAppStore((state) => state.searchHistory);
  const addSearch = useAppStore((state) => state.addSearch);
  const clearSearchHistory = useAppStore((state) => state.clearSearchHistory);
  const results = useMemo(
    () => (debouncedQuery.trim() ? searchContent(debouncedQuery, 'all', 7) : []),
    [debouncedQuery],
  );

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => inputRef.current?.focus(), 20);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, open]);

  const submit = (value = query) => {
    const cleanQuery = value.trim();
    if (!cleanQuery) return;
    addSearch(cleanQuery);
    onClose();
    void navigate('/search?q=' + encodeURIComponent(cleanQuery));
  };

  if (!open) return null;

  return (
    <div
      aria-label="Search FEPoint"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/60 px-3 pt-[8vh] backdrop-blur-sm sm:pt-[12vh]"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
      role="dialog"
    >
      <div className="glass-card w-full max-w-2xl overflow-hidden rounded-2xl">
        <form
          className="flex items-center gap-3 border-b px-4"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Search aria-hidden="true" className="size-5 text-[var(--text-faint)]" />
          <input
            aria-label="Search tutorials, questions, and challenges"
            className="h-16 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[var(--text-faint)]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search closures, React performance, system design…"
            ref={inputRef}
            value={query}
          />
          <button
            aria-label="Close search"
            className="grid size-8 place-items-center rounded-lg text-[var(--text-faint)] hover:bg-[var(--surface-muted)]"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        </form>

        <div className="max-h-[65vh] overflow-y-auto p-2">
          {!query.trim() && (
            <div className="p-2">
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                  Recent searches
                </span>
                {history.length > 0 && (
                  <button
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-faint)] hover:text-red-500"
                    onClick={clearSearchHistory}
                    type="button"
                  >
                    <Trash2 className="size-3" /> Clear
                  </button>
                )}
              </div>
              {history.length === 0 ? (
                <p className="px-2 py-7 text-center text-sm text-[var(--text-faint)]">
                  Your recent searches stay on this device.
                </p>
              ) : (
                history.map((item) => (
                  <button
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm hover:bg-[var(--surface-muted)]"
                    key={item}
                    onClick={() => submit(item)}
                    type="button"
                  >
                    <Clock3 className="size-4 text-[var(--text-faint)]" />
                    {item}
                  </button>
                ))
              )}
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <p className="px-4 py-12 text-center text-sm text-[var(--text-faint)]">
              No close matches. Try a technology or concept name.
            </p>
          )}

          {results.map((result) => {
            const external = result.url.startsWith('http');
            const content = (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{result.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-[var(--text-faint)]">
                    {result.category} · {result.type.replace('-', ' ')}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-[var(--text-faint)]" />
              </>
            );
            const className =
              'flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-[var(--surface-muted)]';
            return external ? (
              <a
                className={className}
                href={result.url}
                key={result.id}
                rel="noreferrer"
                target="_blank"
              >
                {content}
              </a>
            ) : (
              <Link className={className} key={result.id} onClick={onClose} to={result.url}>
                {content}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t bg-[var(--surface-muted)]/60 px-4 py-2 text-[0.65rem] text-[var(--text-faint)]">
          <span>Press Enter for all results</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
