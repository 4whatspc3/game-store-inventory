import { getGameDetails, getGames } from "../db/queries.js";

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

        console.log(data);

        res.render("admin/listGames", { games : data.results });

    } catch (error) {
        next(error)
    }
}

const getGameDetailsController = async (req, res, next) => {
    try {
        const data = await getGameDetails(Number(req.params.id));

        console.log(data);

        res.render("admin/gameDetails", { game : data });
    } catch (error) {
        next(error)
    }
};

export { getGamesController, adminForms, getGameDetailsController };