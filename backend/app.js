import express from "express";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.get('/test-error', (req, res, next) => {

    const error = new Error("Ceci est un test d'erreur");
    res.statusCode = 400; 
    next(error); 
});

app.use(errorHandler);

export default app;