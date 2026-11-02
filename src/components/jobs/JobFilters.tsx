'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { jobCategories } from '@/data/jobs';

export function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const handleFilter = (category: string) => {
    if (category === 'All') {
      router.push('/jobs', { scroll: false });
    } else {
      router.push(`/jobs?category=${encodeURIComponent(category)}`, { scroll: false });
    }
  };

  return (
    <div className="job-filters" role="group" aria-label="Filter jobs by category">
      {jobCategories.map((category) => (
        <button
          key={category}
          type="button"
          className={`job-filter-btn ${activeCategory === category ? 'active' : ''}`}
          onClick={() => handleFilter(category)}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

