import { z } from "zod";

export const workerSchema = z.object({
  name: z.string().min(1, "Worker name is required").max(255),

  role: z.string().min(1, "Role is required").max(255),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number is too long"),

  bio: z.string().optional(),
});