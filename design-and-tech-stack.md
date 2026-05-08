# Design and Tech Stack for E2E Networks Documentation System

## Purpose

This document defines the updated design direction, technical stack, information architecture, content model, UI/UX rules, repository structure, generation pipeline, and validation strategy for the E2E Networks documentation system.

The goal is to build a GitBook-quality documentation experience without becoming locked into GitBook as a platform.

The system must support:

- public user documentation
- MyAccount and TIR product documentation under one E2E Cloud docs umbrella
- shared Account & Billing documentation
- API and automation documentation
- error-message-based troubleshooting
- internal support, QA, and developer documentation
- LLM-readable documentation
- agent operation specifications
- public/internal source boundaries
- code-driven verification
- release validation

The final system should feel modern, fast, readable, searchable, trustworthy, and useful for both humans and AI systems.

---

## Direction from research

The current direction is based on cloud documentation research and platform review notes.

Key conclusions:

1. Users expect category-first or product-first discovery.
2. A service page should be the center of gravity for service documentation.
3. Service pages should split content by intent: overview, getting started, how-to, reference, concepts/details, API, and troubleshooting.
4. Dependencies should normally appear inside service context as `Works with`, `Related services`, or task-specific links.
5. Multi-service workflows belong in Solutions / Architecture.
6. A single docs-wide dependency section should not be the main user path.
7. Modern docs should provide Ask AI, Edit this page, Copy page, and Copy for LLM where practical.
8. The docs must support two separate products, MyAccount and TIR, inside one unified E2E Cloud documentation system.
9. Public docs must be truthful, concise, journey-based, and validated against real product behavior.

The design goal is not to copy AWS, Azure, GCP, DigitalOcean, GitBook, Mintlify, LangChain, Fern, or Fly.io exactly. The goal is to borrow the user mental model that works across them and adapt it for E2E Networks.

---

## Recommended stack

Use this stack as the default technical direction:

```text
Astro + Starlight + MDX + Tailwind CSS v4 + Scalar + Pagefind + TypeScript + astro/zod + YAML/JSON registries
```

Recommended supporting tools:

```text
pnpm
tsx
ESLint
Prettier
Markdownlint
Redocly CLI or Spectral for OpenAPI linting
GitLab CI or GitHub Actions
Kapa AI or Algolia Ask AI after public-source boundaries are ready
```

## Stack breakdown

| Area                  | Recommendation                                                                   | Purpose                                                             |
| --------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Static site framework | Astro                                                                            | Fast, static-first, SEO-friendly docs foundation                    |
| Docs framework        | Starlight                                                                        | Sidebar, search, page chrome, docs conventions, content collections |
| Content               | MDX                                                                              | Markdown plus reusable components                                   |
| Styling               | Tailwind CSS v4                                                                  | Modern utility styling through the Vite plugin                      |
| API reference         | Scalar                                                                           | Modern OpenAPI reference rendering                                  |
| Search v1             | Pagefind                                                                         | Static self-hosted search                                           |
| AI search v2          | Kapa AI or Algolia Ask AI                                                        | Public-docs-grounded Ask AI with analytics                          |
| Validation            | TypeScript + tsx                                                                 | Build-time checks and CI gates                                      |
| Schema validation     | astro/zod                                                                        | Typed frontmatter and registry validation                           |
| Registries            | YAML/JSON                                                                        | Source-backed structured documentation data                         |
| Diagrams              | Mermaid, SVG, or Astro components                                                | Architecture and flow diagrams                                      |
| Code blocks           | Starlight / Expressive Code                                                      | Copyable, readable commands and snippets                            |
| CI/CD                 | GitLab CI first, GitHub Actions if repo moves                                    | Build, validate, and publish                                        |
| Hosting               | Static hosting: GitLab Pages, Cloudflare Pages, Vercel, Netlify, or internal CDN | Public docs deployment                                              |

---

## Why this stack

### Astro

Astro is suitable because the documentation system must be static-first, fast, crawlable, and flexible enough for generated content, custom components, API pages, LLM files, and public-safe static agent specs.

Use Astro content collections for structured docs and generated pages.

### Starlight

Starlight should provide the base documentation shell:

- sidebar navigation
- page layout
- table of contents
- search integration
- dark/light mode
- edit links
- Markdown/MDX support
- content collection integration
- component override support

Customize Starlight heavily enough to feel like E2E Cloud Docs, but do not fight it by building a second docs framework inside it.

### MDX

Use MDX for public docs because it supports:

- Markdown authoring
- reusable components
- cards
- callouts
- tabs
- API links
- workflow blocks
- Copy for LLM sections
- page metadata

Do not start with a custom DSL for documentation. Keep the first version simple, maintainable, and easy to generate.

### Tailwind CSS v4

Use Tailwind CSS v4 with the official Vite plugin.

Use it for:

- product cards
- journey timelines
- service hub cards
- related service blocks
- error cards
- support-required badges
- Copy for LLM controls
- Ask AI button and panel shell
- custom landing pages

Avoid over-styling content pages. The docs should feel premium, clear, and focused.

### Scalar

Use Scalar for OpenAPI rendering.

Rules:

- Public API docs must be generated from approved OpenAPI specs.
- Backend code is used for verification and gap reports.
- Do not invent public API documentation from backend code.
- If OpenAPI is incomplete, mark the gap internally.
- Expose UI equivalents, workflow notes, troubleshooting links, and agent operation links around the Scalar reference.

### Pagefind

Use Pagefind for v1 search because it is static, self-hosted, fast, and does not require external infrastructure.

Use metadata filters for:

- product
- service
- category
- page type
- visibility
- API availability

### Ask AI layer

Add Ask AI only after public-source boundaries exist.

Recommended options:

- Kapa AI if analytics, source management, and support-query insight matter most
- Algolia Ask AI if it fits better with DocSearch and existing frontend integration
- Custom RAG only if E2E wants full control and accepts the maintenance cost

Ask AI must use only public-safe sources.

### TypeScript and astro/zod

Use TypeScript and `astro/zod` to validate:

- frontmatter
- service registry
- API registry
- error registry
- related services registry
- solution registry
- agent operation specs
- LLM context metadata
- public/internal boundary rules

Bad metadata must fail the build. Silent metadata drift creates unreliable documentation.

---

## Design principles

The docs must feel like a guided product experience.

Users should always know:

1. where they are
2. what the service does
3. what they can do next
4. how to complete the common task
5. what can fail
6. how to troubleshoot
7. how to automate the same action
8. when support is required

## Visual style

Use a clean cloud-infrastructure style:

- white and neutral backgrounds
- strong dark mode
- subtle borders
- clear cards
- good spacing
- readable typography
- compact but not cramped layouts
- soft shadows only where useful
- E2E brand accent colors
- restrained motion
- no noisy gradients unless used intentionally on landing pages

## UX patterns

Use:

- product cards
- journey cards
- service hub cards
- task checklists
- step blocks
- tabs for UI/API/CLI/Terraform where useful
- error cards
- support-required badges
- limitation callouts
- `Automate this` blocks
- `Next step` blocks
- `Works with` related service cards
- `Copy page` and `Copy for LLM`
- Ask AI as a right-side panel
- Edit this page / Report an issue

Avoid:

- dense sidebars
- deeply nested navigation
- generic page titles
- giant paragraphs
- marketing-heavy prose
- screenshots as the only source of truth
- full API payloads in user guides
- internal implementation details in public docs
- one page per tiny UI action

---

## Information architecture

Public docs structure:

```text
Start Here
MyAccount
TIR
Account & Billing
API & Automation
Reference
Troubleshooting
Solutions / Architecture
Support-Assisted Flows
Release Notes
AI / LLM Context
```

Recommended folder structure:

```text
src/content/docs/
├── start-here/
├── myaccount/
├── tir/
├── account-billing/
├── api/
├── reference/
├── troubleshooting/
├── solutions/
├── support-assisted/
├── release-notes/
└── ai-context/
```

Recommended public routes:

```text
/
/start-here/
/myaccount/
/tir/
/account-billing/
/api/
/reference/
/troubleshooting/
/solutions/
/support-assisted/
/release-notes/
/ai-context/
/llms.txt
/llms-full.txt
/agents/
```

Product and service routes should be predictable:

```text
/{product}/
/{product}/{service}/
/{product}/{service}/getting-started/
/{product}/{service}/how-to/{task}/
/{product}/{service}/reference/{topic}/
/{product}/{service}/troubleshooting/{error-or-issue}/
```

Examples:

```text
/myaccount/compute/
/myaccount/compute/getting-started/create-node/
/myaccount/compute/how-to/access-node/
/myaccount/compute/reference/node-states/
/myaccount/compute/troubleshooting/backup-service-unavailable/
/tir/notebooks/
/tir/inference/how-to/deploy-endpoint/
```

---

## Navigation model

Use separate navigation experiences for MyAccount and TIR while keeping shared areas visible.

Recommended global header:

```text
Docs
MyAccount
TIR
API
Troubleshooting
Solutions
Release Notes
Ask AI
Search
```

Recommended sidebar behavior:

- On MyAccount pages, show MyAccount service navigation first.
- On TIR pages, show TIR service navigation first.
- Always show Account & Billing as shared platform documentation.
- Always show Troubleshooting and API & Automation entry points.
- Keep sidebars shallow. Use pages and cards for deeper routing.

---

## Homepage UX

The homepage should guide users by intent.

Required homepage sections:

```text
Hero
Product cards
Quick paths
Popular tasks
Troubleshoot by error
API & Automation
Solutions / Architecture
Release notes
Ask AI
```

Recommended hero:

```text
Title: E2E Cloud Docs
Subtitle: Build, automate, troubleshoot, and manage E2E Cloud services across MyAccount and TIR.
Primary actions:
  - Start with MyAccount
  - Start with TIR
  - View API docs
  - Troubleshoot an error
```

Recommended quick paths:

```text
I am new to E2E Cloud
I want to create a node
I want to access a node
I want to configure networking
I want to use backups or DR
I want to launch a TIR notebook
I want API access
I am seeing an error
I need to understand billing
I need to raise a support ticket
```

---

## Product landing pages

### MyAccount landing page

```text
MyAccount
├── Overview
├── Start your journey
│   ├── Create account
│   ├── Add credits
│   ├── Create node
│   ├── Access node
│   ├── Secure node
│   ├── Configure networking
│   ├── Add storage
│   ├── Enable backup
│   ├── Recover using DR
│   ├── Monitor resources
│   └── Automate with API
├── Services
├── Popular tasks
├── API & Automation
├── Troubleshooting
└── Reference
```

### TIR landing page

```text
TIR
├── Overview
├── Start your AI journey
│   ├── Create account
│   ├── Understand billing
│   ├── Launch notebook
│   ├── Manage datasets
│   ├── Train model
│   ├── Deploy inference
│   ├── Use GenAI API
│   └── Automate with API or Terraform
├── Services
├── Popular tasks
├── API & Automation
├── Troubleshooting
└── Reference
```

### Account & Billing landing page

```text
Account & Billing
├── Create and manage account
├── Credits and recharge
├── Invoices
├── Usage reports
├── MyAccount billing
├── TIR billing
├── Billing API references
├── Billing troubleshooting
└── Support-assisted billing cases
```

---

## Service hub UX

Each service hub must contain:

```text
Hero summary
Common tasks
Getting started path
Works with
API & Automation
Troubleshooting
Reference
Related solutions
Next steps
```

Service hub example:

```text
MyAccount > Compute
├── Compute overview
├── Create and manage nodes
├── Access a node
├── Secure a node
├── Configure networking
├── Add storage
├── Enable backups
├── Recover with DR
├── API & Automation
├── Troubleshooting
├── Compute reference
└── Related solutions
```

Each `Works with` item must explain the relationship.

Example:

```text
Networking: Use VPCs, public IPs, floating IPs, and firewall rules with compute nodes.
Storage: Attach volumes to expand node storage.
Backup: Enable CDP backups for supported nodes and regions.
Monitoring: Track node health and usage.
Billing: Understand charges for nodes, storage, IPs, backup, and committed resources.
```

---

## Page types

### Public guide

Use for task-based pages.

Required sections:

```markdown
# Page title

## What this is

## When to use this

## Before you begin

## Steps

## Important notes

## Automate this

## Related pages

## Next step
```

Guides should usually be 800 to 1500 words.

Do not include full API payloads. Link to API docs instead.

### Reference page

Use for deeper facts:

- concepts
- behavior
- lifecycle
- user-facing states
- limits
- supported options
- billing behavior
- region behavior if verified
- related APIs
- troubleshooting links

Do not expose exact backend enum values publicly unless approved.

### Troubleshooting page

Troubleshooting must be organized by error message or visible issue.

Required sections:

```markdown
# Error or issue title

## Error message

## UI message

## Backend response

## What it means

## Likely cause

## What to do

## What not to do

## Support required

## Related docs

## Related API docs

## Agent-safe instruction
```

### API page

API pages must be generated from OpenAPI specs and enhanced with docs context.

Required surrounding content:

- API overview
- authentication
- endpoint grouping
- UI equivalent
- workflow notes
- related guides
- related troubleshooting
- related agent operation spec
- OpenAPI/backend status if public-safe

### Solution page

Use for multi-service workflows.

Required sections:

```markdown
# Solution title

## What this solution does

## When to use it

## Services used

## Architecture flow

## Before you begin

## Steps

## Security notes

## Billing notes

## Failure points

## Troubleshooting

## Automate this

## Next step
```

### Release note

Release notes should be short and user-focused.

Each entry should include:

- date
- product
- service
- change type
- summary
- docs links
- API impact if any
- known limitation if public-safe

---

## Content model

Use frontmatter on every page.

Allowed frontmatter:

```yaml
---
title:
description:
product:
category:
service:
feature:
audience:
visibility:
status:
last_verified:
supported_portal:
api_available:
api_spec_status:
support_assisted:
regions:
related_api:
related_ui:
related_services:
related_troubleshooting:
related_solutions:
truth_source:
llm_safe:
agent_actionable:
---
```

Allowed `visibility` values:

```text
public
internal
restricted
```

Forbidden:

```yaml
owner:
```

Use `src/content.config.ts` to extend Starlight frontmatter schema and validate required metadata.

---

## Code-driven documentation pipeline

The docs must be source-backed.

Source priority:

```text
1. Backend code
2. Frontend code
3. OpenAPI specs
4. Existing docs
```

Pipeline:

```text
1. Extract backend behavior.
2. Extract frontend routes, labels, UI states, forms, and messages.
3. Extract OpenAPI endpoints.
4. Compare OpenAPI against backend behavior.
5. Audit old docs.
6. Normalize extracted facts into YAML/JSON.
7. Update registries.
8. Generate or update public docs.
9. Generate or update internal docs.
10. Generate or update API docs.
11. Generate or update troubleshooting docs.
12. Generate or update LLM context.
13. Generate or update agent specs.
14. Run validation.
15. Human QA review.
16. Publish.
```

Do not generate final prose directly from old docs.

---

## Docs-system structure

```text
docs-system/
├── source/
│   ├── frontend/
│   ├── backend/
│   ├── openapi/
│   └── existing-docs/
├── extracted/
│   ├── backend-routes.yaml
│   ├── backend-validations.yaml
│   ├── backend-errors.yaml
│   ├── backend-permissions.yaml
│   ├── backend-resource-states.yaml
│   ├── backend-limitations.yaml
│   ├── frontend-routes.yaml
│   ├── frontend-ui-messages.yaml
│   ├── frontend-user-flows.yaml
│   ├── frontend-form-fields.yaml
│   ├── openapi-endpoints.yaml
│   └── existing-docs-map.yaml
├── registry/
│   ├── services.yaml
│   ├── api-registry.yaml
│   ├── error-registry.yaml
│   ├── ui-message-registry.yaml
│   ├── limitation-registry.yaml
│   ├── permission-registry.yaml
│   ├── support-flow-registry.yaml
│   ├── related-services-registry.yaml
│   ├── solution-registry.yaml
│   ├── docs-coverage.yaml
│   └── public-internal-boundary.yaml
├── generated/
│   ├── public-docs/
│   ├── internal-docs/
│   ├── api-docs/
│   ├── troubleshooting/
│   ├── reference/
│   ├── llm-context/
│   └── agent-specs/
├── rules/
├── templates/
├── scripts/
└── validation/
```

---

## Internal documentation

Internal docs must live outside public docs:

```text
internal-docs/
├── myaccount/
├── tir/
├── support-runbooks/
├── qa-validation/
├── known-issues/
└── api-gap-reports/
```

Internal docs may include:

- source file references
- backend enum values
- internal debugging steps
- QA validation notes
- API mismatch reports
- support handling details
- suspected bugs
- known internal issues

Internal docs must not be indexed by public search, public Ask AI, or public LLM files.

---

## Public/internal boundary

Public docs may include:

- public product behavior
- UI steps
- public-safe UI messages
- public-safe backend errors
- public API behavior
- public-safe limitations
- support-ticket-required notices
- public-safe troubleshooting
- public-safe agent rules

Public docs must not include:

- internal URLs
- private repo links
- internal Slack/Jira/GitLab links
- database queries
- manual backend fixes
- internal escalation names
- customer-specific data
- secrets or tokens
- credentials
- private infrastructure names
- QA-only notes
- internal vulnerabilities

The public build must fail if these appear.

---

## API documentation model

Recommended API section:

```text
API & Automation
├── Overview
├── Authentication
├── MyAccount API
├── TIR API
├── API errors
├── Terraform
├── CLI
└── Agent operation specs
```

API generation rules:

1. Generate public API reference from OpenAPI.
2. Use Scalar for rendering.
3. Use backend code only for verification and internal gap reports.
4. Record OpenAPI/backend mismatches.
5. Do not publish undocumented backend behavior as API docs unless approved.

API status values:

```text
verified
partial
partial_match
missing_from_openapi
missing_from_backend
stale_or_invalid
mismatch
undocumented
```

---

## Troubleshooting model

Troubleshooting should be searchable by exact error message.

Troubleshooting sources:

- backend error registry
- UI message registry
- known public-safe failure states
- support-assisted flow registry
- API error responses

Every public-safe backend error should map to:

- troubleshooting page
- related API docs
- related public guide
- support-required status
- agent-safe instruction

---

## LLM documentation model

Generate:

```text
public/llms.txt
public/llms-full.txt
src/content/docs/ai-context/myaccount.md
src/content/docs/ai-context/tir.md
src/content/docs/ai-context/errors.md
src/content/docs/ai-context/limitations.md
```

LLM files must include:

- product summaries
- service summaries
- canonical links
- public-safe limitations
- exact public-safe errors
- support-ticket rules
- API availability notes
- do-not-answer rules
- agent safety rules

LLM files must not include internal docs, source code, internal notes, QA validation details, or private links.

---

## Agent operation specs

Agent operation specs must be public-safe YAML files.

Recommended location:

```text
public/agents/
```

or:

```text
src/content/docs/api/agent-specs/
```

Every operation must include:

```yaml
operation:
product:
service:
visibility:
write_action:
destructive_action:
committed_resource_action:
billing_impact:
security_impact:
confirmation_required:
confirmation_message:
required_inputs:
optional_inputs:
preconditions:
api:
api_spec_status:
success_condition:
failure_handling:
rollback:
support_required:
agent_rules:
```

Confirmation is required for:

- create actions
- delete actions
- committed resources
- billing-impacting changes
- security-impacting changes
- infrastructure-modifying changes

Agents must not claim success unless the API response confirms success.

---

## Copy for LLM

Add a `Copy for LLM` control on important pages.

Copied output should include:

```text
Title
Canonical URL
Short summary
Main content
Related docs
Related API docs
Related troubleshooting
Public-safe limitations
Last verified date
```

The copied output must exclude:

```text
internal notes
private source references
draft comments
QA validation notes
unpublished content
```

Implementation approach:

1. Create `CopyForLLM.astro`.
2. Build a page-level transformer that extracts public-safe content.
3. Use frontmatter and registries to append related links.
4. Validate copied content against public/internal boundary rules.

---

## Ask AI

Preferred UX:

- button in header
- optional button in page toolbar
- right-side chat panel
- public-source-only answers
- visible source links
- refusal when answer is not in public docs
- analytics for unanswered questions

Ask AI source allowlist:

```text
src/content/docs/**/*.md
src/content/docs/**/*.mdx
public/llms.txt
public/llms-full.txt
public/agents/**/*.yaml
public OpenAPI specs
```

Ask AI source blocklist:

```text
internal-docs/**
docs-system/source/**
docs-system/extracted/** unless explicitly public-safe generated output
docs-system/generated/internal-docs/**
private source code
private tickets
private support notes
```

---

## Edit this page and feedback

If docs source is public, use Starlight edit links pointing to public GitHub source.

If docs source is private, do not expose private repository URLs. Use one of:

- public issue form
- feedback form
- support ticket path
- `Suggest an update` public-safe route

Every page should expose one public-safe feedback mechanism.

---

## UI components

Create reusable components:

```text
src/components/ProductCard.astro
src/components/JourneyCard.astro
src/components/ServiceHubCard.astro
src/components/RelatedServiceCard.astro
src/components/AutomateThis.astro
src/components/NextStep.astro
src/components/SupportRequired.astro
src/components/ErrorMessage.astro
src/components/LimitationCallout.astro
src/components/ApiReferenceLink.astro
src/components/RelatedTroubleshooting.astro
src/components/PublicSafeNotice.astro
src/components/StatusBadge.astro
src/components/VerifiedDate.astro
src/components/CopyForLLM.astro
src/components/AskAIButton.astro
src/components/EditPageLink.astro
src/components/PageActions.astro
src/components/ServiceRelationshipMap.astro
```

Use components to enforce consistency instead of rewriting the same block differently on every page.

---

## Service list and priority

Initial services:

```text
myaccount_account
myaccount_billing
myaccount_compute
myaccount_networking
myaccount_storage
myaccount_backup
myaccount_disaster_recovery
myaccount_monitoring
myaccount_api_auth
tir_account
tir_billing
tir_notebooks
tir_datasets
tir_inference
tir_training
tir_genai_api
tir_terraform
```

Recommended priority:

```text
1. MyAccount Account & Billing
2. MyAccount Compute Nodes
3. MyAccount Networking / Reserve IP / Floating IP
4. MyAccount Storage / Volumes
5. MyAccount Backup / CDP
6. MyAccount Disaster Recovery
7. MyAccount Monitoring
8. MyAccount API Authentication
9. TIR Billing / Account relationship
10. TIR Notebooks
11. TIR Datasets
12. TIR Inference
13. TIR Training
14. TIR GenAI API
15. TIR Terraform
```

Recommended first vertical slice:

```text
MyAccount Compute Nodes
```

This slice should include service hub, getting started, one or two core how-to pages, reference, troubleshooting, API links, LLM summary, and an agent spec if applicable.

---

## Validation scripts

Required validation scripts:

```text
docs-system/validation/check-public-internal-boundary.ts
docs-system/validation/check-frontmatter.ts
docs-system/validation/check-links.ts
docs-system/validation/check-api-coverage.ts
docs-system/validation/check-error-coverage.ts
docs-system/validation/check-agent-specs.ts
docs-system/validation/check-llm-context.ts
docs-system/validation/check-openapi-backend-match.ts
docs-system/validation/check-docs-coverage.ts
docs-system/validation/check-service-hubs.ts
docs-system/validation/check-related-services.ts
docs-system/validation/report-stale-pages.ts
```

Validation must fail when:

- public docs include internal-only content
- public docs link to internal docs
- required frontmatter is missing
- `owner` appears in frontmatter
- a public guide lacks `Automate this`
- a public guide lacks `Next step`
- a service hub lacks `Works with`
- a service hub lacks `API & Automation`
- a service hub lacks `Troubleshooting`
- an API-enabled page lacks related API links
- troubleshooting lacks support-required status
- troubleshooting lacks `What not to do`
- agent specs lack confirmation rules
- LLM docs include internal content
- OpenAPI mismatch is not recorded
- old docs are reused without verification
- Ask AI source config includes internal docs
- Copy for LLM includes internal content

---

## Package scripts

Recommended `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "format": "prettier --write .",
    "lint:md": "markdownlint '**/*.{md,mdx}'",
    "validate": "pnpm validate:frontmatter && pnpm validate:boundary && pnpm validate:links && pnpm validate:api && pnpm validate:errors && pnpm validate:agents && pnpm validate:llm && pnpm validate:service-hubs",
    "validate:frontmatter": "tsx docs-system/validation/check-frontmatter.ts",
    "validate:boundary": "tsx docs-system/validation/check-public-internal-boundary.ts",
    "validate:links": "tsx docs-system/validation/check-links.ts",
    "validate:api": "tsx docs-system/validation/check-api-coverage.ts",
    "validate:errors": "tsx docs-system/validation/check-error-coverage.ts",
    "validate:agents": "tsx docs-system/validation/check-agent-specs.ts",
    "validate:llm": "tsx docs-system/validation/check-llm-context.ts",
    "validate:service-hubs": "tsx docs-system/validation/check-service-hubs.ts",
    "extract:backend": "tsx docs-system/scripts/extract-backend.ts",
    "extract:frontend": "tsx docs-system/scripts/extract-frontend.ts",
    "extract:openapi": "tsx docs-system/scripts/extract-openapi.ts",
    "compare:openapi": "tsx docs-system/scripts/compare-openapi-backend.ts",
    "generate:docs": "tsx docs-system/scripts/generate-docs.ts",
    "generate:llms": "tsx docs-system/scripts/generate-llms.ts",
    "generate:agents": "tsx docs-system/scripts/generate-agent-specs.ts"
  }
}
```

---

## Build phases

### Phase 1: Docs shell

Create:

```text
Astro
Starlight
Tailwind CSS v4
custom landing page
product landing pages
base components
Pagefind search
light/dark mode
```

### Phase 2: IA and templates

Create:

```text
public docs structure
frontmatter schema
service hub template
public guide template
reference template
troubleshooting template
solution template
internal runbook template
agent operation template
```

### Phase 3: Docs-system foundation

Create:

```text
source folders
extracted files
registry files
rules
scripts
validation checks
```

### Phase 4: First service vertical slice

Implement:

```text
MyAccount Compute service hub
create node guide
access node guide
compute reference
compute troubleshooting
compute API links
compute LLM summary
compute agent spec if applicable
```

### Phase 5: API and automation

Add:

```text
OpenAPI ingestion
Scalar pages
API registry
OpenAPI/backend gap report
Terraform/CLI placeholders if applicable
agent operation specs
```

### Phase 6: LLM and Ask AI

Add:

```text
llms.txt
llms-full.txt
ai-context pages
Copy for LLM
Ask AI source configuration
Ask AI public-safe boundary checks
analytics for unanswered questions
```

### Phase 7: Service expansion

Repeat service-by-service using the same workflow and validation.

---

## Final recommendation

Build the docs as a documentation operating system, not as a pile of Markdown pages.

The recommended approach is:

```text
Cloud-style IA
→ GitBook-quality UX
→ code-backed fact extraction
→ structured registries
→ generated docs
→ public/internal safety validation
→ LLM and agent outputs
→ human QA approval
→ release
```

The recommended stack is:

```text
Astro + Starlight + MDX + Tailwind CSS v4 + Scalar + Pagefind + TypeScript + astro/zod
```

Add Kapa AI or Algolia Ask AI after the public-source boundary and LLM files are reliable.

The standard is simple: if the docs cannot be verified, searched, reused by LLMs, and safely exposed to users, they are not done.
