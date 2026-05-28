---
description: Frontend UI and architecture generator
---

# Frontend Design Rules — Welltegra

## Design Tokens (never hardcode — use these values)

| Token | Value | Use |
|-------|-------|-----|
| `--brand-dark` | `#2C2C2A` | Primary text, filled buttons, active states |
| `--brand-muted` | `#888884` | Labels, supporting copy, placeholders |
| `--brand-gray` | `#EDECEA` | Section backgrounds, input fills, sidebar bg |
| `--brand-border` | `#D8D6D2` | Dividers, card borders, inactive borders |
| `--brand-beige` | `#DDD3B9` | Accent highlights |
| White | `#ffffff` | Card surfaces, form panels, content areas |

## Typography — always use font variables

| Variable | Fallback | Use |
|----------|----------|-----|
| `var(--font-display)` | Matiere Condensed → DM Serif Display | Hero headlines, section titles |
| `var(--font-heading)` | DM Serif Display → Georgia | h1–h6 |
| `var(--font-body)` | DM Sans → Plus Jakarta Sans | Body text, inputs, UI copy |
| `var(--font-body-alt)` | FT Regola Neue → DM Sans | Supporting paragraphs, descriptions |
| `var(--font-label)` | DIN Medium → Manrope | ALL-CAPS labels, badge text, nav items |

### Type scale patterns
- Section label: `0.6rem`, `letter-spacing: 0.2em`, `text-transform: uppercase`, color `#888884`
- Display headline: `clamp(2rem, 4vw, 3.5rem)`, `font-weight: 300`, `letter-spacing: -0.025em`
- Body copy: `0.88–0.95rem`, `line-height: 1.8`, color `#888884`
- Nav / UI label: `0.62rem`, `letter-spacing: 0.14em`, uppercase

## Button Patterns

```tsx
// Primary — filled dark
style={{
  background: '#2C2C2A', color: '#ffffff',
  border: '1px solid #2C2C2A', borderRadius: '999px',
  fontFamily: 'var(--font-label)', fontSize: '0.62rem',
  letterSpacing: '0.16em', textTransform: 'uppercase',
  padding: '0.9rem 1.75rem', cursor: 'pointer',
  transition: 'background 0.28s ease, color 0.28s ease',
}}
onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2C2C2A'; }}
onMouseLeave={e => { e.currentTarget.style.background = '#2C2C2A'; e.currentTarget.style.color = '#ffffff'; }}

// Secondary — outline
style={{
  background: 'transparent', color: '#2C2C2A',
  border: '1px solid #2C2C2A', borderRadius: '999px',
  fontFamily: 'var(--font-label)', fontSize: '0.62rem',
  letterSpacing: '0.16em', textTransform: 'uppercase',
  padding: '0.9rem 1.75rem', cursor: 'pointer',
  transition: 'background 0.28s ease, color 0.28s ease',
}}
onMouseEnter={e => { e.currentTarget.style.background = '#2C2C2A'; e.currentTarget.style.color = '#ffffff'; }}
onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2C2C2A'; }}
```

## Card Patterns

```tsx
// Standard content card
style={{
  background: '#ffffff',
  border: '1px solid #D8D6D2',
  borderRadius: '20px',
  padding: '24px',
}}

// Stat / metric card
style={{
  background: '#EDECEA',
  borderRadius: '16px',
  padding: '20px 24px',
}}

// Dark feature card
style={{
  background: '#2C2C2A',
  borderRadius: '20px',
  padding: '28px',
  color: '#ffffff',
}}
```

## Input Pattern

```tsx
// Base input — beige fill, border appears on focus only
style={{
  width: '100%',
  padding: '0.9rem 1.1rem',
  background: '#EDECEA',
  border: `1px solid ${focused ? '#2C2C2A' : 'transparent'}`,
  borderRadius: '14px',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: '#2C2C2A',
  outline: 'none',
  transition: 'border-color 0.25s ease',
  boxSizing: 'border-box',
}}
```

## Animation Rules

- Use GSAP for entrance animations. Pattern: `fromTo(ref, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })`
- Stagger sequential elements with `-=0.5` overlaps on the timeline
- For scroll-reveal, use `useInView` hook with CSS `transition-all duration-700` + `opacity-0 translate-y-4` → `opacity-100 translate-y-0`
- Hover transitions: always `0.25–0.35s ease`

## Component Rules

- Add `'use client'` only when the component uses state, refs, event handlers, or GSAP
- No hardcoded strings, colors, or data in components — all via props
- Every extracted component needs a TypeScript `interface` for props
- Follow placement rules from `docs/rules/components.md`

## Member Portal Specific

- Sidebar background: `#EDECEA`
- Active nav item: `#2C2C2A` pill background, white text
- Inactive nav item: transparent, `#888884` text, hover → `rgba(44,44,42,0.06)` bg
- Content area background: `#f7f6f4` (slightly off-white, warmer than pure white)
- Metric values: `var(--font-display)`, large, `font-weight: 300`, `#2C2C2A`
- Status badges: small pills — follow brand palette (teal for active, muted for pending)
