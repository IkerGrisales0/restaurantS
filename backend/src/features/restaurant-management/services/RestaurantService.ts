import { supabase } from '../../../config/supabase';
import type { Restaurant, RestaurantAmenities } from '../../../common/types/index';

export class RestaurantService {
  static async createRestaurant(
    ownerId: string,
    restaurantData: Omit<Restaurant, 'id' | 'created_at' | 'updated_at' | 'owner_id'>
  ): Promise<Restaurant> {
    const { data, error } = await supabase
      .from('restaurants')
      .insert([
        {
          owner_id: ownerId,
          ...restaurantData,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async getRestaurantById(id: string): Promise<Restaurant> {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async getRestaurantsByOwner(ownerId: string): Promise<Restaurant[]> {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('owner_id', ownerId);

    if (error) throw new Error(error.message);
    return data || [];
  }

  static async updateRestaurant(id: string, updates: Partial<Restaurant>): Promise<Restaurant> {
    const { data, error } = await supabase
      .from('restaurants')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async deleteRestaurant(id: string): Promise<void> {
    const { error } = await supabase
      .from('restaurants')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  static async addAmenities(restaurantId: string, amenities: Omit<RestaurantAmenities, 'created_at' | 'restaurant_id'>): Promise<RestaurantAmenities> {
    const { data, error } = await supabase
      .from('restaurant_amenities')
      .insert([{ restaurant_id: restaurantId, ...amenities }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async getAmenities(restaurantId: string): Promise<RestaurantAmenities> {
    const { data, error } = await supabase
      .from('restaurant_amenities')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async updateAmenities(restaurantId: string, amenities: Partial<RestaurantAmenities>): Promise<RestaurantAmenities> {
    const { data, error } = await supabase
      .from('restaurant_amenities')
      .update(amenities)
      .eq('restaurant_id', restaurantId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}
