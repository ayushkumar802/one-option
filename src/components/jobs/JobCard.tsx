import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Building2, Calendar, IndianRupee, Briefcase } from 'lucide-react';
import type { Job } from '@/types';
import { getJobLogo } from '@/lib/jobLogo';
import { CopyJobButton } from './CopyJobButton';

interface JobCardProps {
  job?: Job;
  project?: Job; // legacy fallback
  priority?: boolean;
}

export function JobCard({ job, project, priority = false }: JobCardProps) {
  const currentJob = (job || project)!;
  if (!currentJob) return null;

  const description =
    currentJob.description && currentJob.description.length > 110
      ? `${currentJob.description.slice(0, 110)}…`
      : currentJob.description || '';

  const skills = currentJob.skills || currentJob.materials || [];

  return (
    <div className="job-card">
      {/* Clickable overlay link covering the card for seamless navigation */}
      <Link
        href={`/jobs/${currentJob.slug}`}
        className="job-card-overlay-link"
        aria-label={`View details for ${currentJob.title}`}
      />

      <div className="job-card-main-row">
        <div className="job-card-logo">
          <div className="job-card-logo-inner">
            <Image
              src={getJobLogo(currentJob)}
              alt={`${currentJob.title} – company logo`}
              fill
              sizes="60px"
              style={{ objectFit: 'contain' }}
              priority={priority}
            />
          </div>
        </div>

        <div className="job-card-info">
          <div className="job-card-header-line">
            <h3 className="job-card-title">{currentJob.title}</h3>
            <div className="job-card-badges-wrap">
              {currentJob.jobType && (
                <span className="job-card-type-badge">{currentJob.jobType}</span>
              )}
              <span className="job-card-badge desktop-only">Now Hiring</span>
            </div>
          </div>

          <div className="job-card-company-row">
            {currentJob.companyName && (
              <span className="job-card-company">
                <Building2 size={13} /> {currentJob.companyName}
              </span>
            )}
            <span className="job-card-dot">•</span>
            <p className="job-card-category">{currentJob.category}</p>
          </div>

          {/* Salary, Location & Experience in a compact inline row */}
          <div className="job-card-meta-row">
            {currentJob.salaryRange && (
              <span className="job-card-salary-badge">
                <IndianRupee size={12} /> {currentJob.salaryRange}
              </span>
            )}
            {currentJob.location && (
              <span className="job-card-location">
                <MapPin size={12} /> {currentJob.location}
              </span>
            )}
            {currentJob.experience && (
              <span className="job-card-meta-chip desktop-only">
                <Briefcase size={12} /> {currentJob.experience}
              </span>
            )}
            {currentJob.postedDate && (
              <span className="job-card-posted desktop-only">
                <Calendar size={12} /> {currentJob.postedDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {description && <p className="job-card-description desktop-only">{description}</p>}

      {/* Key Skills Tags (Desktop only) */}
      {skills.length > 0 && (
        <div className="job-card-skills-row desktop-only">
          {skills.slice(0, 3).map((skill: string) => (
            <span key={skill} className="job-skill-chip">
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="job-skill-chip text-muted">+{skills.length - 3}</span>
          )}
        </div>
      )}

      {/* Footer with view link and copy to clipboard button */}
      <div className="job-card-footer">
        <Link href={`/jobs/${currentJob.slug}`} className="job-card-link">
          View &amp; Apply <ArrowRight size={13} />
        </Link>
        <CopyJobButton slug={currentJob.slug} title={currentJob.title} />
      </div>
    </div>
  );
}
