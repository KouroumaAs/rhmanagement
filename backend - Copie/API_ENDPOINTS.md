# 📡 API Endpoints - RH Management

Base URL: `http://localhost:3000/api`

## 🔐 Authentication Endpoints

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "nom": "Barry",
  "prenom": "Mariame",
  "email": "mariame@dsd.gn",
  "password": "Password123!",
  "role": "RH"  // Optional: RH | IMPRESSION | ADMIN
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "data": {
    "user": {
      "id": "...",
      "nom": "Barry",
      "prenom": "Mariame",
      "email": "mariame@dsd.gn",
      "role": "RH"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@dsd.gn",
  "password": "Admin123!"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@dsd.gn"
}
```

### Reset Password
```http
PUT /api/auth/reset-password
Content-Type: application/json

{
  "resetToken": "...",
  "newPassword": "NewPass123!"
}
```

---

## 👥 Employees Endpoints

### Get All Employees
```http
GET /api/employees?page=1&limit=10&type=PERSONNELS_DSD&status=ACTIF&search=Barry
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Numéro de page (default: 1)
- `limit` (optional): Nombre par page (default: 10)
- `type` (optional): Type d'employé
- `status` (optional): ACTIF | SUSPENDU | TERMINE
- `search` (optional): Recherche full-text

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "nom": "Diallo",
      "prenom": "Mamadou",
      "email": "mamadou.diallo@dsd.gn",
      "telephone": "+224623456789",
      "fonction": "Développeur Full Stack",
      "matricule": "MAT-2025-001",
      "type": "PERSONNELS_DSD",
      "status": "ACTIF",
      "dateEmbauche": "2024-01-15T00:00:00.000Z",
      "dateFinContrat": "2025-12-31T00:00:00.000Z",
      "photo": null,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Get Employee By ID
```http
GET /api/employees/:id
Authorization: Bearer <token>
```

### Create Employee
```http
POST /api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "Diallo",
  "prenom": "Mamadou",
  "email": "mamadou.diallo@dsd.gn",
  "telephone": "+224623456789",
  "fonction": "Développeur Full Stack",
  "matricule": "MAT-2025-001",
  "type": "PERSONNELS_DSD",
  "dateEmbauche": "2024-01-15",
  "dateFinContrat": "2025-12-31",
  "photo": "https://example.com/photo.jpg"  // Optional
}
```

**Required Roles:** RH, ADMIN

**Type Values:**
- `PERSONNELS_DSD`
- `DNTT`
- `STAGIAIRES_DSD`
- `BANQUES`
- `MAISONS_PLAQUE`
- `DNTT_STAGIAIRES`
- `DEMARCHEURS`

### Update Employee
```http
PUT /api/employees/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "telephone": "+224625789456",
  "fonction": "Senior Développeur"
}
```

**Required Roles:** RH, ADMIN

### Delete Employee
```http
DELETE /api/employees/:id
Authorization: Bearer <token>
```

**Required Roles:** ADMIN

### Update Employee Status
```http
PUT /api/employees/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "SUSPENDU"
}
```

**Status Values:** ACTIF | SUSPENDU | TERMINE

**Required Roles:** RH, ADMIN

### Transfer Employee to Print Queue
```http
POST /api/employees/:id/transfer-to-print
Authorization: Bearer <token>
```

**Required Roles:** RH, ADMIN

**Response 201:**
```json
{
  "success": true,
  "message": "Employé transféré vers la file d'impression",
  "data": {
    "id": "...",
    "employee": "employee_id",
    "type": "PERSONNELS_DSD",
    "status": "EN_ATTENTE",
    "qrCode": "QR-2025-ABC123",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Get Employee Statistics
```http
GET /api/employees/stats
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "active": 120,
    "suspended": 15,
    "terminated": 15,
    "byType": [
      { "_id": "PERSONNELS_DSD", "count": 80 },
      { "_id": "DNTT", "count": 30 },
      { "_id": "STAGIAIRES_DSD", "count": 20 },
      ...
    ],
    "recent": [ ... ]
  }
}
```

---

## 🎫 Badges Endpoints

### Get All Badges
```http
GET /api/badges?page=1&limit=10&status=EN_ATTENTE&type=PERSONNELS_DSD
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Numéro de page (default: 1)
- `limit` (optional): Nombre par page (default: 10)
- `status` (optional): EN_ATTENTE | IMPRIME | ANNULE
- `type` (optional): Type d'employé

### Get Badge By ID
```http
GET /api/badges/:id
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "employee": {
      "nom": "Diallo",
      "prenom": "Mamadou",
      "email": "mamadou.diallo@dsd.gn",
      "telephone": "+224623456789",
      "fonction": "Développeur Full Stack",
      "matricule": "MAT-2025-001",
      "type": "PERSONNELS_DSD"
    },
    "type": "PERSONNELS_DSD",
    "status": "IMPRIME",
    "qrCode": "QR-2025-ABC123",
    "printedBy": {
      "nom": "Impression",
      "prenom": "Opérateur",
      "email": "impression@dsd.gn"
    },
    "printedAt": "2025-01-15T10:30:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Print Badge
```http
POST /api/badges/:id/print
Authorization: Bearer <token>
```

**Required Roles:** IMPRESSION, ADMIN

### Get QR Code Image
```http
GET /api/badges/:id/qr-code
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "qrCode": "QR-2025-ABC123",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

### Verify QR Code (Public)
```http
GET /api/badges/verify/:qrCode
```

**No authentication required**

**Response 200 (Valid):**
```json
{
  "success": true,
  "verified": true,
  "message": "Badge valide",
  "employee": {
    "nom": "Diallo",
    "prenom": "Mamadou",
    "email": "mamadou.diallo@dsd.gn",
    "telephone": "+224623456789",
    "fonction": "Développeur Full Stack",
    "matricule": "MAT-2025-001",
    "type": "PERSONNELS_DSD",
    "status": "ACTIF",
    "dateEmbauche": "2024-01-15",
    "dateFinContrat": "2025-12-31"
  },
  "badge": {
    "qrCode": "QR-2025-ABC123",
    "status": "IMPRIME",
    "printedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Response 200 (Invalid - Contract Expired):**
```json
{
  "success": true,
  "verified": false,
  "message": "Contrat expiré",
  "employee": {
    "nom": "Diallo",
    "prenom": "Mamadou",
    "matricule": "MAT-2025-001",
    "status": "ACTIF",
    "dateFinContrat": "2024-12-31"
  }
}
```

### Update Badge Status
```http
PUT /api/badges/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "ANNULE"
}
```

**Status Values:** EN_ATTENTE | IMPRIME | ANNULE

**Required Roles:** IMPRESSION, ADMIN

### Delete Badge
```http
DELETE /api/badges/:id
Authorization: Bearer <token>
```

**Required Roles:** ADMIN

### Get Badge Statistics
```http
GET /api/badges/stats
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "total": 200,
    "pending": 50,
    "printed": 140,
    "cancelled": 10,
    "byType": [
      { "_id": "PERSONNELS_DSD", "count": 100 },
      { "_id": "DNTT", "count": 50 },
      ...
    ],
    "recentPrinted": [ ... ]
  }
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": [
    {
      "field": "body.email",
      "message": "Email invalide"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Non autorisé - Token invalide"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Le rôle RH n'est pas autorisé à accéder à cette ressource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Employé non trouvé"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Erreur serveur"
}
```

---

## 🔧 Testing with cURL

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dsd.gn","password":"Admin123!"}'
```

### Get Employees (with token)
```bash
curl -X GET http://localhost:3000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Employee
```bash
curl -X POST http://localhost:3000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "email": "test@dsd.gn",
    "telephone": "+224620000000",
    "fonction": "Testeur",
    "matricule": "MAT-2025-999",
    "type": "PERSONNELS_DSD",
    "dateEmbauche": "2025-01-01",
    "dateFinContrat": "2025-12-31"
  }'
```

---

## 📝 Notes

1. **Authentication:** Tous les endpoints (sauf register, login, verify QR) nécessitent un token JWT dans le header `Authorization: Bearer <token>`

2. **Roles:**
   - `RH`: Gestion des employés
   - `IMPRESSION`: Impression des badges
   - `ADMIN`: Tous les droits

3. **Pagination:** Par défaut, les listes retournent 10 éléments. Maximum: 100

4. **Search:** La recherche full-text fonctionne sur nom, prénom, email, matricule

5. **Dates:** Format ISO 8601 (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss.sssZ)