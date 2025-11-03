"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Edit, Trash2, User, Phone, Briefcase, Calendar, Shield, QrCode, FileText, AlertTriangle, Camera, Mail } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/src/hooks/use-toast";
import { employeeService } from "@/src/services/employee.service";
import { getImageUrl } from "@/src/constants";
import type { Employee } from "@/src/types";
import { logger } from "@/src/utils/logger";

export default function EmployeeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (params.id && typeof params.id === 'string') {
      fetchEmployee();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "ID de l'employé invalide",
      });
      router.push("/dashboard/rh/employees");
    }
  }, [params.id]);

  const fetchEmployee = async () => {
    if (!params.id || typeof params.id !== 'string') {
      return;
    }

    try {
      setIsLoading(true);
      const response = await employeeService.getById(params.id);
      const employeeData = response.data;
      if (employeeData) {
        setEmployee(employeeData);
      } else {
        throw new Error("Aucune donnée d'employé trouvée");
      }
    } catch (error) {
      logger.error('Erreur chargement employé:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: (error as Error).message || "Impossible de charger l'employé",
      });
      router.push("/dashboard/rh/employees");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!employee) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Aucun employé sélectionné",
      });
      return;
    }

    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${employee.prenom} ${employee.nom} ?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      await employeeService.delete(params.id as string);

      toast({
        title: "✅ Employé supprimé",
        description: `${employee.prenom} ${employee.nom} a été supprimé avec succès`,
      });

      router.push("/dashboard/rh/employees");
    } catch (error) {
      logger.error('Erreur suppression:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: (error as Error).message || "Impossible de supprimer l'employé",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff8d13] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIF':
        return 'bg-green-100 text-green-800';
      case 'SUSPENDU':
        return 'bg-yellow-100 text-yellow-800';
      case 'TERMINE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'PERSONNEL_DSD': 'Personnel DSD Guinée',
      'DNTT': 'DNTT',
      'STAGIAIRE_DSD': 'Stagiaire DSD Guinée',
      'BANQUE': 'Banque',
      'EMBOUTISSEUR': 'Emboutisseur',
      'DNTT_STAGIAIRE': 'DNTT Stagiaire',
      'DEMARCHEUR': 'Collectif des Démarcheurs',
    };
    return types[type] || type;
  };

  const isContractExpired = (dateFinContrat: string) => {
    return new Date() > new Date(dateFinContrat);
  };

  const getDaysUntilAutoTermination = (dateFinContrat: string) => {
    const today = new Date();
    const contractEnd = new Date(dateFinContrat);
    const diffTime = today.getTime() - contractEnd.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const daysRemaining = 30 - diffDays;
    return { diffDays, daysRemaining };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b border-[#fff5ed] bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/rh/employees">
                <Button variant="ghost" size="icon" className="hover:bg-violet-100" aria-label="Retour à la liste des employés">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/30">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
                  Détails de l'Employé
                </h1>
                <p className="text-sm text-gray-600">Informations complètes de l'employé</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href={`/dashboard/rh/employees/${params.id}/edit`}>
                <Button className="bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#e67d0f] shadow-lg shadow-[#ff8d13]/30 gap-2">
                  <Edit className="w-4 h-4" />
                  Modifier
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#ff8d13]" />
                  Informations Personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Prénom</p>
                    <p className="text-lg font-bold text-gray-900">{employee.prenom}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Nom</p>
                    <p className="text-lg font-bold text-gray-900">{employee.nom}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#ff8d13]" />
                      <p className="text-sm font-semibold text-gray-500">Téléphone</p>
                    </div>
                    <p className="text-gray-900">{employee.telephone}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-[#ff8d13]" />
                      <p className="text-sm font-semibold text-gray-500">Email</p>
                    </div>
                    <p className="text-gray-900 break-all">{employee.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employment Information */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#ff8d13]" />
                  Informations d'Emploi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Fonction</p>
                    <p className="text-lg font-bold text-gray-900">{employee.fonction}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Matricule</p>
                    <p className="text-lg font-bold text-[#ff8d13]">{employee.matricule}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Profil</p>
                    <p className="text-lg font-bold text-gray-900">{employee.profil || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Diplôme</p>
                    <p className="text-lg font-bold text-gray-900">{employee.diplome || 'Non renseigné'}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 mb-2">Type d'Employé</p>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                    {getTypeLabel(employee.type)}
                  </Badge>
                </div>

                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#ff8d13]" />
                      <p className="text-sm font-semibold text-gray-500">Date d'Embauche</p>
                    </div>
                    <p className="text-gray-900">
                      {new Date(employee.dateEmbauche).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#ff8d13]" />
                      <p className="text-sm font-semibold text-gray-500">Date de Fin de Contrat</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-900">
                        {employee.dateFinContrat && !isNaN(new Date(employee.dateFinContrat).getTime())
                          ? new Date(employee.dateFinContrat).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })
                          : 'N/A'}
                      </p>
                      {employee.dateFinContrat && !isNaN(new Date(employee.dateFinContrat).getTime()) && isContractExpired(employee.dateFinContrat) && employee.status !== 'TERMINE' && (() => {
                        const { diffDays, daysRemaining } = getDaysUntilAutoTermination(employee.dateFinContrat);
                        return (
                          <div className="space-y-1">
                            <Badge className="bg-red-600 text-white font-semibold gap-1 flex items-center w-fit">
                              <AlertTriangle className="w-3 h-3" />
                              Expiré depuis {diffDays} jour{diffDays > 1 ? 's' : ''}
                            </Badge>
                            {daysRemaining > 0 ? (
                              <p className="text-xs text-[#ff8d13] font-semibold">
                                ⏱️ Passage automatique à "TERMINE" dans {daysRemaining} jour{daysRemaining > 1 ? 's' : ''}
                              </p>
                            ) : (
                              <p className="text-xs text-red-600 font-semibold">
                                ⚠️ Sera automatiquement terminé à la prochaine vérification
                              </p>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Status & Meta */}
          <div className="space-y-6">
            {/* Photo Card */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#ff8d13]" />
                  Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex justify-center">
                <Avatar className="w-48 h-48 ring-4 ring-orange-200">
                  {employee.photo && getImageUrl(employee.photo) ? (
                    <AvatarImage
                      src={getImageUrl(employee.photo) || ''}
                      alt={`${employee.prenom} ${employee.nom}`}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-5xl">
                    {employee.prenom[0]}{employee.nom[0]}
                  </AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#ff8d13]" />
                  Statut
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Badge className={`${getStatusColor(employee.status)} text-lg px-4 py-2`}>
                  {employee.status}
                </Badge>

                {/* Informations de suspension si statut = SUSPENDU */}
                {employee.status === 'SUSPENDU' && (
                  <div className="mt-4 pt-4 border-t border-[#fed7aa] space-y-3">
                    {employee.motifSuspension && (
                      <div className="p-3 bg-[#fff5ed] rounded-lg border border-[#fed7aa]">
                        <p className="text-xs font-semibold text-orange-700 mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Motif de suspension
                        </p>
                        <p className="text-sm text-gray-800 font-medium">{employee.motifSuspension}</p>
                      </div>
                    )}
                    {employee.dateFinSuspension && (
                      <div className="p-3 bg-[#fff5ed] rounded-lg border border-[#fed7aa]">
                        <p className="text-xs font-semibold text-orange-700 mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Date de fin de suspension
                        </p>
                        <p className="text-sm text-gray-800 font-medium">
                          {new Date(employee.dateFinSuspension).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        {new Date(employee.dateFinSuspension) < new Date() && (
                          <p className="text-xs text-green-600 mt-1 font-semibold">
                            ✓ Suspension expirée - Sera réactivé automatiquement
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Badge Info */}
            {employee.hasBadge && (
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#ff8d13]" />
                    Badge
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-sm font-semibold text-gray-700">
                      Badge {employee.badgeStatus === 'EN_ATTENTE' ? 'En Attente' : 'Imprimé'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#ff8d13]" />
                  Métadonnées
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Créé le</p>
                  <p className="text-sm text-gray-700">
                    {employee.createdAt ? new Date(employee.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'N/A'}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Dernière modification</p>
                  <p className="text-sm text-gray-700">
                    {employee.updatedAt ? new Date(employee.updatedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'N/A'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
