// import { AppError } from '@/common/errors'
// import { prisma } from '@/config/prisma'
// import {
//   ConversationStage,
//   ConversationType,
//   CreateConversationInput,
//   ParticipantType,
//   SendMessageInput,
// } from './conversations.types'

// export const ConversationService = () => {
//   // --------------------------- CREATE CONVERSATION --------------------------- //
//   const createConversation = async (data: CreateConversationInput) => {
//     const { participants, ...conversationData } = data

//     const conversation = await prisma.conversation.create({
//       data: {
//         ...conversationData,
//         stage: conversationData.stage || 'LISTING',
//         participants: {
//           create: participants,
//         },
//       },
//       include: {
//         participants: true,
//         messages: true,
//       },
//     })

//     return conversation
//   }

//   // --------------------------- GET CONVERSATION BY ID --------------------------- //
//   const getConversationById = async (conversationId: string) => {
//     const conversation = await prisma.conversation.findUnique({
//       where: { id: conversationId },
//       include: {
//         participants: true,
//         messages: true,
//       },
//     })
//     if (!conversation) throw new AppError('Conversation not found', 404)
//     return conversation
//   }

//   // --------------------------- GET ALL CONVERSATIONS --------------------------- //
//   const getAllConversations = async (filters?: {
//     participantId?: string
//     participantType?: ParticipantType
//     type?: ConversationType
//     stage?: ConversationStage
//   }) => {
//     const conversations = await prisma.conversation.findMany({
//       where: {
//         type: filters?.type,
//         stage: filters?.stage,
//         participants: filters?.participantId
//           ? {
//               some: {
//                 participantId: filters.participantId,
//                 participantType: filters.participantType,
//               },
//             }
//           : undefined,
//       },
//       include: { participants: true, messages: true },
//     })

//     return conversations
//   }

//   // --------------------------- SEND MESSAGE --------------------------- //
//   const sendMessage = async (data: SendMessageInput) => {
//     const conversation = await prisma.conversation.findUnique({
//       where: { id: data.conversationId },
//     })
//     if (!conversation) throw new AppError('Conversation not found', 404)

//     const message = await prisma.message.create({
//       data: {
//         conversationId: data.conversationId,
//         senderType: data.senderType,
//         senderId: data.senderId,
//         content: data.content,
//         attachments: data.attachments,
//       },
//     })

//     // Auto-update stage based on related entities
//     if (conversation.stage === 'LISTING' && conversation.orderId) {
//       await prisma.conversation.update({
//         where: { id: conversation.id },
//         data: { stage: 'ORDER' },
//       })
//     }
//     if (conversation.stage !== 'DISPUTE' && conversation.disputeId) {
//       await prisma.conversation.update({
//         where: { id: conversation.id },
//         data: { stage: 'DISPUTE' },
//       })
//     }

//     return message
//   }

//   // --------------------------- GET MESSAGES OF A CONVERSATION --------------------------- //
//   const getConversationMessages = async (conversationId: string) => {
//     const messages = await prisma.message.findMany({
//       where: { conversationId },
//       orderBy: { createdAt: 'asc' },
//     })
//     return messages
//   }

//   return {
//     createConversation,
//     getConversationById,
//     getAllConversations,
//     sendMessage,
//     getConversationMessages,
//   }
// }
