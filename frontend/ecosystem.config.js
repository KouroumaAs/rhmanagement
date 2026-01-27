module.exports = {
  apps: [
    {
      name: 'rh-frontend',
      script: '.next/standalone/server.js',
      cwd: '/var/www/rhmanagement/frontend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      // Configuration pour les logs
      // log_file: '/var/log/pm2/rhmanagement-frontend.log',
      // out_file: '/var/log/pm2/rhmanagement-frontend-out.log',
      // error_file: '/var/log/pm2/rhmanagement-frontend-error.log',
      // Configuration pour le redémarrage automatique
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      // Configuration pour la surveillance des fichiers (désactivée en prod)
      watch: false,
      // Configuration pour les variables d'environnement
      env_file: '.env'
    }
  ]
};