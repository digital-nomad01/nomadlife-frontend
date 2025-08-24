import { Button } from "@/components/ui/button"

interface HeaderProps {
  className?: string
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-coral-500">NomadLife</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Explore
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Events
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Tools
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Community
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
