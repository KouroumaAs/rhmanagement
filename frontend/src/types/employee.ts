/**
 * Types pour les employés
 */

export type EmployeeStatus = 'ACTIF' | 'SUSPENDU' | 'TERMINE';

export type ContractType = 'CDI' | 'CDD' | 'STAGE';

export type EmployeeType =
  | 'PERSONNELS_DSD'
  | 'DNTT'
  | 'STAGIAIRES_DSD'
  | 'BANQUES'
  | 'MAISONS_PLAQUE'
  | 'DNTT_STAGIAIRES'
  | 'DEMARCHEURS';

export type BadgeStatus = 'EN_ATTENTE' | 'IMPRIME';

export interface Employee {
  id: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone: string;
  fonction: string;
  matricule: string;
  type: EmployeeType;
  status: EmployeeStatus;
  dateEmbauche: string;
  typeContrat: ContractType;
  dateFinContrat?: string | null;
  motifSuspension?: string | null;
  dateFinSuspension?: string | null;
  photo?: string;
  hasBadge: boolean;
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
