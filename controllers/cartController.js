import calculateTotal from "../utils/calculateTotal.js";
import { getGameById } from "../db/queries.js";
import { addGame, removeGame } from "../utils/addAndRemove.js";

const cartGet = (req, res, next) => {
    try {
        const cart = req.session.cart || [];

        const total = calculateTotal(cart)

        res.render("home/cart", { cart, total });
    } catch (error) {
        next(error);
    }
};

const cartAdd = async (req, res, next) => {
    try {
        const game = await getGameById(Number(req.body.game_id));

        if (!req.session.cart) {
            req.session.cart = [];
        }

        addGame(req.session.cart, game)

        res.redirect("/cart");
    } catch (error) {
        next(error);
    }
};

const cartRemove = (req, res, next) => {
    try {
        req.session.cart = removeGame(req.session.cart, req.body.game_id);

        res.redirect("/cart");
    } catch (error) {
        next(error);
    }
};

const cartCheckout = (req, res, next) => {
    try {
        req.session.cart = [];

        res.render("home/confirmation");
    } catch (error) {
        next(error);
    }
};

export {cartGet, cartAdd, cartRemove, cartCheckout};