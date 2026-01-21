import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

interface AuthPageProps {
  onBackToHome?: () => void;
  onCompleteSetup?: (userData: { email: string; name: string; phone: string; role: string }) => void;
  onLoginSuccess?: (userData: any) => void;
  initialMode?: 'login' | 'register';
}

type AuthView = 'login' | 'register';

export function AuthPage({ onBackToHome, onCompleteSetup, onLoginSuccess, initialMode = 'login' }: AuthPageProps) {
  const [view, setView] = useState<AuthView>(initialMode);

  useEffect(() => {
    setView(initialMode);
  }, [initialMode]);

  const handleSwitchToRegister = () => {
    setView('register');
  };

  const handleSwitchToLogin = () => {
    setView('login');
  };

  return (
    <>
      {view === 'login' ? (
        <Login
          onSwitchToRegister={handleSwitchToRegister}
          onBackToHome={onBackToHome}
          onLoginSuccess={onLoginSuccess || onBackToHome}
        />
      ) : (
        <Register
          onSwitchToLogin={handleSwitchToLogin}
          onBackToHome={onBackToHome}
          onCompleteSetup={onCompleteSetup}
        />
      )}
    </>
  );
}
