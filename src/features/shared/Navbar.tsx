import { Utensils, LogOut } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
  onLogoClick?: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function Navbar({ onLoginClick, onLogoClick, isAuthenticated, onLogout }: NavbarProps) {
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
          {isAuthenticated ? (
            <button className="btn btn-secondary" onClick={onLogout}>
              <LogOut size={16} />
              Cerrar sesión
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onLoginClick}>
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}