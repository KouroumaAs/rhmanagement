import { Request, Response, NextFunction } from 'express';
import { authService } from '../services';
import { RegisterDto, LoginDto, ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto } from '../dtos';

/**
 * Auth Controller
 */
class AuthController {
  /**
   * @desc    Register new user
   * @route   POST /api/auth/register
   * @access  Public
   */
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: RegisterDto = req.body;
      const createdBy = (req.user?._id as any)?.toString();
      const result = await authService.register(dto, createdBy);

      res.status(201).json({
        success: true,
        message: 'Utilisateur créé avec succès',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Login user
   * @route   POST /api/auth/login
   * @access  Public
   */
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: LoginDto = req.body;
      const result = await authService.login(dto);

      res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Get current user
   * @route   GET /api/auth/me
   * @access  Private
   */
  getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req.user?._id as any)?.toString();

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Non autorisé',
        });
        return;
      }

      const result = await authService.getMe(userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Change password
   * @route   PUT /api/auth/change-password
   * @access  Private
   */
  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: ChangePasswordDto = req.body;
      const userId = (req.user?._id as any)?.toString();

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Non autorisé',
        });
        return;
      }

      await authService.changePassword(userId, dto);

      res.status(200).json({
        success: true,
        message: 'Mot de passe modifié avec succès',
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Request password reset
   * @route   POST /api/auth/forgot-password
   * @access  Public
   */
  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: ForgotPasswordDto = req.body;
      const result = await authService.forgotPassword(dto);

      res.status(200).json({
        success: true,
        message: 'Demande de réinitialisation envoyée',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Reset password
   * @route   PUT /api/auth/reset-password
   * @access  Public
   */
  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: ResetPasswordDto = req.body;
      await authService.resetPassword(dto);

      res.status(200).json({
        success: true,
        message: 'Mot de passe réinitialisé avec succès',
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Get all users
   * @route   GET /api/auth/users
   * @access  Private (ADMIN)
   */
  getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await authService.getAllUsers();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Get user statistics
   * @route   GET /api/auth/stats
   * @access  Private
   */
  getUserStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await authService.getUserStats();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Update user
   * @route   PUT /api/auth/users/:id
   * @access  Private (ADMIN)
   */
  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updatedBy = (req.user?._id as any)?.toString();
      const result = await authService.updateUser(req.params.id, req.body, updatedBy);

      res.status(200).json({
        success: true,
        message: 'Utilisateur modifié avec succès',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Toggle active user
   * @route   PUT /api/auth/users/:id/active
   * @access  Private (ADMIN)
   */
  toggleActiveUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const toggledBy = (req.user?._id as any)?.toString();
      const result = await authService.toggleActiveUser(req.params.id, toggledBy);

      res.status(200).json({
        success: true,
        message: result.isActive ? 'Utilisateur activé' : 'Utilisateur désactivé',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Delete user
   * @route   DELETE /api/auth/users/:id
   * @access  Private (ADMIN)
   */
  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deletedBy = (req.user?._id as any)?.toString();
      await authService.deleteUser(req.params.id, deletedBy);

      res.status(200).json({
        success: true,
        message: 'Utilisateur supprimé avec succès',
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Admin reset user password
   * @route   PUT /api/auth/users/:id/reset-password
   * @access  Private (ADMIN)
   */
  adminResetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { newPassword } = req.body;
      const resetBy = (req.user?._id as any)?.toString();
      await authService.adminResetPassword(req.params.id, newPassword, resetBy);

      res.status(200).json({
        success: true,
        message: 'Mot de passe réinitialisé avec succès',
      });
    } catch (error: any) {
      next(error);
    }
  };
}

export default new AuthController();