"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

export default function SigninPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Check if the error is due to account status
        if (data.status === "rejected") {
          // Redirect to the account-status page with rejection reason
          const reason = data.rejectionReason || "Your application did not meet our requirements."
          router.push(
            `/auth/account-status?status=rejected&reason=${encodeURIComponent(reason)}&email=${encodeURIComponent(formData.email)}`,
          )
          return
        }

        throw new Error(data.message || "Login failed")
      }

      // Store user data and token
      if (formData.rememberMe) {
        localStorage.setItem("userToken", data.token)
        localStorage.setItem(
          "userData",
          JSON.stringify({
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            isAdmin: data.isAdmin,
            isApproved: data.isApproved,
          }),
        )
      } else {
        // For session storage (clears when browser is closed)
        sessionStorage.setItem("userToken", data.token)
        sessionStorage.setItem(
          "userData",
          JSON.stringify({
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            isAdmin: data.isAdmin,
            isApproved: data.isApproved,
          }),
        )
      }

      // Check if user is approved
      if (data.isApproved === false) {
        // Check if the account is rejected
        if (data.rejectionReason) {
          // Redirect to the account-status page with rejection reason
          router.push(
            `/auth/account-status?status=rejected&reason=${encodeURIComponent(data.rejectionReason)}&email=${encodeURIComponent(formData.email)}`,
          )
        } else {
          // Account is pending approval
          toast({
            title: "Account pending approval",
            description: "Your account is still pending admin approval.",
            variant: "destructive",
          })
          router.push("/auth/account-status?status=pending&email=" + encodeURIComponent(formData.email))
        }
        return
      }

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.firstName}!`,
      })

      // Redirect based on user role
      if (data.isAdmin) {
        router.push("/admin/users")
      } else {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please try again.")
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
                  <CardTitle className="text-2xl font-bold text-green-800">Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account and agricultural resources.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>

                    <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-green-600 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>

            {/* Right Column - Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">Welcome Back to AgriTech</h2>
                <p className="text-gray-600 mb-6">
                  Sign in to access our crop recommendation system and continue your agricultural research journey.
                </p>

                <div className="space-y-4">
                  <FeatureItem
                    title="Personalized Dashboard"
                    description="Access your customized dashboard with insights tailored to your agricultural needs."
                  />

                  <FeatureItem
                    title="Crop Analysis"
                    description="View detailed analysis of your crops and get AI-powered recommendations."
                  />

                  <FeatureItem
                    title="Research Tools"
                    description="Use our advanced tools to analyze soil composition and climate data."
                  />

                  <FeatureItem
                    title="Community Access"
                    description="Connect with other agricultural professionals and share insights."
                  />
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-green-800 mb-2">New to AgriTech?</h3>
                <p className="text-gray-600 mb-4">
                  Create an account to access our crop recommendation system and agricultural resources.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/auth/signup">Create Account</Link>
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

function FeatureItem({
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
