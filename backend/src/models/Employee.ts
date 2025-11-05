import mongoose, { Schema } from 'mongoose';
import { IEmployee } from '../types';

const employeeSchema = new Schema<IEmployee>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
    },
    telephone: {
      type: String,
      required: [true, 'Le téléphone est requis'],
      trim: true,
      match: [/^(\+224\s?)?6\d{2}(\s?\d{2}){3}$/, 'Format accepté: 6xxxxxxxx ou +224 6xx xx xx xx'],
    },
    email: {
      type: String,
      required: [true, 'L\'email est requis'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format d\'email invalide'],
    },
    fonction: {
      type: String,
      required: [true, 'La fonction est requise'],
      trim: true,
    },
    profil: {
      type: String,
      trim: true,
      default: null,
    },
    diplome: {
      type: String,
      trim: true,
      default: null,
    },
    matricule: {
      type: String,
      required: [true, 'Le matricule est requis'],
      unique: true,
      trim: true,
      uppercase: true,
      minlength: [4, 'Le matricule doit contenir au moins 4 caractères'],
    },
    type: {
      type: String,
      required: [true, "Le type d'employé est requis"],
      enum: {
        values: [
          'PERSONNEL_DSD',
          'DNTT',
          'STAGIAIRE_DSD',
          'BANQUE',
          'EMBOUTISSEUR',
          'DNTT_STAGIAIRE',
          'DEMARCHEUR',
        ],
        message: '{VALUE} n\'est pas un type valide',
      },
    },
    sousType: {
      type: String,
      default: null,
      // Pour BANQUE: TTLB, GLOBAL, I_CRDIGITAL
      // Pour EMBOUTISSEUR: nom de l'emboutisseur
    },
    status: {
      type: String,
      enum: {
        values: ['ACTIF', 'SUSPENDU', 'TERMINE'],
        message: '{VALUE} n\'est pas un statut valide',
      },
      default: 'ACTIF',
    },
    dateEmbauche: {
      type: Date,
      required: [true, "La date d'embauche est requise"],
    },
    typeContrat: {
      type: String,
      enum: {
        values: ['CDI', 'CDD', 'STAGE'],
        message: '{VALUE} n\'est pas un type de contrat valide',
      },
      default: 'CDD',
    },
    dateFinContrat: {
      type: Date,
      required: function (this: IEmployee) {
        // Date de fin requise pour CDD et STAGE, pas pour CDI
        return this.typeContrat === 'CDD' || this.typeContrat === 'STAGE';
      },
      validate: {
        validator: function (this: IEmployee, value: Date) {
          // Si pas de valeur et CDI, c'est valide
          if (!value && this.typeContrat === 'CDI') return true;
          // Si pas de dateEmbauche, skip la validation (pendant les mises à jour partielles)
          if (!this.dateEmbauche) return true;
          // Si CDD ou STAGE, la date de fin doit être après la date d'embauche
          if ((this.typeContrat === 'CDD' || this.typeContrat === 'STAGE') && value) {
            return value > this.dateEmbauche;
          }
          return true;
        },
        message: 'La date de fin doit être après la date d\'embauche',
      },
    },
    photo: {
      type: String,
      default: null,
    },
    motifSuspension: {
      type: String,
      default: null,
    },
    dateFinSuspension: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
employeeSchema.index({ nom: 'text', prenom: 'text', matricule: 'text' });
employeeSchema.index({ type: 1, status: 1 });
employeeSchema.index({ matricule: 1 });

// Virtual for full name
employeeSchema.virtual('fullName').get(function () {
  return `${this.prenom} ${this.nom}`;
});

// Check if contract is expired
employeeSchema.methods.isContractExpired = function (): boolean {
  // CDI n'expire jamais
  if (this.typeContrat === 'CDI') return false;
  // CDD: vérifier la date de fin
  return this.dateFinContrat ? new Date() > this.dateFinContrat : false;
};

export default mongoose.model<IEmployee>('Employee', employeeSchema);