import { Utensils } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
  onLogoClick?: () => void;
}

export function Navbar({ onLoginClick, onLogoClick }: NavbarProps) {
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
          <button className="btn btn-primary" onClick={onLoginClick}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}