import express from "express";
import DashboardController from "../controllers/DashboardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const dashboardRouter = express.Router();

dashboardRouter.use(authMiddleware.protect);

dashboardRouter.get("/stats", authMiddleware.authorize("admin"), DashboardController.getDashboardStats);

export default dashboardRouter;