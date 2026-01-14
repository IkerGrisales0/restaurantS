import { Mail, Lock, Utensils, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
}

export function Login({ onSwitchToRegister, onBackToHome }: LoginProps) {
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
      // Aquí iría la lógica de autenticación real
      alert(`¡Bienvenido!\n\nEmail: ${data.email}`);
      reset();
      onBackToHome();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="admin@admin.com"
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
            <button type="button" className="auth-link" onClick={onSwitchToRegister}>
              Regístrate
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
