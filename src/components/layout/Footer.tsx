import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '@/config/site';
import { SocialLinks } from '@/components/ui/SocialLinks';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Recent Jobs' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const serviceLinks = [
  { href: '/services', label: 'Contract Staffing' },
  { href: '/services', label: 'Industrial Manpower' },
  { href: '/services', label: 'Corporate & Office Staff' },
  { href: '/services', label: 'Facility Management' },
  { href: '/services', label: 'Security & Housekeeping' },
];


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="row g-5">
          {/* About Column */}
          <div className="col-lg-4 col-md-6">
            <h2 className="footer-title">
              <span className="logo-text">
                <span className="logo-text-one" style={{ color: '#ffffff' }}>One</span>
                <span className="logo-text-option" style={{ color: '#34d399' }}>Option</span>
              </span>
            </h2>
            <p className="footer-description">{siteConfig.description}</p>
            <div className="mt-4">
              <a
                href={getWhatsAppUrl()}
                className="btn btn-whatsapp btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="col-lg-2 col-md-6">
            <h3 className="footer-heading">Navigation</h3>
            <nav aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Column */}
          <div className="col-lg-3 col-md-6">
            <h3 className="footer-heading">Services</h3>
            {serviceLinks.map((link) => (
              <Link key={link.label} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact Column */}
          <div className="col-lg-3 col-md-6">
            <h3 className="footer-heading">Contact</h3>
            <div className="footer-contact-item">
              <Mail size={16} className="footer-contact-icon" />
              <a href={`mailto:${siteConfig.email}`} className="footer-link">
                {siteConfig.email}
              </a>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="footer-contact-icon" />
              <a href={`tel:${siteConfig.phone}`} className="footer-link">
                {siteConfig.phone}
              </a>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} className="footer-contact-icon" />
              <span>
                {siteConfig.address.street ? `${siteConfig.address.street}, ` : ''}
                {siteConfig.address.city}, {siteConfig.address.state},{' '}
                {siteConfig.address.country}
              </span>
            </div>
            {siteConfig.businessHours && (
              <p className="mt-3" style={{ fontSize: 'var(--fs-xs)', color: 'rgba(255,255,255,0.4)' }}>
                {siteConfig.businessHours}
              </p>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright mb-0">
            &copy; {currentYear} {siteConfig.name} (manpowerindore.in). All rights reserved.
          </p>
          {/* <SocialLinks /> */}
        </div>
      </div>
    </footer>
  );
}
