import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export function EventHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </Link>
            <div className="text-2xl font-bold text-coral-500">NomadLife</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700">
              List Your Event
            </Button>
            <Button className="bg-coral-500 hover:bg-coral-600 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}