


export function RichTextStyles() {
    return (
      <style jsx global>{`
        .rich-text-content {
          color: #374151;
          line-height: 1.75;
        }
        
        .rich-text-content h1 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #111827;
        }
        
        .rich-text-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
          color: #111827;
        }
        
        .rich-text-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 1.25rem;
          color: #111827;
        }
        
        .rich-text-content p {
          margin-bottom: 1rem;
        }
        
        .rich-text-content ul, .rich-text-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        
        .rich-text-content li {
          margin-bottom: 0.25rem;
        }
        
        .rich-text-content strong {
          font-weight: 600;
          color: #111827;
        }
        
        .rich-text-content em {
          font-style: italic;
        }
        
        .rich-text-content a {
          color: #f97316;
          text-decoration: underline;
        }
        
        .rich-text-content a:hover {
          color: #ea580c;
        }
        
        .rich-text-content blockquote {
          border-left: 4px solid #f97316;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .rich-text-content code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
          font-size: 0.875rem;
        }
        
        .rich-text-content pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .rich-text-content pre code {
          background-color: transparent;
          padding: 0;
        }
        
        .rich-text-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .rich-text-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 2rem 0;
        }
      `}</style>
    )
  }