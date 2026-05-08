import { existsSync } from 'node:fs';
import { fail } from './_shared';

fail(
  existsSync('docs-system/registry/related-services-registry.yaml')
    ? []
    : ['docs-system/registry/related-services-registry.yaml: missing'],
);
console.log('Related services registry check passed.');
