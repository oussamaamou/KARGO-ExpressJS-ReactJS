import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/auth/register", authController.register);
authRoutes.post("/auth/login", authController.login);
authRoutes.get("/chauffeurs", authMiddleware.protect, authMiddleware.authorize("admin"), authController.getChauffeurs);

export default authRoutes;

