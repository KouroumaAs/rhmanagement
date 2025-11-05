import { Request, Response, NextFunction } from 'express';

/**
 * Error handler middleware
 */
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('❌ Erreur:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    // Renvoyer le premier message d'erreur comme message principal
    const firstError = errors[0] || 'Erreur de validation';
    res.status(400).json({
      success: false,
      message: firstError,
      errors,
    });
    return;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const fieldNames: Record<string, string> = {
      'matricule': 'Le matricule',
      'email': 'L\'email',
      'telephone': 'Le téléphone',
    };
    const fieldName = fieldNames[field] || field;
    res.status(400).json({
      success: false,
      message: `${fieldName} existe déjà`,
      field: field,
    });
    return;
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Ressource non trouvée - ID invalide',
    });
    return;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      message: 'Token invalide',
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      message: 'Token expiré',
    });
    return;
  }

  // Business logic errors (like "email already exists")
  if (err.message && (
    err.message.includes('déjà utilisé') ||
    err.message.includes('already exists') ||
    err.message.includes('existe déjà') ||
    err.message.includes('invalide') ||
    err.message.includes('incorrect') ||
    err.message.includes('ne correspond pas') ||
    err.message.includes('doit contenir')
  )) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Erreur serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};