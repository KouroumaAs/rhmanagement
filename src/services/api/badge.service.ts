import axios from '@/src/lib/axios';

export type BadgeStatus = 'EN_ATTENTE' | 'IMPRIME' | 'LIVRE' | 'ANNULE';

export interface PrintBadgeDto {
  employeeId: string;
}

export interface UpdateBadgeStatusDto {
  status: BadgeStatus;
  notes?: string;
}

export interface Badge {
  id: string;
  employee: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    fonction: string;
    matricule: string;
    type: string;
  };
  qrCode: string;
  qrCodeUrl?: string;
  status: BadgeStatus;
  printedBy?: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  printedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BadgeQuery {
  page?: number;
  limit?: number;
  status?: BadgeStatus;
  search?: string;
  employeeType?: string;
}

export const badgeService = {
  // Récupérer tous les badges
  getAll: async (query?: BadgeQuery) => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.status) params.append('status', query.status);
    if (query?.search) params.append('search', query.search);
    if (query?.employeeType) params.append('employeeType', query.employeeType);

    const response = await axios.get(`/badges?${params.toString()}`);
    return response.data;
  },

  // Récupérer un badge par ID
  getById: async (id: string) => {
    const response = await axios.get(`/badges/${id}`);
    return response.data;
  },

  // Créer un badge pour un employé
  printBadge: async (data: PrintBadgeDto) => {
    const response = await axios.post('/badges/print', data);
    return response.data;
  },

  // Marquer un badge comme imprimé
  markAsPrinted: async (id: string) => {
    const response = await axios.post(`/badges/${id}/print`);
    return response.data;
  },

  // Récupérer l'image QR Code
  getQRCode: async (id: string): Promise<Blob> => {
    const response = await axios.get(`/badges/${id}/qrcode`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Vérifier un QR Code (public)
  verifyQRCode: async (qrCode: string) => {
    const response = await axios.get(`/badges/verify/${qrCode}`);
    return response.data;
  },

  // Supprimer un badge
  delete: async (id: string) => {
    const response = await axios.delete(`/badges/${id}`);
    return response.data;
  },

  // Changer statut badge
  updateStatus: async (id: string, data: UpdateBadgeStatusDto) => {
    const response = await axios.put(`/badges/${id}/status`, data);
    return response.data;
  },

  // Statistiques
  getStats: async () => {
    const response = await axios.get('/badges/stats');
    return response.data;
  },
};