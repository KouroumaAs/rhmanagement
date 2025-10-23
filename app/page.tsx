"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user) {
        // Rediriger selon le rôle
        if (user.role === 'RH') {
          router.push('/dashboard/rh');
        } else if (user.role === 'IMPRESSION') {
          router.push('/dashboard/impression');
        } else if (user.role === 'ADMIN') {
          router.push('/dashboard/rh');
        } else {
          router.push('/login');
        }
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff8d13] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  return null;
}
