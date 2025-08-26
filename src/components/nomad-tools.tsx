import { MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface NomadToolsProps {
  className?: string
}

interface ToolFeature {
  title: string
  description: string
}

const toolFeatures: ToolFeature[] = [
  {
    title: "Nomad Pass",
    description: "Monthly bundle deals for coworking + co-living"
  },
  {
    title: "Community Reviews",
    description: "Real feedback from fellow nomads"
  },
  {
    title: "Safety Ratings",
    description: "Local safety info and regulations"
  }
]

export default function NomadTools({ className = "" }: NomadToolsProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Nomad Tools & Features</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interactive Map Card */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Nomad Map</h3>
            <p className="text-gray-600 mb-6">
              Discover nomad-friendly zones, visa requirements, and community hotspots worldwide.
            </p>
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-gray-400" />
            </div>
            <Button className="w-full">Explore Map</Button>
          </Card>

          {/* Feature Cards */}
          <div className="space-y-6">
            {toolFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
