import app from './app';
import { config } from './config';
import { connectDatabase } from './config/database';
import { startContractExpirationJob } from './jobs/contract.job';
import { startSuspensionCheckerJob } from './jobs/suspensionChecker';
import { initializeDefaultAdmin } from './seeds/initAdmin';

/**
 * Initialize application
 */
const initializeApp = async () => {
  // Connect to Database
  await connectDatabase();

  // Initialize default admin if DB is empty
  await initializeDefaultAdmin();
};

/**
 * Start Server
 */
const PORT = config.port;
const host = config.appUrl;
console.log(`🔌 Environnement: ${config.appUrl}`);
initializeApp().then(() => {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Serveur démarré avec succès!`);
    console.log(`📍 URL: ${host}`);
    console.log(`🔌 Port: ${PORT}`);
    console.log(`🌍 Environnement: ${config.nodeEnv}`);
    console.log(`🌐 Accessible sur toutes les interfaces réseau (0.0.0.0)`);
    console.log(`\n✅ API prête à recevoir des requêtes\n`);

    // Start scheduled jobs
    startContractExpirationJob();
    startSuspensionCheckerJob();
  });

  /**
   * Handle Unhandled Promise Rejections
   */
  process.on('unhandledRejection', (err: Error) => {
    console.error('❌ Erreur non gérée:', err.message);
    console.error(err);

    // Close server & exit process
    server.close(() => {
      process.exit(1);
    });
  });

  /**
   * Handle SIGTERM
   */
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM reçu. Fermeture gracieuse du serveur...');

    server.close(() => {
      console.log('✅ Processus terminé');
    });
  });
});