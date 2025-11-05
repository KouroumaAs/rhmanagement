import { z } from 'zod';

const badgeStatusEnum = z.enum(['EN_ATTENTE', 'IMPRIME', 'ANNULE']);

const badgeTypeEnum = z.enum([
  'PERSONNEL_DSD',
  'DNTT',
  'STAGIAIRE_DSD',
  'BANQUE',
  'EMBOUTISSEUR',
  'DNTT_STAGIAIRE',
  'DEMARCHEUR',
]);

export const badgeQuerySchema = z.object({
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

    status: badgeStatusEnum.optional(),

    type: badgeTypeEnum.optional(),
  }),
});

export const updateBadgeStatusSchema = z.object({
  body: z.object({
    status: badgeStatusEnum,
  }),
});

export const verifyQRCodeSchema = z.object({
  params: z.object({
    qrCode: z
      .string({ required_error: 'Le code QR est requis' })
      .min(1, 'Le code QR est requis')
      .trim(),
  }),
});