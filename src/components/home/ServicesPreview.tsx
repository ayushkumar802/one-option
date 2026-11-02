import { Users, Factory, Building2, HardHat } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

const previewServices = [
  {
    title: 'Contract Staffing',
    description:
      'Temporary and contract workforce for short-term projects, seasonal demand and peak business periods.',
    Icon: Users,
  },
  {
    title: 'Industrial Manpower',
    description:
      'Skilled and unskilled workers for factories, plants, warehouses, packaging and logistics operations.',
    Icon: Factory,
  },
  {
    title: 'Corporate & Office Staff',
    description:
      'Reliable office assistants, receptionists, data entry operators, accountants and admin staff.',
    Icon: Building2,
  },
  {
    title: 'Facility & Site Workforce',
    description:
      'Security guards, housekeeping, electricians, plumbers and construction site labour on demand.',
    Icon: HardHat,
  },
];


export function ServicesPreview() {
  return (
    <section className="section section-alt" aria-label="Our services">
      <div className="container">
        <SectionHeading
          label="What We Do"
          title="Complete Manpower & Staffing Solutions in Indore"
          subtitle="From sourcing and screening to deployment and payroll, we handle the entire hiring process so you can focus on your business."
          centered
        />
        <div className="row g-4">
          {previewServices.map((service, index) => (
            <div key={service.title} className="col-md-6 col-lg-3">
              <AnimateOnScroll delay={index * 0.1} className="h-100">
                <div className="service-card">
                  <div className="service-card-icon">
                    <service.Icon size={28} strokeWidth={1.8} />
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-description">
                    {service.description}
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          ))}
        </div>
        <p className="oo-services-note">
          Looking for a reliable <strong>manpower supplier in Indore</strong>?
          One Option provides verified, trained and ready-to-work staff for
          businesses of every size. Get in touch to discuss your workforce
          requirements.
        </p>
      </div>
    </section>
  );
}