import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, MessageCircle, Clock, Briefcase, Building2 } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '@/config/site';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Manpower Indore | Hire Workers | OneOption',
  description:
    'Get in touch with OneOption (manpowerindore.in) in Indore. Inquire about industrial labour, contract staffing, or apply for verified jobs across Indore, Pithampur, and MP.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Manpower Indore | OneOption',
    description:
      'Reach out to OneOption for manpower supply, staffing solutions, hiring inquiries, or job applications in Indore & MP.',
    url: `${siteConfig.url}/contact`,
  },
};

interface ContactPageProps {
  searchParams?: Promise<{
    job?: string;
    type?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const jobName = typeof resolvedParams.job === 'string' ? resolvedParams.job : '';

  let queryType = 'Other';
  if (typeof resolvedParams.type === 'string' && resolvedParams.type.trim()) {
    const raw = decodeURIComponent(resolvedParams.type).trim();
    if (raw.toLowerCase().includes('staffing') || raw.toLowerCase().includes('manpower')) {
      queryType = 'Staffing / Manpower Inquiry';
    } else if (raw.toLowerCase().includes('job')) {
      queryType = 'Job Request';
    } else if (raw.toLowerCase().includes('q/a') || raw.toLowerCase().includes('qa')) {
      queryType = 'Q/A';
    } else {
      queryType = raw;
    }
  } else if (jobName) {
    queryType = 'Job Request';
  }

  const isStaffing = queryType === 'Staffing / Manpower Inquiry';

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Contact', href: '/contact' },
              ...(jobName
                ? [{ label: `Apply: ${jobName}` }]
                : isStaffing
                  ? [{ label: 'Hire Manpower' }]
                  : []),
            ]}
          />
          <h1 className="page-header-title">
            {jobName
              ? `Apply for ${jobName}`
              : isStaffing
                ? 'Hire Verified Manpower in Indore'
                : 'Get in Touch with One Option'}
          </h1>
          <p className="page-header-subtitle">
            {jobName
              ? 'Submit your details below to apply or inquire about this position. Our hiring team in Indore will review your application and contact you promptly.'
              : isStaffing
                ? 'Looking for skilled, semi-skilled, or contract workforce for your business in Indore & MP? Tell us your headcount, role, and timeline requirements below for prompt deployment.'
                : 'Looking to hire verified manpower for your business or applying for open roles in Indore and MP? Send us your requirement or message below.'}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="d-flex align-items-center gap-2 mb-4">
                {jobName ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: '#ecfdf5',
                      color: '#047857',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <Briefcase size={15} /> Job Application Mode
                  </span>
                ) : isStaffing ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: '#ecfdf5',
                      color: '#047857',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <Building2 size={15} /> Staffing / Manpower Inquiry
                  </span>
                ) : (
                  <span className="section-label mb-0">Direct Inquiry</span>
                )}
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-2xl)',
                  fontWeight: 800,
                  color: '#0b2b20',
                  marginBottom: 'var(--space-6)',
                }}
              >
                {jobName
                  ? 'Submit Your Application'
                  : isStaffing
                    ? 'Tell Us Your Workforce Requirement'
                    : 'Send Us an Inquiry'}
              </h2>

              <Suspense
                fallback={
                  <div
                    className="p-5 text-center"
                    style={{
                      background: 'var(--color-bg-alt)',
                      borderRadius: '16px',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <p style={{ color: 'var(--color-secondary)', margin: 0 }}>
                      Loading application form…
                    </p>
                  </div>
                }
              >
                <ContactForm
                  initialJobName={jobName}
                  initialQueryType={queryType}
                />
              </Suspense>
            </div>

            {/* Contact Info Sidebar */}
            <div className="col-lg-4 offset-lg-1">
              <div className="mb-5">
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-xs)',
                    fontWeight: 700,
                    letterSpacing: 'var(--ls-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  Office &amp; Contact Info
                </h3>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <Mail
                    size={18}
                    style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                      Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-secondary)' }}
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <Phone
                    size={18}
                    style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                      Phone / Helpline
                    </p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-secondary)' }}
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <MapPin
                    size={18}
                    style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                      Location &amp; Operations
                    </p>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-secondary)', marginBottom: 0 }}>
                      {siteConfig.address.street ? `${siteConfig.address.street}, ` : ''}
                      {siteConfig.address.city}, {siteConfig.address.state},{' '}
                      {siteConfig.address.country}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#059669', marginTop: 4, fontWeight: 500 }}>
                      Serving Indore, Pithampur, Dewas &amp; surrounding industrial areas
                    </p>
                  </div>
                </div>

                {siteConfig.businessHours && (
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <Clock
                      size={18}
                      style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}
                    />
                    <div>
                      <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                        Working Hours
                      </p>
                      <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-secondary)', marginBottom: 0 }}>
                        {siteConfig.businessHours}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="mb-5"
                style={{
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: 'var(--space-6)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-xs)',
                    fontWeight: 700,
                    letterSpacing: 'var(--ls-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  Quick Connect
                </h3>
                <div className="d-grid gap-3">
                  <a
                    href={getWhatsAppUrl(
                      jobName
                        ? `Hi One Option team, I am inquiring / applying for the role of ${jobName}.`
                        : undefined
                    )}
                    className="btn btn-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={18} className="me-2" />
                    Chat on WhatsApp
                  </a>
                  <a href={`tel:${siteConfig.phone}`} className="btn btn-outline-primary">
                    <Phone size={18} className="me-2" />
                    Call Us Directly
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="btn btn-outline-primary">
                    <Mail size={18} className="me-2" />
                    Send an Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
