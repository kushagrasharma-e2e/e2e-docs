# E2E Cloud Docs

This folder is the base scaffold for the E2E Networks Documentation Operating System.

It follows:

- `AGENTS.md`
- `design-and-tech-stack.md`
- `docs-system/rules/`

## Structure

- `src/content/docs/`: public Astro/Starlight documentation pages.
- `src/components/`: reusable public-safe Astro components.
- `public/`: public LLM files, OpenAPI assets, and agent operation specs.
- `docs-system/`: source extraction outputs, registries, templates, scripts, rules, and validation checks.
- `internal-docs/`: private QA, support, developer, and API gap documentation.

## Current Status

This is a scaffold. Product behavior still needs backend, frontend, and OpenAPI extraction before public docs are considered validated.

## Commands

```bash
npm install
npm run dev
npm run validate
npm run build
```

## Public Footer Links

The docs footer shows relative page freshness, plus edit and issue actions. Set these public environment variables when the docs source repository is safe to expose:

```bash
PUBLIC_DOCS_GITHUB_REPO_URL=https://github.com/<org>/<repo>
PUBLIC_DOCS_GITHUB_BRANCH=main
PUBLIC_DOCS_GITHUB_ISSUE_URL=https://github.com/<org>/<repo>/issues/new
```

If the repository URL is not configured, the footer keeps the text visible but does not emit a private or guessed GitHub link.
