import express from "express";
import MaintenanceController from "../controllers/MaintenanceController.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const maintenanceRouter = express.Router();

maintenanceRouter.use(authMiddleware.protect);

maintenanceRouter.route("/regles")
    .get(authMiddleware.authorize("admin"), MaintenanceController.getRules)
    .put(authMiddleware.authorize("admin"), MaintenanceController.updateRules);

export default maintenanceRouter;