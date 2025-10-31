import { Badge } from '../models';
import {
  BadgeQueryDto,
  UpdateBadgeStatusDto,
  BadgeResponseDto,
  PaginatedBadgeResponseDto,
  QRCodeResponseDto,
  VerifyQRCodeResponseDto,
  BadgeStatsDto,
} from '../dtos';

class BadgeService {
  // Helper pour valider une date
  private isValidDate(dateString: string): boolean {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  getAllBadges = async (query: BadgeQueryDto): Promise<PaginatedBadgeResponseDto> => {
    const page = Math.max(1, Number(query.page) || 1); // Minimum 1
    const requestedLimit = Number(query.limit) || 10;
    const limit = Math.min(100, Math.max(1, requestedLimit)); // Entre 1 et 100
    const skip = (page - 1) * limit;

    // Si on a besoin de filtrer par données d'employé (search, type)
    // on utilise une aggregation pour joindre avec la collection Employee
    if (query.search || query.type) {
      const pipeline: any[] = [];

      // Lookup pour joindre avec Employee
      pipeline.push({
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employeeData',
        },
      });

      // Unwind pour décompresser le tableau employeeData
      pipeline.push({
        $unwind: '$employeeData',
      });

      // Filtres sur les champs de badge
      const matchStage: any = {};

      if (query.status) {
        matchStage.status = query.status;
      }

      if (query.type) {
        matchStage['employeeData.type'] = query.type;
      }

      // Filtre de recherche sur nom/prenom/telephone/matricule
      if (query.search) {
        matchStage.$or = [
          { 'employeeData.nom': { $regex: query.search, $options: 'i' } },
          { 'employeeData.prenom': { $regex: query.search, $options: 'i' } },
          { 'employeeData.telephone': { $regex: query.search, $options: 'i' } },
          { 'employeeData.matricule': { $regex: query.search, $options: 'i' } },
        ];
      }

      // Filtres de date pour requestDate (date demande)
      if (query.dateDemandeDe || query.dateDemandeA) {
        matchStage.requestDate = {};
        if (query.dateDemandeDe && this.isValidDate(query.dateDemandeDe)) {
          matchStage.requestDate.$gte = new Date(query.dateDemandeDe);
        }
        if (query.dateDemandeA && this.isValidDate(query.dateDemandeA)) {
          matchStage.requestDate.$lte = new Date(query.dateDemandeA);
        }
      }

      // Filtres de date pour printDate (date impression)
      if (query.dateImpressionDe || query.dateImpressionA) {
        matchStage.printDate = {};
        if (query.dateImpressionDe && this.isValidDate(query.dateImpressionDe)) {
          matchStage.printDate.$gte = new Date(query.dateImpressionDe);
        }
        if (query.dateImpressionA && this.isValidDate(query.dateImpressionA)) {
          matchStage.printDate.$lte = new Date(query.dateImpressionA);
        }
      }

      if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
      }

      // Tri
      pipeline.push({ $sort: { createdAt: -1 } });

      // Count pour pagination
      const countPipeline = [...pipeline, { $count: 'total' }];
      const countResult = await Badge.aggregate(countPipeline);
      const total = countResult.length > 0 ? countResult[0].total : 0;

      // Pagination
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: limit });

      // Project pour formater la réponse
      pipeline.push({
        $project: {
          _id: 1,
          status: 1,
          qrCode: 1,
          requestDate: 1,
          printDate: 1,
          printCount: 1,
          reprintHistory: 1,
          createdAt: 1,
          updatedAt: 1,
          employee: {
            _id: '$employeeData._id',
            nom: '$employeeData.nom',
            prenom: '$employeeData.prenom',
            telephone: '$employeeData.telephone',
            fonction: '$employeeData.fonction',
            matricule: '$employeeData.matricule',
            type: '$employeeData.type',
            dateEmbauche: '$employeeData.dateEmbauche',
            dateFinContrat: '$employeeData.dateFinContrat',
            photo: '$employeeData.photo',
          },
        },
      });

      const badges = await Badge.aggregate(pipeline);

      return {
        data: badges.map((badge) => ({
          id: badge._id.toString(),
          employee: badge.employee,
          status: badge.status,
          qrCode: badge.qrCode,
          requestDate: badge.requestDate,
          printDate: badge.printDate,
          printCount: badge.printCount,
          reprintHistory: badge.reprintHistory,
          createdAt: badge.createdAt,
          updatedAt: badge.updatedAt,
        })) as any,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    }

    // Sinon, utiliser la méthode classique (plus performante)
    const filters: any = {};

    if (query.status) {
      filters.status = query.status;
    }

    // Filtres de date pour requestDate (date demande)
    if (query.dateDemandeDe || query.dateDemandeA) {
      filters.requestDate = {};
      if (query.dateDemandeDe && this.isValidDate(query.dateDemandeDe)) {
        filters.requestDate.$gte = new Date(query.dateDemandeDe);
      }
      if (query.dateDemandeA && this.isValidDate(query.dateDemandeA)) {
        filters.requestDate.$lte = new Date(query.dateDemandeA);
      }
    }

    // Filtres de date pour printDate (date impression)
    if (query.dateImpressionDe || query.dateImpressionA) {
      filters.printDate = {};
      if (query.dateImpressionDe && this.isValidDate(query.dateImpressionDe)) {
        filters.printDate.$gte = new Date(query.dateImpressionDe);
      }
      if (query.dateImpressionA && this.isValidDate(query.dateImpressionA)) {
        filters.printDate.$lte = new Date(query.dateImpressionA);
      }
    }

    // Execute query
    const [badges, total] = await Promise.all([
      Badge.find(filters)
        .populate('employee', 'nom prenom email telephone fonction matricule type dateEmbauche dateFinContrat photo')
        .populate('reprintHistory.authorizedBy', 'nom prenom email')
        .sort('-createdAt')
        .skip(skip)
        .limit(limit),
      Badge.countDocuments(filters),
    ]);

    return {
      data: badges.map((badge) => ({
        id: badge._id.toString(),
        employee: badge.employee,
        status: badge.status,
        qrCode: badge.qrCode,
        requestDate: badge.requestDate,
        printDate: badge.printDate,
        printCount: badge.printCount,
        reprintHistory: badge.reprintHistory,
        createdAt: badge.createdAt,
        updatedAt: badge.updatedAt,
      })) as any,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  };

  getBadgeById = async (id: string): Promise<BadgeResponseDto> => {
    const badge = await Badge.findById(id)
      .populate('employee', 'nom prenom email telephone fonction matricule type dateEmbauche dateFinContrat photo')
      .populate('reprintHistory.authorizedBy', 'nom prenom email');

    if (!badge) {
      throw new Error('Badge non trouvé');
    }

    console.log('🔍 Badge trouvé:', {
      id: badge._id,
      employee: badge.employee,
      employeeType: typeof badge.employee,
      isPopulated: badge.populated('employee'),
    });

    const result = {
      id: badge._id.toString(),
      employee: badge.employee,
      status: badge.status,
      qrCode: badge.qrCode,
      printDate: badge.printDate,
      requestDate: badge.requestDate,
      printCount: badge.printCount,
      reprintHistory: badge.reprintHistory,
      createdAt: badge.createdAt,
      updatedAt: badge.updatedAt,
    };

    console.log('📤 Réponse envoyée:', result);

    return result as any;
  };

  printBadge = async (badgeId: string, _printedBy: string): Promise<BadgeResponseDto> => {
    const badge = await Badge.findById(badgeId)
      .populate('employee')
      .populate('reprintHistory.authorizedBy', 'nom prenom email');

    if (!badge) {
      throw new Error('Badge non trouvé');
    }

    // Utiliser la méthode markAsPrinted du modèle
    await badge.markAsPrinted();

    console.log(`📄 Badge ${badge.printCount > 1 ? 'réimprimé' : 'imprimé'} pour ${(badge.employee as any)?.matricule} (impression #${badge.printCount})`);

    return {
      id: badge._id.toString(),
      employee: badge.employee,
      type: (badge as any).type,
      status: badge.status,
      qrCode: badge.qrCode,
      printDate: badge.printDate,
      printCount: badge.printCount,
      reprintHistory: badge.reprintHistory,
      createdAt: badge.createdAt,
      updatedAt: badge.updatedAt,
    } as any;
  };

  getQRCode = async (badgeId: string): Promise<QRCodeResponseDto> => {
    const badge = await Badge.findById(badgeId);

    if (!badge) {
      throw new Error('Badge non trouvé');
    }

    // Generate QR code image
    const qrCodeImage = await (badge as any).generateQRCodeImage();

    return {
      qrCode: badge.qrCode,
      image: qrCodeImage,
    };
  };

  verifyQRCode = async (qrCode: string): Promise<VerifyQRCodeResponseDto> => {
    // QR code now contains the matricule, so search by matricule
    return this.verifyByMatricule(qrCode);
  };

  verifyByMatricule = async (matricule: string): Promise<VerifyQRCodeResponseDto> => {
    // Import Employee model dynamically to avoid circular dependency
    const Employee = (await import('../models')).Employee;

    console.log('🔍 Vérification du matricule:', matricule);

    // Find employee by matricule
    const employee = await Employee.findOne({ matricule });

    if (!employee) {
      return {};
    }

    // Return only matricule
    return {
      employee: {
        matricule: employee.matricule,
      },
    };
  };


  deleteBadge = async (id: string): Promise<void> => {
    const badge = await Badge.findById(id);

    if (!badge) {
      throw new Error('Badge non trouvé');
    }

    await badge.deleteOne();
  };

  updateBadgeStatus = async (id: string, dto: UpdateBadgeStatusDto): Promise<BadgeResponseDto> => {
    const badge = await Badge.findById(id)
      .populate('reprintHistory.authorizedBy', 'nom prenom email');

    if (!badge) {
      throw new Error('Badge non trouvé');
    }

    badge.status = dto.status;
    await badge.save();

    return {
      id: badge._id.toString(),
      employee: badge.employee,
      type: (badge as any).type,
      status: badge.status,
      qrCode: badge.qrCode,
      printDate: badge.printDate,
      printCount: badge.printCount,
      reprintHistory: badge.reprintHistory,
      createdAt: badge.createdAt,
      updatedAt: badge.updatedAt,
    } as any;
  };

  authorizeReprint = async (badgeId: string, userId: string): Promise<BadgeResponseDto> => {
    const badge = await Badge.findById(badgeId)
      .populate('employee', 'nom prenom email telephone fonction matricule type dateEmbauche dateFinContrat photo')
      .populate('reprintHistory.authorizedBy', 'nom prenom email');

    if (!badge) {
      throw new Error('Badge non trouvé');
    }

    // Utiliser la méthode authorizeReprint du modèle
    await badge.authorizeReprint(userId);

    console.log(`✅ Réimpression autorisée pour le badge ${badge._id} par l'utilisateur ${userId}`);

    return {
      id: badge._id.toString(),
      employee: badge.employee,
      type: (badge as any).type,
      status: badge.status,
      qrCode: badge.qrCode,
      printDate: badge.printDate,
      printCount: badge.printCount,
      reprintHistory: badge.reprintHistory,
      createdAt: badge.createdAt,
      updatedAt: badge.updatedAt,
    } as any;
  };

  getBadgeStats = async (): Promise<BadgeStatsDto> => {
    // Calculer les dates pour aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [total, pending, printed, cancelled, printedToday, byType, recentPrinted] = await Promise.all([
      Badge.countDocuments(),
      Badge.countDocuments({ status: 'EN_ATTENTE' }),
      Badge.countDocuments({ status: 'IMPRIME' }),
      Badge.countDocuments({ status: 'ANNULE' }),
      Badge.countDocuments({
        status: 'IMPRIME',
        printDate: { $gte: today, $lt: tomorrow }
      }),
      Badge.aggregate([
        {
          $group: {
            _id: '$type',
            count: { $sum: 1 },
          },
        },
      ]),
      Badge.find({ status: 'IMPRIME' })
        .populate('employee', 'nom prenom email type')
        .populate('reprintHistory.authorizedBy', 'nom prenom email')
        .sort('-printDate')
        .limit(5),
    ]);

    return {
      total,
      pending,
      printed,
      cancelled,
      printedToday,
      byType,
      recentPrinted: recentPrinted.map((badge) => ({
        id: badge._id.toString(),
        employee: badge.employee,
        type: (badge as any).type,
        status: badge.status,
        qrCode: badge.qrCode,
        printDate: badge.printDate,
        printCount: badge.printCount,
        reprintHistory: badge.reprintHistory,
        createdAt: badge.createdAt,
        updatedAt: badge.updatedAt,
      })) as any,
    };
  };
}

export default new BadgeService();