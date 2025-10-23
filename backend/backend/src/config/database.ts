import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rh-management';

    // Ajouter un timeout pour éviter les connexions pendantes
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout après 5 secondes
      socketTimeoutMS: 45000, // Timeout de socket après 45 secondes
    });

    console.log('✅ MongoDB connecté avec succès');
    console.log(`📊 Base de données: ${mongoose.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ Erreur MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB déconnecté - Tentative de reconnexion...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnecté');
    });
  } catch (error) {
    console.error('\n❌❌❌ ERREUR CRITIQUE ❌❌❌');
    console.error('❌ Impossible de se connecter à MongoDB');
    console.error('❌ Erreur:', error instanceof Error ? error.message : error);
    console.error('\n📋 ACTIONS REQUISES:');
    console.error('  1. Vérifiez que MongoDB est démarré');
    console.error('  2. Sur Windows: net start MongoDB');
    console.error('  3. Vérifiez la variable MONGODB_URI dans .env');
    console.error('  4. Par défaut: mongodb://localhost:27017/rh-management\n');

    // Arrêter le serveur pour éviter les erreurs silencieuses
    console.error('🛑 Le serveur ne peut pas démarrer sans base de données');
    console.error('🛑 Arrêt du processus...\n');
    process.exit(1);
  }
};