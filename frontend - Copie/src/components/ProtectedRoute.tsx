"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Si pas authentifié, rediriger vers login
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // Si des rôles sont spécifiés, vérifier que l'utilisateur a le bon rôle
      if (allowedRoles && allowedRoles.length > 0) {
        if (!user || !allowedRoles.includes(user.role)) {
          // Rediriger vers le dashboard approprié selon le rôle
          if (user?.role === 'RH') {
            router.push('/dashboard/rh/employees');
          } else if (user?.role === 'ASSISTANT_RH') {
            router.push('/dashboard/rh');
          } else if (user?.role === 'IMPRESSION') {
            router.push('/dashboard/impression');
          } else if (user?.role === 'ADMIN') {
            router.push('/dashboard/rh');
          } else {
            router.push('/login');
          }
          return;
        }
      }
    }
  }, [isAuthenticated, user, isLoading, allowedRoles, router]);

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-[#fff5ed]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff8d13] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Si pas authentifié ou pas le bon rôle, ne rien afficher (redirection en cours)
  if (!isAuthenticated || (allowedRoles && allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role)))) {
    return null;
  }

  // Sinon, afficher le contenu
  return <>{children}</>;
}
