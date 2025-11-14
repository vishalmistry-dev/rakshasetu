export type ParticipantType =
  | "BUYER"
  | "SELLER"
  | "MERCHANT"
  | "ADMIN"
  | "GUEST";

export type ConversationStage = "LISTING" | "ORDER" | "DISPUTE";

export type ConversationType = "CONNECTION" | "DISPUTE";

export interface CreateConversationInput {
  type: ConversationType;
  stage?: ConversationStage; // defaults to LISTING for connections
  listingId?: string;
  orderId?: string;
  disputeId?: string;
  participants: {
    participantType: ParticipantType;
    participantId?: string;
    customerInfo?: any;
  }[];
}

export interface SendMessageInput {
  conversationId: string;
  senderType: ParticipantType;
  senderId?: string;
  content?: string;
  attachments?: any;
}
