import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseISO } from "date-fns";

const dateSchema = z.string().refine(
  (val) => {
    const date = parseISO(val);
    return date;
  },
  { message: "Invalid date format" }
);

export const bookSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  published: dateSchema,
  copies: z.number().default(0),
});

export const authorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  born: dateSchema,
  died: dateSchema.optional(),
});

export type authorType = z.infer<typeof authorSchema>;
export type bookType = z.infer<typeof bookSchema>;
