import { Router } from "express";
import { adminAddGame, adminForms, getGameDetailsController, getGamesController } from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/games/add", adminAddGame);

adminRouter.get("/search/:id/details/", getGameDetailsController)

adminRouter.get("/search", getGamesController);

adminRouter.get("/", adminForms);

export default adminRouter;