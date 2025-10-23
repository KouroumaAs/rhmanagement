/**
 * Utilitaires d'authentification
 */

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

/**
 * Vérifier si l'utilisateur est authentifié
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Obtenir le token d'authentification
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  return localStorage.getItem('token');
};

/**
 * Obtenir l'utilisateur connecté
 */
export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  const userString = localStorage.getItem('user');
  if (!userString) return null;

  try {
    return JSON.parse(userString);
  } catch {
    return null;
  }
};

/**
 * Sauvegarder les données d'authentification
 */
export const saveAuth = (token: string, user: User): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Effacer les données d'authentification
 */
export const clearAuth = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Vérifier si l'utilisateur a un rôle spécifique
 */
export const hasRole = (role: string): boolean => {
  const user = getUser();
  return user?.role === role;
};

/**
 * Vérifier si l'utilisateur est admin
 */
export const isAdmin = (): boolean => {
  return hasRole('ADMIN');
};

/**
 * Rediriger vers la page de login
 */
export const redirectToLogin = (): void => {
  if (typeof window === 'undefined') return;

  window.location.href = '/login';
};

/**
 * Rediriger vers le dashboard
 */
export const redirectToDashboard = (): void => {
  if (typeof window === 'undefined') return;

  const user = getUser();
  if (!user) {
    redirectToLogin();
    return;
  }

  // Rediriger selon le rôle
  switch (user.role) {
    case 'ADMIN':
    case 'RH':
      window.location.href = '/dashboard/rh';
      break;
    case 'IMPRESSION':
      window.location.href = '/dashboard/impression';
      break;
    case 'SECURITY':
      window.location.href = '/dashboard/security/scan';
      break;
    default:
      window.location.href = '/dashboard/rh';
  }
};
