// Backward compatibility layer redirecting to src/data/jobs
import {
  getJobs,
  getJobBySlug,
  getFeaturedJobs,
  getJobsByCategory,
  getRelatedJobs,
  jobCategories,
} from './jobs';

export * from './jobs';
export const getProjects = getJobs;
export const getProjectBySlug = getJobBySlug;
export const getFeaturedProjects = getFeaturedJobs;
export const getProjectsByCategory = getJobsByCategory;
export const getRelatedProjects = getRelatedJobs;
export const portfolioCategories = jobCategories;
