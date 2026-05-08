# API Docs Rules

## Purpose

These rules define how API documentation must be generated, validated, and linked.

API documentation must be accurate, automation-friendly, and generated from OpenAPI specs only.

---

# 1. API Docs Source Rule

Public API docs must be generated from OpenAPI specs only.

Backend code may be used to:

- verify OpenAPI accuracy
- produce API gap reports
- detect mismatches
- identify missing endpoints
- identify missing errors
- identify incomplete schemas

Do not fabricate public API docs from backend code.

If OpenAPI is incomplete, record the gap. Do not pretend it is complete.

---

# 2. API Docs Location

API docs must live in a separate top-level section:

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

Human user guides must link to API docs through the `Automate this` section.

---

# 3. API Page Requirements

Every API page must include:

1. Endpoint
2. Method
3. Authentication
4. Required permissions
5. Request schema
6. Response schema
7. Error responses
8. UI equivalent
9. Workflow notes
10. Related troubleshooting
11. Related agent operation, if applicable
12. OpenAPI spec status

---

# 4. OpenAPI Status Values

Use these API status values:

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

## verified

Endpoint exists in OpenAPI and matches backend behavior.

## partial

OpenAPI exists but is incomplete.

## partial_match

Endpoint exists in both backend and OpenAPI, but not all details match.

## missing_from_openapi

Backend route exists but OpenAPI does not document it.

## missing_from_backend

OpenAPI documents an endpoint that is not found in backend.

## stale_or_invalid

OpenAPI is outdated or incorrect.

## mismatch

OpenAPI conflicts with backend behavior.

## undocumented

Endpoint or behavior exists but has no public API documentation.

---

# 5. API Registry

Maintain:

```text
registry/api-registry.yaml
```

Each API entry should include:

```yaml
id:
product:
service:
method:
path:
openapi_source:
backend_status:
openapi_status:
match_status:
documentation_status:
api_spec_status:
public:
agent_actionable:
problems:
related_ui:
related_troubleshooting:
```

Example:

```yaml
apis:
  - id: create_node
    product: myaccount
    service: myaccount_compute
    method: POST
    path: /api/nodes/
    openapi_source: source/openapi/myaccount.yaml
    backend_status: exists
    openapi_status: exists
    match_status: partial_match
    api_spec_status: partial
    public: true
    agent_actionable: true
    problems:
      - response_schema_missing
      - error_examples_missing
```

---

# 6. API Gap Reports

When OpenAPI does not match backend, create a gap report.

Common problems:

```text
request_schema_missing
response_schema_missing
error_examples_missing
auth_missing
permission_missing
field_mismatch
path_mismatch
method_mismatch
status_code_mismatch
undocumented_error
```

Do not silently fix API docs with guessed details.

---

# 7. Scalar Rendering

Use Scalar for OpenAPI rendering.

OpenAPI files should be placed in:

```text
public/openapi/
```

Recommended:

```text
public/openapi/myaccount.yaml
public/openapi/tir.yaml
```

The API docs page may embed Scalar or link to a Scalar-rendered API reference.

---

# 8. API Errors

Public-safe backend errors must appear in API docs if they can occur for that endpoint.

Each error should include:

- HTTP status code
- backend error message
- meaning
- user action
- support requirement
- related troubleshooting link

If exact backend error is public-safe, include it exactly.

---

# 9. API Docs and Agent Specs

If an API endpoint can be used by an agent, link it to an agent operation spec.

Example:

```yaml
related_agent_operation: create_node
```

Agent specs must include confirmation rules for write actions.

---

# 10. API Docs Validation

Validation must fail if:

- public API docs are not generated from OpenAPI
- API-enabled public guide lacks related API link
- OpenAPI/backend mismatch is not recorded
- API registry entry lacks status
- API page lacks auth details
- API page lacks request or response schema when OpenAPI provides it
- API page lacks error response section
- agent-actionable endpoint lacks agent spec
