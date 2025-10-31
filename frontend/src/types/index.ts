// Employee Types
export type EmployeeType =
  | "PERSONNEL_DSD"
  | "DNTT"
  | "STAGIAIRE_DSD"
  | "BANQUE"
  | "EMBOUTISSEUR"
  | "DNTT_STAGIAIRE"
  | "DEMARCHEUR";

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
  sousType?: string;
  status: EmployeeStatus;
  motifSuspension?: string | null;
  dateFinSuspension?: string | null;
  photo?: string | null;
  hasBadge?: boolean;
  badgeId?: string | null;
  badgeStatus?: BadgeStatus | null;
  printCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Badge Types
export type BadgeStatus = "EN_ATTENTE" | "IMPRIME" | "REIMPRESSION";

export interface ReprintHistoryEntry {
  authorizedBy: string | User;
  authorizedAt: string;
  printedAt?: string;
}

export interface Badge {
  id: string;
  employee: string | Employee;
  type?: EmployeeType;
  status: BadgeStatus;
  qrCode: string;
  printedBy?: string | User;
  printedAt?: string;
  printDate?: string;
  requestDate?: string;
  printCount: number;
  reprintHistory: ReprintHistoryEntry[];
  createdAt: string;
  updatedAt: string;
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