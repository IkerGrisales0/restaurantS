import { Mail, Lock, Utensils, User, Phone, AlertCircle, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authApi } from "../../services/api";

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
    address: z.string().optional(),
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
  onCompleteSetup?: (userData: { email: string; name: string; phone: string; role: string }) => void;
}

export function Register({ onSwitchToLogin, onBackToHome, onCompleteSetup }: RegisterProps) {
    const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [roleTab, setRoleTab] = useState<'customer' | 'restaurant'>('customer');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (registrationError) {
      setRegistrationError(null);
    }
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setRegistrationError(null);

        const role = roleTab;

        if (role === 'restaurant' && (!data.address || !data.address.trim())) {
          await Swal.fire({
            title: "Falta la dirección",
            text: "La dirección es obligatoria para cuentas de restaurante",
            icon: "warning",
            confirmButtonText: "Entendido",
            confirmButtonColor: "#10b981",
          });
          return;
        }

        const response = await authApi.register({
          email: data.email,
          password: data.password,
          role,
          restaurantName: role === 'restaurant' ? data.name : undefined,
          address: role === 'restaurant' ? data.address : undefined,
          phone: data.phone,
        });

        if (!response.success) {
          throw new Error(response.error || "Error al crear la cuenta");
        }

        await Swal.fire({
          title: "¡Cuenta creada!",
          text: "Tu cuenta ha sido creada exitosamente. Por favor inicia sesión.",
          icon: "success",
          confirmButtonText: "Ir a Login",
          confirmButtonColor: "#10b981",
          timer: 3000,
        });

        reset();
        navigate('/auth/login');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error al crear la cuenta";
        setRegistrationError(errorMessage);
      console.error("Error en registro:", error);

        await Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Reintentar",
        });
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
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab ${roleTab === 'customer' ? 'active' : ''}`}
                onClick={() => setRoleTab('customer')}
              >
                Cliente
              </button>
              <button
                type="button"
                className={`auth-tab ${roleTab === 'restaurant' ? 'active' : ''}`}
                onClick={() => setRoleTab('restaurant')}
              >
                Restaurante
              </button>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="name">
                {roleTab === 'restaurant' ? 'Nombre del restaurante' : 'Nombre completo'}
              </label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />
                <input
                  id="name"
                  {...register("name")}
                  type="text"
                  className={`auth-input ${errors.name ? "border-red-500" : ""}`}
                  placeholder={roleTab === 'restaurant' ? 'Mi Restaurante' : 'Juan Pérez'}
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  {errors.name.message}
                </div>
              )}
            </div>

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

            {roleTab === 'restaurant' && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="address">
                  Dirección
                </label>
                <div className="auth-input-wrapper">
                  <MapPin className="auth-input-icon" />
                  <input
                    id="address"
                    {...register("address")}
                    type="text"
                    className={`auth-input ${errors.address ? "border-red-500" : ""}`}
                    placeholder="Calle Principal 123, Madrid"
                  />
                </div>
                {errors.address && (
                  <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                    <AlertCircle size={16} />
                    {errors.address.message}
                  </div>
                )}
              </div>
            )}

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
              {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>

          <div className="auth-footer">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              className="auth-link"
              onClick={() => navigate('/auth/login')}
            >
              Inicia sesión
            </button>
          </div>
        </div>

        <button className="auth-back-button" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
