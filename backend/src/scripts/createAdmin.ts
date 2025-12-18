import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models';

// Charger les variables d'environnement
dotenv.config();

const createAdmin = async () => {
  try {
    // Connexion à MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rh_management';
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB');

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: 'maimouna@gmail.com' });
    if (existingUser) {
      console.log('⚠️  Un utilisateur avec cet email existe déjà. Suppression...');
      await User.deleteOne({ email: 'maimouna@gmail.com' });
      console.log('✅ Ancien utilisateur supprimé');
    }

    // Créer l'administrateur (le middleware hashera le mot de passe automatiquement)
    const admin = await User.create({
      nom: 'Barry',
      prenom: 'Maimouna',
      email: 'maimouna@gmail.com',
      telephone: '620000000', // Numéro fictif, modifiez si nécessaire
      password: 'Ma1234567', // Le middleware pre('save') du modèle hashera automatiquement
      role: 'ADMIN',
      isActive: true,
      isBlocked: false,
    });

    console.log('✅ Administrateur créé avec succès !');
    console.log('📧 Email:', admin.email);
    console.log('👤 Nom:', admin.prenom, admin.nom);
    console.log('🔑 Rôle:', admin.role);
    console.log('\n🔐 Credentials:');
    console.log('   Email: maimouna@gmail.com');
    console.log('   Password: Ma1234567');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Erreur lors de la création de l\'administrateur:', error.message);
    process.exit(1);
  }
};

createAdmin();
