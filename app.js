import express from 'express';
import path from 'path';
import homeRouter from './routes/homeRouter.js';

const app = express();

app.use("/", homeRouter);

const PORT = 3000;

app.listen(PORT, (error) => {
    if(error){
        throw error;
    }

    console.log(`Listening on port ${PORT}`);
});