import { API_ENDPOINTS } from "@/src/constants";
import type { ApiResponse } from "@/src/types";

/**
 * Base API configuration
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.100.55:4003/api";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }

  /**
   * Get a user-friendly error message based on status code
   */
  getUserMessage(): string {
    switch (this.status) {
      case 400:
        return `❌ Erreur de validation: ${this.message}`;
      case 401:
        return "🔒 Session expirée. Veuillez vous reconnecter.";
      case 403:
        return "⛔ Accès refusé. Vous n'avez pas les permissions nécessaires.";
      case 404:
        return `🔍 Ressource non trouvée: ${this.message}`;
      case 409:
        return `⚠️ Conflit: ${this.message}`;
      case 422:
        return `📋 Données invalides: ${this.message}`;
      case 500:
        return `🔥 Erreur serveur: ${this.message}`;
      case 503:
        return "⏸️ Service temporairement indisponible. Réessayez plus tard.";
      default:
        return `❌ ${this.message}`;
    }
  }

  /**
   * Get debug information for logging
   */
  getDebugInfo(): string {
    return `[${this.status}] ${this.name}: ${this.message}\nData: ${JSON.stringify(this.data, null, 2)}`;
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Get token from localStorage (only in browser)
    const token = typeof window !== 'undefined'
      ? (localStorage.getItem("token") || localStorage.getItem("auth_token"))
      : null;

    console.log(`🌐 API Request: ${options.method || 'GET'} ${endpoint}`);

    // Créer un AbortController pour gérer le timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Try to parse JSON response
      let data: any;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("❌ Erreur de parsing JSON:", parseError);
        throw new ApiError(
          response.status,
          "Réponse du serveur invalide",
          { parseError, status: response.status }
        );
      }

      if (!response.ok) {
        // Si le backend renvoie un tableau d'erreurs (validation Zod)
        let errorMessage = data.message || "Une erreur est survenue";

        if (data.errors && Array.isArray(data.errors)) {
          errorMessage = data.errors.map((err: any) => err.message || err).join(', ');
        }

        const apiError = new ApiError(response.status, errorMessage, data);

        // Log detailed error in console
        console.error("❌ API Error:", apiError.getDebugInfo());

        // 🔐 REDIRECTION AUTOMATIQUE si token expiré ou invalide (401)
        if (response.status === 401 && typeof window !== 'undefined') {
          console.log('🔒 Token expiré ou invalide - Redirection vers /login');
          localStorage.removeItem('token');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');

          // Supprimer le cookie aussi
          document.cookie = 'token=; path=/; max-age=0';

          // Utiliser replace pour une redirection immédiate sans retour possible
          window.location.replace('/login');

          // Retourner une promesse qui ne se résout jamais pour stopper l'exécution
          return new Promise(() => {}) as any;
        }

        throw apiError;
      }

      console.log(`✅ API Success: ${options.method || 'GET'} ${endpoint}`);

      // Return the full response from backend
      // Backend returns: { success: true, data: ..., message?: ..., pagination?: ... }
      // Extraire success et garder toutes les autres propriétés intactes
      const { success, ...rest } = data;
      return {
        success: success ?? true,
        ...rest,
      };
    } catch (fetchError) {
      clearTimeout(timeoutId);

      // Gérer spécifiquement l'erreur de timeout
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        const timeoutError = new ApiError(
          408,
          "La requête a pris trop de temps (timeout après 30 secondes)"
        );
        console.error("⏱️ Timeout Error:", timeoutError.getDebugInfo());
        throw timeoutError;
      }

      throw fetchError;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network error or other exception
    const networkError = new ApiError(
      0,
      error instanceof Error ? error.message : "Erreur de connexion au serveur"
    );

    console.error("❌ Network Error:", networkError.getDebugInfo());

    throw networkError;
  }
}

/**
 * GET request
 */
export async function get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: "GET",
  });
}

/**
 * POST request
 */
export async function post<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PUT request
 */
export async function put<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * PATCH request
 */
export async function patch<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 */
export async function del<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: "DELETE",
  });
}

/**
 * Upload file with multipart/form-data
 */
export async function upload<T>(
  endpoint: string,
  formData: FormData,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const token = typeof window !== 'undefined'
      ? (localStorage.getItem("token") || localStorage.getItem("auth_token"))
      : null;

    console.log(`📤 Upload Request: POST ${endpoint}`);

    // Timeout plus long pour les uploads (60 secondes)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        method: "POST",
        body: formData,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options?.headers,
        },
        signal: controller.signal,
        // Don't set Content-Type, let browser set it with boundary
      });

      clearTimeout(timeoutId);

      let data: any;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("❌ Erreur de parsing JSON:", parseError);
        throw new ApiError(
          response.status,
          "Réponse du serveur invalide",
          { parseError, status: response.status }
        );
      }

      if (!response.ok) {
        const apiError = new ApiError(response.status, data.message || "Une erreur est survenue", data);
        console.error("❌ Upload Error:", apiError.getDebugInfo());

        // 🔐 REDIRECTION AUTOMATIQUE si token expiré ou invalide (401)
        if (response.status === 401 && typeof window !== 'undefined') {
          console.log('🔒 Token expiré lors de l\'upload - Redirection vers /login');
          localStorage.removeItem('token');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');

          // Supprimer le cookie aussi
          document.cookie = 'token=; path=/; max-age=0';

          // Utiliser replace pour une redirection immédiate sans retour possible
          window.location.replace('/login');

          // Retourner une promesse qui ne se résout jamais pour stopper l'exécution
          return new Promise(() => {}) as any;
        }

        throw apiError;
      }

      console.log(`✅ Upload Success: ${endpoint}`);

      const { success, ...rest } = data;
      return {
        success: success ?? true,
        ...rest,
      };
    } catch (uploadFetchError) {
      clearTimeout(timeoutId);

      // Gérer l'erreur de timeout pour les uploads
      if (uploadFetchError instanceof Error && uploadFetchError.name === 'AbortError') {
        const timeoutError = new ApiError(
          408,
          "L'upload a pris trop de temps (timeout après 60 secondes)"
        );
        console.error("⏱️ Upload Timeout:", timeoutError.getDebugInfo());
        throw timeoutError;
      }

      throw uploadFetchError;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const uploadError = new ApiError(
      500,
      error instanceof Error ? error.message : "Erreur lors de l'upload"
    );

    console.error("❌ Upload Error:", uploadError.getDebugInfo());

    throw uploadError;
  }
}

/**
 * Handle API errors uniformly
 * Use this in catch blocks to get a user-friendly error message
 */
export function handleApiError(error: any): string {
  if (error instanceof ApiError) {
    return error.getUserMessage();
  }
  return error?.message || "Une erreur inattendue est survenue";
}

/**
 * Auth service
 */
export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    return post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },
  register: async (data: any) => {
    return post(API_ENDPOINTS.AUTH.REGISTER, data);
  },
  logout: async () => {
    return post(API_ENDPOINTS.AUTH.LOGOUT);
  },
  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};