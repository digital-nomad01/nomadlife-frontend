'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Space } from '@/types/space'
import SpaceCard from '@/components/space-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface SpacesData {
  spaces: Space[] | null
  total: number
  error: string | null
}

async function fetchSpaces(params?: {
  location?: string
  space_type?: string
  limit?: number
  offset?: number
}): Promise<SpacesData> {
  try {
    const searchParams = new URLSearchParams()
    
    if (params?.location) searchParams.append('location', params.location)
    if (params?.space_type) searchParams.append('space_type', params.space_type)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.offset) searchParams.append('offset', params.offset.toString())

    const response = await fetch(`/api/spaces?${searchParams.toString()}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch spaces')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching spaces:', error)
    return { spaces: null, total: 0, error: 'Failed to fetch spaces' }
  }
}

function SpacesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [spaces, setSpaces] = useState<Space[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Pagination and filtering state
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [spaceType, setSpaceType] = useState('')
  
  const ITEMS_PER_PAGE = 12
  
  // Get initial values from URL params
  useEffect(() => {
    const page = parseInt(searchParams?.get('page') || '1')
    const search = searchParams?.get('search') || ''
    const type = searchParams?.get('type') || ''
    
    setCurrentPage(page)
    setSearchTerm(search)
    setSpaceType(type)
  }, [searchParams])

  // Fetch spaces when filters change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      const offset = (currentPage - 1) * ITEMS_PER_PAGE
      
      const result = await fetchSpaces({
        location: searchTerm || undefined,
        space_type: spaceType || undefined,
        limit: ITEMS_PER_PAGE,
        offset
      })
      
      if (result.error) {
        setError(result.error)
      } else {
        setSpaces(result.spaces || [])
        setTotal(result.total)
      }
      
      setLoading(false)
    }

    fetchData()
  }, [currentPage, searchTerm, spaceType])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (currentPage > 1) params.set('page', currentPage.toString())
    if (searchTerm) params.set('search', searchTerm)
    if (spaceType) params.set('type', spaceType)
    
    const url = params.toString() ? `?${params.toString()}` : ''
    router.replace(`/spaces${url}`, { scroll: false })
  }, [currentPage, searchTerm, spaceType, router])

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleTypeFilter = (type: string) => {
    setSpaceType(type)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                All Spaces
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover coworking spaces, cafés, and coliving spaces perfect for digital nomads
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search by location..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Space Type Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={spaceType}
                    onChange={(e) => handleTypeFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">All Types</option>
                    <option value="coworking_space">Coworking Space</option>
                    <option value="coworking_cafe">Coworking Café</option>
                    <option value="coliving_space">Coliving Space</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="text-center mb-8">
              <p className="text-gray-600">
                {loading ? (
                  'Loading spaces...'
                ) : error ? (
                  'Error loading spaces'
                ) : (
                  `Showing ${spaces.length} of ${total} spaces`
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Spaces Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-96" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : spaces.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No spaces found matching your criteria.</p>
                <Button onClick={() => {
                  setSearchTerm('')
                  setSpaceType('')
                  setCurrentPage(1)
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                {/* Spaces Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {spaces.map((space) => (
                    <SpaceCard key={space.id} space={space} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={pageNum === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            className="w-10"
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function SpacesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading spaces...</p>
        </div>
      </div>
    }>
      <SpacesContent />
    </Suspense>
  )
}
