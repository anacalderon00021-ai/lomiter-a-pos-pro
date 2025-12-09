import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: Record<string, User & { password: string }> = {
  'admin@lomiteria.com': {
    id: '1',
    email: 'admin@lomiteria.com',
    password: 'admin123',
    name: 'Carlos Admin',
    role: 'owner',
  },
  'cajero@lomiteria.com': {
    id: '2',
    email: 'cajero@lomiteria.com',
    password: 'cajero123',
    name: 'María Cajera',
    role: 'cashier',
  },
  'cocina@lomiteria.com': {
    id: '3',
    email: 'cocina@lomiteria.com',
    password: 'cocina123',
    name: 'José Cocina',
    role: 'kitchen',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const demoUser = demoUsers[email.toLowerCase()];
    
    if (demoUser && demoUser.password === password) {
      const { password: _, ...userWithoutPassword } = demoUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
