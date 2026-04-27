const adminLoginGet = (req, res, next) => {
    try {
        if(req.session.isAdmin){
            return res.redirect("/admin");
        }

        res.render("admin/login");
    } catch (error){
        next(error);
    }
};

const adminLoginPost = (req, res, next) => {
    try {
        const { password } = req.body;

        if(password !== process.env.ADMIN_PASSWORD){
            return res.render("admin/login", { error : "Wrong password"});
        }

        req.session.isAdmin = true;
        res.redirect("/admin");
    } catch (error) {
        next(error)
    }
};

const adminLogout = (req, res, next) => {
    try {
        req.session.destroy();

        res.redirect("admin/login");
    } catch (error) {
        next(error);
    }
}

export { adminLoginGet, adminLoginPost, adminLogout };