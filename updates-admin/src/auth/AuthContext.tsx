import React, { createContext, useContext, useState } from 'react';

// Authentication Context
interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string } | null;
  login: (name: string, passphrase: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const login = (name: string, passphrase: string) => {
    // Simple authentication - in real app, this would call your backend
    if (name.trim() && passphrase.trim()) {
      setIsLoggedIn(true);
      setUser({ name });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
