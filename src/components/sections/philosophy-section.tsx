'use client';

import { useRef } from 'react';
import { useInView } from '@/hooks/useInView';

const TAGLINES = [
  { number: '01', text: 'Technology should empower, not complicate.' },
  { number: '02', text: 'Genuine products. Honest pricing. Always.' },
  { number: '03', text: 'We don\'t just sell — we support.' },
  { number: '04', text: 'Two decades of trust, one address.' },
];

export default function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, 0.1);

  return (
    <section
      ref={ref}
      className="py-16 md:py-28 px-6 lg:px-24"
      style={{ background: 'var(--brand-bg)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle accent line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, #DC2626, transparent)',
          opacity: isInView ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Label */}
        <p
          className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.85rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#DC2626',
            marginBottom: '1.5rem',
          }}
        >
          Our Philosophy
        </p>

        {/* Taglines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {TAGLINES.map((item, i) => (
            <div
              key={item.number}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 24,
                borderTop: '1px solid var(--brand-border)',
                padding: '28px 0',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateX(0)' : 'translateX(-24px)',
                transition: `opacity 0.6s ease ${200 + i * 120}ms, transform 0.6s ease ${200 + i * 120}ms`,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: '#DC2626',
                  opacity: 0.7,
                  flexShrink: 0,
                  paddingTop: 4,
                  minWidth: 28,
                }}
              >
                {item.number}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)',
                  fontWeight: 700,
                  color: 'var(--brand-text)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: '1px solid var(--brand-border)' }} />
        </div>
      </div>
    </section>
  );
}
