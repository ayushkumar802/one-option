import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getJobs } from '@/data/jobs';

// Refresh at most once an hour so new jobs appear without a redeploy
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/jobs`, priority: 0.9 },
    { url: `${baseUrl}/services`, priority: 0.8 },
    { url: `${baseUrl}/about`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.8 },
  ];

  // If the Google Sheet can't be reached, still return the static pages
  let jobPages: MetadataRoute.Sitemap = [];
  try {
    const jobs = await getJobs();
    jobPages = jobs
      .filter((job) => job.slug)
      .map((job) => ({
        url: `${baseUrl}/jobs/${job.slug}`,
        priority: 0.8,
      }));
  } catch (error) {
    console.error('Sitemap: failed to load jobs', error);
  }

  return [...staticPages, ...jobPages];
}