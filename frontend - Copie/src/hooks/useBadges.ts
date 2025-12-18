"use client";

import { useState, useCallback } from "react";
import { badgesService } from "@/src/services/badges.service";
import type { Badge, PaginatedResponse } from "@/src/types";

interface UseBadgesParams {
  page?: string;
  limit?: string;
  status?: string;
  type?: string;
  search?: string;
  dateDemandeDe?: string;
  dateDemandeA?: string;
  dateImpressionDe?: string;
  dateImpressionA?: string;
}

interface UseBadgesReturn {
  badges: Badge[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  fetchBadges: (params?: UseBadgesParams) => Promise<void>;
  getBadge: (id: number) => Promise<Badge | null>;
  printBadge: (id: number) => Promise<Badge | null>;
  verifyBadge: (qrCode: string) => Promise<{
    valid: boolean;
    employee: Badge;
    status: "ACTIVE" | "EXPIRED" | "INVALID";
  } | null>;
  clearError: () => void;
}

export function useBadges(): UseBadgesReturn {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBadges = useCallback(async (params?: UseBadgesParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await badgesService.getAll(params);

      if (response.success && response.data) {
        setBadges(response.data.data);
        setTotal(response.data.total);
        setPage(response.data.page);
        setPageSize(response.data.pageSize);
        setTotalPages(response.data.totalPages);
      } else {
        setError(response.error || "Échec du chargement des badges");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBadge = useCallback(async (id: number): Promise<Badge | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await badgesService.getById(id.toString());

      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || "Badge non trouvé");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const printBadge = useCallback(async (id: number): Promise<Badge | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await badgesService.print(id.toString());

      if (response.success && response.data) {
        // Update the badge in the list
        setBadges((prev) =>
          prev.map((badge) => (badge.id === id ? response.data! : badge))
        );
        return response.data;
      } else {
        setError(response.error || "Échec de l'impression du badge");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyBadge = useCallback(async (qrCode: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await badgesService.verify(qrCode);

      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || "Échec de la vérification du badge");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    badges,
    total,
    page,
    pageSize,
    totalPages,
    isLoading,
    error,
    fetchBadges,
    getBadge,
    printBadge,
    verifyBadge,
    clearError,
  };
}
