import { siteConfig } from '@/config/site';
import type { BreadcrumbItem, Service } from '@/types';

export function generateOrganizationSchema() {
  const sameAs = Object.values(siteConfig.socialLinks).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    '@id': `${siteConfig.url}/#organization`,
    name: 'OneOption - Manpower Indore',
    alternateName: siteConfig.alternateNames || [
      'Manpower Indore',
      'Manpower in Indore',
      'ManpowerIndore.in',
      'OneOption',
      'OneOption Indore',
    ],
    legalName: 'OneOption',
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}${siteConfig.seo.ogImage}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: '452001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.7196,
      longitude: 75.8577,
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    knowsAbout: [
      'Manpower in Indore',
      'Manpower supplier in Indore',
      'Manpower agency in Indore',
      'Industrial labour contractor Indore',
      'Contract staffing Indore',
      'Factory workers in Pithampur and Indore',
      'Warehouse staffing Indore',
      'Security guard services Indore',
      'Corporate housekeeping Indore',
      'Facility management Indore',
    ],
    priceRange: '₹₹',
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: 'Manpower Indore',
    alternateName: [
      'Manpower in Indore',
      'ManpowerIndore.in',
      'OneOption',
      'OneOption Manpower Indore',
    ],
    url: siteConfig.url,
    description: siteConfig.seo.defaultDescription,
    inLanguage: 'en-IN',
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}

export function generateWebPageSchema(page: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    about: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
    })),
  };
}

export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.longDescription || service.description,
    provider: {
      '@id': `${siteConfig.url}/#organization`,
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    url: `${siteConfig.url}/services`,
  };
}

export function generateAboutSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteConfig.name}`,
    description: siteConfig.seo.defaultDescription,
    url: `${siteConfig.url}/about`,
    mainEntity: {
      '@type': 'EmploymentAgency',
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: '452001',
        addressCountry: 'IN',
      },
    },
  };
}

export function generatePersonSchema() {
  return generateAboutSchema();
}