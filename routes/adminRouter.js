import { Router } from "express";
import rateLimit from "express-rate-limit";
import adminAuth from "../middleware/adminAuth.js";
import { adminAddGame, 
        adminDeleteGame, 
        adminEditGameGet, 
        adminEditGamePost, 
        adminForms, 
        adminLibrary, 
        adminLibraryByGenre, 
        getGameDetailsController, 
        getGamesController } from "../controllers/adminController.js";
import { adminLoginGet, adminLoginPost, adminLogout } from "../controllers/adminLoginController.js";
import formValidator from "../validators/formValidator.js";
import validate from "../validators/validate.js";

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10,
    message: "Too many login attempts, please try again later.",
});

const adminRouter = Router();

adminRouter.get("/login", adminLoginGet);
adminRouter.post("/login", loginLimiter, adminLoginPost);
adminRouter.post("/logout", adminLogout);

adminRouter.use(adminAuth);

adminRouter.post("/games/:id/delete", adminDeleteGame);

adminRouter.get("/games/:id/edit", adminEditGameGet);

adminRouter.post("/games/:id/edit", adminEditGamePost);

adminRouter.post("/games/add", formValidator, validate, adminAddGame);

adminRouter.get("/search/:id/details/", getGameDetailsController);

adminRouter.get('/library/genres/:id', adminLibraryByGenre);

adminRouter.get("/library", adminLibrary);

adminRouter.get("/search", getGamesController);

adminRouter.get("/", adminForms);

export default adminRouter;