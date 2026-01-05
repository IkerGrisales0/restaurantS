'use client'

import { ChevronDown, Utensils, DollarSign, Check } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import type { Filters } from "./FilterPanel"

interface FilterBarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  cuisines: string[]
}

export function FilterBar({ filters, onChange, cuisines }: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const cuisineLabel = filters.cuisine ?? "Todas las cocinas"

  const getAmenitiesLabel = () => {
    const labels: Record<keyof Filters['amenities'], string> = {
      terrace: "Terraza",
      wifi: "WiFi",
      petFriendly: "Pet-friendly"
    }

    const active = Object.entries(filters.amenities)
      .filter(([, value]) => value)
      .map(([key]) => labels[key as keyof Filters['amenities']])

    if (active.length === 0) return "Comodidades"
    if (active.length === 1) return active[0]
    return `${active[0]} +${active.length - 1}`
  }

  const toggleAmenity = (amenity: keyof Filters['amenities']) => {
    onChange({
      ...filters,
      amenities: {
        ...filters.amenities,
        [amenity]: !filters.amenities[amenity],
      },
    })
  }

  const getPriceLabel = () => {
    if (filters.price[0] === 1 && filters.price[1] === 4) return "Todos los precios"
    if (filters.price[0] === filters.price[1]) {
      return "$".repeat(filters.price[0])
    }
    return `${"$".repeat(filters.price[0])} - ${"$".repeat(filters.price[1])}`
  }

  return (
    <div className="filter-bar">
      <div className="filter-bar-container">
        <span className="filter-bar-label">Filtrar:</span>
        
        <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', gap: '1rem' }}>
          {/* Cuisine Filter */}
          <div className="filter-dropdown">
            <button
              onClick={() => setOpenDropdown(openDropdown === "cuisine" ? null : "cuisine")}
              className="filter-btn"
            >
              <Utensils size={16} style={{ color: 'var(--color-green)' }} />
              <span>{cuisineLabel}</span>
              <ChevronDown size={16} />
            </button>

            {openDropdown === "cuisine" && (
              <div className="filter-menu">
                <button
                  onClick={() => {
                    onChange({ ...filters, cuisine: null })
                    setOpenDropdown(null)
                  }}
                  className={`filter-menu-item ${!filters.cuisine ? "active" : ""}`}
                >
                  Todas las cocinas
                </button>
                {cuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => {
                      onChange({ ...filters, cuisine })
                      setOpenDropdown(null)
                    }}
                    className={`filter-menu-item ${filters.cuisine === cuisine ? "active" : ""}`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="filter-dropdown">
            <button
              onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
              className="filter-btn"
            >
              <DollarSign size={16} style={{ color: 'var(--color-green)' }} />
              <span>{getPriceLabel()}</span>
              <ChevronDown size={16} />
            </button>

            {openDropdown === "price" && (
              <div className="filter-menu">
                <button
                  onClick={() => {
                    onChange({ ...filters, price: [1, 4] })
                    setOpenDropdown(null)
                  }}
                  className={`filter-menu-item ${filters.price[0] === 1 && filters.price[1] === 4 ? "active" : ""}`}
                >
                  Todos los precios
                </button>
                {[1, 2, 3, 4].map((price) => (
                  <button
                    key={price}
                    onClick={() => {
                      onChange({ ...filters, price: [price, price] })
                      setOpenDropdown(null)
                    }}
                    className={`filter-menu-item ${filters.price[0] === price && filters.price[1] === price ? "active" : ""}`}
                  >
                    {"$".repeat(price)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amenities Filter */}
          <div className="filter-dropdown">
            <button
              onClick={() => setOpenDropdown(openDropdown === "amenities" ? null : "amenities")}
              className="filter-btn"
            >
              <Check size={16} style={{ color: 'var(--color-green)' }} />
              <span>{getAmenitiesLabel()}</span>
              <ChevronDown size={16} />
            </button>

            {openDropdown === "amenities" && (
              <div className="filter-menu">
                {([
                  { key: 'terrace', label: 'Terraza' },
                  { key: 'wifi', label: 'WiFi' },
                  { key: 'petFriendly', label: 'Pet-friendly' },
                ] as const).map((amenity) => (
                  <button
                    key={amenity.key}
                    onClick={() => toggleAmenity(amenity.key)}
                    className={`filter-menu-item ${filters.amenities[amenity.key] ? "active" : ""}`}
                  >
                    {amenity.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
