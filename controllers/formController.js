const messages = [];

const formGet = (req, res, next) => {
    try {
        res.render("form")
    } catch (error) {
        next (error);
    }
}

const formPost = (req, res, next) => {
    try {
        const { user, message } = req.body;

        messages.push({
            user,
            message,
            added : new Date(),
        });

        console.log(messages)

        res.redirect("/");
    } catch (error) {
        next (error)
    }
}

export { formGet, formPost };