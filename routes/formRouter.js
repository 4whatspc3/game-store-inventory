import { Router } from "express";
import { formGet, formPost } from "../controllers/formController.js";

const formRouter = Router();

formRouter.get("/", formGet);

formRouter.post("/", formPost);

export default formRouter;