const mongoose = require('mongoose');

const cleanEmployeesEmail = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rh-management';

    console.log('🔌 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB');

    const db = mongoose.connection.db;
    const employeesCollection = db.collection('employees');

    console.log('\n📋 Recherche des employés sans email...');
    const employeesWithoutEmail = await employeesCollection.find({ 
      $or: [
        { email: null },
        { email: '' },
        { email: { $exists: false } }
      ]
    }).toArray();

    console.log(`Trouvé ${employeesWithoutEmail.length} employé(s) sans email`);

    if (employeesWithoutEmail.length === 0) {
      console.log('✅ Tous les employés ont un email');
      await mongoose.disconnect();
      process.exit(0);
      return;
    }

    console.log('\n⚠️  Options:');
    console.log('1. Supprimer ces employés');
    console.log('2. Leur assigner un email par défaut basé sur leur matricule');
    
    console.log('\n🔨 Assignation d\'emails par défaut...');
    
    for (const employee of employeesWithoutEmail) {
      // Générer un email basé sur le matricule ou l'id
      const matricule = employee.matricule || employee._id.toString();
      const defaultEmail = `${matricule.toLowerCase().replace(/\s+/g, '')}@temp.local`;
      
      await employeesCollection.updateOne(
        { _id: employee._id },
        { $set: { email: defaultEmail } }
      );
      
      console.log(`✅ ${employee.prenom} ${employee.nom} -> ${defaultEmail}`);
    }

    console.log(`\n✅ ${employeesWithoutEmail.length} employé(s) mis à jour`);
    console.log('\n⚠️  IMPORTANT: Veuillez mettre à jour les emails temporaires avec les vrais emails !');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

cleanEmployeesEmail();
