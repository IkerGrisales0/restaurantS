import { supabase } from '../../../config/supabase';
import type { Restaurant } from '../../../common/types/index';

export interface DiscoveryFilters {
  cuisineType?: string;
  priceRange?: [number, number];
  wifi?: boolean;
  parking?: boolean;
  outdoor_seating?: boolean;
  pet_friendly?: boolean;
  wheelchair_accessible?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export class DiscoveryService {
  // Obtener todos los restaurantes
  static async getAllRestaurants(filters?: DiscoveryFilters): Promise<Restaurant[]> {
    let query = supabase.from('restaurants').select('*');

    if (filters) {
      if (filters.cuisineType) {
        query = query.eq('cuisine_type', filters.cuisineType);
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters.priceRange) {
        query = query.gte('average_price', filters.priceRange[0]).lte('average_price', filters.priceRange[1]);
      }

      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data || [];
  }

  // Obtener restaurantes con filtros de amenidades
  static async searchRestaurants(filters: DiscoveryFilters): Promise<Restaurant[]> {
    let query = supabase
      .from('restaurants')
      .select('*');

    // Aplicar búsqueda de texto
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Aplicar filtros de rango de precio
    if (filters.priceRange) {
      query = query.gte('average_price', filters.priceRange[0]).lte('average_price', filters.priceRange[1]);
    }

    // Aplicar filtro de tipo de cocina
    if (filters.cuisineType) {
      query = query.eq('cuisine_type', filters.cuisineType);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    // Filtrar por amenidades si están presentes
    if (
      filters.wifi ||
      filters.parking ||
      filters.outdoor_seating ||
      filters.pet_friendly ||
      filters.wheelchair_accessible
    ) {
      const { data: amenitiesData, error: amenitiesError } = await supabase
        .from('restaurant_amenities')
        .select('restaurant_id');

      if (amenitiesError) throw new Error(amenitiesError.message);

      const amenitiesRestaurantIds = new Set(
        amenitiesData?.map((a) => a.restaurant_id) || []
      );

      return (data || []).filter((restaurant) =>
        amenitiesRestaurantIds.has(restaurant.id)
      );
    }

    return data || [];
  }

  // Obtener restaurantes relacionados
  static async getRelatedRestaurants(restaurantId: string, limit: number = 3): Promise<Restaurant[]> {
    const restaurant = await supabase
      .from('restaurants')
      .select('cuisine_type')
      .eq('id', restaurantId)
      .single();

    if (!restaurant.data) throw new Error('Restaurante no encontrado');

    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('cuisine_type', restaurant.data.cuisine_type)
      .neq('id', restaurantId)
      .limit(limit);

    if (error) throw new Error(error.message);
    return data || [];
  }

  // Obtener restaurantes recientes
  static async getPopularRestaurants(limit: number = 6): Promise<Restaurant[]> {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data || [];
  }
}
