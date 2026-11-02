import type { Job } from '@/types';
import { JobCard } from './JobCard';

interface RelatedJobsProps {
  jobs?: Job[];
  projects?: Job[]; // legacy fallback
}

export function RelatedJobs({ jobs, projects }: RelatedJobsProps) {
  const allJobs = jobs || projects || [];
  if (allJobs.length === 0) return null;

  return (
    <section className="section section-alt" aria-label="Similar jobs">
      <div className="container">
        <h2 className="section-title mb-5">Similar Job Openings</h2>
        <div className="row g-4">
          {allJobs.map((job) => (
            <div key={job.slug} className="col-md-4">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
