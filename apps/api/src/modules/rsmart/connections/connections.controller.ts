// import { AppError } from "@/common/errors";
// import { asyncHandler, sendResponse } from "@/common/utils";
// import {
//   acceptConnectService,
//   createConnectService,
//   getAllConnectsService,
//   getAllConversationsService,
//   getConversationByIdService,
//   getConversationMessagesService,
//   rejectConnectService,
//   sendMessageService,
// } from "./connections.service";
// import { uploadOnCloudinary } from "@/integrations/storage/cloudinary/cloudinary.service";

// export const createConnect = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req?.user?.id;
//     if (!userId) throw new AppError("Unauthorized: user id not found", 401);

//     const body = req.body;

//     const { message, newConnect } = await createConnectService(userId, body);

//     sendResponse(res, {
//       success: true,
//       statusCode: 201,
//       message,
//       data: { newConnect },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// export const acceptConnect = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req?.user?.id;

//     if (!userId) throw new AppError("Unauthorized: user id not found", 401);

//     const body = req.body;

//     const { message, connect, conversation } = await acceptConnectService(
//       userId,
//       body
//     );

//     sendResponse(res, {
//       success: true,
//       statusCode: 200,
//       message,
//       data: { connect, conversation },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// export const rejectConnect = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req?.user?.id;

//     if (!userId) throw new AppError("Unauthorized: user id not found", 401);

//     const body = req.body;

//     const { message, connect } = await rejectConnectService(userId, body);

//     sendResponse(res, {
//       success: true,
//       statusCode: 200,
//       message,
//       data: { connect },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// export const getAllConnects = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req?.user?.id;

//     if (!userId) throw new AppError("Unauthorized: user id not found", 401);

//     const type = req.query.type as string;

//     const allConnects = await getAllConnectsService(userId, type);

//     sendResponse(res, {
//       success: true,
//       statusCode: 200,
//       data: { allConnects },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// export const getAllConversations = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req?.user?.id;

//     if (!userId) throw new AppError("Unauthorized: user id not found", 401);

//     const allConversations = await getAllConversationsService(userId);

//     sendResponse(res, {
//       success: true,
//       statusCode: 200,
//       data: { allConversations },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// export const getConversationById = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req?.user?.id;

//     if (!userId) throw new AppError("Unauthorized: user id not found", 401);

//     const conversationId = req.params.conversationId as string;

//     if (!conversationId)
//       throw new AppError("Conversation id is not found", 401);

//     const conversation = await getConversationByIdService(conversationId);

//     sendResponse(res, {
//       success: true,
//       statusCode: 200,
//       data: { conversation },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// export const sendMessage = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req?.user?.id;
//     if (!userId) throw new AppError("Unauthorized: user id not found", 401);

//     // Handle file uploads from multer
//     let mediaFiles: Express.Multer.File[] = [];

//     if (Array.isArray(req.files)) {
//       mediaFiles = req.files;
//     } else if (req.files && Array.isArray(req.files["media"])) {
//       mediaFiles = req.files["media"];
//     }

//     // Upload all files to Cloudinary
//     let uploadedMedia: { url: string; type: string }[] = [];
//     if (mediaFiles.length > 0) {
//       const uploadPromises = mediaFiles.map((file) =>
//         uploadOnCloudinary(file.path, "rakshasetu/message-media")
//       );

//       const uploadResults = await Promise.all(uploadPromises);

//       uploadedMedia = uploadResults
//         .filter((result) => result?.url)
//         .map((result) => ({
//           url: result!.url,
//           type: result!.resource_type || "raw", // image, video, etc.
//         }));
//     }

//     const data = req.body;

//     if (userId !== data.senderId)
//       throw new AppError(
//         "You are not allowed to send messages on behalf of another user",
//         403
//       );

//     const { message } = await sendMessageService({
//       ...data,
//       attachments: uploadedMedia,
//     });

//     sendResponse(res, {
//       success: true,
//       statusCode: 201,
//       message,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// export const getConversationMessages = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req?.user?.id;

//     if (!userId) throw new AppError("Unauthorized: user id not found", 401);

//     const conversationId = req.params.conversationId as string;

//     if (!conversationId)
//       throw new AppError("Conversation id is not found", 401);

//     const messages = await getConversationMessagesService(conversationId);

//     sendResponse(res, {
//       success: true,
//       statusCode: 200,
//       data: { messages },
//     });
//   } catch (err) {
//     next(err);
//   }
// });
