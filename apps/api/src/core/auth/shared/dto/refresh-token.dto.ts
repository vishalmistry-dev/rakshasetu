// shared/dto/refresh-token.dto.ts
import { z } from "zod";

export const refreshTokenSchema = z.object({
  token: z.string().min(1, "Refresh token is required"),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
