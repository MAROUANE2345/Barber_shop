import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(255),

  objective: z.string().min(1, "Objective is required").max(255),

  description: z.string().min(1, "Description is required"),

  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price is required and must be 0 or more")
  ),

  quantity: z.preprocess(
    (val) => (val === "" || val == null ? 0 : Number(val)),
    z.number().min(0, "Quantity must be 0 or more")
  ),

  image: z.any().optional(),
});