import { Router } from "express";
import { upload } from "@/common/middleware";
import { authenticateUser } from "@/core/auth/middlewares";
import {
  getAllListings,
  getSingleListing,
  getUserListings,
  getLoggedUserListings,
  addListing,
  updateListing,
  deleteListing,
} from "./listings.controller";

const listingRouter = Router();

/**
 * 🧭 Public routes
 */
listingRouter.get("/", getAllListings);
listingRouter.get("/:listingId", getSingleListing);
listingRouter.get("/user/:userId", getUserListings);

/**
 * 🔐 Authenticated routes
 */
listingRouter.use(authenticateUser);

listingRouter.get("/me/all", getLoggedUserListings);

listingRouter.post("/create", upload.array("media", 10), addListing);

listingRouter.put("/:listingId", upload.array("media", 10), updateListing);

listingRouter.delete("/:listingId", deleteListing);

export default listingRouter;
