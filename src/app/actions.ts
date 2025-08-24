'use server'

import { supabase } from '@/lib/supabase'
import { z } from 'zod'
import { Event } from '@/types/event'

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