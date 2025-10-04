import { Router } from "express";
import postController from "../controllers/postController";
import { requireAuth } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("/feed", postController.feed);

router.get("/create", requireAuth, postController.showCreate);

router.post("/create", requireAuth, upload.array("images", 5), postController.create);

router.post("/:id/like", requireAuth, postController.like);

export default router;



