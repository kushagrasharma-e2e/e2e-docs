import { fail, walkFiles, read } from './_shared';

const files = walkFiles('public/agents', ['.yaml', '.yml']);
const errors: string[] = [];
const required = ['operation:', 'visibility:', 'write_action:', 'billing_impact:', 'confirmation_required:', 'success_condition:', 'failure_handling:', 'rollback:'];

for (const file of files) {
  const content = read(file);
  for (const field of required) {
    if (!content.includes(field)) errors.push(`${file}: missing ${field}`);
  }
  if (content.includes('write_action: true') && !content.includes('confirmation_required: true')) {
    errors.push(`${file}: write action must require confirmation`);
  }
}

fail(errors);
console.log(`Agent spec check passed for ${files.length} specs.`);
