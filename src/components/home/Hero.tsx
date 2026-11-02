import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock,
  Factory,
  HardHat,
  Hotel,
  MapPin,
  ShieldCheck,
  Sparkles,
  Warehouse,
} from 'lucide-react';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

const highlights = [
  { value: '24–72 hrs', label: 'Manpower deployment' },
  { value: '100%', label: 'Verified candidates' },
  { value: 'PF & ESIC', label: 'Fully compliant payroll' },
];

const industries = [
  { label: 'Manufacturing', Icon: Factory },
  { label: 'Warehousing', Icon: Warehouse },
  { label: 'Corporate', Icon: Building2 },
  { label: 'Construction', Icon: HardHat },
  { label: 'Hospitality', Icon: Hotel },
  { label: 'Facility Mgmt', Icon: Sparkles },
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
              Indore&apos;s Trusted Manpower &amp; Staffing Company
            </span>
            <h1 className="oo-hero-title">
              The Right People for Your Business,{' '}
              <span className="highlight">Right When You Need Them.</span>
            </h1>
            <p className="oo-hero-subtitle">
              One Option provides skilled, semi-skilled and unskilled manpower
              for factories, warehouses, offices, construction sites, hotels and
              facility management across Indore and Madhya Pradesh. Verified
              workers, quick deployment and full compliance.
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

          {/* Right: designed visual (replaces the old photo) */}
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

              <div className="oo-glass-card">
                <div className="oo-glass-card-head">
                  <h2 className="oo-glass-card-title">Industries We Staff</h2>
                  <span className="oo-glass-card-tag">Now Hiring</span>
                </div>
                <div className="oo-industry-grid">
                  {industries.map(({ label, Icon }) => (
                    <div key={label} className="oo-industry">
                      <Icon size={26} strokeWidth={1.6} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="oo-glass-card-foot">
                  <div className="oo-avatars" aria-hidden="true">
                    <span>RS</span>
                    <span>AK</span>
                    <span>PM</span>
                    <span>+</span>
                  </div>
                  <p>
                    <BadgeCheck size={14} style={{ color: 'var(--oo-lime)', marginRight: 4, verticalAlign: '-2px' }} />
                    Trained, ready-to-work staff for businesses of every size.
                  </p>
                </div>
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