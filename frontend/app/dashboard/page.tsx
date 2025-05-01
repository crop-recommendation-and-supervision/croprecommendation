import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Droplets, Leaf, Thermometer, Wind, ArrowRight, FileText, BookOpen } from "lucide-react"
import WeatherWidget from "@/components/dashboard/weather-widget"
import RecentBlogPosts from "@/components/dashboard/recent-blog-posts"
import LearningTipsWidget from "@/components/dashboard/learning-tips-widget"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John</h1>
          <p className="text-gray-600">Here's what's happening with your crops today.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/dashboard/crop-recommendation">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              New Crop Recommendation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <WeatherWidget />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Soil Health</CardTitle>
            <CardDescription>Current soil conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Nitrogen (N)</span>
                </div>
                <div className="text-sm font-semibold">65 kg/ha</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Droplets className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Phosphorus (P)</span>
                </div>
                <div className="text-sm font-semibold">42 kg/ha</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Thermometer className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">Potassium (K)</span>
                </div>
                <div className="text-sm font-semibold">38 kg/ha</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Wind className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium">pH Level</span>
                </div>
                <div className="text-sm font-semibold">6.5</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            <CardDescription>Your latest crop recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-3 py-1">
                <p className="text-sm font-medium">Rice Recommendation</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="text-sm font-medium">Maize Analysis</p>
                <p className="text-xs text-gray-500">5 days ago</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-3 py-1">
                <p className="text-sm font-medium">Soil Sample #1082</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>

              <Link
                href="/dashboard/history"
                className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center"
              >
                View all activity <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="blog" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="blog" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Recent Blog Posts
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Learning Tips
          </TabsTrigger>
        </TabsList>
        <TabsContent value="blog">
          <RecentBlogPosts />
        </TabsContent>
        <TabsContent value="learning">
          <LearningTipsWidget />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-green-600" />
            Crop Yield Forecast
          </CardTitle>
          <CardDescription>Predicted yields based on current conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <img
              src="/placeholder.svg?height=320&width=800"
              alt="Crop yield forecast chart"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

