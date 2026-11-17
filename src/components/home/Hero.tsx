import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

const highlights = [
  { value: '24–72 hrs', label: 'Manpower deployment' },
  { value: '100%', label: 'Verified candidates' },
  { value: 'PF & ESIC', label: 'Fully compliant payroll' },
];

export function Hero() {
  return (
    <section className="oo-hero" aria-label="Hero">
      <div className="oo-hero-grid" aria-hidden="true" />
      <div className="oo-hero-orb orb-1" aria-hidden="true" />
      <div className="oo-hero-orb orb-2" aria-hidden="true" />

      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left: content */}
          <div className="col-lg-7">
            <span className="oo-hero-badge">
              <span className="dot" aria-hidden="true" />
              Indore&apos;s Leading Manpower &amp; Staffing Company
            </span>
            <h1 className="oo-hero-title">
              The Right Manpower for Your Business in Indore,{' '}
              <span className="highlight">Right When You Need Them.</span>
            </h1>
            <p className="oo-hero-subtitle">
              One Option provides verified skilled, semi-skilled, and industrial
              manpower for factories, warehouses, offices, and facility management
              across Indore, Pithampur, and Madhya Pradesh. Fast deployment and
              100% PF &amp; ESIC compliance.
            </p>
            <div className="oo-hero-buttons">
              <Link href="/jobs" className="btn btn-primary btn-lg">
                View Recent Jobs <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact?type=Staffing%20%2F%20Manpower%20Inquiry"
                className="btn btn-ghost btn-lg"
              >
                Hire Manpower
              </Link>
            </div>
            <div className="oo-hero-stats">
              {highlights.map((item) => (
                <div key={item.label}>
                  <div className="oo-hero-stat-value">{item.value}</div>
                  <div className="oo-hero-stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: workers image */}
          <div className="col-lg-5">
            <div className="oo-hero-visual">
              <div className="oo-float-chip chip-top">
                <span className="chip-icon">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  Background Verified
                  <small>Every single worker</small>
                </div>
              </div>

              <div className="oo-hero-img-wrap">
                <Image
                  src="/images/workers-hero.jpg"
                  alt="Diverse team of skilled workers — businessman, chef, nurse, construction worker, housekeeper and more"
                  width={560}
                  height={400}
                  priority
                  className="oo-hero-img"
                />
              </div>

              <div className="oo-float-chip chip-bottom">
                <span className="chip-icon">
                  <Clock size={20} />
                </span>
                <div>
                  Quick Deployment
                  <small>
                    <MapPin size={11} style={{ verticalAlign: '-1px' }} /> Indore, MP
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
