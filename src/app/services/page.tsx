import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { services } from '@/data/services';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ProcessSection } from '@/components/home/ProcessSection';
import { CTASection } from '@/components/ui/CTASection';
import { generateServiceSchema } from '@/lib/structured-data';

const pageTitle = 'Manpower Services in Indore | Industrial & Contract Staffing';
const pageDescription =
  'Complete workforce & manpower solutions in Indore and Madhya Pradesh. OneOption (manpowerindore.in) provides contract staffing, industrial factory workers, warehouse staff, security guards, housekeeping, and corporate personnel.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Manpower Indore | OneOption',
    title: `${pageTitle} | OneOption`,
    description: pageDescription,
    url: '/services',
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: 'OneOption - Manpower Services Indore',
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      {services.map((service) => (
        <script
          key={service.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema(service)).replace(
              /</g,
              '\\u003c'
            ),
          }}
        />
      ))}

      <div className="page-header">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Services' }]} />
          <h1 className="page-header-title">
            Complete Manpower &amp; Staffing Solutions in Indore
          </h1>
          <p className="page-header-subtitle">
            One Option supplies verified, job-ready manpower for factories, industrial
            plants, warehouses, corporate offices, hotels, and facility operations across
            Indore, Pithampur, Dewas, and Madhya Pradesh.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="row g-4">
            {services.map((service, index) => (
              <div key={service.slug} className="col-md-6 col-lg-4">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      <CTASection
        title="Need reliable manpower for your business?"
        subtitle="Share your staffing requirements with us and we'll deploy vetted candidates in 24–72 hours."
        primaryLabel="Hire Manpower"
        primaryHref="/contact?type=Staffing%20%2F%20Manpower%20Inquiry"
        showWhatsApp
        dark
      />
    </>
  );
}