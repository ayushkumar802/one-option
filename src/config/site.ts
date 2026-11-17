import type { SiteConfig } from '@/types';
import { APP_URL } from '@/config/constant';

export const siteConfig: SiteConfig = {
  name: 'One Option',
  alternateNames: [
    'Manpower Indore',
    'Manpower in Indore',
    'ManpowerIndore.in',
    'OneOption',
    'OneOption Indore',
    'One Option Manpower',
  ],
  tagline: 'Manpower & Staffing Solutions in Indore',
  description:
    'One Option (manpowerindore.in) is Indore’s premier manpower supplier and contract staffing firm. Providing verified industrial labour, warehouse staff, factory workers, and facility management across Indore, Pithampur, and MP.',
  url: APP_URL,
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contact@manpowerindore.in',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 6299147709',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 6299147709',
  address: {
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
  },
  socialLinks: {},
  seo: {
    titleTemplate: '%s | Manpower Indore',
    defaultTitle: 'Manpower Indore | OneOption - Top Staffing & Labour Solutions',
    defaultDescription:
      'Premier manpower supplier and staffing agency in Indore, Madhya Pradesh. OneOption provides verified industrial labour, contract staffing, factory workers, and warehouse staffing across Indore and Pithampur.',
    ogImage: '/images/hero/hero-manpower.png',
  },
  serviceAreas: [
    'Indore',
    'Pithampur',
    'Dewas',
    'Sanwer Road',
    'Madhya Pradesh',
  ],
  businessHours: 'Monday – Saturday, 9:00 AM – 7:00 PM',
};

export const whatsappMessage =
  "Hi OneOption team, I need manpower services for my business in Indore. Let's discuss requirements.";

export function getWhatsAppUrl(message?: string): string {
  const phone = siteConfig.whatsapp.replace(/[^0-9+]/g, '');
  const text = encodeURIComponent(message || whatsappMessage);
  return `https://wa.me/${phone.replace('+', '')}?text=${text}`;
}
