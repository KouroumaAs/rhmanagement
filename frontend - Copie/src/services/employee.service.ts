import { post, get, put, del } from './api';
import { API_ENDPOINTS } from '@/src/constants';
import type { ApiResponse, PaginatedResponse, Employee } from '@/src/types';

export interface CreateEmployeeDto {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  fonction: string;
  matricule: string;
  type: string;
  dateEmbauche: string;
  dateFinContrat?: string;
}

const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const employeeService = {
  // Récupérer tous les employés
  getAll: async (query?: any) => {
    const params = new URLSearchParams(query).toString();
    const endpoint = params ? `${API_ENDPOINTS.EMPLOYEES}?${params}` : API_ENDPOINTS.EMPLOYEES;
    return get<PaginatedResponse<Employee>>(endpoint, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Récupérer un employé par ID
  getById: async (id: string) => {
    return get<Employee>(API_ENDPOINTS.EMPLOYEE_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Créer un nouvel employé
  create: async (data: CreateEmployeeDto) => {
    return post<Employee>(API_ENDPOINTS.EMPLOYEES, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Mettre à jour un employé
  update: async (id: string, data: Partial<CreateEmployeeDto>) => {
    return put<Employee>(API_ENDPOINTS.EMPLOYEE_BY_ID(id), data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Supprimer un employé
  delete: async (id: string) => {
    return del(API_ENDPOINTS.EMPLOYEE_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Transférer vers le service d'impression
  transferToPrint: async (id: string) => {
    return post(`${API_ENDPOINTS.EMPLOYEE_BY_ID(id)}/transfer-to-print`, {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Mettre à jour le statut de l'employé
  updateStatus: async (id: string, status: string, additionalData?: { motifSuspension?: string; dateFinSuspension?: string }) => {
    return put(`${API_ENDPOINTS.EMPLOYEE_BY_ID(id)}/status`, { status, ...additionalData }, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};
