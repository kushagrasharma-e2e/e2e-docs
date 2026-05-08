---
description: Frontend UI/UX work for the E2E Cloud docs site — Astro components, Starlight customisation, CSS design tokens, GitBook-inspired layouts, and accessible markup. Use when asked to build or improve UI, components, styling, or page layouts.
---

# Frontend / UI / UX skill

## Stack
- **Framework**: Astro 6 with `@astrojs/starlight` 0.39
- **Language**: TypeScript (.astro frontmatter + .ts scripts)
- **Styling**: Plain CSS with CSS custom properties (no Tailwind, no CSS-in-JS)
- **Design system**: `src/styles/global.css` — all tokens defined there
- **Components**: `src/components/*.astro`

## Design tokens (from global.css)
Always use these variables, never hardcode colours or spacing:

| Token | Purpose |
|---|---|
| `--e2e-bg` | Page background |
| `--e2e-surface` | Card / elevated surface |
| `--e2e-text` | Primary text |
| `--e2e-text-soft` | Secondary text |
| `--e2e-text-muted` | Tertiary / meta text |
| `--e2e-border` | Default border |
| `--e2e-accent` | Brand blue — links, active states |
| `--e2e-accent-soft` | Accent background tint |
| `--e2e-accent-ink` | Accent text on tinted background |
| `--e2e-radius` | `8px` — default border-radius |
| `--e2e-shadow` | Large shadow |
| `--e2e-shadow-sm` | Card shadow |
| `--sl-nav-height` | Header height (2-row) |
| `--sl-nav-pad-x` | Horizontal header padding |
| `--sl-sidebar-width` | Sidebar width |

Dark mode: all tokens auto-switch via `[data-theme='dark']` in global.css. Never write separate dark-mode overrides; fix the token instead.

## Component conventions
- One `.astro` file per component in `src/components/`
- Props typed inline in frontmatter, no separate `.ts` types file needed for small props
- CSS lives in a `<style>` block at the bottom of the file
- Use `class:list` for conditional classes
- Scoped Astro CSS is fine for component internals; use `@layer starlight.core` only to override Starlight internals
- Accessibility: always include `aria-label` on nav elements, `aria-current="page"` on active links, `aria-hidden="true"` on decorative icons

## Existing key components
- `ServiceHubCard.astro` — service card with icon, title, description
- `JourneyCard.astro` — task/journey link card
- `ProductSectionNav.astro` — 4-section tab bar in header Row 2
- `StarlightHeader.astro` — 2-row header (Row 1: logo/search/switcher, Row 2: section tabs)
- `ContextSidebar.astro` — product-isolated sidebar

## CSS patterns to follow

### Cards
```css
.my-card {
  border: 1px solid var(--e2e-border);
  border-radius: var(--e2e-radius);
  padding: 1rem;
  background: var(--e2e-surface-raised);
  box-shadow: 0 1px 0 rgba(15,23,42,0.03);
}
.my-card:hover {
  border-color: var(--e2e-accent);
  box-shadow: var(--e2e-shadow-sm);
}
```

### Grid layouts
```css
.card-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
}
```

### Active tab underline (GitBook-style)
```css
.tab.is-active {
  color: var(--e2e-accent);
  border-bottom: 2px solid var(--e2e-accent);
  font-weight: 680;
}
```

## Starlight overrides
- Override Starlight components via `astro.config.mjs` `components:` key
- Always use `@layer starlight.core {}` when overriding Starlight's own CSS classes
- `--sl-nav-height` is currently `calc(4rem + 2.5rem)` — two rows. Do not reduce it.
- The sidebar is isolated per product via `ContextSidebar.astro` — do not break this logic.

## GitBook UX principles (apply to all pages)
1. **Calm, minimal** — white space over decoration
2. **Scannability** — clear H1→H2→H3 hierarchy, short paragraphs
3. **Section tabs visible** — the 2-row header makes product sections always reachable
4. **Card-based discovery** — use cards for navigation, not long link lists
5. **Active states clear** — every nav item has an unambiguous active state
6. **Dark mode parity** — every component must look correct in both themes

## What to always do
- Check `global.css` tokens before writing any colour or spacing value
- Check existing components before creating a new one
- Use `class:list` over string interpolation for conditional classes
- Test both light (`data-theme` default) and dark (`data-theme='dark'`) by checking token usage
- Keep `<style>` blocks at the bottom of `.astro` files

## What to never do
- Hardcode `#hex` colours or `px` sizes outside CSS custom properties
- Write `!important` except in `@layer starlight.core` overrides
- Add inline `style=""` attributes to elements
- Duplicate design tokens — always refer to global.css
- Add Tailwind, Bootstrap, or any CSS framework
