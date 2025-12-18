import axios from '@/src/lib/axios';

export interface RegisterDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role?: 'RH' | 'IMPRESSION' | 'ADMIN';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      nom: string;
      prenom: string;
      email: string;
      role: string;
    };
    token: string;
  };
}

export const authService = {
  // Inscription
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await axios.post('/auth/register', data);
    return response.data;
  },

  // Connexion
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await axios.post('/auth/login', data);

    // Sauvegarder le token et user
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }

    return response.data;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Obtenir utilisateur courant
  getMe: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  // Changer mot de passe
  changePassword: async (data: ChangePasswordDto) => {
    const response = await axios.put('/auth/change-password', data);
    return response.data;
  },

  // Demander reset mot de passe
  forgotPassword: async (email: string) => {
    const response = await axios.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset mot de passe
  resetPassword: async (resetToken: string, newPassword: string) => {
    const response = await axios.put('/auth/reset-password', {
      resetToken,
      newPassword,
    });
    return response.data;
  },

  // Vérifier si connecté
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  },

  // Obtenir user depuis localStorage
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};