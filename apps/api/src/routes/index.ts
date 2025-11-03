import { Router } from "express";

import mainAuthRoutes from "../core/auth/auth.routes";

const mainRouter = Router();

mainRouter.use(`/auth`, mainAuthRoutes);

export default mainRouter;
