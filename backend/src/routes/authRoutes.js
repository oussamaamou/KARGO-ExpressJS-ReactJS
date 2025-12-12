import express from "express";
import authController from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/auth/register", authController.register);
authRoutes.post("/auth/login", authController.login);

export default authRoutes;

