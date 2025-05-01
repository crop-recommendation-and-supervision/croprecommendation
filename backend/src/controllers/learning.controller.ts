import { Request, Response } from "express"
import Learning from "../models/learning.model"

export const createLearningTip = async (req: Request, res: Response) => {
  try {
    const { title, category, content } = req.body
    const newTip = new Learning({ title, category, content })
    await newTip.save()
    res.status(201).json(newTip)
  } catch (error) {
    res.status(500).json({ message: "Failed to create learning tip", error })
  }
}
