import express from 'express';
import path from 'path';
import homeRouter from './routes/homeRouter.js';

const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use("/", homeRouter);

const PORT = 3000;

app.listen(PORT, (error) => {
    if(error){
        throw error;
    }

    console.log(`Listening on port ${PORT}`);
});