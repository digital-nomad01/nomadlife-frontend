import { Wifi, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageCarousel from "./image-carousel"
import { Destination } from "@/types/destination"

interface DestinationCardProps {
  destination: Destination
  className?: string
}

export default function DestinationCard({ destination, className = "" }: DestinationCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group py-0 ${className}`}>
      <div className="relative aspect-[4/5] bg-gray-200">
        <ImageCarousel 
          images={destination.images} 
          alt={destination.location} 
          className="w-full h-full" 
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Right - WiFi Speed */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <Wifi className="h-4 w-4 text-white" />
          <span className="text-white text-sm font-medium">{destination.wifi}</span>
          <span className="text-white/80 text-xs">Mbps</span>
        </div>

        {/* Top Left - Rating */}
        <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{destination.rating}</span>
        </div>

        {/* Heart Icon */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-4 right-16 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-8 w-8 p-0"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="mb-3">
            <h3 className="text-xl font-bold mb-1">{destination.location}</h3>
            <p className="text-white/90 text-sm">{destination.country}</p>
            <p className="text-white/70 text-xs mt-1">{destination.type}</p>
          </div>

          {/* Bottom Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Temperature */}
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center">
                  <span className="text-xs">☀</span>
                </div>
                <span className="text-sm font-medium">{destination.temperature}</span>
              </div>

              {/* AQI */}
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
                  <span className="text-xs">🍃</span>
                </div>
                <span className="text-sm font-medium">{destination.aqi}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-lg font-bold">${destination.price} / mo</div>
              <div className="text-xs text-white/80">FOR A NOMAD</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
