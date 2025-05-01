"use client"
import { useState, useEffect } from "react"
import { fetchDashboardStats } from "@/lib/fetch-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Users, FileText, ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import AdminWeatherWidget from "@/components/admin/weather-widget"
import PendingApprovals from "@/components/admin/pending-approvals"
import RecentRecommendations from "@/components/admin/recent-recommendations"



export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, pendingApprovals: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/dashboard-stats") 
        const data = await res.json()
        console.log("Dashboard stats:", data)

        setStats(data)
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err)
      }
    }

    fetchStats()
  }, [])
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor system activity and manage users.</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Link href="/admin/blog/new">
            <Button variant="outline">New Blog Post</Button>
          </Link>
          <Link href="/admin/learning/new">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Add Learning Tip</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Blog Posts</p>
                <p className="text-2xl font-bold text-gray-900">36</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Recommendations</p>
                <p className="text-2xl font-bold text-gray-900">1,254</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AdminWeatherWidget />

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">System Status</CardTitle>
            <CardDescription>Current system performance and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">ML Model Status</span>
                </div>
                <div className="text-sm font-semibold text-green-600">Operational</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Database Status</span>
                </div>
                <div className="text-sm font-semibold text-green-600">Operational</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">API Status</span>
                </div>
                <div className="text-sm font-semibold text-green-600">Operational</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium">Weather API</span>
                </div>
                <div className="text-sm font-semibold text-yellow-600">Degraded Performance</div>
              </div>

              <Link
                href="/admin/system"
                className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center"
              >
                View detailed system status <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="approvals" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="approvals" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Pending Approvals
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Recent Recommendations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="approvals">
          <PendingApprovals />
        </TabsContent>
        <TabsContent value="recommendations">
          <RecentRecommendations />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-green-600" />
            System Analytics
          </CardTitle>
          <CardDescription>Usage statistics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <img
              src="/placeholder.svg?height=320&width=800"
              alt="System analytics chart"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

