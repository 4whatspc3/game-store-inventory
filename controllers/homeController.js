import { getAllGames, getGamesByGenre, getGenreById } from "../db/queries.js";

const homeController = async (req, res, next) => {
    try {
        const games = await getAllGames();

        res.render("home/index", { games });
    } catch (error) {
        next(error)
    }
};

const genreController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const genre = await getGenreById(id);
        const games = await getGamesByGenre(id);

        res.render("home/genre", { games, genre });
    } catch (error) {
        next(error);
    }
}

export { homeController, genreController };