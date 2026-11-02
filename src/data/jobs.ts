import type { Job } from '@/types';
import { getData } from '@/lib/fetchData';
import { JOBS_SHEET_ID } from '@/config/constant';

// Helper to convert sheet data to clean Job type
function normalizeJob(item: any): Job {
  const logoUrl = String(item.logo || item.companyLogo || item.coverImage || '').trim() || undefined;

  const parseList = (val: any) =>
    typeof val === 'string'
      ? val.split(',').map((s: string) => s.trim()).filter(Boolean)
      : Array.isArray(val)
        ? val
        : [];

  const skills = parseList(item.skills || item.requirements || item.materials);
  const benefits = parseList(item.benefits || item.services);

  return {
    ...item,
    companyName: item.companyName || item.company || 'Verified Employer',
    salaryRange: item.salaryRange || item.salary || undefined,
    postedDate: item.postedDate || item.jobPostedDate || item.date || (item.year ? String(item.year) : undefined),
    jobType: item.jobType || item.type || 'Full Time',
    experience: item.experience || undefined,
    openings: item.openings || undefined,
    shiftTiming: item.shiftTiming || item.shift || item.dimensions || undefined,
    responsibilities: item.responsibilities || item.designConcept || undefined,
    skills,
    benefits,
    logo: logoUrl,
    coverImage: logoUrl || '',
    images: [],
    // Legacy fallbacks:
    materials: skills,
    services: benefits,
    dimensions: item.shiftTiming || item.dimensions,
    designConcept: item.responsibilities || item.designConcept,
    featured: item.featured === true || item.featured === 'TRUE' || item.featured === 'true',
  };
}

function parseJobDate(dateStr?: string): number {
  if (!dateStr) return 0;
  const str = String(dateStr).trim();
  const parsed = Date.parse(str);
  if (!isNaN(parsed)) return parsed;
  const dmyMatch = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (dmyMatch) {
    const [, day, month, year] = dmyMatch;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }
  return 0;
}

// Fetch all jobs (newest posted date first)
export async function getJobs(): Promise<Job[]> {
  const data = await getData(JOBS_SHEET_ID);
  if (!data) return [];
  // Reverse sheet order so newly appended rows at the bottom are placed first
  const normalized = [...data].reverse().map(normalizeJob);
  // Sort descending by date (newest posted date first)
  normalized.sort((a, b) => {
    const dateA = parseJobDate(a.postedDate || a.year);
    const dateB = parseJobDate(b.postedDate || b.year);
    return dateB - dateA;
  });
  return normalized;
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  const jobs = await getJobs();
  return jobs.find((j) => j.slug === slug);
}

export async function getFeaturedJobs(): Promise<Job[]> {
  const jobs = await getJobs();
  return jobs.filter((j) => j.featured);
}

export async function getJobsByCategory(category: string): Promise<Job[]> {
  const jobs = await getJobs();
  if (category === 'All') return jobs;
  return jobs.filter(
    (j) => j.category === category || j.subcategory === category
  );
}

export async function getRelatedJobs(currentSlug: string, limit = 3): Promise<Job[]> {
  const jobs = await getJobs();
  const current = jobs.find((j) => j.slug === currentSlug);
  if (!current) return jobs.slice(0, limit);
  return jobs
    .filter(
      (j) =>
        j.slug !== currentSlug &&
        (j.category === current.category || j.subcategory === current.subcategory)
    )
    .slice(0, limit);
}

export const jobCategories = [
  'All',
  'Catering',
  'Security',
  'Housekeeping',
  'Manufacturing',
  'Warehouse',
  'Construction',
  'Office',
  'Hospitality',
  'Driver',
] as const;

// Re-export APP_URL and getJobShareUrl for convenience
export { APP_URL, getJobShareUrl } from '@/config/constant';

