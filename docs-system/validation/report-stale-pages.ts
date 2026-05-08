import { walkFiles } from './_shared';

const files = walkFiles('src/content/docs', ['.md', '.mdx']);

console.log(`Stale page report scaffold: ${files.length} docs files scanned. Detailed staleness rules are not implemented yet.`);
