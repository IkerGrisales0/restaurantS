'use client'

import { RestaurantCard } from "./RestaurantCard"
import type { Restaurant } from "@/data/restaurants"
import styles from "./styles/RestaurantGrid.module.css"

interface RestaurantGridProps {
  restaurants: Restaurant[]
  onRestaurantClick: (restaurant: Restaurant) => void
}

export function RestaurantGrid({ restaurants, onRestaurantClick }: RestaurantGridProps) {
  return (
    <div className="restaurant-grid">
      <div className="restaurant-grid-container">
        <div className="restaurant-grid-header">
          <h2 className="restaurant-grid-title">
            Restaurantes Destacados
          </h2>
          <p className="restaurant-grid-count">
            {restaurants.length} restaurante{restaurants.length !== 1 ? "s" : ""} disponible{restaurants.length !== 1 ? "s" : ""}
          </p>
        </div>

        {restaurants.length === 0 ? (
          <div className="restaurant-grid-empty">
            <p className="restaurant-grid-empty-title">No se encontraron restaurantes</p>
            <p className="restaurant-grid-empty-text">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        ) : (
          <div className="restaurant-grid-items">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => onRestaurantClick(restaurant)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}