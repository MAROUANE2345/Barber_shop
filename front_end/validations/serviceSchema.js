import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required").max(255),

  description: z.string().min(1, "Description is required"),

  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be 0 or more")
  ),

  duration: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Duration must be at least 1 minute")
  ),

  image: z.any().optional(),
});