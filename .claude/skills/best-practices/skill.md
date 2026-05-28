---
name: bitcot-frontend-standards
description: >
  Core Bitcot frontend standards for Next.js 16 (App Router), React 19, TypeScript projects.
  Load this skill for ANY frontend task in a Bitcot project — creating components, pages, hooks,
  layouts, styling, memoization, middleware, project structure, naming conventions, git standards,
  or code quality checks. This is the base skill that always applies.
  Trigger on: create component, create page, create hook, create layout, add styling,
  set up middleware, review code quality, project setup, naming a file or folder.
---

# Bitcot Frontend Base Standards

Core standards for Bitcot web applications built with **Next.js 16 (App Router)**, **React 19**, and **Node.js v22**.

---

## ⚙️ Technology Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Runtime | Node v22 |
| UI Libraries | Tailwind CSS, SCSS Modules |
| State Management | Redux Toolkit |
| Data Fetching | Axios, GraphQL |
| Validation | Simple React Validator |
| Icons | lucide.dev/icons |
| Testing | Jest + React Testing Library |
| Dev Tools | Prettier, Logger, SonarLint |

---

## 🧩 Project Structure

```
src/
├── app/          # Next.js app router pages and layouts
├── components/   # Reusable and feature components
├── hooks/        # Custom hooks
├── stores/       # Redux toolkit
├── styles/       # Global styles, mixins, variables
├── types/        # TypeScript type definitions
├── utils/        # Helper functions, constants, configs
├── config/       # Environment configuration
├── graphql/      # GraphQL queries, mutations, actions
public/           # Static assets
```

---

## 🧠 General Principles

- Write clean, modular, reusable code
- Prefer composition over inheritance
- Type ALL functions and props using TypeScript
- No "magic values" — store constants in `/src/utils/constants.ts`
- Always use import alias `@/` instead of relative `../../` paths

---

## ✍️ Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Functions | lowerCamelCase | `fetchUserData()` |
| Components | PascalCase | `UserProfileCard` |
| Files/Folders | kebab-case | `user-profile.tsx` |
| Constants | UPPERCASE | `const PAGE_LIMIT = 10` |

---

## 🔄 Component Types

### Global Reusable Component
- Pieces of UI **or shared code** (buttons, cards, stat cards, info cards, summary blocks, modals, utility functions) that can be used **anywhere** in the app
- Must be created in **`/src/components/ui`** (UI components) or **`/src/utils`** (shared functions)
- **Detection rule:** If the same UI pattern or code appears in **2 or more modules** → extract it as a global reusable component
- **DRY rule:** Wherever the same JSX structure appears more than once across pages — stat cards, info cards, summary blocks — it MUST become a single reusable component that accepts data as props. **Never copy-paste the same JSX structure across multiple files.**
- Place all reusable UI components inside `components/ui/` so they are easy to find and import

### Modular Reusable Component
- Pieces of UI or code reused across **different parts or pages within a specific module**
- Must be created inside **that module's directory** under `/src/components/<module-name>/`
- **Detection rule:** If the same UI pattern or code appears in **2 or more pages within the same module** → extract it as a modular reusable component
- **Scope rule:** Must NOT be used outside its own module — if needed elsewhere, promote it to a Global Reusable Component

---

## 🧠 Memoization

### When to Use
- Function called repeatedly with same inputs
- Expensive calculations
- Results don't change often (deterministic)

### When NOT to Use
- Functions with side effects
- Constantly changing inputs
- When memory usage is a concern

### `useMemo` — memoize computed value
```ts
const memoizedValue = useMemo(() => expensiveComputation(value), [value]);
```

### `useCallback` — memoize function reference
```ts
const memoizedFn = useCallback(() => { doSomething(); }, [dependencies]);
```

---

## 🎨 Styling Rules

- Use **either** Tailwind CSS **or** Modular SCSS — **never both** in the same component
- Use **CSS Variables** defined at `:root {}` for all design tokens (colors, spacing, sizing)
- Tailwind → layout and utility styles
- SCSS Modules → component-specific and complex styles

---

## 🌐 Middleware (Proxy) Pattern

Used for auth checks, role-based routing, and redirects. Lives in `middleware.ts` at root.

```ts
export default async function middleware(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get('access_token')?.value;
  if (token) {
    // check expiry, validate role, redirect accordingly
  } else if (!PUBLIC_ROUTES.includes(path) && isProtectedRoute(path)) {
    return NextResponse.redirect(new URL(PUBLIC_PATH.LOGIN, request.url));
  }
  return NextResponse.next();
}
```

---

## 🚧 Error Boundary

Create `error.tsx` inside any layout folder. Next.js will automatically render it when an error is thrown.

---

## 🔐 Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL="https://your-api-url.com/"
```

---

## 🌳 Git & PR Standards

- **Branch naming:** `feature/<ticket_number>-description`
- **Commits:** Follow Conventional Commits guidelines
- **Pre-commit:** Prettier runs automatically via Husky + lint-staged
- **PRs:** Mandatory review before merging to master

---

## 🧹 Code Quality Checklist

- [ ] ESLint + Prettier configured
- [ ] SonarLint enabled in IDE
- [ ] No `console.log` — use Logger utility instead
- [ ] All components have at least one render test (Jest + RTL)
- [ ] Mocks stored in `/__mocks__/` directory
- [ ] Code builds and all tests pass before PR
