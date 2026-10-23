import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  getDemoAccounts, 
  switchDemoUser as apiSwitchDemo, 
  loginUser as apiLoginUser,
  loginGoogleUser as apiLoginGoogle,
  registerUser as apiRegisterUser,
  requestPasswordReset as apiRequestReset,
  resetUserPassword as apiResetPassword,
  User 
} from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  demoAccounts: User[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  loginWithEmail: (email: string, password?: string, rememberMe?: boolean, extra?: { name?: string; role?: string }) => Promise<void>;
  loginWithGoogle: (email: string, name?: string, avatar?: string) => Promise<void>;
  loginWithDemo: (userId: string) => Promise<void>;
  register: (payload: { name: string; email: string; phone?: string; role?: string }) => Promise<void>;
  forgotPassword: (email: string) => Promise<{ message: string; resetToken?: string }>;
  resetPassword: (payload: { email: string; newPassword: string; token?: string }) => Promise<{ message: string }>;
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
    return localStorage.getItem('hopin_auth_token') === 'active';
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

  const loginWithEmail = async (email: string, password?: string, rememberMe = true, extra?: { name?: string; role?: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiLoginUser(email, password, extra);
      setCurrentUser(res.user);
      localStorage.setItem('hopin_auth_token', 'active');
      if (rememberMe) {
        localStorage.setItem('hopin_remembered_email', email);
      } else {
        localStorage.removeItem('hopin_remembered_email');
      }
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (email: string, name?: string, avatar?: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiLoginGoogle({ email, name, avatar });
      setCurrentUser(res.user);
      localStorage.setItem('hopin_auth_token', 'active');
      localStorage.setItem('hopin_remembered_email', email);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithDemo = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await apiSwitchDemo(userId);
      setCurrentUser(updatedUser);
      localStorage.setItem('hopin_auth_token', 'active');
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: { name: string; email: string; phone?: string; role?: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiRegisterUser(payload);
      setCurrentUser(res.user);
      localStorage.setItem('hopin_auth_token', 'active');
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    return await apiRequestReset(email);
  };

  const resetPassword = async (payload: { email: string; newPassword: string; token?: string }) => {
    return await apiResetPassword(payload);
  };

  const logout = () => {
    localStorage.removeItem('hopin_auth_token');
    setIsAuthenticated(false);
  };

  const switchUser = async (userId: string) => {
    try {
      setLoading(true);
      const updatedUser = await apiSwitchDemo(userId);
      setCurrentUser(updatedUser);
      localStorage.setItem('hopin_auth_token', 'active');
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
    } catch (err) {
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
      loginWithEmail,
      loginWithGoogle,
      loginWithDemo,
      register,
      forgotPassword,
      resetPassword,
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
