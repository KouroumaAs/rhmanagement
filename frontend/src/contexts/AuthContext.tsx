"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pages publiques qui ne nécessitent pas d'authentification
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/verify'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Vérifier si un token existe dans le localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée
    if (!isLoading) {
      const isPublicRoute = PUBLIC_ROUTES.some(route => pathname?.startsWith(route));
      const isHomePage = pathname === '/';
      const isEmployeesRoute = pathname?.startsWith('/dashboard/rh/employees');
      const isDashboardRH = pathname === '/dashboard/rh';
      const isUsersRoute = pathname?.startsWith('/dashboard/rh/users');
      const isChangePasswordRoute = pathname === '/change-password';

      if (!token && !isPublicRoute && !isHomePage) {
        // Pas de token et route protégée -> rediriger vers login
        router.push('/login');
        return;
      }

      // Rediriger le RH et ASSISTANT_RH s'ils essaient d'accéder à une route non autorisée
      if (token && user && (user.role === 'RH' || user.role === 'ASSISTANT_RH')) {
        // Le RH et ASSISTANT_RH ne peuvent accéder qu'aux routes /dashboard/rh, /dashboard/rh/employees/* et /change-password
        // Mais PAS aux routes /dashboard/rh/users/*
        if (isUsersRoute) {
          router.push('/dashboard/rh/employees');
          return;
        }

        const allowedRoutes = isEmployeesRoute || isDashboardRH || isPublicRoute || isHomePage || isChangePasswordRoute;
        if (!allowedRoutes) {
          router.push('/dashboard/rh/employees');
        }
      }
      // Ne pas rediriger automatiquement depuis les pages publiques si le token vient d'être défini
      // La page de login gère sa propre redirection
    }
  }, [token, user, pathname, isLoading, router]);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));

    // Aussi sauvegarder dans les cookies pour le middleware
    document.cookie = `token=${newToken}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 jours

    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    console.log('logout() appelé');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('localStorage nettoyé');

    // Supprimer aussi le cookie
    document.cookie = 'token=; path=/; max-age=0';
    console.log('Cookie supprimé');

    setToken(null);
    setUser(null);
    console.log('État réinitialisé');

    // Forcer un rechargement complet pour réinitialiser l'état
    console.log('Redirection vers /login...');
    window.location.href = '/login';
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
