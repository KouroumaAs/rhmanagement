import { User } from '../models';

/**
 * Initialise un utilisateur admin par défaut si la base de données est vide
 */
export const initializeDefaultAdmin = async (): Promise<void> => {
  try {
    // Vérifier si des utilisateurs existent déjà
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      console.log('📝 Base de données vide détectée. Création de l\'utilisateur admin par défaut...');

      // Créer l'admin par défaut
      await User.create({
        nom: 'Admin',
        prenom: 'Système',
        email: 'admin@gmail.com',
        password: 'Ma123456',
        role: 'ADMIN',
        telephone: '620000000',
        isActive: true,
      });

      console.log('✅ Utilisateur admin créé avec succès!');
      console.log('   📧 Email: admin@gmail.com');
      console.log('   🔑 Mot de passe: Ma123456');
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de l\'admin:', error);
  }
};
