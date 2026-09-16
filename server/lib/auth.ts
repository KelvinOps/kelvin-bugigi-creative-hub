// server/lib/auth.ts
//


import * as dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is not set in .env. Generate one with: openssl rand -hex 32"
  );
}

const TOKEN_TTL = "8h";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userEmail?: string;
  userRole?: string;
}

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function signToken(user: { id: string; email: string; role: string }): string {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET as string,
    { expiresIn: TOKEN_TTL }
  );
}

export function verifyJwt(token: string): { sub: string; email: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET as string) as any;
  } catch {
    return null;
  }
}

export async function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized — no token provided" });
    return;
  }

  const payload = verifyJwt(token);
  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || user.role !== "ADMIN") {
      res.status(403).json({ error: "Forbidden — admin access required" });
      return;
    }
    req.userId = user.id;
    req.userEmail = user.email;
    req.userRole = user.role;
    next();
  } catch (err) {
    console.error("[requireAdmin] error:", err);
    res.status(500).json({ error: "Authentication check failed" });
  }
}