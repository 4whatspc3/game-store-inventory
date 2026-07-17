import { getAllGames, getGameByIdComplete } from "../db/queries/gameQueries.js";

import { getAllGenres, getGenreById, getGamesByGenre } from "../db/queries/genreQueries.js";

const homeController = async (req, res, next) => {
    try {
        const games = await getAllGames();
        const genres = await getAllGenres();

        res.render("home/index", { games, genres, selectedGenre: '' });
    } catch (error) {
        next(error)
    }
};

const genreController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const genre = await getGenreById(id);
        const games = await getGamesByGenre(id);
        const genres = await getAllGenres();

        const selectedGenre = genre ? genre.name : '';

        res.render("home/genre", { games, genre, genres, selectedGenre });
    } catch (error) {
        next(error);
    }
}

const userLibraryGet = async (req, res, next) => {
    try {
        const library = req.session.library || [];
        const genres = await getAllGenres();

        res.render("home/userLibrary", { library, genres });
    } catch (error) {
        next(error);
    }
};

const gameDetailsGet = async (req, res, next) => {
    try {
        const game = await getGameByIdComplete(Number(req.params.id));
        res.render("home/storeGameDetails", { game });
    } catch (error) {
        next(error);
    }
};

export { homeController, genreController, userLibraryGet, gameDetailsGet };