import { MapPin } from "lucide-react";
import type { Restaurant } from "../data/restaurants";
import { ImageWithFallback } from "./ImageWithFallback";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div className="restaurant-card" onClick={onClick}>
      <div className="restaurant-card-image-wrapper">
        <ImageWithFallback
          src={restaurant.mainImage}
          alt={restaurant.name}
          className="restaurant-card-image"
        />
        
        <div className="restaurant-card-badges">
          {restaurant.amenities.terrace && (
            <span className="restaurant-card-badge">Terraza</span>
          )}
          {restaurant.amenities.wifi && (
            <span className="restaurant-card-badge">WiFi</span>
          )}
          {restaurant.amenities.petFriendly && (
            <span className="restaurant-card-badge">Pet-friendly</span>
          )}
        </div>
      </div>

      <div className="restaurant-card-content">
        <div className="restaurant-card-header">
          <h3 className="restaurant-card-name">{restaurant.name}</h3>
          <span className="restaurant-card-price">
            ${(restaurant.price * 25 + Math.random() * 15).toFixed(2)}
          </span>
        </div>

        <p className="restaurant-card-cuisine">{restaurant.cuisine}</p>

        <div className="restaurant-card-location">
          <MapPin className="restaurant-card-location-icon" />
          <span>{restaurant.city}</span>
        </div>
      </div>
    </div>
  );
}
