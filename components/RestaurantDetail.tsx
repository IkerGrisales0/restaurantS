'use client'

import { X, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import type { Restaurant } from "@/data/restaurants"
import { useState } from "react"
import Image from "next/image"
import styles from "./styles/RestaurantDetail.module.css"

interface RestaurantDetailProps {
  restaurant: Restaurant
  onClose: () => void
  onReserve: () => void
}

export function RestaurantDetail({ restaurant, onClose, onReserve }: RestaurantDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % restaurant.images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? restaurant.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="restaurant-detail">
      <div className="restaurant-detail-hero">
        <Image
          src={restaurant.images[currentIndex]}
          alt={`${restaurant.name} - Imagen ${currentIndex + 1}`}
          fill
          className="restaurant-detail-hero-image"
          priority
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/1200x800/16a34a/ffffff?text=${encodeURIComponent(restaurant.name)}`;
          }}
        />
        
        <div className="restaurant-detail-hero-overlay" />
        
        {restaurant.images.length > 1 && (
          <>
            <button onClick={prevImage} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', color: 'white', border: 'none', cursor: 'pointer' }}>
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', color: 'white', border: 'none', cursor: 'pointer' }}>
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <button onClick={onClose} className="restaurant-detail-hero-close">
          <X size={20} />
        </button>

        <div className="restaurant-detail-hero-info">
          <h1 className="restaurant-detail-hero-name">{restaurant.name}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem' }}>{restaurant.cuisine}</p>
        </div>
      </div>

      <div className="restaurant-detail-content">
        <p className="restaurant-detail-description">{restaurant.description}</p>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-amber)' }}>
              <MapPin size={16} />
              <strong>Ubicación</strong>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>{restaurant.address}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>{restaurant.city}</p>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-amber)' }}>
              <Clock size={16} />
              <strong>Horario</strong>
            </div>
            {Object.entries(restaurant.hours).map(([day, hours]) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{day}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="restaurant-detail-booking">
        <button onClick={onReserve} className="restaurant-detail-booking-btn">
          Hacer una Reserva
        </button>
      </div>
    </div>
  )
}
