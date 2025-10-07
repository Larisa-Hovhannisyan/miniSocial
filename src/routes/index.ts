import { Router } from "express";
import { maybeAuth } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Render the home page
 *     description: Renders the main landing page. Shows personalized content if user is authenticated.
 *     tags:
 *       - Home
 *     responses:
 *       200:
 *         description: Returns the home page view.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: '<html>...home...</html>'
 *       500:
 *         description: Internal server error if rendering fails.
 */
router.get("/", maybeAuth, (req, res) => {
  res.render("index", { user: res.locals.user || null, message: null });
});

export default router;
