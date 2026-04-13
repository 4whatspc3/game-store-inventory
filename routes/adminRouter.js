import { Router } from "express";
import { adminForms, getGameDetailsController, getGamesController } from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.get("/search/:id/details/", getGameDetailsController)

adminRouter.get("/search", getGamesController);

adminRouter.get("/", adminForms);

export default adminRouter;