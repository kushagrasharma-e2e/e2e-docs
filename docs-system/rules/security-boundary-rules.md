# Security Boundary Rules

## Purpose

These rules define the boundary between public and internal documentation.

The system must strictly prevent internal-only content from appearing in public docs, LLM docs, API docs, troubleshooting docs, or agent specs.

---

# 1. Visibility Metadata

Every generated file must include visibility metadata where applicable.

Allowed values:

```text
public
internal
restricted
```

Example public:

```yaml
visibility: public
```

Example internal:

```yaml
visibility: internal
```

Example restricted:

```yaml
visibility: restricted
```

---

# 2. Public Docs May Include

Public docs may include:

- product behavior
- UI steps
- public API behavior
- public-safe backend errors
- UI messages
- public-safe limitations
- support-ticket-required notices
- public-safe troubleshooting
- public-safe agent rules
- public-safe LLM context

---

# 3. Public Docs Must Never Include

Public docs must never include:

```text
- internal service URLs
- internal database queries
- private repo URLs
- internal Slack links
- internal Jira links
- internal GitLab links, unless public repo
- internal escalation names
- internal team-only process
- manual backend correction steps
- private operational procedures
- customer-specific data
- credentials
- secrets
- private tokens
- SSH private keys
- internal-only vulnerabilities
- private infrastructure names
- source code snippets exposing private logic
- internal environment names, unless public-approved
```

---

# 4. Public Docs Must Not Link To

Public docs must not link to:

```text
/internal/
internal-docs/
internal-runbook.md
validation-notes.md
private Jira tickets
private Slack threads
private GitLab repos
private backend source browser links
private database dashboards
private monitoring dashboards
```

---

# 5. Internal Docs May Include

Internal docs may include:

- source file paths
- backend implementation notes
- frontend implementation notes
- exact backend enum values
- internal QA validation notes
- support runbook steps
- internal known issues
- API gap reports
- missing spec reports
- debugging guidance

But internal docs must not be published to the public site.

---

# 6. Conditional Terms

Some words may appear in public docs only in approved contexts.

Example:

```yaml
conditional_terms:
  token:
    allowed_in:
      - api-docs
      - authentication-docs
  password:
    allowed_in:
      - user-login-docs
      - windows-rdp-docs
  ssh_key:
    allowed_in:
      - compute-access-docs
```

Do not blindly block common public technical terms. Use allowlists.

---

# 7. Public/Internal Boundary Registry

Maintain:

```text
registry/public-internal-boundary.yaml
```

It should include:

```yaml
blocked_paths:
  - internal-docs/
  - "**/internal-runbook.md"
  - "**/validation-notes.md"

blocked_terms:
  - internal-only-service-name
  - private-db-table-name

conditional_terms:
  token:
    allowed_in:
      - api
      - authentication
```

---

# 8. Build Rules

The public build must fail if:

- internal docs are included
- internal files are linked
- blocked terms appear in public docs
- public docs include private URLs
- LLM files include internal content
- agent specs include internal content
- API docs include internal endpoints
- troubleshooting docs include internal runbook steps

---

# 9. LLM and Agent Boundary

LLM docs and agent specs are public.

They must follow the same public boundary rules.

They must not expose:

- internal support process
- internal recovery steps
- internal source code paths
- internal infrastructure names
- internal-only errors
- private endpoints
- internal enum values unless public-approved

---

# 10. Security Review Requirement

If a generated public page includes support-assisted information, verify that it only says:

- when to raise a ticket
- what information the user should provide
- what public error/message occurred
- what public-safe next action is recommended

It must not include how support internally handles the ticket.

---

# 11. Validation Failure Examples

Fail public build for examples like:

```markdown
See internal-runbook.md for recovery.
```

```markdown
Run this DB query to fix the user state.
```

```markdown
Escalate to internal team X in Slack.
```

```markdown
Use private backend endpoint /internal/admin/fix-resource.
```

```markdown
Check table customer_resource_mapping.
```

The public internet does not need your operational diary.
