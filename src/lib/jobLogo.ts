import type { Project } from '@/types';

const DEFAULT_LOGO = '/images/categories/default.svg';

const categoryLogos: Record<string, string> = {
  catering: '/images/categories/catering.svg',
  catrine: '/images/categories/catering.svg',
  security: '/images/categories/security.svg',
  housekeeping: '/images/categories/housekeeping.svg',
  manufacturing: '/images/categories/manufacturing.svg',
  warehouse: '/images/categories/warehouse.svg',
  construction: '/images/categories/construction.svg',
  office: '/images/categories/office.svg',
  hospitality: '/images/categories/hospitality.svg',
  driver: '/images/categories/driver.svg',
};

/**
 * Returns the company logo if provided.
 * If no logo is specified, returns the respective category logo (or default).
 */
export function getJobLogo(project: Pick<Project, 'logo' | 'category'>): string {
  const customLogo = project.logo?.trim();
  if (customLogo) return customLogo;

  const key = (project.category || '').toString().trim().toLowerCase();
  return categoryLogos[key] ?? DEFAULT_LOGO;
}
