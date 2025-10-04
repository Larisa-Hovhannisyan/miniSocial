import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "1234";

export interface AuthRequest extends Request {
  user?: any;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.locals.user = null;
    return res.redirect("/auth/login");
  }
  try {
    const payload = jwt.verify(token, SECRET);
    res.locals.user = payload;
    req.user = payload as any;
    next();
  } catch (err) {
    res.locals.user = null;
    return res.redirect("/auth/login");
  }
}

export function maybeAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.locals.user = null;
    return next();
  }
  try {
    const payload = jwt.verify(token, SECRET);
    res.locals.user = payload;
  } catch {
    res.locals.user = null;
  }
  next();
}
