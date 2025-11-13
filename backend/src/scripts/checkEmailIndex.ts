import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Script pour vérifier et corriger l'index email de la collection Employee
 *
 * Ce script :
 * 1. Se connecte à MongoDB
 * 2. Vérifie si l'index email existe et s'il est sparse
 * 3. Affiche les informations sur l'index
 *
 * IMPORTANT: Ce script ne modifie RIEN automatiquement !
 * Il affiche uniquement les commandes à exécuter manuellement si nécessaire.
 */

async function checkEmailIndex() {
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

    // Get all indexes
    console.log('📋 Index actuels sur la collection "employees":\n');
    const indexes = await collection.indexes();

    indexes.forEach((index: any) => {
      console.log('---');
      console.log('Nom:', index.name);
      console.log('Clés:', JSON.stringify(index.key));
      console.log('Unique:', index.unique || false);
      console.log('Sparse:', index.sparse || false);
      console.log('');
    });

    // Check email index specifically
    const emailIndex = indexes.find((idx: any) => idx.key && idx.key.email === 1);

    if (emailIndex) {
      console.log('🔍 Analyse de l\'index email:\n');
      console.log('✅ L\'index email existe');
      console.log(`   - Unique: ${emailIndex.unique ? 'OUI ✅' : 'NON ❌'}`);
      console.log(`   - Sparse: ${emailIndex.sparse ? 'OUI ✅' : 'NON ❌'}`);

      if (emailIndex.unique && !emailIndex.sparse) {
        console.log('\n⚠️  PROBLÈME DÉTECTÉ !');
        console.log('L\'index email est unique mais pas sparse.');
        console.log('Cela empêche d\'avoir plusieurs employés sans email.\n');
        console.log('📝 Pour corriger, exécutez ces commandes MongoDB :');
        console.log('');
        console.log('   use rhmanagement');
        console.log('   db.employees.dropIndex("email_1")');
        console.log('   db.employees.createIndex({ email: 1 }, { unique: true, sparse: true })');
        console.log('');
        console.log('⚠️  ATTENTION: Ne faites ceci qu\'en dehors des heures de production !');
      } else if (emailIndex.unique && emailIndex.sparse) {
        console.log('\n✅ L\'index email est correctement configuré (unique + sparse)');
        console.log('Plusieurs employés peuvent ne pas avoir d\'email.');
      }
    } else {
      console.log('❌ Aucun index trouvé sur le champ email\n');
      console.log('📝 Pour créer l\'index, exécutez cette commande MongoDB :');
      console.log('');
      console.log('   use rhmanagement');
      console.log('   db.employees.createIndex({ email: 1 }, { unique: true, sparse: true })');
      console.log('');
    }

    // Count employees without email
    const employeesWithoutEmail = await collection.countDocuments({
      $or: [{ email: null }, { email: '' }, { email: { $exists: false } }]
    });
    const totalEmployees = await collection.countDocuments({});

    console.log('\n📊 Statistiques:');
    console.log(`   - Total employés: ${totalEmployees}`);
    console.log(`   - Employés sans email: ${employeesWithoutEmail}`);
    console.log(`   - Employés avec email: ${totalEmployees - employeesWithoutEmail}`);

  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Déconnecté de MongoDB');
  }
}

checkEmailIndex();
