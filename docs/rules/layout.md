# HOC Layout Architecture

## Layout Layer Stack

| Layer | File | Role |
|-------|------|------|
| Root layout | `src/app/layout.tsx` | `<html>/<body>`, NextTopLoader, wraps children with main-layout HOC |
| Provider HOC | `src/components/hoc/main-layout.tsx` | `'use client'` — Redux Provider + ToastContainer ONLY. No visual UI. |
| Private layout | `src/app/(private)/layout.tsx` | Authenticated pages — renders Header + `<main>` + Footer |
| Public layout | `src/app/(public)/layout.tsx` | Unauthenticated pages — no Header/Footer/Sidebar. No redirect logic. |

## Component Placement Rules

- **Header** → `src/components/hoc/header.tsx` — rendered in `(private)/layout.tsx` only
- **Footer** → `src/components/hoc/footer.tsx` — rendered in `(private)/layout.tsx` only
- **Sidebar** → `src/components/hoc/sidebar.tsx` — rendered in `(private)/layout.tsx` only
- **Providers / global state** → `src/components/hoc/main-layout.tsx` only
- **New authenticated page** → `src/app/(private)/[feature]/page.tsx`
- **New public page** → `src/app/(public)/[feature]/page.tsx`
- **Page UI component** → `src/components/[feature]/index.tsx`

## Private layout structure (with sidebar)

```tsx
<>
  <Header />
  <div className="flex">
    <Sidebar />
    <main className="flex-1">{children}</main>
  </div>
  <Footer />
</>
```

## Multi-Role Projects

When the project has **multiple roles** (e.g. Customer, Admin):

- **Remove** `src/app/(private)/` directory
- **Create a folder per role** directly under `src/app/`:

```
src/app/
├── (public)/               ← unauthenticated pages (login, etc.)
│   └── login/
│       └── page.tsx
├── customer/               ← all Customer pages
│   ├── layout.tsx          ← Customer layout (Header/Sidebar/Footer for customer)
│   └── dashboard/
│       └── page.tsx
└── admin/                  ← all Admin pages
    ├── layout.tsx          ← Admin layout (Header/Sidebar/Footer for admin)
    └── dashboard/
        └── page.tsx
```

- Each role folder has its **own `layout.tsx`** — different roles can have different Header/Sidebar/Footer
- Page components still go in `src/components/[role]/[feature]/index.tsx`
- Route constants must be updated per role:

```ts
// src/utils/constant.ts
PUBLIC_PATH   = { LOGIN: "/login" }
CUSTOMER_PATH = { HOME: "/customer/dashboard" }
ADMIN_PATH    = { HOME: "/admin/dashboard" }
```

- Auth guard in `proxy.ts` handles role-based redirects — **never** in layout files

---

## Auth Guard — `proxy.ts` (Middleware)

All authentication-based redirects are handled in `proxy.ts` (Next.js middleware), **not** in layout files.

| Scenario | Where it's handled |
|----------|--------------------|
| Unauthenticated user visits a `(private)` route | `proxy.ts` → redirect to `/login` |
| Authenticated user visits a `(public)` route | `proxy.ts` → redirect to `/` |

Layout files are purely structural. **Never** add cookie checks or redirect logic inside layout files.

## Route Constants — always use, never hardcode paths

```ts
// src/utils/constant.ts
PUBLIC_PATH  = { LOGIN: "/login" }
PRIVATE_PATH = { HOME: "/home" }
```

Add new routes to these constants. Do not hardcode path strings in components.
