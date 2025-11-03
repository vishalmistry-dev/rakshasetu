// import { AppError } from '@/common/errors'
// import { generateUniqueId } from '@/common/utils'
// import { prisma } from '@/config/prisma'
// import {
//   AcceptConnectInput,
//   CreateConnectInput,
//   MessageInput,
//   RejectConnectInput,
// } from './connections.schema'

// import { ConversationService } from '@/core/conversations'
// import { CONNECT_STATUS } from '@rakshasetu/database'

// const conversationService = ConversationService()

// export const createConnectService = async (
//   userId: string,
//   { sellerId, listingId, message }: CreateConnectInput
// ) => {
//   const user = await prisma.user.findUnique({ where: { id: userId } })
//   if (!user) throw new AppError('User not found', 404)

//   const seller = await prisma.user.findUnique({ where: { id: sellerId } })
//   if (!seller) throw new AppError('Seller not found', 404)

//   if (userId === sellerId) {
//     throw new AppError('You cannot connect with yourself', 400)
//   }

//   if (!listingId) {
//     throw new AppError('Lisitng id is required', 400)
//   }

//   const connectId = await generateUniqueId('cnt', 'connects', 'id')

//   const newConnect = await prisma.connects.create({
//     data: {
//       id: connectId,
//       userId,
//       listingId,
//       sellerId,
//       status: CONNECT_STATUS.PENDING,
//       message,
//     },
//   })

//   const fullname = user.firstName + ' ' + user.lastName

//   //   await sendConnectEmail({
//   //     to: seller.email,
//   //     subject: "New Connection Request - RakshaSetu",
//   //     heading: "New Connection Request",
//   //     message: `<strong>${fullname}</strong> wants to connect with you on RakshaSetu. Log in to accept or reject the request.`,
//   //     cta: {
//   //       label: "View Request",
//   //       url: "https://rakshasetu.com/connections",
//   //     },
//   //   });

//   return { message: 'Connect request created successfully', newConnect }
// }

// export const acceptConnectService = async (userId: string, { connectId }: AcceptConnectInput) => {
//   const user = await prisma.user.findUnique({ where: { id: userId } })
//   if (!user) throw new AppError('User not found', 404)

//   const checkConnect = await prisma.connects.findUnique({
//     where: { id: connectId, sellerId: userId, status: CONNECT_STATUS.PENDING },
//   })

//   if (!checkConnect) {
//     throw new AppError('Connect request not found or you are not authorized to accept it', 404)
//   }

//   if (userId !== checkConnect.sellerId) {
//     throw new AppError('You are not authorized to accept this connect request', 403)
//   }

//   const buyer = await prisma.user.findUnique({
//     where: { id: checkConnect.userId },
//   })
//   if (!buyer) throw new AppError('Buyer not found', 404)

//   const connect = await prisma.connects.update({
//     where: { id: connectId, sellerId: userId },
//     data: { status: CONNECT_STATUS.ACCEPTED },
//   })

//   const conversation = await conversationService.createConversation({
//     type: 'CONNECTION',
//     listingId: checkConnect.listingId,
//     participants: [
//       { participantType: 'BUYER', participantId: buyer.id },
//       { participantType: 'SELLER', participantId: userId },
//     ],
//   })

//   // const fullname = buyer.firstName + " " + buyer.lastName;

//   //   await sendConnectEmail({
//   //     to: buyer.email,
//   //     subject: "Connection Accepted - RakshaSetu",
//   //     heading: "Connection Accepted 🎉",
//   //     message: `<strong>${fullname}</strong> has accepted your request. You can now chat and collaborate.`,
//   //   });

//   return {
//     message: 'Connect request accepted successfully',
//     connect,
//     conversation,
//   }
// }

// export const rejectConnectService = async (
//   userId: string,
//   { connectId, rejectReason }: RejectConnectInput
// ) => {
//   const checkConnect = await prisma.connects.findUnique({
//     where: { id: connectId, sellerId: userId, status: CONNECT_STATUS.ACCEPTED },
//   })

//   if (checkConnect) {
//     throw new AppError('You cannot reject an accepted connect request', 400)
//   }

//   const getConnect = await prisma.connects.findUnique({
//     where: {
//       id: connectId,
//       sellerId: userId,
//     },
//   })

//   if (!getConnect) throw new AppError('Connect request not found', 404)

//   const otherUser = await prisma.user.findUnique({
//     where: {
//       id: getConnect.userId,
//     },
//   })

//   if (!otherUser) throw new AppError('Other user not found', 404)

//   const connect = await prisma.connects.update({
//     where: { id: connectId, sellerId: userId },
//     data: { status: CONNECT_STATUS.REJECTED, rejectReason },
//   })

//   const fullname = otherUser?.firstName + ' ' + otherUser?.lastName

//   //   await sendConnectEmail({
//   //     to: otherUser.email,
//   //     subject: "Connection Rejected - RakshaSetu",
//   //     heading: "Connection Rejected",
//   //     message: `<strong>${fullname}</strong> has declined your request. You can explore other users to connect with.`,
//   //   });

//   return { message: 'Connect request rejected successfully', connect }
// }

// export const getAllConnectsService = async (userId: string, type: string | undefined) => {
//   const user = await prisma.user.findUnique({ where: { id: userId } })
//   if (!user) throw new AppError('User not found', 404)

//   const where: any = {}
//   if (type === 'sent') {
//     where.userId = userId
//   } else if (type === 'received') {
//     where.sellerId = userId
//   } else {
//     where.OR = [{ userId }, { sellerId: userId }]
//   }

//   const connects = await prisma.connects.findMany({
//     where,
//     include: {
//       user: {
//         select: {
//           id: true,
//           firstName: true,
//           lastName: true,
//           email: true,
//           business: true,
//           image: true,
//         },
//       },
//       seller: {
//         select: {
//           id: true,
//           firstName: true,
//           lastName: true,
//           email: true,
//           business: true,
//           image: true,
//         },
//       },
//       listing: {
//         select: {
//           id: true,
//           title: true,
//           type: true,
//           media: true,
//         },
//       },
//     },
//     orderBy: { updatedAt: 'desc' },
//   })

//   // Attach conversationId if available
//   const connectsWithConversation = await Promise.all(
//     connects.map(async (connect) => {
//       const conversation = await prisma.conversation.findFirst({
//         where: {
//           listingId: connect.listingId ?? undefined,
//         },
//         select: { id: true },
//       })

//       return {
//         ...connect,
//         conversationId: conversation?.id ?? null,
//       }
//     })
//   )

//   return connectsWithConversation
// }

// export const getAllConversationsService = async (userId: string) => {
//   return await conversationService.getAllConversations({
//     participantId: userId,
//   })
// }

// export const getConversationByIdService = async (conversationId: string) => {
//   return await conversationService.getConversationById(conversationId)
// }

// export const sendMessageService = async (data: MessageInput) => {
//   return await conversationService.sendMessage(data)
// }

// export const getConversationMessagesService = async (conversationId: string) => {
//   return await conversationService.getConversationMessages(conversationId)
// }
