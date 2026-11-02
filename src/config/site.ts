import type { SiteConfig } from '@/types';
import { APP_URL } from '@/config/constant';

export const siteConfig: SiteConfig = {
  name: 'One Option',
  tagline: 'Trusted Manpower & Staffing Solutions in Indore',
  description:
    'One Option provides reliable, verified, and skilled, semi-skilled, and unskilled manpower for factories, warehouses, corporate offices, and facility management across Indore and MP.',
  url: APP_URL,
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contact@oneoption.in',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 6299147709',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 6299147709',
  address: {
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
  },
  socialLinks: {},
  seo: {
    titleTemplate: '%s | One Option',
    defaultTitle: 'One Option | Manpower & Staffing Solutions in Indore',
    defaultDescription:
      'Premier manpower supplier and staffing agency in Indore, Madhya Pradesh. We provide verified workers, contract staffing, and industrial labour across Indore and MP.',
    ogImage: '/images/hero/hero-manpower.png',
  },
  serviceAreas: [
    'Indore',
    'Pithampur',
    'Dewas',
    'Madhya Pradesh',
  ],
  businessHours: 'Monday – Saturday, 9:00 AM – 7:00 PM',
};

export const whatsappMessage =
  "Hi One Option team, I need manpower for my business in Indore. Let's discuss requirements.";

export function getWhatsAppUrl(message?: string): string {
  const phone = siteConfig.whatsapp.replace(/[^0-9+]/g, '');
  const text = encodeURIComponent(message || whatsappMessage);
  return `https://wa.me/${phone.replace('+', '')}?text=${text}`;
}
