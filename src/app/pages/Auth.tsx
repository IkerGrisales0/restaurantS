import { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

interface AuthPageProps {
  onBackToHome: () => void;
}

type AuthView = 'login' | 'register';

export function AuthPage({ onBackToHome }: AuthPageProps) {
  const [view, setView] = useState<AuthView>('login');

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
        />
      ) : (
        <Register
          onSwitchToLogin={handleSwitchToLogin}
          onBackToHome={onBackToHome}
        />
      )}
    </>
  );
}
