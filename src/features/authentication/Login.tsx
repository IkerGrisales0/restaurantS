import { Mail, Lock, Utensils, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authApi } from "../../services/api";

// Schema de validación con Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Por favor ingresa un email válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .min(1, "La contraseña es requerida"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
  onSwitchToRegister: () => void;
  onBackToHome: () => void;
  onLoginSuccess?: (userData?: { 
    email: string; 
    name: string; 
    phone: string; 
    address?: string; 
    role?: string;
    restaurantSetupComplete?: boolean;
    restaurant?: any;
  }) => void;
}

export function Login({ onSwitchToRegister, onBackToHome, onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [roleTab, setRoleTab] = useState<'customer' | 'restaurant'>('customer');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError(null);

      // Iniciar sesión en el backend
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });

      if (!response.success) {
        throw new Error(response.error || "Error al iniciar sesión");
      }

      // Guardar token y rol en localStorage
      if (response.data?.session?.access_token) {
        localStorage.setItem("authToken", response.data.session.access_token);
      }
      if (response.data?.user?.role) {
        localStorage.setItem("userRole", response.data.user.role);
        localStorage.setItem("userEmail", response.data.user.email || "");
      }

      // Mostrar alerta de éxito
      await Swal.fire({
        title: "¡Bienvenido!",
        text: `Has iniciado sesión como ${response.data?.user?.email}`,
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#10b981",
        timer: 2000,
      });

      reset();
      // Pasar datos del usuario al callback
      const userData = {
        email: response.data?.user?.email || "",
        name: response.data?.user?.name || "",
        phone: response.data?.user?.phone || "",
        address: response.data?.user?.address || "",
        role: response.data?.user?.role || "",
        restaurantSetupComplete: response.data?.restaurantSetupComplete || false,
        restaurant: response.data?.restaurant || null,
      };
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      } else {
        onBackToHome();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al iniciar sesión";
      setLoginError(errorMessage);
      console.error("Error al iniciar sesión:", error);

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
        <p className="auth-subtitle">Bienvenido de vuelta</p>

        <div className="auth-card">
          {loginError && (
            <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 mb-4">
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Tabs para rol (visual) */}
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

            <button
              type="submit"
              className="auth-submit disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="auth-footer">
            ¿No tienes cuenta?{" "}
            <button type="button" className="auth-link" onClick={() => navigate('/auth/register')}>
              Regístrate
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
