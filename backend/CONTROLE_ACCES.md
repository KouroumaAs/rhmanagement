# Système de Contrôle d'Accès - RH Management DSD Guinée

## Vue d'ensemble

Le système de contrôle d'accès est basé sur un modèle RBAC (Role-Based Access Control) avec trois rôles principaux et un système de logging complet des actions sensibles.

## Rôles

### 1. ADMIN
- **Accès complet** à toutes les fonctionnalités du système
- Peut créer, modifier, supprimer des utilisateurs
- Peut activer/désactiver/bloquer des utilisateurs
- Peut réinitialiser les mots de passe des autres utilisateurs
- Accès aux logs d'activité de tous les utilisateurs

### 2. RH (Ressources Humaines)
- Peut gérer les employés (CRUD complet)
- Peut changer le statut des employés (Actif, Suspendu, Terminé)
- Peut transférer des employés vers l'impression de badges
- Peut consulter les statistiques des employés
- **Ne peut PAS** gérer les utilisateurs du système
- Peut consulter ses propres logs d'activité

### 3. IMPRESSION
- Peut consulter les badges en attente
- Peut imprimer les badges
- Peut changer le statut des badges
- Peut consulter les statistiques des badges (son dashboard uniquement)
- **Ne peut PAS** voir les employés (aucun accès)
- **Ne peut PAS** voir le dashboard RH
- **Ne peut PAS** gérer les utilisateurs
- Peut consulter ses propres logs d'activité

## Routes Protégées

### Routes Publiques (Non authentifiées)
```
POST /api/auth/login
POST /api/auth/forgot-password
PUT  /api/auth/reset-password
GET  /api/badges/verify/:matricule
```

### Routes Authentifiées (Tous les utilisateurs)
```
GET  /api/auth/me
PUT  /api/auth/change-password
GET  /api/badges/stats
GET  /api/badges
GET  /api/badges/:id
GET  /api/badges/:id/qr-code
GET  /api/activity-logs/me
```

### Routes RH + ADMIN uniquement
```
GET  /api/employees/stats
GET  /api/employees
GET  /api/employees/:id
POST /api/employees
PUT  /api/employees/:id
PUT  /api/employees/:id/status
POST /api/employees/:id/transfer-to-print
```

### Routes ADMIN uniquement
```
POST   /api/auth/register
GET    /api/auth/stats
GET    /api/auth/users
PUT    /api/auth/users/:id
PUT    /api/auth/users/:id/active
PUT    /api/auth/users/:id/reset-password
DELETE /api/auth/users/:id
DELETE /api/employees/:id
POST   /api/employees/check-expired-contracts
DELETE /api/badges/:id
GET    /api/activity-logs
```

### Routes IMPRESSION + ADMIN
```
POST /api/badges/:id/print
PUT  /api/badges/:id/status
```

## 🔐 Résumé de la sécurité

| Rôle | Utilisateurs | Employés | Badges | Logs |
|------|--------------|----------|--------|------|
| **ADMIN** | ✅ Tout | ✅ Tout | ✅ Tout | ✅ Tout |
| **RH** | ❌ Aucun accès | ✅ CRUD complet | 👁️ Lecture seule | 👁️ Ses logs |
| **IMPRESSION** | ❌ Aucun accès | ❌ Aucun accès | ✅ Impression + Stats | 👁️ Ses logs |

### Dashboards par rôle
- **ADMIN**: Accès à tous les dashboards (RH + Impression + Utilisateurs)
- **RH**: Dashboard RH uniquement (employés, stats employés, transfert vers impression)
- **IMPRESSION**: Dashboard Impression uniquement (badges à imprimer, stats badges)

## Middleware d'Authentification

### `protect`
- Vérifie la présence d'un token JWT valide
- Vérifie que l'utilisateur existe toujours dans la base de données
- **Vérifie que le compte n'est pas bloqué** (`isBlocked = false`)
- **Vérifie que le compte est actif** (`isActive = true`)
- Ajoute l'utilisateur dans `req.user`

### `authorize(...roles)`
- Vérifie que l'utilisateur a l'un des rôles autorisés
- Retourne 403 Forbidden si le rôle ne correspond pas

## Système de Logging

### Actions Loggées

#### Gestion des Utilisateurs
- `USER_LOGIN` - Connexion (succès et échecs)
- `USER_CREATED` - Création d'un utilisateur
- `USER_UPDATED` - Modification d'un utilisateur
- `USER_DELETED` - Suppression d'un utilisateur
- `USER_ACTIVATED` - Activation d'un utilisateur
- `USER_DEACTIVATED` - Désactivation d'un utilisateur
- `USER_BLOCKED` - Blocage d'un utilisateur
- `USER_UNBLOCKED` - Déblocage d'un utilisateur
- `PASSWORD_CHANGED` - Changement de mot de passe
- `PASSWORD_RESET` - Réinitialisation de mot de passe

#### Gestion des Employés
- `EMPLOYEE_CREATED` - Création d'un employé
- `EMPLOYEE_UPDATED` - Modification d'un employé
- `EMPLOYEE_DELETED` - Suppression d'un employé
- `EMPLOYEE_STATUS_CHANGED` - Changement de statut
- `EMPLOYEE_TRANSFERRED_TO_PRINT` - Transfert vers impression

#### Gestion des Badges
- `BADGE_CREATED` - Création d'un badge
- `BADGE_PRINTED` - Impression d'un badge
- `BADGE_DELETED` - Suppression d'un badge
- `BADGE_STATUS_CHANGED` - Changement de statut
- `BADGE_VERIFIED` - Vérification d'un badge

### Informations Loggées
- Utilisateur qui effectue l'action
- Type d'action
- Type et ID de la ressource affectée
- Détails de l'action (changements effectués)
- Adresse IP (quand disponible)
- User-Agent du navigateur (quand disponible)
- Statut (SUCCESS ou FAILURE)
- Message d'erreur (en cas d'échec)
- Date et heure (automatique)

### Consultation des Logs

#### Pour l'utilisateur courant
```
GET /api/activity-logs/me?page=1&limit=50
```

#### Pour tous les utilisateurs (ADMIN uniquement)
```
GET /api/activity-logs?page=1&limit=100&action=USER_LOGIN&userId=xxx&startDate=2024-01-01&endDate=2024-12-31
```

Paramètres de filtrage disponibles:
- `action` - Type d'action
- `resourceType` - Type de ressource (USER, EMPLOYEE, BADGE)
- `userId` - ID de l'utilisateur
- `startDate` - Date de début
- `endDate` - Date de fin
- `page` - Numéro de page
- `limit` - Nombre d'éléments par page

## Modèle de Données

### User
```typescript
{
  nom: string
  prenom: string
  email: string (unique)
  telephone: string
  password: string (hashé)
  role: 'RH' | 'IMPRESSION' | 'ADMIN'
  lastLogin?: Date
  isActive: boolean (default: true)
  isBlocked: boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

### ActivityLog
```typescript
{
  user: ObjectId (ref: User)
  action: ActivityAction
  resourceType?: 'USER' | 'EMPLOYEE' | 'BADGE'
  resourceId?: ObjectId
  details?: any
  ipAddress?: string
  userAgent?: string
  status: 'SUCCESS' | 'FAILURE'
  errorMessage?: string
  createdAt: Date
  updatedAt: Date
}
```

## Bonnes Pratiques de Sécurité

### 1. Gestion des Comptes
- ✅ Seuls les ADMIN peuvent créer des comptes
- ✅ Les comptes inactifs ne peuvent pas se connecter
- ✅ Les comptes bloqués ne peuvent pas se connecter
- ✅ Les tentatives de connexion échouées sont loggées

### 2. Gestion des Mots de Passe
- ✅ Les mots de passe sont hashés avec bcrypt
- ✅ Les changements de mot de passe sont loggés
- ✅ Les réinitialisations par admin sont loggées avec détails

### 3. Traçabilité
- ✅ Toutes les actions sensibles sont loggées
- ✅ Les logs incluent l'utilisateur, l'action et les détails
- ✅ Les échecs sont également loggués

### 4. Principe du Moindre Privilège
- ✅ Chaque rôle a accès uniquement aux ressources nécessaires
- ✅ Les actions sensibles nécessitent le rôle ADMIN
- ✅ Séparation claire des responsabilités (RH vs IMPRESSION)

## Maintenance

### Nettoyage des Logs
Les logs peuvent être nettoyés automatiquement en appelant:

```typescript
import { deleteOldActivityLogs } from './services/activityLogger';

// Supprimer les logs de plus de 90 jours
await deleteOldActivityLogs(90);
```

Il est recommandé de mettre en place une tâche cron pour nettoyer régulièrement les anciens logs.

## Tests de Sécurité

Pour tester le système de contrôle d'accès:

1. **Test d'authentification**
   - Essayer d'accéder à une route protégée sans token → 401
   - Essayer avec un token invalide → 401
   - Essayer avec un compte inactif → 403

2. **Test d'autorisation**
   - Utilisateur RH essaie de créer un utilisateur → 403
   - Utilisateur IMPRESSION essaie d'accéder aux employés → 403
   - Utilisateur IMPRESSION essaie d'accéder au dashboard RH → 403
   - Utilisateur RH peut créer/modifier des employés → 200
   - Utilisateur IMPRESSION peut imprimer des badges → 200
   - Utilisateur ADMIN peut tout faire → 200

3. **Test de logging**
   - Effectuer une action sensible
   - Vérifier que le log est créé avec les bonnes informations
   - Vérifier que les échecs sont également loggés

## Support

Pour toute question sur le système de contrôle d'accès, contactez l'administrateur système.
