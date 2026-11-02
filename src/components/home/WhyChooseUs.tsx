import {
  ShieldCheck,
  Clock,
  UserCheck,
  BadgeCheck,
  Handshake,
  Headphones,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

const reasons = [
  {
    title: 'Verified & Trusted Staff',
    description: 'Thorough background and document verification for every worker we deploy.',
    Icon: ShieldCheck,
  },
  {
    title: 'Fast Turnaround',
    description: 'Urgent requirement? We deploy manpower within 24–72 hours.',
    Icon: Clock,
  },
  {
    title: 'Right Skill, Right Role',
    description: 'Candidates are screened and tested to match your exact job requirements.',
    Icon: UserCheck,
  },
  {
    title: '100% Statutory Compliance',
    description: 'PF, ESIC, minimum wages and labour law compliance fully managed by us.',
    Icon: BadgeCheck,
  },
  {
    title: 'Long-Term Partnership',
    description: 'Flexible contracts and dedicated account managers for every client.',
    Icon: Handshake,
  },
  {
    title: 'Dedicated Support',
    description: 'Quick replacements and responsive support whenever you need us.',
    Icon: Headphones,
  },
];

export function WhyChooseUs() {
  return (
    <section className="section" aria-label="Why choose us">
      <div className="container">
        <SectionHeading
          label="Why Us"
          title="Why Choose One Option for Manpower"
          subtitle="We combine a strong talent network with fast, compliant and dependable staffing services."
          centered
        />
        <div className="row g-4">
          {reasons.map((reason, index) => (
            <div key={reason.title} className="col-md-6 col-lg-4">
              <AnimateOnScroll delay={index * 0.08}>
                <div className="why-card">
                  <div className="why-card-icon">
                    <reason.Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="why-card-title">{reason.title}</h3>
                  <p className="why-card-description">{reason.description}</p>
                </div>
              </AnimateOnScroll>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}