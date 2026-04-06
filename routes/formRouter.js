import { Router } from "express";
import { formGet, formPost, formGetID } from "../controllers/formController.js";

const formRouter = Router();

formRouter.get("/:id", formGetID);

formRouter.get("/", formGet);

formRouter.post("/", formPost);

export default formRouter;