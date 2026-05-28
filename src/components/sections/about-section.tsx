'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

const STATS = [
  { end: 26,   suffix: '+', label: 'Years of Experience' },
  { end: 2000, suffix: '',  label: 'Established'         },
  { end: 1000, suffix: '+', label: 'Clients Served'      },
  { end: 100,  suffix: '%', label: 'Genuine Products'    },
];

function CountUp({ end, suffix, active }: { end: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, end]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, 0.1);

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 md:py-28 px-6 lg:px-24"
      style={{ background: 'var(--brand-bg)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — text */}
          <div>
            <p
              className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.85rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#DC2626',
                marginBottom: '1.25rem',
              }}
            >
              About Us
            </p>

            <h2
              className={`transition-all duration-700 delay-75 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.8vw, 3.8rem)',
                fontWeight: 800,
                color: 'var(--brand-text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Trusted IT Solutions<br />
              <span style={{ color: '#DC2626' }}>Since 2000.</span>
            </h2>

            <div
              className={`transition-all duration-700 delay-150 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--brand-muted)', lineHeight: 1.8, margin: 0 }}>
                At Manoj Infotec, we believe technology should empower businesses, not complicate them.
                Established in 2000, we have been serving customers for over two decades as a trusted provider
                of computers, laptops, IT accessories, and complete technology solutions in Chennai.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--brand-muted)', lineHeight: 1.8, margin: 0 }}>
                Located in the heart of <strong style={{ color: 'var(--brand-text)' }}>Mount Road, Chennai</strong>, Manoj Infotec has grown into a
                reliable one-stop destination for individuals, businesses, and organizations looking for
                high-quality IT products and dependable service support.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--brand-muted)', lineHeight: 1.8, margin: 0 }}>
                Our strength lies not just in the products we offer, but in the expert guidance and
                personalized solutions we provide to every customer. We don&apos;t just sell technology —
                we build partnerships that help our clients stay ahead in a fast-moving digital world.
              </p>
            </div>

            {/* Mission & Vision */}
            <div
              className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <div style={{ borderLeft: '3px solid #DC2626', paddingLeft: 16 }}>
                <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#DC2626', margin: '0 0 6px' }}>
                  Our Mission
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--brand-text)', lineHeight: 1.7, margin: 0 }}>
                  To deliver reliable, high-performance technology solutions that help businesses operate efficiently and grow faster.
                </p>
              </div>
              <div style={{ borderLeft: '3px solid var(--brand-border)', paddingLeft: 16 }}>
                <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#DC2626', margin: '0 0 6px' }}>
                  Our Vision
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--brand-muted)', lineHeight: 1.7, margin: 0 }}>
                  To become a leading IT solutions provider known for trust, service excellence, and long-term customer relationships.
                </p>
              </div>
            </div>
          </div>

          {/* Right — stats + why choose us */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    background: 'var(--brand-surface)',
                    border: '1px solid var(--brand-border)',
                    borderRadius: 20,
                    padding: '24px 20px',
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 0.55s ease ${300 + i * 100}ms, transform 0.55s ease ${300 + i * 100}ms`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: '"DM Sans", "Inter", sans-serif',
                      fontSize: 'clamp(1.8rem, 2.4vw, 2.6rem)',
                      fontWeight: 800,
                      color: '#DC2626',
                      letterSpacing: '-0.03em',
                      margin: 0,
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    <CountUp end={stat.end} suffix={stat.suffix} active={isInView} />
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'var(--brand-muted)',
                      margin: '8px 0 0',
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div
              style={{
                background: 'var(--brand-surface)',
                border: '1px solid var(--brand-border)',
                borderRadius: 20,
                padding: '28px 24px',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.55s ease 700ms, transform 0.55s ease 700ms',
              }}
            >
              <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#DC2626', margin: '0 0 16px' }}>
                Why Choose Us
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  '26+ years of industry experience',
                  'Trusted by businesses across Chennai',
                  'Competitive pricing with genuine products',
                  'Quick support and after-sales service',
                  'Customer-first approach in every interaction',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: 3, flexShrink: 0 }}>✦</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--brand-muted)', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact card */}
            <div
              style={{
                background: 'var(--brand-surface)',
                border: '1px solid var(--brand-border)',
                borderRadius: 20,
                padding: '28px 24px',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.55s ease 800ms, transform 0.55s ease 800ms',
              }}
            >
              <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#DC2626', margin: '0 0 16px' }}>
                Get in Touch
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="tel:7200042381" style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--brand-text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.01 6.01l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  7200042381
                </a>
                <a href="tel:9884042381" style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--brand-text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.01 6.01l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  9884042381
                </a>
                <a href="mailto:sales@manojinfotec.com" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--brand-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  sales@manojinfotec.com
                </a>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--brand-muted)', margin: '4px 0 0', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Mount Road, Chennai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
