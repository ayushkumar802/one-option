import type { Service } from '@/types';

export const services: Service[] = [
  {
    slug: 'contract-staffing',
    title: 'Contract & Temporary Staffing',
    description:
      'Flexible, on-demand workforce solutions to manage seasonal spikes, project deadlines, and fluctuating business demands.',
    longDescription:
      'One Option handles sourcing, screening, documentation, and payroll for temporary and contract workers. Whether you need 5 people or 100 for a month or an entire year, we deploy verified staff quickly without increasing your permanent headcount or administrative overhead.',
    icon: 'Users',
    features: [
      'Rapid 24–72 hour candidate deployment',
      'Zero client overhead on PF, ESIC & statutory compliance',
      'Flexible contracts — scale up or down as needed',
      'Free & immediate replacement guarantee',
      'Dedicated account manager for every client',
    ],
  },
  {
    slug: 'industrial-manpower',
    title: 'Industrial & Factory Manpower',
    description:
      'Skilled, semi-skilled, and general labour for manufacturing units, industrial plants, assembly lines, and packaging operations in Indore & Pithampur.',
    longDescription:
      'Manufacturing thrives on reliable, disciplined workers. We supply rigorously screened plant labour, machine helpers, packaging staff, and maintenance support who understand factory protocols, shift work, and industrial safety standards.',
    icon: 'Factory',
    features: [
      'Machine operators & production helpers',
      'Packaging, sorting & assembly staff',
      'Strict adherence to industrial safety norms',
      'Round-the-clock shift staffing & attendance tracking',
      'Full statutory compliance & worker insurance',
    ],
  },
  {
    slug: 'warehouse-logistics',
    title: 'Warehouse & Logistics Staffing',
    description:
      'Dependable workers for fulfillment centers, warehouses, cold storage, supply chain hubs, and inventory loading operations.',
    longDescription:
      'E-commerce and logistics demand high physical resilience and accuracy. Our warehouse workforce handles material movement, inventory segregation, order picking, and heavy loading/unloading with speed and discipline.',
    icon: 'Warehouse',
    features: [
      'Pickers, packers & sorting associates',
      'Loading, unloading & material handling labour',
      'Forklift & equipment operators',
      'Warehouse supervisors & inventory assistants',
      'Flexible day/night shift deployment',
    ],
  },
  {
    slug: 'corporate-office-staff',
    title: 'Corporate & Office Staffing',
    description:
      'Professional administrative, clerical, and back-office support staff for corporate offices, IT firms, and businesses in Indore.',
    longDescription:
      'Finding capable office assistants and front-desk talent shouldn’t distract your HR team. We shortlist pre-interviewed candidates with proven communication skills, computer literacy, and background verification ready for immediate joining.',
    icon: 'Building2',
    features: [
      'Front desk executives & receptionists',
      'Data entry operators & office clerks',
      'Accounting assistants & billing executives',
      'Telecalling & customer support representatives',
      'Thorough identity & credential verification',
    ],
  },
  {
    slug: 'security-services',
    title: 'Security Guard Services',
    description:
      'Trained, vigilant, and disciplined security personnel for factories, corporate complexes, warehouses, and commercial properties.',
    longDescription:
      'Security is the first line of defense for your workplace. Our guards are trained in visitor entry management, gate registers, material inward/outward checks, perimeter patrolling, and emergency fire-safety protocols.',
    icon: 'ShieldCheck',
    features: [
      'Verified & police-cleared security guards',
      'Gatekeeping, visitor log & vehicle checking',
      '24/7 day & night shift vigilance',
      'Crisp uniforms and professional discipline',
      'Regular supervisor inspections and relief guards',
    ],
  },
  {
    slug: 'facility-housekeeping',
    title: 'Facility Management & Housekeeping',
    description:
      'Comprehensive commercial housekeeping, office cleaning, sanitation, and on-site facility maintenance staff.',
    longDescription:
      'Maintain an immaculate, hygienic workplace without managing cleaning staff in-house. We supply trained housekeeping attendants, pantry boys, electricians, and maintenance helpers who keep your commercial facility operating smoothly every day.',
    icon: 'Sparkles',
    features: [
      'Daily office cleaning & floor sanitation',
      'Pantry attendants & office helpers',
      'On-call electricians & plumbing technicians',
      'Hygienic procedures and eco-friendly supplies',
      'Daily checklist & supervisor monitoring',
    ],
  },
  {
    slug: 'catering-hospitality',
    title: 'Catering & Hospitality Staffing',
    description:
      'Courteous serving staff, banquet helpers, kitchen stewards, and hospitality workforce for hotels, restaurants, and catering events.',
    longDescription:
      'Guest experience hinges on service staff quality. We provide well-groomed, polite, and trained hospitality staff for banquets, catering companies, commercial kitchens, and hotels across Indore and Madhya Pradesh.',
    icon: 'Hotel',
    features: [
      'Event & banquet service staff',
      'Kitchen stewards & dishwashing crew',
      'Hotel housekeeping & lobby attendants',
      'Trained in personal hygiene & etiquette',
      'Scalable staffing for peak event dates',
    ],
  },
  {
    slug: 'driver-transport-manpower',
    title: 'Commercial Drivers & Transit Staff',
    description:
      'Verified drivers with valid commercial licenses for company transport, delivery logistics, and vehicle fleet operations.',
    longDescription:
      'Trustworthy transit personnel are essential for transport safety. We supply pre-vetted light and heavy vehicle commercial drivers who are familiar with local and regional MP routes and have clean driving histories.',
    icon: 'Truck',
    features: [
      'Commercial light & heavy vehicle drivers',
      'Company bus & staff transit drivers',
      'Delivery logistics & distribution riders',
      'License, identity & RTO record verification',
      'Punctual and safety-conscious personnel',
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
