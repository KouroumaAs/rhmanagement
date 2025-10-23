import { EmployeeType, EmployeeStatus, BadgeStatus, UserRole } from "@/src/types";

// Employee Type Labels and Colors
export const EMPLOYEE_TYPE_LABELS: Record<EmployeeType, string> = {
  PERSONNELS_DSD: "Personnels DSD Guinée",
  DNTT: "DNTT",
  STAGIAIRES_DSD: "Stagiaires DSD Guinée",
  BANQUES: "Banques",
  MAISONS_PLAQUE: "Maisons de Plaque",
  DNTT_STAGIAIRES: "DNTT Stagiaires",
  DEMARCHEURS: "Collectif des Démarcheurs",
};

export const EMPLOYEE_TYPE_COLORS: Record<EmployeeType, string> = {
  PERSONNELS_DSD: "bg-[#ff8d13]",
  DNTT: "bg-blue-600",
  STAGIAIRES_DSD: "bg-green-600",
  BANQUES: "bg-purple-600",
  MAISONS_PLAQUE: "bg-pink-600",
  DNTT_STAGIAIRES: "bg-teal-600",
  DEMARCHEURS: "bg-amber-600",
};

export const EMPLOYEE_TYPE_BADGE_TITLES: Record<EmployeeType, string> = {
  PERSONNELS_DSD: "PERSONNELS DSD GUINEE",
  DNTT: "DNTT",
  STAGIAIRES_DSD: "STAGIAIRES DSD GUINEE",
  BANQUES: "BANQUES",
  MAISONS_PLAQUE: "MAISONS DE PLAQUE",
  DNTT_STAGIAIRES: "DNTT STAGIAIRES",
  DEMARCHEURS: "COLLECTIF DES DEMARCHEURS",
};

// Employee Status
export const EMPLOYEE_STATUS_LABELS: Record<EmployeeStatus, string> = {
  ACTIF: "Actif",
  SUSPENDU: "Suspendu",
  TERMINE: "Terminé",
};

export const EMPLOYEE_STATUS_COLORS: Record<EmployeeStatus, string> = {
  ACTIF: "bg-green-500",
  SUSPENDU: "bg-[#ff8d13]",
  TERMINE: "bg-gray-500",
};

// Badge Status
export const BADGE_STATUS_LABELS: Record<BadgeStatus, string> = {
  EN_ATTENTE: "En attente",
  IMPRIME: "Imprimé",
};

export const BADGE_STATUS_COLORS: Record<BadgeStatus, string> = {
  EN_ATTENTE: "bg-[#ff8d13]",
  IMPRIME: "bg-green-500",
};

// User Roles
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  RH: "Ressources Humaines",
  ASSISTANT_RH: "Assistant RH",
  IMPRESSION: "Service d'Impression",
  ADMIN: "Administrateur",
  SECURITY: "Agent de Sécurité",
};

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password",
  DASHBOARD_RH: "/dashboard/rh",
  DASHBOARD_IMPRESSION: "/dashboard/impression",
  EMPLOYEES: "/dashboard/rh/employees",
  EMPLOYEES_NEW: "/dashboard/rh/employees/new",
} as const;

// API Endpoints (à configurer selon votre backend)
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
    STATS: "/auth/stats",
    USERS: "/auth/users",
  },

  // Employees
  EMPLOYEES: "/employees",
  EMPLOYEE_BY_ID: (id: string) => `/employees/${id}`,
  EMPLOYEE_STATS: "/employees/stats",

  // Badges
  BADGES: "/badges",
  BADGE_BY_ID: (id: string) => `/badges/${id}`,
  BADGE_STATS: "/badges/stats",
  PRINT_BADGE: (id: string) => `/badges/${id}/print`,

  // Users
  USERS: "/users",
  USER_PROFILE: "/users/me",
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  PHONE_REGEX: /^(\+224\s?)?6\d{2}(\s?\d{2}){3}$/,
  // Regex email optimisée et plus stricte (RFC 5322 simplifié)
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  MATRICULE_REGEX: /.{3,}/,
} as const;

// Date formats
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATETIME_FORMAT = "DD/MM/YYYY HH:mm";

// Messages
export const MESSAGES = {
  SUCCESS: {
    EMPLOYEE_CREATED: "Employé créé avec succès",
    EMPLOYEE_UPDATED: "Employé mis à jour avec succès",
    EMPLOYEE_DELETED: "Employé supprimé avec succès",
    BADGE_PRINTED: "Badge imprimé avec succès",
    PASSWORD_CHANGED: "Mot de passe modifié avec succès",
    LOGIN_SUCCESS: "Connexion réussie",
    LOGOUT_SUCCESS: "Déconnexion réussie",
  },
  ERROR: {
    GENERIC: "Une erreur est survenue",
    NETWORK: "Erreur de connexion au serveur",
    UNAUTHORIZED: "Accès non autorisé",
    NOT_FOUND: "Ressource non trouvée",
    VALIDATION: "Veuillez vérifier les informations saisies",
    PASSWORD_MISMATCH: "Les mots de passe ne correspondent pas",
    INVALID_CREDENTIALS: "Email ou mot de passe incorrect",
  },
} as const;

// Helper pour générer l'URL complète des images
export const getImageUrl = (photoPath: string | null | undefined): string | null => {
  if (!photoPath) return null;

  // Si l'URL commence par http, la retourner telle quelle
  if (photoPath.startsWith('http')) {
    return photoPath;
  }

  // Sinon, préfixer avec l'URL du backend
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
  return `${baseUrl}${photoPath}`;
};