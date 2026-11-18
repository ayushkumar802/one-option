import { CircleCheck, MapPin, ShieldCheck } from 'lucide-react';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

const principles = [
  { title: 'Verified Workers', text: 'Every candidate goes through ID, background and reference checks.' },
  { title: 'Quick Deployment', text: 'Manpower ready to join within 24–72 hours of your request.' },
  { title: 'Skill Matching', text: 'We match candidates to the exact skills your role demands.' },
  { title: 'Full Compliance', text: 'PF, ESIC and labour law compliance handled end to end.' },
  { title: 'Replacement Support', text: 'Free replacement if a worker does not meet expectations.' },
  { title: 'Transparent Pricing', text: 'Clear, upfront rates with no hidden charges.' },
];

const panelPoints = [
  'Skilled, semi-skilled & unskilled staff',
  'Temporary, contract & permanent hiring',
  'Payroll, attendance & compliance managed',
  'Dedicated account manager for every client',
];

export function DesignPhilosophy() {
  return (
    <section className="section oo-promise-section" aria-label="Our hiring promise">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <AnimateOnScroll>
              {/* Designed panel (replaces the old furniture photo) */}
              <div className="oo-promise-panel">
                <div>
                  <span className="oo-promise-kicker">One Option Manpower</span>
                  <p className="oo-promise-big">
                    One call.<br />
                    <span>The right workforce.</span>
                  </p>
                  <ul className="oo-promise-list">
                    {panelPoints.map((point) => (
                      <li key={point}>
                        <CircleCheck size={20} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="oo-promise-location">
                  <MapPin size={16} /> Serving Indore &amp; all of Madhya Pradesh
                </span>
              </div>
            </AnimateOnScroll>
          </div>
          <div className="col-lg-7">
            <AnimateOnScroll delay={0.2}>
              <span className="section-label">Our Approach</span>
              <h2 className="section-title">Our Hiring Promise</h2>
              <p className="section-subtitle mb-5">
                We don&apos;t just fill positions. We provide dependable people who
                fit your workplace, your culture and your goals.
              </p>
              <div className="row g-3">
                {principles.map((item) => (
                  <div key={item.title} className="col-sm-6">
                    <div className="oo-principle">
                      <span className="oo-principle-icon">
                        <ShieldCheck size={18} />
                      </span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
