import express from "express";
import TrajetController from "../controllers/TrajetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware.protect);

router.route("/trajets")
    .get(authMiddleware.authorize("admin"), TrajetController.getAllTrajets)
    .post(authMiddleware.authorize("admin"), TrajetController.createTrajet);

router.get("/mes-trajets", TrajetController.getMyTrajets);
router.patch("/trajets/:id/status", TrajetController.updateStatus);

export default router;