import { existsSync } from 'node:fs';
import { fail, walkFiles, read } from './_shared';

const requiredFiles = ['public/llms.txt', 'public/llms-full.txt'];
const errors = requiredFiles.filter((file) => !existsSync(file)).map((file) => `${file}: missing`);
const files = [...requiredFiles.filter((file) => existsSync(file)), ...walkFiles('src/content/docs/ai-context', ['.md', '.mdx'])];

for (const file of files) {
  const content = read(file);
  for (const blocked of ['internal-docs/', 'internal runbook', 'private Slack', 'private Jira']) {
    if (content.includes(blocked)) errors.push(`${file}: LLM context includes blocked term "${blocked}"`);
  }
}

fail(errors);
console.log(`LLM context check passed for ${files.length} files.`);
