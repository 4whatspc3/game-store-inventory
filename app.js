import express from 'express';
import path from 'path';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import homeRouter from './routes/homeRouter.js';
import NotFoundHandler from './middleware/NotFoundHandler.js';
import formRouter from './routes/formRouter.js';

const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : true}));

app.use(logger);

app.use("/form", formRouter);

app.use("/", homeRouter);

app.use(NotFoundHandler);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, (error) => {
    if(error){
        throw error;
    }

    console.log(`Listening on port ${PORT}`);
});