import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Hero } from '@/components/home/Hero';
import { FeaturedJobs } from '@/components/home/FeaturedJobs';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { DesignPhilosophy } from '@/components/home/DesignPhilosophy';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { HomeCTA } from '@/components/home/HomeCTA';
import '@/components/home/home.css';

export const metadata: Metadata = {
  title: { absolute: 'Manpower Indore | OneOption - Top Staffing & Labour Solutions' },
  description:
    'Indore’s leading manpower supplier and staffing solutions partner. OneOption (manpowerindore.in) provides verified industrial labour, factory workers, and warehouse staffing across Indore, Pithampur & MP.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedJobs />
      <ServicesPreview />
      <DesignPhilosophy />
      <ProcessSection />
      <WhyChooseUs />
      <Testimonials />
      <HomeCTA />
    </div>
  );
}