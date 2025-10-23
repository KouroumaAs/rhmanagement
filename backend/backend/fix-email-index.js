const mongoose = require('mongoose');

const fixEmailIndex = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rh-management';

    console.log('🔌 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB');

    const db = mongoose.connection.db;
    const employeesCollection = db.collection('employees');

    console.log('\n📋 Vérification des index existants...');
    const indexes = await employeesCollection.indexes();
    console.log('Index actuels:', indexes.map(idx => idx.name));

    const emailIndexExists = indexes.some(idx => idx.name === 'email_1');

    if (emailIndexExists) {
      console.log('\n🗑️  Suppression de l\'index email_1...');
      await employeesCollection.dropIndex('email_1');
      console.log('✅ Index email_1 supprimé avec succès');
    } else {
      console.log('\n✅ L\'index email_1 n\'existe pas');
    }

    console.log('\n📋 Index après nettoyage:');
    const finalIndexes = await employeesCollection.indexes();
    console.log(finalIndexes.map(idx => idx.name));

    console.log('\n✅ Opération terminée avec succès');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

fixEmailIndex();
