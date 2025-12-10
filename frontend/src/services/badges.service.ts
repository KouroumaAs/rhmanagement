import { API_ENDPOINTS } from "@/src/constants";
import { get, post } from "./api";
import type { Badge, ApiResponse, PaginatedResponse } from "@/src/types";

/**
 * Badge Service
 * Handles all badge-related API calls
 */

export const badgesService = {
  /**
   * Get all badge requests
   */
  async getAll(params?: {
    page?: string;
    limit?: string;
    status?: string;
    type?: string;
    search?: string;
    dateDemandeDe?: string;
    dateDemandeA?: string;
    dateImpressionDe?: string;
    dateImpressionA?: string;
  }): Promise<ApiResponse<PaginatedResponse<Badge>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page);
    if (params?.limit) queryParams.append("limit", params.limit);
    if (params?.status && params.status !== "TOUS") queryParams.append("status", params.status);
    if (params?.type && params.type !== "TOUS") queryParams.append("type", params.type);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.dateDemandeDe) queryParams.append("dateDemandeDe", params.dateDemandeDe);
    if (params?.dateDemandeA) queryParams.append("dateDemandeA", params.dateDemandeA);
    if (params?.dateImpressionDe) queryParams.append("dateImpressionDe", params.dateImpressionDe);
    if (params?.dateImpressionA) queryParams.append("dateImpressionA", params.dateImpressionA);

    const endpoint = `${API_ENDPOINTS.BADGES}?${queryParams.toString()}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return get<PaginatedResponse<Badge>>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Get a single badge by ID
   */
  async getById(id: string): Promise<ApiResponse<Badge>> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return get<Badge>(API_ENDPOINTS.BADGE_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Print a badge
   */
  async print(id: string): Promise<ApiResponse<Badge>> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return post<Badge>(API_ENDPOINTS.PRINT_BADGE(id), {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Verify badge by QR code - Retourne les informations de l'employé
   */
  async verify(qrCode: string): Promise<{
    success: boolean;
    valid?: boolean;
    status?: string;
    employee?: {
      matricule: string;
      nom?: string;
      prenom?: string;
      fonction?: string;
      status?: string;
    };
  }> {
    console.log('🔍 [badgesService.verify] Appel API verify avec qrCode:', qrCode);
    const endpoint = `${API_ENDPOINTS.BADGES}/verify/${qrCode}`;
    console.log('🔍 [badgesService.verify] Endpoint complet:', endpoint);

    try {
      // Route publique, pas besoin de token
      const result = await get<{
        valid?: boolean;
        status?: string;
        employee?: {
          matricule: string;
          nom?: string;
          prenom?: string;
          fonction?: string;
          status?: string;
        };
      }>(endpoint);

      console.log('✅ [badgesService.verify] Réponse reçue:', result);
      return result;
    } catch (error) {
      console.error('❌ [badgesService.verify] Erreur:', error);
      throw error;
    }
  },

  /**
   * Get QR code image for a badge
   */
  async getQRCode(badgeId: string): Promise<ApiResponse<{ qrCode: string; image: string }>> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return get<{ qrCode: string; image: string }>(`${API_ENDPOINTS.BADGES}/${badgeId}/qr-code`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Download QR code as PNG file
   */
  async downloadQRCode(badgeId: string, employeeName: string): Promise<void> {
    try {
      const response = await this.getQRCode(badgeId);

      if (!response.success || !response.data?.image) {
        throw new Error('Impossible de récupérer le QR code');
      }

      // Convert base64 to blob
      const base64Data = response.data.image;
      const link = document.createElement('a');
      link.href = base64Data;
      link.download = `QRCode_${employeeName.replace(/\s+/g, '_')}_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur téléchargement QR code:', error);
      throw error;
    }
  },

  /**
   * Authorize badge reprint (for RH)
   */
  async authorizeReprint(badgeId: string): Promise<ApiResponse<Badge>> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return post<Badge>(`${API_ENDPOINTS.BADGES}/${badgeId}/authorize-reprint`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};