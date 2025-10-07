import { Router } from "express";
import postController from "../controllers/postController";
import { requireAuth } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = Router();

/**
 * @swagger
 * /feed:
 *   get:
 *     summary: Get the feed of posts
 *     description: Returns a list of posts for the main feed. Requires authentication for personalized content.
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Successfully returns the feed view with posts.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: '<html>...feed...</html>'
 *       401:
 *         description: Unauthorized access if user is not logged in.
 */
router.get("/feed", postController.feed);

/**
 * @swagger
 * /create:
 *   get:
 *     summary: Show create post form
 *     description: Displays the form for creating a new post. Only accessible to authenticated users.
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Returns the post creation form view.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: '<html>...form...</html>'
 *       401:
 *         description: Unauthorized access if user is not logged in.
 */
router.get("/create", requireAuth, postController.showCreate);

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new post
 *     description: Submits a new post with optional images. Only authenticated users can create posts.
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The text content of the post.
 *                 example: "Check out my new photo!"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Up to 5 image files to attach to the post.
 *     responses:
 *       302:
 *         description: Redirects to the feed after successful post creation.
 *       400:
 *         description: Bad request if data is missing or invalid.
 *       401:
 *         description: Unauthorized if user is not logged in.
 */
router.post("/create", requireAuth, upload.array("images", 5), postController.create);

/**
 * @swagger
 * /{id}/like:
 *   post:
 *     summary: Like a post
 *     description: Likes a post by its ID. Only authenticated users can like posts.
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the post to like.
 *     responses:
 *       200:
 *         description: Post liked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 likes:
 *                   type: number
 *                   example: 42
 *       400:
 *         description: Bad request if post ID is invalid.
 *       401:
 *         description: Unauthorized if user is not logged in.
 *       404:
 *         description: Post not found.
 */
router.post("/:id/like", requireAuth, postController.like);

export default router;



