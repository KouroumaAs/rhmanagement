const mongoose = require('mongoose');

const updateEmailIndex = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rh-management';

    console.log('🔌 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB');

    const db = mongoose.connection.db;
    const employeesCollection = db.collection('employees');

    console.log('\n📋 Index actuels:');
    const indexes = await employeesCollection.indexes();
    console.log(indexes.map(idx => ({ name: idx.name, key: idx.key, unique: idx.unique, sparse: idx.sparse })));

    const emailIndexExists = indexes.some(idx => idx.name === 'email_1');

    if (emailIndexExists) {
      console.log('\n🗑️  Suppression de l\'index email_1 (sparse)...');
      await employeesCollection.dropIndex('email_1');
      console.log('✅ Index sparse supprimé');
    }

    console.log('\n🔨 Création du nouvel index email unique (sans sparse)...');
    await employeesCollection.createIndex({ email: 1 }, { unique: true });
    console.log('✅ Index email créé avec succès (unique, obligatoire)');

    console.log('\n📋 Index finaux:');
    const finalIndexes = await employeesCollection.indexes();
    console.log(finalIndexes.map(idx => ({ name: idx.name, key: idx.key, unique: idx.unique, sparse: idx.sparse })));

    console.log('\n✅ Opération terminée avec succès');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

updateEmailIndex();
