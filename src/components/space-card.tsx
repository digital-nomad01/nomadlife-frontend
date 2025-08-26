'use client'
import Link from "next/link"
import { Heart, Wifi } from "lucide-react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import ImageCarousel from "./image-carousel"
import { Space } from "@/types/space"
import { getAmenityConfig } from "@/config/amenities"

interface SpaceCardProps {
  space: Space
  className?: string
}

function getImageUrl(imagePath?: string): string {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/spaces/${imagePath}`
}

function formatSpaceType(type: string): string {
  switch (type) {
    case 'coworking_space':
      return 'Coworking Space'
    case 'coworking_cafe':
      return 'Coworking Café'
    case 'coliving_space':
      return 'Coliving Space'
    default:
      return type
  }
}

export default function SpaceCard({ space, className }: SpaceCardProps) {
  // Prepare images for carousel
  const images = []
  if (space.image) {
    images.push(getImageUrl(space.image))
  }
  if (space.images && space.images.length > 0) {
    images.push(...space.images.map(img => getImageUrl(img.path)))
  }

  // Map amenities to their configs
  const amenityConfigs = space.amenities?.slice(0, 2).map(amenityName => 
    getAmenityConfig(amenityName)
  ).filter(Boolean) || []

  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group py-0 ${className}`}>
      <Link href={`/space/${space.id}`}>
        <div className="relative aspect-[4/5] bg-gray-200">
          <ImageCarousel
            images={images}
            alt={space.name}
            className="w-full h-full"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* WiFi Speed Badge */}
          {space.wifi_speed_mbps && (
            <div className="absolute bottom-4 left-2 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 z-10">
              <Wifi className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">{space.wifi_speed_mbps}</span>
              <span className="text-white/80 text-xs">Mbps</span>
            </div>
          )}

          {/* Rating Badge */}
          {/* {space.average_rating && space.average_rating > 0 && (
            <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 z-10">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">{space.average_rating.toFixed(1)}</span>
            </div>
          )} */}

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute bottom-16 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-8 w-8 p-0 z-10"
            onClick={(e) => {
              e.preventDefault()
              // Handle favorite logic here
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Space Information */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
            <div className="mb-3">
              <h3 className="text-lg font-bold mb-1">{space.name}</h3>
              <p className="text-white/90 text-sm">{space.location}</p>
              <p className="text-white/70 text-xs mt-1">{formatSpaceType(space.space_type)}</p>
            </div>

            {/* Enhanced Features with Icons */}
            <div className="flex flex-wrap gap-1 mb-3">
              {amenityConfigs.slice(0, 2).map((amenity, index) => {
                const IconComponent = amenity?.icon
                return (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-white/20 text-white border-white/30 flex items-center gap-1"
                  >
                    {IconComponent && <IconComponent className="h-3 w-3" />}
                    {amenity?.label}
                  </Badge>
                )
              })}
              {!space.allow_booking && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-red-500/20 text-white border-red-300/30"
                >
                  Contact Only
                </Badge>
              )}
            </div>

            <div className="text-right">
              <div className="text-lg font-bold">
                {space.price_from ? `$${space.price_from} / day` : 'Contact for pricing'}
              </div>
              <div className="text-xs text-white/80">Starting from</div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
