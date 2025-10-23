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
      const dto: CreateEmployeeDto = req.body;
      const file = req.file;

      const result = await employeeService.createEmployee(dto, file);

      res.status(201).json({
        success: true,
        message: 'Employé créé avec succès',
        data: result,
      });
    } catch (error: any) {
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
      const result = await employeeService.getEmployeeStats();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
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
}

export default new EmployeesController();