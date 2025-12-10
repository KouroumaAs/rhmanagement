import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../services';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdateEmployeeStatusDto,
  EmployeeQueryDto,
} from '../dtos';
import { checkExpiredContracts } from '../jobs/contract.job';

/**
 * Employees Controller
 */
class EmployeesController {
  /**
   * @desc    Get all employees
   * @route   GET /api/employees
   * @access  Private
   */
  getAllEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const queryDto: EmployeeQueryDto = req.query;
      const result = await employeeService.getAllEmployees(queryDto);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Get single employee
   * @route   GET /api/employees/:id
   * @access  Private
   */
  getEmployeeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await employeeService.getEmployeeById(req.params.id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Create new employee
   * @route   POST /api/employees
   * @access  Private (RH, ADMIN)
   */
  createEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('🌐 [CONTROLLER] POST /api/employees - Requête reçue');
      console.log('🌐 [CONTROLLER] Headers:', JSON.stringify(req.headers, null, 2));
      console.log('🌐 [CONTROLLER] Body:', JSON.stringify(req.body, null, 2));
      console.log('🌐 [CONTROLLER] File:', req.file ? req.file.filename : 'Aucun fichier');

      const dto: CreateEmployeeDto = req.body;
      const file = req.file;

      console.log('🌐 [CONTROLLER] Appel du service createEmployee...');
      const result = await employeeService.createEmployee(dto, file);
      console.log('✅ [CONTROLLER] Service terminé avec succès');

      res.status(201).json({
        success: true,
        message: 'Employé créé avec succès',
        data: result,
      });
      console.log('✅ [CONTROLLER] Réponse 201 envoyée');
    } catch (error: any) {
      console.error('❌ [CONTROLLER] Erreur capturée:', error.message);
      console.error('❌ [CONTROLLER] Stack:', error.stack);
      next(error);
    }
  };

  /**
   * @desc    Update employee
   * @route   PUT /api/employees/:id
   * @access  Private (RH, ADMIN)
   */
  updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: UpdateEmployeeDto = req.body;
      const file = req.file;
      const result = await employeeService.updateEmployee(req.params.id, dto, file);

      res.status(200).json({
        success: true,
        message: 'Employé modifié avec succès',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Delete employee
   * @route   DELETE /api/employees/:id
   * @access  Private (ADMIN)
   */
  deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await employeeService.deleteEmployee(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Employé supprimé avec succès',
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Transfer employee to print queue
   * @route   POST /api/employees/:id/transfer-to-print
   * @access  Private (RH, ADMIN)
   */
  transferToPrint = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await employeeService.transferToPrint(req.params.id);

      res.status(201).json({
        success: true,
        message: "Employé transféré vers la file d'impression",
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Update employee status
   * @route   PUT /api/employees/:id/status
   * @access  Private (RH, ADMIN)
   */
  updateEmployeeStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: UpdateEmployeeStatusDto = req.body;
      const result = await employeeService.updateEmployeeStatus(req.params.id, dto);

      res.status(200).json({
        success: true,
        message: "Statut de l'employé modifié avec succès",
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Get employee statistics
   * @route   GET /api/employees/stats
   * @access  Private
   */
  getEmployeeStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('📊 [Controller] getEmployeeStats called');
      const startTime = Date.now();
      const result = await employeeService.getEmployeeStats();
      const duration = Date.now() - startTime;
      console.log(`📊 [Controller] getEmployeeStats completed in ${duration}ms`);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.error('❌ [Controller] getEmployeeStats error:', error);
      next(error);
    }
  };

  /**
   * @desc    Check and update expired contracts (manual trigger)
   * @route   POST /api/employees/check-expired-contracts
   * @access  Private (ADMIN)
   */
  checkExpiredContractsManual = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await checkExpiredContracts();

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * @desc    Download employee photo
   * @route   GET /api/employees/:id/photo/download
   * @access  Private
   */
  downloadEmployeePhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('📥 [downloadEmployeePhoto] Requête reçue pour employee ID:', req.params.id);

      const result = await employeeService.getEmployeeById(req.params.id);
      console.log('📥 [downloadEmployeePhoto] Employé trouvé:', result.nom, result.prenom);
      console.log('📥 [downloadEmployeePhoto] Photo path:', result.photo);

      if (!result.photo) {
        console.log('❌ [downloadEmployeePhoto] Aucune photo disponible');
        res.status(404).json({
          success: false,
          message: 'Aucune photo disponible pour cet employé',
        });
        return;
      }

      // Construire le chemin complet du fichier
      const path = require('path');
      const fs = require('fs');
      const filePath = path.join(process.cwd(), result.photo);
      console.log('📥 [downloadEmployeePhoto] Chemin complet du fichier:', filePath);

      // Vérifier si le fichier existe
      if (!fs.existsSync(filePath)) {
        console.log('❌ [downloadEmployeePhoto] Fichier introuvable:', filePath);
        res.status(404).json({
          success: false,
          message: 'Fichier photo introuvable',
        });
        return;
      }

      // Extraire l'extension du fichier
      const extension = path.extname(result.photo);

      // Créer un nom de fichier avec le matricule
      const downloadName = `${result.matricule}${extension}`;
      console.log('📥 [downloadEmployeePhoto] Nom de téléchargement:', downloadName);

      // Définir les headers pour forcer le téléchargement
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);

      console.log('✅ [downloadEmployeePhoto] Envoi du fichier...');

      // Envoyer le fichier
      res.sendFile(filePath);
    } catch (error: any) {
      console.error('❌ [downloadEmployeePhoto] Erreur:', error);
      next(error);
    }
  };
}

export default new EmployeesController();