import { Request, Response } from "express"
import User from "../models/user.model"


export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments()
    const pendingApprovals = await User.countDocuments({ isApproved: false })

    res.status(200).json({
      totalUsers,
      pendingApprovals
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch dashboard stats" })
  }
}

export const getPendingUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isApproved: false }).select("-password")
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending users" })
  }
}





