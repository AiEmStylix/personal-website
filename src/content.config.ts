import { defineCollection } from "astro:content";
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
    loader: glob({base: './src/content/posts', pattern: '**/*.{md,mdx}'}),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date()
    })
})

const about = defineCollection({
    loader: glob({ base: './src/content', pattern: './about.md' })
})

export const collections = {blog, about};