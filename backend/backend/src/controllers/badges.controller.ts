import { Request, Response, NextFunction } from 'express';
import { badgeService } from '../services';
import { BadgeQueryDto, UpdateBadgeStatusDto } from '../dtos';

/**
 * Badges Controller
 */
class BadgesController {
  /**
   * @desc    Get all badges
   * @route   GET /api/badges
   * @access  Private
   */
  getAllBadges = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const queryDto: BadgeQueryDto = req.query;
      const result = await badgeService.getAllBadges(queryDto);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Get single badge
   * @route   GET /api/badges/:id
   * @access  Private
   */
  getBadgeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await badgeService.getBadgeById(req.params.id);

      console.log('🎯 Controller - Badge récupéré:', {
        id: result.id,
        hasEmployee: !!result.employee,
        employeeType: typeof result.employee,
        employee: result.employee,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Print badge
   * @route   POST /api/badges/:id/print
   * @access  Private (IMPRESSION, ADMIN)
   */
  printBadge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const printedBy = (req.user?._id as any)?.toString();

      if (!printedBy) {
        res.status(401).json({
          success: false,
          message: 'Non autorisé',
        });
        return;
      }

      const result = await badgeService.printBadge(req.params.id, printedBy);

      res.status(200).json({
        success: true,
        message: 'Badge imprimé avec succès',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Generate QR code image for badge
   * @route   GET /api/badges/:id/qr-code
   * @access  Private
   */
  getQRCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await badgeService.getQRCode(req.params.id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Verify QR code and check employee status
   * @route   GET /api/badges/verify/:qrCode
   * @access  Public
   */
  verifyQRCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await badgeService.verifyQRCode(req.params.qrCode);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Verify badge by matricule and check employee status
   * @route   GET /api/badges/verify-matricule/:matricule
   * @access  Public
   */
  verifyByMatricule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await badgeService.verifyByMatricule(req.params.matricule);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Delete badge
   * @route   DELETE /api/badges/:id
   * @access  Private (ADMIN)
   */
  deleteBadge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await badgeService.deleteBadge(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Badge supprimé avec succès',
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Update badge status
   * @route   PUT /api/badges/:id/status
   * @access  Private (IMPRESSION, ADMIN)
   */
  updateBadgeStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: UpdateBadgeStatusDto = req.body;
      const result = await badgeService.updateBadgeStatus(req.params.id, dto);

      res.status(200).json({
        success: true,
        message: 'Statut du badge modifié avec succès',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Get badge statistics
   * @route   GET /api/badges/stats
   * @access  Private
   */
  getBadgeStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await badgeService.getBadgeStats();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };
}

export default new BadgesController();