import { API_ENDPOINTS } from "@/src/constants";
import { post, put, handleApiError } from "./api";
import type { User, LoginFormData, RegisterFormData, ApiResponse } from "@/src/types";

// Export handleApiError for use in components
export { handleApiError };

/**
 * Auth Service
 * Handles all authentication-related API calls
 */

export const authService = {
  /**
   * Login user
   */
  async login(data: LoginFormData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await post<{ user: User; token: string }>(API_ENDPOINTS.AUTH.LOGIN, data);

    if (response.success && response.data?.token) {
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response;
  },

  /**
   * Register new user
   */
  async register(data: RegisterFormData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await post<{ user: User; token: string }>(API_ENDPOINTS.AUTH.REGISTER, data);

    if (response.success && response.data?.token) {
      // Store token in localStorage (ne pas sauvegarder lors de l'enregistrement par admin)
      // Le token admin est déjà stocké
      console.log('✅ Utilisateur enregistré:', response.data.user);
    }

    return response;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Always clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
    return post<void>(API_ENDPOINTS.AUTH.RESET_PASSWORD, { email });
  },

  /**
   * Change password
   */
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<void>> {
    return put<void>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);






  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Get auth token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem("token");
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};