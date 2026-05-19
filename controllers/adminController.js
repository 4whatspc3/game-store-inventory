import { getGames, getGameDetails } from "../db/queries/apiQueries.js";

import { insertNewGame, deleteGame, getGameById, updateGame, getAllGames } from "../db/queries/gameQueries.js";

import { insertNewGenre, insertGameGenre } from "../db/queries/genreQueries.js";

import { insertPlatform, insertGamePlatform } from "../db/queries/platformQueries.js";

import { insertDeveloper, insertGameDeveloper } from "../db/queries/developerQueries.js";

const adminForms = (req, res, next) => {
    try {
        res.render("admin/search");
    } catch (error) {
        next(error)
    }
}

const getGamesController = async (req, res, next) => {
    try {
        const { query } = req.query;

        const data = await getGames(query);

        res.render("admin/listGames", { games : data.results });

    } catch (error) {
        next(error)
    }
}

const getGameDetailsController = async (req, res, next) => {
    try {
        const data = await getGameDetails(Number(req.params.id));

        res.render("admin/gameDetails", { game : data });
    } catch (error) {
        next(error)
    }
};

const adminAddGame = async (req, res, next) => {
    try {
        const { rawg_id, price } = req.body;

        const data = await getGameDetails(rawg_id);

        const gameId = await insertNewGame(
            data.name,
            data.description_raw,
            data.released,
            data.background_image,
            price,
            data.rating,
            data.metacritic
        );

        for (const genre of data.genres) {
            const genreId = await insertNewGenre(genre.name);
            await insertGameGenre(gameId, genreId);
        }

        for (const el of data.platforms) {
            const platformId = await insertPlatform(el.platform.name);
            await insertGamePlatform(gameId, platformId);
        }

        for (const dev of data.developers) {
            const developerId = await insertDeveloper(dev.name);
            await insertGameDeveloper(gameId, developerId);
        }

        res.redirect("/admin/library");
    } catch (error) {
        next(error);
    }
};

const adminDeleteGame = async (req, res, next) => {
    try {
        await deleteGame(Number(req.params.id));
        res.redirect("/admin/library");
    } catch (error) {
        next(error);
    }
}


const adminEditGameGet = async (req, res, next) => {
    try {
        const game = await getGameById(Number(req.params.id));
        res.render("admin/editGame", { game });
    } catch (error) {
        next(error);
    }
}

const adminEditGamePost = async (req, res, next) => {
    try {
        const { price } = req.body;
        await updateGame(Number(req.params.id), price);
        res.redirect("/admin/library");
    } catch (error) {
        next(error);
    }
}

const adminLibrary = async (req, res, next) => {
    try {
        const games = await getAllGames();
        res.render("admin/library", { games });
    } catch (error) {
        next(error);
    }
}

export { getGamesController, 
        adminForms, 
        getGameDetailsController, 
        adminAddGame,
        adminDeleteGame,
        adminLibrary,
        adminEditGameGet,
        adminEditGamePost };