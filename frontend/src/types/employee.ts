/**
 * Types pour les employés
 */

export type EmployeeStatus = 'ACTIF' | 'SUSPENDU' | 'TERMINE';

export type ContractType = 'CDI' | 'CDD' | 'STAGE';

export type EmployeeType =
  | 'PERSONNEL_DSD'
  | 'DNTT'
  | 'STAGIAIRE_DSD'
  | 'BANQUE'
  | 'EMBOUTISSEUR'
  | 'DNTT_STAGIAIRE'
  | 'DEMARCHEUR';

export type BanqueType = 'TTLB' | 'GLOBAL' | 'I_CRDIGITAL';

export type BadgeStatus = 'EN_ATTENTE' | 'IMPRIME' | 'REIMPRESSION';

export interface Employee {
  id: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone: string;
  fonction: string;
  profil?: string;
  diplome?: string;
  matricule: string;
  type: EmployeeType;
  sousType?: string | null;
  status: EmployeeStatus;
  dateEmbauche: string;
  typeContrat: ContractType;
  dateFinContrat?: string | null;
  motifSuspension?: string | null;
  dateFinSuspension?: string | null;
  photo?: string;
  hasBadge: boolean;
  badgeId?: string | null;
  badgeStatus?: BadgeStatus | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeQueryParams {
  page?: string;
  limit?: string;
  type?: string;
  status?: string;
  search?: string;
  dateFinContratDe?: string;
  dateFinContratA?: string;
}
