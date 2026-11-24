'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Recent Jobs' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // Resilient check for Home page: handles root '/', empty string '', or null during SSR/external link entry
  const isHome = !pathname || pathname === '/' || pathname === '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = `site-header ${scrolled || !isHome ? 'scrolled' : ''}`;

  return (
    <>
      <header className={headerClass} role="banner">
        <div className="container d-flex align-items-center justify-content-between w-100">
          <Link href="/" className="header-logo" aria-label="OneOption — Manpower Indore">
            <span className="logo-text">
              <span className="logo-text-one">One</span>
              <span className="logo-text-option">Option</span>
            </span>
            <span className="header-tagline d-none d-sm-block">
              {siteConfig.tagline}
            </span>
          </Link>

          <nav className="d-none d-lg-flex align-items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`header-nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="header-toggler d-lg-none"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(true);
            }}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        currentPath={pathname}
      />
    </>
  );
}
