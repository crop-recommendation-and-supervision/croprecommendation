import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen } from "lucide-react"

const learningTips = [
  {
    id: 1,
    title: "Understanding Nitrogen-Phosphorus-Potassium (NPK) Ratios",
    content:
      "NPK ratios indicate the proportion of nitrogen, phosphorus, and potassium in fertilizers. Nitrogen promotes leaf growth, phosphorus supports root and flower development, and potassium enhances overall plant health and disease resistance.",
    category: "Soil Nutrition",
  },
  {
    id: 2,
    title: "Optimal pH Levels for Common Crops",
    content:
      "Most crops thrive in soil with a pH between 6.0 and 7.0. Rice prefers slightly acidic soil (5.5-6.5), while maize grows best in soil with a pH of 6.0-7.0. Regular soil testing helps maintain optimal pH levels for your specific crops.",
    category: "Soil Chemistry",
  },
  {
    id: 3,
    title: "Water Management Techniques for Drought Conditions",
    content:
      "During drought, implement drip irrigation, mulching, and water harvesting. Schedule watering during early morning or evening to minimize evaporation. Consider drought-resistant crop varieties and maintain soil organic matter to improve water retention.",
    category: "Water Management",
  },
]

export default function LearningTipsWidget() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {learningTips.map((tip) => (
        <Card key={tip.id} className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-800">{tip.category}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-4">{tip.content}</p>
            <Link
              href={`/dashboard/learning/${tip.id}`}
              className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center"
            >
              Learn more <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

