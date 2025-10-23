// Employee Types
export type EmployeeType =
  | "PERSONNELS_DSD"
  | "DNTT"
  | "STAGIAIRES_DSD"
  | "BANQUES"
  | "MAISONS_PLAQUE"
  | "DNTT_STAGIAIRES"
  | "DEMARCHEURS";

export type EmployeeStatus = "ACTIF" | "SUSPENDU" | "TERMINE";

export type ContractType = "CDI" | "CDD" | "STAGE";

export interface Employee {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse?: string;
  dateNaissance?: string;
  dateEmbauche: string;
  typeContrat: ContractType;
  dateFinContrat?: string | null;
  fonction: string;
  matricule: string;
  type: EmployeeType;
  status: EmployeeStatus;
  motifSuspension?: string | null;
  dateFinSuspension?: string | null;
  photo?: string | null;
  hasBadge?: boolean;
  badgeStatus?: BadgeStatus | null;
  createdAt?: string;
  updatedAt?: string;
}

// Badge Types
export type BadgeStatus = "EN_ATTENTE" | "IMPRIME";

export interface Badge {
  id: number;
  employeeId: number;
  name: string;
  email: string;
  telephone: string;
  fonction: string;
  matricule: string;
  type: EmployeeType;
  status: BadgeStatus;
  requestDate: string;
  printDate?: string;
  qrCode: string;
}

// User Types
export type UserRole = "RH" | "ASSISTANT_RH" | "IMPRESSION" | "ADMIN" | "SECURITY";

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: UserRole;
}

// Form Types
export interface EmployeeFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse?: string;
  dateNaissance?: string;
  dateEmbauche: string;
  typeContrat: ContractType;
  dateFinContrat?: string;
  fonction: string;
  matricule: string;
  typeEmploye: EmployeeType;
  photo?: File | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}