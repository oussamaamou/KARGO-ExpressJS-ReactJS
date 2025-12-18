import express from "express";
import cors from 'cors';
import { errorHandler } from "./src/middlewares/errorHandler.js";
import authRouter from "./src/routes/authRoutes.js";
import camionRouter from "./src/routes/camionRoutes.js";
import remoqueRouter from "./src/routes/remoqueRoutes.js";
import maintenanceRoutes from './src/routes/maintenanceRoutes.js';
import trajetRoutes from './src/routes/trajetRoutes.js';
import dashboardRouter from "./src/routes/dashboardRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authRouter);
app.use('/api', camionRouter);
app.use('/api', remoqueRouter);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api', trajetRoutes);
app.use('/api', dashboardRouter)

app.use(errorHandler);

export default app;