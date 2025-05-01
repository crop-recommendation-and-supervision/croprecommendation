import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/error-handler"
import User from "../models/user.model"

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

/**
 * Middleware to protect routes that require authentication
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader); // Debug

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Not authorized, no token"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new ApiError(401, "User not found"));
    }

    next();
  } catch (error) {
    next(new ApiError(401, "Not authorized, token failed"));
  }
};



/**
 * Middleware to check if user is an admin
 */
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    next(new ApiError(403, "Not authorized as an admin"))
  }
}

/**
 * Middleware to check if user is approved
 */
export const approved = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isApproved) {
    next()
  } else {
    next(new ApiError(403, "Your account is pending approval"))
  }
}
