import { ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';

const searchPlaceholder = 'Search tutorials, concepts, interview questions, DSA, system design...';

export function GlobalSearchBar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submitSearch = () => {
    const cleanQuery = query.trim();
    void navigate(cleanQuery ? '/search?q=' + encodeURIComponent(cleanQuery) : '/search');
  };

  return (
    <form
      aria-label="Search all FePoint content"
      className={cn(
        'group flex w-full items-center gap-3 rounded-2xl border bg-[var(--surface-raised)] p-2 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl transition focus-within:border-[#685cf6]/55 focus-within:shadow-[0_22px_70px_rgba(104,92,246,0.18)] dark:shadow-[0_22px_70px_rgba(0,0,0,0.38)]',
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault();
        submitSearch();
      }}
      role="search"
    >
      <span className="ml-2 grid size-10 shrink-0 place-items-center rounded-xl bg-[#685cf6]/10 text-[#685cf6] sm:ml-3">
        <Search aria-hidden="true" className="size-5" />
      </span>
      <label className="sr-only" htmlFor="landing-global-search">
        Search tutorials, concepts, interview preparation, and more
      </label>
      <input
        autoComplete="off"
        className="h-14 min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--text)] outline-none placeholder:font-normal placeholder:text-[var(--text-faint)] sm:text-base"
        id="landing-global-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder={searchPlaceholder}
        type="search"
        value={query}
      />
      <button
        aria-label="Search FePoint"
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#685cf6] text-white transition hover:bg-[#594de6] sm:flex sm:w-auto sm:gap-2 sm:px-5 sm:text-sm sm:font-bold"
        type="submit"
      >
        <span className="hidden sm:inline">Search</span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </button>
    </form>
  );
}
