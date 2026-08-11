export function RouteFallback() {
  return (
    <div aria-label="Loading page" className="page-shell animate-pulse py-16" role="status">
      <div className="h-3 w-28 rounded bg-[var(--surface-muted)]" />
      <div className="mt-5 h-12 max-w-2xl rounded-xl bg-[var(--surface-muted)]" />
      <div className="mt-4 h-5 max-w-xl rounded bg-[var(--surface-muted)]" />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div className="h-52 rounded-2xl bg-[var(--surface-muted)]" key={item} />
        ))}
      </div>
    </div>
  );
}
