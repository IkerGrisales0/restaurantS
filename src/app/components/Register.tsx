import { Mail, Lock, Utensils, User, Phone } from "lucide-react";

interface RegisterProps {
  onSwitchToLogin: () => void;
  onBackToHome: () => void;
}

export function Register({ onSwitchToLogin, onBackToHome }: RegisterProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    alert(
      `¡Cuenta creada exitosamente! 🎉\n\nNombre: ${name}\nEmail: ${email}\n\n(Esta es una demostración)`
    );
    onSwitchToLogin();
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
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="name">
                Nombre completo
              </label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="auth-input"
                  placeholder="Juan Pérez"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="email">
                Email
              </label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="auth-input"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="phone">
                Teléfono
              </label>
              <div className="auth-input-wrapper">
                <Phone className="auth-input-icon" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="auth-input"
                  placeholder="+34 600 000 000"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="password">
                Contraseña
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="confirmPassword">
                Confirmar contraseña
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button type="submit" className="auth-submit">
              Crear Cuenta
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
