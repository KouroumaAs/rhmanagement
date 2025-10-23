import { z } from 'zod';

const employeeTypeEnum = z.enum([
  'PERSONNELS_DSD',
  'DNTT',
  'STAGIAIRES_DSD',
  'BANQUES',
  'MAISONS_PLAQUE',
  'DNTT_STAGIAIRES',
  'DEMARCHEURS',
]);

const employeeStatusEnum = z.enum(['ACTIF', 'SUSPENDU', 'TERMINE']);

const contractTypeEnum = z.enum(['CDI', 'CDD', 'STAGE']);

export const createEmployeeSchema = z.object({
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

    telephone: z
      .string({ required_error: 'Le téléphone est requis' })
      .regex(/^(\+224\s?)?6\d{2}(\s?\d{2}){3}$/, 'Format accepté: 6xxxxxxxx ou +224 6xx xx xx xx')
      .trim(),

    fonction: z
      .string({ required_error: 'La fonction est requise' })
      .min(2, 'La fonction doit contenir au moins 2 caractères')
      .max(100, 'La fonction doit contenir au maximum 100 caractères')
      .trim(),

    matricule: z
      .string({ required_error: 'Le matricule est requis' })
      .min(3, 'Le matricule doit contenir au moins 3 caractères')
      .trim(),

    type: employeeTypeEnum,

    typeContrat: contractTypeEnum.default('CDD'),

    dateEmbauche: z
      .string({ required_error: "La date d'embauche est requise" })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Format de date invalide",
      })
      .transform((date) => new Date(date)),

    dateFinContrat: z
      .string()
      .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Format de date invalide",
      })
      .transform((date) => date ? new Date(date) : undefined)
      .optional(),

    photo: z.string().url('URL de photo invalide').optional(),
  })
  .refine((data) => {
    // Si CDD ou STAGE, la date de fin est obligatoire
    if ((data.typeContrat === 'CDD' || data.typeContrat === 'STAGE') && !data.dateFinContrat) {
      return false;
    }
    return true;
  }, {
    message: "La date de fin de contrat est obligatoire pour les CDD et STAGE",
    path: ['dateFinContrat'],
  })
  .refine((data) => {
    // Si date de fin existe, elle doit être après la date d'embauche
    if (data.dateFinContrat && data.dateEmbauche) {
      return data.dateFinContrat > data.dateEmbauche;
    }
    return true;
  }, {
    message: "La date de fin de contrat doit être après la date d'embauche",
    path: ['dateFinContrat'],
  }),
});

export const updateEmployeeSchema = z.object({
  body: z.object({
    nom: z
      .string()
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(50, 'Le nom doit contenir au maximum 50 caractères')
      .trim()
      .optional(),

    prenom: z
      .string()
      .min(2, 'Le prénom doit contenir au moins 2 caractères')
      .max(50, 'Le prénom doit contenir au maximum 50 caractères')
      .trim()
      .optional(),

    telephone: z
      .string()
      .regex(/^(\+224\s?)?6\d{2}(\s?\d{2}){3}$/, 'Format accepté: 6xxxxxxxx ou +224 6xx xx xx xx')
      .trim()
      .optional(),

    fonction: z
      .string()
      .min(2, 'La fonction doit contenir au moins 2 caractères')
      .max(100, 'La fonction doit contenir au maximum 100 caractères')
      .trim()
      .optional(),

    matricule: z
      .string()
      .min(3, 'Le matricule doit contenir au moins 3 caractères')
      .trim()
      .optional(),

    type: employeeTypeEnum.optional(),

    typeContrat: contractTypeEnum.optional(),

    dateEmbauche: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Format de date invalide",
      })
      .transform((date) => new Date(date))
      .optional(),

    dateFinContrat: z
      .string()
      .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Format de date invalide",
      })
      .transform((date) => date ? new Date(date) : undefined)
      .optional(),

    photo: z.string().url('URL de photo invalide').optional(),

    status: employeeStatusEnum.optional(),
  }),
});

export const updateEmployeeStatusSchema = z.object({
  body: z.object({
    status: employeeStatusEnum,
    motifSuspension: z
      .string()
      .min(5, 'Le motif doit contenir au moins 5 caractères')
      .trim()
      .optional(),
    dateFinSuspension: z
      .string()
      .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Format de date invalide",
      })
      .transform((date) => date ? new Date(date) : undefined)
      .optional(),
  })
  .refine((data) => {
    // Si le statut est SUSPENDU, motifSuspension et dateFinSuspension sont obligatoires
    if (data.status === 'SUSPENDU') {
      return !!data.motifSuspension && !!data.dateFinSuspension;
    }
    return true;
  }, {
    message: "Le motif et la date de fin sont obligatoires pour un statut SUSPENDU",
    path: ['motifSuspension'],
  }),
});

export const employeeQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .regex(/^\d+$/, 'Le numéro de page doit être un nombre')
      .transform(Number)
      .refine((n) => n > 0, 'Le numéro de page doit être supérieur à 0')
      .optional()
      .default('1'),

    limit: z
      .string()
      .regex(/^\d+$/, 'La limite doit être un nombre')
      .transform(Number)
      .refine((n) => n > 0 && n <= 100, 'La limite doit être entre 1 et 100')
      .optional()
      .default('10'),

    type: employeeTypeEnum.optional(),

    status: employeeStatusEnum.optional(),

    search: z.string().trim().optional(),
  }),
});