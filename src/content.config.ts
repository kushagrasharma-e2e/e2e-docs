import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const publicSafeStringArray = z.array(z.string()).default([]);
const frontmatterDate = z.union([z.string(), z.date()]).optional();

export const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: z.object({
      description: z.string().optional(),
      product: z.enum(['e2e-cloud', 'myaccount', 'tir', 'account-billing', 'shared']).optional(),
      category: z.string().optional(),
      service: z.string().optional(),
      feature: z.string().optional(),
      audience: publicSafeStringArray,
      visibility: z.enum(['public', 'internal', 'restricted']).default('public'),
      status: z.enum(['draft', 'validated', 'published', 'deprecated']).default('draft'),
      last_verified: frontmatterDate,
      supported_portal: z.enum(['myaccount', 'tir', 'both', 'not_applicable']).optional(),
      api_available: z.boolean().default(false),
      api_spec_status: z
        .enum([
          'verified',
          'partial',
          'partial_match',
          'missing_from_openapi',
          'missing_from_backend',
          'stale_or_invalid',
          'mismatch',
          'undocumented',
          'not_applicable',
        ])
        .default('not_applicable'),
      support_assisted: z.boolean().default(false),
      regions: publicSafeStringArray,
      related_api: publicSafeStringArray,
      related_ui: publicSafeStringArray,
      related_services: publicSafeStringArray,
      related_troubleshooting: publicSafeStringArray,
      related_solutions: publicSafeStringArray,
      truth_source: publicSafeStringArray,
      llm_safe: z.boolean().default(true),
      agent_actionable: z.boolean().default(false),
    }),
  }),
});

export const collections = { docs };
