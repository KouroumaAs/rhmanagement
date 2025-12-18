"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/src/services/auth.service";
import type { User, LoginFormData, RegisterFormData } from "@/src/types";

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Initialize user from localStorage
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(data);

      if (response.success && response.data) {
        setUser(response.data.user);

        // Redirect based on user role
        if (response.data.user.role === "RH") {
          router.push("/dashboard/rh");
        } else if (response.data.user.role === "IMPRESSION") {
          router.push("/dashboard/impression");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(response.error || "Échec de la connexion");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.register(data);

      if (response.success && response.data) {
        setUser(response.data.user);
        router.push("/dashboard");
      } else {
        setError(response.error || "Échec de l'inscription");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la déconnexion");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };
}
