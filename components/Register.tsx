'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'
import { Utensils } from 'lucide-react'

interface RegisterProps {
  onSwitchToLogin: () => void
  onBackToHome: () => void
}

export function Register({ onSwitchToLogin, onBackToHome }: RegisterProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validación
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Por favor completa todos los campos')
      return
    }

    if (!email.includes('@')) {
      setError('Por favor ingresa un email válido')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setError('Por favor ingresa un teléfono válido')
      return
    }

    // Aquí iría la lógica de registro real
    setSuccess('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.')
    setTimeout(() => {
      onSwitchToLogin()
    }, 2000)

    // Limpiar
    setName('')
    setEmail('')
    setPhone('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-register">
        {/* Logo */}
        <div className="auth-logo">
          <Utensils size={32} />
        </div>

        <h1 className="auth-title">ReservaFácil</h1>
        <p className="auth-subtitle">Crear nueva cuenta</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          {/* Name */}
          <div className="auth-field">
            <label className="auth-label">Nombre Completo</label>
            <div className="auth-input-wrapper">
              <User size={18} className="auth-input-icon" />
              <input
                type="text"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="auth-field">
            <label className="auth-label">Teléfono</label>
            <div className="auth-input-wrapper">
              <Phone size={18} className="auth-input-icon" />
              <input
                type="tel"
                placeholder="+34 612 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

          {/* Confirm Password */}
          <div className="auth-field">
            <label className="auth-label">Confirmar Contraseña</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="auth-input-toggle"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="auth-submit">
            Crear Cuenta
          </button>
        </form>

        {/* Switch to Login */}
        <div className="auth-switch">
          <span>¿Ya tienes cuenta? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="auth-switch-link"
          >
            Inicia sesión
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
