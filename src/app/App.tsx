import '../styles/global.css';

import '../features/shared/navbar.css';
import '../features/shared/hero.css';
import '../features/shared/features.css';

import '../features/authentication/auth.css';

import '../features/restaurant-discovery/filter-bar.css';
import '../features/restaurant-discovery/restaurant-grid.css';
import '../features/restaurant-discovery/restaurant-card.css';
import '../features/restaurant-discovery/filter-panel.css';

import '../features/restaurant-detail/restaurant-detail.css';

import '../features/common/modal.css';

import '../features/restaurant-setup/restaurant-setup.css';

import '../features/user-profile/user-profile.css';

import '../features/restaurant-dashboard/restaurant-dashboard.css';

import { Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from "react";
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

import { UserProfile } from "../features/user-profile/UserProfile";

import { RestaurantDashboard } from "../features/restaurant-dashboard";

import {
  BookingModal,
  type BookingData,
  type Restaurant,
} from "../features/common";

import { discoveryApi, restaurantApi } from "../services/api";
import { ProtectedRoute } from "./ProtectedRoute";

export default function App() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [filters, setFilters] = useState<Filters>({
    price: [1, 4],
    amenities: {
      terrace: false,
      wifi: false,
      petFriendly: false
    }
  });

  const RestaurantDetailWrapper = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(true);

    useEffect(() => {
      const loadRestaurant = async () => {
        if (!id) return;
        try {
          setLoadingDetail(true);
          const data = await discoveryApi.getRestaurantById(id);
          setRestaurant(data);
        } catch (error) {
          console.error('Error al cargar restaurante:', error);
          navigate('/');
        } finally {
          setLoadingDetail(false);
        }
      };
      loadRestaurant();
    }, [id]);

    if (loadingDetail) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
          <p>Cargando restaurante...</p>
        </div>
      );
    }

    if (!restaurant) {
      return null;
    }

    return (
      <>
        <RestaurantDetail 
          restaurant={restaurant}
          onBack={handleBackToHome}
          onBooking={() => setShowBooking(true)}
        />
        {showBooking && (
          <BookingModal
            restaurant={restaurant}
            onClose={() => setShowBooking(false)}
            onConfirm={handleBookingConfirm}
          />
        )}
      </>
    );
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("userRole");
      
      if (token && role) {
        setIsAuthenticated(true);
        setUserRole(role);
        
        if (role === 'restaurant') {
          try {
            const restaurant = await restaurantApi.getMyRestaurant();
            const isComplete = !!(restaurant && restaurant.cuisine_type && restaurant.description && 
                               restaurant.opening_time && restaurant.closing_time);
            
            if (!isComplete) {
              navigate('/restaurant-setup');
            } else {
              navigate('/restaurant-dashboard');
            }
          } catch (error) {
            console.error('Error al verificar restaurante:', error);
          }
        }
      }
      setLoading(false);
    };
    
    initializeAuth();
  }, [navigate]);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const data = await discoveryApi.getAllRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Error al cargar restaurantes:', error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const cuisines = useMemo(() => {
    return Array.from(
      new Set(restaurants.map(r => (r as any).cuisine_type || r.cuisine).filter(Boolean))
    ).sort();
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let results = [...restaurants];

    if (search) {
      const query = search.toLowerCase();
      results = results.filter((r) => {
        const cuisineType = (r as any).cuisine_type || r.cuisine || '';
        const restaurantCity = (r as any).city || '';
        return (
          r.name.toLowerCase().includes(query) ||
          cuisineType.toLowerCase().includes(query) ||
          restaurantCity.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
        );
      });
    }

    results = results.filter((r) => {
      const price = (r as any).average_price || r.price || 0;
      return price >= filters.price[0] && price <= filters.price[1];
    });

    if (filters.amenities.terrace) {
      results = results.filter((r) => r.amenities?.terrace);
    }
    if (filters.amenities.wifi) {
      results = results.filter((r) => r.amenities?.wifi);
    }
    if (filters.amenities.petFriendly) {
      results = results.filter((r) => r.amenities?.petFriendly);
    }

    return results;
  }, [search, filters, restaurants]);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    navigate(`/restaurant/${restaurant.id}`);
  };

  const handleBackToHome = () => {
    setSelectedRestaurant(null);
    setShowBooking(false);
    navigate('/');
  };

  const handleBookingConfirm = (booking: BookingData) => {
    setShowBooking(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserData(null);
    setUserRole(null);
    navigate('/');
  };

  const handleLoginSuccess = (userData?: { 
    email: string;
    name: string;
    phone: string;
    address?: string;
    role: string;
    restaurantSetupComplete?: boolean;
  }) => {
    const role = userData?.role || 'customer';
    setUserRole(role);
    setIsAuthenticated(true);
    setUserData(userData);

    if (role === 'restaurant') {
      const setupComplete = userData?.restaurantSetupComplete || false;
      if (!setupComplete) {
        navigate('/restaurant-setup');
      } else {
        navigate('/restaurant-dashboard');
      }
    } else {
      navigate('/');
    }
  };

  const handleRestaurantSetupComplete = async () => {
    await loadRestaurants();
    navigate('/restaurant-dashboard');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
        <p>Inicializando...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar 
              onLoginClick={() => navigate('/auth/login')}
              onLogoClick={() => navigate('/')}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
            />
            <HeroSection onSearch={setSearch} />
            <Features isVisible={!search} />
            <FilterBar filters={filters} onChange={setFilters} cuisines={cuisines} />
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
                <p>Cargando restaurantes...</p>
              </div>
            ) : restaurants.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2 style={{ color: '#333', marginBottom: '1rem' }}>No hay restaurantes disponibles</h2>
                <p style={{ color: '#666' }}>Sé el primero en registrar tu restaurante</p>
              </div>
            ) : (
              <RestaurantGrid
                restaurants={filteredRestaurants}
                onRestaurantClick={handleRestaurantClick}
              />
            )}
          </>
        }
      />

      <Route
        path="/auth/login"
        element={
          <AuthPage 
            onLoginSuccess={handleLoginSuccess}
            initialMode="login"
          />
        }
      />
      
      <Route
        path="/auth/register"
        element={
          <AuthPage 
            onLoginSuccess={handleLoginSuccess}
            initialMode="register"
          />
        }
      />

      <Route
        path="/restaurant/:id"
        element={<RestaurantDetailWrapper />}
      />

      <Route
        path="/restaurant-setup"
        element={
          <ProtectedRoute requiredRole="restaurant" requiredSetup={false}>
            <RestaurantSetup
              onComplete={handleRestaurantSetupComplete}
              onCancel={handleLogout}
              initialData={userData}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant-dashboard"
        element={
          <ProtectedRoute requiredRole="restaurant" requiredSetup={true}>
            <RestaurantDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRole="customer">
            <Navbar 
              onLoginClick={() => navigate('/auth/login')}
              onLogoClick={() => navigate('/')}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
            />
            <UserProfile />
          </ProtectedRoute>
        }
      />


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}