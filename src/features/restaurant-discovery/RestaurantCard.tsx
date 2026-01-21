import { MapPin } from "lucide-react";
import type { Restaurant } from "../common/restaurants";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const cuisineType = (restaurant as any).cuisine_type || restaurant.cuisine || 'Comida internacional';
  const imageUrl = (restaurant as any).image_url || restaurant.mainImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4';
  const averagePrice = (restaurant as any).average_price || restaurant.price || 2;
  const locationText = (restaurant as any).address || restaurant.city || 'Ubicación no disponible';
  
  return (
    <div className="restaurant-card" onClick={onClick}>
      <div className="restaurant-card-image-wrapper">
        <ImageWithFallback
          src={imageUrl}
          alt={restaurant.name}
          className="restaurant-card-image"
        />
        
        <div className="restaurant-card-badges">
          {restaurant.amenities?.terrace && (
            <span className="restaurant-card-badge">Terraza</span>
          )}
          {restaurant.amenities?.wifi && (
            <span className="restaurant-card-badge">WiFi</span>
          )}
          {restaurant.amenities?.petFriendly && (
            <span className="restaurant-card-badge">Pet-friendly</span>
          )}
        </div>
      </div>

      <div className="restaurant-card-content">
        <div className="restaurant-card-header">
          <h3 className="restaurant-card-name">{restaurant.name}</h3>
          <span className="restaurant-card-price">
            {'$'.repeat(averagePrice)}
          </span>
        </div>

        <p className="restaurant-card-cuisine">{cuisineType}</p>

        <div className="restaurant-card-location">
          <MapPin className="restaurant-card-location-icon" />
          <span>{locationText}</span>
        </div>
      </div>
    </div>
  );
}
