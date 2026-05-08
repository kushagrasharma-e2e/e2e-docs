# Troubleshooting Rules

## Purpose

These rules define how troubleshooting documentation must be structured.

Troubleshooting must be organized around error messages, not vague feature names alone.

---

# 1. Troubleshooting Model

Troubleshooting docs must answer:

1. What error did the user see?
2. Where did they see it?
3. What does it mean?
4. Why did it happen?
5. What should the user do?
6. What should the user not do?
7. Is support required?
8. Which API/docs are related?
9. What should an AI agent do?

---

# 2. Error-Message-Based Structure

Troubleshooting should be organized by error message.

Example:

```text
Troubleshooting
├── Backup service unavailable
├── Insufficient balance
├── Quota exceeded
├── Region unavailable
├── Invalid SSH key
├── Node stuck in creating state
└── API authentication failed
```

Feature troubleshooting pages can exist, but they should link to error-message entries.

---

# 3. Required Troubleshooting Template

Every troubleshooting page must include:

```markdown
# Error or issue title

## Error message

## UI message

## Backend response

## Where this appears

## Meaning

## Likely cause

## What to do

## What not to do

## Support required

## Related docs

## Related API docs

## Agent-safe instruction
```

---

# 4. Exact Error Messages

Exact public-safe backend errors must be shown.

Example:

```json
{
  "code": 400,
  "data": {},
  "errors": "Backup service is temporarily unavailable for this region. Please try again later or contact support.",
  "message": "Bad Request"
}
```

Exact UI messages must also be shown when available.

Example:

```text
Backups are temporarily unavailable in this region. Enable them later from node settings after creating your node.
```

---

# 5. Support Requirement

Every troubleshooting page must clearly state:

```text
Support required: Yes
```

or:

```text
Support required: No
```

or:

```text
Support required: Sometimes
```

Do not hide this.

---

# 6. What Not To Do

Every troubleshooting page must include:

```markdown
## What not to do
```

Example:

```text
Do not repeatedly retry the same operation if the selected region does not currently support the service.
```

This section helps users and agents avoid harmful or useless actions.

---

# 7. Agent-Safe Instruction

Every troubleshooting page must include an agent-safe instruction.

Example:

```text
Agent instruction: Explain that backup is unavailable for the selected region. Do not repeatedly retry. Suggest creating the node without backup and enabling backup later.
```

---

# 8. Troubleshooting Registry

Maintain:

```text
registry/error-registry.yaml
```

Each entry must include:

```yaml
id:
product:
service:
visibility:
backend_message:
ui_message:
meaning:
likely_cause:
user_action:
what_not_to_do:
support_required:
public_doc:
related_api:
agent_instruction:
```

---

# 9. Public vs Internal Troubleshooting

Public troubleshooting may include:

- public-safe error messages
- user actions
- support ticket guidance
- API error context
- what not to do

Internal troubleshooting may include:

- source files
- database checks
- internal service names
- internal logs
- manual recovery steps
- escalation details
- QA notes

Never expose internal troubleshooting steps publicly.

---

# 10. Troubleshooting Validation

Validation must fail if:

- troubleshooting page lacks error message
- support requirement is missing
- "What not to do" is missing
- agent-safe instruction is missing
- exact public-safe backend error is missing
- related API link is missing when API exists
- public troubleshooting links to internal runbook
