# Guide de Déploiement

## Problème identifié

Avec la configuration `output: 'standalone'` dans `next.config.ts`, Next.js ne copie **pas automatiquement**:
- Le dossier `public/` (contenant les images badgeRecto.jpeg et badgeVerso.jpeg)
- Le dossier `.next/static/` (contenant les assets JavaScript/CSS)

Cela cause des erreurs 404 pour les images en production.

## Solutions

### Solution 1: Build avec script automatique (RECOMMANDÉ)

#### Sur Linux/Mac:
```bash
npm run build:prod
```

Ou avec le script shell:
```bash
chmod +x build.sh
./build.sh
```

#### Sur Windows:
```cmd
npm run build:prod
```

Ou avec le script batch:
```cmd
build.cmd
```

Le script `build:prod` fait automatiquement:
1. ✅ Build de l'application Next.js
2. ✅ Copie du dossier `public/` vers `.next/standalone/public/`
3. ✅ Copie du dossier `.next/static/` vers `.next/standalone/.next/static/`

### Solution 2: Déploiement manuel

Si vous ne pouvez pas utiliser le script automatique:

```bash
# 1. Build l'application
npm run build

# 2. Copier manuellement les dossiers (Linux/Mac)
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# 2. Copier manuellement les dossiers (Windows)
xcopy /E /I /Y public .next\standalone\public
xcopy /E /I /Y .next\static .next\standalone\.next\static
```

### Solution 3: Utiliser Docker (si applicable)

Si vous utilisez Docker, voici un exemple de Dockerfile:

```dockerfile
FROM node:20-alpine AS base

# Installation des dépendances
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build de l'application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

## Démarrage de l'application en production

Après avoir exécuté `npm run build:prod`:

```bash
# Démarrer l'application standalone
npm run start:prod

# Ou directement avec Node
cd .next/standalone
node server.js
```

L'application sera accessible sur le port configuré (par défaut 3000).

## Vérification

Pour vérifier que tout fonctionne:

1. ✅ Vérifier que `public/` existe dans `.next/standalone/`
2. ✅ Vérifier que `.next/static/` existe dans `.next/standalone/.next/`
3. ✅ Tester l'accès aux images: `https://votredomaine.com/images/badgeRecto.jpeg`

## Déploiement sur serveur de production

Sur votre serveur de production:

```bash
# 1. Pull les dernières modifications
git pull origin main

# 2. Installer les dépendances
npm ci

# 3. Build avec copie automatique
npm run build:prod

# 4. (Optionnel) Redémarrer le service
pm2 restart frontend
# ou
systemctl restart frontend.service
```

## Notes importantes

- ⚠️ Toujours utiliser `build:prod` au lieu de `build` pour la production
- ⚠️ S'assurer que les dossiers sont bien copiés avant de démarrer le serveur
- ⚠️ Vérifier les permissions sur les fichiers copiés en production
