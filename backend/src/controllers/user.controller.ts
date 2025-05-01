import type { Request, Response, NextFunction } from "express"
import { userService } from "../services/user.service"
import User from "../models/user.model"

/**
 * User controller for handling HTTP requests
 */
export class UserController {
  /**
   * @desc    Register a new user
   * @route   POST /api/users
   * @access  Public
   */
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password, organization, position } = req.body
      const user = await userService.registerUser({
        firstName,
        lastName,
        email,
        password,
        organization,
        position,
      })

      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc    Auth user & get token
   * @route   POST /api/users/login
   * @access  Public
   */
  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await userService.loginUser(email, password)

      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc    Get user profile
   * @route   GET /api/users/profile
   * @access  Private
   */
  async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserProfile(req.user._id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc    Update user profile
   * @route   PUT /api/users/profile
   * @access  Private
   */
  async updateUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await userService.updateUserProfile(req.user._id, req.body)
      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc    Get all users
   * @route   GET /api/users
   * @access  Private/Admin
   */
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc    Delete user
   * @route   DELETE /api/users/:id
   * @access  Private/Admin
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.deleteUser(req.params.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc    Get user by ID
   * @route   GET /api/users/:id
   * @access  Private/Admin
   */
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req.params.id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc    Update user
   * @route   PUT /api/users/:id
   * @access  Private/Admin
   */
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body)
      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc    Approve user
   * @route   PUT /api/users/:id/approve
   * @access  Private/Admin
   */
  async approveUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.approveUser(req.params.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

// Export singleton instance
export const userController = new UserController()

export const approveUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ message: "User not found" })

  user.isApproved = true
  await user.save()
  res.status(200).json({ message: "User approved" })
}

export const rejectUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) return res.status(404).json({ message: "User not found" })

  res.status(200).json({ message: "User rejected and deleted" })
}

export const getPendingUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isApproved: false }).select("firstName lastName email organization position createdAt")
    const mapped = users.map(user => ({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      organization: user.organization,
      role: user.position,
      
    }))
    res.status(200).json(mapped)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending users" })
  }
}
