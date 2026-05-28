'use client';

import { useRef } from 'react';
import { useInView } from '@/hooks/useInView';

const WA_NUMBER = '917200042381';
const WA_MESSAGE = encodeURIComponent(
  'Hi Manoj Infotec! I\'m looking for IT products/solutions. Please guide me.'
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function EnquireCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, 0.15);

  return (
    <section
      id="enquire"
      ref={ref}
      className="py-16 md:py-28 px-6 lg:px-24"
      style={{
        background: 'var(--brand-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(37,99,235,0.05) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(37,99,235,0.05) 60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Label */}
        <p
          className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#DC2626',
            marginBottom: '1.5rem',
          }}
        >
          Get in Touch
        </p>

        <h2
          className={`transition-all duration-700 delay-75 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 5vw, 5rem)',
            fontWeight: 800,
            color: 'var(--brand-text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          Your IT partner<br />
          <span style={{ color: '#DC2626' }}>is one message away.</span>
        </h2>

        <p
          className={`transition-all duration-700 delay-150 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            color: 'var(--brand-muted)',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}
        >
          Whether you need a laptop, a complete office setup, IT support, or a networking solution —
          our team is ready to help. No jargon, no pushy sales. Just honest advice and genuine products.
        </p>

        <div
          className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}
        >
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#25D366',
              color: '#ffffff',
              border: '1.5px solid #25D366',
              fontFamily: 'var(--font-label)',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 999,
              padding: '16px 36px',
              transition: 'background 0.25s ease, box-shadow 0.25s ease',
              boxShadow: '0 0 24px rgba(37,211,102,0.3)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = '#1EBF59';
              el.style.boxShadow = '0 0 36px rgba(37,211,102,0.55)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = '#25D366';
              el.style.boxShadow = '0 0 24px rgba(37,211,102,0.3)';
            }}
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>

          <a
            href="#services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: 'var(--brand-muted)',
              border: '1.5px solid var(--brand-border)',
              fontFamily: 'var(--font-label)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 999,
              padding: '16px 32px',
              transition: 'border-color 0.25s ease, color 0.25s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = '#DC2626';
              el.style.color = 'var(--brand-text)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'var(--brand-border)';
              el.style.color = 'var(--brand-muted)';
            }}
          >
            View Services
          </a>
        </div>
      </div>
    </section>
  );
}
