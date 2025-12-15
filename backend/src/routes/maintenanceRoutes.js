import express from "express";
import MaintenanceController from "../controllers/MaintenanceController.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware.protect);

router.route("/regles")
    .get(authMiddleware.authorize("admin"), MaintenanceController.getRules)
    .put(authMiddleware.authorize("admin"), MaintenanceController.updateRules);

export default router;