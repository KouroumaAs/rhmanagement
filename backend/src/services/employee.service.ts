import { Employee, Badge } from '../models';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdateEmployeeStatusDto,
  EmployeeQueryDto,
  EmployeeResponseDto,
  PaginatedEmployeeResponseDto,
  EmployeeStatsDto,
} from '../dtos';

class EmployeeService {
  // Helper pour valider une date
  private isValidDate(dateString: string): boolean {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  // Vérifier et mettre à jour les suspensions expirées
  checkAndUpdateExpiredSuspensions = async (): Promise<void> => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

    // Trouver tous les employés suspendus dont la date de fin est passée
    const expiredSuspensions = await Employee.find({
      status: 'SUSPENDU',
      dateFinSuspension: { $lte: today },
    });

    if (expiredSuspensions.length > 0) {
      console.log(`🔄 Mise à jour de ${expiredSuspensions.length} suspension(s) expirée(s)`);

      // Mettre à jour tous les employés en une seule opération
      await Employee.updateMany(
        {
          status: 'SUSPENDU',
          dateFinSuspension: { $lte: today },
        },
        {
          $set: {
            status: 'ACTIF',
            motifSuspension: null,
            dateFinSuspension: null,
          },
        }
      );

      console.log(`✅ Suspensions mises à jour avec succès`);
    }
  };

  // Vérifier et mettre à jour les contrats expirés depuis plus de 30 jours
  checkAndUpdateExpiredContracts = async (): Promise<void> => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculer la date il y a 30 jours
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Trouver tous les employés ACTIF ou SUSPENDU dont le contrat est expiré depuis plus de 30 jours
    const expiredContracts = await Employee.find({
      status: { $in: ['ACTIF', 'SUSPENDU'] },
      dateFinContrat: { $lte: thirtyDaysAgo },
    });

    if (expiredContracts.length > 0) {
      console.log(`🔄 Passage à TERMINE de ${expiredContracts.length} contrat(s) expiré(s) depuis plus de 30 jours`);

      // Mettre à jour tous les employés en une seule opération
      await Employee.updateMany(
        {
          status: { $in: ['ACTIF', 'SUSPENDU'] },
          dateFinContrat: { $lte: thirtyDaysAgo },
        },
        {
          $set: {
            status: 'TERMINE',
            motifSuspension: null,
            dateFinSuspension: null,
          },
        }
      );

      console.log(`✅ Contrats mis à jour avec succès`);
    }
  };

  getAllEmployees = async (query: EmployeeQueryDto): Promise<PaginatedEmployeeResponseDto> => {
    // Vérifier et mettre à jour les suspensions expirées et les contrats expirés
    await this.checkAndUpdateExpiredSuspensions();
    await this.checkAndUpdateExpiredContracts();

    const page = Math.max(1, Number(query.page) || 1); // Minimum 1
    const requestedLimit = Number(query.limit) || 10;
    const limit = Math.min(100, Math.max(1, requestedLimit)); // Entre 1 et 100
    const skip = (page - 1) * limit;

    // Build query
    const filters: any = {};

    if (query.type) {
      filters.type = query.type;
    }

    if (query.status) {
      filters.status = query.status;
    }

    if (query.search) {
      filters.$text = { $search: query.search };
    }

    // Filtres de date pour dateFinContrat
    if (query.dateFinContratDe || query.dateFinContratA) {
      filters.dateFinContrat = {};
      if (query.dateFinContratDe && this.isValidDate(query.dateFinContratDe)) {
        filters.dateFinContrat.$gte = new Date(query.dateFinContratDe);
      }
      if (query.dateFinContratA && this.isValidDate(query.dateFinContratA)) {
        filters.dateFinContrat.$lte = new Date(query.dateFinContratA);
      }
    }

    // Execute query
    const [employees, total] = await Promise.all([
      Employee.find(filters).sort('-createdAt').skip(skip).limit(limit),
      Employee.countDocuments(filters),
    ]);

    // Check badge status for each employee
    const employeesWithBadgeStatus = await Promise.all(
      employees.map(async (emp) => {
        const badge = await Badge.findOne({
          employee: emp._id,
          status: { $in: ['EN_ATTENTE', 'IMPRIME'] },
        });

        return {
          id: emp._id.toString(),
          nom: emp.nom,
          prenom: emp.prenom,
          email: emp.email,
          telephone: emp.telephone,
          fonction: emp.fonction,
          matricule: emp.matricule,
          type: emp.type,
          typeContrat: emp.typeContrat,
          status: emp.status,
          dateEmbauche: emp.dateEmbauche,
          dateFinContrat: emp.dateFinContrat,
          motifSuspension: emp.motifSuspension,
          dateFinSuspension: emp.dateFinSuspension,
          photo: emp.photo,
          hasBadge: !!badge,
          badgeStatus: badge?.status || null,
          createdAt: emp.createdAt,
          updatedAt: emp.updatedAt,
        };
      })
    );

    return {
      data: employeesWithBadgeStatus,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  };

  getEmployeeById = async (id: string): Promise<EmployeeResponseDto> => {
    // Vérifier et mettre à jour les suspensions expirées et les contrats expirés
    await this.checkAndUpdateExpiredSuspensions();
    await this.checkAndUpdateExpiredContracts();

    const employee = await Employee.findById(id);

    if (!employee) {
      throw new Error('Employé non trouvé');
    }

    return {
      id: employee._id.toString(),
      nom: employee.nom,
      prenom: employee.prenom,
      email: employee.email,
      telephone: employee.telephone,
      fonction: employee.fonction,
      matricule: employee.matricule,
      type: employee.type,
      typeContrat: employee.typeContrat,
      status: employee.status,
      dateEmbauche: employee.dateEmbauche,
      dateFinContrat: employee.dateFinContrat,
      motifSuspension: employee.motifSuspension,
      dateFinSuspension: employee.dateFinSuspension,
      photo: employee.photo,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    };
  };

  createEmployee = async (dto: CreateEmployeeDto, file?: Express.Multer.File): Promise<EmployeeResponseDto> => {
    // Check if matricule already exists
    const existingMatricule = await Employee.findOne({ matricule: dto.matricule });
    if (existingMatricule) {
      const error: any = new Error('Ce matricule existe déjà');
      error.statusCode = 400;
      error.field = 'matricule';
      throw error;
    }

    // Check if email already exists
    const existingEmail = await Employee.findOne({ email: dto.email });
    if (existingEmail) {
      const error: any = new Error('Cet email existe déjà');
      error.statusCode = 400;
      error.field = 'email';
      throw error;
    }

    // Préparer les données avec le chemin de la photo si elle existe
    const employeeData: any = {
      ...dto,
      status: 'ACTIF',
    };

    if (file) {
      // Enregistrer le chemin relatif de la photo
      employeeData.photo = `/uploads/employees/${file.filename}`;
    }

    // Create employee
    const employee = await Employee.create(employeeData);

    return {
      id: employee._id.toString(),
      nom: employee.nom,
      prenom: employee.prenom,
      email: employee.email,
      telephone: employee.telephone,
      fonction: employee.fonction,
      matricule: employee.matricule,
      type: employee.type,
      typeContrat: employee.typeContrat,
      status: employee.status,
      dateEmbauche: employee.dateEmbauche,
      dateFinContrat: employee.dateFinContrat,
      motifSuspension: employee.motifSuspension,
      dateFinSuspension: employee.dateFinSuspension,
      photo: employee.photo,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    };
  };

  updateEmployee = async (id: string, dto: UpdateEmployeeDto, file?: Express.Multer.File): Promise<EmployeeResponseDto> => {
    const employee = await Employee.findById(id);

    if (!employee) {
      throw new Error('Employé non trouvé');
    }

    // If updating matricule, check it doesn't exist
    if (dto.matricule && dto.matricule !== employee.matricule) {
      const existingMatricule = await Employee.findOne({ matricule: dto.matricule });
      if (existingMatricule) {
        const error: any = new Error('Ce matricule existe déjà');
        error.statusCode = 400;
        error.field = 'matricule';
        throw error;
      }
    }

    // If updating email, check it doesn't exist
    if (dto.email && dto.email !== employee.email) {
      const existingEmail = await Employee.findOne({ email: dto.email });
      if (existingEmail) {
        const error: any = new Error('Cet email existe déjà');
        error.statusCode = 400;
        error.field = 'email';
        throw error;
      }
    }

    // Validate dates if both are provided
    const dateEmbauche = dto.dateEmbauche ? new Date(dto.dateEmbauche) : employee.dateEmbauche;
    const dateFinContrat = dto.dateFinContrat ? new Date(dto.dateFinContrat) : employee.dateFinContrat;

    if (dateFinContrat && dateEmbauche && dateFinContrat <= dateEmbauche) {
      throw new Error('La date de fin doit être après la date d\'embauche');
    }

    // Préparer les données de mise à jour
    const updateData: any = { ...dto };

    // Ajouter la photo si un fichier est uploadé
    if (file) {
      updateData.photo = `/uploads/employees/${file.filename}`;
    }

    // Logique automatique de réactivation si la date de fin de contrat est modifiée
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Si l'employé est TERMINE et qu'on modifie la date de fin de contrat
    if (employee.status === 'TERMINE' && dto.dateFinContrat) {
      const newDateFinContrat = new Date(dto.dateFinContrat);
      newDateFinContrat.setHours(0, 0, 0, 0);

      // Si la nouvelle date de fin est dans le futur, réactiver l'employé
      if (newDateFinContrat > today) {
        updateData.status = 'ACTIF';
        console.log('✅ Employé réactivé automatiquement car la date de fin de contrat est dans le futur');
      }
    }

    // Si on passe un contrat à CDI (suppression de la date de fin), réactiver si TERMINE
    // Note: typeContrat n'existe pas dans le DTO
    // if (employee.status === 'TERMINE' && dto.typeContrat === 'CDI' && !dto.dateFinContrat) {
    //   updateData.status = 'ACTIF';
    //   console.log('✅ Employé réactivé automatiquement car le contrat est passé en CDI');
    // }

    // Update employee
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      throw new Error('Erreur lors de la mise à jour');
    }

    return {
      id: updatedEmployee._id.toString(),
      nom: updatedEmployee.nom,
      prenom: updatedEmployee.prenom,
      email: updatedEmployee.email,
      telephone: updatedEmployee.telephone,
      fonction: updatedEmployee.fonction,
      matricule: updatedEmployee.matricule,
      type: updatedEmployee.type,
      typeContrat: updatedEmployee.typeContrat,
      status: updatedEmployee.status,
      dateEmbauche: updatedEmployee.dateEmbauche,
      dateFinContrat: updatedEmployee.dateFinContrat,
      motifSuspension: updatedEmployee.motifSuspension,
      dateFinSuspension: updatedEmployee.dateFinSuspension,
      photo: updatedEmployee.photo,
      createdAt: updatedEmployee.createdAt,
      updatedAt: updatedEmployee.updatedAt,
    };
  };

  deleteEmployee = async (id: string): Promise<void> => {
    const employee = await Employee.findById(id);

    if (!employee) {
      throw new Error('Employé non trouvé');
    }

    await employee.deleteOne();

    // Also delete associated badges
    await Badge.deleteMany({ employee: id });
  };

  updateEmployeeStatus = async (id: string, dto: UpdateEmployeeStatusDto): Promise<EmployeeResponseDto> => {
    const employee = await Employee.findById(id);

    if (!employee) {
      throw new Error('Employé non trouvé');
    }

    employee.status = dto.status;

    // Si le statut est SUSPENDU, vérifier et enregistrer le motif et la date
    if (dto.status === 'SUSPENDU') {
      if (!dto.motifSuspension || !dto.dateFinSuspension) {
        throw new Error('Le motif et la date de fin de suspension sont obligatoires pour un statut SUSPENDU');
      }
      employee.motifSuspension = dto.motifSuspension;
      employee.dateFinSuspension = new Date(dto.dateFinSuspension);
    } else {
      // Si le statut n'est pas SUSPENDU, effacer les données de suspension
      employee.motifSuspension = undefined;
      employee.dateFinSuspension = undefined;
    }

    await employee.save();

    return {
      id: employee._id.toString(),
      nom: employee.nom,
      prenom: employee.prenom,
      email: employee.email,
      telephone: employee.telephone,
      fonction: employee.fonction,
      matricule: employee.matricule,
      type: employee.type,
      typeContrat: employee.typeContrat,
      status: employee.status,
      dateEmbauche: employee.dateEmbauche,
      dateFinContrat: employee.dateFinContrat,
      motifSuspension: employee.motifSuspension,
      dateFinSuspension: employee.dateFinSuspension,
      photo: employee.photo,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    };
  };

  transferToPrint = async (employeeId: string): Promise<any> => {
    console.log('📝 Service - transferToPrint appelé avec ID:', employeeId);
    console.log('📝 Service - Type de l\'ID:', typeof employeeId);

    const employee = await Employee.findById(employeeId);
    console.log('📝 Service - Employé trouvé:', employee ? 'OUI' : 'NON');

    if (!employee) {
      throw new Error('Employé non trouvé');
    }

    console.log('📝 Service - Statut de l\'employé:', employee.status);

    // Check if employee status is ACTIF
    if (employee.status !== 'ACTIF') {
      throw new Error('Seuls les employés actifs peuvent être transférés');
    }

    console.log('📝 Service - Recherche de badge existant...');
    // Check if badge already exists for this employee
    const existingBadge = await Badge.findOne({
      employee: employeeId,
      status: { $in: ['EN_ATTENTE', 'IMPRIME'] },
    });
    console.log('📝 Service - Badge existant:', existingBadge ? 'OUI' : 'NON');

    if (existingBadge) {
      throw new Error('Un badge existe déjà pour cet employé');
    }

    // Use employee's matricule as QR code
    const qrCode = employee.matricule;
    console.log('📝 Service - QR Code généré (matricule):', qrCode);

    // Create badge
    const badge = await Badge.create({
      employee: employeeId,
      status: 'EN_ATTENTE',
      qrCode: qrCode,
    });

    return {
      id: badge._id.toString(),
      employee: employeeId,
      type: (badge as any).type,
      status: badge.status,
      qrCode: badge.qrCode,
      createdAt: badge.createdAt,
      updatedAt: badge.updatedAt,
    };
  };

  getEmployeeStats = async (): Promise<EmployeeStatsDto> => {
    const [total, active, suspended, terminated, byType, recentEmployees] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ status: 'ACTIF' }),
      Employee.countDocuments({ status: 'SUSPENDU' }),
      Employee.countDocuments({ status: 'TERMINE' }),
      Employee.aggregate([
        {
          $group: {
            _id: '$type',
            count: { $sum: 1 },
          },
        },
      ]),
      Employee.find().sort('-createdAt').limit(5).select('nom prenom email telephone type status createdAt'),
    ]);

    return {
      total,
      active,
      suspended,
      terminated,
      byType,
      recent: recentEmployees.map((emp) => ({
        id: emp._id.toString(),
        nom: emp.nom,
        prenom: emp.prenom,
        email: emp.email,
        telephone: emp.telephone,
        fonction: emp.fonction,
        matricule: emp.matricule,
        type: emp.type,
        typeContrat: emp.typeContrat,
        status: emp.status,
        dateEmbauche: emp.dateEmbauche,
        dateFinContrat: emp.dateFinContrat,
        motifSuspension: emp.motifSuspension,
        dateFinSuspension: emp.dateFinSuspension,
        photo: emp.photo,
        createdAt: emp.createdAt,
        updatedAt: emp.updatedAt,
      })),
    };
  };
}

export default new EmployeeService();