# Solution Docs Rules

## Purpose

Solution pages document multi-service workflows and architectures. They must not become a dumping ground for unrelated service combinations.

## Required Sections

Each solution page must include:

- What this solution does
- When to use it
- Services used
- Architecture flow
- Before you begin
- Steps
- Security notes
- Billing notes
- Failure points
- Troubleshooting
- Automate this
- Next step

## Source Rules

Every service relationship in a solution must be registered in `docs-system/registry/solution-registry.yaml` and verified or explicitly marked as needing verification.

## Public Safety

Solution pages must not expose private architecture, private infrastructure names, internal runbooks, manual backend correction steps, or customer-specific data.
