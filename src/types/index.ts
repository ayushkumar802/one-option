export interface Job {
  slug: string;
  title: string;
  category: JobCategory;
  subcategory?: string;
  location?: string;
  description: string;

  // --- Job Card & Details Properties ---
  companyName?: string;
  salaryRange?: string;
  postedDate?: string;
  jobType?: string;
  experience?: string;
  openings?: string | number;
  shiftTiming?: string;
  responsibilities?: string;
  skills?: string[];
  benefits?: string[];
  logo?: string;
  featured?: boolean;

  // --- Legacy Compatibility ---
  year?: string;
  designConcept?: string;
  coverImage?: string;
  images?: JobImage[];
  materials?: string[];
  dimensions?: string;
  services?: string[];
}

export type Project = Job;

export interface JobImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
export type ProjectImage = JobImage;

export type JobCategory =
  | 'All'
  | 'Catering'
  | 'Security'
  | 'Housekeeping'
  | 'Manufacturing'
  | 'Warehouse'
  | 'Construction'
  | 'Office'
  | 'Hospitality'
  | 'Driver'
  | string;

export type ProjectCategory = JobCategory;


export interface Service {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  projectType: string;
  quote: string;
  location?: string;
}


export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  queryType?: string;
  jobName?: string;
  projectType?: string;
  budget?: string;
  message: string;
  honeypot?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SiteConfig {
  name: string;
  alternateNames?: string[];
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: {
    street?: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
  };
  socialLinks: {
    instagram?: string;
    pinterest?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    behance?: string;
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
  };
  serviceAreas: string[];
  businessHours?: string;
}
