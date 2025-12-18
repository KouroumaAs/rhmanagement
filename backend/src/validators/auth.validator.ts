import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    nom: z
      .string({ required_error: 'Le nom est requis' })
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(50, 'Le nom doit contenir au maximum 50 caractères')
      .trim(),

    prenom: z
      .string({ required_error: 'Le prénom est requis' })
      .min(2, 'Le prénom doit contenir au moins 2 caractères')
      .max(50, 'Le prénom doit contenir au maximum 50 caractères')
      .trim(),

    email: z
      .string({ required_error: "L'email est requis" })
      .email('Email invalide')
      .toLowerCase()
      .trim(),

    telephone: z
      .string({ required_error: 'Le téléphone est requis' })
      .regex(/^(\+224\s?)?6\d{8}$/, 'Format de téléphone invalide. Exemple: 622123456 ou +224622123456')
      .trim(),

    password: z
      .string({ required_error: 'Le mot de passe est requis' })
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),

    role: z
      .enum(['RH', 'ASSISTANT_RH', 'IMPRESSION', 'ADMIN', 'SECURITY'], {
        errorMap: () => ({ message: 'Rôle invalide' }),
      })
      .optional()
      .default('RH'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "L'email est requis" })
      .email('Email invalide')
      .toLowerCase()
      .trim(),

    password: z
      .string({ required_error: 'Le mot de passe est requis' })
      .min(1, 'Le mot de passe est requis'),
  }),
});

export const changePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z
        .string({ required_error: 'Le mot de passe actuel est requis' })
        .min(1, 'Le mot de passe actuel est requis'),

      newPassword: z
        .string({ required_error: 'Le nouveau mot de passe est requis' })
        .min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères'),
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: "Le nouveau mot de passe doit être différent de l'ancien",
      path: ['newPassword'],
    }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "L'email est requis" })
      .email('Email invalide')
      .toLowerCase()
      .trim(),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    resetToken: z
      .string({ required_error: 'Le token est requis' })
      .min(1, 'Le token est requis'),

    newPassword: z
      .string({ required_error: 'Le nouveau mot de passe est requis' })
      .min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères'),
  }),
});

export const adminResetPasswordSchema = z.object({
  body: z.object({
    newPassword: z
      .string({ required_error: 'Le nouveau mot de passe est requis' })
      .min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères'),
  }),
});