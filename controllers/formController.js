const messages = [];

const formGet = (req, res, next) => {
    try {
        res.render("form")
    } catch (error) {
        next (error);
    }
}

const formGetID = (req, res, next) => {
    try {
        const item = messages.find((el) => el.id === Number(req.params.id));

        if(!item) {
            throw new NotFoundError('Book not found with the provided ID');
        }

        res.render("itemByID", item);

    } catch (error) {
        next(error)
    }
}

const formPost = (req, res, next) => {
    try {
        const { user, message } = req.body;

        messages.push({
            id : messages.length,
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

export { formGet, formPost, formGetID };