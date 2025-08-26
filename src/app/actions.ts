'use server'

import { supabase } from '@/lib/supabase'
import { z } from 'zod'
import { Event } from '@/types/event'
import { Space } from '@/types/space'
import { Workspace, WorkspaceCategory } from '@/types/workspace'

export async function addPreuser(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
  })
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      message: 'Please enter a valid email.',
    }
  }

  const { error } = await supabase
    .from('preuser')
    .insert([{ email: validatedFields.data.email }])
    .select()

  if (error) {
    console.error('Error inserting email:', error)
    if (error.code === '23505') {
        return { message: 'This email is already registered.'}
    }
    return {
      message: 'An unexpected error occurred. Please try again later.',
    }
  }

  return { message: "Thank you for your interest! We'll notify you at launch." }
}

// ==================== EVENT ACTIONS ====================

export async function getEvents(): Promise<{ events: Event[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('events_with_registration_count')
      .select('*')
      .eq('status', 'published')
      .order('start_date', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
      return { events: null, error: 'Failed to fetch events' }
    }

    return { events: data as Event[], error: null }
  } catch (error) {
    console.error('Unexpected error fetching events:', error)
    return { events: null, error: 'An unexpected error occurred' }
  }
}

export async function getEventById(id: string): Promise<{ event: Event | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('events_with_registration_count')
      .select('*')
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('Error fetching event:', error)
      return { event: null, error: 'Event not found' }
    }

    return { event: data as Event, error: null }
  } catch (error) {
    console.error('Unexpected error fetching event:', error)
    return { event: null, error: 'An unexpected error occurred' }
  }
}

interface RegistrationData {
  eventId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  countryFrom: string
}

export async function registerForEvent(data: RegistrationData): Promise<{ success: boolean; error?: string }> {
  const schema = z.object({
    eventId: z.string().uuid(),
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    email: z.string().email('Please enter a valid email').max(255),
    phoneNumber: z.string().min(1, 'Phone number is required').max(20),
    countryFrom: z.string().min(1, 'Country is required').max(100),
  })

  const validatedFields = schema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.errors[0]?.message || 'Invalid data provided'
    }
  }

  try {
    // Check if event exists and get capacity
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('id, capacity')
      .eq('id', validatedFields.data.eventId)
      .eq('status', 'published')
      .single()

    if (eventError || !event) {
      return { success: false, error: 'Event not found' }
    }

    // Check current registration count if event has capacity limit
    if (event.capacity) {
      const { count, error: countError } = await supabase
        .from('event_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', validatedFields.data.eventId)
        .eq('status', 'confirmed')

      if (countError) {
        console.error('Error checking registration count:', countError)
        return { success: false, error: 'Failed to check event capacity' }
      }

      if (count !== null && count >= event.capacity) {
        return { success: false, error: 'Event is full' }
      }
    }

    // Insert registration
    const { error: insertError } = await supabase
      .from('event_registrations')
      .insert([{
        event_id: validatedFields.data.eventId,
        first_name: validatedFields.data.firstName,
        last_name: validatedFields.data.lastName,
        email: validatedFields.data.email,
        phone_number: validatedFields.data.phoneNumber,
        country_from: validatedFields.data.countryFrom,
        status: 'confirmed'
      }])

    if (insertError) {
      console.error('Error inserting registration:', insertError)
      
      if (insertError.code === '23505') {
        return { success: false, error: 'You are already registered for this event' }
      }
      
      return { success: false, error: 'Registration failed. Please try again.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error during registration:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}

export async function getEventRegistrationCount(eventId: string): Promise<{ count: number; error?: string }> {
  try {
    const { count, error } = await supabase
      .from('event_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)
      .eq('status', 'confirmed')

    if (error) {
      console.error('Error fetching registration count:', error)
      return { count: 0, error: 'Failed to fetch registration count' }
    }

    return { count: count || 0 }
  } catch (error) {
    console.error('Unexpected error fetching registration count:', error)
    return { count: 0, error: 'An unexpected error occurred' }
  }
}

// ==================== SPACE ACTIONS ====================

export async function getSpaces(params?: {
  location?: string
  space_type?: string
  limit?: number
  offset?: number
}): Promise<{ spaces: Space[] | null; error: string | null }> {
  try {
    let query = supabase
      .from('spaces')
      .select(`
        *,
        offers:space_offers(*),
        images:space_images(*)
      `)
      .eq('status', 'published')

    if (params?.location) {
      query = query.ilike('location', `%${params.location}%`)
    }

    if (params?.space_type) {
      query = query.eq('space_type', params.space_type)
    }

    query = query.order('created_at', { ascending: false })

    if (params?.limit) {
      query = query.limit(params.limit)
    }

    if (params?.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching spaces:', error)
      return { spaces: null, error: 'Failed to fetch spaces' }
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

    return { spaces: spacesWithRatings as Space[], error: null }
  } catch (error) {
    console.error('Unexpected error fetching spaces:', error)
    return { spaces: null, error: 'An unexpected error occurred' }
  }
}

export async function getSpaceById(id: string): Promise<{ space: Space | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('spaces')
      .select(`
        *,
        offers:space_offers(*),
        images:space_images(*),
        reviews:space_reviews(*),
        attractions:space_attractions(*)
      `)
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('Error fetching space:', error)
      return { space: null, error: 'Space not found' }
    }

    // Get rating separately
    const { data: ratingData } = await supabase
      .from('space_ratings')
      .select('*')
      .eq('space_id', id)
      .single()

    // Transform the data
    const space = {
      ...data,
      average_rating: ratingData?.average_rating || 0,
      review_count: ratingData?.review_count || 0
    } as Space

    return { space, error: null }
  } catch (error) {
    console.error('Unexpected error fetching space:', error)
    return { space: null, error: 'An unexpected error occurred' }
  }
}

export async function getFeaturedSpaces(): Promise<{ spaces: Space[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('spaces')
      .select(`
        *,
        offers:space_offers(*),
        images:space_images(*)
      `)
      .eq('status', 'published')
      .not('price_from', 'is', null)
      .order('created_at', { ascending: false })
      .limit(6)

    if (error) {
      console.error('Error fetching featured spaces:', error)
      return { spaces: null, error: 'Failed to fetch featured spaces' }
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

    return { spaces: spacesWithRatings as Space[], error: null }
  } catch (error) {
    console.error('Unexpected error fetching featured spaces:', error)
    return { spaces: null, error: 'An unexpected error occurred' }
  }
}

export async function getSpacesByLocation(location: string): Promise<{ spaces: Space[] | null; error: string | null }> {
  return getSpaces({ location, limit: 10 })
}

export async function getSpacesByType(space_type: string): Promise<{ spaces: Space[] | null; error: string | null }> {
  return getSpaces({ space_type, limit: 10 })
}

interface SpaceInquiryData {
  spaceId: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  checkInDate?: string
  checkOutDate?: string
  offerId?: string
  message?: string
}

export async function submitSpaceInquiry(data: SpaceInquiryData): Promise<{ success: boolean; error?: string }> {
  const schema = z.object({
    spaceId: z.string().uuid(),
    contactName: z.string().min(1, 'Name is required').max(200),
    contactEmail: z.string().email('Please enter a valid email').max(255),
    contactPhone: z.string().max(20).optional(),
    checkInDate: z.string().optional(),
    checkOutDate: z.string().optional(),
    offerId: z.string().uuid().optional(),
    message: z.string().max(1000).optional(),
  })

  const validatedFields = schema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.errors[0]?.message || 'Invalid data provided'
    }
  }

  try {
    // Check if space exists and allows booking
    const { data: space, error: spaceError } = await supabase
      .from('spaces')
      .select('id, allow_booking')
      .eq('id', validatedFields.data.spaceId)
      .eq('status', 'published')
      .single()

    if (spaceError || !space) {
      return { success: false, error: 'Space not found' }
    }

    if (!space.allow_booking) {
      return { success: false, error: 'This space is not accepting bookings at the moment' }
    }

    // Validate offer if provided
    if (validatedFields.data.offerId) {
      const { data: offer, error: offerError } = await supabase
        .from('space_offers')
        .select('id, available')
        .eq('id', validatedFields.data.offerId)
        .eq('space_id', validatedFields.data.spaceId)
        .single()

      if (offerError || !offer) {
        return { success: false, error: 'Selected offer not found' }
      }

      if (!offer.available) {
        return { success: false, error: 'Selected offer is not available' }
      }
    }

    // Insert inquiry
    const { error: insertError } = await supabase
      .from('space_inquiries')
      .insert([{
        space_id: validatedFields.data.spaceId,
        contact_name: validatedFields.data.contactName,
        contact_email: validatedFields.data.contactEmail,
        contact_phone: validatedFields.data.contactPhone,
        check_in_date: validatedFields.data.checkInDate,
        check_out_date: validatedFields.data.checkOutDate,
        offer_id: validatedFields.data.offerId,
        message: validatedFields.data.message,
        status: 'pending'
      }])

    console.log('insertError', insertError)
    if (insertError) {
      console.error('Error inserting space inquiry:', insertError)
      return { success: false, error: 'Failed to submit inquiry. Please try again.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error during space inquiry submission:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}

interface SpaceReviewData {
  spaceId: string
  rating: number
  title?: string
  content?: string
  authorName: string
}

export async function submitSpaceReview(data: SpaceReviewData): Promise<{ success: boolean; error?: string }> {
  const schema = z.object({
    spaceId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    title: z.string().max(200).optional(),
    content: z.string().max(1000).optional(),
    authorName: z.string().min(1, 'Name is required').max(200),
  })

  const validatedFields = schema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.errors[0]?.message || 'Invalid data provided'
    }
  }

  try {
    // Check if space exists
    const { data: space, error: spaceError } = await supabase
      .from('spaces')
      .select('id')
      .eq('id', validatedFields.data.spaceId)
      .eq('status', 'published')
      .single()

    if (spaceError || !space) {
      return { success: false, error: 'Space not found' }
    }

    // Insert review
    const { error: insertError } = await supabase
      .from('space_reviews')
      .insert([{
        space_id: validatedFields.data.spaceId,
        rating: validatedFields.data.rating,
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        author_name: validatedFields.data.authorName
      }])

    if (insertError) {
      console.error('Error inserting space review:', insertError)
      return { success: false, error: 'Failed to submit review. Please try again.' }
    }

    // Refresh the materialized view for ratings
    await supabase.rpc('refresh_space_ratings')

    return { success: true }
  } catch (error) {
    console.error('Unexpected error during space review submission:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}

// Helper function to get unique locations from spaces
export async function getSpaceLocations(): Promise<{ locations: string[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('spaces')
      .select('location')
      .eq('status', 'published')
      .not('location', 'is', null)

    if (error) {
      console.error('Error fetching space locations:', error)
      return { locations: null, error: 'Failed to fetch locations' }
    }

    // Get unique locations
    const uniqueLocations = [...new Set(data.map(item => item.location))].sort()

    return { locations: uniqueLocations, error: null }
  } catch (error) {
    console.error('Unexpected error fetching space locations:', error)
    return { locations: null, error: 'An unexpected error occurred' }
  }
}

// ==================== WORKSPACE ACTIONS (LEGACY) ====================

export async function getWorkspaces(params?: {
  location?: string
  category?: string
  featured?: boolean
  limit?: number
  offset?: number
}): Promise<{ workspaces: Workspace[] | null; error: string | null }> {
  try {
    let query = supabase
      .from('workspaces')
      .select(`
        *,
        location:locations(*),
        category:workspace_categories(*),
        images:workspace_images(*),
        amenities:workspace_amenities(amenity:amenities(*))
      `)
      .eq('is_active', true)

    if (params?.location) {
      query = query.eq('location.name', params.location)
    }

    if (params?.category) {
      query = query.eq('category.name', params.category)
    }

    if (params?.featured) {
      query = query.eq('is_featured', true)
    }

    query = query.order('rating', { ascending: false })

    if (params?.limit) {
      query = query.limit(params.limit)
    }

    if (params?.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching workspaces:', error)
      return { workspaces: null, error: 'Failed to fetch workspaces' }
    }

    // Transform the data to match our interface
    const workspaces = data?.map((workspace: any) => ({
      ...workspace,
      amenities: workspace.amenities?.map((wa: any) => wa.amenity) || []
    })) as Workspace[]

    return { workspaces, error: null }
  } catch (error) {
    console.error('Unexpected error fetching workspaces:', error)
    return { workspaces: null, error: 'An unexpected error occurred' }
  }
}

export async function getWorkspaceBySlug(slug: string): Promise<{ workspace: Workspace | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('workspaces')
      .select(`
        *,
        location:locations(*),
        category:workspace_categories(*),
        images:workspace_images(*),
        amenities:workspace_amenities(amenity:amenities(*)),
        reviews:reviews(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching workspace:', error)
      return { workspace: null, error: 'Workspace not found' }
    }

    // Transform the data
    const workspace = {
      ...data,
      amenities: data.amenities?.map((wa: any) => wa.amenity) || []
    } as Workspace

    return { workspace, error: null }
  } catch (error) {
    console.error('Unexpected error fetching workspace:', error)
    return { workspace: null, error: 'An unexpected error occurred' }
  }
}

export async function getLocations(): Promise<{ locations: Location[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (error) {
      console.error('Error fetching locations:', error)
      return { locations: null, error: 'Failed to fetch locations' }
    }

    return { locations: data as Location[], error: null }
  } catch (error) {
    console.error('Unexpected error fetching locations:', error)
    return { locations: null, error: 'An unexpected error occurred' }
  }
}

export async function getWorkspaceCategories(): Promise<{ categories: WorkspaceCategory[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('workspace_categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching workspace categories:', error)
      return { categories: null, error: 'Failed to fetch categories' }
    }

    return { categories: data as WorkspaceCategory[], error: null }
  } catch (error) {
    console.error('Unexpected error fetching workspace categories:', error)
    return { categories: null, error: 'An unexpected error occurred' }
  }
}

interface InquiryData {
  workspaceId: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  checkInDate?: string
  checkOutDate?: string
  message?: string
}

export async function submitWorkspaceInquiry(data: InquiryData): Promise<{ success: boolean; error?: string }> {
  const schema = z.object({
    workspaceId: z.string().uuid(),
    contactName: z.string().min(1, 'Name is required').max(200),
    contactEmail: z.string().email('Please enter a valid email').max(255),
    contactPhone: z.string().max(20).optional(),
    checkInDate: z.string().optional(),
    checkOutDate: z.string().optional(),
    message: z.string().max(1000).optional(),
  })

  const validatedFields = schema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.errors[0]?.message || 'Invalid data provided'
    }
  }

  try {
    // Check if workspace exists
    const { data: workspace, error: workspaceError } = await supabase
      .from('workspaces')
      .select('id')
      .eq('id', validatedFields.data.workspaceId)
      .eq('is_active', true)
      .single()

    if (workspaceError || !workspace) {
      return { success: false, error: 'Workspace not found' }
    }

    // Insert inquiry
    const { error: insertError } = await supabase
      .from('inquiries')
      .insert([{
        workspace_id: validatedFields.data.workspaceId,
        contact_name: validatedFields.data.contactName,
        contact_email: validatedFields.data.contactEmail,
        contact_phone: validatedFields.data.contactPhone,
        check_in_date: validatedFields.data.checkInDate,
        check_out_date: validatedFields.data.checkOutDate,
        message: validatedFields.data.message,
        status: 'pending'
      }])

    if (insertError) {
      console.error('Error inserting inquiry:', insertError)
      return { success: false, error: 'Failed to submit inquiry. Please try again.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error during inquiry submission:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}

interface ReviewData {
  workspaceId: string
  rating: number
  comment?: string
  reviewerName: string
  reviewerEmail: string
}

export async function submitWorkspaceReview(data: ReviewData): Promise<{ success: boolean; error?: string } | undefined> {
  const schema = z.object({
    workspaceId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    comment: z.string().max(1000).optional(),
    reviewerName: z.string().min(1, 'Name is required').max(200),
    reviewerEmail: z.string().email('Please enter a valid email').max(255),
  })

  const validatedFields = schema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.errors[0]?.message || 'Invalid data provided'
    }
  }

  try {
    // Check if workspace exists
    const { data: workspace, error: workspaceError } = await supabase
      .from('workspaces')
      .select('id')
      .eq('id', validatedFields.data.workspaceId)
      .eq('is_active', true)
      .single()

    if (workspaceError || !workspace) {
      return { success: false, error: 'Workspace not found' }
    }
  } catch (error) {
    console.error('Unexpected error during review submission:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}