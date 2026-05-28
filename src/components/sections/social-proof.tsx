'use client';

import { useRef, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';
import WordReveal from '@/components/ui/word-reveal';

const TESTIMONIALS = [
  {
    quote:
      "Manoj Infotec built me a gaming rig within my ₹80k budget and it runs every game at ultra settings. The attention to detail in cable management alone is worth it.",
    name: 'Rohan M.',
    detail: 'Gaming Rig Customer',
  },
  {
    quote:
      "I needed a Blender + DaVinci workstation urgently. They delivered a fully tested build in 3 days. Renders that took 2 hours now finish in 20 minutes.",
    name: 'Priya K.',
    detail: 'Workstation Customer',
  },
  {
    quote:
      "Our office needed 5 budget builds fast. Manoj Infotec handled everything — procurement, assembly, OS install. Couldn't ask for better service.",
    name: 'Sameer D.',
    detail: 'Business Client',
  },
];

function TestimonialCard({ t, i, isInView }: { t: typeof TESTIMONIALS[0]; i: number; isInView: boolean }) {
  return (
    <div
      className="rounded-2xl p-8 flex flex-col justify-between"
      style={{
        background: 'var(--brand-bg)',
        border: '1px solid var(--brand-border)',
        cursor: 'default',
        height: '100%',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${300 + i * 120}ms, transform 0.55s ease ${300 + i * 120}ms`,
      }}
    >
      <div style={{ marginBottom: 16, display: 'flex', gap: 4 }}>
        {Array.from({ length: 5 }).map((_, si) => (
          <span key={si} style={{ color: '#DC2626', fontSize: '0.85rem' }}>★</span>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--brand-text)', lineHeight: 1.8, flex: 1 }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ borderTop: '1px solid var(--brand-border)', marginTop: '1.5rem', paddingTop: '1rem' }}>
        <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--brand-text)' }}>{t.name}</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--brand-muted)', marginTop: '0.125rem' }}>{t.detail}</p>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, 0.05, '0px 0px -50% 0px');

  const handleTouchStart = useCallback(() => {
    marqueeRef.current?.classList.add('paused');
  }, []);

  const handleTouchEnd = useCallback(() => {
    marqueeRef.current?.classList.remove('paused');
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 md:py-28 px-6 lg:px-24"
      style={{ background: 'var(--brand-surface)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label */}
        <p
          className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#DC2626',
            marginBottom: '0.75rem',
          }}
        >
          Testimonials
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '3.5rem',
          }}
        >
          <WordReveal text="Real builds," isInView={isInView} baseDelay={80} stagger={60} style={{ color: 'var(--brand-text)', display: 'inline' }} />
          <WordReveal text="real results." isInView={isInView} baseDelay={200} stagger={60} style={{ color: '#DC2626', display: 'inline', marginLeft: '0.25em' }} />
        </h2>

        {/* Desktop Cards */}
        <div className="testimonials-desktop grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} i={i} isInView={isInView} />
          ))}
        </div>

        {/* Mobile infinite scroll */}
        <div className="testimonials-mobile" style={{ overflow: 'hidden', margin: '0 -24px' }}>
          <div
            ref={marqueeRef}
            className="testimonials-marquee"
            style={{ display: 'flex', gap: 16, width: 'max-content' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} style={{ width: '85vw', flexShrink: 0 }}>
                <TestimonialCard t={t} i={0} isInView={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
