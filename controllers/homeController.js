const homeController = (req, res, next) => {
    res.render("index", { title: "Home Page", message: "Hello World!!!" });
};

export default homeController;