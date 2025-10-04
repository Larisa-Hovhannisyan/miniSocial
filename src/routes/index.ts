import { Router } from "express";
import { maybeAuth } from "../middlewares/auth";

const router = Router();

router.get("/", maybeAuth, (req, res) => {
  res.render("index", { user: res.locals.user || null, message: null });
});

export default router;
