import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const source = z.object({ label: z.string(), url: z.string().url() });

const platforms = defineCollection({
  // One Markdown file per platform: src/content/platforms/<slug>.md
  loader: glob({ pattern: '**/*.md', base: './src/content/platforms' }),
  schema: z.object({
    name: z.string(),
    operator: z.string(), // who runs it, as stated on the official site
    officialUrl: z.string().url(),
    title: z.string().min(20).max(70),
    description: z.string().min(70).max(160),
    lastUpdated: z.coerce.date(),
    lastChecked: z.literal('20 Nov 2026').or(z.string().regex(/^\d{1,2} [A-Z][a-z]{2} \d{4}$/)),
    summary: z.string(),
    bestFor: z.string(), // one line: who this platform suits, per its own stated requirements
    workTypes: z.array(z.string()).min(1),
    requirements: z.array(z.string()).min(1),
    // Only when the platform (or a reputable source) publishes figures. Omit otherwise.
    pay: z
      .object({ text: z.string(), sourceUrl: z.string().url() })
      .optional(),
    payNote: z.string(), // always present: how pay works, or that no figure is published
    partners: z.array(z.string()).default([]),
    sources: z.array(source).min(2),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
    order: z.number().default(100),
  }),
});

export const collections = { platforms };
