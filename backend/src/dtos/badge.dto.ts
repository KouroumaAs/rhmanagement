import { BadgeStatus, EmployeeType } from '../types';
import { EmployeeResponseDto } from './employee.dto';
import { UserResponseDto } from './auth.dto';

export class CreateBadgeDto {
  employee!: string;
  type!: EmployeeType;
  status?: BadgeStatus;
}

export class UpdateBadgeStatusDto {
  status!: BadgeStatus;
}

export class BadgeResponseDto {
  id!: string;
  employee!: string | EmployeeResponseDto;
  type!: EmployeeType;
  status!: BadgeStatus;
  qrCode!: string;
  printedBy?: string | UserResponseDto;
  printedAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

export class BadgeQueryDto {
  page?: number;
  limit?: number;
  status?: BadgeStatus;
  type?: EmployeeType;
  search?: string;
  dateDemandeDe?: string;
  dateDemandeA?: string;
  dateImpressionDe?: string;
  dateImpressionA?: string;
}

export class PaginatedBadgeResponseDto {
  data!: BadgeResponseDto[];
  pagination!: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export class QRCodeResponseDto {
  qrCode!: string;
  image!: string;
}

export class VerifyQRCodeResponseDto {
  employee?: {
    matricule: string;
  };
}

export class BadgeStatsDto {
  total!: number;
  pending!: number;
  printed!: number;
  cancelled!: number;
  printedToday!: number;
  byType!: Array<{ _id: string; count: number }>;
  recentPrinted!: BadgeResponseDto[];
}