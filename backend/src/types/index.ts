import { Document, ObjectId } from 'mongoose';

// Employee Types
export type EmployeeType =
  | 'PERSONNEL_DSD'
  | 'DNTT'
  | 'STAGIAIRE_DSD'
  | 'BANQUE'
  | 'EMBOUTISSEUR'
  | 'DNTT_STAGIAIRE'
  | 'DEMARCHEUR';

export type EmployeeStatus = 'ACTIF' | 'SUSPENDU' | 'TERMINE';

export type ContractType = 'CDI' | 'CDD' | 'STAGE';

export interface IEmployee extends Document {
  _id:ObjectId,
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse?: string;
  dateNaissance?: Date;
  dateFinContrat?: Date;
  dateEmbauche?: Date;
  typeContrat: ContractType;
  // dateFinContrat?: Date;
  fonction: string;
  profil?: string;
  diplome?: string;
  matricule: string;
  type: EmployeeType;
  sousType?: string;
  status: EmployeeStatus;
  motifSuspension?: string;
  dateFinSuspension?: Date;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Badge Types
export type BadgeStatus = 'EN_ATTENTE' | 'IMPRIME' | 'REIMPRESSION';

export interface IReprintHistoryEntry {
  authorizedBy: IUser['_id'];
  authorizedAt: Date;
  printedAt?: Date;
}

export interface IBadge extends Document {
  _id:string
  employee: IEmployee['_id'];
  status: BadgeStatus;
  qrCode: string;
  requestDate: Date;
  printDate?: Date;
  printCount: number;
  reprintHistory: IReprintHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
  markAsPrinted(): Promise<void>;
  authorizeReprint(userId: string): Promise<void>;
  generateQRCodeImage(): Promise<string>;
}

// User Types
export type UserRole = 'RH' | 'ASSISTANT_RH' | 'IMPRESSION' | 'ADMIN' | 'SECURITY';

export interface IUser extends Document {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  password: string;
  role: UserRole;
  lastLogin?: Date;
  isActive: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Request Types
export interface AuthRequest extends Request {
  user?: IUser;
}

// API Response Types
export interface ApiResponse<T = any> {
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

// Activity Log Types
export type ActivityAction =
  // User Management
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'USER_CREATED'
  | 'USER_UPDATED'
  | 'USER_DELETED'
  | 'USER_ACTIVATED'
  | 'USER_DEACTIVATED'
  | 'USER_BLOCKED'
  | 'USER_UNBLOCKED'
  | 'PASSWORD_CHANGED'
  | 'PASSWORD_RESET'
  // Employee Management
  | 'EMPLOYEE_CREATED'
  | 'EMPLOYEE_UPDATED'
  | 'EMPLOYEE_DELETED'
  | 'EMPLOYEE_STATUS_CHANGED'
  | 'EMPLOYEE_TRANSFERRED_TO_PRINT'
  // Badge Management
  | 'BADGE_CREATED'
  | 'BADGE_PRINTED'
  | 'BADGE_DELETED'
  | 'BADGE_STATUS_CHANGED'
  | 'BADGE_VERIFIED';

export type ResourceType = 'USER' | 'EMPLOYEE' | 'BADGE';

export type ActivityStatus = 'SUCCESS' | 'FAILURE';

export interface IActivityLog extends Document {
  user: IUser['_id'];
  action: ActivityAction;
  resourceType?: ResourceType;
  resourceId?: any;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  status: ActivityStatus;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}