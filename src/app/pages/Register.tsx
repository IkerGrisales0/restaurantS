import { Mail, Lock, Utensils, User, Phone, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";

// Schema de validación con Zod
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z
      .string()
      .min(1, "El email es requerido")
      .email("Por favor ingresa un email válido"),
    phone: z
      .string()
      .min(1, "El teléfono es requerido")
      .regex(/^[\d\s\-\+\(\)]+$/, "Teléfono inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterProps {
  onSwitchToLogin: () => void;
  onBackToHome: () => void;
}

export function Register({ onSwitchToLogin, onBackToHome }: RegisterProps) {
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // useEffect para limpiar errores cuando el componente monta
  useEffect(() => {
    if (registrationError) {
      setRegistrationError(null);
    }
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setRegistrationError(null);

      // Aquí iría la lógica de registro real (API call)
      alert(`¡Cuenta creada exitosamente!\n\nNombre: ${data.name}\nEmail: ${data.email}`);
      reset();
      onSwitchToLogin();
    } catch (error) {
      setRegistrationError("Error al crear la cuenta. Intenta de nuevo.");
      console.error("Error en registro:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <Utensils />
        </div>

        <h1 className="auth-title">ReservaFácil</h1>
        <p className="auth-subtitle">Crea tu cuenta</p>

        <div className="auth-card">
          {registrationError && (
            <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 mb-4">
              <AlertCircle size={18} />
              <span>{registrationError}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo: Nombre */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="name">
                Nombre completo
              </label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />
                <input
                  id="name"
                  {...register("name")}
                  type="text"
                  className={`auth-input ${errors.name ? "border-red-500" : ""}`}
                  placeholder="Juan Pérez"
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Campo: Email */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="email">
                Email
              </label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  className={`auth-input ${errors.email ? "border-red-500" : ""}`}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Campo: Teléfono */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="phone">
                Teléfono
              </label>
              <div className="auth-input-wrapper">
                <Phone className="auth-input-icon" />
                <input
                  id="phone"
                  {...register("phone")}
                  type="tel"
                  className={`auth-input ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="+34 600 000 000"
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  {errors.phone.message}
                </div>
              )}
            </div>

            {/* Campo: Contraseña */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="password">
                Contraseña
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  className={`auth-input ${errors.password ? "border-red-500" : ""}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Campo: Confirmar Contraseña */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="confirmPassword">
                Confirmar contraseña
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type="password"
                  className={`auth-input ${errors.confirmPassword ? "border-red-500" : ""}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>

          <div className="auth-footer">
            ¿Ya tienes cuenta?{" "}
            <button type="button" className="auth-link" onClick={onSwitchToLogin}>
              Inicia sesión
            </button>
          </div>
        </div>

        <button className="auth-back-button" onClick={onBackToHome}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
