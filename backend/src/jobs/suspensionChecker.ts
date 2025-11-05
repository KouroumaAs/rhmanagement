import cron from 'node-cron';
import employeeService from '../services/employee.service';

/**
 * Cron job qui vérifie et met à jour automatiquement :
 * - Les suspensions expirées
 * - Les contrats expirés depuis plus de 30 jours
 * S'exécute tous les jours à minuit (00:00)
 */
export const startSuspensionCheckerJob = () => {
  // Format cron: minute hour day month day-of-week
  // '0 0 * * *' = tous les jours à minuit
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('🕐 [Cron Job] Vérification des suspensions et contrats expirés...');

      // Vérifier les suspensions expirées
      await employeeService.checkAndUpdateExpiredSuspensions();

      // Vérifier les contrats expirés depuis plus de 30 jours
      await employeeService.checkAndUpdateExpiredContracts();

      console.log('✅ [Cron Job] Vérification terminée');
    } catch (error) {
      console.error('❌ [Cron Job] Erreur lors de la vérification:', error);
    }
  }, {
    timezone: 'Africa/Conakry' // Fuseau horaire de Guinée
  });

  console.log('🚀 [Cron Job] Vérificateur de statuts démarré (tous les jours à 00:00)');
  console.log('   - Suspensions expirées → ACTIF');
  console.log('   - Contrats expirés depuis 30+ jours → TERMINE');
};
