# E2E Docs Rules

This folder contains scoped rule files for the E2E Networks documentation-generation system.

These files are intended for Codex, Claude, or any internal documentation agent.

## Files

- `source-of-truth-rules.md`
- `public-docs-rules.md`
- `internal-docs-rules.md`
- `api-docs-rules.md`
- `troubleshooting-rules.md`
- `llm-docs-rules.md`
- `agent-docs-rules.md`
- `security-boundary-rules.md`

## Usage

Agents must read these rule files before creating, updating, validating, or publishing documentation.

The most important rule:

```text
Do not generate final documentation directly from old docs.
Extract facts from backend/frontend/OpenAPI sources first, then generate docs from structured registries.
```
