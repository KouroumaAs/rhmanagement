# 🚀 Guide de Démarrage Rapide - Backend

## 📋 Prérequis

- Node.js >= 18.x
- MongoDB >= 6.x (local ou Atlas)
- npm ou yarn

## ⚡ Installation

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Configuration

Créer le fichier `.env` à la racine du dossier `backend`:

```bash
cp .env.example .env
```

Modifier les variables selon votre environnement:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/rh-management

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-me-in-production
JWT_EXPIRE=7d

# CORS
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# App
APP_NAME=RH Management DSD Guinée
APP_URL=http://localhost:3000
```

### 3. Démarrer MongoDB

**Option A: MongoDB Local**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
Utilisez la connection string d'Atlas dans `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rh-management
```

### 4. Seed la base de données (Optionnel)

Initialiser avec des données de test:

```bash
npm run seed
```

**Credentials créés:**
- Admin: `admin@dsd.gn` / `Admin123!`
- RH: `rh@dsd.gn` / `RH123!`
- Impression: `impression@dsd.gn` / `Impression123!`

### 5. Démarrer le serveur

**Mode Développement (avec hot reload):**
```bash
npm run dev
```

**Mode Production:**
```bash
npm run build
npm start
```

## ✅ Vérifier que ça fonctionne

### Test API Health

```bash
curl http://localhost:3000
```

**Réponse attendue:**
```json
{
  "success": true,
  "message": "RH Management DSD Guinée",
  "version": "1.0.0",
  "environment": "development"
}
```

### Test Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dsd.gn","password":"Admin123!"}'
```

**Réponse attendue:**
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1..."
  }
}
```

## 📡 Endpoints disponibles

Consulter `API_ENDPOINTS.md` pour la documentation complète.

**Base URL:** `http://localhost:3000/api`

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/employees` - Liste employés (protected)
- `POST /api/employees` - Créer employé (RH, ADMIN)
- `GET /api/badges` - Liste badges (protected)
- `GET /api/badges/verify/:qrCode` - Vérifier QR code (public)

## 🔧 Scripts NPM

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre en mode développement avec hot reload |
| `npm run build` | Compile TypeScript → JavaScript |
| `npm start` | Démarre en mode production |
| `npm run seed` | Initialise la DB avec données de test |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run format` | Formate le code avec Prettier |

## 📁 Structure du projet

```
backend/
├── src/
│   ├── config/          # Configuration (DB, env)
│   ├── types/           # TypeScript interfaces
│   ├── models/          # Mongoose models
│   ├── dtos/            # Data Transfer Objects
│   ├── validators/      # Zod schemas
│   ├── middleware/      # Auth, validation, errors
│   ├── services/        # Business logic
│   ├── controllers/     # HTTP handlers
│   ├── routes/          # API routes
│   ├── seeds/           # Database seeders
│   ├── app.ts           # Express app
│   └── server.ts        # Server entry point
├── .env                 # Variables d'environnement
├── package.json
├── tsconfig.json
└── README.md
```

## 🐛 Troubleshooting

### MongoDB connection error

**Erreur:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
1. Vérifier que MongoDB est démarré
2. Vérifier `MONGODB_URI` dans `.env`
3. Tester la connexion: `mongosh mongodb://localhost:27017`

### Port déjà utilisé

**Erreur:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

Ou changer le PORT dans `.env`

### JWT_SECRET manquant

**Erreur:** `JWT_SECRET is not defined`

**Solution:**
Ajouter `JWT_SECRET=your-secret-key` dans `.env`

### Erreur de validation Zod

**Erreur:** `Erreur de validation`

**Solution:**
Vérifier le format des données envoyées (voir `API_ENDPOINTS.md`)

## 🔐 Sécurité

### En Production:

1. ✅ Changer `JWT_SECRET` par une valeur forte
2. ✅ Utiliser HTTPS
3. ✅ Configurer `ALLOWED_ORIGINS` avec les vrais domaines
4. ✅ Utiliser MongoDB Atlas avec authentification
5. ✅ Mettre `NODE_ENV=production`
6. ✅ Activer les logs avec un service externe
7. ✅ Limiter le taux de requêtes (rate limiting)

## 📞 Support

- Documentation: `ARCHITECTURE.md`
- API Endpoints: `API_ENDPOINTS.md`
- Issues: Créer un ticket

---

✅ **Backend prêt à être connecté au frontend!**