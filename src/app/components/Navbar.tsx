import { Utensils } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onLogoClick?: () => void;
}

export function Navbar({ onLoginClick, onRegisterClick, onLogoClick }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="navbar-logo" onClick={onLogoClick}>
          <div className="navbar-logo-icon">
            <Utensils size={20} />
          </div>
          <span className="navbar-logo-text">ReservaFácil</span>
        </button>

        <div className="navbar-actions">
          <button className="btn btn-secondary" onClick={onLoginClick}>
            Iniciar sesión
          </button>
          <button className="btn btn-primary" onClick={onRegisterClick}>
            Registrarse
          </button>
        </div>
      </div>
    </nav>
  );
}