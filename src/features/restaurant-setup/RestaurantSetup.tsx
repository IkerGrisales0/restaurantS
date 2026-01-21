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
  Car,
  Accessibility,
  Wind,
  Music,
  Truck,
  CreditCard,
} from "lucide-react";
import Swal from "sweetalert2";
import { restaurantApi } from "../../services/api";
import "./restaurant-setup.css";

interface RestaurantForm {
  name: string;
  cuisine: string;
  city: string;
  address: string;
  price: number;
  description: string;
  openingTime: string;
  closingTime: string;
  amenities: {
    wifi: boolean;
    terrace: boolean;
    petFriendly: boolean;
    parking: boolean;
    wheelchair: boolean;
    airConditioning: boolean;
    liveMusic: boolean;
    delivery: boolean;
    cardPayment: boolean;
  };
}

interface RestaurantSetupProps {
  onComplete: (data: RestaurantForm) => void;
  onCancel: () => void;
  initialData?: {
    email: string;
    name: string;
    phone: string;
    address?: string;
  };
}

export function RestaurantSetup({ onComplete, onCancel, initialData }: RestaurantSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<RestaurantForm>({
    name: initialData?.name || "",
    cuisine: "",
    city: initialData?.address?.split(',').pop()?.trim() || "",
    address: initialData?.address || "",
    price: 2,
    description: "",
    openingTime: "13:00",
    closingTime: "23:30",
    amenities: {
      wifi: false,
      terrace: false,
      petFriendly: false,
      parking: false,
      wheelchair: false,
      airConditioning: false,
      liveMusic: false,
      delivery: false,
      cardPayment: false,
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
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

  const handleSubmit = async () => {
    if (isStep1Valid && isStep2Valid && isStep3Valid) {
      setIsSubmitting(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No hay sesión activa");
        }

        const restaurantData = await restaurantApi.getMyRestaurant();
        
        if (!restaurantData || !restaurantData.id) {
          throw new Error("No se encontró el restaurante");
        }

        const opening = form.openingTime.substring(0, 5);
        const closing = form.closingTime.substring(0, 5);

        console.log('Enviando actualización:', {
          cuisine_type: form.cuisine,
          description: form.description,
          opening_time: opening,
          closing_time: closing,
          average_price: form.price * 25,
        });

        await restaurantApi.updateRestaurant(
          restaurantData.id,
          {
            cuisine_type: form.cuisine,
            description: form.description,
            opening_time: opening,
            closing_time: closing,
            average_price: form.price * 25,
          },
          token
        );

        await Swal.fire({
          title: "¡Setup completado!",
          text: "Tu restaurante está listo. Bienvenido al dashboard.",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#10b981",
        });

        onComplete(form);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error al completar setup";
        await Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Reintentar",
        });
      } finally {
        setIsSubmitting(false);
      }
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
                  {[
                    { value: 1, label: '$', range: '€5-15', desc: 'Económico' },
                    { value: 2, label: '$$', range: '€15-30', desc: 'Moderado' },
                    { value: 3, label: '$$$', range: '€30-50', desc: 'Caro' },
                    { value: 4, label: '$$$$', range: '€50+', desc: 'Muy Caro' }
                  ].map((price) => (
                    <button
                      key={price.value}
                      type="button"
                      className={`price-button ${
                        form.price === price.value ? "active" : ""
                      }`}
                      onClick={() => handleInputChange("price", price.value)}
                    >
                      <div className="price-symbol">{price.label}</div>
                      <div className="price-range">{price.range}</div>
                      <div className="price-desc">{price.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

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
                  Horario de Atención
                </label>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Hora de Apertura</label>
                    <input
                      type="time"
                      className="form-input"
                      value={form.openingTime}
                      onChange={(e) => handleInputChange("openingTime", e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hora de Cierre</label>
                    <input
                      type="time"
                      className="form-input"
                      value={form.closingTime}
                      onChange={(e) => handleInputChange("closingTime", e.target.value)}
                    />
                  </div>
                </div>

                <p className="form-help-text">
                  Horario general de atención del restaurante
                </p>
              </div>
            </div>
          )}

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

                <div
                  className={`amenity-card ${
                    form.amenities.parking ? "active" : ""
                  }`}
                  onClick={() => handleAmenityChange("parking")}
                >
                  <div className="amenity-icon">
                    <Car size={32} />
                  </div>
                  <h3 className="amenity-title">Estacionamiento</h3>
                  <p className="amenity-description">
                    Cuentas con estacionamiento para clientes
                  </p>
                  {form.amenities.parking && (
                    <CheckCircle className="amenity-check" size={24} />
                  )}
                </div>

                <div
                  className={`amenity-card ${
                    form.amenities.wheelchair ? "active" : ""
                  }`}
                  onClick={() => handleAmenityChange("wheelchair")}
                >
                  <div className="amenity-icon">
                    <Accessibility size={32} />
                  </div>
                  <h3 className="amenity-title">Accesibilidad</h3>
                  <p className="amenity-description">
                    Acceso para sillas de ruedas
                  </p>
                  {form.amenities.wheelchair && (
                    <CheckCircle className="amenity-check" size={24} />
                  )}
                </div>

                <div
                  className={`amenity-card ${
                    form.amenities.airConditioning ? "active" : ""
                  }`}
                  onClick={() => handleAmenityChange("airConditioning")}
                >
                  <div className="amenity-icon">
                    <Wind size={32} />
                  </div>
                  <h3 className="amenity-title">Aire Acondicionado</h3>
                  <p className="amenity-description">
                    Ambiente climatizado
                  </p>
                  {form.amenities.airConditioning && (
                    <CheckCircle className="amenity-check" size={24} />
                  )}
                </div>

                <div
                  className={`amenity-card ${
                    form.amenities.liveMusic ? "active" : ""
                  }`}
                  onClick={() => handleAmenityChange("liveMusic")}
                >
                  <div className="amenity-icon">
                    <Music size={32} />
                  </div>
                  <h3 className="amenity-title">Música en Vivo</h3>
                  <p className="amenity-description">
                    Espectáculos musicales en vivo
                  </p>
                  {form.amenities.liveMusic && (
                    <CheckCircle className="amenity-check" size={24} />
                  )}
                </div>

                <div
                  className={`amenity-card ${
                    form.amenities.delivery ? "active" : ""
                  }`}
                  onClick={() => handleAmenityChange("delivery")}
                >
                  <div className="amenity-icon">
                    <Truck size={32} />
                  </div>
                  <h3 className="amenity-title">Delivery</h3>
                  <p className="amenity-description">
                    Servicio de entrega a domicilio
                  </p>
                  {form.amenities.delivery && (
                    <CheckCircle className="amenity-check" size={24} />
                  )}
                </div>

                <div
                  className={`amenity-card ${
                    form.amenities.cardPayment ? "active" : ""
                  }`}
                  onClick={() => handleAmenityChange("cardPayment")}
                >
                  <div className="amenity-icon">
                    <CreditCard size={32} />
                  </div>
                  <h3 className="amenity-title">Pago con Tarjeta</h3>
                  <p className="amenity-description">
                    Aceptas tarjetas de crédito/débito
                  </p>
                  {form.amenities.cardPayment && (
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Completar Configuración"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
