import { Router } from 'express';
import { genreController, homeController } from '../controllers/homeController.js';
import { favoritesAdd, favoritesGet, favoritesRemove } from '../controllers/favoriteController.js';

const homeRouter = Router();

homeRouter.get("/genres/:id", genreController);

homeRouter.get("/favorites", favoritesGet);
homeRouter.post("/favorites/add", favoritesAdd);
homeRouter.post("/favorites/remove", favoritesRemove);

homeRouter.get("/", homeController);

export default homeRouter;