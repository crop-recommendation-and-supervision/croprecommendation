"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    position: "",
    terms: false,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Effect to redirect after successful signup
  useEffect(() => {
    let redirectTimer: NodeJS.Timeout

    if (success) {
      redirectTimer = setTimeout(() => {
        router.push("/pending-approval")
      }, 3000) // Redirect after 3 seconds
    }

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer)
    }
  }, [success, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Clear error for this field when user starts typing
    if (formErrors[id]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, position: value }))
    if (formErrors.position) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.position
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }))
    if (formErrors.terms) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.terms
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.firstName.trim()) errors.firstName = "First name is required"
    if (!formData.lastName.trim()) errors.lastName = "Last name is required"

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (!formData.password) {
      errors.password = "Password is required"
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (!formData.organization.trim()) errors.organization = "Organization is required"
    if (!formData.position) errors.position = "Position is required"
    if (!formData.terms) errors.terms = "You must agree to the terms"

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset states
    setError(null)
    setSuccess(null)

    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsLoading(true)

    try {
      // Prepare data for API
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        organization: formData.organization,
        position: formData.position,
      }

      // Call the API
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle API validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const apiErrors: Record<string, string> = {}
          data.errors.forEach((err: any) => {
            apiErrors[err.param] = err.msg
          })
          setFormErrors(apiErrors)
          throw new Error(data.errors[0]?.msg || "Registration failed")
        }
        throw new Error(data.message || "Registration failed")
      }

      // Set success message
      setSuccess("Your account has been created successfully! Redirecting to pending approval page...")

      // Store user info for pending approval page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pendingApprovalEmail", formData.email)
        sessionStorage.setItem("pendingApprovalUserId", data._id || data.id || "pending")
      }

      // Toast notification will show
      toast({
        title: "Account created",
        description: "Your account has been created and is pending approval.",
        duration: 5000,
      })

      // Redirect happens via useEffect after delay
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Form */}
            <Card className="border-gray-200 shadow-lg">
              <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-green-800">Create an Account</CardTitle>
                  <CardDescription>
                    Sign up to access our crop recommendation system and agricultural resources.
                    <span className="block mt-1 font-medium text-amber-600">
                      Note: Your account will require admin approval before you can log in.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {success && (
                    <Alert className="bg-green-50 border-green-200 text-green-800">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={formErrors.firstName ? "border-red-500" : ""}
                        disabled={!!success}
                      />
                      {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={formErrors.lastName ? "border-red-500" : ""}
                        disabled={!!success}
                      />
                      {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={formErrors.email ? "border-red-500" : ""}
                      disabled={!!success}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className={formErrors.password ? "border-red-500 pr-10" : "pr-10"}
                        disabled={!!success}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                        disabled={!!success}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={formErrors.confirmPassword ? "border-red-500" : ""}
                      disabled={!!success}
                    />
                    {formErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      placeholder="University or Research Institute"
                      value={formData.organization}
                      onChange={handleChange}
                      className={formErrors.organization ? "border-red-500" : ""}
                      disabled={!!success}
                    />
                    {formErrors.organization && <p className="text-red-500 text-xs mt-1">{formErrors.organization}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select onValueChange={handleSelectChange} value={formData.position} disabled={!!success}>
                      <SelectTrigger id="position" className={formErrors.position ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select your position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="researcher">Agricultural Researcher</SelectItem>
                        <SelectItem value="farmer">Farmer</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="educator">Educator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.position && <p className="text-red-500 text-xs mt-1">{formErrors.position}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={handleCheckboxChange}
                      className={formErrors.terms ? "border-red-500" : ""}
                      disabled={!!success}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="#" className="text-green-600 hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-green-600 hover:underline">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                  {formErrors.terms && <p className="text-red-500 text-xs">{formErrors.terms}</p>}
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-green-700 hover:bg-green-800"
                    disabled={isLoading || !!success}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing Up...
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Account Created
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            {/* Right Column - Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">Join Our Agricultural Research Community</h2>
                <p className="text-gray-600 mb-6">
                  By signing up, you'll gain access to our advanced crop recommendation system and become part of a
                  growing community of agricultural researchers and professionals.
                </p>

                <div className="space-y-4">
                  <BenefitItem
                    title="AI-Powered Crop Recommendations"
                    description="Get personalized crop suggestions based on soil composition, climate conditions, and other factors."
                  />

                  <BenefitItem
                    title="Data Analysis Tools"
                    description="Upload and analyze your agricultural data with our powerful research tools."
                  />

                  <BenefitItem
                    title="Educational Resources"
                    description="Access a wealth of learning materials and best practices for sustainable agriculture."
                  />

                  <BenefitItem
                    title="Research Community"
                    description="Connect with other agricultural professionals and researchers."
                  />
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-green-800 mb-2">Already have an account?</h3>
                <p className="text-gray-600 mb-4">
                  Sign in to access your dashboard and continue your agricultural research.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function BenefitItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0 mt-1">
        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-green-600"></div>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-green-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
