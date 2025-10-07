import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET: string = process.env.JWT_SECRET || "1234";

export interface AuthPayload {
  id: string;
  username: string;
  [key: string]: any;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token: string | undefined = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.locals.user = null;
    res.redirect("/auth/login");
    return;
  }
  try {
    const payload = jwt.verify(token, SECRET) as AuthPayload;
    res.locals.user = payload;
    req.user = payload;
    next();
  } catch (err) {
    res.locals.user = null;
    res.redirect("/auth/login");
  }
}

export function maybeAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token: string | undefined = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.locals.user = null;
    next();
    return;
  }
  try {
    const payload = jwt.verify(token, SECRET) as AuthPayload;
    res.locals.user = payload;
  } catch {
    res.locals.user = null;
  }
  next();
}
