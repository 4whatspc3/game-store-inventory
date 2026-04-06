import messages from "../db/db.js";

const homeController = (req, res, next) => {
    res.render("index", { title: "Home Page", messages: messages });
};

export default homeController;