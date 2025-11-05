import { UserRole } from '../types';

export class RegisterDto {
  nom!: string;
  prenom!: string;
  email!: string;
  telephone!: string;
  password!: string;
  role?: UserRole;
}

export class LoginDto {
  email!: string;
  password!: string;
}

export class ChangePasswordDto {
  currentPassword!: string;
  newPassword!: string;
}

export class ForgotPasswordDto {
  email!: string;
}

export class ResetPasswordDto {
  resetToken!: string;
  newPassword!: string;
}

export class UserResponseDto {
  id!: string;
  nom!: string;
  prenom!: string;
  email!: string;
  role!: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AuthResponseDto {
  user!: UserResponseDto;
  token!: string;
}