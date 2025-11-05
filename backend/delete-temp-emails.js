const mongoose = require('mongoose');

const deleteTempEmails = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rh-management';

    console.log('🔌 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB');

    const db = mongoose.connection.db;
    const employeesCollection = db.collection('employees');

    console.log('\n📋 Recherche des employés avec emails temporaires...');
    const tempEmailEmployees = await employeesCollection.find({ 
      email: { $regex: '@temp\.local$' }
    }).toArray();

    console.log(`Trouvé ${tempEmailEmployees.length} employé(s) avec email temporaire`);

    if (tempEmailEmployees.length === 0) {
      console.log('✅ Aucun email temporaire trouvé');
      await mongoose.disconnect();
      process.exit(0);
      return;
    }

    tempEmailEmployees.forEach(emp => {
      console.log(`  - ${emp.prenom} ${emp.nom} (${emp.email})`);
    });

    console.log('\n🗑️  Suppression en cours...');
    const result = await employeesCollection.deleteMany({ 
      email: { $regex: '@temp\.local$' }
    });

    console.log(`✅ ${result.deletedCount} employé(s) supprimé(s)`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

deleteTempEmails();
