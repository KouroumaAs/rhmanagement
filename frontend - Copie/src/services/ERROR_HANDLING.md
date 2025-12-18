# 🔥 Guide de Gestion des Erreurs

## Vue d'ensemble

Le système de gestion des erreurs a été amélioré pour fournir des messages d'erreur clairs et informatifs à l'utilisateur tout en loggant des informations détaillées dans la console pour le débogage.

## Fonctionnalités

### 1. **Logs automatiques dans la console**

Toutes les requêtes API affichent maintenant des logs colorés :
- 🌐 **Requête envoyée** : `API Request: GET /employees`
- ✅ **Succès** : `API Success: GET /employees`
- ❌ **Erreur** : `API Error: [400] BadRequest...`

### 2. **Messages d'erreur personnalisés par code HTTP**

| Code | Message                                                    |
|------|------------------------------------------------------------|
| 400  | ❌ Erreur de validation: [détails]                        |
| 401  | 🔒 Session expirée. Veuillez vous reconnecter.           |
| 403  | ⛔ Accès refusé. Vous n'avez pas les permissions.        |
| 404  | 🔍 Ressource non trouvée: [détails]                      |
| 409  | ⚠️ Conflit: [détails]                                     |
| 422  | 📋 Données invalides: [détails]                          |
| 500  | 🔥 Erreur serveur: [détails]                             |
| 503  | ⏸️ Service temporairement indisponible.                  |

### 3. **Gestion des erreurs réseau**

Les erreurs de connexion (pas de réponse du serveur) sont automatiquement détectées et affichent un message approprié.

## Utilisation

### Méthode 1 : Utiliser `getUserMessage()` (Recommandé)

```typescript
import { authService } from "@/src/services/auth.service";

try {
  await authService.login(credentials);
} catch (error: any) {
  // Récupère un message utilisateur formaté automatiquement
  const errorMessage = error.getUserMessage?.() || error.message || "Une erreur est survenue";

  toast({
    variant: "destructive",
    title: "Erreur",
    description: errorMessage,
  });
}
```

### Méthode 2 : Utiliser `handleApiError()` (Alternative)

```typescript
import { authService, handleApiError } from "@/src/services/auth.service";

try {
  await authService.login(credentials);
} catch (error: any) {
  // Fonction helper qui gère tous les cas d'erreur
  const errorMessage = handleApiError(error);

  toast({
    variant: "destructive",
    title: "Erreur",
    description: errorMessage,
  });
}
```

## Exemples Pratiques

### Exemple 1 : Création d'employé

```typescript
const handleCreateEmployee = async (data: EmployeeData) => {
  try {
    await employeeService.create(data);
    toast({
      title: "✅ Employé créé",
      description: "L'employé a été ajouté avec succès",
    });
  } catch (error: any) {
    console.error('❌ Erreur création employé:', error);

    toast({
      variant: "destructive",
      title: "Erreur",
      description: error.getUserMessage?.() || error.message,
    });
  }
};
```

### Exemple 2 : Upload de fichier

```typescript
const handleUploadPhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('photo', file);

  try {
    await upload('/employees/photo', formData);
    toast({
      title: "✅ Photo uploadée",
    });
  } catch (error: any) {
    // Les erreurs d'upload sont automatiquement loggées
    toast({
      variant: "destructive",
      title: "Erreur d'upload",
      description: error.getUserMessage?.() || "Impossible d'uploader la photo",
    });
  }
};
```

### Exemple 3 : Gestion des erreurs 401 (Session expirée)

```typescript
try {
  await userService.getAll();
} catch (error: any) {
  const message = error.getUserMessage?.();

  // Si c'est une erreur 401, rediriger vers login
  if (error.status === 401) {
    router.push('/login');
  }

  toast({
    variant: "destructive",
    title: "Erreur",
    description: message,
  });
}
```

## Debug dans la Console

Ouvrez la console du navigateur (F12) pour voir :

1. **Toutes les requêtes API** avec leur méthode et endpoint
2. **Les erreurs détaillées** avec le code HTTP et les données retournées
3. **Les traces d'erreur** pour identifier rapidement le problème

### Exemple de log d'erreur :

```
❌ API Error: [400] ApiError: Email déjà existant
Data: {
  "success": false,
  "message": "Email déjà existant",
  "field": "email"
}
```

## Bonnes Pratiques

### ✅ À FAIRE

```typescript
// Toujours logger l'erreur complète
console.error('❌ Erreur:', error);

// Utiliser getUserMessage() pour l'utilisateur
const userMessage = error.getUserMessage?.() || error.message;

// Afficher le message dans un toast
toast({
  variant: "destructive",
  description: userMessage,
});
```

### ❌ À ÉVITER

```typescript
// Ne pas ignorer les erreurs silencieusement
try {
  await someAction();
} catch (e) {
  // MAUVAIS : Rien n'est affiché
}

// Ne pas afficher l'objet error directement
toast({
  description: error, // MAUVAIS : l'utilisateur verra [Object object]
});

// Ne pas utiliser de messages génériques quand l'erreur est précise
toast({
  description: "Une erreur est survenue", // MAUVAIS : pas assez spécifique
});
```

## Codes d'Erreur Personnalisés

Si vous créez de nouvelles erreurs côté backend, ajoutez-les dans la méthode `getUserMessage()` de `ApiError` :

```typescript
getUserMessage(): string {
  switch (this.status) {
    case 418: // Votre nouveau code
      return "☕ Je suis une théière";
    // ... autres cas
  }
}
```

## Questions Fréquentes

**Q: Pourquoi je ne vois pas les logs dans la console ?**
R: Assurez-vous d'avoir la console ouverte (F12) et que les logs ne sont pas filtrés.

**Q: Comment désactiver les logs en production ?**
R: Entourez les console.log avec une condition :
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}
```

**Q: Que faire si l'erreur n'a pas de message ?**
R: Le système retourne automatiquement un message par défaut basé sur le code HTTP.

## Support

Pour toute question sur la gestion des erreurs, consultez :
- La classe `ApiError` dans `src/services/api.ts`
- Les exemples dans ce document
- Les composants existants utilisant les services API
