import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.get("/register", authController.showRegister);
router.post("/register", authController.register);

router.get("/login", authController.showLogin);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

export default router;
