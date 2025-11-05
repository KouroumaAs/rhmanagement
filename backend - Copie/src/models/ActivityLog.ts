import mongoose, { Schema } from 'mongoose';
import { IActivityLog } from '../types';

const activityLogSchema = new Schema<IActivityLog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        // User Management
        'USER_LOGIN',
        'USER_LOGOUT',
        'USER_CREATED',
        'USER_UPDATED',
        'USER_DELETED',
        'USER_ACTIVATED',
        'USER_DEACTIVATED',
        'USER_BLOCKED',
        'USER_UNBLOCKED',
        'PASSWORD_CHANGED',
        'PASSWORD_RESET',
        // Employee Management
        'EMPLOYEE_CREATED',
        'EMPLOYEE_UPDATED',
        'EMPLOYEE_DELETED',
        'EMPLOYEE_STATUS_CHANGED',
        'EMPLOYEE_TRANSFERRED_TO_PRINT',
        // Badge Management
        'BADGE_CREATED',
        'BADGE_PRINTED',
        'BADGE_DELETED',
        'BADGE_STATUS_CHANGED',
        'BADGE_VERIFIED',
      ],
    },
    resourceType: {
      type: String,
      enum: ['USER', 'EMPLOYEE', 'BADGE'],
    },
    resourceId: {
      type: Schema.Types.ObjectId,
    },
    details: {
      type: Schema.Types.Mixed,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILURE'],
      default: 'SUCCESS',
    },
    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
activityLogSchema.index({ user: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });
activityLogSchema.index({ resourceType: 1, resourceId: 1 });

export default mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);
