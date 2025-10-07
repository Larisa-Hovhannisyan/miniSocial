import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";


const SECRET: string = process.env.JWT_SECRET || "1111";

export default {
  showRegister(req: Request, res: Response): void {
    const data: { message: string | null } = { message: null };
    res.render("register", data);
  },

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password }: { username?: string; password?: string } = req.body;
      if (!username || !password) {
        res.render("register", { message: "Fill fields" });
        return;
      }
      const existing = await User.findOne({ username });
      if (existing) {
        res.render("register", { message: "Username taken" });
        return;
      }
      const hashed: string = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashed });
      const token: string = jwt.sign({ id: user._id, username: user.username }, SECRET);
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/posts/feed");
    } catch (err) {
      console.error(err);
      res.render("register", { message: "Error creating user" });
    }
  },

  showLogin(req: Request, res: Response): void {
    const data: { message: string | null } = { message: null };
    res.render("login", data);
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password }: { username?: string; password?: string } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        res.render("login", { message: "Invalid credentials" });
        return;
      }
      const ok: boolean = await bcrypt.compare(password || "", user.password);
      if (!ok) {
        res.render("login", { message: "Invalid credentials" });
        return;
      }
      const token: string = jwt.sign({ id: user._id, username: user.username }, SECRET);
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/posts/feed");
    } catch (err) {
      console.error(err);
      res.render("login", { message: "Login error" });
    }
  },

  logout(req: Request, res: Response): void {
    res.clearCookie("token");
    res.redirect("/");
  }
};
