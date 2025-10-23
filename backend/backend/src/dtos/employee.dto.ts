import { EmployeeType, EmployeeStatus } from '../types';

export class CreateEmployeeDto {
  nom!: string;
  prenom!: string;
  email!: string;
  telephone!: string;
  fonction!: string;
  matricule!: string;
  type!: EmployeeType;
  dateEmbauche!: Date;
  dateFinContrat!: Date;
  photo?: string;
}

export class UpdateEmployeeDto {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  fonction?: string;
  matricule?: string;
  type?: EmployeeType;
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
  matricule!: string;
  type!: EmployeeType;
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