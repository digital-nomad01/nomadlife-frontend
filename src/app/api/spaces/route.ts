import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Space } from '@/types/space'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const location = searchParams.get('location')
    const space_type = searchParams.get('space_type')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = parseInt(searchParams.get('offset') || '0')

    // First get the total count
    let countQuery = supabase
      .from('spaces')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')

    if (location) {
      countQuery = countQuery.ilike('location', `%${location}%`)
    }

    if (space_type) {
      countQuery = countQuery.eq('space_type', space_type)
    }

    const { count, error: countError } = await countQuery

    if (countError) {
      console.error('Error fetching spaces count:', countError)
      return NextResponse.json(
        { spaces: null, total: 0, error: 'Failed to fetch spaces count' },
        { status: 500 }
      )
    }

    // Then get the actual data
    let query = supabase
      .from('spaces')
      .select(`
        *,
        offers:space_offers(*),
        images:space_images(*)
      `)
      .eq('status', 'published')

    if (location) {
      query = query.ilike('location', `%${location}%`)
    }

    if (space_type) {
      query = query.eq('space_type', space_type)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data, error } = await query

    if (error) {
      console.error('Error fetching spaces:', error)
      return NextResponse.json(
        { spaces: null, total: 0, error: 'Failed to fetch spaces' },
        { status: 500 }
      )
    }

    // Get ratings separately for each space
    const spacesWithRatings = await Promise.all(
      (data || []).map(async (space: any) => {
        const { data: ratingData } = await supabase
          .from('space_ratings')
          .select('*')
          .eq('space_id', space.id)
          .single()

        return {
          ...space,
          average_rating: ratingData?.average_rating || 0,
          review_count: ratingData?.review_count || 0
        }
      })
    )

    return NextResponse.json({
      spaces: spacesWithRatings as Space[],
      total: count || 0,
      error: null
    })
  } catch (error) {
    console.error('Unexpected error fetching spaces:', error)
    return NextResponse.json(
      { spaces: null, total: 0, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
