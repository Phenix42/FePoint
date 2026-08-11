import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { siteConfig } from '@/config/site';

export function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy"
      updated="4 August 2026"
      sections={[
        [
          'Local data',
          'Bookmarks, completion, roadmap progress, notes, search history, reading progress, and recent pages are stored in localStorage on your device. FEPoint does not receive this data.',
        ],
        [
          'Contact form',
          'The contact form is a local demonstration unless a deployment operator configures a third-party form endpoint. When configured, that provider processes the information you submit under its own policy.',
        ],
        [
          'External links',
          'Resource and GitHub links open third-party websites. Those sites may collect information according to their own practices.',
        ],
        [
          'Your controls',
          'Use the progress page to export or reset all application data. You can also clear site data through your browser settings.',
        ],
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      title="Terms"
      updated="4 August 2026"
      sections={[
        [
          'Educational use',
          'FEPoint provides learning and interview-preparation material for general educational purposes. It is not an official guide for any company or certification.',
        ],
        [
          'No guarantee',
          'We work to keep content accurate and useful, but web technologies and interview processes change. Verify critical details against primary documentation.',
        ],
        [
          'Acceptable use',
          'Do not attempt to disrupt the site, misrepresent contributed work, or use the project in a way that violates applicable law.',
        ],
        [
          'External resources',
          'Links to third-party tools and documentation are provided for convenience and do not imply endorsement or control.',
        ],
      ]}
    />
  );
}

function LegalPage({
  title,
  path,
  updated,
  sections,
}: {
  title: string;
  path: string;
  updated: string;
  sections: Array<[string, string]>;
}) {
  return (
    <>
      <Seo
        description={title + ' information for ' + siteConfig.name + '.'}
        path={path}
        title={title}
      />
      <PageHero
        description={
          'Plain-language ' + title.toLowerCase() + ' information for the public FEPoint website.'
        }
        eyebrow="Project information"
        title={title}
      />
      <article className="page-shell section-space">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-[var(--text-faint)]">Last updated: {updated}</p>
          <div className="prose-lesson">
            {sections.map(([heading, content]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{content}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
