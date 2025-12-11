import express from "express";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use('/api', authRoutes);

app.use(errorHandler);

export default app;