import {messages, increase, counter} from "../db/db.js";

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

        increase();

        messages.push({
            id : counter,
            user,
            message,
            added : new Date(),
            updated : new Date(),
        });

        console.log(messages)

        res.redirect("/");
    } catch (error) {
        next (error)
    }
}

const updateItemGet = (req, res, next) => {
    try {
        const item = Number(req.params.id);

        res.render("update", messages[item])
    } catch (error) {
        next(error)
    }
};

const updateItemPost = (req, res, next) => {
    try {
        const { user, message } = req.body;

        const itemID = Number(req.params.id);

        const item = messages.find((el) => el.id === itemID);

        messages[itemID] = { ...item, user, message};

        console.log(messages);

        res.redirect("/");

    } catch (error) {
        next (error)
    }
}


export { formGet, formPost, formGetID, updateItemGet, updateItemPost };