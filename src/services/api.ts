
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
interface BackendRestaurant {
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

function adaptRestaurant(backendRestaurant: BackendRestaurant): any {
  return {
    id: backendRestaurant.id,
    name: backendRestaurant.name,
    cuisine: backendRestaurant.cuisine_type,
    cuisine_type: backendRestaurant.cuisine_type,
    city: backendRestaurant.address.split(',').pop()?.trim() || 'N/A',
    address: backendRestaurant.address,
    price: Math.ceil(backendRestaurant.average_price / 25), // Convertir precio a escala 1-4
    mainImage: backendRestaurant.image_url || '/placeholder.jpg',
    images: [backendRestaurant.image_url || '/placeholder.jpg'],
    description: backendRestaurant.description,
    opening_time: backendRestaurant.opening_time,
    closing_time: backendRestaurant.closing_time,
    hours: {
      [`${backendRestaurant.opening_time} - ${backendRestaurant.closing_time}`]: 'Todos los días'
    },
    amenities: {
      terrace: false,
      wifi: false,
      petFriendly: false
    }
  };
}

export const discoveryApi = {
  async getAllRestaurants(filters?: {
    search?: string;
    cuisineType?: string;
    minPrice?: number;
    maxPrice?: number;
    wifi?: boolean;
    parking?: boolean;
    outdoor_seating?: boolean;
    pet_friendly?: boolean;
    wheelchair_accessible?: boolean;
  }) {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.cuisineType) params.append('cuisineType', filters.cuisineType);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.wifi) params.append('wifi', 'true');
    if (filters?.parking) params.append('parking', 'true');
    if (filters?.outdoor_seating) params.append('outdoor_seating', 'true');
    if (filters?.pet_friendly) params.append('pet_friendly', 'true');
    if (filters?.wheelchair_accessible) params.append('wheelchair_accessible', 'true');

    const response = await fetch(`${API_URL}/discovery?${params}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Error al obtener restaurantes');
    }
    
    return (data.data || []).map(adaptRestaurant);
  },

  async getRestaurantById(id: string) {
    const response = await fetch(`${API_URL}/restaurants/${id}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Error al obtener restaurante');
    }
    
    return adaptRestaurant(data.data);
  },

  async getPopularRestaurants(limit: number = 6) {
    const response = await fetch(`${API_URL}/discovery/popular?limit=${limit}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Error al obtener restaurantes populares');
    }
    
    return (data.data || []).map(adaptRestaurant);
  }
};

export const restaurantApi = {
  async getMyRestaurant() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const response = await fetch(`${API_URL}/restaurants/owner`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (!data.success) return null;
    const list = data.data || [];
    return list.length ? adaptRestaurant(list[0]) : null;
  },
  async createRestaurant(restaurantData: {
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
  }, token: string) {
    const response = await fetch(`${API_URL}/restaurants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(restaurantData)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Error al crear restaurante');
    }
    
    return data.data;
  },

  async addAmenities(restaurantId: string, amenities: {
    wifi: boolean;
    parking: boolean;
    outdoor_seating: boolean;
    pet_friendly: boolean;
    wheelchair_accessible: boolean;
    reservation_required: boolean;
  }, token: string) {
    const response = await fetch(`${API_URL}/restaurants/${restaurantId}/amenities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(amenities)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Error al agregar amenidades');
    }
    
    return data.data;
  },

  async updateRestaurant(restaurantId: string, restaurantData: {
    name?: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    image_url?: string;
    opening_time?: string;
    closing_time?: string;
    cuisine_type?: string;
    average_price?: number;
  }, token: string) {
    const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(restaurantData)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Error al actualizar restaurante');
    }
    
    return data.data;
  }
};

export const authApi = {
  async register(userData: { email: string; password: string; role: 'restaurant' | 'customer'; restaurantName?: string; address?: string; phone?: string }) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    return data;
  },

  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    return data;
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_URL}/auth/current`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Error al obtener usuario');
    }
    
    return data.data;
  }
};

export const bookingApi = {
  async createBooking(bookingData: {
    restaurantId: string;
    date: string;
    time: string;
    guests: number;
    specialRequests?: string;
  }) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return { success: false, error: "No hay sesión activa" };
    }

    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...bookingData,
        special_requests: bookingData.specialRequests
      })
    });
    
    if (response.status === 401) {
      return { success: false, error: 'Sesión expirada o inválida. Inicia sesión nuevamente.' };
    }

    const data = await response.json();
    return data;
  },

  async getAvailability(restaurantId: string, date: string) {
    const response = await fetch(`${API_URL}/bookings/${restaurantId}/availability?date=${date}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Error al obtener disponibilidad');
    }
    
    return data.data || [];
  }
};
