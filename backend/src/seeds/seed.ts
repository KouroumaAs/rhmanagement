import dotenv from 'dotenv';
import { User, Employee } from '../models';
import { connectDatabase } from '../config/database';

dotenv.config();

/**
 * Script de seed pour initialiser la base de données
 * Usage: ts-node src/seeds/seed.ts
 */

const seedData = async () => {
  try {
    // Connexion à la base de données
    await connectDatabase();

    console.log('🗑️  Nettoyage de la base de données...');

    // Nettoyer les collections
    await User.deleteMany({});
    await Employee.deleteMany({});

    console.log('👤 Création des utilisateurs...');

    // Créer utilisateurs par défaut
    const users = await User.insertMany([
      {
        nom: 'Admin',
        prenom: 'Système',
        email: 'admin@dsd.gn',
        password: 'Admin123!',
        role: 'ADMIN',
      },
      {
        nom: 'RH',
        prenom: 'Manager',
        email: 'rh@dsd.gn',
        password: 'RH123!',
        role: 'RH',
      },
      {
        nom: 'Impression',
        prenom: 'Opérateur',
        email: 'impression@dsd.gn',
        password: 'Impression123!',
        role: 'IMPRESSION',
      },
    ]);

    console.log(`✅ ${users.length} utilisateurs créés`);

    console.log('👥 Création des employés...');

    // Créer employés de test
    const employees = await Employee.insertMany([
      {
        nom: 'Diallo',
        prenom: 'Mamadou',
        email: 'mamadou.diallo@dsd.gn',
        telephone: '+224623456789',
        fonction: 'Développeur Full Stack',
        matricule: 'MAT-2025-001',
        type: 'PERSONNELS_DSD',
        status: 'ACTIF',
        dateEmbauche: new Date('2024-01-15'),
        dateFinContrat: new Date('2025-12-31'),
      },
      {
        nom: 'Camara',
        prenom: 'Fatoumata',
        email: 'fatoumata.camara@dsd.gn',
        telephone: '+224625789456',
        fonction: 'Chef de Projet',
        matricule: 'MAT-2025-002',
        type: 'PERSONNELS_DSD',
        status: 'ACTIF',
        dateEmbauche: new Date('2024-02-01'),
        dateFinContrat: new Date('2025-12-31'),
      },
      {
        nom: 'Bah',
        prenom: 'Ibrahima',
        email: 'ibrahima.bah@dntt.gn',
        telephone: '+224627123456',
        fonction: 'Technicien',
        matricule: 'MAT-2025-003',
        type: 'DNTT',
        status: 'ACTIF',
        dateEmbauche: new Date('2024-03-10'),
        dateFinContrat: new Date('2025-12-31'),
      },
      {
        nom: 'Soumah',
        prenom: 'Aissatou',
        email: 'aissatou.soumah@dsd.gn',
        telephone: '+224628456123',
        fonction: 'Stagiaire Développement',
        matricule: 'MAT-2025-004',
        type: 'STAGIAIRES_DSD',
        status: 'ACTIF',
        dateEmbauche: new Date('2024-06-01'),
        dateFinContrat: new Date('2024-12-31'),
      },
      {
        nom: 'Kouyaté',
        prenom: 'Moussa',
        email: 'moussa.kouyate@banque.gn',
        telephone: '+224629789456',
        fonction: 'Agent Bancaire',
        matricule: 'MAT-2025-005',
        type: 'BANQUES',
        status: 'ACTIF',
        dateEmbauche: new Date('2023-10-15'),
        dateFinContrat: new Date('2025-10-14'),
      },
      {
        nom: 'Condé',
        prenom: 'Alpha',
        email: 'alpha.conde@demarcheur.gn',
        telephone: '+224620123789',
        fonction: 'Démarcheur Commercial',
        matricule: 'MAT-2025-006',
        type: 'DEMARCHEURS',
        status: 'ACTIF',
        dateEmbauche: new Date('2024-04-01'),
        dateFinContrat: new Date('2025-03-31'),
      },
      {
        nom: 'Traoré',
        prenom: 'Kadiatou',
        email: 'kadiatou.traore@dsd.gn',
        telephone: '+224621456789',
        fonction: 'Designer UI/UX',
        matricule: 'MAT-2025-007',
        type: 'PERSONNELS_DSD',
        status: 'SUSPENDU',
        dateEmbauche: new Date('2024-01-20'),
        dateFinContrat: new Date('2025-12-31'),
      },
    ]);

    console.log(`✅ ${employees.length} employés créés`);

    console.log('\n🎉 Seed terminé avec succès!');
    console.log('\n📊 Récapitulatif:');
    console.log(`   - ${users.length} utilisateurs`);
    console.log(`   - ${employees.length} employés`);
    console.log('\n🔐 Credentials:');
    console.log('   Admin:      admin@dsd.gn / Admin123!');
    console.log('   RH:         rh@dsd.gn / RH123!');
    console.log('   Impression: impression@dsd.gn / Impression123!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
};

// Exécuter le seed
seedData();