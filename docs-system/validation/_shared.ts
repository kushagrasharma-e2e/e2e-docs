import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export function walkFiles(root: string, extensions: string[]): string[] {
  if (!existsSync(root)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(root)) {
    const path = join(root, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      files.push(...walkFiles(path, extensions));
    } else if (extensions.some((extension) => path.endsWith(extension))) {
      files.push(path);
    }
  }
  return files;
}

export function read(path: string): string {
  return readFileSync(path, 'utf8');
}

export function fail(messages: string[]): void {
  if (messages.length === 0) return;
  for (const message of messages) console.error(message);
  process.exit(1);
}

export function hasFrontmatter(content: string): boolean {
  return content.startsWith('---\n') && content.indexOf('\n---', 4) > 0;
}

export function frontmatter(content: string): string {
  if (!hasFrontmatter(content)) return '';
  const end = content.indexOf('\n---', 4);
  return content.slice(4, end);
}

export function body(content: string): string {
  if (!hasFrontmatter(content)) return content;
  const end = content.indexOf('\n---', 4);
  return content.slice(end + 4);
}
