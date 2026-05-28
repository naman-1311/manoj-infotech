'use client';

import { useRef, useState, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import WordReveal from '@/components/ui/word-reveal';

const SERVICES = [
  {
    tag: 'Computers',
    name: 'Laptops & Desktops',
    description: 'Laptops and desktops from leading brands including Dell, HP, Lenovo, Asus, and more — for personal, business, and enterprise use.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
      </svg>
    ),
  },
  {
    tag: 'Accessories',
    name: 'Peripherals & Accessories',
    description: 'Keyboards, mice, monitors, webcams, headsets, and every computer peripheral you need — genuine products at competitive prices.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="7"/><circle cx="12" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    tag: 'Office',
    name: 'Printers & Imaging',
    description: 'Laser, inkjet, and multifunction printers from HP, Canon, Epson, and Brother. Supply, service, and AMC contracts available.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
      </svg>
    ),
  },
  {
    tag: 'Storage',
    name: 'Storage & Components',
    description: 'SSDs, HDDs, RAM, processors, and internal components for upgrades or new builds — all genuine with warranty.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
  },
  {
    tag: 'Networking',
    name: 'Networking & Surveillance',
    description: 'Routers, switches, access points, CCTV cameras, and complete surveillance systems for homes and businesses.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M5 8v4h14V8"/><path d="M12 12v4"/>
      </svg>
    ),
  },
  {
    tag: 'Support',
    name: 'IT Support & Repair',
    description: 'On-site and in-store repairs, AMC (Annual Maintenance Contracts), software installation, and complete IT support services.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
];

export default function ServicesGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section
      id="services"
      ref={ref}
      className="py-16 md:py-28 px-6 lg:px-24"
      style={{ background: 'var(--brand-bg)', position: 'relative' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label */}
        <p
          className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.85rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#DC2626',
            marginBottom: '0.75rem',
          }}
        >
          Our Services
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--brand-text)',
            marginBottom: '0.5rem',
          }}
        >
          <WordReveal text="What we offer." isInView={isInView} baseDelay={80} stagger={60} style={{ color: 'var(--brand-text)' }} />
        </h2>

        {/* Subheadline */}
        <p
          className={`transition-all duration-700 delay-[120ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--brand-muted)',
            marginTop: '0.5rem',
            marginBottom: '3.5rem',
          }}
        >
          Genuine products, expert guidance, and after-sales support — all under one roof.
        </p>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: { tag: string; name: string; description: string; icon: ReactNode };
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const scrollToEnquire = () => {
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      onClick={scrollToEnquire}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        border: hovered ? '1px solid rgba(220,38,38,0.45)' : '1px solid var(--brand-border)',
        padding: '32px 28px',
        background: hovered ? 'rgba(220,38,38,0.05)' : 'var(--brand-surface)',
        cursor: 'pointer',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${200 + index * 100}ms, transform 0.55s ease ${200 + index * 100}ms, border-color 0.25s ease, background 0.25s ease`,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: hovered ? 'rgba(220,38,38,0.12)' : 'rgba(220,38,38,0.07)',
          border: `1px solid ${hovered ? 'rgba(220,38,38,0.35)' : 'rgba(220,38,38,0.15)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#DC2626',
          transition: 'background 0.25s ease, border-color 0.25s ease',
        }}
      >
        {service.icon}
      </div>

      {/* Tag */}
      <p
        style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#DC2626',
          margin: 0,
        }}
      >
        {service.tag}
      </p>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--brand-text)',
          margin: 0,
          letterSpacing: '-0.01em',
        }}
      >
        {service.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--brand-muted)',
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
        }}
      >
        {service.description}
      </p>

    </div>
  );
}
