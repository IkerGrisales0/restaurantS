import { X, Calendar, Users } from "lucide-react";
import { useState } from "react";
import type { Restaurant } from "./restaurants";
import Swal from "sweetalert2";
import { bookingApi } from "../../services/api";

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

  const openingTime = (restaurant as any).opening_time || "12:00";
  const closingTime = (restaurant as any).closing_time || "22:00";

  const generateTimeSlots = () => {
    const slots = [];
    const [openHour, openMin] = openingTime.split(':').map(Number);
    const [closeHour, closeMin] = closingTime.split(':').map(Number);
    
    for (let h = openHour; h <= closeHour; h++) {
      for (let m = 0; m < 60; m += 30) {
        if (h === closeHour && m > closeMin) break;
        const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        slots.push(timeStr);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const unavailableSlots = ["13:30", "20:00", "21:00"];
  const alternativeSlots = ["12:30", "14:00", "19:30", "22:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor selecciona fecha y hora",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (unavailableSlots.includes(time)) {
      setShowAlternatives(true);
      return;
    }

    handleConfirmBooking();
  };

  const handleConfirmBooking = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        await Swal.fire({
          title: "Inicia sesión",
          text: "Debes iniciar sesión para hacer una reserva",
          icon: "info",
          confirmButtonText: "Ok",
        });
        return;
      }

      const response = await bookingApi.createBooking({
        restaurantId: restaurant.id,
        date,
        time,
        guests,
        specialRequests: "",
      });

      if (!response.success) {
        throw new Error(response.error || "Error al crear la reserva");
      }

      await Swal.fire({
        title: "¡Reserva confirmada!",
        html: `
          <p><strong>Restaurante:</strong> ${restaurant.name}</p>
          <p><strong>Fecha:</strong> ${date}</p>
          <p><strong>Hora:</strong> ${time}</p>
          <p><strong>Personas:</strong> ${guests}</p>
          <br>
          <p>Recibirás un email de confirmación.</p>
        `,
        icon: "success",
        confirmButtonText: "¡Genial!",
        confirmButtonColor: "#10b981",
      });

      onConfirm({ date, time, guests });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al crear la reserva";
      await Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Reintentar",
      });
    }
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