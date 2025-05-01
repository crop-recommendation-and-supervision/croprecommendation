import express from "express"
import { createLearningTip } from "../controllers/learning.controller"

const router = express.Router()

router.post("/learning", createLearningTip)

export default router
