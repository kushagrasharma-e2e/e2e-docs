# AGENTS.md

## Project

You are working on the E2E Networks Documentation Operating System.

This project is not a normal documentation rewrite. The goal is to build a documentation system that is:

- truthful from source code and OpenAPI specs
- easy for customers to use
- safe for public release
- useful for support, QA, and developers
- readable by LLMs
- usable by AI assistants
- safe for agentic workflows
- validated before release

Do not make old documentation prettier. Build a system that can prove where its facts came from.

---

## North star

Use these inputs as the current direction:

1. `cloud_documentation_flow.md`
2. Platform review notes from LangChain, GitBook, Mintlify, Fern, Fly.io, AWS, Azure, Google Cloud, and DigitalOcean
3. `design-and-tech-stack.md`
4. Existing `AGENTS.md` only as historical baseline

The documentation system must move toward:

```text
GitBook-quality UX
+ cloud-style service hubs
+ journey-first product navigation
+ source-code-backed truth extraction
+ structured registries
+ generated public/internal docs
+ OpenAPI-backed API references
+ error-message-based troubleshooting
+ LLM-readable context
+ safe agent operation specs
+ release validation gates
```

---

## Non-negotiable principles

1. The service hub is the center of gravity.
2. Product journeys must be visible before deep reference content.
3. Related services must be local and contextual, not hidden in one giant dependency page.
4. Solution pages are for multi-service workflows.
5. Public API docs must be generated from approved OpenAPI specs.
6. Backend code validates behavior and reveals gaps, but must not silently rewrite public API docs.
7. Existing docs are reference material, not truth.
8. Public docs must never expose internal-only information.
9. LLM and agent content must be generated from public-safe registries and docs.
10. No feature should be considered documented until validation passes.

---

## Products covered

The docs cover two major product areas under one E2E Cloud documentation system:

```text
E2E Cloud Docs
├── MyAccount
└── TIR
```

MyAccount and TIR must remain clearly separate in navigation, routes, service hubs, troubleshooting, API docs, and release notes.

Shared concepts must not be duplicated inconsistently. Use a shared `Account & Billing` area for:

- account creation and identity
- credits and recharge
- billing
- invoices
- usage reports
- API authentication
- support
- common troubleshooting
- release notes where applicable

TIR depends on MyAccount account identity and billing, so shared account and billing pages must be treated as platform-level documentation.

---

## User mental model

Users should be able to answer these questions on every major page:

1. Where am I?
2. What is this service or workflow?
3. What can I do here?
4. What should I do first?
5. What can go wrong?
6. How do I fix common errors?
7. How do I automate this?
8. Which API, CLI, Terraform, or agent operation maps to this?
9. What should I do next?
10. When do I need support?

If a page does not help answer at least one of these questions, reconsider whether it should exist.

---

## Information architecture

Use a cloud-style three-layer model:

```text
Global discovery layer
→ Product / service hub layer
→ Task, reference, API, troubleshooting, and solution layer
```

The public top-level structure should be:

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

The preferred user route is:

```text
Home
→ Product landing page
→ Service hub
→ Getting started / How-to / Reference / API / Troubleshooting
→ Related service or next step
```

Do not make dependency-first navigation the main route. Users expect to start with the product or service they are using.

---

## Product landing pages

### Home page

The home page must guide users by intent instead of acting as a generic index.

Required sections:

```text
Hero
Product cards
Quick paths
Popular tasks
Troubleshoot by error
API and automation entry
Release notes
Ask AI entry
```

Recommended quick paths:

```text
I am new to E2E Cloud
I want to create a node
I want to use TIR
I want API access
I am seeing an error
I want to understand billing
I need to raise a support ticket
```

### MyAccount landing page

Use a journey-first structure:

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
│   ├── Monitor resources
│   └── Automate with API
├── Services
├── Popular tasks
├── API & Automation
├── Troubleshooting
└── Reference
```

### TIR landing page

Use a journey-first AI workflow structure:

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

Use a shared platform structure:

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

## Service hub model

Every major service must have one public service hub.

A service hub must explain the service, route users to common tasks, surface related services, and connect to API, troubleshooting, and reference content.

Required service hub sections:

```text
What this service does
Common tasks
Getting started
Works with
API & Automation
Troubleshooting
Reference
Related solutions
Next steps
```

Recommended route pattern:

```text
/{product}/{service}/
/{product}/{service}/getting-started/
/{product}/{service}/how-to/{task}/
/{product}/{service}/reference/
/{product}/{service}/troubleshooting/
```

Examples:

```text
/myaccount/compute/
/myaccount/compute/getting-started/create-node/
/myaccount/compute/how-to/access-a-node/
/myaccount/compute/reference/node-states/
/myaccount/compute/troubleshooting/backup-service-unavailable/
```

Use fewer, stronger pages. Do not create one tiny page for every button unless the action is critical, complex, commonly searched, billing-impacting, security-impacting, destructive, or support-assisted.

---

## Related services and dependencies

Do not create a single master “Dependent Services” section as the primary user path.

Use three placements:

### 1. Inside service hubs

Add a short `Works with` section.

Each related service must explain why it matters.

Bad:

```text
Networking
Storage
Backup
```

Good:

```text
Networking: Use VPCs, public IPs, floating IPs, and firewall rules with compute nodes.
Storage: Attach volumes to expand node storage.
Backup: Enable CDP backups for supported nodes and regions.
```

### 2. Inside task guides

Only link to related services when they affect the current task.

Example:

```text
When creating a node, networking, SSH keys, images, billing, backup, and security rules may affect the setup.
```

### 3. Inside Solutions / Architecture

Use solution pages for multi-service workflows.

Examples:

```text
Run a public web server
Create a private network workload
Set up a backup-ready compute workload
Recover a workload using Disaster Recovery
Use TIR notebooks with datasets
Deploy an inference endpoint
```

---

## Documentation layers

Every major service should support these layers:

| Layer            | Purpose                                       | Public?               |
| ---------------- | --------------------------------------------- | --------------------- |
| Service hub      | Route users through the service               | Yes                   |
| Public guide     | Help users complete tasks                     | Yes                   |
| Reference        | Explain concepts, lifecycle, behavior, limits | Yes                   |
| API docs         | Help developers automate from OpenAPI         | Yes                   |
| Troubleshooting  | Resolve known public-safe errors              | Yes                   |
| LLM context      | Help AI answer safely from public docs        | Yes                   |
| Agent specs      | Help agents perform safe operations           | Yes, public-safe only |
| Internal runbook | Help QA/support/dev validate and debug        | No                    |
| API gap report   | Track OpenAPI/backend mismatch                | No                    |

Do not mix all layers into one page. Link between layers instead.

---

## Source-of-truth order

Use this order when creating or validating docs:

```text
1. Backend code
2. Frontend code
3. OpenAPI specs
4. Existing docs
```

### Backend code is source of truth for

```text
actual behavior
API routes
request fields
response behavior
validation rules
backend error messages
permission checks
authentication requirements
resource lifecycle
billing triggers
quota checks
region restrictions
plan restrictions
support-only constraints
failure cases
```

### Frontend code is source of truth for

```text
user journeys
routes
navigation labels
form fields
button labels
dropdown options
UI messages
toasts
banners
modals
confirmation dialogs
empty states
disabled states
client-side validation
visible user experience
```

### OpenAPI specs are source of truth for public API docs

Public API docs must be generated from OpenAPI specs.

Backend code must be used to verify OpenAPI accuracy and produce internal gap reports.

If backend code and OpenAPI disagree:

1. Record the mismatch.
2. Generate or update the internal API gap report.
3. Do not silently change public API docs from backend code.
4. Wait for explicit approval before publishing behavior that is not in the approved OpenAPI spec.

### Existing docs are weak reference material

Existing docs may be used for:

```text
old URLs
redirect planning
possible page names
coverage comparison
historical feature hints
possible wording
```

Existing docs must start as unverified until checked against source.

---

## Mandatory workflow for agents

When creating or updating documentation, follow this workflow:

```text
1. Read AGENTS.md.
2. Read design-and-tech-stack.md.
3. Read the relevant rule files from docs-system/rules/.
4. Use index.md to find likely source locations.
5. Inspect backend code for behavior, validations, errors, permissions, lifecycle, and limits.
6. Inspect frontend code for routes, UI labels, flows, forms, states, and messages.
7. Inspect OpenAPI specs for public API definitions.
8. Compare OpenAPI specs against backend behavior.
9. Audit existing docs for old URLs, coverage, duplication, and possible reusable content.
10. Update extracted YAML/JSON files.
11. Update registries.
12. Generate or update public docs.
13. Generate or update internal docs and API gap reports if needed.
14. Generate or update troubleshooting entries.
15. Generate or update LLM context files.
16. Generate or update agent operation specs.
17. Run validation.
18. Report changed files, source evidence, mismatches, and unresolved gaps.
```

Do not jump from old docs directly to new prose.

---

## Repository structure

Use this structure:

```text
e2e-docs/
├── AGENTS.md
├── CLAUDE.md
├── index.md
├── design-and-tech-stack.md
├── package.json
├── astro.config.mjs
├── src/
│   ├── content.config.ts
│   ├── content/
│   │   └── docs/
│   │       ├── start-here/
│   │       ├── myaccount/
│   │       ├── tir/
│   │       ├── account-billing/
│   │       ├── api/
│   │       ├── reference/
│   │       ├── troubleshooting/
│   │       ├── solutions/
│   │       ├── support-assisted/
│   │       ├── release-notes/
│   │       └── ai-context/
│   ├── components/
│   ├── layouts/
│   ├── styles/
│   └── pages/
├── public/
│   ├── llms.txt
│   ├── llms-full.txt
│   └── agents/
├── docs-system/
│   ├── source/
│   ├── extracted/
│   ├── registry/
│   ├── generated/
│   ├── rules/
│   ├── templates/
│   ├── scripts/
│   └── validation/
└── internal-docs/
    ├── myaccount/
    ├── tir/
    ├── support-runbooks/
    ├── qa-validation/
    ├── known-issues/
    └── api-gap-reports/
```

Public docs belong in `src/content/docs/`.

Public static LLM and agent files belong in `public/`.

Generated and structured documentation system files belong in `docs-system/`.

Internal docs belong in `internal-docs/` and must never be included in the public build.

---

## Required docs-system files

Create and maintain:

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
├── rules/
│   ├── source-of-truth-rules.md
│   ├── public-docs-rules.md
│   ├── internal-docs-rules.md
│   ├── api-docs-rules.md
│   ├── troubleshooting-rules.md
│   ├── llm-docs-rules.md
│   ├── agent-docs-rules.md
│   ├── service-hub-rules.md
│   ├── solution-docs-rules.md
│   └── security-boundary-rules.md
├── templates/
│   ├── service-hub-template.mdx
│   ├── public-guide-template.mdx
│   ├── reference-template.mdx
│   ├── troubleshooting-template.mdx
│   ├── api-reference-template.mdx
│   ├── solution-template.mdx
│   ├── internal-runbook-template.md
│   ├── llm-summary-template.md
│   └── agent-operation-template.yaml
├── scripts/
│   ├── extract-backend.ts
│   ├── extract-frontend.ts
│   ├── extract-openapi.ts
│   ├── compare-openapi-backend.ts
│   ├── generate-docs.ts
│   ├── generate-llms.ts
│   └── generate-agent-specs.ts
└── validation/
    ├── check-public-internal-boundary.ts
    ├── check-frontmatter.ts
    ├── check-links.ts
    ├── check-api-coverage.ts
    ├── check-error-coverage.ts
    ├── check-agent-specs.ts
    ├── check-llm-context.ts
    ├── check-openapi-backend-match.ts
    ├── check-docs-coverage.ts
    ├── check-service-hubs.ts
    ├── check-related-services.ts
    └── report-stale-pages.ts
```

Python extractors may be added for Python/Django backend analysis if TypeScript parsing is not practical. The normalized output must still be YAML or JSON in `docs-system/extracted/`.

---

## Code index

Maintain `index.md` as the source navigation map for agents.

Use it to find likely:

```text
frontend routes
frontend components
backend routers
backend views
serializers
services
models
billing modules
permission modules
service-specific directories
OpenAPI spec files
```

`index.md` is not source of truth for behavior. It only helps agents find the code.

When better source locations are discovered, update `index.md`.

Mark uncertain mappings as:

```yaml
status: missing
status: partial
status: needs_verification
```

Do not put secrets, customer data, internal escalation steps, private URLs, or unverified behavior in `index.md`.

---

## Service registry

Maintain `docs-system/registry/services.yaml`.

Each service entry must include:

```yaml
id:
product:
name:
description:
priority:
public:
service_hub:
getting_started:
how_to:
reference:
api_docs:
troubleshooting:
llm_context:
agent_specs:
related_services:
solutions:
source_status:
documentation_status:
last_verified:
```

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

Priority order:

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

If unsure where to start, start with MyAccount Compute Nodes.

---

## Related services registry

Maintain `docs-system/registry/related-services-registry.yaml`.

Purpose: power `Works with`, `Related services`, `Common integrations`, and task-specific cross-links.

Example:

```yaml
relations:
  - source_service: myaccount_compute
    related_service: myaccount_networking
    relationship_type: required_or_common
    public_label: Networking
    public_reason: Use VPCs, public IPs, floating IPs, and firewall rules with compute nodes.
    placement:
      - service_hub
      - create_node_guide
    visibility: public
    verified_from:
      - frontend_code
      - backend_code
    confidence: medium
    verification_status: verified
```

Do not invent service relationships.

If likely but unverified, mark:

```yaml
confidence: low
verification_status: needs_verification
```

---

## Solution registry

Maintain `docs-system/registry/solution-registry.yaml`.

Use solutions for multi-service architecture workflows only.

Example:

```yaml
solutions:
  - id: secure_web_server
    title: Run a secure web server
    audience:
      - new_customer
      - developer
    services:
      - myaccount_compute
      - myaccount_networking
      - myaccount_api_auth
      - myaccount_monitoring
    public_route: /solutions/secure-web-server/
    required_docs:
      - compute_service_hub
      - networking_reference
      - firewall_troubleshooting
    status: planned
```

Solutions must not become a dumping ground for every possible combination.

---

## Public page types

### Service hub

Required sections:

```text
What this service does
Common tasks
Getting started
Works with
API & Automation
Troubleshooting
Reference
Related solutions
Next steps
```

### Public guide

Required sections:

```text
What this is
When to use this
Before you begin
Steps
Important notes
Automate this
Related pages
Next step
```

Guides should usually be 800 to 1500 words. Keep them step-based and readable.

### Reference page

Use for:

```text
concepts
resource lifecycle
user-facing states
supported options
limitations
billing behavior
region behavior, if verified
related APIs
related troubleshooting
related services
```

Do not expose exact backend enum values unless explicitly approved for public documentation.

### Troubleshooting page

Troubleshooting must be organized by error message.

Required sections:

```text
Error message
UI message, if available
Backend response, if public-safe
What it means
Likely cause
What to do
What not to do
Support required: Yes / No / Sometimes
Related docs
Related API docs
Agent-safe instruction
```

### API page

API docs live under `src/content/docs/api/` and are generated from OpenAPI specs.

Each API page must include:

```text
Endpoint
Method
Authentication
Required permissions
Request schema
Response schema
Error responses
UI equivalent
Workflow notes
Related troubleshooting
Related agent operation, if applicable
```

### Solution page

Required sections:

```text
What this solution does
When to use it
Services used
Architecture flow
Before you begin
Steps
Security notes
Billing notes
Failure points
Troubleshooting
Automate this
Next step
```

### LLM context page

Generate:

```text
public/llms.txt
public/llms-full.txt
src/content/docs/ai-context/myaccount.md
src/content/docs/ai-context/tir.md
src/content/docs/ai-context/errors.md
src/content/docs/ai-context/limitations.md
```

### Agent operation spec

Agent specs must be public-safe and live in:

```text
public/agents/
```

or:

```text
src/content/docs/api/agent-specs/
```

depending on site implementation.

---

## Public documentation requirements

Public docs must be:

```text
short
step-based
journey-based
accurate
easy to scan
friendly to new customers
connected to API/reference/troubleshooting
safe for public search and Ask AI
```

Every public page should include where relevant:

```text
Edit this page
Report an issue
Ask AI
Copy page
Copy for LLM
Last verified date
Related pages
Next step
```

Every public service hub must include:

```text
Works with
API & Automation
Troubleshooting
Reference
```

Every public guide must include:

```text
Automate this
Next step
```

Every API-enabled guide must link to relevant API docs.

Every troubleshooting page must include:

```text
Support required: Yes / No / Sometimes
What not to do
```

---

## Ask AI requirements

The public docs site should support an Ask AI experience.

Preferred UX:

```text
Ask AI button in header and/or page toolbar
Right-side chat panel
Answers grounded only in public-safe docs
Source links shown
Fallback answer when public docs do not contain the answer
```

Allowed public AI sources:

```text
public docs
public API docs
public troubleshooting docs
public reference docs
public LLM context
public release notes
public agent specs
```

Blocked sources:

```text
internal-docs/
docs-system/source/
private source code
backend code
frontend code
internal runbooks
QA notes
known internal issues
customer data
private tickets
private Slack/Jira/GitLab links
```

If the answer cannot be confirmed from public docs, Ask AI must say that the information is not available in public docs.

Ask AI must not invent pricing, regions, availability, API fields, or operational behavior.

---

## Copy for LLM requirements

Add a `Copy for LLM` action where practical.

The copied content should include:

```text
page title
canonical URL
short summary
main content
related docs
related API docs
troubleshooting links
last verified date
public-safe limitations
```

It must not include:

```text
internal notes
private source references
draft-only comments
QA validation notes
unpublished content
```

For long pages, generate an LLM-friendly summary from registries and frontmatter.

---

## Edit and feedback links

Public docs should expose:

```text
Edit this page
Report an issue
Suggest an update
```

If the docs source is public, `Edit this page` may point to GitHub.

If the docs source is private, do not expose private repository links. Use a public-safe issue or feedback form instead.

---

## Frontmatter rules

Every Markdown/MDX page must include frontmatter.

Allowed fields:

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

Forbidden frontmatter:

```yaml
owner:
```

The testing team owns the documentation system as a governance function. Do not assign page ownership to individuals in public frontmatter.

---

## Public/internal boundary

Public docs may include:

```text
product behavior
UI steps
public API behavior
public-safe backend errors
public UI messages
public-safe limitations
support-ticket-required notices
public-safe troubleshooting
public-safe agent rules
```

Public docs must never include:

```text
internal service URLs
internal database queries
private repo URLs
internal Slack links
internal Jira links
internal GitLab links
internal escalation names
internal team-only process
manual backend correction steps
private operational procedures
customer-specific data
credentials
secrets
private tokens
SSH private keys
internal-only vulnerabilities
private infrastructure names
QA-only validation notes
```

Public docs must not link to:

```text
/internal/
internal-docs/
internal-runbook.md
validation-notes.md
private Jira
private Slack
private GitLab
private source file browser URLs
```

The public build must fail if internal content is included.

---

## Error registry rules

Every extracted public-safe backend error must be added to `docs-system/registry/error-registry.yaml`.

Example:

```yaml
errors:
  - id: backup_service_unavailable
    product: myaccount
    service: myaccount_backup
    visibility: public
    backend_message: "Backup service is temporarily unavailable for this region. Please try again later or contact support."
    ui_message: "Backups are temporarily unavailable in this region. Enable them later from node settings after creating your node."
    meaning: "The backup service is temporarily unavailable in the selected region."
    user_action: "Create the node without backup and enable backup later from node settings."
    what_not_to_do:
      - "Do not repeatedly retry the same request without changing region or backup selection."
    support_required: false
    public_doc: /troubleshooting/backup-service-unavailable/
```

If a public-safe backend error has no troubleshooting page, mark coverage as missing.

---

## UI message registry rules

Every important UI message must be added to `docs-system/registry/ui-message-registry.yaml`.

Include:

```text
message ID
product
service
exact UI message
where it appears
related backend error, if any
source frontend files
public-safe status
```

---

## Support-assisted flow rules

Public docs may include:

```text
when to raise a ticket
what information to include
resource ID or CRN requirement
region
screenshot
API error response
approximate time of failure
```

Public docs must not include internal handling steps.

Public docs may say:

```text
This operation requires a support ticket.
```

Internal docs may explain how support, QA, or developers should handle it.

---

## LLM documentation rules

LLM docs must be public and crawlable.

Generate:

```text
public/llms.txt
public/llms-full.txt
src/content/docs/ai-context/myaccount.md
src/content/docs/ai-context/tir.md
src/content/docs/ai-context/errors.md
src/content/docs/ai-context/limitations.md
```

LLM docs must include:

```text
product summaries
canonical page links
full public-safe summaries
exact public-safe error messages
support-ticket rules
limitations
API availability notes
do-not-answer rules
agent-safety rules
```

LLM docs must be generated from registries and public docs, not manually maintained as a second source of truth.

Do-not-answer rules:

```text
Do not invent prices.
Do not invent regions.
Do not invent unsupported APIs.
Do not claim all services are available everywhere.
Do not claim a resource was created unless API success confirms it.
Do not expose internal-only process.
Do not provide customer-specific advice without required context.
Do not mention internal runbook details in public answers.
Do not provide exact backend enum values unless public-approved.
```

---

## Agent operation spec rules

Agent specs must be public-safe.

Agents may perform write actions only with strict confirmation for:

```text
resource creation
resource deletion
committed resource operations
billing-impacting actions
infrastructure-modifying actions
security-impacting actions
```

Every agent operation must include:

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

Agents must not claim success unless the API response confirms success.

Agents must show useful public-safe backend errors on failure.

Agents must not use internal-only workarounds, private operational knowledge, or manual backend correction steps.

---

## Validation rules

Implement validation scripts in TypeScript.

Validation must fail when:

```text
public docs include internal-only links
public docs include blocked internal terms
public docs lack required frontmatter
public docs lack visibility
public pages include owner
public guide lacks Next step
public guide lacks Automate this
service hub lacks Works with
service hub lacks API & Automation
service hub lacks Troubleshooting
API-enabled page lacks related API link
troubleshooting page lacks Support required
troubleshooting page lacks What not to do
agent specs lack confirmation rules
LLM docs include internal content
OpenAPI mismatch is not recorded
old docs are reused without verification
Ask AI source config includes internal docs
Copy for LLM includes internal content
```

---

## Required UI components

Create reusable Astro components:

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
```

Components must be public-safe by default. They must not render internal source references unless explicitly used inside internal docs.

---

## Implementation sequence

Build in this order:

```text
Phase 1: Docs shell and design system
Phase 2: Public IA, product landing pages, service hub templates
Phase 3: Docs-system registries and validation schemas
Phase 4: First complete service, preferably MyAccount Compute
Phase 5: API rendering and OpenAPI/backend gap reporting
Phase 6: Troubleshooting and error registry
Phase 7: LLM files and Copy for LLM
Phase 8: Ask AI with public-safe source boundaries
Phase 9: Agent operation specs
Phase 10: Repeat service-by-service
```

Do not wait for every automation script to be perfect before creating the first useful service hub. Build one complete, verified vertical slice first.

---

## Definition of done

A service is documented only when all of these are true:

```text
service registry entry exists
source evidence is recorded
service hub exists
at least one getting-started guide exists
reference page exists if behavior is complex
API links exist if API is available
troubleshooting exists for known public-safe errors
related services are registered and shown contextually
LLM summary is generated
agent spec exists if operations are agent-actionable
internal notes or gap reports exist where needed
frontmatter is valid
public/internal boundary check passes
links pass
OpenAPI/backend mismatches are recorded
last_verified is set
```

Anything less is draft work.
