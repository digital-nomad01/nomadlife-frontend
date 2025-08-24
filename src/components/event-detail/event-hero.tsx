import Image from "next/image"
import { Event } from "@/types/event"
import { RegistrationCard } from "./registration-card"
import { getImageUrl } from "./utils/event-utils"

interface EventHeroProps {
  event: Event
  isFavorited: boolean
  setIsFavorited: (value: boolean) => void
  isRegistered: boolean
  setIsRegistered: (value: boolean) => void
}

export function EventHero({ 
  event, 
  isFavorited, 
  setIsFavorited, 
  isRegistered, 
  setIsRegistered 
}: EventHeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Image */}
      <div className="lg:col-span-2 space-y-4">
        <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
          {event.image && (
            <Image
              src={getImageUrl(event.image)}
              alt={event.title}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Registration Card */}
      <div className="lg:col-span-1">
        <RegistrationCard
          event={event}
          isFavorited={isFavorited}
          setIsFavorited={setIsFavorited}
          isRegistered={isRegistered}
          setIsRegistered={setIsRegistered}
        />
      </div>
    </div>
  )
}