import { Router } from "express";
import { adminAddGame, 
        adminDeleteGame, 
        adminEditGameGet, 
        adminEditGamePost, 
        adminForms, 
        adminLibrary, 
        getGameDetailsController, 
        getGamesController } from "../controllers/adminController.js";
import formValidator from "../validators/formValidator.js";
import validate from "../validators/validate.js";

const adminRouter = Router();

adminRouter.post("/games/:id/delete", adminDeleteGame);

adminRouter.get("/games/:id/edit", adminEditGameGet);

adminRouter.post("/games/:id/edit", adminEditGamePost);

adminRouter.post("/games/add", formValidator, validate, adminAddGame);

adminRouter.get("/search/:id/details/", getGameDetailsController);

adminRouter.get("/library", adminLibrary);

adminRouter.get("/search", getGamesController);

adminRouter.get("/", adminForms);

export default adminRouter;