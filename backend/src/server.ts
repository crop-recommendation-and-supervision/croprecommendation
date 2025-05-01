import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { connectDB } from "./config/db"
import { notFound, errorHandler } from "./utils/error-handler"
import { logger } from "./utils/logger"
import { apiLimiter } from "./middleware/rate-limit.middleware"
import userRoutes from "./routes/user.routes"
import dashboardRoutes from "./routes/dashboard.routes"
import learningRoutes from "./routes/learning.routes"






// Load environment variables
dotenv.config()

// Connect to database
connectDB()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet()) // Security headers
app.use(morgan("dev")) // HTTP request logger

// Rate limiting
app.use("/api", apiLimiter)

// Routes
app.use("/api", dashboardRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", dashboardRoutes) 
app.use("/api/users", userRoutes)
app.use("/api/learning", learningRoutes)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`)
  // Close server & exit process
  process.exit(1)
})
