import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Show registration form
 *     description: Displays the user registration form for new users.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Returns the registration form view.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: '<html>...register...</html>'
 */
router.get("/register", authController.showRegister);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided username and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Desired username for the new account.
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: Password for the new account.
 *                 example: "password123"
 *     responses:
 *       302:
 *         description: Redirects to login or feed after successful registration.
 *       400:
 *         description: Bad request if username or password is missing/invalid.
 *       409:
 *         description: Conflict if username already exists.
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Show login form
 *     description: Displays the login form for existing users.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Returns the login form view.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: '<html>...login...</html>'
 */
router.get("/login", authController.showLogin);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user and starts a session.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the account.
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: Password for the account.
 *                 example: "password123"
 *     responses:
 *       302:
 *         description: Redirects to feed after successful login.
 *       400:
 *         description: Bad request if credentials are missing/invalid.
 *       401:
 *         description: Unauthorized if credentials are incorrect.
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out the current user
 *     description: Logs out the current user and ends the session.
 *     tags:
 *       - Auth
 *     responses:
 *       302:
 *         description: Redirects to home or login after logout.
 *       401:
 *         description: Unauthorized if no user is logged in.
 */
router.get("/logout", authController.logout);

export default router;
