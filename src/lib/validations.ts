import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(80, "Name cannot exceed 80 characters"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .min(5, "Email is required"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters long")
    .max(120, "Subject cannot exceed 120 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(3000, "Message cannot exceed 3000 characters"),
  botcheck: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactSchema>;
