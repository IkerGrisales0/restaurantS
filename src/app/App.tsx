import '../styles/global.css';

// Features - Shared
import '../features/shared/navbar.css';
import '../features/shared/hero.css';
import '../features/shared/features.css';

// Features - Authentication
import '../features/authentication/auth.css';

// Features - Restaurant Discovery
import '../features/restaurant-discovery/filter-bar.css';
import '../features/restaurant-discovery/restaurant-grid.css';
import '../features/restaurant-discovery/restaurant-card.css';
import '../features/restaurant-discovery/filter-panel.css';

// Features - Restaurant Detail
import '../features/restaurant-detail/restaurant-detail.css';

// Features - Common
import '../features/common/modal.css';

// Features - Restaurant Setup
import '../features/restaurant-setup/restaurant-setup.css';

import { useState, useMemo } from "react";
import {
  Navbar,
  HeroSection,
  Features,
} from "../features/shared";

import {
  FilterBar,
  RestaurantGrid,
  type Filters,
} from "../features/restaurant-discovery";

import { RestaurantDetail } from "../features/restaurant-detail";

import { AuthPage } from "../features/authentication";

import { RestaurantSetup } from "../features/restaurant-setup";

import {
  BookingModal,
  type BookingData,
  restaurants,
  type Restaurant,
} from "../features/common";

type Page = 'home' | 'auth' | 'restaurant' | 'restaurant-setup';

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
          onCompleteSetup={() => setCurrentPage('restaurant-setup')}
        />
      )}
      {currentPage === 'restaurant-setup' && (
        <RestaurantSetup
          onComplete={(data) => {
            console.log('Datos del restaurante:', data);
            setCurrentPage('home');
          }}
          onCancel={() => setCurrentPage('home')}
        />
      )}
    </>
  );
}