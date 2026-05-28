const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Enquire', href: '#enquire' },
];

const WA_NUMBER = '917200042381';
const WA_MESSAGE = encodeURIComponent(
  'Hi Manoj Infotec! I\'m looking for IT products/solutions. Please guide me.'
);

const WA_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function SiteFooter() {
  return (
    <footer
      className="py-10 md:py-16 px-6 lg:px-24"
      style={{
        background: 'var(--brand-surface)',
        borderTop: '1px solid var(--brand-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row — 3 columns: contact | logo | nav */}
        <div
          className="footer-top-row flex md:flex-row mb-12 md:mb-20"
          style={{ alignItems: 'center', gap: 0 }}
        >
          {/* Left — contact details */}
          <div className="footer-contact-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch', gap: 0, flex: 1 }}>
            {/* Desktop: flat list. Mobile: overridden to 2-col flex via CSS */}
            {/* Phone 1 */}
            <a href="tel:7200042381" className="footer-contact-link footer-contact-item footer-contact-phone"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 1.7vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--brand-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, transition: 'color 0.2s, transform 0.2s', lineHeight: 1.35 }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#EF4444'; el.style.transform = 'translateX(6px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = 'var(--brand-muted)'; el.style.transform = 'translateX(0)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.01 6.01l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              7200042381
            </a>
            {/* Email — mobile: right col row 1 */}
            <a href="mailto:sales@manojinfotec.com" className="footer-contact-link footer-contact-item footer-contact-email"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 1.7vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--brand-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, transition: 'color 0.2s, transform 0.2s', lineHeight: 1.35 }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#EF4444'; el.style.transform = 'translateX(6px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = 'var(--brand-muted)'; el.style.transform = 'translateX(0)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              sales@manojinfotec.com
            </a>
            {/* Phone 2 */}
            <a href="tel:9884042381" className="footer-contact-link footer-contact-item footer-contact-phone"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 1.7vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--brand-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, transition: 'color 0.2s, transform 0.2s', lineHeight: 1.35 }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#EF4444'; el.style.transform = 'translateX(6px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = 'var(--brand-muted)'; el.style.transform = 'translateX(0)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.01 6.01l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              9884042381
            </a>
            {/* Address — mobile: right col row 2 */}
            <p className="footer-contact-link footer-contact-item footer-contact-address" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 1.7vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--brand-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: 12, lineHeight: 1.35 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Mount Road, Chennai
            </p>
          </div>

          {/* Center — logo */}
          <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <img
              src="/icons/logo_bg.png"
              alt="Manoj Infotec"
              className="footer-logo"
              style={{
                width: 'auto',
                mixBlendMode: 'screen',
                filter: 'brightness(1.1)',
                display: 'block',
              }}
            />
          </div>

          {/* Right — nav links */}
          <nav
            className="footer-nav-col"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'stretch' }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-nav-link"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.4rem, 2.2vw, 2.4rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: 'var(--brand-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, transform 0.2s',
                  display: 'block',
                  lineHeight: 1.35,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = '#EF4444';
                  el.style.transform = 'translateX(-6px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = 'var(--brand-muted)';
                  el.style.transform = 'translateX(0)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Center tagline */}
        <div className="text-center mb-8 md:mb-16">
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 6vw, 6.5rem)',
              fontWeight: 900,
              color: 'var(--brand-text)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            House of <span style={{ color: '#DC2626' }}>Computers.</span>
          </p>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid var(--brand-border)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: 'var(--brand-muted)',
            }}
          >
            © 2026 Manoj Infotec. All rights reserved. · Est. 2000 · Mount Road, Chennai
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#25D366',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')
            }
          >
            {WA_SVG}
            WhatsApp Us
          </a>
        </div>
      </div>
    </footer>
  );
}
