# 🏢 RH Management Backend - DSD Guinée

Backend API pour la gestion des ressources humaines et l'impression de badges avec QR code.

## 🚀 Démarrage rapide

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Production
npm start
```

## 📦 Stack Technique

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **MongoDB** + **Mongoose** - Base de données
- **JWT** - Authentification
- **Zod** - Validation
- **QRCode** - Génération QR codes

## 🏗️ Architecture

```
Routes → Middlewares → Controllers → Services → Models → Database
```

Voir `ARCHITECTURE.md` pour la documentation complète.

## 🔐 Variables d'environnement

Copier `.env.example` vers `.env` et configurer:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rh-management
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
ALLOWED_ORIGINS=http://localhost:3001
```

## 📚 API Endpoints

### Auth
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil (protected)
- `PUT /api/auth/change-password` - Changer mot de passe (protected)

### Employees
- `GET /api/employees` - Liste employés (protected)
- `POST /api/employees` - Créer employé (RH, ADMIN)
- `GET /api/employees/:id` - Détails employé (protected)
- `PUT /api/employees/:id` - Modifier employé (RH, ADMIN)
- `DELETE /api/employees/:id` - Supprimer employé (ADMIN)
- `POST /api/employees/:id/transfer-to-print` - Transférer vers impression (RH, ADMIN)

### Badges
- `GET /api/badges` - Liste badges (protected)
- `POST /api/badges/:id/print` - Imprimer badge (IMPRESSION, ADMIN)
- `GET /api/badges/verify/:qrCode` - Vérifier QR code (public)

## 👥 Rôles

- **RH** - Gestion des employés
- **IMPRESSION** - Impression des badges
- **ADMIN** - Tous les droits

## 📝 Scripts

```bash
npm run dev      # Développement avec hot reload
npm run build    # Compiler TypeScript
npm start        # Démarrer production
npm run lint     # Vérifier le code
npm run format   # Formater le code
```

## 📄 Licence

ISC © DSD Guinée