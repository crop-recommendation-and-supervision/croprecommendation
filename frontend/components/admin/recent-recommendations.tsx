import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

const recentRecommendations = [
  {
    id: 1,
    user: "Emily Johnson",
    email: "emily.johnson@example.com",
    date: "2023-06-15T10:30:00Z",
    crop: "Rice",
    inputs: {
      nitrogen: 90,
      phosphorus: 42,
      potassium: 43,
      temperature: 20.9,
      humidity: 82.0,
      ph: 6.5,
      rainfall: 202.9,
    },
  },
  {
    id: 2,
    user: "Michael Chen",
    email: "michael.chen@example.com",
    date: "2023-06-14T14:45:00Z",
    crop: "Maize",
    inputs: {
      nitrogen: 61,
      phosphorus: 44,
      potassium: 17,
      temperature: 26.1,
      humidity: 71.6,
      ph: 6.9,
      rainfall: 102.3,
    },
  },
  {
    id: 3,
    user: "Sarah Williams",
    email: "sarah.williams@example.com",
    date: "2023-06-14T09:15:00Z",
    crop: "Cotton",
    inputs: {
      nitrogen: 133,
      phosphorus: 47,
      potassium: 24,
      temperature: 24.4,
      humidity: 79.2,
      ph: 7.2,
      rainfall: 90.8,
    },
  },
  {
    id: 4,
    user: "David Rodriguez",
    email: "david.rodriguez@example.com",
    date: "2023-06-13T16:20:00Z",
    crop: "Chickpea",
    inputs: {
      nitrogen: 40,
      phosphorus: 72,
      potassium: 77,
      temperature: 17.0,
      humidity: 17.0,
      ph: 7.5,
      rainfall: 88.6,
    },
  },
]

export default function RecentRecommendations() {
  return (
    <div className="space-y-4">
      {recentRecommendations.map((rec) => (
        <Card key={rec.id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-1">
                  <h3 className="text-lg font-semibold mr-2">{rec.user}</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {rec.crop}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{rec.email}</p>
                <p className="text-xs text-gray-500 mt-1">Requested: {new Date(rec.date).toLocaleString()}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    N: {rec.inputs.nitrogen}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    P: {rec.inputs.phosphorus}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    K: {rec.inputs.potassium}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Temp: {rec.inputs.temperature}°C
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Humidity: {rec.inputs.humidity}%
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    pH: {rec.inputs.ph}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Rainfall: {rec.inputs.rainfall}mm
                  </Badge>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

