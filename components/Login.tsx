'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Utensils } from 'lucide-react'

interface LoginProps {
  onSwitchToRegister: () => void
  onBackToHome: () => void
}

export function Login({ onSwitchToRegister, onBackToHome }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validación simple
    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    if (!email.includes('@')) {
      setError('Por favor ingresa un email válido')
      return
    }

    // Aquí iría la lógica de autenticación real
    alert(`¡Bienvenido ${email}!`)
    setError('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <Utensils size={32} />
        </div>

        <h1 className="auth-title">ReservaFácil</h1>
        <p className="auth-subtitle">Bienvenido de vuelta</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                type="email"
                placeholder="admin@admin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label">Contraseña</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-input-toggle"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="auth-submit">
            Iniciar Sesión
          </button>
        </form>

        {/* Switch to Register */}
        <div className="auth-switch">
          <span>¿No tienes cuenta? </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="auth-switch-link"
          >
            Regístrate
          </button>
        </div>

        {/* Back to Home */}
        <button onClick={onBackToHome} className="auth-back-btn">
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
