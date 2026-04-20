import { deleteGame, 
        getAllGames, 
        getGameDetails, 
        getGames, 
        insertGameGenre, 
        insertNewGame, 
        insertNewGenre } from "../db/queries.js";

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
    try{
        const { rawg_id, price, stock } = req.body;

        const game = await getGameDetails(Number(rawg_id));

        const gameId = await insertNewGame(game.name, game.description_raw, game.released, game.background_image, price, stock);

        for (const genre of game.genres) {
            const genreId = await insertNewGenre(genre.name);
            await insertGameGenre(gameId, genreId)
        }
        
        res.redirect("/admin/library");
    } catch (error) {
        next (error)
    }
}

const adminDeleteGame = async (req, res, next) => {
    try {
        await deleteGame(Number(req.params.id));
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
        adminLibrary };