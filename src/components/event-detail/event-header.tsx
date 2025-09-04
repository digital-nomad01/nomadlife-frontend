import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Menu } from "lucide-react"

export function EventHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <ChevronLeft className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Events</span>
                <span className="xs:hidden">Back</span>
              </Button>
            </Link>
            <div className="text-lg sm:text-2xl font-bold text-coral-500 truncate">
              NomadLife
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700">
                List Your Event
              </Button>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Button className="bg-coral-500 hover:bg-coral-600 text-white text-sm px-3">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}