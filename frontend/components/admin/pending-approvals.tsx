"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

type PendingUser = {
  _id: string
  name: string
  email: string
  organization: string
  role: string
  date: string
}

export default function PendingApprovals() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/pending-users")
        const data = await res.json()
        setPendingUsers(data)
      } catch (err) {
        console.error("Error fetching pending users:", err)
      }
    }

    fetchPendingUsers()
  }, [])

  const handleApprove = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTJhMjRmMjBjNWE0OWEyMWVkM2Q1NyIsImlhdCI6MTc0NjA1MTY2MywiZXhwIjoxNzQ4NjQzNjYzfQ.WxV-j_m35a59KG8zPf0xMnBjC5KxzCznZFZD65uMQlg`
        },
      })
  
      if (res.ok) {
        setPendingUsers((prev) => prev.filter((user) => user._id !== userId))
      } else {
        const errorData = await res.json()
        console.error("Failed to approve user:", res.status, errorData)
      }
    } catch (err) {
      console.error("Approve error:", err)
    }
  }
  
  
  const handleReject = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/reject`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTJhMjRmMjBjNWE0OWEyMWVkM2Q1NyIsImlhdCI6MTc0NjA1MTY2MywiZXhwIjoxNzQ4NjQzNjYzfQ.WxV-j_m35a59KG8zPf0xMnBjC5KxzCznZFZD65uMQlg`,
        },
      })
  
      if (res.ok) {
        setPendingUsers((prev) => prev.filter((user) => user._id !== userId))
      } else {
        console.error("Failed to reject user")
      }
    } catch (err) {
      console.error("Reject error:", err)
    }
  }
  
  
  

  return (
    <div className="space-y-4">
      {pendingUsers.map((user) => (
        <Card key={user._id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm mt-1">
                  <span className="text-gray-700">{user.organization}</span>
                  <span className="text-gray-700">{user.role}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Requested: {new Date(user.date).toLocaleString()}</p>
              </div>
              <div className="flex space-x-2">
              <Button
                 variant="outline"
                 size="sm"
                 className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                 onClick={() => handleReject(user._id)}
                  >
                 <XCircle className="h-4 w-4 mr-1" />
                  Reject
              </Button>

<Button
  size="sm"
  className="bg-green-600 hover:bg-green-700 text-white"
  onClick={() => handleApprove(user._id)}
>
  <CheckCircle className="h-4 w-4 mr-1" />
  Approve
</Button>

              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
