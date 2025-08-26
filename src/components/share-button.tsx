"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share } from "lucide-react"
import { ShareModal } from "./share-modal"
import { shareContent, getShareableUrl, generateShareText } from "@/lib/share"

interface ShareButtonProps {
  spaceId: string
  spaceName: string
  location: string
  variant?: "ghost" | "outline" | "default"
  size?: "sm" | "default" | "lg"
  className?: string
  showText?: boolean
}

export function ShareButton({ 
  spaceId, 
  spaceName, 
  location, 
  variant = "ghost", 
  size = "sm",
  className = "",
  showText = false
}: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false)

  const shareData = {
    title: `${spaceName} - Digital Nomad Workspace`,
    text: generateShareText(spaceName, location),
    url: getShareableUrl(spaceId)
  }

  const handleShare = async () => {
    // Try native share first (mobile devices)
    const shared = await shareContent(shareData)
    
    // If native share failed or not available, show modal
    if (!shared) {
      setShowModal(true)
    }
  }

  return (
    <>
      <Button 
        variant={variant} 
        size={size}
        onClick={handleShare}
        className={className}
      >
        <Share className="h-4 w-4" />
        {showText && <span className="ml-2">Share</span>}
      </Button>

      <ShareModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={shareData.title}
        text={shareData.text}
        url={shareData.url}
      />
    </>
  )
}
