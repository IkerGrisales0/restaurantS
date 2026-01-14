import '../styles/global.css';
import '../styles/navbar.css';
import '../styles/hero.css';
import '../styles/features.css';
import '../styles/filter-bar.css';
import '../styles/restaurant-grid.css';
import '../styles/restaurant-card.css';
import '../styles/restaurant-detail.css';
import '../styles/modal.css';
import '../styles/filter-panel.css';
import '../styles/footer.css';
import '../styles/auth.css';

import { useState, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { Features } from "./components/Features";
import { FilterBar } from "./components/FilterBar";
import { RestaurantGrid } from "./components/RestaurantGrid";
import { BookingModal, type BookingData } from "./components/BookingModal";
import type { Filters } from "./components/FilterPanel";
import { restaurants, type Restaurant } from "./data/restaurants";

// Pages
import { RestaurantDetail } from "./pages/RestaurantDetail";
import { AuthPage } from "./pages/Auth";

type Page = 'home' | 'auth' | 'restaurant';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [search, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    price: [1, 4],
    amenities: {
      terrace: false,
      wifi: false,
      petFriendly: false
    }
  });

  // Get unique cuisines
  const cuisines = useMemo(() => {
    return Array.from(new Set(restaurants.map(r => r.cuisine))).sort();
  }, []);

  const filteredRestaurants = useMemo(() => {
    let results = [...restaurants];

    // Search filter
    if (search) {
      const query = search.toLowerCase();
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query) ||
          r.city.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
      );
    }

    // Price filter
    results = results.filter(
      (r) => r.price >= filters.price[0] && r.price <= filters.price[1]
    );

    // Amenities filter
    if (filters.amenities.terrace) {
      results = results.filter((r) => r.amenities.terrace);
    }
    if (filters.amenities.wifi) {
      results = results.filter((r) => r.amenities.wifi);
    }
    if (filters.amenities.petFriendly) {
      results = results.filter((r) => r.amenities.petFriendly);
    }

    return results;
  }, [search, filters]);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPage('restaurant');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedRestaurant(null);
    setShowBooking(false);
  };

  const handleBookingConfirm = (booking: BookingData) => {
    alert(
      `¡Reserva confirmada! 🎉\n\nRestaurante: ${selectedRestaurant?.name}\nFecha: ${booking.date}\nHora: ${booking.time}\nPersonas: ${booking.guests}\n\nRecibirás un email de confirmación.`
    );
    setShowBooking(false);
  };

  return (
    <>
      <Navbar 
        onLoginClick={() => setCurrentPage('auth')}
        onLogoClick={() => setCurrentPage('home')}
      />
      {currentPage === 'home' && (
        <>
          <HeroSection onSearch={setSearch} />
          <Features isVisible={!search} />
          <FilterBar filters={filters} onChange={setFilters} cuisines={cuisines} />
          <RestaurantGrid
            restaurants={filteredRestaurants}
            onRestaurantClick={handleRestaurantClick}
          />
        </>
      )}
      {currentPage === 'restaurant' && selectedRestaurant && (
        <>
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onClose={handleBackToHome}
            onReserve={() => setShowBooking(true)}
          />

          {/* Booking Modal */}
          {showBooking && (
            <BookingModal
              restaurant={selectedRestaurant}
              onClose={() => setShowBooking(false)}
              onConfirm={handleBookingConfirm}
            />
          )}
        </>
      )}
      {currentPage === 'auth' && (
        <AuthPage 
          onBackToHome={() => setCurrentPage('home')}
        />
      )}
    </>
  );
}