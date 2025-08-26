interface ShareData {
    title: string
    text: string
    url: string
  }
  
  export async function shareContent(data: ShareData): Promise<boolean> {
    // Check if Web Share API is supported (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share(data)
        return true
      } catch (error) {
        console.log('Share cancelled or failed:', error)
        return false
      }
    } else {
      // Fallback for desktop - copy to clipboard
      try {
        const shareText = `${data.title}\n\n${data.text}\n\n${data.url}`
        await navigator.clipboard.writeText(shareText)
        return true
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        return false
      }
    }
  }
  
  export function getShareableUrl(spaceId: string): string {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/space/${spaceId}`
    }
    return `https://yoursite.com/space/${spaceId}` // Replace with your actual domain
  }
  
  export function generateShareText(spaceName: string, location: string): string {
    return `Check out this amazing workspace: ${spaceName} in ${location}! Perfect for digital nomads 🌍💻`
  }