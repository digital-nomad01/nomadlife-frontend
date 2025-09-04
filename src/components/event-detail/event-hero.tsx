"use client"

import { useState } from "react"
import Image from "next/image"
import { Event } from "@/types/event"
import { RegistrationCard } from "./registration-card"
import { getImageUrl } from "./utils/event-utils"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface EventHeroProps {
  event: Event
  isFavorited: boolean
  setIsFavorited: (value: boolean) => void
  isRegistered: boolean
  registrationCount: number
  onRegistrationSuccess: () => void
}

// Image Preview Modal Component
function ImagePreviewModal({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrev 
}: {
  images: Array<{ path: string; alt?: string }>
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Image */}
      <div className="max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
        <Image
          src={getImageUrl(images[currentIndex]?.path)}
          alt={images[currentIndex]?.alt || 'Event image'}
          width={1200}
          height={800}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

export function EventHero({ 
  event, 
  isFavorited, 
  setIsFavorited, 
  isRegistered, 
  registrationCount,
  onRegistrationSuccess
}: EventHeroProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImagePreview, setShowImagePreview] = useState(false)
  
  // Create array of all event images (main image + gallery images if they exist)
  const allImages = [
    ...(event.image ? [{ path: event.image, alt: event.title }] : []),
  ]

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const primaryImage = allImages[selectedImageIndex] || allImages[0]

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Image */}
        <div className="lg:col-span-2 space-y-4">
          <div 
            className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-slate-800 dark:to-gray-900 cursor-pointer"
            onClick={() => setShowImagePreview(true)}
          >
            {primaryImage && (
              <Image
                src={getImageUrl(primaryImage.path)}
                alt={primaryImage.alt || event.title}
                width={800}
                height={450}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
          
          {/* Image Gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.slice(0, 8).map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index)
                    setShowImagePreview(true)
                  }}
                  className={`aspect-video rounded-lg overflow-hidden transition-all ${
                    selectedImageIndex === index ? 'ring-2 ring-coral-500' : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <Image
                    src={getImageUrl(image.path)}
                    alt={image.alt || `${event.title} ${index + 1}`}
                    width={200}
                    height={113}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Registration Card */}
        <div className="lg:col-span-1">
          <RegistrationCard
            event={event}
            isFavorited={isFavorited}
            setIsFavorited={setIsFavorited}
            isRegistered={isRegistered}
            registrationCount={registrationCount}
            onRegistrationSuccess={onRegistrationSuccess}
          />
        </div>
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        images={allImages}
        currentIndex={selectedImageIndex}
        isOpen={showImagePreview}
        onClose={() => setShowImagePreview(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  )
}