import { Card } from "@/components/ui/card"
import DestinationCard from "./destination-card"
import { destinations } from "@/data/destinations"

interface ExploreNearbyProps {
  className?: string
}

const stats = [
  { value: "247", label: "Coworking Spaces" },
  { value: "89", label: "Co-living Options" },
  { value: "156", label: "Nomad-friendly Cafés" },
]

export default function ExploreNearby({ className = "" }: ExploreNearbyProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Nearby</h2>

        {/* Featured Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-coral-500 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
