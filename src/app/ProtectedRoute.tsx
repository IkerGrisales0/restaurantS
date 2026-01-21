import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { restaurantApi } from '../services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'restaurant' | 'customer';
  requiredSetup?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredSetup 
}: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');

      if (!token) {
        setRedirectTo('/auth/login');
        setIsAuthorized(false);
        return;
      }

      // Verificar rol si es requerido
      if (requiredRole && role !== requiredRole) {
        setRedirectTo('/');
        setIsAuthorized(false);
        return;
      }

      // Verificar setup de restaurante si es requerido
      if (requiredSetup !== undefined && role === 'restaurant') {
        try {
          const restaurant = await restaurantApi.getMyRestaurant();
          const setupComplete = !!(restaurant && restaurant.cuisine_type && 
                                 restaurant.description && 
                                 restaurant.opening_time && 
                                 restaurant.closing_time);
          
          if (requiredSetup && !setupComplete) {
            setRedirectTo('/restaurant-setup');
            setIsAuthorized(false);
            return;
          }
          if (!requiredSetup && setupComplete) {
            setRedirectTo('/restaurant-dashboard');
            setIsAuthorized(false);
            return;
          }
        } catch (error) {
          // Si falla, dirigir a setup si se requiere incompleto, o a home
          setRedirectTo(requiredSetup ? '/restaurant-setup' : '/');
          setIsAuthorized(false);
          return;
        }
      }

      setIsAuthorized(true);
    };

    checkAuth();
  }, [requiredRole, requiredSetup]);

  if (isAuthorized === null) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to={redirectTo || '/'} replace />;
  }

  return <>{children}</>;
}
