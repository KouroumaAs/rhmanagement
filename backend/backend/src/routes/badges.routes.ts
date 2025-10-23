import { Router } from 'express';
import { badgesController } from '../controllers';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  badgeQuerySchema,
  updateBadgeStatusSchema,
} from '../validators';

const router = Router();

/**
 * Public routes
 */
router.get('/verify/:matricule', badgesController.verifyByMatricule);

/**
 * Protected routes
 */
router.use(protect);

/**
 * Statistics route (accessible à RH, ASSISTANT_RH, IMPRESSION, ADMIN)
 */
router.get('/stats', authorize('RH', 'ASSISTANT_RH', 'IMPRESSION', 'ADMIN'), badgesController.getBadgeStats);

/**
 * CRUD routes
 */
router.route('/').get(validate(badgeQuerySchema), badgesController.getAllBadges);

router
  .route('/:id')
  .get(badgesController.getBadgeById)
  .delete(authorize('ADMIN'), badgesController.deleteBadge);

/**
 * Badge actions
 */
router.post('/:id/print', authorize('IMPRESSION', 'ADMIN'), badgesController.printBadge);
router.get('/:id/qr-code', badgesController.getQRCode);
router.put(
  '/:id/status',
  authorize('IMPRESSION', 'ADMIN'),
  validate(updateBadgeStatusSchema),
  badgesController.updateBadgeStatus
);

export default router;