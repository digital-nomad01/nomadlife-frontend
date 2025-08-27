"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeaderProps {
  className?: string
}

export default function Header({ className = "" }: HeaderProps) {
  const handleEventsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const eventsSection = document.getElementById('events')
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleWorkspacesClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const workspacesSection = document.getElementById('workspaces')
    if (workspacesSection) {
      workspacesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFeedbackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const feedbackSection = document.getElementById('feedback')
    if (feedbackSection) {
      feedbackSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
 
  return (
    <header className={`bg-white border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-coral-500">
              NomadLife
            </Link>
            <nav className="hidden md:flex space-x-6">
              {/* <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Explore
              </a> */}
              <a 
                href="#events" 
                onClick={handleEventsClick}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Events
              </a>
              <a href="#workspaces" onClick={handleWorkspacesClick} className="text-gray-700 hover:text-gray-900 font-medium">
                Workspaces
              </a>
              <a href="#feedback" onClick={handleFeedbackClick} className="text-gray-700 hover:text-gray-900 font-medium">
                Feedback
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700">
              Sign In
            </Button>
            <Button className="bg-coral-500 hover:bg-coral-600 text-white">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
