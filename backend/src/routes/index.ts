import { Router } from 'express';
import authRoutes from './auth.routes';
import employeesRoutes from './employees.routes';
import badgesRoutes from './badges.routes';
import activityLogsRoutes from './activity-logs.routes';

const router = Router();

/**
 * API Routes
 */
router.use('/auth', authRoutes);
router.use('/employees', employeesRoutes);
router.use('/badges', badgesRoutes);
router.use('/activity-logs', activityLogsRoutes);

/**
 * Health check route
 */
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;