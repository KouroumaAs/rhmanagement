"use client";

import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/src/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, UserPlus, Building2, Send, Edit, Trash2, Eye, AlertTriangle, CheckSquare, Square, X, MoreVertical, CheckCircle, Ban, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useToast } from "@/src/hooks/use-toast";
import { employeeService } from "@/src/services/employee.service";
import { badgesService } from "@/src/services/badges.service";
import type { Employee, BadgeStatus } from "@/src/types";
import type { EmployeeQueryParams } from "@/src/types/employee";
import { logger } from "@/src/utils/logger";
import { useAuth } from "@/src/contexts/AuthContext";

export default function EmployeesPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("TOUS");
  const [filterStatus, setFilterStatus] = useState("TOUS");
  const [filterProfil, setFilterProfil] = useState("");
  const [filterDiplome, setFilterDiplome] = useState("");
  const [dateFinContratDe, setDateFinContratDe] = useState("");
  const [dateFinContratA, setDateFinContratA] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isSuspensionDialogOpen, setIsSuspensionDialogOpen] = useState(false);
  const [suspensionData, setSuspensionData] = useState({
    employeeId: "",
    motif: "",
    dateFinSuspension: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEmployees();
  }, [filterType, filterStatus, searchQuery, currentPage, limit, dateFinContratDe, dateFinContratA, filterProfil, filterDiplome]);
  console.log("Les employees:", employees);
  // Réinitialiser la sélection quand on change de page ou de filtre
  useEffect(() => {
    setSelectedEmployees([]);
  }, [currentPage, limit, filterType, filterStatus, searchQuery, dateFinContratDe, dateFinContratA, filterProfil, filterDiplome]);

  // Mémoriser la date actuelle pour éviter de la recalculer à chaque render
  const today = useMemo(() => new Date(), []);

  // Helper pour formater les dates (évite de recréer la fonction à chaque render)
  const formatDate = useMemo(() => {
    return (dateString: string) => {
      if (!dateString) return 'N/A';
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'N/A';
        return date.toLocaleDateString('fr-FR');
      } catch {
        return 'N/A';
      }
    };
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const query: EmployeeQueryParams = {
        page: currentPage.toString(),
        limit: limit.toString(),
      };
      if (filterType !== "TOUS") query.type = filterType;
      if (filterStatus !== "TOUS") query.status = filterStatus;
      if (searchQuery) query.search = searchQuery;
      if (dateFinContratDe) query.dateFinContratDe = dateFinContratDe;
      if (dateFinContratA) query.dateFinContratA = dateFinContratA;
      if (filterProfil) query.profil = filterProfil;
      if (filterDiplome) query.diplome = filterDiplome;

      const response = await employeeService.getAll(query);
      logger.log('📥 Response complète:', response);

      // La réponse API: { success: true, data: [...], pagination: {...} }
      const employeesData = response.data || [];
      logger.log('👥 Employees:', employeesData);

      setEmployees(employeesData);
      setTotalPages(response.pagination?.pages || 1);
      setTotalEmployees(response.pagination?.total || 0);
    } catch (error) {
      // Les logs détaillés sont déjà affichés automatiquement par le service API
      const errorMessage = (error as any).getUserMessage?.() || (error as Error).message || "Impossible de charger les employés";

      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferToPrint = async (employeeId: string) => {
    if (!employeeId || employeeId === 'undefined') {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "ID de l'employé invalide",
      });
      return;
    }

    const employee = employees.find(e => e.id === employeeId);

    try {
      await employeeService.transferToPrint(employeeId);

      // Update local state immediately
      const updatedEmployees = employees.map(e =>
        e.id === employeeId
          ? { ...e, hasBadge: true, badgeStatus: 'EN_ATTENTE' as BadgeStatus }
          : e
      );
      setEmployees(updatedEmployees);

      toast({
        title: "✅ Transfert réussi",
        description: `${employee?.prenom} ${employee?.nom} a été transféré au service d'impression`,
      });
    } catch (error) {
      const errorMessage = (error as any).getUserMessage?.() || (error as Error).message || "Impossible de transférer l'employé";

      toast({
        variant: "destructive",
        title: "Erreur de transfert",
        description: errorMessage,
      });
    }
  };

  const handleAuthorizeReprint = async (employee: Employee) => {
    if (!employee.badgeId) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Badge introuvable pour cet employé",
      });
      return;
    }

    try {
      await badgesService.authorizeReprint(employee.badgeId);

      // Update local state immediately
      const updatedEmployees = employees.map(e =>
        e.id === employee.id
          ? { ...e, badgeStatus: 'REIMPRESSION' as BadgeStatus }
          : e
      );
      setEmployees(updatedEmployees);

      toast({
        title: "✅ Réimpression autorisée",
        description: `Le badge de ${employee.prenom} ${employee.nom} a été renvoyé pour réimpression`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: (error as Error).message || "Impossible d'autoriser la réimpression",
      });
    }
  };

  const handleDelete = async (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);

    const confirmed = confirm(
      `⚠️ ATTENTION ⚠️\n\n` +
      `Vous êtes sur le point de supprimer définitivement l'employé :\n\n` +
      `👤 ${employee?.prenom} ${employee?.nom}\n` +
      `📋 Matricule: ${employee?.matricule}\n` +
      `💼 Fonction: ${employee?.fonction}\n\n` +
      `Cette action est IRRÉVERSIBLE et supprimera :\n` +
      `✗ Toutes les informations de l'employé\n` +
      `✗ Le badge associé s'il existe\n` +
      `✗ L'historique complet\n` +
      `✗ Impossibilité de récupération\n\n` +
      `Êtes-vous absolument sûr de vouloir continuer ?`
    );

    if (!confirmed) return;

    try {
      await employeeService.delete(employeeId);

      // Update local state immediately - remove from employees array
      const updatedEmployees = employees.filter(e => e.id !== employeeId);
      setEmployees(updatedEmployees);

      // Update total count
      setTotalEmployees(prev => prev - 1);

      // Adjust page if current page becomes empty
      const newTotalPages = Math.ceil((totalEmployees - 1) / limit);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (updatedEmployees.length === 0 && currentPage > 1) {
        // If current page is now empty, go to previous page
        setCurrentPage(prev => prev - 1);
      }

      toast({
        title: "🗑️ Employé supprimé",
        description: `${employee?.prenom} ${employee?.nom} a été supprimé définitivement du système`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Erreur de suppression",
        description: (error as Error).message || "Impossible de supprimer l'employé",
      });
    }
  };

  const handleUpdateStatus = async (employeeId: string, newStatus: 'ACTIF' | 'SUSPENDU' | 'TERMINE' | 'BLOQUE') => {
    const employee = employees.find(e => e.id === employeeId);

    if (!employee) return;

    // Si le statut est SUSPENDU, ouvrir le dialogue pour demander le motif et la date
    if (newStatus === 'SUSPENDU') {
      setSuspensionData({
        employeeId,
        motif: "",
        dateFinSuspension: ""
      });
      setIsSuspensionDialogOpen(true);
      return;
    }

    const statusLabels = {
      ACTIF: "Actif",
      SUSPENDU: "Suspendu",
      TERMINE: "Terminé",
      BLOQUE: "Bloqué"
    };

    const confirmed = confirm(
      `Voulez-vous changer le statut de ${employee.prenom} ${employee.nom} en "${statusLabels[newStatus]}" ?`
    );

    if (!confirmed) return;

    try {
      await employeeService.updateStatus(employeeId, newStatus);

      // Update local state
      const updatedEmployees = employees.map(e =>
        e.id === employeeId ? { ...e, status: newStatus, motifSuspension: null, dateFinSuspension: null } : e
      );
      setEmployees(updatedEmployees);

      toast({
        title: "✅ Statut modifié",
        description: `Le statut de ${employee.prenom} ${employee.nom} a été changé en "${statusLabels[newStatus]}"`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: (error as Error).message || "Impossible de modifier le statut",
      });
    }
  };

  const handleConfirmSuspension = async () => {
    const employee = employees.find(e => e.id === suspensionData.employeeId);

    if (!employee) return;

    // Validation
    if (!suspensionData.motif.trim()) {
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: "Le motif de suspension est obligatoire",
      });
      return;
    }

    if (!suspensionData.dateFinSuspension) {
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: "La date de fin de suspension est obligatoire",
      });
      return;
    }

    // Vérifier que la date de fin est dans le futur
    const dateFinSuspension = new Date(suspensionData.dateFinSuspension);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dateFinSuspension.setHours(0, 0, 0, 0);

    if (dateFinSuspension <= today) {
      toast({
        variant: "destructive",
        title: "⚠️ Date invalide",
        description: "Vous ne pouvez pas saisir une date antérieure ou égale à aujourd'hui. La date de fin de suspension doit être dans le futur.",
        duration: 5000,
      });
      return;
    }

    try {
      await employeeService.updateStatus(suspensionData.employeeId, 'SUSPENDU', {
        motifSuspension: suspensionData.motif,
        dateFinSuspension: suspensionData.dateFinSuspension
      });

      // Update local state
      const updatedEmployees = employees.map(e =>
        e.id === suspensionData.employeeId
          ? {
              ...e,
              status: 'SUSPENDU',
              motifSuspension: suspensionData.motif,
              dateFinSuspension: suspensionData.dateFinSuspension
            }
          : e
      );
      setEmployees(updatedEmployees as any);

      toast({
        title: "✅ Employé suspendu",
        description: `${employee.prenom} ${employee.nom} a été suspendu jusqu'au ${new Date(suspensionData.dateFinSuspension).toLocaleDateString('fr-FR')}`,
      });

      // Fermer le dialogue et réinitialiser
      setIsSuspensionDialogOpen(false);
      setSuspensionData({ employeeId: "", motif: "", dateFinSuspension: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: (error as Error).message || "Impossible de suspendre l'employé",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      ACTIF: { label: "Actif", className: "bg-green-500 text-white font-semibold" },
      SUSPENDU: { label: "Suspendu", className: "bg-orange-500 text-white font-semibold" },
      TERMINE: { label: "Terminé", className: "bg-gray-500 text-white font-semibold" },
      BLOQUE: { label: "Bloqué", className: "bg-red-600 text-white font-semibold" },
    };
    const variant = variants[status] || variants.TERMINE;
    return (
      <Badge className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string, sousType?: string) => {
    const typeLabels: Record<string, string> = {
      PERSONNELS_DSD: "Personnels DSD",
      DNTT: "DNTT",
      STAGIAIRES_DSD: "Stagiaires DSD",
      BANQUES: "Banque",
      MAISONS_PLAQUE: "Emboutisseur",
      DNTT_STAGIAIRES: "DNTT Stagiaires",
      DEMARCHEURS: "Démarcheurs",
      ASSURANCE: "Assurance",
      ASSURANCES: "Assurance",
    };

    const colors: Record<string, string> = {
      PERSONNELS_DSD: "bg-[#ff8d13]",
      DNTT: "bg-blue-600",
      STAGIAIRES_DSD: "bg-green-600",
      BANQUES: "bg-purple-600",
      MAISONS_PLAQUE: "bg-pink-600",
      DNTT_STAGIAIRES: "bg-teal-600",
      DEMARCHEURS: "bg-amber-600",
      ASSURANCE: "bg-cyan-600",
      ASSURANCES: "bg-cyan-600",
    };

    const label = typeLabels[type] || type;
    const displayLabel = sousType ? `${label} ${sousType}` : label;

    return (
      <Badge className={`${colors[type] || "bg-gray-600"} text-white font-semibold`}>
        {displayLabel}
      </Badge>
    );
  };

  const isContractExpired = useMemo(() => {
    return (dateFinContrat: string) => {
      if (!dateFinContrat) return false;
      const date = new Date(dateFinContrat);
      if (isNaN(date.getTime())) return false;
      return today > date;
    };
  }, [today]);

  const getDaysUntilAutoTermination = useMemo(() => {
    return (dateFinContrat: string) => {
      if (!dateFinContrat) return { diffDays: 0, daysRemaining: 0 };
      const contractEnd = new Date(dateFinContrat);
      if (isNaN(contractEnd.getTime())) return { diffDays: 0, daysRemaining: 0 };
      const diffTime = today.getTime() - contractEnd.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const daysRemaining = 30 - diffDays;
      return { diffDays, daysRemaining };
    };
  }, [today]);

  // Gestion de la sélection en lot
  const isEmployeeEligible = (employee: Employee) => {
    return employee.status === "ACTIF" && !employee.hasBadge;
  };

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    const eligibleEmployees = employees.filter(isEmployeeEligible);
    const eligibleIds = eligibleEmployees.map((e) => e.id);

    if (selectedEmployees.length === eligibleIds.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(eligibleIds);
    }
  };

  const handleBulkTransfer = async () => {
    if (selectedEmployees.length === 0) return;

    const confirmed = confirm(
      `Vous allez transférer ${selectedEmployees.length} employé(s) au service d'impression.\n\nContinuer ?`
    );

    if (!confirmed) return;

    try {
      // Transférer tous les employés sélectionnés en parallèle
      const results = await Promise.allSettled(
        selectedEmployees.map((id) => employeeService.transferToPrint(id))
      );

      // Compter les succès et échecs
      const succeeded = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      // Mettre à jour l'état local pour tous les employés transférés avec succès
      const updatedEmployees = employees.map((e) => {
        const resultIndex = selectedEmployees.indexOf(e.id);
        if (resultIndex !== -1 && results[resultIndex].status === "fulfilled") {
          return { ...e, hasBadge: true, badgeStatus: "EN_ATTENTE" };
        }
        return e;
      });
      setEmployees(updatedEmployees as any);

      // Réinitialiser la sélection
      setSelectedEmployees([]);

      // Afficher le résultat
      if (failed === 0) {
        toast({
          title: "✅ Transfert réussi",
          description: `${succeeded} employé(s) ont été transférés au service d'impression`,
        });
      } else {
        toast({
          title: "⚠️ Transfert partiel",
          description: `${succeeded} réussi(s), ${failed} échoué(s)`,
          variant: succeeded > 0 ? "default" : "destructive",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: "Une erreur s'est produite lors du transfert",
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b border-orange-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/rh">
                <Button variant="outline" className="border-[#fed7aa] hover:bg-[#fff5ed] gap-2">
                  <Building2 className="w-5 h-5" />
                  Retour au Dashboard
                </Button>
              </Link>
              <div className="h-8 w-px bg-orange-200"></div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">Gestion des Employés</h1>
                <p className="text-sm text-gray-600 font-medium">
                  {employees.length} employé(s) trouvé(s)
                </p>
              </div>
            </div>
            <Link href="/dashboard/rh/employees/new">
              <Button size="lg" className="shadow-lg shadow-[#ff8d13]/20 gap-2 bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13]">
                <UserPlus className="w-5 h-5" />
                Nouvel Employé
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-6">
        {/* Filters */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Ligne 1: Recherche, Type, Statut */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative group">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                    <Input
                      placeholder="Rechercher par nom, matricule..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="border-[#fed7aa]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="TOUS">Tous les types</SelectItem>
                      <SelectItem value="PERSONNEL_DSD">Personnel DSD</SelectItem>
                      <SelectItem value="DNTT">DNTT</SelectItem>
                      <SelectItem value="STAGIAIRE_DSD">Stagiaire DSD</SelectItem>
                      <SelectItem value="BANQUE">Banque</SelectItem>
                      <SelectItem value="EMBOUTISSEUR">Emboutisseur</SelectItem>
                      <SelectItem value="DNTT_STAGIAIRE">DNTT Stagiaire</SelectItem>
                      <SelectItem value="DEMARCHEUR">Démarcheur</SelectItem>
                      <SelectItem value="ASSURANCE">Assurance</SelectItem>
                    </SelectContent>                  </Select>
                </div>
                <div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="border-[#fed7aa]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="TOUS">Tous les statuts</SelectItem>
                      <SelectItem value="ACTIF">Actifs</SelectItem>
                      <SelectItem value="SUSPENDU">Suspendus</SelectItem>
                      <SelectItem value="TERMINE">Terminés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Ligne 2: Filtres de date de fin de contrat */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Fin de contrat - Du</label>
                  <Input
                    type="date"
                    value={dateFinContratDe}
                    onChange={(e) => setDateFinContratDe(e.target.value)}
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Fin de contrat - Au</label>
                  <Input
                    type="date"
                    value={dateFinContratA}
                    onChange={(e) => setDateFinContratA(e.target.value)}
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                  />
                </div>
              </div>

              {/* Ligne 3: Filtres par profil et diplôme */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Profil</label>
                  <Input
                    type="text"
                    placeholder="Filtrer par profil..."
                    value={filterProfil}
                    onChange={(e) => setFilterProfil(e.target.value)}
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Diplôme</label>
                  <Input
                    type="text"
                    placeholder="Filtrer par diplôme..."
                    value={filterDiplome}
                    onChange={(e) => setFilterDiplome(e.target.value)}
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                  />
                </div>
              </div>

              {/* Bouton pour réinitialiser les filtres */}
              {(dateFinContratDe || dateFinContratA || filterProfil || filterDiplome) && (
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDateFinContratDe("");
                      setDateFinContratA("");
                      setFilterProfil("");
                      setFilterDiplome("");
                    }}
                    className="border-[#fed7aa] hover:bg-[#fff5ed]"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Employees Table */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-50/50 to-amber-50/50 border-b border-orange-100">
            <CardTitle className="text-2xl font-bold text-gray-900">Liste des Employés</CardTitle>
            <CardDescription className="text-gray-600">Gérer et transférer les employés pour impression de badge</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-orange-100 hover:bg-[#fff5ed]/50">
                    <TableHead className="w-12">
                      <button
                        type="button"
                        onClick={() => handleSelectAll}
                        className="flex items-center justify-center w-full h-full p-2 hover:bg-orange-100 rounded transition-colors"
                        title={selectedEmployees.length > 0 ? "Désélectionner tout" : "Sélectionner tout"}
                      >
                        {selectedEmployees.length > 0 ? (
                          <CheckSquare className="w-5 h-5 text-[#ff8d13]" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">Employé</TableHead>
                    <TableHead className="font-bold text-gray-700">Contact</TableHead>
                    <TableHead className="font-bold text-gray-700">Type</TableHead>
                    <TableHead className="font-bold text-gray-700">Statut</TableHead>
                    <TableHead className="font-bold text-gray-700">Date d&apos;embauche</TableHead>
                    <TableHead className="font-bold text-gray-700">Fin de contrat</TableHead>
                    <TableHead className="text-right font-bold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex justify-center items-center gap-2">
                          <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-gray-600">Chargement...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : employees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        Aucun employé trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    employees.map((employee) => (
                      <TableRow
                        key={employee.id}
                        className={`border-b border-orange-50 hover:bg-[#fff5ed]/50 transition-colors ${
                          employee.status === 'BLOQUE' ? 'bg-gray-100 opacity-60' : ''
                        }`}
                      >
                        <TableCell>
                          <button
                            type="button"
                            onClick={() => handleSelectEmployee(employee.id)}
                            disabled={!isEmployeeEligible(employee)}
                            className={`flex items-center justify-center p-2 rounded transition-colors ${
                              isEmployeeEligible(employee)
                                ? "hover:bg-orange-100 cursor-pointer"
                                : "cursor-not-allowed opacity-40"
                            }`}
                            title={
                              !isEmployeeEligible(employee)
                                ? "Cet employé ne peut pas être sélectionné"
                                : selectedEmployees.includes(employee.id)
                                ? "Désélectionner"
                                : "Sélectionner"
                            }
                          >
                            {selectedEmployees.includes(employee.id) ? (
                              <CheckSquare className="w-5 h-5 text-[#ff8d13]" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12 ring-2 ring-orange-200">
                              {employee.photo && getImageUrl(employee.photo) ? (
                                <AvatarImage src={getImageUrl(employee.photo) || ''} alt={`${employee.prenom} ${employee.nom}`} />
                              ) : null}
                              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-sm">
                                {employee.prenom[0]}{employee.nom[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold text-gray-900">{employee.prenom} {employee.nom}</p>
                              <p className="text-xs text-gray-500 font-medium">{employee.matricule}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700">{employee.telephone}</p>
                            {employee.email && (
                              <p className="text-xs text-gray-500">{employee.email}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(employee.type, employee.sousType)}</TableCell>
                        <TableCell>{getStatusBadge(employee.status)}</TableCell>
                        <TableCell className="text-sm font-medium text-gray-700">
                          {formatDate(employee.dateEmbauche)}
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-700">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {employee.dateFinContrat ? formatDate(employee.dateFinContrat) : 'N/A'}
                              {employee.dateFinContrat && isContractExpired(employee.dateFinContrat) && employee.status !== 'TERMINE' && (() => {
                                const { daysRemaining } = getDaysUntilAutoTermination(employee.dateFinContrat);
                                return (
                                  <Badge className="bg-red-600 text-white font-semibold gap-1 flex items-center text-xs">
                                    <AlertTriangle className="w-3 h-3" />
                                    Expiré
                                  </Badge>
                                );
                              })()}
                            </div>
                            {employee.dateFinContrat && isContractExpired(employee.dateFinContrat) && employee.status !== 'TERMINE' && (() => {
                              const { daysRemaining } = getDaysUntilAutoTermination(employee.dateFinContrat);
                              if (daysRemaining > 0) {
                                return (
                                  <p className="text-xs text-[#ff8d13] font-medium">
                                    Auto-terminé dans {daysRemaining}j
                                  </p>
                                );
                              }
                            })()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            {/* Bouton Transférer : apparaît UNE SEULE FOIS quand l'employé vient d'être créé (!hasBadge) */}
                            {/* Une fois transféré, hasBadge devient true et le bouton disparaît définitivement */}
                            {employee.status === "ACTIF" && !employee.hasBadge && (
                              <Button
                                size="sm"
                                className="gap-2 bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-md"
                                onClick={() => handleTransferToPrint(employee.id)}
                              >
                                <Send className="w-4 h-4" />
                                Transférer
                              </Button>
                            )}
                            {employee.hasBadge && employee.badgeStatus === "EN_ATTENTE" && (
                              <Badge className="bg-orange-500 text-white font-semibold">
                                En attente d'impression
                              </Badge>
                            )}
                            {employee.hasBadge && employee.badgeStatus === "IMPRIME" && (
                              <>
                                <Badge className="bg-green-600 text-white font-semibold">
                                  {employee.printCount === 1
                                    ? "Badge imprimé"
                                    : employee.printCount === 2
                                      ? "Badge réimprimé"
                                      : `Badge réimprimé(${(employee.printCount || 2) - 2})`
                                  }
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-2 border-blue-200 hover:bg-blue-50 text-blue-600"
                                  onClick={() => handleAuthorizeReprint(employee)}
                                >
                                  <Send className="w-4 h-4" />
                                  Renvoyer pour réimpression
                                </Button>
                              </>
                            )}
                            {employee.hasBadge && employee.badgeStatus === "REIMPRESSION" && (
                              <>
                                <Badge className="bg-blue-600 text-white font-semibold">
                                  Autorisé pour réimpression
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-2 border-blue-200 hover:bg-blue-50 text-blue-600"
                                  onClick={() => handleAuthorizeReprint(employee)}
                                >
                                  <Send className="w-4 h-4" />
                                  Renvoyer à nouveau
                                </Button>
                              </>
                            )}

                            {/* Dropdown menu pour changer le statut */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" className="border-purple-200 hover:bg-purple-50 hover:border-purple-300 gap-2 transition-all shadow-sm hover:shadow-md">
                                  <MoreVertical className="w-4 h-4 text-purple-600" />
                                  <span className="font-semibold">Statut</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-64 p-2 shadow-2xl border-2 border-gray-200 bg-white">
                                <DropdownMenuLabel className="text-center text-lg font-bold text-gray-800 py-3 border-b-2 border-gray-200">
                                  Modifier le Statut
                                </DropdownMenuLabel>
                                <div className="py-2 space-y-1">
                                  <DropdownMenuItem
                                    onClick={() => handleUpdateStatus(employee.id, 'ACTIF')}
                                    disabled={employee.status === 'ACTIF'}
                                    className={`cursor-pointer p-3 rounded-lg transition-all ${
                                      employee.status === 'ACTIF'
                                        ? 'bg-green-50 border-2 border-green-500 opacity-60 cursor-not-allowed'
                                        : 'hover:bg-green-50 hover:border-2 hover:border-green-300 border-2 border-transparent'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 w-full">
                                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-bold text-gray-900">Actif</p>
                                        <p className="text-xs text-gray-500">Employé en activité</p>
                                      </div>
                                      {employee.status === 'ACTIF' && (
                                        <Badge className="bg-green-500 text-white text-xs">Actuel</Badge>
                                      )}
                                    </div>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => handleUpdateStatus(employee.id, 'SUSPENDU')}
                                    disabled={employee.status === 'SUSPENDU'}
                                    className={`cursor-pointer p-3 rounded-lg transition-all ${
                                      employee.status === 'SUSPENDU'
                                        ? 'bg-orange-50 border-2 border-orange-500 opacity-60 cursor-not-allowed'
                                        : 'hover:bg-orange-50 hover:border-2 hover:border-orange-300 border-2 border-transparent'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 w-full">
                                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                        <Ban className="w-5 h-5 text-orange-600" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-bold text-gray-900">Suspendu</p>
                                        <p className="text-xs text-gray-500">Suspension temporaire</p>
                                      </div>
                                      {employee.status === 'SUSPENDU' && (
                                        <Badge className="bg-orange-500 text-white text-xs">Actuel</Badge>
                                      )}
                                    </div>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => handleUpdateStatus(employee.id, 'TERMINE')}
                                    disabled={employee.status === 'TERMINE'}
                                    className={`cursor-pointer p-3 rounded-lg transition-all ${
                                      employee.status === 'TERMINE'
                                        ? 'bg-gray-50 border-2 border-gray-400 opacity-60 cursor-not-allowed'
                                        : 'hover:bg-gray-50 hover:border-2 hover:border-gray-300 border-2 border-transparent'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 w-full">
                                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <XCircle className="w-5 h-5 text-gray-600" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-bold text-gray-900">Terminé</p>
                                        <p className="text-xs text-gray-500">Fin de contrat</p>
                                      </div>
                                      {employee.status === 'TERMINE' && (
                                        <Badge className="bg-gray-500 text-white text-xs">Actuel</Badge>
                                      )}
                                    </div>
                                  </DropdownMenuItem>
                                </div>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            <Link href={`/dashboard/rh/employees/${employee.id}`}>
                              <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50 gap-2">
                                <Eye className="w-4 h-4 text-blue-600" />
                                Voir
                              </Button>
                            </Link>
                            <Link href={`/dashboard/rh/employees/${employee.id}/edit`}>
                              <Button size="sm" variant="outline" className="border-[#fed7aa] hover:bg-[#fff5ed] gap-2">
                                <Edit className="w-4 h-4" />
                                Modifier
                              </Button>
                            </Link>
                            {employee.status === 'BLOQUE' ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-200 text-green-600 hover:bg-green-50 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handleUpdateStatus(employee.id, 'ACTIF')}
                                disabled={user?.role !== 'ADMIN' && user?.role !== 'RH'}
                                title={
                                  (user?.role !== 'ADMIN' && user?.role !== 'RH')
                                    ? 'Seuls les RH et ADMIN peuvent débloquer des employés'
                                    : 'Débloquer cet employé et le remettre actif'
                                }
                              >
                                <CheckCircle className="w-4 h-4" />
                                Débloquer
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handleUpdateStatus(employee.id, 'BLOQUE')}
                                disabled={user?.role !== 'ADMIN' && user?.role !== 'RH'}
                                title={
                                  (user?.role !== 'ADMIN' && user?.role !== 'RH')
                                    ? 'Seuls les RH et ADMIN peuvent bloquer des employés'
                                    : 'Bloquer cet employé'
                                }
                              >
                                <Ban className="w-4 h-4" />
                                Bloquer
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {!isLoading && employees.length > 0 && (
              <div className="mt-6 flex items-center justify-between border-t border-orange-100 pt-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{totalEmployees}</span> employé(s) au total
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Afficher:</label>
                    <Select
                      value={limit.toString()}
                      onValueChange={(value) => {
                        setLimit(Number(value));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="h-9 w-20 border-[#fed7aa]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="border-[#fed7aa] hover:bg-[#fff5ed]"
                  >
                    Précédent
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={`page-${pageNum}`}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13]"
                              : "border-[#fed7aa] hover:bg-[#fff5ed]"
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="border-[#fed7aa] hover:bg-[#fff5ed]"
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Barre d'action flottante pour la sélection en lot */}
        {selectedEmployees.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5">
            <Card className="shadow-2xl border-2 border-orange-500 bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-[#ff8d13]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {selectedEmployees.length} employé{selectedEmployees.length > 1 ? "s" : ""} sélectionné{selectedEmployees.length > 1 ? "s" : ""}
                      </p>
                      <p className="text-xs text-gray-600">
                        Prêt{selectedEmployees.length > 1 ? "s" : ""} pour le transfert
                      </p>
                    </div>
                  </div>

                  <div className="h-10 w-px bg-gray-300"></div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-gray-300 hover:bg-gray-50"
                      onClick={() => setSelectedEmployees([])}
                    >
                      <X className="w-4 h-4" />
                      Annuler
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg"
                      onClick={() => handleBulkTransfer()}
                    >
                      <Send className="w-4 h-4" />
                      Transférer la sélection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Dialogue de suspension */}
      <Dialog open={isSuspensionDialogOpen} onOpenChange={setIsSuspensionDialogOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
          {/* Header simplifié */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-white">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <Ban className="w-7 h-7" />
              </div>
              <div className="flex-1 pt-1">
                <DialogTitle className="text-2xl font-bold mb-1.5 leading-tight">Suspension d&apos;Employé</DialogTitle>
                <DialogDescription className="text-orange-50 text-sm font-medium">
                  {employees.find(e => e.id === suspensionData.employeeId)
                    ? `${employees.find(e => e.id === suspensionData.employeeId)?.prenom} ${employees.find(e => e.id === suspensionData.employeeId)?.nom}`
                    : 'Employé sélectionné'}
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Body avec plus d'espace */}
          <div className="px-6 py-6 space-y-6 bg-white">
            {/* Info Box simplifié */}
            <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="font-bold text-blue-900 text-sm mb-1.5">À savoir</p>
                  <ul className="text-xs text-blue-800 space-y-1 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>La suspension peut être appliquée même si le badge est déjà imprimé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>L&apos;employé sera automatiquement réactivé à la date indiquée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Le motif sera enregistré dans le dossier de l&apos;employé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form Fields avec plus d'espace */}
            <div className="space-y-6">
              {/* Motif */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <Label htmlFor="motif" className="text-base font-bold text-gray-900">
                    Motif de la suspension <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Textarea
                  id="motif"
                  placeholder="Exemple : Absence injustifiée répétée&#10;&#10;Décrivez ici le motif détaillé de la suspension..."
                  value={suspensionData.motif}
                  onChange={(e) => setSuspensionData({ ...suspensionData, motif: e.target.value })}
                  className="min-h-[120px] border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 rounded-xl text-sm resize-none p-3 leading-relaxed"
                />
              </div>

              {/* Date */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <Label htmlFor="dateFinSuspension" className="text-base font-bold text-gray-900">
                    Date de fin de suspension <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  id="dateFinSuspension"
                  type="date"
                  value={suspensionData.dateFinSuspension}
                  onChange={(e) => setSuspensionData({ ...suspensionData, dateFinSuspension: e.target.value })}
                  className="h-12 border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 rounded-xl text-sm px-3"
                  min={new Date().toISOString().split('T')[0]}
                />
                {suspensionData.dateFinSuspension && (
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3 mt-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-green-700 font-medium mb-0.5">Réactivation automatique</p>
                        <p className="text-sm text-green-900 font-bold">
                          {new Date(suspensionData.dateFinSuspension).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer simplifié */}
          <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200">
            <div className="flex gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsSuspensionDialogOpen(false);
                  setSuspensionData({ employeeId: "", motif: "", dateFinSuspension: "" });
                }}
                className="flex-1 h-10 border-2 border-gray-300 hover:bg-gray-100 font-semibold text-xs rounded-lg"
              >
                <X className="w-3.5 h-3.5 mr-1.5" />
                Annuler
              </Button>
              <Button
                type="button"
                onClick={handleConfirmSuspension}
                className="flex-1 h-10 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs shadow-lg shadow-orange-500/30 rounded-lg"
              >
                <Ban className="w-3.5 h-3.5 mr-1.5" />
                Confirmer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}