import { getGameById } from "../db/queries.js";
import { addGame, removeGame } from "../utils/addAndRemove.js";

const favoritesGet = (req, res, next) => {
    try {
        const favorites = req.session.favorites || [];

        res.render("home/favorites", { favorites });

    } catch (error) {
        next(error);
    }
};

const favoritesAdd = async (req, res, next) => {
    try {
        const game = await getGameById(Number(req.body.game_id));

        if (!req.session.favorites) {
            req.session.favorites = [];
        }

        addGame(req.session.favorites, game);

        res.redirect("/favorites");
    } catch (error) {
        next(error);
    }
};

const favoritesRemove = (req, res, next) => {
    try {
        req.session.favorites = removeGame(req.session.favorites, req.body.game_id);

        res.redirect("/favorites");
    } catch (error) {
        next(error);
    }
};

export { favoritesAdd, favoritesRemove, favoritesGet}