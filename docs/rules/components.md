# Component Architecture Rules

## Component Placement Decision

| Pattern appears in… | Where to put it |
|---------------------|-----------------|
| 2+ different modules (customer + admin) | `src/components/ui/` — Global Reusable |
| 2+ pages within the same module | `src/components/<module>/ui/` — Modular Reusable |
| 1 page only | Inline in the page component |

**DRY rule**: If the same JSX structure exists in 2+ files → extract into a single component. Never copy-paste.

---

## 4 Extraction Layers

### Layer 1 — Primitives → `src/components/ui/`
Atomic building blocks: badge, avatar, icon wrapper, breadcrumb, pagination, page footer.
- No hardcoded text, colors, or icons — all data via props
- Examples already created: `status-badge`, `avatar-initials`, `breadcrumb`, `pagination`, `page-footer`

### Layer 2 — Compound Elements → `src/components/<module>/ui/`
Self-contained rows, cards, or items used 2+ times within one module.
- Examples: `policy-card`, `payment-item`, `document-row`, `coverage-item` (customer)
- Examples: `alert-item`, `task-item`, `activity-row` (admin)

### Layer 3 — Section Widgets → `src/components/ui/` or `src/components/<module>/ui/`
Named UI sections that appear across modules (global) or across pages of one module.
- Global: `widget-card`, `dark-stat-card`, `stat-display`, `section-header`, `info-box`, `contact-card`, `page-header`
- Customer-only: `dark-policy-hero`
- Admin-only: `bar-chart`, `ring-metric`, `table-toolbar`

### Layer 4 — Data Structures → `src/components/ui/` or `src/components/<module>/ui/`
Tables, filter sidebars, charts, ring metrics — larger composed data-display blocks.
- Extract when the same data-display pattern appears on 2+ pages

---

## Checklist Before Writing a Page Component

- [ ] Any JSX block > ~15 lines that is self-contained? → Extract it
- [ ] Does any card/widget appear on another page? → Global component in `ui/`
- [ ] Does any row/item pattern repeat 2+ times on one page? → Modular component
- [ ] All extracted components fully data-driven (no hardcoded strings/colors)? → Required
- [ ] Every extracted component has a TypeScript props interface with JSDoc? → Required
- [ ] Client components (`'use client'`) only when they accept event handler props (onClick, onChange, etc.)
