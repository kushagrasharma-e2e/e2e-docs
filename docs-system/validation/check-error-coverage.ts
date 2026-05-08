import { fail, walkFiles, read } from './_shared';

const files = walkFiles('src/content/docs', ['.md', '.mdx']).filter((file) => file.includes('troubleshooting'));
const errors: string[] = [];

for (const file of files) {
  const content = read(file);
  for (const required of ['## What not to do', '## Support required', '## Agent-safe instruction']) {
    if (!content.includes(required)) errors.push(`${file}: missing "${required}"`);
  }
}

fail(errors);
console.log(`Error coverage scaffold check passed for ${files.length} troubleshooting files.`);
