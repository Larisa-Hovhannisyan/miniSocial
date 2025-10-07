import { Request, Response } from "express";
import Post from "../models/Post";
import { AuthRequest } from "../middlewares/auth";

interface FeedRenderData {
  posts: any[];
  user: any | null;
}

interface PostFormRenderData {
  message: string | null;
}

export default {
  async feed(req: Request, res: Response): Promise<void> {
    const posts: any[] = await Post.find()
      .populate("author")
      .sort({ createdAt: -1 })
      .lean();
    const data: FeedRenderData = { posts, user: res.locals.user || null };
    res.render("feed", data);
  },

  showCreate(req: Request, res: Response): void {
    const data: PostFormRenderData = { message: null };
    res.render("post_form", data);
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const authorId: string | null = (res.locals.user && res.locals.user.id) || null;
      if (!authorId) {
        res.redirect("/auth/login");
        return;
      }

      const { text }: { text?: string } = req.body;
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];

      const images: string[] =
        files && files.length > 0
          ? files.map((file) => `/uploads/${file.filename}`)
          : [];

      await Post.create({ author: authorId, text, images });
      res.redirect("/posts/feed");
    } catch (err) {
      console.error(err);
      const data: PostFormRenderData = { message: "Error creating post" };
      res.render("post_form", data);
    }
  },

  async like(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        res.redirect("/posts/feed");
        return;
      }
      post.likes += 1;
      await post.save();
      res.redirect("/posts/feed");
    } catch (err) {
      console.error(err);
      res.redirect("/posts/feed");
    }
  }
};

