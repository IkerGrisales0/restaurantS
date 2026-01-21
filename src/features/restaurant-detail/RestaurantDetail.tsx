import { X, MapPin, Clock, Phone, Mail, DollarSign } from "lucide-react";
import type { Restaurant } from "../common/restaurants";
import { useState } from "react";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
  onBooking: () => void;
}

export function RestaurantDetail({ restaurant, onBack, onBooking }: RestaurantDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const openingTime = (restaurant as any).opening_time || "13:00";
  const closingTime = (restaurant as any).closing_time || "23:30";
  const priceRange = '$'.repeat((restaurant as any).average_price || restaurant.price || 3);

  return (
    <div className="restaurant-detail-page">
      {/* Header con botón de volver */}
      <div className="detail-header">
        <button onClick={onBack} className="detail-back-btn">
          <X size={24} />
          Volver
        </button>
      </div>

      {/* Contenedor principal */}
      <div className="detail-container">
        {/* Imagen principal */}
        <div className="detail-image-section">
          <ImageWithFallback
            src={restaurant.images[currentIndex]}
            alt={restaurant.name}
            className="detail-main-image"
          />
        </div>

        {/* Información del restaurante */}
        <div className="detail-content">
          <div className="detail-content-inner">
            {/* Título y tipo */}
            <div className="detail-title-section">
              <h1 className="detail-title">{restaurant.name}</h1>
              <div className="detail-meta">
                <span className="detail-badge">{(restaurant as any).cuisine_type || restaurant.cuisine}</span>
                <span className="detail-price">{priceRange}</span>
              </div>
            </div>

            {/* Descripción */}
            <div className="detail-section">
              <p className="detail-description">{restaurant.description}</p>
            </div>

            {/* Información de contacto */}
            <div className="detail-info-grid">
              <div className="detail-info-card">
                <div className="detail-info-icon">
                  <MapPin size={20} />
                </div>
                <div className="detail-info-content">
                  <h3 className="detail-info-label">Dirección</h3>
                  <p className="detail-info-value">{restaurant.address}</p>
                </div>
              </div>

              <div className="detail-info-card">
                <div className="detail-info-icon">
                  <Phone size={20} />
                </div>
                <div className="detail-info-content">
                  <h3 className="detail-info-label">Teléfono</h3>
                  <p className="detail-info-value">{(restaurant as any).phone || '3111'}</p>
                </div>
              </div>

              <div className="detail-info-card">
                <div className="detail-info-icon">
                  <Mail size={20} />
                </div>
                <div className="detail-info-content">
                  <h3 className="detail-info-label">Email</h3>
                  <p className="detail-info-value">{(restaurant as any).email || 'contacto@restaurante.com'}</p>
                </div>
              </div>

              <div className="detail-info-card">
                <div className="detail-info-icon">
                  <Clock size={20} />
                </div>
                <div className="detail-info-content">
                  <h3 className="detail-info-label">Horario</h3>
                  <p className="detail-info-value">{openingTime} - {closingTime}</p>
                </div>
              </div>
            </div>

            {/* Botón de reserva */}
            <button onClick={onBooking} className="detail-reserve-btn">
              Reservar Mesa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
