import { Router } from "express";
import { adminAddGame, adminForms, getGameDetailsController, getGamesController } from "../controllers/adminController.js";
import formValidator from "../validators/formValidator.js";
import validate from "../validators/validate.js";

const adminRouter = Router();

adminRouter.post("/games/add", formValidator, validate, adminAddGame);

adminRouter.get("/search/:id/details/", getGameDetailsController)

adminRouter.get("/search", getGamesController);

adminRouter.get("/", adminForms);

export default adminRouter;