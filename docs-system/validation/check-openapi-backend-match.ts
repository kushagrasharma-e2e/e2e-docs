import { existsSync } from 'node:fs';
import { fail } from './_shared';

const errors: string[] = [];

if (!existsSync('docs-system/extracted/openapi-endpoints.yaml')) {
  errors.push('docs-system/extracted/openapi-endpoints.yaml: missing');
}

if (!existsSync('internal-docs/api-gap-reports')) {
  errors.push('internal-docs/api-gap-reports: missing');
}

fail(errors);
console.log('OpenAPI/backend match scaffold check passed.');
