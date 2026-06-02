import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    sourceTitle: z.string().optional(),
    path: z.string(),
    sourceUrl: z.string().url(),
    language: z.string().default("en"),
    direction: z.enum(["ltr", "rtl"]).default("ltr"),
    textLines: z.array(z.string()).default([]),
    links: z.array(z.object({ text: z.string(), href: z.string() })).default([]),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).default([]),
  }),
});

export const collections = { pages };
