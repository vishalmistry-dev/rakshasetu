import { Router } from "express";
import userAuthRoutes from "./domain/user/user-auth.routes";
import merchantAuthRoutes from "./domain/merchant/merchant-auth.routes";
import adminAuthRoutes from "./domain/admin/admin-auth.routes";

const authRouter = Router();

// Grouped routes for clarity and scalability
authRouter.use("/user", userAuthRoutes);
authRouter.use("/merchant", merchantAuthRoutes);
authRouter.use("/admin", adminAuthRoutes);

export default authRouter;
