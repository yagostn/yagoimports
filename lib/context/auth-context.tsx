"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Firebase não configurado. Configure as variáveis de ambiente.');
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) {
      throw new Error('Firebase não configurado');
    }
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
