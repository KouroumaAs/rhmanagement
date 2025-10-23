import { get, put, del } from './api';
import { API_ENDPOINTS } from '@/src/constants';

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  role: string;
  isActive: boolean;
  isBlocked: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserDto {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  role?: string;
}

const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const userService = {
  // Récupérer tous les utilisateurs
  getAll: async () => {
    return get<User[]>(API_ENDPOINTS.AUTH.USERS, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Récupérer un utilisateur par ID
  getById: async (id: string) => {
    return get<User>(`${API_ENDPOINTS.AUTH.USERS}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Mettre à jour un utilisateur
  update: async (id: string, data: UpdateUserDto) => {
    return put<User>(`${API_ENDPOINTS.AUTH.USERS}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Activer/Désactiver un utilisateur
  toggleActive: async (id: string) => {
    return put<User>(`${API_ENDPOINTS.AUTH.USERS}/${id}/active`, {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Réinitialiser le mot de passe d'un utilisateur (Admin)
  resetPassword: async (id: string, newPassword: string) => {
    return put<void>(`${API_ENDPOINTS.AUTH.USERS}/${id}/reset-password`, { newPassword }, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  // Supprimer un utilisateur
  delete: async (id: string) => {
    return del(`${API_ENDPOINTS.AUTH.USERS}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};
