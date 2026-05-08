# Public Docs Rules

## Purpose

These rules define how public documentation must be written, structured, and validated.

Public docs are for customers, developers, API users, automation users, LLMs, chatbots, and public-safe agents.

Public docs must be truthful, short, step-based, journey-focused, and safe to publish.

---

# 1. Public Docs Principles

Public docs must be:

- Short
- Step-based
- Journey-based
- Beginner-friendly
- Accurate
- Product-behavior-driven
- Public-safe
- Searchable
- LLM-readable
- Linked to deeper reference/API/troubleshooting pages

Public docs must avoid:

- Giant all-in-one pages
- Internal implementation details
- Backend enum dumps
- Full API payloads inside user guides
- Unverified platform claims
- Marketing-heavy wording
- Hidden limitations
- Unsupported workarounds presented as official behavior

---

# 2. Page Length

Public human guides should usually be:

```text
800–1500 words
```

Longer pages are allowed only when required by the workflow, but prefer splitting into:

- Public guide
- Reference
- Troubleshooting
- API docs
- LLM summary
- Agent spec
- Internal runbook

Do not turn one public page into a full product manual. That is how users lose the will to click.

---

# 3. Required Public Guide Sections

Every public user guide must include:

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

## What this is

Explain the feature in plain language.

## When to use this

Explain user scenarios.

## Before you begin

List prerequisites:

- account requirement
- credits/billing requirement
- permission requirement
- resource requirement
- region/plan prerequisites, if verified

## Steps

Use clear numbered steps.

Use the UI labels from frontend code.

Do not invent UI labels.

## Important notes

Include only critical warnings or constraints.

Link to Reference for full limitations.

## Automate this

Every public guide must include this section.

It must link to:

- API docs
- Terraform docs
- CLI docs
- Agent operation docs, if applicable

Do not include full API payloads here.

## Related pages

Link to relevant docs.

## Next step

Every public guide must tell the user what to do next.

---

# 4. Public Guide Restrictions

Public guides must not include:

- Full API payloads
- Full backend enum lists
- Internal implementation details
- Internal support steps
- Private URLs
- Private repo links
- Internal Jira/Slack/GitLab links
- Database queries
- Manual backend correction steps
- Internal service names
- Customer-specific data
- Secrets or tokens
- SSH private keys
- Private infrastructure names

---

# 5. Frontmatter Requirements

Every public Markdown/MDX page must include frontmatter.

Allowed fields:

```yaml
---
title:
product:
category:
service:
feature:
audience:
visibility: public
status:
last_verified:
supported_portal:
api_available:
api_spec_status:
support_assisted:
regions:
related_api:
related_ui:
truth_source:
llm_safe:
agent_actionable:
---
```

Forbidden field:

```yaml
owner:
```

The entire docs system is owned by the testing team. Do not add page-level `owner`.

---

# 6. Truth and Verification

Public docs must be generated from verified or explicitly marked sources.

Allowed truth sources:

```yaml
truth_source:
  - backend_code
  - frontend_code
  - openapi
  - qa_validation
```

Existing docs can be listed only if verified:

```yaml
truth_source:
  - existing_docs_verified
```

Never use:

```yaml
truth_source:
  - existing_docs_unverified
```

for final public claims.

---

# 7. Limitations in Public Docs

Public guides should include critical limitations only.

Full limitations must live in Reference docs or a limitations catalog.

Example public guide note:

```markdown
## Important notes

Backup availability may vary by region. See [Backup reference](../reference/backup.md) for supported behavior and limitations.
```

Do not say a feature is available in all regions unless verified.

Do not invent plan support.

Do not invent pricing.

---

# 8. API in Public Guides

Public guides must not include full API request/response payloads.

Use:

```markdown
## Automate this

You can automate this workflow using:

- [Create Node API](../../api/myaccount/nodes/create-node.md)
- [Terraform node resource](../../api/terraform/nodes.md)
```

API documentation must live in the API section.

---

# 9. Support-Assisted Public Content

Public docs may say:

- When to raise a support ticket
- What information to include
- Resource ID/CRN requirement
- Region
- Screenshot
- API error response
- Approximate time of failure

Public docs must not say:

- Which internal team handles it
- Internal escalation process
- Internal debugging process
- Manual backend recovery steps
- Internal logs or database checks

---

# 10. Writing Style

Use plain language.

Use:

- short paragraphs
- numbered steps
- direct instructions
- clear warnings
- specific page names
- verified UI labels

Avoid:

- "simply"
- "just"
- marketing language
- vague claims
- internal jargon
- unsupported promises

Do not overpromise.

Do not hide billing impact.

Do not hide support requirements.

---

# 11. Public Docs Validation

Validation must fail if:

- `visibility: public` is missing
- frontmatter is missing
- `owner` exists in frontmatter
- "Automate this" is missing
- "Next step" is missing
- API-enabled page lacks related API link
- public page links to internal docs
- public page includes blocked internal terms
- public page includes unverified claims
- public page includes full backend enum dumps
- public page includes private URLs
