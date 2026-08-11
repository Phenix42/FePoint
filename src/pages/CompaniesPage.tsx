import { Building2, Search } from 'lucide-react';
import { useState } from 'react';
import { CompanyCard } from '@/components/companies/CompanyCard';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { companies } from '@/data/companies';

export default function CompaniesPage() {
  const [query, setQuery] = useState('');
  const filtered = companies.filter(
    (company) =>
      !query.trim() ||
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.technologies.some((technology) =>
        technology.toLowerCase().includes(query.toLowerCase()),
      ),
  );
  return (
    <>
      <Seo
        description="Company-wise frontend interview guides with common rounds, technologies, questions, and preparation tips."
        path="/companies"
        title="Company interview guides"
      />
      <PageHero
        aside={
          <div className="surface-card flex min-w-52 items-center gap-4 rounded-2xl p-5">
            <Building2 className="size-6 text-brand-500" />
            <span>
              <strong className="block text-2xl">{companies.length}</strong>
              <small className="text-xs text-[var(--text-faint)]">company guides</small>
            </span>
          </div>
        }
        description="Review typical frontend rounds, high-signal technologies, practice questions, machine-coding prompts, system-design themes, and preparation priorities."
        eyebrow="Company-wise preparation"
        title="Prepare for the interview in front of you."
      />
      <div className="page-shell py-10 sm:py-14">
        <label className="surface-card mx-auto flex h-12 max-w-xl items-center gap-3 rounded-xl px-4">
          <Search className="size-4 text-[var(--text-faint)]" />
          <span className="sr-only">Search companies</span>
          <input
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a company or technology…"
            value={query}
          />
        </label>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((company) => (
            <CompanyCard company={company} key={company.id} />
          ))}
        </div>
      </div>
    </>
  );
}
