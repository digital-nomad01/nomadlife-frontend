'use client'
import Link from "next/link"
import { Heart, Star, Wifi } from "lucide-react"
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

export default function
 SpaceCard({ space, className }: SpaceCardProps) {
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
    <div className={`group cursor-pointer ${className}`}>
      <Link href={`/space/${space.id}`} className="block">
        {/* Image Section */}
        <div className="relative aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden mb-3">
          <ImageCarousel
            images={images}
            alt={space.name}
            className="w-full h-full object-cover"
          />

          {/* Rating Badge */}
          {typeof space.average_rating === 'number' && space.average_rating > 0 && (
            <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-gray-900 text-xs font-medium">{space.average_rating.toFixed(1)}</span>
            </div>
          )}

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 rounded-full h-8 w-8 p-0 shadow-sm"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // Handle favorite logic here
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="space-y-1">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 line-clamp-1">{space.name}</h3>
              <p className="text-gray-500 text-sm">{space.location}</p>
            </div>
            <div className="text-right ml-3 flex-shrink-0">
              <div className="font-semibold text-gray-900">
                {space.price_from ? `$${space.price_from}` : 'Contact'}
              </div>
              <div className="text-xs text-gray-500">
                {space.price_from ? 'per day' : 'for pricing'}
              </div>
            </div>
          </div>

          {/* Space Type and Rating */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{formatSpaceType(space.space_type)}</span>
            {typeof space.wifi_speed_mbps === 'number' && space.wifi_speed_mbps > 0 && (
              <div className="flex items-center space-x-1">
                <Wifi className="h-3 w-3 text-green-600" />
                <span className="text-xs">{space.wifi_speed_mbps} Mbps</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
