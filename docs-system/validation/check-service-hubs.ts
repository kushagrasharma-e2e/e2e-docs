import { fail, walkFiles, read } from './_shared';

const files = walkFiles('src/content/docs', ['.md', '.mdx']).filter((file) => read(file).includes('category: service-hub'));
const errors: string[] = [];

for (const file of files) {
  const content = read(file);
  for (const required of ['## Works with', '## API & Automation', '## Troubleshooting', '## Next steps']) {
    if (!content.includes(required)) errors.push(`${file}: service hub missing "${required}"`);
  }
}

fail(errors);
console.log(`Service hub check passed for ${files.length} service hubs.`);
