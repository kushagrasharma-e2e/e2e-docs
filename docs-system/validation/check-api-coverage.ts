import { fail, walkFiles, read } from './_shared';

const files = walkFiles('src/content/docs', ['.md', '.mdx']);
const errors: string[] = [];

for (const file of files) {
  const content = read(file);
  if (content.includes('api_available: true') && !content.includes('related_api:')) {
    errors.push(`${file}: API-enabled page lacks related_api frontmatter`);
  }
}

fail(errors);
console.log('API coverage scaffold check passed.');
