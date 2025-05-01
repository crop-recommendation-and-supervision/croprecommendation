import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Droplets, Sun, Thermometer, Wind } from "lucide-react"

export default function WeatherWidget() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Weather</CardTitle>
        <CardDescription>Current conditions in your area</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Sun className="h-10 w-10 text-yellow-500 mr-3" />
            <div>
              <p className="text-2xl font-bold">24°C</p>
              <p className="text-sm text-gray-500">Sunny</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Farmville</p>
            <p className="text-xs text-gray-500">Monday, 10:30 AM</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-2">
              <Droplets className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="text-sm font-medium">65%</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full mr-2">
              <Wind className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Wind</p>
              <p className="text-sm font-medium">8 km/h</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-2">
              <Cloud className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Precipitation</p>
              <p className="text-sm font-medium">10%</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-2">
              <Thermometer className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Feels like</p>
              <p className="text-sm font-medium">26°C</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

