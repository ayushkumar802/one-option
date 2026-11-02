'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Job } from '@/types';
import { JobCard } from './JobCard';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { Loader2 } from 'lucide-react';

interface JobGridProps {
  jobs: Job[];
  pageSize?: number;
}

export function JobGrid({ jobs = [], pageSize = 6 }: JobGridProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [loadingMore, setLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Reset to initial page size whenever category filter changes the list
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [jobs, pageSize]);

  const hasMore = visibleCount < jobs.length;

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + pageSize, jobs.length));
      setLoadingMore(false);
    }, 200);
  }, [hasMore, loadingMore, pageSize, jobs.length]);

  // Infinite scroll observer: automatically loads more as user scrolls near bottom
  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loadMore]);

  if (jobs.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No jobs found in this category.</p>
      </div>
    );
  }

  const visibleJobs = jobs.slice(0, visibleCount);

  return (
    <>
      <div className="row g-4">
        {visibleJobs.map((job, index) => (
          <div key={job.slug} className="col-md-6 col-lg-4">
            <AnimateOnScroll className="h-100">
              <JobCard job={job} priority={index < 3} />
            </AnimateOnScroll>
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="text-center mt-5 pt-3">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="btn btn-outline-primary px-4 py-2"
            style={{ borderRadius: '999px', fontSize: '0.9rem' }}
          >
            {loadingMore ? (
              <span className="d-inline-flex align-items-center gap-2">
                <Loader2 size={16} className="spin-loader" /> Loading more jobs...
              </span>
            ) : (
              `Load More Jobs (${visibleCount} of ${jobs.length})`
            )}
          </button>
        </div>
      )}
    </>
  );
}
