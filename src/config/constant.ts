// Google Apps Script Web App URL for fetching sheet data
export const SHEET_FETCH_URL =
    process.env.NEXT_PUBLIC_SHEET_FETCH_URL ||
    process.env.SHEET_FETCH_URL ||
    "https://script.google.com/macros/s/AKfycbyOU0B8IU66ErtELVkBiqeHonS6zbO20AwFeQS4X_JtSxMIN8IjAYpq-boGMABMGh8q9w/exec";

// Google Apps Script Web App URL for fetching doc data
export const DOC_FETCH_URL =
    process.env.NEXT_PUBLIC_DOC_FETCH_URL ||
    process.env.DOC_FETCH_URL ||
    "";

// Cache revalidation time in seconds (60 seconds)
export const CACHE_TIME = Number(process.env.CACHE_TIME) || 60;

// Your Google Sheet ID
export const PROJECTS_SHEET_ID =
    process.env.NEXT_PUBLIC_PROJECTS_SHEET_ID ||
    process.env.PROJECTS_SHEET_ID ||
    process.env.PROJECT_SHEET_ID ||
    "1bTkHhKxKF2bB9lvngF1tFqaQ7Ay8UqPOyxzXQDyepGs";
export const JOBS_SHEET_ID =
    process.env.NEXT_PUBLIC_JOBS_SHEET_ID ||
    process.env.JOBS_SHEET_ID ||
    PROJECTS_SHEET_ID;

// ============================================================================
// APP / WEBSITE BASE URL
// ============================================================================
// Change this variable whenever your final app domain is finalized.
// Can also be overridden via NEXT_PUBLIC_APP_URL in .env / .env.local
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.manpowerindore.in";

/**
 * Helper to get the full copyable URL for a job.
 * If you change APP_URL above, that URL will be copied.
 * When testing on localhost with the default domain, it auto-detects localhost:3000 so copied links work immediately.
 */
export function getJobShareUrl(slug: string): string {
  let base = (APP_URL || '').trim();

  if (typeof window !== 'undefined' && window.location?.origin) {
    if (!base || (window.location.hostname === 'localhost' && (base.includes('oneoption') || base.includes('manpowerindore')))) {
      base = window.location.origin;
    }
  }

  const cleanBase = (base || 'https://www.manpowerindore.in').replace(/\/+$/, '');
  return `${cleanBase}/jobs/${slug}`;
}

// Email config (server-side only)
export const EMAIL_HOST_USER = process.env.EMAIL_HOST_USER || '';
export const EMAIL_HOST_PASSWORD = process.env.EMAIL_HOST_PASSWORD || '';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
