'use client';

import { useEffect, useRef, RefObject } from 'react';

// ── Canvas spotlight service card ──────────────────────────────────────────
function ServiceCard({
  card,
  cardRef,
  onClose,
}: {
  card: { label: string; href: string; tag: string };
  cardRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({
    currentR: 0,
    targetR: 0,
    mouseX: 0,
    mouseY: 0,
    maxR: 0,
    running: false,
    filled: false,
  });

  // Draw loop — spring physics
  const tick = () => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;

    const diff = s.targetR - s.currentR;
    s.currentR += diff * 0.12;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (s.currentR > 0.5) {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.beginPath();
      ctx.arc(s.mouseX, s.mouseY, s.currentR, 0, Math.PI * 2);
      ctx.fillStyle = '#DC2626'; // brand red fill
      ctx.fill();
      ctx.restore();
    }

    // Flip text colours based on fill progress
    const card = cardRef.current;
    if (card) {
      const label = card.querySelector('.card-label') as HTMLElement | null;
      const title = card.querySelector('.card-title') as HTMLElement | null;
      const isFilled = s.currentR > s.maxR * 0.45;
      if (isFilled && !s.filled) {
        s.filled = true;
        if (label) label.style.color = 'rgba(255,255,255,0.6)';
        if (title) title.style.color = '#ffffff';
      } else if (!isFilled && s.filled) {
        s.filled = false;
        if (label) label.style.color = 'rgba(255,255,255,0.4)';
        if (title) title.style.color = '#ffffff';
      }
    }

    if (Math.abs(diff) < 0.4) {
      s.running = false;
      // Final clear when fully closed
      if (s.targetR === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        s.filled = false;
        if (card) {
          const label = card.querySelector('.card-label') as HTMLElement | null;
          const title = card.querySelector('.card-title') as HTMLElement | null;
          if (label) label.style.color = 'rgba(255,255,255,0.4)';
          if (title) title.style.color = '#ffffff';
        }
      }
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const startLoop = () => {
    const s = stateRef.current;
    if (s.running) return;
    s.running = true;
    rafRef.current = requestAnimationFrame(tick);
  };

  // Setup: ResizeObserver + event listeners on the card div
  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    const syncSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      stateRef.current.maxR = Math.sqrt(w ** 2 + h ** 2) * 1.05;
    };

    syncSize();

    const ro = new ResizeObserver(syncSize);
    ro.observe(card);

    const onEnter = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      stateRef.current.mouseX = e.clientX - rect.left;
      stateRef.current.mouseY = e.clientY - rect.top;
      stateRef.current.targetR = stateRef.current.maxR;
      startLoop();
    };

    const onLeave = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      stateRef.current.mouseX = e.clientX - rect.left;
      stateRef.current.mouseY = e.clientY - rect.top;
      stateRef.current.targetR = 0;
      startLoop();
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="menu-service-card"
      style={{
        background: '#1a1a1a',
        borderRadius: 20,
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Canvas spotlight — z-index 0, below content */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          borderRadius: 'inherit',
          zIndex: 0,
        }}
      />

      {/* Label bottom-left */}
      {/* Full-card link — covers entire card for click */}
      <a
        href={card.href}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, zIndex: 2 }}
      />

      <div style={{ marginTop: 'auto', position: 'relative', zIndex: 3, pointerEvents: 'none' }}>
        <p className="card-label" suppressHydrationWarning style={{
          fontFamily: 'var(--font-body-alt)',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '0.6rem',
          transition: 'color 0.25s ease',
        }}>
          {card.tag}
        </p>
        <p className="card-title" style={{
          fontFamily: 'var(--font-body-alt)',
          fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
          fontWeight: 300,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          transition: 'color 0.25s ease',
        }}>
          {card.label}
        </p>
      </div>
    </div>
  );
}

export interface NavLink { label: string; href: string; }
export interface ServiceCard { label: string; href: string; tag: string; }

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks?: NavLink[];
  serviceCards?: ServiceCard[];
  topOffset?: number;
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Enquire', href: '/#enquire' },
];

const DEFAULT_SERVICE_CARDS: ServiceCard[] = [
  { label: 'Laptops & Desktops', href: '/#services', tag: 'Products' },
  { label: 'Networking & CCTV', href: '/#services', tag: 'Solutions' },
  { label: 'IT Support & AMC', href: '/#services', tag: 'Services' },
  { label: 'Get a Quote', href: '/#enquire', tag: 'Enquire Now' },
];

// Canvas dot-grid — radial fade drawn mathematically, clean and smooth
function DotGrid({ width = 90, height = 80, step = 9, dotR = 2.2 }: {
  width?: number; height?: number; step?: number; dotR?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Center of the grid
    const cx = width / 2;
    const cy = height / 2;
    const maxDist = Math.hypot(cx, cy);

    for (let x = step / 2; x < width; x += step) {
      for (let y = step / 2; y < height; y += step) {
        const dist = Math.hypot(x - cx, y - cy);
        const norm = dist / maxDist; // 0 = center, 1 = corner
        // Dots are brightest at center, fade to near-invisible at edges
        const opacity = Math.pow(1 - norm, 1.4) * 0.85 + 0.08;
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
        ctx.fill();
      }
    }
  }, [width, height, step, dotR]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}

export default function MenuOverlay({ isOpen, onClose, navLinks = DEFAULT_NAV_LINKS, serviceCards = DEFAULT_SERVICE_CARDS, topOffset = 56 }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const sRef0 = useRef<HTMLDivElement>(null);
  const sRef1 = useRef<HTMLDivElement>(null);
  const sRef2 = useRef<HTMLDivElement>(null);
  const sRef3 = useRef<HTMLDivElement>(null);
  const serviceRefs = [sRef0, sRef1, sRef2, sRef3];
  // Track whether menu has ever been opened — skip close animation on initial mount
  const hasOpenedRef = useRef(false);

  // Set initial hidden state on mount only
  useEffect(() => {
    const main = mainCardRef.current;
    const services = serviceRefs.map(r => r.current);
    if (!main || services.some(s => !s)) return;
    [main, ...services as HTMLDivElement[]].forEach(card => {
      card.style.transform = 'scale(0)';
      card.style.opacity = '0';
      card.style.transformOrigin = 'top left';
      card.style.transition = 'none';
    });
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const main = mainCardRef.current;
    const services = serviceRefs.map(r => r.current);
    if (!overlay || !main || services.some(s => !s)) return;

    const allCards = [main, ...services] as HTMLDivElement[];

    if (isOpen) {
      hasOpenedRef.current = true;
      overlay.style.pointerEvents = 'all';
      overlay.style.opacity = '1';

      allCards.forEach((card, i) => {
        const delay = i * 50;
        card.style.transformOrigin = 'top left';
        card.style.transition = `transform 0.5s cubic-bezier(0.34,1.3,0.64,1) ${delay}ms, opacity 0.4s ease ${delay}ms`;
        void card.offsetHeight;
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
      });
    } else {
      // Skip close animation on initial mount (menu was never opened)
      if (!hasOpenedRef.current) return;

      // Remove blur instantly on close
      overlay.style.backdropFilter = 'none';
      (overlay.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = 'none';
      overlay.style.backgroundColor = 'transparent';

      const reverseDelays = [200, 150, 100, 50, 0];
      allCards.forEach((card, i) => {
        const delay = reverseDelays[i] ?? 0;
        card.style.transformOrigin = 'bottom right';
        card.style.transition = `transform 0.45s cubic-bezier(0.4,0,0.2,1) ${delay}ms, opacity 0.3s ease ${delay}ms`;
        void card.offsetHeight;
        card.style.transform = 'scale(0)';
        card.style.opacity = '0';
      });

      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = 'none';
          overlayRef.current.style.opacity = '0';
          // Restore blur for next open
          overlayRef.current.style.backdropFilter = 'blur(24px)';
          (overlayRef.current.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = 'blur(24px)';
          overlayRef.current.style.backgroundColor = 'rgba(0,0,0,0.82)';
        }
      }, 650);
    }
  }, [isOpen]);


  return (
    <div
      ref={overlayRef}
      className="menu-overlay-panel"
      style={{
        position: 'fixed',
        top: topOffset,
        left: 65,
        right: 0,
        bottom: 0,
        zIndex: 80,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 16,
        padding: 16,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.2s ease',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(0,0,0,0.82)',
      }}
    >
      {/* ── Main nav card ── */}
      <div
        ref={mainCardRef}
        className="menu-main-card"
        style={{
          gridColumn: '1',
          gridRow: '1 / span 2',
          background: '#1a1a1a',
          borderRadius: 20,
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        {/* Logo at top of menu card */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '38px 0 8px' }}>
          <img
            src="/icons/logo_bg.png"
            alt="Manoj Infotec"
            style={{
              height: 240,
              width: 'auto',
              mixBlendMode: 'screen',
              filter: 'brightness(1.15)',
              display: 'block',
            }}
          />
        </div>

        {/* Nav links */}
        <nav style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
          {navLinks.map((link) => (
            <div key={link.label} style={{ borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
              <a
                href={link.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 0',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body-alt)',
                  fontSize: 'clamp(1rem, 3.5vw, 1.75rem)',
                  fontWeight: 300,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.5'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
              >
                {link.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem', flexShrink: 0 }}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
              </a>
            </div>
          ))}
          <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.1)' }} />
        </nav>

        {/* Contact footer */}
        <div style={{ marginTop: '0.75rem' }}>
          <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.13em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.3rem' }}>Contact us</p>
          <a
            href="mailto:sales@manojinfotec.com"
            style={{ fontFamily: 'var(--font-body-alt)', fontSize: '0.9rem', color: '#ffffff', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.6'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
          >
            sales@manojinfotec.com
          </a>
        </div>
      </div>

      {/* ── 4 service cards ── */}
      {serviceCards.map((card, i) => (
        <ServiceCard
          key={card.label}
          card={card}
          cardRef={serviceRefs[i]}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
