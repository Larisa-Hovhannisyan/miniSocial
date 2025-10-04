import { Request, Response } from "express";
import Post from "../models/Post";
import { AuthRequest } from "../middlewares/auth";

export default {
  async feed(req: Request, res: Response) {
    const posts = await Post.find()
      .populate("author")
      .sort({ createdAt: -1 })
      .lean();
    res.render("feed", { posts, user: res.locals.user || null });
  },

  showCreate(req: Request, res: Response) {
    res.render("post_form", { message: null });
  },

  async create(req: AuthRequest, res: Response) {
    try {
      const authorId = (res.locals.user && res.locals.user.id) || null;
      if (!authorId) return res.redirect("/auth/login");

      const { text } = req.body;
      const files = req.files as Express.Multer.File[];

      const images =
        files && files.length > 0
          ? files.map((file) => `/uploads/${file.filename}`)
          : [];

      await Post.create({ author: authorId, text, images });
      res.redirect("/posts/feed");
    } catch (err) {
      console.error(err);
      res.render("post_form", { message: "Error creating post" });
    }
  },

  async like(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) return res.redirect("/posts/feed");
      post.likes += 1;
      await post.save();
      res.redirect("/posts/feed");
    } catch (err) {
      console.error(err);
      res.redirect("/posts/feed");
    }
  }
};

