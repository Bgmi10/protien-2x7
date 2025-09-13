import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { API_URL } from '../utils/constants';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchAdminProfile();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are sent and received
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // The server sets the cookie, we just need to store the user
        setUser(data.user);
        return true;
      } else {
        console.error('Login failed:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const fetchAdminProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/admin/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error('Failed to fetch admin profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This sends the cookie for logout
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state
      setUser(null);
    }
  };

  const value = {
    user,
    isLoading,
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}