# Fonts Used

A complete reference of every typeface loaded by the application, how it is loaded, and where it is assigned.

---

## Design Token Map

Defined in [`globals.css`](../src/app/globals.css) under `:root`:

| CSS Variable       | Font Stack                                                  | Role            |
|--------------------|-------------------------------------------------------------|-----------------|
| `--font-heading`   | `"DM Serif Display"`, Georgia, serif                        | All `<h1>`–`<h6>` elements |
| `--font-body`      | `"DM Sans"`, `"Plus Jakarta Sans"`, sans-serif              | `<body>` default text |
| `--font-display`   | `"Matiere Condensed"`, `"DM Serif Display"`, Georgia, serif | Large display / editorial headings |
| `--font-body-alt`  | `"FT Regola Neue"`, `"DM Sans"`, sans-serif                 | Navigation, overlays, toasts, labels |
| `--font-label`     | `"DIN Medium"`, `"Manrope"`, sans-serif                     | Uppercase micro-labels, badges, tags |

---

## Google Fonts (CDN)

Loaded via a single `@import` at the top of `globals.css`.  
Source URL: `https://fonts.googleapis.com/css2?…&display=swap`

| Family              | Weights Loaded          | Used As / Fallback For  |
|---------------------|-------------------------|-------------------------|
| **DM Serif Display** | 400 (normal + italic)  | `--font-heading`, `--font-display` fallback |
| **DM Sans**          | 300, 400, 500, 600     | `--font-body`, `--font-body-alt` fallback |
| **Plus Jakarta Sans**| 400, 500, 600, 700     | `--font-sans` (Tailwind), `--font-body` fallback |
| **Manrope**          | 400, 500, 600, 700, 800| `--font-label` fallback |
| **Inter**            | 400, 500, 600, 700, 800| General utility / future use |

---

## Self-Hosted Fonts

Declared via `@font-face` rules in `globals.css`.  
Font files must be placed in **`/public/fonts/`**.

### Simula

| Style  | Weight | File(s)                                         |
|--------|--------|-------------------------------------------------|
| Normal | 400    | `Simula-Regular.woff2`, `Simula-Regular.woff`  |
| Italic | 400    | `Simula-Italic.woff2`, `Simula-Italic.woff`    |

> Currently not assigned to a CSS variable. Available for ad-hoc use via `font-family: 'Simula'`.

---

### Matiere Condensed

| Style  | Weight | File(s)                                                          |
|--------|--------|------------------------------------------------------------------|
| Normal | 300    | `MatiereCondensed-Light.woff2`, `MatiereCondensed-Light.woff`  |

> Assigned to `--font-display`. Falls back to `"DM Serif Display"`.

---

### FT Regola Neue

| Style  | Weight | File(s)                                                        |
|--------|--------|----------------------------------------------------------------|
| Normal | 400    | `FTRegolaNeue-Regular.woff2`, `FTRegolaNeue-Regular.woff`    |
| Normal | 300    | `FTRegolaNeue-Light.woff2`, `FTRegolaNeue-Light.woff`        |

> Assigned to `--font-body-alt`. Used in navbar, menu overlay, toasts, and detail panels.

---

### DIN Medium

| Style  | Weight | File(s)                              |
|--------|--------|--------------------------------------|
| Normal | 500    | `DINMedium.woff2`, `DINMedium.woff` |

> Assigned to `--font-label`. Used for uppercase tracking labels, badges, and nav tags.

---

## One-Off / Inline Font References

These are applied directly via inline `style` props rather than CSS variables.

| Font                  | Where Used                                      | Notes                          |
|-----------------------|-------------------------------------------------|--------------------------------|
| **Neue Haas Grotesk** | [`intro-loader.tsx`](../src/components/intro/intro-loader.tsx) line 81 | Large animated intro text. Falls back to `"Helvetica Neue"`, Helvetica, Arial, sans-serif. Not self-hosted — requires system or manually loaded font. |

---

## Font Files Required in `/public/fonts/`

The following files must be present for self-hosted fonts to load correctly:

```
public/
└── fonts/
    ├── Simula-Regular.woff2
    ├── Simula-Regular.woff
    ├── Simula-Italic.woff2
    ├── Simula-Italic.woff
    ├── MatiereCondensed-Light.woff2
    ├── MatiereCondensed-Light.woff
    ├── FTRegolaNeue-Regular.woff2
    ├── FTRegolaNeue-Regular.woff
    ├── FTRegolaNeue-Light.woff2
    ├── FTRegolaNeue-Light.woff
    ├── DINMedium.woff2
    └── DINMedium.woff
```

> ⚠️ The `/public/fonts/` directory does not currently exist in the repository. Self-hosted fonts will silently fall back to their defined fallback stacks until the files are added.
