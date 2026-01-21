import { ChevronDown, Utensils, DollarSign } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Filters } from "./FilterPanel";

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  cuisines: string[];
}

export function FilterBar({ filters, onChange, cuisines }: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCuisine, setSelectedCuisine] = useState("Todas las cocinas");

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getPriceLabel = () => {
    if (filters.price[0] === 1 && filters.price[1] === 4) return "Todos los precios";
    if (filters.price[0] === filters.price[1]) {
      return "$".repeat(filters.price[0]);
    }
    return `${"$".repeat(filters.price[0])} - ${"$".repeat(filters.price[1])}`;
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar-container">
        <span className="filter-bar-label">Filtrar:</span>
        
        <div className="filter-bar-filters" ref={dropdownRef}>
          <div className="filter-dropdown">
            <button
              onClick={() => setOpenDropdown(openDropdown === "cuisine" ? null : "cuisine")}
              className="filter-btn"
            >
              <Utensils className="filter-btn-icon" />
              <span>{selectedCuisine}</span>
              <ChevronDown size={16} />
            </button>

            {openDropdown === "cuisine" && (
              <div className="filter-menu">
                <button
                  onClick={() => {
                    setSelectedCuisine("Todas las cocinas");
                    setOpenDropdown(null);
                  }}
                  className={`filter-menu-item ${selectedCuisine === "Todas las cocinas" ? "active" : ""}`}
                >
                  Todas las cocinas
                </button>
                {cuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => {
                      setSelectedCuisine(cuisine);
                      setOpenDropdown(null);
                    }}
                    className={`filter-menu-item ${selectedCuisine === cuisine ? "active" : ""}`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <button
              onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
              className="filter-btn"
            >
              <DollarSign className="filter-btn-icon" />
              <span>{getPriceLabel()}</span>
              <ChevronDown size={16} />
            </button>

            {openDropdown === "price" && (
              <div className="filter-menu price">
                <button
                  onClick={() => {
                    onChange({ ...filters, price: [1, 4] });
                    setOpenDropdown(null);
                  }}
                  className={`filter-menu-item ${filters.price[0] === 1 && filters.price[1] === 4 ? "active" : ""}`}
                >
                  Todos los precios
                </button>
                {[1, 2, 3, 4].map((price) => (
                  <button
                    key={price}
                    onClick={() => {
                      onChange({ ...filters, price: [price, price] });
                      setOpenDropdown(null);
                    }}
                    className={`filter-menu-item ${filters.price[0] === price && filters.price[1] === price ? "active" : ""}`}
                  >
                    {"$".repeat(price)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
