import { X, MapPin, Clock, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import type { Restaurant } from "../common/restaurants";
import { useState } from "react";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onClose: () => void;
  onReserve: () => void;
}

export function RestaurantDetail({ restaurant, onClose, onReserve }: RestaurantDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % restaurant.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? restaurant.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="restaurant-detail">
      {/* Hero Image Gallery */}
      <div className="restaurant-detail-hero">
        <ImageWithFallback
          src={restaurant.images[currentIndex]}
          alt={`${restaurant.name} - Imagen ${currentIndex + 1}`}
          className="restaurant-detail-hero-image"
        />
        
        <div className="restaurant-detail-hero-overlay" />
        
        {/* Navigation arrows */}
        {restaurant.images.length > 1 && (
          <>
            <button onClick={prevImage} className="restaurant-detail-hero-nav-btn prev">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="restaurant-detail-hero-nav-btn next">
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Top buttons */}
        <div className="restaurant-detail-hero-top">
          <button onClick={onClose} className="restaurant-detail-hero-close">
            <X size={20} />
          </button>
          <button 
            onClick={() => setIsFavorite(!isFavorite)} 
            className={`restaurant-detail-hero-favorite ${isFavorite ? 'active' : ''}`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Image counter */}
        {restaurant.images.length > 1 && (
          <div className="restaurant-detail-hero-counter">
            {currentIndex + 1} / {restaurant.images.length}
          </div>
        )}

        {/* Restaurant info overlay */}
        <div className="restaurant-detail-hero-info">
          <h1 className="restaurant-detail-hero-name">{restaurant.name}</h1>

          <div className="restaurant-detail-hero-badges">
            <span className="restaurant-detail-hero-badge">{restaurant.cuisine}</span>
            {restaurant.amenities.terrace && (
              <span className="restaurant-detail-hero-badge">Terraza</span>
            )}
            {restaurant.amenities.wifi && (
              <span className="restaurant-detail-hero-badge">WiFi</span>
            )}
            {restaurant.amenities.petFriendly && (
              <span className="restaurant-detail-hero-badge">Pet-friendly</span>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail gallery */}
      {restaurant.images.length > 1 && (
        <div className="restaurant-detail-thumbnails">
          <div className="restaurant-detail-thumbnails-wrapper">
            {restaurant.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`restaurant-detail-thumbnail ${index === currentIndex ? 'active' : ''}`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="restaurant-detail-thumbnail-image" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="restaurant-detail-content">
        <div className="restaurant-detail-description">
          <p className="restaurant-detail-description-text">{restaurant.description}</p>
        </div>

        <div className="restaurant-detail-info">
          <div className="restaurant-detail-info-card">
            <div className="restaurant-detail-info-title">
              <MapPin className="restaurant-detail-info-icon" />
              Ubicación
            </div>
            <p className="restaurant-detail-info-text">{restaurant.address}</p>
            <p className="restaurant-detail-info-text">{restaurant.city}</p>
          </div>

          <div className="restaurant-detail-info-card">
            <div className="restaurant-detail-info-title">
              <Clock className="restaurant-detail-info-icon" />
              Horario
            </div>
            {Object.entries(restaurant.hours).map(([day, hours]) => (
              <div key={day} className="restaurant-detail-info-hours">
                <span className="restaurant-detail-info-hours-day">{day}</span>
                <span className="restaurant-detail-info-hours-time">{hours}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="restaurant-detail-stats">
          <div className="restaurant-detail-stat">
            <div className="restaurant-detail-stat-value">${(restaurant.price * 25 + Math.random() * 15).toFixed(2)}</div>
            <div className="restaurant-detail-stat-label">Rango de precio</div>
          </div>
          <div className="restaurant-detail-stat">
            <div className="restaurant-detail-stat-value">{restaurant.city}</div>
            <div className="restaurant-detail-stat-label">Ciudad</div>
          </div>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="restaurant-detail-booking">
        <button onClick={onReserve} className="restaurant-detail-booking-btn">
          Hacer una Reserva
        </button>
      </div>
    </div>
  );
}
