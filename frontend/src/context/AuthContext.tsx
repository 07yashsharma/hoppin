import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getDemoAccounts, switchDemoUser as apiSwitchDemo, User } from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  demoAccounts: User[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (userId?: string) => Promise<void>;
  logout: () => void;
  switchUser: (userId: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [demoAccounts, setDemoAccounts] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track authenticated session state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('hopin_authenticated') === 'true';
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [user, accounts] = await Promise.all([
        getCurrentUser().catch(() => null),
        getDemoAccounts().catch(() => [])
      ]);
      setCurrentUser(user);
      setDemoAccounts(accounts);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to initialize session');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const login = async (userId?: string) => {
    try {
      setLoading(true);
      if (userId) {
        const updatedUser = await apiSwitchDemo(userId);
        setCurrentUser(updatedUser);
      }
      localStorage.setItem('hopin_authenticated', 'true');
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('hopin_authenticated');
    setIsAuthenticated(false);
  };

  const switchUser = async (userId: string) => {
    try {
      setLoading(true);
      const updatedUser = await apiSwitchDemo(userId);
      setCurrentUser(updatedUser);
      localStorage.setItem('hopin_authenticated', 'true');
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err: any) {
      console.error('Failed to refresh user', err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      demoAccounts, 
      loading, 
      error, 
      isAuthenticated,
      login,
      logout,
      switchUser, 
      refreshUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
