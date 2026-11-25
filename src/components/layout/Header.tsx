'use client';

import { useState, useEffect, useRef } from 'react';
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

/** Helper to determine if a route is a subpage (jobs, services, about, contact) */
function isKnownSubpage(path: string | null | undefined): boolean {
  if (!path) return false;
  return (
    path.startsWith('/jobs') ||
    path.startsWith('/services') ||
    path.startsWith('/about') ||
    path.startsWith('/contact')
  );
}

export function Header() {
  const pathname = usePathname();
  // Safe default: On SSR / build time, default to Home page (transparent navbar)
  // unless explicitly building/rendering a known subpage
  const ssrIsHome = !isKnownSubpage(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(ssrIsHome);
  const coldLoad = useRef(true);

  // Sync isHome using browser window.location for 100% reliability against router cache
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserPath = window.location.pathname;
      setIsHome(!isKnownSubpage(browserPath));
    } else {
      setIsHome(!isKnownSubpage(pathname));
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prevent browser scroll restoration for future navigations
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // On initial cold load of the home page, force scroll to top.
    if (coldLoad.current) {
      coldLoad.current = false;
      if (isHome && window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    }

    const handleScroll = () => {
      // Hero is ~800px tall. Use 200px threshold on home so tiny browser offsets
      // (address-bar collapse, touch drift) don't flip the navbar to white.
      const threshold = isHome ? 200 : 40;
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const headerClass = `site-header ${scrolled || !isHome ? 'scrolled' : ''}`;

  return (
    <>
      <header className={headerClass} role="banner" suppressHydrationWarning>
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
