import { z } from 'zod';

export const fromSchema = z.object({
   recipe: z.string().min(5).max(20),
   description: z.string().min(10).max(500),
   image_link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
 cookingTime:z.number(), 
 ingredients:z.string().min(10),  
 steps:z.string().min(10),
});