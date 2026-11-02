import type { Metadata } from 'next';
import { Suspense } from 'react';
import { siteConfig } from '@/config/site';
import { getJobsByCategory } from '@/data/jobs';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobGrid } from '@/components/jobs/JobGrid';
import { CTASection } from '@/components/ui/CTASection';

const pageTitle = 'Recent Job Openings in Indore';
const pageDescription =
  'Browse latest verified job vacancies across catering, security, manufacturing, warehousing, and corporate sectors in Indore, MP. Apply directly through One Option.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/jobs',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: siteConfig.name,
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    url: '/jobs',
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};

interface JobsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const category = params.category || 'All';
  const filteredJobs = await getJobsByCategory(category);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Recent Jobs' }]} />
          <h1 className="page-header-title">Recent Job Openings in Indore</h1>
          <p className="page-header-subtitle">
            Explore active openings across industries. Whether you are seeking skilled,
            semi-skilled, or contract employment in Indore and MP, connect with verified opportunities.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Suspense fallback={null}>
            <JobFilters />
          </Suspense>
          <JobGrid jobs={filteredJobs} />
        </div>
      </section>

      <CTASection
        title="Looking to hire manpower for your business?"
        subtitle="Tell us your workforce requirement and we'll deploy verified staff in 24–72 hours."
        primaryLabel="Hire Manpower"
        primaryHref="/contact?type=Staffing%20%2F%20Manpower%20Inquiry"
        showWhatsApp
      />
    </>
  );
}
