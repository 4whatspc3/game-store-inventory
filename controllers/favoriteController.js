import { getGameById } from "../db/queries.js";

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

        const alreadyAdded = req.session.favorites.some((el) => el.id === game.id);

        if (!alreadyAdded) {
            req.session.favorites.push(game);
        }

        res.redirect("/favorites");
    } catch (error) {
        next(error);
    }
};

const favoritesRemove = (req, res, next) => {
    try {
        const gameId = Number(req.body.game_id);

        req.session.favorites = req.session.favorites.filter((el) => el.id !== gameId);

        res.redirect("/favorites");
    } catch (error) {
        next(error);
    }
};

export { favoritesAdd, favoritesRemove, favoritesGet}