export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }
  
  export function formatTime(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }
  
  export function formatPrice(price?: number): string {
    if (!price || price === 0) return 'Free'
    return `$${price.toFixed(0)}`
  }
  
  export function getImageUrl(imagePath?: string): string {
    if (!imagePath) return ''
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/events/${imagePath}`
  }
  
  // Simple HTML sanitization - in production, consider using a library like DOMPurify
  export function sanitizeHTML(html: string): string {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/javascript:/gi, '')
  }