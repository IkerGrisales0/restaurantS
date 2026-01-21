import { X } from "lucide-react";

export interface Filters {
  price: number[];
  amenities: {
    terrace: boolean;
    wifi: boolean;
    petFriendly: boolean;
  };
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function FilterPanel({ filters, onChange, onClose, isOpen }: FilterPanelProps) {
  const toggleAmenity = (amenity: keyof Filters["amenities"]) => {
    onChange({
      ...filters,
      amenities: {
        ...filters.amenities,
        [amenity]: !filters.amenities[amenity]
      }
    });
  };

  const reset = () => {
    onChange({
      price: [1, 4],
      amenities: {
        terrace: false,
        wifi: false,
        petFriendly: false
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="filter-panel">
      <div className="filter-panel-container">
        <div className="filter-panel-content">
          <div className="filter-panel-header">
            <h3 className="filter-panel-title">Filtros</h3>
            <button onClick={onClose} className="filter-panel-close">
              <X size={20} />
            </button>
          </div>

          <div className="filter-panel-sections">
            <div>
              <label className="filter-section-label">Rango de precio</label>
              <div className="filter-price-options">
                {[1, 2, 3, 4].map((price) => (
                  <button
                    key={price}
                    onClick={() => {
                      const isSelected = filters.price[0] <= price && price <= filters.price[1];
                      if (isSelected && filters.price[0] === filters.price[1]) {
                        return;
                      }
                      if (isSelected) {
                        if (filters.price[0] === price) {
                          onChange({ ...filters, price: [price + 1, filters.price[1]] });
                        } else if (filters.price[1] === price) {
                          onChange({ ...filters, price: [filters.price[0], price - 1] });
                        }
                      } else {
                        const newRange: [number, number] = [
                          Math.min(filters.price[0], price),
                          Math.max(filters.price[1], price)
                        ];
                        onChange({ ...filters, price: newRange });
                      }
                    }}
                    className={`filter-price-btn ${
                      filters.price[0] <= price && price <= filters.price[1] ? 'active' : ''
                    }`}
                  >
                    {"$".repeat(price)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="filter-section-label">Comodidades</label>
              <div className="filter-amenities">
                <button
                  onClick={() => toggleAmenity("terrace")}
                  className={`filter-amenity-btn ${filters.amenities.terrace ? 'active' : ''}`}
                >
                  Terraza
                </button>
                <button
                  onClick={() => toggleAmenity("wifi")}
                  className={`filter-amenity-btn ${filters.amenities.wifi ? 'active' : ''}`}
                >
                  WiFi
                </button>
                <button
                  onClick={() => toggleAmenity("petFriendly")}
                  className={`filter-amenity-btn ${filters.amenities.petFriendly ? 'active' : ''}`}
                >
                  Pet-friendly
                </button>
              </div>
            </div>
          </div>

          <div className="filter-panel-actions">
            <button onClick={reset} className="filter-panel-reset">
              Restablecer
            </button>
            <button onClick={onClose} className="filter-panel-apply">
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
