const homeController = (req, res, next) => {
    res.render("index", { title: "Home Page"});
};

export default homeController;