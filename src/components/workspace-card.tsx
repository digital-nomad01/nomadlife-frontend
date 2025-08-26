'use client'
import Link from "next/link"
import { Heart, Star, Wifi } from "lucide-react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import ImageCarousel from "./image-carousel"
import { Workspace } from "@/types/workspace"

interface WorkspaceCardProps {
  workspace: Workspace
  className?: string
}

export default function WorkspaceCard({ workspace, className }: WorkspaceCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group py-0 ${className}`}>
      <Link href={`/workspace/${workspace.slug}`}>
        <div className="relative aspect-[4/5] bg-gray-200">
          <ImageCarousel
            images={workspace.images || []}
            alt={workspace.name}
            className="w-full h-full"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* WiFi Speed Badge */}
          <div className="absolute bottom-4 left-2 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 z-10">
            <Wifi className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-medium">{workspace.wifi}</span>
            <span className="text-white/80 text-xs">Mbps</span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 z-10">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">{workspace.rating}</span>
          </div>

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

          {/* Workspace Information */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
            <div className="mb-3">
              <h3 className="text-lg font-bold mb-1">{workspace.name}</h3>
              <p className="text-white/90 text-sm">{workspace.location?.name}, Nepal</p>
              <p className="text-white/70 text-xs mt-1">{workspace.category?.name}</p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1 mb-3">
              {workspace.amenities?.slice(0, 2).map((amenity: any, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-white/20 text-white border-white/30"
                >
                  {amenity.name}
                </Badge>
              ))}
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-lg font-bold">${workspace.price_per_day} / day</div>
              <div className="text-xs text-white/80">Starting from</div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
