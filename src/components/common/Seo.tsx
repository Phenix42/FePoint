import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';

export function Seo({
  title,
  description = siteConfig.description,
  path = '/',
}: {
  title?: string;
  description?: string;
  path?: string;
}) {
  const pageTitle = title ? title + ' · ' + siteConfig.name : siteConfig.name;
  const canonical = new URL(path, siteConfig.url).toString();
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta content={description} name="description" />
      <meta content={pageTitle} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content="website" property="og:type" />
      <meta content={canonical} property="og:url" />
      <meta content="summary_large_image" name="twitter:card" />
      <link href={canonical} rel="canonical" />
    </Helmet>
  );
}
