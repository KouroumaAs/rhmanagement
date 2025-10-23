# Structure du Projet RH Management

## 📁 Architecture

```
frontend/
├── app/                          # Next.js App Router
│   ├── login/                    # Page de connexion
│   ├── register/                 # Page d'inscription
│   ├── forgot-password/          # Réinitialisation mot de passe
│   ├── change-password/          # Modification mot de passe
│   ├── dashboard/
│   │   ├── rh/                   # Dashboard RH
│   │   │   └── employees/        # Gestion employés
│   │   │       └── new/          # Nouveau employé
│   │   └── impression/           # Service d'impression
│   ├── layout.tsx                # Layout racine
│   └── globals.css               # Styles globaux
│
├── src/                          # Code source organisé
│   ├── types/                    # Types TypeScript
│   │   └── index.ts              # Toutes les interfaces et types
│   │
│   ├── constants/                # Constantes de l'application
│   │   └── index.ts              # Configuration, labels, routes, etc.
│   │
│   ├── utils/                    # Fonctions utilitaires
│   │   └── index.ts              # Helpers, validations, formatage
│   │
│   ├── services/                 # Couche service API
│   │   ├── api.ts                # Client HTTP de base
│   │   ├── auth.service.ts       # Service d'authentification
│   │   ├── employees.service.ts  # Service employés
│   │   ├── badges.service.ts     # Service badges
│   │   └── index.ts              # Exports centralisés
│   │
│   └── components/               # Composants réutilisables
│       ├── common/               # Composants communs
│       │   ├── StatusBadge.tsx   # Badge de statut
│       │   └── TypeBadge.tsx     # Badge de type
│       ├── features/             # Composants métier
│       └── layout/               # Composants de layout
│
├── components/                   # shadcn/ui components
│   └── ui/                       # Composants UI de base
│
├── .env.local.example            # Variables d'environnement exemple
└── STRUCTURE.md                  # Ce fichier

## 🎯 Types d'Employés

1. **PERSONNELS_DSD** - Personnels DSD Guinée
2. **DNTT** - DNTT
3. **STAGIAIRES_DSD** - Stagiaires DSD Guinée
4. **BANQUES** - Banques
5. **MAISONS_PLAQUE** - Maisons de Plaque
6. **DNTT_STAGIAIRES** - DNTT Stagiaires
7. **DEMARCHEURS** - Collectif des Démarcheurs

## 🔒 Rôles Utilisateurs

- **RH** - Ressources Humaines (gestion complète)
- **IMPRESSION** - Service d'impression (impression badges)
- **ADMIN** - Administrateur système

## 📊 Statuts

### Employés
- **ACTIF** - Employé actif
- **EN_ATTENTE** - En attente de validation
- **INACTIF** - Employé inactif

### Badges
- **EN_ATTENTE** - Badge en attente d'impression
- **IMPRIME** - Badge imprimé

## 🛠️ Services API

### AuthService
- `login()` - Connexion utilisateur
- `register()` - Inscription utilisateur
- `logout()` - Déconnexion
- `requestPasswordReset()` - Demande réinitialisation
- `changePassword()` - Changement mot de passe

### EmployeesService
- `getAll()` - Liste des employés (avec filtres)
- `getById()` - Détails d'un employé
- `create()` - Créer employé
- `update()` - Modifier employé
- `delete()` - Supprimer employé
- `transferToPrint()` - Transférer pour impression

### BadgesService
- `getAll()` - Liste des badges
- `getById()` - Détails d'un badge
- `print()` - Imprimer un badge
- `verify()` - Vérifier un QR code

## 🔧 Utilitaires

- Formatage dates (FR)
- Validation email, téléphone, matricule
- Génération QR codes
- Vérification expiration contrats
- Gestion fichiers
- Debounce, truncate, etc.

## 🎨 Constantes

- Labels et couleurs pour tous les types
- Routes de l'application
- Endpoints API
- Messages d'erreur/succès
- Validation regex
- Configuration pagination

## 🚀 Configuration

### Variables d'environnement (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME="RH Management DSD Guinée"
```

## 📝 Conventions de Code

1. **Types** - Utiliser les interfaces dans `src/types`
2. **Constantes** - Centraliser dans `src/constants`
3. **Services** - Toutes les API calls dans `src/services`
4. **Utils** - Fonctions réutilisables dans `src/utils`
5. **Composants** - Composants réutilisables dans `src/components`

## 🔄 Workflow

1. L'utilisateur se connecte via `/login`
2. Redirection vers dashboard selon rôle
3. **RH** peut créer/modifier/supprimer employés
4. **RH** transfère employés pour impression
5. **IMPRESSION** peut imprimer les badges
6. QR codes permettent vérification en temps réel

## 📱 Pages Principales

- `/login` - Connexion
- `/register` - Inscription
- `/dashboard/rh` - Dashboard RH
- `/dashboard/rh/employees` - Liste employés
- `/dashboard/rh/employees/new` - Nouveau employé
- `/dashboard/impression` - Service impression
- `/change-password` - Modification mot de passe
- `/forgot-password` - Mot de passe oublié

## 🎯 Prochaines Étapes

1. Connecter au backend réel
2. Ajouter authentification JWT complète
3. Implémenter génération QR codes réels
4. Ajouter tests unitaires
5. Optimiser performances
6. Ajouter analytics