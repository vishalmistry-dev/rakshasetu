// import { authenticateUser } from "@/core/auth/middlewares";
// import { Router } from "express";
// import {
//   acceptConnect,
//   createConnect,
//   getAllConnects,
//   getAllConversations,
//   getConversationById,
//   getConversationMessages,
//   rejectConnect,
//   sendMessage,
// } from "./connections.controller";
// import { upload } from "@/common/middleware";
// import { bodySchema, paramsSchema, validateRequest } from "@/common/utils";
// import { conversationIdSchema, messageSchema } from "./connections.schema";

// const router = Router();

// router.use(authenticateUser);

// router.post("/create", createConnect);
// router.post("/accept", acceptConnect);
// router.post("/reject", rejectConnect);
// router.get("/connects", getAllConnects);

// router.get("/conversations", getAllConversations);

// router.post(
//   "/messages/send",
//   validateRequest(bodySchema(messageSchema)),
//   upload.array("media", 5),
//   sendMessage
// );
// router.get(
//   "/conversations/:conversationId",
//   validateRequest(paramsSchema(conversationIdSchema)),
//   getConversationById
// );
// router.get(
//   "/conversations/:conversationId/messages",
//   validateRequest(paramsSchema(conversationIdSchema)),
//   getConversationMessages
// );

// export default router;
