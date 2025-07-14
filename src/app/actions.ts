'use server'

import { supabase } from '@/lib/supabase'
import { z } from 'zod'

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