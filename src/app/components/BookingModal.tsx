import { X, Calendar, Users } from "lucide-react";
import { useState } from "react";
import type { Restaurant } from "../data/restaurants";

interface BookingModalProps {
  restaurant: Restaurant;
  onClose: () => void;
  onConfirm: (booking: BookingData) => void;
}

export interface BookingData {
  date: string;
  time: string;
  guests: number;
}

export function BookingModal({ restaurant, onClose, onConfirm }: BookingModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"
  ];

  const unavailableSlots = ["13:30", "20:00", "21:00"];
  const alternativeSlots = ["12:30", "14:00", "19:30", "22:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      alert("Por favor selecciona fecha y hora");
      return;
    }

    if (unavailableSlots.includes(time)) {
      setShowAlternatives(true);
      return;
    }

    onConfirm({ date, time, guests });
  };

  const selectAlternative = (altTime: string) => {
    setTime(altTime);
    setShowAlternatives(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="booking-modal-header">
          <div>
            <h2 className="booking-modal-title">Hacer una Reserva</h2>
            <p className="booking-modal-restaurant">{restaurant.name}</p>
            <p className="booking-modal-address">{restaurant.address}</p>
          </div>
          <button onClick={onClose} className="booking-modal-close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="booking-modal-form">
          {/* Fecha y Personas en una fila */}
          <div className="booking-modal-row">
            <div className="booking-modal-field">
              <label className="booking-modal-label">
                <Calendar size={16} />
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                required
                className="booking-modal-input"
              />
            </div>

            <div className="booking-modal-field">
              <label className="booking-modal-label">
                <Users size={16} />
                Personas
              </label>
              <div className="booking-modal-guests">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="booking-modal-guests-btn"
                >
                  -
                </button>
                <span className="booking-modal-guests-value">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests(Math.min(20, guests + 1))}
                  className="booking-modal-guests-btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Hora */}
          <div className="booking-modal-field">
            <label className="booking-modal-label">Hora</label>
            <div className="booking-modal-time-grid">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  disabled={unavailableSlots.includes(slot)}
                  className={`booking-modal-time-btn ${time === slot ? 'active' : ''}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Alternativas */}
          {showAlternatives && (
            <div className="booking-modal-alternatives">
              <p className="booking-modal-alternatives-text">
                Lo sentimos, {time} no está disponible. ¿Qué tal estas alternativas?
              </p>
              <div className="booking-modal-alternatives-grid">
                {alternativeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => selectAlternative(slot)}
                    className="booking-modal-alternative-btn"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="booking-modal-submit">
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
}