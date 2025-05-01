"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AccountStatusPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [reason, setReason] = useState<string>("")

  useEffect(() => {
    const statusParam = searchParams.get("status")
    const emailParam = searchParams.get("email")
    const reasonParam = searchParams.get("reason")

    if (statusParam) {
      setStatus(statusParam)
    }

    if (emailParam) {
      setEmail(emailParam)
    }

    if (reasonParam) {
      setReason(reasonParam)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="container px-4 md:px-6 max-w-md">
          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                {status === "pending" ? (
                  <Clock className="h-16 w-16 text-amber-500" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-red-500" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-green-800">
                {status === "pending" ? "Account Pending Approval" : "Account Rejected"}
              </CardTitle>
              <CardDescription>
                {status === "pending"
                  ? "Your account is waiting for administrator approval."
                  : "Your account application has been rejected."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className={`p-4 ${status === "pending" ? "bg-amber-50" : "bg-red-50"} rounded-lg`}>
                <p className="text-sm text-gray-600">
                  Email: <span className="font-medium">{email}</span>
                </p>
                {status === "pending" ? (
                  <p className="text-sm text-gray-600 mt-2">
                    You'll receive an email notification once your account has been approved.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mt-2">
                    Reason: <span className="font-medium">{reason}</span>
                  </p>
                )}
              </div>

              {status === "pending" ? (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">What happens next?</h3>
                  <ol className="text-sm text-gray-600 space-y-2 text-left list-decimal pl-5">
                    <li>An administrator will review your registration details</li>
                    <li>Once approved, you'll receive an email notification</li>
                    <li>You can then sign in to access the platform</li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">What can you do?</h3>
                  <ul className="text-sm text-gray-600 space-y-2 text-left list-disc pl-5">
                    <li>Contact our support team for more information</li>
                    <li>Submit a new application with updated information</li>
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/signin">Return to Sign In</Link>
              </Button>
              {status === "rejected" && (
                <Button asChild className="w-full bg-green-700 hover:bg-green-800">
                  <Link href="/auth/signup">Create New Account</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
