import { get } from './api';
import { API_ENDPOINTS } from '@/src/constants';

export interface DashboardStats {
  employees: {
    total: number;
    active: number;
    suspended: number;
    terminated: number;
    byType: Array<{ _id: string; count: number }>;
    recent: any[];
  };
  users: {
    total: number;
    active: number;
    inactive: number;
    recent: any[];
  };
  badges: {
    total: number;
    enAttente: number;
    imprime: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class DashboardService {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const user = userStr ? JSON.parse(userStr) : null;
    const userRole = user?.role;

    try {
      // Fetch employee stats
      const employeeStatsResponse = await get<any>(API_ENDPOINTS.EMPLOYEE_STATS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch user stats only if ADMIN
      let userStatsData = {
        total: 0,
        active: 0,
        inactive: 0,
        recent: [],
      };

      if (userRole === 'ADMIN') {
        try {
          const userStatsResponse = await get<any>(API_ENDPOINTS.AUTH.STATS, {
            headers: { Authorization: `Bearer ${token}` },
          });
          userStatsData = userStatsResponse.data?.data || userStatsResponse.data;
        } catch (error) {
          console.warn('Could not fetch user stats:', error);
        }
      }

      // Fetch badges stats
      const badgesStatsResponse = await get<any>(API_ENDPOINTS.BADGE_STATS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('📊 Badge Stats Response:', badgesStatsResponse);

      const badgesStats = badgesStatsResponse.data?.data || badgesStatsResponse.data || {
        total: 0,
        pending: 0,
        printed: 0,
        printedToday: 0,
      };

      console.log('📊 Badge Stats Extracted:', badgesStats);

      // Map backend field names to frontend expectations
      const normalizedBadgesStats = {
        total: badgesStats.total || 0,
        enAttente: badgesStats.pending || 0,
        imprime: badgesStats.printed || 0,
      };

      console.log('📊 Normalized Badge Stats:', normalizedBadgesStats);

      const result = {
        success: true,
        data: {
          employees: employeeStatsResponse.data?.data || employeeStatsResponse.data,
          users: userStatsData,
          badges: normalizedBadgesStats,
        },
      };

      console.log('Dashboard service result:', result);

      return result;
    } catch (error: any) {
      console.error('Dashboard service error:', error);
      throw new Error(error.message || 'Erreur lors du chargement des statistiques');
    }
  }

  async getAllUsers(): Promise<ApiResponse<any[]>> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    try {
      const response = await get<any[]>(API_ENDPOINTS.AUTH.USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        success: true,
        data: response.data || [],
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors du chargement des utilisateurs');
    }
  }
}

export const dashboardService = new DashboardService();
