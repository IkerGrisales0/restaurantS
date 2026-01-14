import { Mail, Lock, Utensils } from "lucide-react";

interface LoginProps {
  onSwitchToRegister: () => void;
  onBackToHome: () => void;
}

export function Login({ onSwitchToRegister, onBackToHome }: LoginProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    alert(`Bienvenido!\n\nEmail: ${email}\n\n(Esta es una demostración)`);
    onBackToHome();
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
          <form className="auth-form" onSubmit={handleSubmit}>
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
                  placeholder="admin@admin.com"
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
                />
              </div>
            </div>

            <button type="submit" className="auth-submit">
              Iniciar Sesión
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
