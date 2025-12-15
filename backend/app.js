import express from "express";
import cors from 'cors';
import { errorHandler } from "./src/middlewares/errorHandler.js";
import authRoutes from "./src/routes/authRoutes.js";
import camionRoutes from "./src/routes/camionRoutes.js";
import remoqueRoutes from "./src/routes/remoqueRoutes.js";
import maintenanceRoutes from './src/routes/maintenanceRoutes.js';
import trajetRoutes from './src/routes/trajetRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', camionRoutes);
app.use('/api', remoqueRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api', trajetRoutes);

app.use(errorHandler);

export default app;