import "dotenv/config";
import express from 'express';
import session from "express-session";
import path from 'path';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import homeRouter from './routes/homeRouter.js';
import NotFoundHandler from './middleware/NotFoundHandler.js';
import adminRouter from './routes/adminRouter.js';

const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(process.cwd(), "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({extended : true}));

app.use(logger);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, 
        maxAge: 1000 * 60 * 60 * 2, // 2 horas
    }
}));

app.use((req, res, next) => {
    res.locals.cart = req.session.cart || [];

    next();
});

app.use("/admin", adminRouter);

app.use("/", homeRouter);

app.use(NotFoundHandler);

app.use(errorHandler);

const PORT =  process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if(error){
        throw error;
    }

    console.log(`Listening on port ${PORT}`);
});