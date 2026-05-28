'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function HeroText() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const src = isMobile ? '/Mobile-Vid.mp4' : '/Video-Project.mp4';
    video.src = src;
    video.muted = true;
    video.load();
    video.play().catch(() => {
      const resume = () => { video.play().catch(() => {}); document.removeEventListener('touchstart', resume); };
      document.addEventListener('touchstart', resume, { once: true });
    });
  }, []);

  useEffect(() => {
    const els = [line1Ref.current, line2Ref.current, subtitleRef.current, ctaRef.current];
    if (els.some(el => !el)) return;

    const tl = gsap.timeline();
    tl.fromTo(line1Ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .fromTo(line2Ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }, '-=0.55')
      .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.35')
      .fromTo(ctaRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }, []);

  return (
    <>
      <section
        className="hero-main-section"
        style={{
          minHeight: '100svh',
          height: '100svh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          paddingBottom: 72,
          paddingLeft: 'calc(48px + 40px)',
          paddingRight: 40,
          textAlign: 'left',
          background: '#0C0C0C',
        }}
      >
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover',
            zIndex: 0,
            transform: 'translate(-50%, -50%)',
          }}
        />


        {/* Mobile fallback — shown when video is hidden on mobile */}
        <div
          className="hero-mobile-bg"
          style={{
            position: 'absolute',
            inset: 0,
            background: [
              'radial-gradient(ellipse 120% 60% at 10% 90%, rgba(220,38,38,0.45) 0%, transparent 55%)',
              'radial-gradient(ellipse 80% 50% at 90% 10%, rgba(180,20,20,0.2) 0%, transparent 50%)',
              'linear-gradient(170deg, #0C0C0C 0%, #18050505 40%, #2a0808 70%, #0C0C0C 100%)',
            ].join(', '),
            zIndex: 0,
          }}
        >
          {/* Subtle grid lines for texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(220,38,38,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(220,38,38,0.04) 40px)',
          }} />
        </div>

        {/* Dark overlay — deepens the video */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.52)',
            zIndex: 1,
          }}
        />

        {/* Bottom vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, transparent 55%)',
            zIndex: 2,
          }}
        />

        {/* Content — bottom-left */}
        <div style={{ position: 'relative', zIndex: 3, maxWidth: 640 }}>

          {/* Primary headline */}
          <div style={{ overflow: 'hidden' }}>
            <div
              ref={line1Ref}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(42px, 6vw, 86px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                paddingBottom: '0.2rem',
              }}
            >
              Manoj<br />
              <span style={{ color: '#EF4444' }}>Infotec</span>
            </div>
          </div>

          {/* Label chip — below headline */}
          <div style={{ overflow: 'hidden', marginTop: 16 }}>
            <div
              ref={line2Ref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(185,28,28,0.18)',
                border: '1px solid rgba(239,68,68,0.35)',
                borderRadius: 999,
                padding: '6px 16px',
                fontFamily: 'var(--font-label)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#FCA5A5',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
              House of Computers
            </div>
          </div>

          {/* Body copy */}
          <div
            ref={subtitleRef}
            style={{
              marginTop: 24,
            }}
          >
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
              margin: 0,
              lineHeight: 1.75,
              maxWidth: 480,
            }}>
              Chennai&apos;s trusted IT partner since 2000.<br />
              Laptops, desktops, peripherals, networking &amp; complete IT solutions — all under one roof at Mount Road, Chennai.
            </p>
          </div>

          {/* CTA row */}
          <div
            ref={ctaRef}
            style={{
              marginTop: 40,
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <a
              href="#enquire"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#DC2626',
                color: '#ffffff',
                border: '1.5px solid #DC2626',
                fontFamily: 'var(--font-label)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 999,
                padding: '14px 32px',
                transition: 'background 0.25s ease, box-shadow 0.25s ease',
                boxShadow: '0 0 24px rgba(220,38,38,0.5)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = '#B91C1C';
                el.style.boxShadow = '0 0 36px rgba(220,38,38,0.75)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = '#DC2626';
                el.style.boxShadow = '0 0 24px rgba(220,38,38,0.5)';
              }}
            >
              Enquire Now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
            <a
              href="#services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                fontFamily: 'var(--font-label)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 999,
                padding: '14px 28px',
                transition: 'border-color 0.25s ease, color 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'rgba(255,255,255,0.45)';
                el.style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'rgba(255,255,255,0.2)';
                el.style.color = 'rgba(255,255,255,0.7)';
              }}
            >
              See Our Services
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
