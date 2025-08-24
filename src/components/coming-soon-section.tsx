import { Plane } from "lucide-react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface ComingSoonSectionProps {
  cities: string[]
  className?: string
}

export default function ComingSoonSection({ cities, className = "" }: ComingSoonSectionProps) {
  const handleGetNotified = () => {
    // Handle notification signup logic here
    console.log("User wants to get notified about new cities")
  }

  return (
    <Card className={`p-8 text-center bg-gradient-to-r from-gray-50 to-blue-50 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        More Cities Coming Soon
      </h3>
      <p className="text-gray-600 mb-6">
        We&apos;re expanding across Nepal and beyond. Be the first to know when
        we launch in new destinations.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {cities.map((city) => (
          <Badge key={city} variant="outline" className="px-3 py-1">
            {city}
          </Badge>
        ))}
      </div>
      
      <Button variant="outline" onClick={handleGetNotified}>
        <Plane className="h-4 w-4 mr-2" />
        Get Notified
      </Button>
    </Card>
  )
}
