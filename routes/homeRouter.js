import { Router } from 'express';
import { genreController, homeController, userLibraryGet } from '../controllers/homeController.js';
import { favoritesAdd, favoritesGet, favoritesRemove } from '../controllers/favoriteController.js';
import { cartCheckout, cartAdd, cartRemove, cartGet } from '../controllers/cartController.js';

const homeRouter = Router();

homeRouter.get("/genres/:id", genreController);

homeRouter.post("/favorites/add", favoritesAdd);
homeRouter.post("/favorites/remove", favoritesRemove);
homeRouter.get("/favorites", favoritesGet);

homeRouter.post("/cart/checkout", cartCheckout);
homeRouter.post("/cart/add", cartAdd);
homeRouter.post("/cart/remove", cartRemove);
homeRouter.get("/cart", cartGet);

homeRouter.get("/library", userLibraryGet);

homeRouter.get("/", homeController);

export default homeRouter;