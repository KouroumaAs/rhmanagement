import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import { getAllActivityLogs, getUserActivityLogs } from '../services/activityLogger';

const router = Router();

/**
 * All routes require authentication
 */
router.use(protect);

/**
 * Get current user's activity logs
 */
router.get('/me', async (req, res): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Non autorisé',
      });
      return;
    }

    const limit = parseInt(req.query.limit as string) || 50;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const logs = await getUserActivityLogs((req.user._id as any).toString(), limit, skip);

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des logs',
    });
  }
});

/**
 * Get all activity logs (admin only)
 */
router.get('/', authorize('ADMIN'), async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const filters: any = {};
    if (req.query.action) filters.action = req.query.action;
    if (req.query.resourceType) filters.resourceType = req.query.resourceType;
    if (req.query.userId) filters.userId = req.query.userId;
    if (req.query.startDate) filters.startDate = new Date(req.query.startDate as string);
    if (req.query.endDate) filters.endDate = new Date(req.query.endDate as string);

    const result = await getAllActivityLogs(filters, limit, skip);

    res.status(200).json({
      success: true,
      data: result.logs,
      pagination: {
        total: result.total,
        page: result.page,
        pageSize: result.pageSize,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des logs',
    });
  }
});

export default router;
