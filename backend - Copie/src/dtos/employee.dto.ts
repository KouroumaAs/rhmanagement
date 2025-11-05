import { EmployeeType, EmployeeStatus, ContractType } from '../types';

export class CreateEmployeeDto {
  nom!: string;
  prenom!: string;
  email!: string;
  telephone!: string;
  fonction!: string;
  profil?: string;
  diplome?: string;
  matricule!: string;
  type!: EmployeeType;
  sousType?: string;
  typeContrat!: ContractType;
  dateEmbauche!: Date;
  dateFinContrat?: Date;
  photo?: string;

}

export class UpdateEmployeeDto {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  fonction?: string;
  profil?: string;
  diplome?: string;
  matricule?: string;
  type?: EmployeeType;
  sousType?: string;
  typeContrat?: ContractType;
  dateEmbauche?: Date;
  dateFinContrat?: Date;
  photo?: string;
  status?: EmployeeStatus;
  motifSuspension?: string;
  dateFinSuspension?: Date;
}

export class UpdateEmployeeStatusDto {
  status!: EmployeeStatus;
  motifSuspension?: string;
  dateFinSuspension?: Date;
}

export class EmployeeResponseDto {
  id!: string;
  nom!: string;
  prenom!: string;
  email!: string;
  telephone!: string;
  fonction!: string;
  profil?: string;
  diplome?: string;
  matricule!: string;
  type!: EmployeeType;
  sousType?: string;
  typeContrat!: ContractType;
  status!: EmployeeStatus;
  dateEmbauche!: Date;
  dateFinContrat?: Date;
  motifSuspension?: string;
  dateFinSuspension?: Date;
  photo?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class EmployeeQueryDto {
  page?: number;
  limit?: number;
  type?: EmployeeType;
  status?: EmployeeStatus;
  search?: string;
  dateFinContratDe?: string;
  dateFinContratA?: string;
  profil?: string;
  diplome?: string;
}

export class PaginatedEmployeeResponseDto {
  data!: EmployeeResponseDto[];
  pagination!: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export class EmployeeStatsDto {
  total!: number;
  active!: number;
  suspended!: number;
  terminated!: number;
  byType!: Array<{ _id: string; count: number }>;
  recent!: EmployeeResponseDto[];
}