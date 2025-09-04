export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export interface Event {
  id: string;
  title: string;
  description: string;
  content?: string;
  start_date: string;
  end_date?: string;
  location: string;
  venue?: string;
  capacity?: number;
  price?: number;
  status: EventStatus;
  tags: string[];
  image?: string;
  is_online: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
  organizer_phone?: string;
  organizer_email?: string;
  organizer_name?: string;
}
