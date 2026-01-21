import type { Restaurant, RestaurantAmenities } from '../../../common/types';

export interface CreateRestaurantRequest extends Omit<Restaurant, 'id' | 'created_at' | 'updated_at' | 'owner_id'> {
}

export interface UpdateRestaurantRequest extends Partial<Restaurant> {
}

export interface AmenitiesRequest extends Omit<RestaurantAmenities, 'created_at' | 'restaurant_id'> {
}
