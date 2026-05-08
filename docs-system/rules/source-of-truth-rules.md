# Source of Truth Rules

## Purpose

These rules define how the E2E documentation system must decide what is true when generating, validating, or updating documentation.

The available sources are:

1. Backend code
2. Frontend code
3. API/OpenAPI specs
4. Existing documentation

Existing documentation and API specs may be incomplete or inaccurate. They must never be trusted blindly.

---

# 1. Absolute Source-of-Truth Order

Use this order for all documentation decisions:

```text
1. Backend code
2. Frontend code
3. API/OpenAPI specs
4. Existing documentation
```

## Backend code is the truth for

- Actual product behavior
- API routes
- Request fields
- Response behavior
- Validation rules
- Backend error messages
- Permission checks
- Authentication requirements
- Resource lifecycle behavior
- Billing triggers
- Quota checks
- Region restrictions
- Plan restrictions
- Support-only backend constraints
- Failure cases
- Background jobs or cron behavior

## Frontend code is the truth for

- User journeys
- Page routes
- Navigation labels
- Form fields
- Button labels
- Dropdown values
- UI messages
- Toast messages
- Banners
- Modals
- Confirmation dialogs
- Empty states
- Disabled states
- Client-side validation
- Visible user experience

## API/OpenAPI specs are the truth for

- Public API documentation structure only
- API docs generation only when the spec exists
- Endpoint request/response schemas, if verified
- Public API grouping and naming

OpenAPI specs must be compared against backend code. If they are incomplete or incorrect, record the mismatch.

## Existing documentation is only reference

Existing docs may be used for:

- Old page URLs
- Redirect planning
- Possible wording
- Old screenshots, if still valid
- Current coverage comparison
- Identifying outdated or duplicate pages

Existing docs must not be used as truth until verified against backend, frontend, and OpenAPI sources.

---

# 2. Extraction Before Writing

Do not generate final docs directly from old documentation.

The correct flow is:

```text
backend/frontend/openapi/existing-docs
→ extracted facts
→ registries
→ generated docs
→ validation
→ human QA review
```

Before writing final docs, create or update structured extraction files:

```text
extracted/backend-routes.yaml
extracted/backend-validations.yaml
extracted/backend-errors.yaml
extracted/backend-permissions.yaml
extracted/backend-resource-states.yaml
extracted/backend-limitations.yaml
extracted/frontend-routes.yaml
extracted/frontend-ui-messages.yaml
extracted/frontend-user-flows.yaml
extracted/frontend-form-fields.yaml
extracted/openapi-endpoints.yaml
extracted/existing-docs-map.yaml
```

Then update registries:

```text
registry/services.yaml
registry/api-registry.yaml
registry/error-registry.yaml
registry/ui-message-registry.yaml
registry/limitation-registry.yaml
registry/permission-registry.yaml
registry/support-flow-registry.yaml
registry/docs-coverage.yaml
```

Only after this should public docs, internal docs, LLM docs, or agent specs be generated.

---

# 3. Verification Status

Every extracted or generated fact must have a verification status when uncertainty exists.

Allowed statuses:

```text
verified
partially_verified
unverified
needs_developer_confirmation
needs_qa_validation
needs_openapi_update
```

If the fact cannot be confirmed, do not invent it.

Use:

```yaml
verification_status: unverified
confidence: low
```

or create a `needs_verification` entry:

```yaml
needs_verification:
  - id: node_billing_start_time
    question: "When exactly does billing start for a newly created node?"
    suspected_sources:
      - backend billing module
      - frontend billing summary component
    status: unresolved
```

---

# 4. Conflict Resolution

When two sources conflict, use this logic:

## Backend vs existing docs

Backend wins.

Action:

```text
Mark existing docs as outdated or incorrect.
Generate corrected docs from backend/frontend behavior.
```

## Frontend vs existing docs

Frontend wins for UI flow and visible text.

Action:

```text
Mark old UI steps as outdated.
Update public guide flow.
```

## Backend vs OpenAPI

Backend wins for actual behavior.

OpenAPI wins only for public API docs rendering, but mismatch must be reported.

Action:

```yaml
api_spec_status: mismatch
```

Do not silently fix public API docs using backend code. Create an API gap report.

## Frontend vs backend

Both may be true in different layers.

Backend controls actual behavior.
Frontend controls user-facing flow.

If frontend exposes an option that backend rejects, document as a mismatch internally and create a validation/gap entry.

---

# 5. Existing Docs Audit

All existing documentation pages start as:

```yaml
accuracy_status: unverified
reuse_allowed: false
```

Allowed accuracy statuses:

```text
verified
partially_verified
unverified
incorrect
outdated
duplicate
needs_rewrite
needs_deletion
```

Allowed actions:

```text
keep
rewrite
merge
split
delete
redirect
needs_review
```

Reuse old content only after verification.

---

# 6. No Silent Assumptions

Never silently assume:

- Pricing
- Region availability
- Plan availability
- API behavior
- Error behavior
- Billing behavior
- Permissions
- Support process
- Resource state transitions
- Product limitations

If unverified, mark it explicitly.

---

# 7. Required Output When Facts Are Missing

When information is missing, produce a gap entry instead of guessing.

Example:

```yaml
gaps:
  - id: missing_openapi_create_node_response
    area: api
    product: myaccount
    service: myaccount_compute
    issue: "Create node response schema is missing from OpenAPI."
    required_action: "Update OpenAPI spec or confirm backend response schema."
```

---

# 8. Done Criteria for Source Truth

A service is source-truth-ready only when:

1. Backend facts are extracted.
2. Frontend facts are extracted.
3. OpenAPI status is recorded.
4. Existing docs are audited.
5. Conflicts are documented.
6. Unknowns are listed.
7. Registries are updated.
8. QA/testing team can review the result.

No final docs should be considered reliable before this.
