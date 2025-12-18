import { Router } from 'express';
import { authController } from '../controllers';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  adminResetPasswordSchema,
} from '../validators';

const router = Router();

/**
 * Public routes
 */
router.post('/login', validate(loginSchema), authController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.put('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

/**
 * Protected routes
 */
router.get('/me', protect, authController.getMe);
router.put('/change-password', protect, validate(changePasswordSchema), authController.changePassword);

/**
 * Admin only routes
 */
/* The code `router.post('/register', protect, authorize('ADMIN'), validate(registerSchema),
authController.register);` is defining a route for registering a new user. Here's a breakdown of
what each part is doing: */
router.post('/register', protect, authorize('ADMIN'), validate(registerSchema), authController.register);
router.get('/stats', protect, authorize('ADMIN'), authController.getUserStats);
router.get('/users', protect, authorize('ADMIN'), authController.getAllUsers);
router.put('/users/:id', protect, authorize('ADMIN'), authController.updateUser);
router.put('/users/:id/active', protect, authorize('ADMIN'), authController.toggleActiveUser);
router.put('/users/:id/reset-password', protect, authorize('ADMIN'), validate(adminResetPasswordSchema), authController.adminResetPassword);
router.delete('/users/:id', protect, authorize('ADMIN'), authController.deleteUser);

export default router;