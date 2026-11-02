import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, CheckCircle2, Clock, ShieldCheck, Building2, IndianRupee, Briefcase } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getJobs, getJobBySlug, getRelatedJobs } from '@/data/jobs';
import { getJobLogo } from '@/lib/jobLogo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedJobs } from '@/components/jobs/RelatedJobs';
import { CopyJobButton } from '@/components/jobs/CopyJobButton';
import { CTASection } from '@/components/ui/CTASection';
import { generateWebPageSchema } from '@/lib/structured-data';

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getJobBySlug(slug);
  if (!project) return {};

  const logoUrl = getJobLogo(project);

  return {
    title: `${project.title} | ${siteConfig.name}`,
    description: project.description.slice(0, 160),
    alternates: {
      canonical: `/jobs/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description.slice(0, 160),
      url: `${siteConfig.url}/jobs/${project.slug}`,
      images: [
        {
          url: logoUrl,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: project.title,
      description: project.description.slice(0, 160),
      images: [logoUrl],
    },
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const project = await getJobBySlug(slug);

  if (!project) {
    notFound();
  }

  const logoUrl = getJobLogo(project);
  const relatedJobs = await getRelatedJobs(slug, 3);

  const pageSchema = generateWebPageSchema({
    title: project.title,
    description: project.description,
    url: `${siteConfig.url}/jobs/${project.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="page-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Recent Jobs', href: '/jobs' },
              { label: project.title },
            ]}
          />
          <div className="row align-items-center g-4 mt-1">
            <div className="col-auto">
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '3px solid #d1fae5',
                  boxShadow: '0 8px 24px rgba(6, 78, 59, 0.12)',
                  padding: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                  <Image
                    src={logoUrl}
                    alt={`${project.title} – company logo`}
                    fill
                    sizes="90px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                <span className="job-card-badge">Now Hiring</span>
                {project.jobType && (
                  <span className="job-card-type-badge">{project.jobType}</span>
                )}
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#059669',
                    backgroundColor: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: '1px solid #dcebe3',
                  }}
                >
                  {project.category}
                </span>
                <CopyJobButton slug={project.slug} title={project.title} />
              </div>
              <h1 className="page-header-title mb-1" style={{ fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.75rem)' }}>
                {project.title}
              </h1>
              {project.companyName && (
                <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#047857', margin: '4px 0' }}>
                  <Building2 size={16} className="me-1 d-inline" /> {project.companyName}
                </p>
              )}
              <div className="d-flex flex-wrap align-items-center gap-3 mt-3" style={{ fontSize: 'var(--fs-sm)' }}>
                {project.salaryRange && (
                  <span className="job-card-salary-badge" style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
                    <IndianRupee size={15} /> {project.salaryRange}
                  </span>
                )}
                {project.location && (
                  <span className="d-flex align-items-center gap-1 text-muted">
                    <MapPin size={15} style={{ color: '#10b981' }} /> {project.location}
                  </span>
                )}
                {(project.postedDate || project.year) && (
                  <span className="d-flex align-items-center gap-1 text-muted">
                    <Calendar size={15} style={{ color: '#10b981' }} /> Posted {project.postedDate || project.year}
                  </span>
                )}
                {project.experience && (
                  <span className="job-card-meta-chip">
                    <Briefcase size={14} /> {project.experience}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job details */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #dcebe3',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 30px -12px rgba(6, 78, 59, 0.08)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#059669',
                    marginBottom: '0.75rem',
                  }}
                >
                  Position Details
                </span>
                <h2 className="section-title mb-4" style={{ fontSize: '1.75rem', color: '#03231a' }}>
                  Job Overview
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: '#4b5f57', whiteSpace: 'pre-line' }}>
                  {project.description}
                </p>

                {(project.responsibilities || project.designConcept) && (
                  <div className="mt-5 pt-4" style={{ borderTop: '1px solid #dcebe3' }}>
                    <h3 className="section-title mb-3" style={{ fontSize: '1.35rem', color: '#03231a' }}>
                      Roles &amp; Responsibilities
                    </h3>
                    <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4b5f57', whiteSpace: 'pre-line' }}>
                      {project.responsibilities || project.designConcept}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-5">
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #dcebe3',
                  borderRadius: '24px',
                  padding: '2rem',
                  boxShadow: '0 8px 30px -12px rgba(6, 78, 59, 0.08)',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-4 pb-3" style={{ borderBottom: '1px solid #dcebe3' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#03231a', margin: 0 }}>
                      Quick Job Info
                    </h3>
                    <small style={{ color: '#4b5f57' }}>Verified opening by One Option</small>
                  </div>
                  <ShieldCheck size={28} style={{ color: '#10b981' }} />
                </div>

                {project.salaryRange && (
                  <div className="mb-4">
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#059669', marginBottom: '8px' }}>
                      Salary / Pay Scale
                    </h4>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: '#047857', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <IndianRupee size={16} /> {project.salaryRange}
                    </p>
                  </div>
                )}

                {project.experience && (
                  <div className="mb-4">
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#059669', marginBottom: '8px' }}>
                      Experience Required
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: '#0b2b20', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Briefcase size={16} style={{ color: '#10b981' }} /> {project.experience}
                    </p>
                  </div>
                )}

                {project.openings && (
                  <div className="mb-4">
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#059669', marginBottom: '8px' }}>
                      Total Vacancies
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: '#0b2b20', margin: 0 }}>
                      {project.openings}
                    </p>
                  </div>
                )}

                {(project.shiftTiming || project.dimensions) && (
                  <div className="mb-4">
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#059669', marginBottom: '8px' }}>
                      Shift &amp; Working Hours
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: '#0b2b20', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} style={{ color: '#10b981' }} />
                      {project.shiftTiming || project.dimensions}
                    </p>
                  </div>
                )}

                {(project.skills || project.materials) && (project.skills || project.materials)!.length > 0 && (
                  <div className="mb-4">
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#059669', marginBottom: '10px' }}>
                      Key Skills &amp; Requirements
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {(project.skills || project.materials)!.map((skill: string) => (
                        <li
                          key={skill}
                          style={{
                            fontSize: '0.92rem',
                            color: '#0b2b20',
                            padding: '6px 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(project.benefits || project.services) && (project.benefits || project.services)!.length > 0 && (
                  <div className="mb-4">
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#059669', marginBottom: '10px' }}>
                      Benefits &amp; Support
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {(project.benefits || project.services)!.map((item: string) => (
                        <li
                          key={item}
                          style={{
                            fontSize: '0.92rem',
                            color: '#0b2b20',
                            padding: '6px 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href={`/contact?job=${encodeURIComponent(project.title)}&type=${encodeURIComponent('Job Request')}`}
                  className="btn btn-primary w-100 py-3 mt-3"
                  style={{ fontSize: '0.95rem' }}
                >
                  Apply / Inquire For This Role <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedJobs jobs={relatedJobs} />

      <CTASection
        title="Need Manpower in Indore?"
        subtitle="One Option supplies trained, background-verified staff for businesses across MP."
        primaryLabel="Hire Manpower"
        primaryHref="/contact?type=Staffing%20%2F%20Manpower%20Inquiry"
        showWhatsApp
      />
    </>
  );
}
