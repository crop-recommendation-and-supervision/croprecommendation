import jwt from "jsonwebtoken"

/**
 * Generate JWT token for authentication
 * @param {string} userId - User ID to include in token
 * @returns {string} - JWT token
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  })
}
