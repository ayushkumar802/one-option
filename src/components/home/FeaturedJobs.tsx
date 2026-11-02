import Link from 'next/link';
import { getJobs } from '@/data/jobs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { JobCard } from '@/components/jobs/JobCard';

export async function FeaturedJobs() {
  // Show the 6 newest job openings on the home page
  const jobs = (await getJobs()).slice(0, 6);

  return (
    <section className="section" aria-label="Recent jobs">
      <div className="container">
        <SectionHeading
          label="Recent Jobs"
          title="Latest Job Openings in Indore"
          subtitle="Explore current openings across industries. We connect job seekers with verified employers, quickly and transparently."
          centered
        />
        <div className="row g-4">
          {jobs.map((job, index) => (
            <div key={job.slug} className="col-md-6 col-lg-4">
              <AnimateOnScroll delay={index * 0.1} className="h-100">
                <JobCard job={job} />
              </AnimateOnScroll>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link href="/jobs" className="btn btn-outline-primary btn-lg">
            View All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
}
