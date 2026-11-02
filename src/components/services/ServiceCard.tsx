import * as LucideIcons from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import type { Service } from '@/types';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

type LucideIconName = keyof typeof LucideIcons;

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const IconComponent =
    (LucideIcons[service.icon as LucideIconName] as React.ComponentType<{ size?: number; strokeWidth?: number }>) ||
    LucideIcons.Users;

  return (
    <AnimateOnScroll delay={index * 0.08} className="h-100">
      <div className="service-card d-flex flex-column h-100">
        <div className="service-card-icon mb-4">
          <IconComponent size={28} strokeWidth={1.75} />
        </div>
        <h3 className="service-card-title mb-2">{service.title}</h3>
        <p className="service-card-description mb-4" style={{ color: '#4b5f57', fontSize: '0.92rem' }}>
          {service.description}
        </p>

        {service.features.length > 0 && (
          <ul className="mt-auto" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {service.features.map((feature) => (
              <li
                key={feature}
                style={{
                  fontSize: '0.86rem',
                  color: '#0b2b20',
                  padding: '4px 0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  lineHeight: '1.45',
                }}
              >
                <CheckCircle2 size={15} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AnimateOnScroll>
  );
}
