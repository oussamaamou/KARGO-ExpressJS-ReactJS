import express from "express";
import TrajetController from "../controllers/TrajetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const trajetRouter = express.Router();

trajetRouter.use(authMiddleware.protect);

trajetRouter.route("/trajets")
    .get(authMiddleware.authorize("admin"), TrajetController.getAllTrajets)
    .post(authMiddleware.authorize("admin"), TrajetController.createTrajet);

trajetRouter.get("/mes-trajets", TrajetController.getMyTrajets);
trajetRouter.patch("/trajets/:id/status", TrajetController.updateStatus);

export default trajetRouter;