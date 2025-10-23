import { ActivityLog } from '../models';
import { ActivityAction, ResourceType, IUser } from '../types';
import { Request } from 'express';

interface LogActivityParams {
  user: IUser | string;
  action: ActivityAction;
  resourceType?: ResourceType;
  resourceId?: any;
  details?: any;
  status?: 'SUCCESS' | 'FAILURE';
  errorMessage?: string;
  req?: Request;
}

/**
 * Log user activity
 */
export const logActivity = async ({
  user,
  action,
  resourceType,
  resourceId,
  details,
  status = 'SUCCESS',
  errorMessage,
  req,
}: LogActivityParams): Promise<void> => {
  try {
    const userId = typeof user === 'string' ? user : user._id;

    // Get IP address from request
    const ipAddress = req
      ? (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        req.socket?.remoteAddress ||
        req.ip
      : undefined;

    // Get user agent from request
    const userAgent = req ? req.headers['user-agent'] : undefined;

    await ActivityLog.create({
      user: userId,
      action,
      resourceType,
      resourceId,
      details,
      ipAddress,
      userAgent,
      status,
      errorMessage,
    });
  } catch (error) {
    // Don't throw error, just log it
    console.error('Failed to log activity:', error);
  }
};

/**
 * Get user activity logs
 */
export const getUserActivityLogs = async (
  userId: string,
  limit: number = 50,
  skip: number = 0
) => {
  return ActivityLog.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('user', 'nom prenom email role');
};

/**
 * Get all activity logs (admin only)
 */
export const getAllActivityLogs = async (
  filters: {
    action?: ActivityAction;
    resourceType?: ResourceType;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  },
  limit: number = 100,
  skip: number = 0
) => {
  const query: any = {};

  if (filters.action) query.action = filters.action;
  if (filters.resourceType) query.resourceType = filters.resourceType;
  if (filters.userId) query.user = filters.userId;
  if (filters.startDate || filters.endDate) {
    query.createdAt = {};
    if (filters.startDate) query.createdAt.$gte = filters.startDate;
    if (filters.endDate) query.createdAt.$lte = filters.endDate;
  }

  const [logs, total] = await Promise.all([
    ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('user', 'nom prenom email role'),
    ActivityLog.countDocuments(query),
  ]);

  return {
    logs,
    total,
    page: Math.floor(skip / limit) + 1,
    pageSize: limit,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * Delete old activity logs (cleanup)
 */
export const deleteOldActivityLogs = async (daysToKeep: number = 90) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

  const result = await ActivityLog.deleteMany({
    createdAt: { $lt: cutoffDate },
  });

  return result.deletedCount;
};
