"use client"

import { ChefHat, Leaf, Shield, Sparkles } from "lucide-react"

const features = [
  {
    icon: ChefHat,
    title: "Chefs Expertos",
    description: "Los mejores chefs de la ciudad preparando experiencias únicas"
  },
  {
    icon: Leaf,
    title: "Ingredientes Frescos",
    description: "Productos locales y de temporada en cada plato"
  },
  {
    icon: Shield,
    title: "Reserva Segura",
    description: "Tu reserva confirmada al instante con garantía total"
  },
  {
    icon: Sparkles,
    title: "Experiencias Únicas",
    description: "Descubre nuevos sabores y momentos inolvidables"
  }
]

export function Features() {
  return (
    <div className="features">
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              <feature.icon size={32} />
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
