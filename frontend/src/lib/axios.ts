import axios from 'axios';

// Configuration axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://192.168.100.171:4003/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Ajouter le token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Gérer les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Le serveur a répondu avec un status code hors de 2xx
      const { status, data } = error.response;

      if (status === 401) {
        // Token expiré ou invalide
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');

          // Supprimer le cookie aussi
          document.cookie = 'token=; path=/; max-age=0';

          // Utiliser replace pour une redirection immédiate sans retour possible
          window.location.replace('/login');

          // Retourner une promesse rejetée pour stopper l'exécution
          return Promise.reject({
            status: 401,
            message: 'Session expirée. Redirection...',
            redirecting: true
          });
        }
      }

      // Retourner l'erreur formatée
      return Promise.reject({
        status,
        message: data.message || 'Une erreur est survenue',
        errors: data.errors || [],
      });
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      return Promise.reject({
        status: 0,
        message: 'Impossible de contacter le serveur',
        errors: [],
      });
    } else {
      // Erreur lors de la configuration de la requête
      return Promise.reject({
        status: 0,
        message: error.message || 'Une erreur est survenue',
        errors: [],
      });
    }
  }
);

export default axiosInstance;