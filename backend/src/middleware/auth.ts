import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { config } from '../config';
import { IUser, UserRole } from '../types';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

/**
 * Protect routes - require authentication
 */
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('🔐 Auth Middleware - Token présent:', !!token);
    console.log('🔐 Auth Middleware - Headers:', req.headers.authorization);

    if (!token) {
      console.log('❌ Auth Middleware - Aucun token fourni');
      res.status(401).json({
        success: false,
        message: 'Non autorisé - Aucun token fourni',
      });
      return;
    }

    try {
      console.log('🔑 Auth Middleware - Vérification du token...');
      console.log('🔑 JWT_SECRET utilisé:', config.jwtSecret.substring(0, 10) + '...');

      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
      console.log('✅ Auth Middleware - Token valide, User ID:', decoded.id);

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        console.log('❌ Auth Middleware - Utilisateur non trouvé pour ID:', decoded.id);
        res.status(401).json({
          success: false,
          message: 'Non autorisé - Utilisateur non trouvé',
        });
        return;
      }

      console.log('✅ Auth Middleware - Utilisateur trouvé:', user.email);

      // Check if user is blocked
      if (user.isBlocked) {
        console.log('❌ Auth Middleware - Compte bloqué:', user.email);
        res.status(403).json({
          success: false,
          message: 'Compte bloqué - Contactez l\'administrateur',
        });
        return;
      }

      // Check if user is active
      if (!user.isActive) {
        console.log('❌ Auth Middleware - Compte désactivé:', user.email);
        res.status(403).json({
          success: false,
          message: 'Compte désactivé - Contactez l\'administrateur',
        });
        return;
      }

      console.log('✅ Auth Middleware - Authentification réussie:', user.email);
      req.user = user;
      next();
    } catch (error) {
      console.error('❌ Auth Middleware - Erreur de vérification du token:', error);
      if (error instanceof jwt.JsonWebTokenError) {
        console.error('❌ JWT Error:', error.message);
      }
      res.status(401).json({
        success: false,
        message: 'Non autorisé - Token invalide',
      });
      return;
    }
  } catch (error) {
    console.error('❌ Auth Middleware - Erreur serveur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
    });
    return;
  }
};

/**
 * Authorize specific roles
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Non autorisé',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource`,
      });
      return;
    }

    next();
  };
};