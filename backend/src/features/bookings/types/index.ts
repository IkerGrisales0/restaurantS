export interface CreateBookingRequest {
  restaurantId: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
}

export interface UpdateBookingRequest {
  date?: string;
  time?: string;
  guests?: number;
  special_requests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}
