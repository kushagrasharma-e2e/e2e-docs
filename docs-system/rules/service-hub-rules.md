# Service Hub Rules

## Purpose

Service hubs are the center of gravity for product documentation. Every major service must have one public service hub.

## Required Sections

Each service hub must include:

- What this service does
- Common tasks
- Getting started
- Works with
- API & Automation
- Troubleshooting
- Reference
- Related solutions
- Next steps

## Source Rules

Do not invent service behavior, limits, relationships, or API availability. Use backend code, frontend code, OpenAPI specs, and verified existing docs in the source-of-truth order defined by `source-of-truth-rules.md`.

## Related Services

The `Works with` section must explain why each related service matters. Do not list related service names without public-safe relationship context.

## Validation

Validation must fail if a service hub lacks `Works with`, `API & Automation`, `Troubleshooting`, or `Next steps`.
