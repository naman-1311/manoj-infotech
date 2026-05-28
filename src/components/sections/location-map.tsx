'use client';

import { useRef } from 'react';
import { useInView } from '@/hooks/useInView';

export default function LocationMap() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, 0.1);

  return (
    <section
      ref={ref}
      style={{ background: 'var(--brand-surface)', borderTop: '1px solid var(--brand-border)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle red glow top-right */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header strip */}
      <div
        className="px-6 lg:px-24 py-12 md:py-16"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.85rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#DC2626',
            marginBottom: '0.75rem',
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Find Us
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 3.2vw, 3.2rem)',
            fontWeight: 800,
            color: 'var(--brand-text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: 0,
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 80ms, transform 0.6s ease 80ms',
          }}
        >
          Visit Us at <span style={{ color: '#DC2626' }}>Mount Road, Chennai.</span>
        </h2>
      </div>

      {/* Map + info row */}
      <div
        className="flex flex-col lg:flex-row"
        style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: 0 }}
      >
        {/* Info panel */}
        <div
          className="px-6 lg:px-24 pb-10 lg:pb-16"
          style={{
            flex: '0 0 340px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.65s ease 160ms, transform 0.65s ease 160ms',
          }}
        >
          {[
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              ),
              label: 'Address',
              value: '',
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.01 6.01l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              ),
              label: 'Phone',
              value: '7200042381 / 9884042381',
              href: 'tel:7200042381',
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              ),
              label: 'Email',
              value: 'sales@manojinfotec.com',
              href: 'mailto:sales@manojinfotec.com',
            },
          ].map(({ icon, label, value, href }) => (
            <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--brand-bg)', border: '1px solid var(--brand-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {icon}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#DC2626', margin: '0 0 4px' }}>{label}</p>
                {href ? (
                  <a href={href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--brand-text)', textDecoration: 'none', lineHeight: 1.5 }}>{value}</a>
                ) : label === 'Address' ? (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--brand-text)', margin: 0, lineHeight: 1.5 }}>
                    <span style={{ display: 'block', fontWeight: 600 }}>Manoj Infotec</span>
                    30, Meeran Sahib St, Anna Salai, Triplicane, Chennai, Tamil Nadu 600002
                  </p>
                ) : (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--brand-text)', margin: 0, lineHeight: 1.5 }}>{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Directions button */}
          <a
            href="https://maps.google.com/?q=Manoj+Infotec+Chennai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-label)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#ffffff',
              background: '#DC2626',
              border: 'none',
              borderRadius: 8,
              padding: '12px 20px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.8')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Get Directions
          </a>
        </div>

        {/* Map embed */}
        <div
          className="px-6 lg:px-6 pb-10 lg:pb-16"
          style={{
            flex: 1,
            position: 'relative',
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.65s ease 260ms, transform 0.65s ease 260ms',
          }}
        >
          <div style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', minHeight: 380 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4681344296646!2d80.26802077512454!3d13.06949068725495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52661b663931e9%3A0x26fa730fe47a2595!2sManoj%20Infotec!5e0!3m2!1sen!2sin!4v1779961001934!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{
                border: 0,
                display: 'block',
                minHeight: 380,
                filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Manoj Infotec Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
