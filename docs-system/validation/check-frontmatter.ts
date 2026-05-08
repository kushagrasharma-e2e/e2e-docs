import { fail, frontmatter, hasFrontmatter, walkFiles, read } from './_shared';

const files = walkFiles('src/content/docs', ['.md', '.mdx']);
const errors: string[] = [];

for (const file of files) {
  const content = read(file);
  const fm = frontmatter(content);
  if (!hasFrontmatter(content)) errors.push(`${file}: missing frontmatter`);
  if (!fm.includes('visibility:')) errors.push(`${file}: missing visibility`);
  if (/^owner:/m.test(fm)) errors.push(`${file}: forbidden frontmatter field "owner"`);
  if (!fm.includes('title:')) errors.push(`${file}: missing title`);
}

fail(errors);
console.log(`Frontmatter check passed for ${files.length} public docs files.`);
