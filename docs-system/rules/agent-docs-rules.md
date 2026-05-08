# Agent Docs Rules

## Purpose

These rules define how AI agent operation specifications must be created.

Agent specs are public machine-readable files that describe how agents may safely perform actions using E2E APIs.

---

# 1. Agent Specs Are Public

Agent specs must be public, but public-safe.

They must not include:

- internal API routes
- private credentials
- internal service URLs
- internal debugging steps
- private source links
- internal escalation flow
- customer-specific data

---

# 2. Agent Write Actions Are Allowed

Agents may perform write actions, but confirmation is mandatory for:

```text
- creating resources
- deleting resources
- committed resource operations
- paid operations
- infrastructure-modifying operations
```

Examples requiring confirmation:

- create node
- delete node
- resize node
- reserve IP
- attach volume
- detach volume
- enable backup
- delete backup
- create TIR notebook
- deploy inference endpoint
- generate/revoke API key

---

# 3. Required Agent Operation Fields

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
confirmation_required:
confirmation_message:
required_inputs:
optional_inputs:
preconditions:
api:
success_condition:
failure_handling:
rollback:
support_required:
agent_rules:
```

---

# 4. Confirmation Message

Every action requiring confirmation must define a confirmation message.

Example:

```yaml
confirmation_message: "This will create a new compute node and may start billing. Confirm that you want to continue."
```

The confirmation message must mention billing impact if billing may be affected.

---

# 5. API Mapping

Each operation must map to a public API if available.

Example:

```yaml
api:
  method: POST
  path: /api/nodes/
  spec_status: partial
  api_doc: /api/myaccount/nodes/create-node
```

If no public API exists:

```yaml
api:
  available: false
  reason: "No public OpenAPI entry found."
```

Do not invent API paths.

---

# 6. Success Condition

Agents must not claim success unless API success confirms it.

Example:

```yaml
success_condition:
  - api_returns_2xx
  - response_contains_resource_id
```

If success requires async polling, document that:

```yaml
success_condition:
  - api_returns_accepted
  - resource_reaches_running_state
```

---

# 7. Failure Handling

Failure handling must map known errors.

Example:

```yaml
failure_handling:
  - error_id: backup_service_unavailable
    retry: false
    support_required: false
    user_message: "Backup service is unavailable in this region. Create the node without backup and enable it later."
```

Use error IDs from:

```text
registry/error-registry.yaml
```

---

# 8. Rollback

Every operation must state rollback possibility.

Allowed values:

```yaml
rollback:
  possible: true
  method: "Delete the created resource if it is no longer needed."
```

or:

```yaml
rollback:
  possible: false
  reason: "Committed resource action cannot be automatically reversed."
```

---

# 9. Undocumented Workarounds

Agents may suggest undocumented workarounds only if:

1. The workaround is public-safe.
2. It does not require internal access.
3. It does not bypass billing, security, quota, or product constraints.
4. It is clearly marked as a general workaround, not official product behavior.
5. It is non-destructive.
6. It does not require private operational knowledge.

If unsure, exclude the workaround.

---

# 10. Agent Spec Validation

Validation must fail if:

- operation lacks visibility
- write action lacks confirmation
- create/delete/committed-resource operation lacks confirmation
- billing impact is missing
- API mapping is missing
- success condition is missing
- failure handling is missing
- rollback is missing
- operation references unknown error IDs
- operation includes internal-only content
