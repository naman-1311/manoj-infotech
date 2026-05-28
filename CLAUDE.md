# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# @AGENTS.md

@docs/rules/layout.md

@docs/rules/components.md

@docs/custom/SUMMARY.md

---

## Commands

```bash
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint check
```

No test runner is configured. TypeScript is checked implicitly by the Next.js build.

---

## Stack Versions — Breaking Changes Apply

- **Next.js 16.2.3** — not Next.js 14/15. APIs, file conventions, and docs may differ from training data. Read `node_modules/next/dist/docs/` before writing new Next.js-specific code.
- **Tailwind CSS v4** — config is postcss-based (`@tailwindcss/postcss`), not `tailwind.config.js`. v3 syntax will break.
- **React 19.2.4** with **React Compiler** enabled (`reactCompiler: true` in `next.config.ts`). Do not add manual `useMemo`/`useCallback` — the compiler handles memoization.

---

## Architecture

### Multi-Role Routing

This project uses the **multi-role layout pattern** from `docs/rules/layout.md`. There is no single `(private)/` — instead roles get separate layout roots:

| Route prefix | Role | Layout file |
|---|---|---|
| `(public)/` | Unauthenticated | `src/app/(public)/layout.tsx` — redirects to `/member/dashboard` if token cookie exists |
| `(private)/member/` | Member portal | `src/app/(private)/layout.tsx` — Sidebar + MemberNavbar shell |
| `admin/(app)/` | Admin portal | `src/app/admin/(app)/layout.tsx` — AdminSidebar + AdminHeader shell |
| `join/onboard/` | Onboarding flow | `src/app/join/onboard/layout.tsx` — minimal, step-based |

Route constants live in `src/utils/constant.ts` (`PUBLIC_PATH`, `PRIVATE_PATH`). Never hardcode path strings.

Auth guard middleware is in `src/proxy.ts` (`proxy-services.ts` for helpers) — **not** in layout files.

### Page Inventory

**Member pages** (`/(private)/member/`): `dashboard`, `appointments`, `lab-results`, `protocols`, `messages`, `documents`, `billing`, `profile`

**Admin pages** (`/admin/(app)/`): `dashboard`, `appointments`, `members`, `members/[id]`, `inbox`, `events`, `content`, `waiting-list`, `settings`, `profile`

**Public/marketing pages**: `/` (home), `/treatments`, `/treatments/[slug]`, `/(public)/login`, `/member/login`, `/member/reset-password`

**Onboarding flow** (`/join/onboard/`): root → `intake` → `consent` → `membership` → `checkout` → `set-password`

### Layout Stack

1. `src/app/layout.tsx` — `<html>/<body>`, NextTopLoader, wraps children with `main-layout` HOC + `PageTransition`
2. `src/components/hoc/main-layout.tsx` — `'use client'`: Redux `<Provider>` + `<ToastContainer>` only. No visual UI.
3. `src/app/(private)/layout.tsx` — Member shell: fixed Sidebar (65 px) + MemberNavbar + scrollable `<main>`
4. `src/app/(public)/layout.tsx` — No chrome; redirects authenticated users to `/member/dashboard`

### State Management

Redux Toolkit store at `src/store/store.ts` with a single `auth` slice (`src/store/reducers/auth-reducer.ts`).

Auth slice actions: `login(LoginRes)`, `logout()`, `refreshToken(token: string)`. Tokens are persisted to js-cookie cookies by the reducer itself.

Use `src/store/hooks.ts` for typed `useAppDispatch` / `useAppSelector`.

### API Layer — Two Parallel Clients

| Client | File | When to use |
|--------|------|-------------|
| GraphQL (server-side only) | `src/utils/graphql/index.ts` | Server Components & Server Actions — reads `access_token` cookie server-side |
| Axios REST (client-side) | `src/utils/axios-config/index.ts` | Client Components — attaches auth header via interceptor, auto-retries on 401 |

Client-side wrappers (`src/store/server-api-action/client-apis.ts`) expose `post(url, body)` and `get(url, params?)` with automatic token refresh on 401/422.

GraphQL mutations available in `src/utils/graphql/auth/query.ts`: `SIGN_IN`, `SIGN_UP`, `FORGOT_PASSWORD`, `RESET_PASSWORD`, `CHANGE_PASSWORD`, `UPDATE_USER`, `REFRESH_TOKEN`, `GET_PRESIGNED_URL`.

Server Actions for auth in `src/utils/graphql/auth/action.ts`: `signInAction()`, `refreshToken()`.

### Utilities

- `src/utils/config.ts` — exposes `API_URL` and `GRAPHQL_API_URL` from `NEXT_PUBLIC_*` env vars. Create `.env.local` with `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_GRAPHQL_API_URL` to run locally.
- `src/utils/constant.ts` — route constants (`PUBLIC_PATH`, `PRIVATE_PATH`) and pagination defaults (`limit = 10`, `pagePerOptions`).
- `src/utils/common-service.ts` — global toast helpers (`forSuccess`, `forError`, `forWarning`) and `BehaviorSubject`-based `isLoading` / `isDialogOpen` observables.
- `src/utils/proxy-services.ts` — JWT decode (`decodeJWT`), token expiry check (`checkTokenExpired`), role-based routing (`getRoleConfig`), cookie clearing, and `handleTokenExpiration`.

### Lib Directory

- `src/lib/validators.ts` — form validation functions: `validateRequired`, `validateEmail`, `validatePhone`, `validatePassword`, `validateConfirmPassword`, `validateCardNumber`, `validateExpiry`, `validateCVV`, `validateDate` (enforces 18+), `runValidators(rules)`, `hasErrors(errors)`.
- `src/lib/toast.ts` — brand-styled toast wrappers (`showSuccess`, `showError`, `showInfo`, `showWarning`) built on react-toastify with the Well Society color palette.
- `src/lib/mock-store.ts` — in-memory session mock store for development. Provides lead management (`getLeads`, `addLead`, `updateLeadStatus`, `convertLead`) and member data (`getMemberByEmail`, `validateMemberPassword`, `setCurrentMember`, `getCurrentMember`) with seed data for two members and three leads. Uses `sessionStorage`.

### Types

- `src/types/auth-type.ts` — `AuthState`, `LoginRes`, `User`, `SignInResponse`, `SignInInput`, `RefreshTokenRes`, `TokenResponse`.
- `src/types/common-types.ts` — `AnyType<T> = T | undefined | null | void | []`.

### Custom Hooks

- `src/hooks/useHeroExited.ts` — returns `boolean` true once the user scrolls past 90 % of viewport height (used for navbar state changes).
- `src/hooks/useInView.ts` — Intersection Observer hook for scroll-triggered animations; configurable threshold/rootMargin; respects `prefers-reduced-motion`.

### Animations

GSAP (`@gsap/react`) is the primary animation library. Use `useInView` to gate animation triggers on scroll. `src/components/intro/` contains the page-load intro sequence (number scramble, image stack, loader). `src/components/ui/word-reveal.tsx` and `page-transition.tsx` handle text and route-change animations.

### Path Alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).
