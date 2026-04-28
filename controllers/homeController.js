import { getAllGames } from "../db/queries.js";

const homeController = async (req, res, next) => {
    try {
        const games = await getAllGames();

        res.render("home/index", { games });
    } catch (error) {
        next(error)
    }
};

export default homeController;