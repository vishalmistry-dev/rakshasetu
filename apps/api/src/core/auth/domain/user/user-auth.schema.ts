import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10).max(15, "Invalid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  type: z.enum(["BUYER", "SELLER"]),
  business: z.string().optional(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
