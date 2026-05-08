# Internal Docs Rules

## Purpose

These rules define how internal documentation must be created, separated, and protected.

Internal docs are for QA, testing, support, and developers. They may include private implementation details that must never appear in public docs.

---

# 1. Internal Docs Purpose

Internal docs may include:

- Backend source file references
- Frontend source file references
- Exact backend enum values
- Internal QA validation notes
- Developer notes
- Implementation details
- Missing OpenAPI coverage
- Suspected mismatches
- Support/debugging guidance
- Internal-only known issues
- Manual investigation steps
- Product behavior verification notes
- Code-path analysis
- Release validation details

Internal docs must help the testing team verify and maintain documentation truth.

---

# 2. Internal Docs Must Stay Private

Internal docs must not be included in the public docs build.

Internal files may live in:

```text
internal-docs/
docs-system/generated/internal-docs/
services/**/internal-runbook.md
services/**/validation-notes.md
```

Public builds must fail if these files are included or linked.

---

# 3. Required Internal Metadata

Every internal Markdown/MDX page must include:

```yaml
---
title:
product:
category:
service:
visibility: internal
status:
last_verified:
truth_source:
internal_purpose:
---
```

Forbidden field:

```yaml
owner:
```

The testing team owns the docs as a whole.

---

# 4. Allowed Internal Content

Internal docs may include:

```text
- backend module paths
- frontend component paths
- serializer/view/controller names
- validation logic summaries
- exact backend enum values
- internal state mappings
- QA test coverage
- known mismatches
- API spec gaps
- suspected outdated docs
- internal troubleshooting process
- support investigation checklist
- private limitation notes
```

---

# 5. Internal Docs May Reference Source Files

Internal docs should reference source files whenever possible.

Example:

```yaml
source_files:
  - source/backend/apps/compute/views.py
  - source/backend/apps/compute/serializers.py
  - source/frontend/src/app/node/create-node.component.ts
```

Use relative paths inside the docs system when possible.

---

# 6. Internal Runbook Template

Use this structure:

```markdown
# Internal runbook: Service name

## Purpose

## Source files

## Backend behavior

## Frontend behavior

## Validations

## Error messages

## State transitions

## API/OpenAPI gaps

## Known mismatches

## QA validation checklist

## Support investigation notes

## Public docs impact

## Unresolved questions
```

---

# 7. QA Validation Notes

QA-only validation notes must remain private.

They may include:

- test case IDs
- environment-specific issues
- backend responses from testing
- screenshots references
- validation gaps
- test blockers
- known test environment limitations

Do not publish QA-only validation notes publicly.

---

# 8. Internal Known Issues

Internal known issues should not be directly connected from public troubleshooting pages.

Public troubleshooting may say:

```text
If the issue continues, raise a support ticket.
```

Internal docs may explain:

```text
How support/testing should investigate the issue.
```

Do not expose internal defect IDs, private tickets, or escalation details publicly.

---

# 9. Internal to Public Conversion

If internal content must become public, it must be rewritten.

Before moving internal content to public docs:

1. Remove private source links.
2. Remove database details.
3. Remove internal escalation paths.
4. Remove internal service names.
5. Remove private ticket references.
6. Convert backend enum values to user-friendly states.
7. Keep only public-safe user actions.
8. Validate with security-boundary rules.

---

# 10. Internal Docs Validation

Validation must fail if:

- internal docs are included in public build
- public docs link to internal docs
- public docs reference internal-runbook files
- public docs reference validation-notes files
- internal-only terms appear in public docs
- internal docs lack `visibility: internal`
