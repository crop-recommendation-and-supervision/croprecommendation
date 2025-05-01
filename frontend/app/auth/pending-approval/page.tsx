"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PendingApprovalPage() {
  const [email, setEmail] = useState<string>("")
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    // Get email and user ID from session storage
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("pendingApprovalEmail")
      const storedUserId = sessionStorage.getItem("pendingApprovalUserId")

      if (storedEmail) {
        setEmail(storedEmail)
      }

      if (storedUserId) {
        setUserId(storedUserId)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="container px-4 md:px-6 max-w-md">
          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-800">Registration Successful</CardTitle>
              <CardDescription>
                Your account has been created and is pending approval from an administrator.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  We've received your registration for <span className="font-medium text-green-800">{email}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  You'll receive an email notification once your account has been approved.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">What happens next?</h3>
                <ol className="text-sm text-gray-600 space-y-2 text-left list-decimal pl-5">
                  <li>An administrator will review your registration details</li>
                  <li>Once approved, you'll receive an email notification</li>
                  <li>You can then sign in to access the platform</li>
                </ol>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/signin">Return to Sign In</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
