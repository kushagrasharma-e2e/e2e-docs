import { fail, walkFiles, read } from './_shared';

const publicFiles = [
  ...walkFiles('src/content/docs', ['.md', '.mdx']),
  ...walkFiles('public', ['.txt', '.md', '.yaml', '.yml', '.json']),
];

const blocked = [
  'internal-docs/',
  'internal-runbook.md',
  'validation-notes.md',
  'private Slack',
  'private Jira',
  'manual backend correction',
  'database query',
];

const errors: string[] = [];
for (const file of publicFiles) {
  const content = read(file);
  for (const term of blocked) {
    if (content.includes(term)) errors.push(`${file}: contains blocked public/internal boundary term "${term}"`);
  }
}

fail(errors);
console.log(`Public/internal boundary check passed for ${publicFiles.length} files.`);
