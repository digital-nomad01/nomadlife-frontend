import { getAmenityConfig } from "@/config/amenities"

interface AmenityListProps {
  amenities: string[]
  showDescription?: boolean
  className?: string
  layout?: 'grid' | 'cards' // New prop to choose layout style
}

export default function AmenityList({ 
  amenities, 
  showDescription = false, 
  className = "",
  layout = 'cards' // Default to the nicer cards layout
}: AmenityListProps) {
  const amenityConfigs = amenities.map(amenityName => 
    getAmenityConfig(amenityName)
  ).filter(Boolean)

  console.log('amenityConfigs', amenityConfigs)
  if (amenityConfigs.length === 0) return null

  // Cards layout (like workspace-detail.tsx)
  if (layout === 'cards') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
        {amenityConfigs.map((amenity, index) => {
          const IconComponent = amenity?.icon
          return (
            <div 
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {IconComponent && <IconComponent className="h-6 w-6 text-coral-500 mt-1" />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {amenity?.label}
                  </h4>
                  {showDescription && (
                    <p className="text-sm text-gray-600">
                      {amenity?.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Original grid layout
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${className}`}>
      {amenityConfigs.map((amenity, index) => {
        const IconComponent = amenity?.icon
        return (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
              {IconComponent && <IconComponent className="h-5 w-5 text-blue-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm">
                {amenity?.label}
              </h4>
              {showDescription && (
                <p className="text-xs text-gray-600 mt-1">
                  {amenity?.description}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
