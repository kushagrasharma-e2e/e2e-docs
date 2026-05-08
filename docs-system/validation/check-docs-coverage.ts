import { existsSync } from 'node:fs';
import { fail } from './_shared';

const required = [
  'docs-system/registry/services.yaml',
  'docs-system/registry/docs-coverage.yaml',
  'docs-system/registry/error-registry.yaml',
  'docs-system/registry/api-registry.yaml',
];

fail(required.filter((path) => !existsSync(path)).map((path) => `${path}: missing`));
console.log('Docs coverage scaffold check passed.');
