import { sanitizeHTML } from "../utils/event-utils"

interface RichTextContentProps {
  content?: string
  fallback: string
}

export function RichTextContent({ content, fallback }: RichTextContentProps) {
  if (!content) {
    return <p className="text-gray-700 leading-relaxed">{fallback}</p>
  }

  // Check if content contains HTML tags
  const hasHTMLTags = /<[^>]*>/g.test(content)
  
  if (hasHTMLTags) {
    return (
      <div 
        className="rich-text-content"
        dangerouslySetInnerHTML={{ 
          __html: sanitizeHTML(content) 
        }} 
      />
    )
  } else {
    // Plain text content - preserve line breaks
    return (
      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
        {content}
      </div>
    )
  }
}
