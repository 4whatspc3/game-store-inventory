import { Router } from "express";
import { adminForms, adminSearchGet } from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.get("/search", adminSearchGet);

adminRouter.get("/", adminForms);

export default adminRouter;