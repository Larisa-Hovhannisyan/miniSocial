import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const SECRET = process.env.JWT_SECRET || "1111";

export default {
  showRegister(req: Request, res: Response) {
    res.render("register", { message: null });
  },

  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.render("register", { message: "Fill fields" });
      const existing = await User.findOne({ username });
      if (existing) return res.render("register", { message: "Username taken" });
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashed });
      const token = jwt.sign({ id: user._id, username: user.username }, SECRET);
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/posts/feed");
    } catch (err) {
      console.error(err);
      res.render("register", { message: "Error creating user" });
    }
  },

  showLogin(req: Request, res: Response) {
    res.render("login", { message: null });
  },

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.render("login", { message: "Invalid credentials" });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.render("login", { message: "Invalid credentials" });
      const token = jwt.sign({ id: user._id, username: user.username }, SECRET);
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/posts/feed");
    } catch (err) {
      console.error(err);
      res.render("login", { message: "Login error" });
    }
  },

  logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.redirect("/");
  }
};
