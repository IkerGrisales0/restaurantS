"use client"

import { MapPin } from "lucide-react"
import type { Restaurant } from "@/data/restaurants"
import Image from "next/image"
import styles from "./styles/RestaurantCard.module.css"

interface RestaurantCardProps {
  restaurant: Restaurant
  onClick: () => void
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div className="restaurant-card" onClick={onClick}>
      <div className="restaurant-card-image-wrapper">
        <Image
          src={restaurant.mainImage}
          alt={restaurant.name}
          fill
          className="restaurant-card-image"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/800x600/16a34a/ffffff?text=${encodeURIComponent(restaurant.name)}`;
          }}
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
            {"$".repeat(restaurant.price)}
          </span>
        </div>

        <p className="restaurant-card-cuisine">{restaurant.cuisine}</p>

        <div className="restaurant-card-location">
          <MapPin size={14} />
          <span>{restaurant.city}</span>
        </div>
      </div>
    </div>
  )
}
