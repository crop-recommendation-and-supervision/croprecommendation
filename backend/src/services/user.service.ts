import User from "../models/user.model"
import { ApiError } from "../utils/error-handler"
import { generateToken } from "../utils/generate-token"

/**
 * User service with business logic for user operations
 */
export class UserService {
  /**
   * Register a new user
   */
  async registerUser(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    organization: string
    position: string
  }) {
    const { email } = userData

    // Check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      throw new ApiError(400, "User already exists")
    }

    // Create new user
    const user = await User.create(userData)

    if (user) {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        organization: user.organization,
        position: user.position,
        isAdmin: user.isAdmin,
        isApproved: user.isApproved,
        token: generateToken(user._id.toString()),
      }
    } else {
      throw new ApiError(400, "Invalid user data")
    }
  }

  /**
   * Authenticate user and get token
   */
  async loginUser(email: string, password: string) {
    // Find user by email
    const user = await User.findOne({ email })

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // Update last login time
      user.lastLogin = new Date()
      await user.save()

      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        organization: user.organization,
        position: user.position,
        isAdmin: user.isAdmin,
        isApproved: user.isApproved,
        token: generateToken(user._id.toString()),
      }
    } else {
      throw new ApiError(401, "Invalid email or password")
    }
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string) {
    const user = await User.findById(userId).select("-password")

    if (user) {
      return user
    } else {
      throw new ApiError(404, "User not found")
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updateData: any) {
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    // Update user fields
    user.firstName = updateData.firstName || user.firstName
    user.lastName = updateData.lastName || user.lastName
    user.email = updateData.email || user.email
    user.organization = updateData.organization || user.organization
    user.position = updateData.position || user.position
    user.bio = updateData.bio || user.bio
    user.website = updateData.website || user.website
    user.phone = updateData.phone || user.phone
    user.address = updateData.address || user.address
    user.researchInterests = updateData.researchInterests || user.researchInterests
    user.profileImage = updateData.profileImage || user.profileImage

    // Update password if provided
    if (updateData.password) {
      user.password = updateData.password
    }

    const updatedUser = await user.save()

    return {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      organization: updatedUser.organization,
      position: updatedUser.position,
      isAdmin: updatedUser.isAdmin,
      isApproved: updatedUser.isApproved,
      bio: updatedUser.bio,
      website: updatedUser.website,
      phone: updatedUser.phone,
      address: updatedUser.address,
      researchInterests: updatedUser.researchInterests,
      profileImage: updatedUser.profileImage,
      token: generateToken(updatedUser._id.toString()),
    }
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers() {
    return await User.find({}).select("-password")
  }

  /**
   * Delete user (admin only)
   */
  async deleteUser(userId: string) {
    const user = await User.findById(userId)

    if (user) {
      await user.deleteOne()
      return { message: "User removed" }
    } else {
      throw new ApiError(404, "User not found")
    }
  }

  /**
   * Get user by ID (admin only)
   */
  async getUserById(userId: string) {
    const user = await User.findById(userId).select("-password")

    if (user) {
      return user
    } else {
      throw new ApiError(404, "User not found")
    }
  }

  /**
   * Update user (admin only)
   */
  async updateUser(userId: string, updateData: any) {
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    // Update user fields
    user.firstName = updateData.firstName || user.firstName
    user.lastName = updateData.lastName || user.lastName
    user.email = updateData.email || user.email
    user.organization = updateData.organization || user.organization
    user.position = updateData.position || user.position
    user.isAdmin = updateData.isAdmin !== undefined ? updateData.isAdmin : user.isAdmin
    user.isApproved = updateData.isApproved !== undefined ? updateData.isApproved : user.isApproved

    const updatedUser = await user.save()

    return {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      organization: updatedUser.organization,
      position: updatedUser.position,
      isAdmin: updatedUser.isAdmin,
      isApproved: updatedUser.isApproved,
    }
  }

  /**
   * Approve user (admin only)
   */
  async approveUser(userId: string) {
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    user.isApproved = true
    const updatedUser = await user.save()

    return {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isApproved: updatedUser.isApproved,
    }
  }
}

// Export singleton instance
export const userService = new UserService()
