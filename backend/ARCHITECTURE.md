# 🏗️ Architecture Backend - RH Management DSD Guinée

## 📦 Structure du projet

```
backend/
├── src/
│   ├── config/              # ⚙️ Configuration
│   │   ├── index.ts         # Variables d'environnement
│   │   └── database.ts      # Connexion MongoDB
│   │
│   ├── types/               # 📘 TypeScript Interfaces
│   │   └── index.ts         # IUser, IEmployee, IBadge
│   │
│   ├── models/              # 🗄️ Mongoose Schemas
│   │   ├── User.ts          # Schéma utilisateur + hash password
│   │   ├── Employee.ts      # Schéma employé + validation
│   │   ├── Badge.ts         # Schéma badge + QR code
│   │   └── index.ts
│   │
│   ├── dtos/                # 📤 Data Transfer Objects
│   │   ├── auth.dto.ts      # RegisterDto, LoginDto, AuthResponseDto
│   │   ├── employee.dto.ts  # CreateEmployeeDto, EmployeeResponseDto
│   │   ├── badge.dto.ts     # BadgeResponseDto, VerifyQRCodeResponseDto
│   │   └── index.ts
│   │
│   ├── validators/          # ✅ Zod Schemas
│   │   ├── auth.validator.ts       # registerSchema, loginSchema
│   │   ├── employee.validator.ts   # createEmployeeSchema, employeeQuerySchema
│   │   ├── badge.validator.ts      # badgeQuerySchema, verifyQRCodeSchema
│   │   └── index.ts
│   │
│   ├── middleware/          # 🔒 Middlewares
│   │   ├── auth.ts          # protect(), authorize()
│   │   ├── validate.ts      # validate(schema) avec Zod
│   │   └── errorHandler.ts  # Gestion erreurs globale
│   │
│   ├── services/            # 💼 Business Logic
│   │   ├── auth.service.ts      # register, login, changePassword
│   │   ├── employee.service.ts  # CRUD employees + stats
│   │   ├── badge.service.ts     # print, verify QR, stats
│   │   └── index.ts
│   │
│   ├── controllers/         # 🎮 HTTP Handlers
│   │   ├── auth.controller.ts       # Arrow functions
│   │   ├── employees.controller.ts  # Arrow functions
│   │   ├── badges.controller.ts     # Arrow functions
│   │   └── index.ts
│   │
│   ├── routes/              # 🛣️ API Routes
│   │   ├── auth.routes.ts       # POST /api/auth/register, /login
│   │   ├── employees.routes.ts  # GET/POST/PUT/DELETE /api/employees
│   │   ├── badges.routes.ts     # GET/POST /api/badges
│   │   └── index.ts
│   │
│   ├── app.ts               # Configuration Express
│   └── server.ts            # Démarrage serveur
│
├── package.json
├── tsconfig.json
├── .env.example
└── ARCHITECTURE.md (ce fichier)
```

---

## 🏛️ Pattern Architectural : Layered Architecture

### Flux de données

```
Client HTTP Request
        ↓
    [Routes]           Définit endpoint + middlewares
        ↓
  [Middlewares]        Auth, Validation Zod, Logging
        ↓
  [Controller]         Reçoit req/res, extrait DTO, appelle service
        ↓
   [Service]           Logique métier pure
        ↓
    [Model]            Mongoose → MongoDB
        ↓
    Database
```

### Responsabilités de chaque couche

| Couche | Responsabilité | Exemple |
|--------|---------------|---------|
| **Routes** | Définir endpoints + associer middlewares | `router.post('/register', validate(registerSchema), authController.register)` |
| **Middlewares** | Validation, Auth, Erreurs | `validate(schema)`, `protect()`, `authorize('ADMIN')` |
| **Controllers** | Gestion HTTP (req/res), appel service | `const result = await authService.register(dto)` |
| **Services** | Logique métier (vérifications, transformations) | Vérifier email unique, créer user, générer JWT |
| **Models** | Schémas DB, validation Mongoose | Hash password avant save, générer QR code |

---

## 📋 Conventions de code

### 1. Controllers (Arrow Functions)

```typescript
// ✅ BON
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto: RegisterDto = req.body;
    const result = await authService.register(dto);

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// ❌ MAUVAIS (function normale)
export async function register(req, res, next) { ... }
```

### 2. Services (Class + Singleton)

```typescript
// ✅ BON
class AuthService {
  register = async (dto: RegisterDto): Promise<AuthResponseDto> => {
    // Logique métier
    const existingUser = await User.findOne({ email: dto.email });
    if (existingUser) throw new Error('Email déjà utilisé');

    const user = await User.create(dto);
    const token = jwt.sign({ id: user._id }, config.jwtSecret);

    return { user, token };
  };
}

export default new AuthService();
```

### 3. Validators (Zod)

```typescript
// ✅ BON
export const registerSchema = z.object({
  body: z.object({
    nom: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
```

### 4. Routes (avec validation)

```typescript
// ✅ BON
import { validate } from '../middleware/validate';
import { registerSchema } from '../validators';

router.post('/register', validate(registerSchema), authController.register);
```

### 5. DTOs (Interfaces)

```typescript
// ✅ BON
export class RegisterDto {
  nom!: string;
  prenom!: string;
  email!: string;
  password!: string;
  role?: UserRole;
}

export class AuthResponseDto {
  user!: UserResponseDto;
  token!: string;
}
```

---

## 🎯 Ressources de l'application

### 1. **Auth** (Authentification)

**Endpoints:**
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur (protected)
- `PUT /api/auth/change-password` - Changer mot de passe (protected)
- `POST /api/auth/forgot-password` - Demande reset
- `PUT /api/auth/reset-password` - Reset mot de passe

**Rôles:**
- `RH` - Gestion employés
- `IMPRESSION` - Impression badges
- `ADMIN` - Tous droits

### 2. **Employees** (Employés)

**Endpoints:**
- `GET /api/employees` - Liste avec pagination/filtres
- `GET /api/employees/:id` - Détails employé
- `POST /api/employees` - Créer (RH, ADMIN)
- `PUT /api/employees/:id` - Modifier (RH, ADMIN)
- `DELETE /api/employees/:id` - Supprimer (ADMIN)
- `PUT /api/employees/:id/status` - Changer statut (RH, ADMIN)
- `POST /api/employees/:id/transfer-to-print` - Vers impression (RH, ADMIN)
- `GET /api/employees/stats` - Statistiques

**7 Catégories:**
1. PERSONNELS_DSD - Personnels DSD Guinée
2. DNTT - DNTT
3. STAGIAIRES_DSD - Stagiaires DSD Guinée
4. BANQUES - Banques
5. MAISONS_PLAQUE - Maisons de Plaque
6. DNTT_STAGIAIRES - DNTT Stagiaires
7. DEMARCHEURS - Collectif des Démarcheurs

**Statuts:**
- `ACTIF` - Employé actif
- `SUSPENDU` - Temporairement suspendu
- `TERMINE` - Contrat terminé

### 3. **Badges**

**Endpoints:**
- `GET /api/badges` - Liste badges avec filtres
- `GET /api/badges/:id` - Détails badge
- `POST /api/badges/:id/print` - Imprimer (IMPRESSION, ADMIN)
- `GET /api/badges/:id/qr-code` - Générer QR code image
- `GET /api/badges/verify/:qrCode` - Vérifier badge (public)
- `PUT /api/badges/:id/status` - Changer statut (IMPRESSION, ADMIN)
- `DELETE /api/badges/:id` - Supprimer (ADMIN)
- `GET /api/badges/stats` - Statistiques

**Statuts:**
- `EN_ATTENTE` - En attente d'impression
- `IMPRIME` - Badge imprimé
- `ANNULE` - Badge annulé

**QR Code Verification:**
Le QR code vérifie:
1. Badge existe ?
2. Employé est `ACTIF` ?
3. Contrat non expiré (`dateFinContrat` > maintenant) ?

---

## 🔐 Authentification & Autorisation

### JWT Token

```typescript
// Génération
const token = jwt.sign({ id: user._id }, config.jwtSecret, {
  expiresIn: '7d',
});

// Vérification (middleware protect)
const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
const user = await User.findById(decoded.id);
req.user = user;
```

### Middleware d'autorisation

```typescript
// Protéger route (authentification requise)
router.get('/me', protect, authController.getMe);

// Autoriser rôles spécifiques
router.post('/employees', protect, authorize('RH', 'ADMIN'), employeesController.create);
```

---

## ✅ Validation avec Zod

### Schéma de validation

```typescript
export const createEmployeeSchema = z.object({
  body: z.object({
    nom: z.string().min(2).max(50),
    email: z.string().email(),
    matricule: z.string().regex(/^MAT-\d{4}-\d{3}$/),
    type: z.enum(['PERSONNELS_DSD', 'DNTT', 'STAGIAIRES_DSD', ...]),
    dateEmbauche: z.string().refine((date) => !isNaN(Date.parse(date))),
  }),
});
```

### Middleware validate()

```typescript
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      // Retourne erreurs formatées
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: error.errors,
      });
    }
  };
};
```

---

## 🗄️ Modèles Mongoose

### User Model (avec hash password)

```typescript
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

### Badge Model (avec QR code)

```typescript
badgeSchema.pre('save', async function (next) {
  if (this.isNew) {
    const year = new Date().getFullYear();
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.qrCode = `QR-${year}-${randomId}`;
  }
  next();
});

badgeSchema.methods.generateQRCodeImage = async function (): Promise<string> {
  return QRCode.toDataURL(this.qrCode);
};
```

---

## 📊 Format des réponses API

### Succès

```json
{
  "success": true,
  "message": "Opération réussie",
  "data": { ... }
}
```

### Erreur

```json
{
  "success": false,
  "message": "Message d'erreur",
  "errors": [ ... ]  // optionnel pour validation
}
```

### Pagination

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

---

## 🚀 Stack technique

### Dependencies principales

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "typescript": "^5.3.3",
  "zod": "^3.22.4",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "qrcode": "^1.5.3",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "morgan": "^1.10.0",
  "dotenv": "^16.3.1"
}
```

### Variables d'environnement (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/rh-management

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d

# CORS
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# App
APP_NAME=RH Management DSD Guinée
APP_URL=http://localhost:3000
```

---

## 🎓 Exemple complet : Feature "Register"

### 1. Route (`routes/auth.routes.ts`)

```typescript
router.post('/register', validate(registerSchema), authController.register);
```

### 2. Validator (`validators/auth.validator.ts`)

```typescript
export const registerSchema = z.object({
  body: z.object({
    nom: z.string().min(2),
    prenom: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['RH', 'IMPRESSION', 'ADMIN']).optional(),
  }),
});
```

### 3. Controller (`controllers/auth.controller.ts`)

```typescript
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto: RegisterDto = req.body;
    const result = await authService.register(dto);

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
```

### 4. Service (`services/auth.service.ts`)

```typescript
class AuthService {
  register = async (dto: RegisterDto): Promise<AuthResponseDto> => {
    // 1. Vérifier email unique
    const existingUser = await User.findOne({ email: dto.email });
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé');
    }

    // 2. Créer utilisateur (password hashé automatiquement)
    const user = await User.create({
      nom: dto.nom,
      prenom: dto.prenom,
      email: dto.email,
      password: dto.password,
      role: dto.role || 'RH',
    });

    // 3. Générer JWT token
    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpire,
    });

    // 4. Retourner réponse
    return {
      user: {
        id: user._id.toString(),
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
      token,
    };
  };
}
```

### 5. Model (`models/User.ts`)

```typescript
const userSchema = new Schema<IUser>({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['RH', 'IMPRESSION', 'ADMIN'], default: 'RH' },
}, { timestamps: true });

// Hash password avant save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

---

## 📝 Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer production
npm start

# Linter
npm run lint

# Format code
npm run format
```

---

## 🎯 Prompt pour répliquer cette architecture

```
Crée un backend Node.js + TypeScript + MongoDB avec l'architecture suivante:

📦 STRUCTURE:
src/
├── config/ (database, env)
├── types/ (interfaces TypeScript)
├── models/ (Mongoose schemas)
├── dtos/ (Data Transfer Objects)
├── validators/ (Zod schemas)
├── middleware/ (auth, validate, errorHandler)
├── services/ (business logic - classes singleton)
├── controllers/ (HTTP handlers - arrow functions)
├── routes/ (API routes)
├── app.ts
└── server.ts

🏗️ ARCHITECTURE: Routes → Middleware → Controller → Service → Model

📋 RÈGLES:
- Controllers: arrow functions async
- Services: classes avec export default new Service()
- Validation: Zod avec middleware validate()
- Auth: JWT avec middleware protect() et authorize()
- Erreurs: middleware errorHandler global
- Réponses: format { success, message?, data?, errors? }

🎯 RESSOURCES: [liste tes ressources ici]

Génère tous les fichiers avec code complet.
```

---

**Auteur:** Claude AI
**Projet:** RH Management - DSD Guinée
**Date:** 2025
**Version:** 1.0