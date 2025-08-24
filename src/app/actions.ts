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
      .from('events')
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
      .from('events')
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