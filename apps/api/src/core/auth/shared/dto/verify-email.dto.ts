import z from "zod";

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6).regex(/^\d+$/, "Code must be a 6-digit number"),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
