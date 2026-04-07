import { Router } from "express";
import { formGet, formPost, formGetID, updateItemGet, updateItemPost } from "../controllers/formController.js";
import formValidator from "../validators/formValidator.js";
import validate from "../validators/validate.js";

const formRouter = Router();

formRouter.get("/:id/update", updateItemGet);
formRouter.post("/:id/update", formValidator, validate, updateItemPost);

formRouter.get("/:id", formGetID);

formRouter.get("/", formGet);
formRouter.post("/", formValidator, validate, formPost);

export default formRouter;