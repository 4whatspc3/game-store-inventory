import { Router } from 'express';
import { genreController, homeController } from '../controllers/homeController.js';

const homeRouter = Router();

homeRouter.get("/", homeController);

homeRouter.get("/genres/:id", genreController);

export default homeRouter;