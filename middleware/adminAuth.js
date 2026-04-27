const adminAuth = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.redirect("/admin/login");
    }

    next();
};

export default adminAuth;