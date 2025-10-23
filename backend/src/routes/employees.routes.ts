import { Router } from 'express';
import { employeesController } from '../controllers';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { upload } from '../middleware/upload';
import {
  updateEmployeeStatusSchema,
  employeeQuerySchema,
} from '../validators';

const router = Router();

/**
 * All routes require authentication and RH, ASSISTANT_RH or ADMIN role
 */
router.use(protect);
router.use(authorize('RH', 'ASSISTANT_RH', 'ADMIN'));

/**
 * Statistics route (RH and ADMIN only)
 */
router.get('/stats', employeesController.getEmployeeStats);

/**
 * CRUD routes
 */
router
  .route('/')
  .get(validate(employeeQuerySchema), employeesController.getAllEmployees)
  .post(
    upload.single('photo'),
    employeesController.createEmployee
  );

router
  .route('/:id')
  .get(employeesController.getEmployeeById)
  .put(
    upload.single('photo'),
    employeesController.updateEmployee
  )
  .delete(authorize('RH', 'ADMIN'), employeesController.deleteEmployee); // ASSISTANT_RH ne peut pas supprimer

/**
 * Additional actions
 */
router.put(
  '/:id/status',
  validate(updateEmployeeStatusSchema),
  employeesController.updateEmployeeStatus
);

router.post(
  '/:id/transfer-to-print',
  employeesController.transferToPrint
);

/**
 * Check expired contracts (manual trigger)
 */
router.post(
  '/check-expired-contracts',
  authorize('ADMIN'),
  employeesController.checkExpiredContractsManual
);

export default router;