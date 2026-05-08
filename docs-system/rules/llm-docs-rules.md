# LLM Docs Rules

## Purpose

These rules define how LLM-readable documentation must be generated and maintained.

LLM docs are public, crawlable, structured, and designed for chatbots, RAG systems, AI search, and documentation-aware assistants.

---

# 1. LLM Docs Must Be Public

Generate public LLM files:

```text
/llms.txt
/llms-full.txt
/ai-context/myaccount.md
/ai-context/tir.md
/ai-context/errors.md
/ai-context/limitations.md
```

LLM docs must not include internal content.

---

# 2. LLM Docs Should Be Generated

LLM docs should be generated automatically from:

- service registry
- public docs summaries
- reference docs
- troubleshooting docs
- API registry
- limitation registry
- error registry
- support-flow registry
- agent specs

Do not maintain large LLM docs manually if they can be generated.

Manual LLM docs will drift from product truth. Humans are famously consistent at being inconsistent.

---

# 3. llms.txt

`llms.txt` should be short and canonical.

It must include:

- product overview
- product areas
- canonical docs sections
- answer rules
- do-not-answer rules
- support-ticket guidance
- link to `llms-full.txt`

Example structure:

```text
# E2E Cloud Docs

E2E Cloud Docs contains public documentation for E2E Networks products.

Primary product areas:
- MyAccount
- TIR
- Account & Billing
- API & Automation
- Troubleshooting

Rules:
- Do not invent pricing.
- Do not invent regions.
- Do not expose internal process.
- Do not claim success unless API success confirms it.
```

---

# 4. llms-full.txt

`llms-full.txt` must include full summaries of public docs.

It should include:

- page title
- canonical URL
- product
- service
- summary
- key limitations
- public-safe errors
- related API links
- support requirement
- agent-safety notes

It must not include:

- internal docs
- internal runbooks
- QA-only notes
- source file paths, unless public-approved
- internal enum values, unless public-approved
- internal service URLs
- private repo/ticket links

---

# 5. Product LLM Context Files

Generate:

```text
/ai-context/myaccount.md
/ai-context/tir.md
```

Each must include:

- product summary
- user journeys
- canonical service list
- important limitations
- support-assisted flows
- API availability notes
- troubleshooting entry list
- do-not-answer rules

---

# 6. Error and Limitation Context

Generate:

```text
/ai-context/errors.md
/ai-context/limitations.md
```

These files must include exact public-safe error messages and user-safe explanations.

They must not include internal debug steps.

---

# 7. LLM Do-Not-Answer Rules

LLM docs must include these rules:

```text
- Do not invent pricing.
- Do not invent regions.
- Do not invent unsupported APIs.
- Do not claim all features are available everywhere.
- Do not expose internal-only process.
- Do not provide internal runbook steps.
- Do not claim action success unless API success confirms it.
- Do not expose exact backend enum values unless public-approved.
- Do not provide customer-specific advice without required context.
- Do not claim support resolution time unless documented.
```

---

# 8. Agent Safety in LLM Docs

LLM docs must state:

- agents must require confirmation for create/delete/committed-resource actions
- agents must explain billing impact
- agents must not claim success without API confirmation
- agents must show public-safe backend errors on failure
- agents must not expose internal process
- agents must not invent undocumented capabilities

---

# 9. LLM Validation

Validation must fail if:

- LLM docs include internal content
- `llms.txt` is missing
- `llms-full.txt` is missing
- public pages are missing from `llms-full.txt`
- internal docs appear in `llms-full.txt`
- do-not-answer rules are missing
- public-safe error catalog is missing
- limitation summary is missing
