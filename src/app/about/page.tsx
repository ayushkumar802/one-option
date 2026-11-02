import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CTASection } from '@/components/ui/CTASection';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { generateAboutSchema } from '@/lib/structured-data';
import {
  ShieldCheck,
  Clock,
  Building2,
  CheckCircle2,
  Users,
  Briefcase,
  Target,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | One Option Manpower Solutions',
  description:
    'Learn about One Option — Indore’s leading manpower supplier and staffing solutions partner. Providing vetted, compliant, and skilled workforce across Indore, Pithampur, Dewas, and MP.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | ' + siteConfig.name,
    description:
      'Learn about One Option — Indore’s premier workforce solutions partner for industrial, warehousing, and corporate staffing.',
    url: `${siteConfig.url}/about`,
  },
};

const values = [
  {
    icon: ShieldCheck,
    title: '100% Statutory Compliance',
    text: 'Zero legal liabilities. Every deployment adheres strictly to central and state labour laws, EPF, ESIC, minimum wages, and workplace insurance.',
  },
  {
    icon: Clock,
    title: 'Rapid 24–48h Mobilization',
    text: 'Production bottlenecks cost money. We maintain an active candidate bench ready to deploy within 24 to 48 hours for immediate shift continuity.',
  },
  {
    icon: Users,
    title: 'Thorough Vetting & Screening',
    text: 'Aadhaar authentication, police verification, and domain skill assessments ensure only honest, disciplined, and capable personnel join your premises.',
  },
  {
    icon: Briefcase,
    title: 'End-to-End Account Support',
    text: 'We assign dedicated coordinators and field supervisors to handle daily muster roll, on-site discipline, and prompt worker replacements.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAboutSchema()),
        }}
      />

      <div className="page-header">
        <div className="container">
          <Breadcrumbs items={[{ label: 'About' }]} />
          <h1 className="page-header-title">About One Option</h1>
          <p className="page-header-subtitle">
            Madhya Pradesh&apos;s trusted workforce partner providing verified,
            trained, and compliant manpower across Indore and industrial belts.
          </p>
        </div>
      </div>

      {/* Main Overview Section (Image removed - Replaced with high-end CSS UI Showcase Panel) */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left: Interactive CSS Feature Panel */}
            <div className="col-lg-6">
              <AnimateOnScroll>
                <div className="about-feature-panel">
                  <div className="about-panel-badge">
                    <span className="about-panel-badge-dot" />
                    Indore &amp; MP Operations
                  </div>
                  <h3 className="about-panel-title">
                    The <span>One Option</span> Standard
                  </h3>
                  <p className="about-panel-desc">
                    We eliminate hiring friction by supplying rigorously vetted,
                    disciplined, and legally compliant workforce for factories,
                    warehouses, and enterprises.
                  </p>

                  <div className="about-panel-list">
                    <div className="about-panel-item">
                      <div className="about-panel-icon">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="about-panel-item-text">
                        <h4>100% Background &amp; Police Verified</h4>
                        <p>Aadhaar biometric verification and address validation before dispatch.</p>
                      </div>
                    </div>

                    <div className="about-panel-item">
                      <div className="about-panel-icon">
                        <Clock size={20} />
                      </div>
                      <div className="about-panel-item-text">
                        <h4>Rapid 24–48 Hour Deployment</h4>
                        <p>Fast turnaround for urgent factory shifts, seasonal surges, and logistics peaks.</p>
                      </div>
                    </div>

                    <div className="about-panel-item">
                      <div className="about-panel-icon">
                        <Building2 size={20} />
                      </div>
                      <div className="about-panel-item-text">
                        <h4>Industrial Belt Coverage</h4>
                        <p>Dedicated operational presence in Indore, Pithampur SEZ, Dewas, and Sanwer Road.</p>
                      </div>
                    </div>
                  </div>

                  <div className="about-panel-stats">
                    <div>
                      <div className="about-panel-stat-num">5,000+</div>
                      <div className="about-panel-stat-label">Workers Placed</div>
                    </div>
                    <div>
                      <div className="about-panel-stat-num">150+</div>
                      <div className="about-panel-stat-label">Active Clients</div>
                    </div>
                    <div>
                      <div className="about-panel-stat-num">100%</div>
                      <div className="about-panel-stat-label">Labour Compliant</div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right: Company Story & Value Proposition */}
            <div className="col-lg-6">
              <AnimateOnScroll delay={0.2}>
                <span className="section-label">Who We Are</span>
                <h2 className="section-title">
                  Powering Madhya Pradesh&apos;s Industrial &amp; Corporate Engine.
                </h2>
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'var(--color-secondary)',
                    marginBottom: '1rem',
                  }}
                >
                  Headquartered in Indore, <strong>{siteConfig.name}</strong> is a
                  trusted manpower supply and contract staffing firm dedicated to
                  bridging the critical talent gap for expanding businesses across
                  Central India.
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'var(--color-secondary)',
                    marginBottom: '1rem',
                  }}
                >
                  From high-volume factory labour in the Pithampur and Dewas
                  manufacturing zones to skilled warehouse pickers, commercial facility
                  housekeepers, security staff, and corporate administrators — we provide
                  tailored manpower solutions built around your operational requirements.
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'var(--color-secondary)',
                    marginBottom: '1.75rem',
                  }}
                >
                  We shoulder the complete burden of recruitment, screening, attendance
                  monitoring, and statutory labour compliances (PF, ESIC, minimum wages),
                  empowering business leaders to focus squarely on scaling productivity.
                </p>

                {/* Trust Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#065f46',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 size={16} color="#059669" />
                    PF &amp; ESIC Compliant
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#065f46',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 size={16} color="#059669" />
                    Zero Client Liability
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#065f46',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 size={16} color="#059669" />
                    Replacement Guarantee
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <AnimateOnScroll>
                <div className="about-mv-card">
                  <div className="about-mv-icon">
                    <Target size={28} />
                  </div>
                  <h3 className="about-mv-title">Our Mission</h3>
                  <p className="about-mv-text">
                    To empower manufacturers, warehousing enterprises, and corporate
                    organizations across Madhya Pradesh with reliable, skilled, and
                    disciplined workforce solutions, while ensuring transparent wages,
                    workplace safety, and dignified livelihoods for all deployed personnel.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="col-md-6">
              <AnimateOnScroll delay={0.15}>
                <div className="about-mv-card">
                  <div className="about-mv-icon">
                    <Award size={28} />
                  </div>
                  <h3 className="about-mv-title">Our Vision</h3>
                  <p className="about-mv-text">
                    To be recognized as Central India&apos;s gold standard in staffing and
                    workforce outsourcing — celebrated for uncompromised statutory integrity,
                    lightning-fast deployment, and lasting client trust across every industry
                    we serve.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <AnimateOnScroll>
              <span className="section-label">Our Core Values</span>
              <h2 className="section-title">What Sets One Option Apart</h2>
              <p className="section-subtitle mx-auto" style={{ maxWidth: '640px' }}>
                These four operational commitments guide every staffing agreement we
                execute and every candidate we deploy.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="row g-4">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="col-md-6 col-lg-3">
                  <AnimateOnScroll delay={index * 0.1}>
                    <div className="about-value-card">
                      <div className="about-value-icon">
                        <IconComponent size={22} />
                      </div>
                      <h3 className="about-value-title">{value.title}</h3>
                      <p className="about-value-text">{value.text}</p>
                    </div>
                  </AnimateOnScroll>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Highlights / Metrics Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="row g-4">
            {[
              { number: '5,000+', label: 'Workers Deployed' },
              { number: '150+', label: 'Business Clients in MP' },
              { number: '24–48h', label: 'Average Mobilization' },
              { number: '100%', label: 'Statutory Compliance' },
            ].map((stat, index) => (
              <div key={stat.label} className="col-6 col-lg-3">
                <AnimateOnScroll delay={index * 0.1}>
                  <div className="about-stat-card">
                    <div className="about-stat-number">{stat.number}</div>
                    <div className="about-stat-label">{stat.label}</div>
                  </div>
                </AnimateOnScroll>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Build a Dependable Workforce?"
        subtitle="Partner with One Option for fast, verified, and 100% compliant staffing solutions across Indore, Pithampur, and Madhya Pradesh."
        primaryLabel="Request Manpower"
        primaryHref="/contact?type=Staffing%20%2F%20Manpower%20Inquiry"
        secondaryLabel="View Open Jobs"
        secondaryHref="/jobs"
        showWhatsApp
      />
    </>
  );
}
