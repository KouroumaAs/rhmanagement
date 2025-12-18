import cron from 'node-cron';
import { Employee } from '../models';

/**
 * Job that runs daily at midnight to check for expired contracts
 * and automatically updates employee status to TERMINE
 */
export const startContractExpirationJob = () => {
  // Run every day at midnight (0 0 * * *)
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('🔄 Running contract expiration check job...');

      const now = new Date();

      // Find all ACTIF employees with expired contracts
      const expiredEmployees = await Employee.find({
        status: 'ACTIF',
        dateFinContrat: { $lt: now },
      });

      if (expiredEmployees.length === 0) {
        console.log('✅ No expired contracts found');
        return;
      }

      console.log(`📋 Found ${expiredEmployees.length} employees with expired contracts`);

      // Update all expired employees to TERMINE status
      const updatePromises = expiredEmployees.map(async (employee) => {
        employee.status = 'TERMINE';
        await employee.save();
        console.log(
          `  ✓ Updated ${employee.prenom} ${employee.nom} (${employee.matricule}) to TERMINE`
        );
      });

      await Promise.all(updatePromises);

      console.log(`✅ Successfully updated ${expiredEmployees.length} employees to TERMINE status`);
    } catch (error) {
      console.error('❌ Error in contract expiration job:', error);
    }
  });

  console.log('⏰ Contract expiration job scheduled (runs daily at midnight)');
};

/**
 * Manual function to check and update expired contracts
 * Can be called from an API endpoint for immediate check
 */
export const checkExpiredContracts = async () => {
  try {
    const now = new Date();

    const expiredEmployees = await Employee.find({
      status: 'ACTIF',
      dateFinContrat: { $lt: now },
    });

    if (expiredEmployees.length === 0) {
      return {
        message: 'No expired contracts found',
        count: 0,
        updated: [],
      };
    }

    const updated = [];

    for (const employee of expiredEmployees) {
      employee.status = 'TERMINE';
      await employee.save();
      updated.push({
        id: employee._id.toString(),
        nom: employee.nom,
        prenom: employee.prenom,
        matricule: employee.matricule,
        dateFinContrat: employee.dateFinContrat,
      });
    }

    return {
      message: `Successfully updated ${expiredEmployees.length} employees to TERMINE status`,
      count: expiredEmployees.length,
      updated,
    };
  } catch (error) {
    throw error;
  }
};
