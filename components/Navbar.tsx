"use client"

import { Utensils } from "lucide-react"
import styles from "./styles/Navbar.module.css"

interface NavbarProps {
  onLoginClick?: () => void
  onRegisterClick?: () => void
}

export function Navbar({ onLoginClick, onRegisterClick }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className="navbar-logo-icon">
            <Utensils size={20} />
          </div>
          <span className="navbar-logo-text">ReservaFácil</span>
        </div>

        {/* <div className="navbar-actions">
          <button onClick={onLoginClick} className="btn btn-secondary">
            Iniciar sesión
          </button>
          <button onClick={onRegisterClick} className="btn btn-primary">
            Registrarse
          </button>
        </div> */}
      </div>
    </nav>
  )
}