import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

const steps = [
  {
    number: '01',
    title: 'Requirement & Sourcing',
    description:
      'We understand your manpower needs and source suitable candidates from our database and job networks.',
  },
  {
    number: '02',
    title: 'Screening & Selection',
    description:
      'Candidates are interviewed, skill-tested and verified before we shortlist the right profiles for you.',
  },
  {
    number: '03',
    title: 'Deployment & Support',
    description:
      'Selected workers are deployed on time, while we manage attendance, payroll, compliance and replacements.',
  },
];


export function ProcessSection() {
  return (
    <section className="section section-alt" aria-label="Our process">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <SectionHeading
              label="How We Work"
              title="Our Hiring Process"
              subtitle="A simple, transparent process that delivers the right people to your Indore workplace quickly and reliably."
            />
            <Link
              href="/contact?type=Staffing%20%2F%20Manpower%20Inquiry"
              className="btn btn-primary btn-lg oo-process-cta mb-5"
            >
              Share Your Requirement <ArrowRight size={18} />
            </Link>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="oo-timeline">
              {steps.map((step, index) => (
                <AnimateOnScroll key={step.number} delay={index * 0.1}>
                  <div className="process-step">
                    <span className="process-step-number">{step.number}</span>
                    <div className="oo-step-body">
                      <h3 className="process-step-title">{step.title}</h3>
                      <p className="process-step-description">{step.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
