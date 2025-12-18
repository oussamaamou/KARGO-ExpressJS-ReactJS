import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/auth/register", authController.register);
authRouter.post("/auth/login", authController.login);
authRouter.get("/chauffeurs", authMiddleware.protect, authMiddleware.authorize("admin"), authController.getChauffeurs);

export default authRouter;

