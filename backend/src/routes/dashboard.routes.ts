// backend/src/routes/dashboard.routes.ts
import express from "express"
import { getDashboardStats, getPendingUsers } from "../controllers/dashboard.controller"
import { approveUser, rejectUser } from "../controllers/user.controller"

const router = express.Router()
router.get("/dashboard-stats", getDashboardStats)
router.get("/pending-users", getPendingUsers)

router.put("/:id/approve", approveUser)
router.put("/:id/reject", rejectUser)


export default router
