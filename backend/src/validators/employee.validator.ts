import { z } from 'zod';

// Helper to transform empty strings to undefined
const emptyStringToUndefined = z.preprocess((val) => {
  if (val === '' || val === 'undefined' || val === 'null' || val === null) {
    return undefined;
  }
  return val;
}, z.string().email('Format d\'email invalide').trim().toLowerCase().optional());

const employeeTypeEnum = z.enum([
  'PERSONNEL_DSD',
  'DNTT',
  'STAGIAIRE_DSD',
  'BANQUE',
  'EMBOUTISSEUR',
  'DNTT_STAGIAIRE',
  'DEMARCHEUR',
  'ASSURANCE',
]);

const employeeStatusEnum = z.enum(['ACTIF', 'SUSPENDU', 'TERMINE', 'BLOQUE']);

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

    email: emptyStringToUndefined,

    fonction: z
      .string({ required_error: 'La fonction est requise' })
      .min(2, 'La fonction doit contenir au moins 2 caractères')
      .max(100, 'La fonction doit contenir au maximum 100 caractères')
      .trim(),

    profil: z
      .union([z.string().trim(), z.literal('')])
      .optional()
      .transform((val) => val === '' || val === undefined ? undefined : val),

    diplome: z
      .union([z.string().trim(), z.literal('')])
      .optional()
      .transform((val) => val === '' || val === undefined ? undefined : val),

    matricule: z
      .string({ required_error: 'Le matricule est requis' })
      .min(3, 'Le matricule doit contenir au moins 3 caractères')
      .trim(),

    type: employeeTypeEnum,

    sousType: z
      .union([z.string().trim(), z.literal('')])
      .optional()
      .transform((val) => val === '' || val === undefined ? undefined : val),

    typeContrat: z.preprocess((val) => {
      if (val === 'undefined' || val === 'null' || val === '' || val === null) {
        return undefined;
      }
      return val;
    }, contractTypeEnum.optional()),

    dateEmbauche: z
      .preprocess((val) => {
        console.log('🔍 [VALIDATOR] dateEmbauche reçu:', val, 'Type:', typeof val);
        // Transformer les chaînes vides ou invalides en undefined
        if (!val || val === '' || val === 'undefined' || val === 'null') {
          console.log('✅ [VALIDATOR] dateEmbauche vide -> undefined');
          return undefined;
        }
        console.log('✅ [VALIDATOR] dateEmbauche valide:', val);
        return val;
      }, z.union([
        z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: "Format de date invalide",
        }).transform((val) => new Date(val)),
        z.undefined()
      ])),

    dateFinContrat: z
      .string()
      .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Format de date invalide",
      })
      .transform((date) => date ? new Date(date) : undefined)
      .optional(),

    photo: z
      .union([z.string().url('URL de photo invalide'), z.literal('')])
      .optional()
      .transform((val) => val === '' || val === undefined ? undefined : val),
  })
  .refine((data) => {
    console.log('🔍 [VALIDATOR REFINE] Données complètes:', JSON.stringify({
      type: data.type,
      dateEmbauche: data.dateEmbauche,
      typeContrat: data.typeContrat
    }, null, 2));
    // dateEmbauche est obligatoire uniquement pour PERSONNEL_DSD
    if (data.type === 'PERSONNEL_DSD' && !data.dateEmbauche) {
      console.log('❌ [VALIDATOR] dateEmbauche manquante pour PERSONNEL_DSD');
      return false;
    }
    console.log('✅ [VALIDATOR] Validation dateEmbauche OK');
    return true;
  }, {
    message: "La date d'embauche est obligatoire pour le personnel DSD",
    path: ['dateEmbauche'],
  })
  .refine((data) => {
    console.log('🔍 [VALIDATOR REFINE dateFinContrat] Type:', data.type, 'TypeContrat:', data.typeContrat, 'dateFinContrat:', data.dateFinContrat);

    // Date de fin uniquement requise pour PERSONNEL_DSD et STAGIAIRE_DSD
    if (data.type !== 'PERSONNEL_DSD' && data.type !== 'STAGIAIRE_DSD') {
      console.log('✅ [VALIDATOR] dateFinContrat facultative pour type:', data.type);
      return true;
    }

    // Si CDD ou STAGE, la date de fin est obligatoire
    if ((data.typeContrat === 'CDD' || data.typeContrat === 'STAGE') && !data.dateFinContrat) {
      console.log('❌ [VALIDATOR] dateFinContrat manquante pour CDD/STAGE');
      return false;
    }

    console.log('✅ [VALIDATOR] Validation dateFinContrat OK');
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

    email: emptyStringToUndefined,

    fonction: z
      .string()
      .min(2, 'La fonction doit contenir au moins 2 caractères')
      .max(100, 'La fonction doit contenir au maximum 100 caractères')
      .trim()
      .optional(),

    profil: z
      .union([z.string().trim(), z.literal('')])
      .optional()
      .transform((val) => val === '' || val === undefined ? undefined : val),

    diplome: z
      .union([z.string().trim(), z.literal('')])
      .optional()
      .transform((val) => val === '' || val === undefined ? undefined : val),

    matricule: z
      .string()
      .min(3, 'Le matricule doit contenir au moins 3 caractères')
      .trim()
      .optional(),

    type: employeeTypeEnum.optional(),

    sousType: z
      .union([z.string().trim(), z.literal('')])
      .optional()
      .transform((val) => val === '' || val === undefined ? undefined : val),

    typeContrat: z.preprocess((val) => {
      if (val === 'undefined' || val === 'null' || val === '' || val === null) {
        return undefined;
      }
      return val;
    }, contractTypeEnum.optional()),

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

    photo: z
      .union([z.string().url('URL de photo invalide'), z.literal('')])
      .optional()
      .transform((val) => val === '' || val === undefined ? undefined : val),

    status: employeeStatusEnum.optional(),

    motifSuspension: z
      .union([z.string().trim(), z.literal('')])
      .optional()
      .transform((val) => val === '' || val === undefined ? undefined : val),

    dateFinSuspension: z
      .string()
      .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Format de date invalide",
      })
      .transform((date) => date ? new Date(date) : undefined)
      .optional(),
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