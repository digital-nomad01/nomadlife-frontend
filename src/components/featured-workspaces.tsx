import { getFeaturedSpaces } from "@/app/actions"
import SpaceCard from "./space-card"
import { Button } from "./ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface FeaturedWorkspacesProps {
  className?: string
}

export default async function FeaturedWorkspaces({ className = "" }: FeaturedWorkspacesProps) {
  const { spaces, error } = await getFeaturedSpaces()

  if (error) {
    return (
      <section id="workspaces" className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Spaces
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Handpicked coworking spaces with reliable internet, stunning
                views, and vibrant communities
              </p>
            </div>
            
            <Button 
              asChild
              variant="outline"
              className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300 px-6 py-2 text-sm font-medium"
            >
              <Link href="/spaces">
                View All Spaces
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600">Unable to load spaces at this time.</p>
          </div>
        </div>
      </section>
    )
  }

  if (!spaces || spaces.length === 0) {
    return (
      <section id="workspaces" className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Spaces
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Handpicked coworking spaces with reliable internet, stunning
                views, and vibrant communities
              </p>
            </div>
            
            <Button 
              asChild
              variant="outline"
              className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300 px-6 py-2 text-sm font-medium"
            >
              <Link href="/spaces">
                View All Spaces
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600">No spaces available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="workspaces" className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Spaces
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Handpicked coworking spaces with reliable internet, stunning
              views, and vibrant communities
            </p>
          </div>
          
          <Button 
            asChild
            variant="outline"
            className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300 px-6 py-2 text-sm font-medium"
          >
            <Link href="/spaces">
              View All Spaces
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </div>
    </section>
  )
}