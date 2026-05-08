import { fail, walkFiles, read } from './_shared';

const files = walkFiles('src/content/docs', ['.md', '.mdx']);
const errors: string[] = [];
const blockedLinks = ['internal-docs/', 'internal-runbook.md', 'validation-notes.md'];

for (const file of files) {
  const content = read(file);
  for (const blocked of blockedLinks) {
    if (content.includes(`](${blocked}`) || content.includes(`href="${blocked}`)) {
      errors.push(`${file}: links to blocked internal path "${blocked}"`);
    }
  }
}

fail(errors);
console.log(`Link boundary check passed for ${files.length} docs files.`);
