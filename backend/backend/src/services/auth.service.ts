import jwt from 'jsonwebtoken';
import { User } from '../models';
import { config } from '../config';
import { RegisterDto, LoginDto, ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto, AuthResponseDto, UserResponseDto } from '../dtos';
import { logActivity } from './activityLogger';

class AuthService {
  /**
   * Validate password strength
   * - At least 8 characters
   * - At least one uppercase letter
   * - At least one lowercase letter
   * - At least one number
   */
  private validatePasswordStrength(password: string): void {
    if (password.length < 8) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }

    if (!/[A-Z]/.test(password)) {
      throw new Error('Le mot de passe doit contenir au moins une lettre majuscule');
    }

    if (!/[a-z]/.test(password)) {
      throw new Error('Le mot de passe doit contenir au moins une lettre minuscule');
    }

    if (!/[0-9]/.test(password)) {
      throw new Error('Le mot de passe doit contenir au moins un chiffre');
    }
  }
  register = async (dto: RegisterDto, createdBy?: string): Promise<AuthResponseDto> => {
    // Validate password strength
    this.validatePasswordStrength(dto.password);

    // Check if user already exists
    const existingUser = await User.findOne({ email: dto.email });

    if (existingUser) {
      throw new Error('Cet email est déjà utilisé');
    }

    // Create user
    const user = await User.create({
      nom: dto.nom,
      prenom: dto.prenom,
      email: dto.email,
      telephone: dto.telephone,
      password: dto.password,
      role: dto.role || 'RH',
    });

    // Log activity
    if (createdBy) {
      await logActivity({
        user: createdBy,
        action: 'USER_CREATED',
        resourceType: 'USER',
        resourceId: user._id,
        details: {
          email: user.email,
          role: user.role,
        },
      });
    }

    // Generate token
    const token = jwt.sign({ id: (user._id as any).toString() }, config.jwtSecret, {
      expiresIn: config.jwtExpire as any,
    });

    return {
      user: {
        id: (user._id as any).toString(),
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
      token,
    };
  };

  login = async (dto: LoginDto): Promise<AuthResponseDto> => {
    // Find user
    const user = await User.findOne({ email: dto.email }).select('+password');

    if (!user) {
      throw new Error('Identifiants invalides');
    }

    // Check if user is active
    if (!user.isActive) {
      // Log failed login attempt
      await logActivity({
        user: (user._id as any).toString(),
        action: 'USER_LOGIN',
        status: 'FAILURE',
        errorMessage: 'Compte désactivé',
      });
      throw new Error('Votre compte a été désactivé. Contactez l\'administrateur.');
    }

    // Check password
    const isMatch = await user.comparePassword(dto.password);

    if (!isMatch) {
      // Log failed login attempt
      await logActivity({
        user: (user._id as any).toString(),
        action: 'USER_LOGIN',
        status: 'FAILURE',
        errorMessage: 'Mot de passe incorrect',
      });
      throw new Error('Identifiants invalides');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Log successful login
    await logActivity({
      user: (user._id as any).toString(),
      action: 'USER_LOGIN',
      status: 'SUCCESS',
    });

    // Generate token
    const token = jwt.sign({ id: (user._id as any).toString() }, config.jwtSecret, {
      expiresIn: config.jwtExpire as any,
    });

    return {
      user: {
        id: (user._id as any).toString(),
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
      token,
    };
  };

  getMe = async (userId: string): Promise<UserResponseDto> => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    return {
      id: (user._id as any).toString(),
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };

  changePassword = async (userId: string, dto: ChangePasswordDto): Promise<void> => {
    // Get user with password
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Check current password
    const isMatch = await user.comparePassword(dto.currentPassword);

    if (!isMatch) {
      await logActivity({
        user: userId,
        action: 'PASSWORD_CHANGED',
        status: 'FAILURE',
        errorMessage: 'Mot de passe actuel incorrect',
      });
      throw new Error('Mot de passe actuel incorrect');
    }

    // Validate new password strength
    this.validatePasswordStrength(dto.newPassword);

    // Update password
    user.password = dto.newPassword;
    await user.save();

    // Log password change
    await logActivity({
      user: userId,
      action: 'PASSWORD_CHANGED',
      status: 'SUCCESS',
    });
  };

  forgotPassword = async (dto: ForgotPasswordDto): Promise<{ resetToken: string }> => {
    // Check if user exists
    const user = await User.findOne({ email: dto.email });

    if (!user) {
      throw new Error('Aucun utilisateur avec cet email');
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: (user._id as any).toString() }, config.jwtSecret, {
      expiresIn: '1h',
    });

    // In production, send email with reset link here
    return { resetToken };
  };

  resetPassword = async (dto: ResetPasswordDto): Promise<void> => {
    // Verify token
    let decoded: { id: string };

    try {
      decoded = jwt.verify(dto.resetToken, config.jwtSecret) as { id: string };
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }

    // Get user
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error('Token invalide ou expiré');
    }

    // Validate new password strength
    this.validatePasswordStrength(dto.newPassword);

    // Update password
    user.password = dto.newPassword;
    await user.save();

    // Log password reset
    await logActivity({
      user: decoded.id,
      action: 'PASSWORD_RESET',
      status: 'SUCCESS',
    });
  };

  getAllUsers = async (): Promise<any[]> => {
    const users = await User.find().select('-password').sort('-lastLogin');

    return users.map(user => ({
      id: (user._id as any).toString(),
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      role: user.role,
      lastLogin: user.lastLogin,
      isActive: user.isActive,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  };

  updateUser = async (userId: string, data: { nom?: string; prenom?: string; email?: string; telephone?: string; role?: string }, updatedBy?: string): Promise<any> => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Check if email is being changed and if it already exists
    if (data.email && data.email !== user.email) {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        throw new Error('Cet email est déjà utilisé');
      }
    }

    // Track changes for logging
    const changes: any = {};
    if (data.nom && data.nom !== user.nom) changes.nom = { from: user.nom, to: data.nom };
    if (data.prenom && data.prenom !== user.prenom) changes.prenom = { from: user.prenom, to: data.prenom };
    if (data.email && data.email !== user.email) changes.email = { from: user.email, to: data.email };
    if (data.telephone && data.telephone !== user.telephone) changes.telephone = { from: user.telephone, to: data.telephone };
    if (data.role && data.role !== user.role) changes.role = { from: user.role, to: data.role };

    // Update user fields
    if (data.nom) user.nom = data.nom;
    if (data.prenom) user.prenom = data.prenom;
    if (data.email) user.email = data.email;
    if (data.telephone) user.telephone = data.telephone;
    if (data.role) user.role = data.role as any;

    await user.save();

    // Log user update
    if (updatedBy) {
      await logActivity({
        user: updatedBy,
        action: 'USER_UPDATED',
        resourceType: 'USER',
        resourceId: userId,
        details: { changes },
      });
    }

    return {
      id: (user._id as any).toString(),
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      role: user.role,
      lastLogin: user.lastLogin,
      isActive: user.isActive,
      isBlocked: user.isBlocked,
    };
  };

  toggleActiveUser = async (userId: string, toggledBy?: string): Promise<any> => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const previousState = user.isActive;
    user.isActive = !user.isActive;
    await user.save();

    // Log activation/deactivation
    if (toggledBy) {
      await logActivity({
        user: toggledBy,
        action: user.isActive ? 'USER_ACTIVATED' : 'USER_DEACTIVATED',
        resourceType: 'USER',
        resourceId: userId,
        details: {
          previousState,
          newState: user.isActive,
        },
      });
    }

    return {
      id: (user._id as any).toString(),
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      isActive: user.isActive,
    };
  };

  deleteUser = async (userId: string, deletedBy?: string): Promise<void> => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Log deletion before deleting
    if (deletedBy) {
      await logActivity({
        user: deletedBy,
        action: 'USER_DELETED',
        resourceType: 'USER',
        resourceId: userId,
        details: {
          email: user.email,
          role: user.role,
        },
      });
    }

    await user.deleteOne();
  };

  getUserStats = async (): Promise<any> => {
    const [total, active, inactive, recentUsers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: false }),
      User.find().select('-password').sort('-lastLogin').limit(5),
    ]);

    return {
      total,
      active,
      inactive,
      recent: recentUsers.map(user => ({
        id: (user._id as any).toString(),
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
        isActive: user.isActive,
      })),
    };
  };

  adminResetPassword = async (userId: string, newPassword: string, resetBy?: string): Promise<void> => {
    // Get user
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Validate new password strength
    this.validatePasswordStrength(newPassword);

    // Update password
    user.password = newPassword;
    await user.save();

    // Log password reset by admin
    if (resetBy) {
      await logActivity({
        user: resetBy,
        action: 'PASSWORD_RESET',
        resourceType: 'USER',
        resourceId: userId,
        details: {
          resetByAdmin: true,
          targetUser: user.email,
        },
      });
    }
  };
}

export default new AuthService();