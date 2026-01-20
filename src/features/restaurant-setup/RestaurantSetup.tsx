import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Wifi,
  Umbrella,
  PawPrint,
  MapPin,
  Clock,
  DollarSign,
  Type,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import "./restaurant-setup.css";

interface RestaurantForm {
  name: string;
  cuisine: string;
  city: string;
  address: string;
  price: number;
  description: string;
  hours: {
    [key: string]: string;
  };
  amenities: {
    wifi: boolean;
    terrace: boolean;
    petFriendly: boolean;
  };
}

interface RestaurantSetupProps {
  onComplete: (data: RestaurantForm) => void;
  onCancel: () => void;
}

export function RestaurantSetup({ onComplete, onCancel }: RestaurantSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<RestaurantForm>({
    name: "",
    cuisine: "",
    city: "",
    address: "",
    price: 2,
    description: "",
    hours: {
      "Lunes-Viernes": "13:00 - 16:00, 20:00 - 23:30",
      "Sábado-Domingo": "13:00 - 00:00",
    },
    amenities: {
      wifi: false,
      terrace: false,
      petFriendly: false,
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleHoursChange = (day: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: value,
      },
    }));
  };

  const handleAmenityChange = (amenity: keyof typeof form.amenities) => {
    setForm((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  const isStep1Valid = form.name && form.cuisine && form.city && form.address;
  const isStep2Valid = form.description;
  const isStep3Valid = true;

  const handleNext = () => {
    if (currentStep === 1 && !isStep1Valid) return;
    if (currentStep === 2 && !isStep2Valid) return;
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleSubmit = () => {
    if (isStep1Valid && isStep2Valid && isStep3Valid) {
      onComplete(form);
    }
  };

  return (
    <div className="setup-page">
      <div className="setup-container">
        <button className="setup-back-button" onClick={onCancel}>
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="setup-header">
          <h1 className="setup-title">Configura tu Restaurante</h1>
          <p className="setup-subtitle">
            Completa la información de tu restaurante para que los usuarios
            puedan encontrarte
          </p>
        </div>

        <div className="setup-progress">
          <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>
            <div className="progress-number">1</div>
            <span className="progress-label">Información Básica</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>
            <div className="progress-number">2</div>
            <span className="progress-label">Descripción</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
            <div className="progress-number">3</div>
            <span className="progress-label">Amenidades</span>
          </div>
        </div>

        <div className="setup-card">
          {/* PASO 1: Información Básica */}
          {currentStep === 1 && (
            <div className="setup-form">
              <h2 className="form-section-title">Información Básica</h2>

              <div className="form-group">
                <label className="form-label">
                  <Type size={18} />
                  Nombre del Restaurante
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: La Trattoria"
                  value={form.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tipo de Cocina</label>
                  <select
                    className="form-input"
                    value={form.cuisine}
                    onChange={(e) =>
                      handleInputChange("cuisine", e.target.value)
                    }
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="Italiana">Italiana</option>
                    <option value="Asiática">Asiática</option>
                    <option value="Española">Española</option>
                    <option value="Francesa">Francesa</option>
                    <option value="Americana">Americana</option>
                    <option value="Vegetariana">Vegetariana</option>
                    <option value="Fusión">Fusión</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MapPin size={18} />
                    Ciudad
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ej: Madrid"
                    value={form.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MapPin size={18} />
                  Dirección
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Calle Mayor 45, Madrid"
                  value={form.address}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <DollarSign size={18} />
                  Rango de Precios
                </label>
                <div className="price-selector">
                  {[1, 2, 3, 4].map((price) => (
                    <button
                      key={price}
                      className={`price-button ${
                        form.price === price ? "active" : ""
                      }`}
                      onClick={() => handleInputChange("price", price)}
                    >
                      {"$".repeat(price)}
                    </button>
                  ))}
                </div>
                <p className="form-help-text">
                  1 = Económico | 2 = Moderado | 3 = Caro | 4 = Muy Caro
                </p>
              </div>
            </div>
          )}

          {/* PASO 2: Descripción y Horarios */}
          {currentStep === 2 && (
            <div className="setup-form">
              <h2 className="form-section-title">Descripción y Horarios</h2>

              <div className="form-group">
                <label className="form-label">
                  <FileText size={18} />
                  Descripción del Restaurante
                </label>
                <textarea
                  className="form-textarea"
                  placeholder="Describe tu restaurante, especialidades, atmósfera, etc."
                  value={form.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                />
                <p className="form-help-text">
                  {form.description.length} / 500 caracteres
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock size={18} />
                  Horarios de Apertura
                </label>

                {Object.keys(form.hours).map((day) => (
                  <div key={day} className="hours-input-group">
                    <label className="hours-day-label">{day}</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ej: 13:00 - 16:00, 20:00 - 23:30"
                      value={form.hours[day]}
                      onChange={(e) => handleHoursChange(day, e.target.value)}
                    />
                  </div>
                ))}

                <p className="form-help-text">
                  Usa el formato: HH:MM - HH:MM (puedes añadir múltiples horarios
                  separados por comas)
                </p>
              </div>
            </div>
          )}

          {/* PASO 3: Amenidades */}
          {currentStep === 3 && (
            <div className="setup-form">
              <h2 className="form-section-title">Amenidades y Características</h2>

              <p className="form-description">
                Selecciona qué servicios ofrece tu restaurante
              </p>

              <div className="amenities-grid">
                <div
                  className={`amenity-card ${
                    form.amenities.wifi ? "active" : ""
                  }`}
                  onClick={() => handleAmenityChange("wifi")}
                >
                  <div className="amenity-icon">
                    <Wifi size={32} />
                  </div>
                  <h3 className="amenity-title">WiFi Gratis</h3>
                  <p className="amenity-description">
                    Tu restaurante ofrece conexión WiFi
                  </p>
                  {form.amenities.wifi && (
                    <CheckCircle className="amenity-check" size={24} />
                  )}
                </div>

                <div
                  className={`amenity-card ${
                    form.amenities.terrace ? "active" : ""
                  }`}
                  onClick={() => handleAmenityChange("terrace")}
                >
                  <div className="amenity-icon">
                    <Umbrella size={32} />
                  </div>
                  <h3 className="amenity-title">Terraza</h3>
                  <p className="amenity-description">
                    Tienes espacio de terraza exterior
                  </p>
                  {form.amenities.terrace && (
                    <CheckCircle className="amenity-check" size={24} />
                  )}
                </div>

                <div
                  className={`amenity-card ${
                    form.amenities.petFriendly ? "active" : ""
                  }`}
                  onClick={() => handleAmenityChange("petFriendly")}
                >
                  <div className="amenity-icon">
                    <PawPrint size={32} />
                  </div>
                  <h3 className="amenity-title">Pet Friendly</h3>
                  <p className="amenity-description">
                    Permites mascotas en tu restaurante
                  </p>
                  {form.amenities.petFriendly && (
                    <CheckCircle className="amenity-check" size={24} />
                  )}
                </div>
              </div>

              <div className="setup-info">
                <AlertCircle size={20} />
                <p>
                  Estos datos ayudan a los clientes a filtrar restaurantes
                  según sus preferencias
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="setup-buttons">
          <button
            className="button-secondary"
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
              } else {
                onCancel();
              }
            }}
          >
            {currentStep === 1 ? "Cancelar" : "Anterior"}
          </button>

          {currentStep < 3 ? (
            <button
              className={`button-primary ${
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid)
                  ? "disabled"
                  : ""
              }`}
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid)
              }
            >
              Siguiente
            </button>
          ) : (
            <button
              className="button-primary"
              onClick={handleSubmit}
            >
              Completar Configuración
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
