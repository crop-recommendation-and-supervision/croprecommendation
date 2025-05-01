import express from "express"
import { userController,rejectUser} from "../controllers/user.controller"
import { protect, admin } from "../middleware/auth.middleware"
import { authLimiter } from "../middleware/rate-limit.middleware"
import { body } from "express-validator"
import { validate } from "../middleware/validation.middleware"



const router = express.Router()

// Registration validation rules
const registerValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("organization").notEmpty().withMessage("Organization is required"),
  body("position").notEmpty().withMessage("Position is required"),
]

// Login validation rules
const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]


// Public routes
router.post("/register", validate(registerValidation), userController.registerUser)
router.post("/login", authLimiter, validate(loginValidation), userController.loginUser)


// Protected routes
router.route("/profile").get(protect, userController.getUserProfile).put(protect, userController.updateUserProfile)

// Modified: Remove authentication for getting all users
router.route("/").get(userController.getUsers)

// Admin routes (still protected)
router
  .route("/:id")
  .get(protect, admin, userController.getUserById)
  .put(protect, admin, userController.updateUser)
  .delete(protect, admin, userController.deleteUser)

router.put("/:id/approve", protect, admin, userController.approveUser)
router.put("/:id/reject", protect, admin, rejectUser)


export default router
