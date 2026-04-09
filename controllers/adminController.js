import { searchForGame } from "../db/queries.js";

const adminForms = (req, res, next) => {
    try {
        res.render("admin/search");
    } catch (error) {
        next(error)
    }
}

const adminSearchGet = async (req, res, next) => {
    try {
        const { query } = req.query;

        const data = await searchForGame(query);

        console.log(data);

        res.render("admin/listGames", { games : data.results });

    } catch (error) {
        next(error)
    }
}

export { adminSearchGet, adminForms };