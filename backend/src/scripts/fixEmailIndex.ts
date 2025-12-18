import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Script pour corriger l'index email de la collection Employee
 *
 * Ce script :
 * 1. Se connecte à MongoDB
 * 2. Supprime l'index email existant
 * 3. Crée un nouvel index email avec les options unique + sparse
 */

async function fixEmailIndex() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rhmanagement';
    console.log('🔌 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    // Get Employee collection
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const collection = db.collection('employees');

    // Check current email index
    const indexes = await collection.indexes();
    const emailIndex = indexes.find((idx: any) => idx.key && idx.key.email === 1);

    if (emailIndex) {
      console.log('📋 Index email actuel:');
      console.log(`   - Unique: ${emailIndex.unique}`);
      console.log(`   - Sparse: ${emailIndex.sparse}\n`);

      if (!emailIndex.sparse) {
        console.log('🔧 Suppression de l\'ancien index email...');
        await collection.dropIndex('email_1');
        console.log('✅ Ancien index supprimé\n');
      } else {
        console.log('✅ L\'index est déjà configuré correctement (sparse)\n');
        return;
      }
    }

    // Create new sparse unique index
    console.log('🔧 Création du nouvel index email (unique + sparse)...');
    await collection.createIndex(
      { email: 1 },
      { unique: true, sparse: true }
    );
    console.log('✅ Nouvel index créé avec succès\n');

    // Verify the new index
    const newIndexes = await collection.indexes();
    const newEmailIndex = newIndexes.find((idx: any) => idx.key && idx.key.email === 1);

    if (newEmailIndex) {
      console.log('✅ Vérification du nouvel index:');
      console.log(`   - Unique: ${newEmailIndex.unique ? 'OUI ✅' : 'NON ❌'}`);
      console.log(`   - Sparse: ${newEmailIndex.sparse ? 'OUI ✅' : 'NON ❌'}\n`);
    }

    // Count employees without email
    const employeesWithoutEmail = await collection.countDocuments({
      $or: [{ email: null }, { email: '' }, { email: { $exists: false } }]
    });
    const totalEmployees = await collection.countDocuments({});

    console.log('📊 Statistiques:');
    console.log(`   - Total employés: ${totalEmployees}`);
    console.log(`   - Employés sans email: ${employeesWithoutEmail}`);
    console.log(`   - Employés avec email: ${totalEmployees - employeesWithoutEmail}\n`);

    console.log('🎉 Correction terminée avec succès !');
    console.log('Vous pouvez maintenant avoir plusieurs employés sans email.');

  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Déconnecté de MongoDB');
  }
}

fixEmailIndex();
