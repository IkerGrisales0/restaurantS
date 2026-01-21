export interface User {
  id: string;
  email: string;
  role: 'restaurant' | 'customer';
  name?: string;
  phone?: string;
  address?: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  session: {
    access_token: string;
    refresh_token: string;
  };
}

export interface Restaurant {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  image_url: string;
  opening_time: string;
  closing_time: string;
  cuisine_type: string;
  average_price: number;
  created_at: string;
  updated_at: string;
}

export interface RestaurantFilters {
  wifi: boolean;
  parking: boolean;
  outdoor_seating: boolean;
  pet_friendly: boolean;
  wheelchair_accessible: boolean;
  reservation_required: boolean;
}

export interface RestaurantAmenities {
  restaurant_id: string;
  wifi: boolean;
  parking: boolean;
  outdoor_seating: boolean;
  pet_friendly: boolean;
  wheelchair_accessible: boolean;
  reservation_required: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  restaurant_id: string;
  user_id: string;
  date: string;
  time: string;
  guests: number;
  special_requests: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
