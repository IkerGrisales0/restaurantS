import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

interface AuthPageProps {
  onBackToHome: () => void;
  onCompleteSetup?: () => void;
}

type AuthView = 'login' | 'register';

export function AuthPage({ onBackToHome, onCompleteSetup }: AuthPageProps) {
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
          onCompleteSetup={onCompleteSetup}
        />
      )}
    </>
  );
}
