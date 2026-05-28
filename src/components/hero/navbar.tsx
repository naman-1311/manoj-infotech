'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MenuButton from '@/components/ui/menu-button';
import MenuOverlay from '@/components/hero/menu-overlay';

const NAV_HEIGHT = 72;
const SIDEBAR_WIDTH = 65;

interface NavbarProps {
  visible: boolean;
  forceLight?: boolean;
  logoHref?: string;
  hideSidebarLine?: boolean;
  forceDarkBg?: string;
  noSidebar?: boolean;
}

export default function Navbar({
  visible,
  logoHref = '/',
  hideSidebarLine = false,
  forceDarkBg,
  noSidebar = false,
}: NavbarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const didAnimateRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when menu open — do NOT touch main opacity (overlay sits on top)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const els = (noSidebar
      ? [navRef.current]
      : [sidebarRef.current, navRef.current]
    ).filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    if (visible) {
      if (!didAnimateRef.current) {
        didAnimateRef.current = true;
        gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 });
      } else {
        gsap.set(els, { opacity: 1 });
      }
    } else {
      els.forEach(el => { el.style.opacity = '0'; });
    }
  }, [visible, noSidebar]);

  // Always dark navbar for tech theme
  const effectiveHeroExited = false;

  const textColor = '#ffffff';
  const borderColor = 'rgba(255,255,255,0.08)';
  const sidebarBorderColor = 'rgba(255,255,255,0.08)';
  const bg = isOpen ? 'rgba(12,12,12,0.97)' : (forceDarkBg ?? 'rgba(12,12,12,0.85)');
  const colorTransition = 'color 0.4s ease, background 0.4s ease, border-color 0.4s ease';
  return (
    <>
      <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* ── Sidebar strip ── */}
      {!noSidebar && (
        <div
          ref={sidebarRef}
          className="hero-sidebar-strip"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: SIDEBAR_WIDTH,
            height: '100vh',
            zIndex: 60,
            background: bg,
            opacity: 0,
            borderRight: hideSidebarLine ? 'none' : `1px solid ${sidebarBorderColor}`,
            transition: colorTransition,
          }}
        >
          <div
            style={{
              height: NAV_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: `1px solid ${borderColor}`,
              transition: colorTransition,
            }}
          >
            <MenuButton
              heroExited={effectiveHeroExited}
              size={52}
              onClick={() => setIsOpen(o => !o)}
              label={isOpen ? 'close' : 'menu'}
            />
          </div>

        </div>
      )}

      {/* ── Navbar ── */}
      <nav
        ref={navRef}
        className="hero-top-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: noSidebar ? 0 : SIDEBAR_WIDTH,
          right: 0,
          height: NAV_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: noSidebar ? '16px' : undefined,
          zIndex: 60,
          background: bg,
          backdropFilter: isOpen ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: isOpen ? 'blur(24px)' : 'none',
          borderBottom: `1px solid ${borderColor}`,
          opacity: 0,
          transition: colorTransition,
        }}
      >
        {noSidebar && (
          <MenuButton
            heroExited={effectiveHeroExited}
            size={44}
            onClick={() => setIsOpen(o => !o)}
            label={isOpen ? 'close' : 'menu'}
          />
        )}

        {/* Mobile hamburger — only when sidebar strip is present but hidden on mobile */}
        {!noSidebar && (
          <button
            className="hero-mobile-hamburger"
            onClick={() => setIsOpen(o => !o)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: textColor, flexShrink: 0, alignItems: 'center', transition: colorTransition }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {isOpen
                ? <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
                : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>
              }
            </svg>
          </button>
        )}

        {/* Center greeting text */}
        <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!isOpen && (
            <span
              className="hero-nav-greeting"
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-label)',
                transition: colorTransition,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: '100%',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ color: '#EF4444', fontSize: 7, verticalAlign: 'middle', display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#EF4444', flexShrink: 0 }} />
              Manoj Infotec
              <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, fontSize: 11, letterSpacing: '0.2em' }}>-</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, fontSize: 11, letterSpacing: '0.18em' }}>House Of Computers</span>
            </span>
          )}
        </span>

        {/* Close hint when menu open */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: `1.5px solid rgba(255,255,255,0.25)`,
              borderRadius: 999,
              padding: '7px 16px',
              fontSize: 12,
              fontFamily: 'var(--font-label)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s',
              marginRight: 12,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.6'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            · close ·
          </button>
        )}

        {/* Logo — right corner */}
        <a
          href={logoHref}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            transition: colorTransition,
            flexShrink: 0,
          }}
        >
          <img
            src="/icons/logo_mini.png"
            alt="Manoj Infotec"
            className="hero-nav-logo"
            style={{
              width: 'auto',
              mixBlendMode: 'screen',
              filter: 'brightness(1.1)',
              display: 'block',
            }}
          />
        </a>
      </nav>
    </>
  );
}
