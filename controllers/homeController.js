import { getAllGames, getGamesByGenre, getGenreById, getAllGenres } from "../db/queries.js";

const homeController = async (req, res, next) => {
    try {
        const games = await getAllGames();
        const genres = await getAllGenres();

        res.render("home/index", { games, genres });
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

        res.render("home/genre", { games, genre, genres });
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

export { homeController, genreController, userLibraryGet };