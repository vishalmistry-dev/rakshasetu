import { z } from "zod";

export const connectSchema = z.object({
  listingId: z.string().optional(),
  sellerId: z.string().min(1, "Seller ID is required"),
  message: z.string().max(500).optional(),
});

export const acceptConnectSchema = z.object({
  connectId: z.string().min(1, "Connect ID is required"),
});

export const rejectConnectSchema = z.object({
  connectId: z.string().min(1, "Connect ID is required"),
  rejectReason: z.string().max(500).optional(),
});

export const messageSchema = z.object({
  content: z.string().optional(),
  conversationId: z.string(),
  senderId: z.string(),
  senderType: z.enum(["BUYER", "SELLER", "MERCHANT", "ADMIN", "GUEST"]),
  attachments: z.any(),
});

export const conversationIdSchema = z.object({
  conversationId: z.string(),
});

export type CreateConnectInput = z.infer<typeof connectSchema>;
export type AcceptConnectInput = z.infer<typeof acceptConnectSchema>;
export type RejectConnectInput = z.infer<typeof rejectConnectSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
