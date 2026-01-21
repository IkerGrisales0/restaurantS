import { User, Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Swal from "sweetalert2";

// Schema de validación
const userProfileSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  address: z.string().optional(),
  preferences: z.string().optional(),
});

type UserProfileData = z.infer<typeof userProfileSchema>;

interface UserProfileProps {
  email: string;
  name: string;
  phone: string;
  onComplete: () => void;
}

export function UserProfile({ email, name, phone, onComplete }: UserProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name,
      phone,
      address: "",
      preferences: "",
    },
  });

  const onSubmit = async (data: UserProfileData) => {
    try {
      // Aquí se podría guardar información adicional del usuario
      console.log("Perfil de usuario completado:", data);

      await Swal.fire({
        title: "¡Perfil completado!",
        text: "Tu cuenta ha sido creada exitosamente",
        icon: "success",
        confirmButtonText: "Comenzar",
        confirmButtonColor: "#10b981",
      });

      onComplete();
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Hubo un problema al completar tu perfil",
        icon: "error",
        confirmButtonText: "Reintentar",
      });
    }
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        <div className="user-profile-header">
          <div className="user-profile-icon">
            <User size={48} />
          </div>
          <h1 className="user-profile-title">Completa tu Perfil</h1>
          <p className="user-profile-subtitle">
            Solo necesitamos algunos datos básicos para personalizar tu experiencia
          </p>
        </div>

        <div className="user-profile-card">
          <form className="user-profile-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email (solo lectura) */}
            <div className="user-profile-field">
              <label className="user-profile-label" htmlFor="email">
                <Mail size={16} />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                disabled
                className="user-profile-input disabled"
              />
            </div>

            {/* Nombre */}
            <div className="user-profile-field">
              <label className="user-profile-label" htmlFor="name">
                <User size={16} />
                Nombre completo
              </label>
              <input
                id="name"
                {...register("name")}
                type="text"
                className={`user-profile-input ${errors.name ? "border-red-500" : ""}`}
                placeholder="Tu nombre"
              />
              {errors.name && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Teléfono */}
            <div className="user-profile-field">
              <label className="user-profile-label" htmlFor="phone">
                <Phone size={16} />
                Teléfono
              </label>
              <input
                id="phone"
                {...register("phone")}
                type="tel"
                className={`user-profile-input ${errors.phone ? "border-red-500" : ""}`}
                placeholder="+34 600 000 000"
              />
              {errors.phone && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  {errors.phone.message}
                </div>
              )}
            </div>

            {/* Dirección (opcional) */}
            <div className="user-profile-field">
              <label className="user-profile-label" htmlFor="address">
                <MapPin size={16} />
                Dirección (opcional)
              </label>
              <input
                id="address"
                {...register("address")}
                type="text"
                className="user-profile-input"
                placeholder="Tu dirección"
              />
            </div>

            {/* Preferencias (opcional) */}
            <div className="user-profile-field">
              <label className="user-profile-label" htmlFor="preferences">
                Preferencias alimentarias (opcional)
              </label>
              <textarea
                id="preferences"
                {...register("preferences")}
                className="user-profile-textarea"
                rows={3}
                placeholder="Ej: vegetariano, alérgico al gluten, etc."
              />
            </div>

            <button
              type="submit"
              className="user-profile-submit disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Completando..." : "Completar Perfil"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
