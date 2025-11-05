"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, ArrowLeft, UserCheck, UserX, Activity, Edit, Trash2, Eye, KeyRound, Power, PowerOff, UserPlus, Lock, Mail, User, Phone } from "lucide-react";
import Link from "next/link";
import { dashboardService } from "@/src/services/dashboard.service";
import { userService } from "@/src/services/user.service";
import { authService } from "@/src/services/api";
import { useToast } from "@/src/hooks/use-toast";

export default function UsersListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { toast } = useToast();

  // États pour le formulaire d'inscription
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    role: "RH" as "RH" | "ASSISTANT_RH" | "IMPRESSION" | "ADMIN",
  });
  const [fieldErrors, setFieldErrors] = useState<{
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Update paginated users when page changes
    paginateUsers();
  }, [currentPage, allUsers]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardService.getAllUsers();
      console.log('Users response:', response);

      // Handle double data wrapping
      const fetchedUsers = Array.isArray(response.data)
        ? response.data
        : [];

      console.log('All users:', fetchedUsers);

      setAllUsers(fetchedUsers);
      setStats({
        total: fetchedUsers.length,
        active: fetchedUsers.filter((u: any) => u.isActive).length,
        inactive: fetchedUsers.filter((u: any) => !u.isActive).length,
      });
    } catch (error: any) {
      console.error('Erreur chargement utilisateurs:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de charger les utilisateurs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const paginateUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setUsers(allUsers.slice(startIndex, endIndex));
  };

  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleActive = async (userId: string, currentlyActive: boolean) => {
    const user = allUsers.find(u => u.id === userId);
    const action = currentlyActive ? "désactiver" : "activer";
    const confirmed = confirm(
      `Voulez-vous vraiment ${action} l'utilisateur "${user?.prenom} ${user?.nom}" ?\n\n` +
      (currentlyActive
        ? "L'utilisateur ne pourra plus se connecter au système."
        : "L'utilisateur pourra se connecter au système.")
    );

    if (!confirmed) return;

    try {
      await userService.toggleActive(userId);

      // Update local state immediately
      const updatedUsers = allUsers.map(u =>
        u.id === userId
          ? { ...u, isActive: !currentlyActive }
          : u
      );
      setAllUsers(updatedUsers);

      // Update stats
      setStats({
        total: updatedUsers.length,
        active: updatedUsers.filter((u: any) => u.isActive).length,
        inactive: updatedUsers.filter((u: any) => !u.isActive).length,
      });

      toast({
        title: currentlyActive ? "⏸️ Utilisateur désactivé" : "✅ Utilisateur activé",
        description: currentlyActive
          ? `${user?.prenom} ${user?.nom} ne peut plus se connecter`
          : `${user?.prenom} ${user?.nom} peut maintenant se connecter`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de modifier le statut de l'utilisateur",
      });
    }
  };

  const handleResetPassword = async (userId: string, userName: string) => {
    const user = allUsers.find(u => u.id === userId);

    const newPassword = prompt(
      `🔑 Réinitialisation du mot de passe\n\n` +
      `Utilisateur : ${userName}\n` +
      `Email : ${user?.email}\n\n` +
      `Entrez le nouveau mot de passe (minimum 6 caractères) :`
    );

    if (!newPassword) return;

    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
      });
      return;
    }

    const confirmed = confirm(
      `Confirmez-vous la réinitialisation du mot de passe pour "${userName}" ?`
    );

    if (!confirmed) return;

    try {
      await userService.resetPassword(userId, newPassword);

      toast({
        title: "🔑 Mot de passe réinitialisé",
        description: `Le mot de passe de ${userName} a été réinitialisé avec succès`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de réinitialiser le mot de passe",
      });
    }
  };

  const handleDelete = async (userId: string, userName: string) => {
    const user = allUsers.find(u => u.id === userId);

    const confirmed = confirm(
      `⚠️ ATTENTION ⚠️\n\n` +
      `Vous êtes sur le point de supprimer définitivement l'utilisateur :\n\n` +
      `👤 ${userName}\n` +
      `📧 ${user?.email}\n` +
      `🎭 ${user?.role}\n\n` +
      `Cette action est IRRÉVERSIBLE et entraînera :\n` +
      `✗ Suppression de toutes les données de l'utilisateur\n` +
      `✗ Perte définitive d'accès au système\n` +
      `✗ Impossibilité de récupération\n\n` +
      `Tapez "OUI" pour confirmer la suppression.`
    );

    if (!confirmed) return;

    try {
      await userService.delete(userId);

      // Remove user from local state immediately
      const updatedUsers = allUsers.filter(u => u.id !== userId);
      setAllUsers(updatedUsers);

      // Update stats
      setStats({
        total: updatedUsers.length,
        active: updatedUsers.filter((u: any) => u.isActive).length,
        inactive: updatedUsers.filter((u: any) => !u.isActive).length,
      });

      // Adjust page if needed
      const newTotalPages = Math.ceil(updatedUsers.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      toast({
        title: "🗑️ Utilisateur supprimé",
        description: `${userName} a été supprimé définitivement du système`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de supprimer l'utilisateur",
      });
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({}); // Réinitialiser les erreurs

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({
        confirmPassword: "Les mots de passe ne correspondent pas"
      });
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    if (formData.password.length < 8) {
      setFieldErrors({
        password: "Le mot de passe doit contenir au moins 8 caractères"
      });
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Le mot de passe doit contenir au moins 8 caractères",
      });
      return;
    }

    // Vérifier la présence d'au moins une majuscule
    if (!/[A-Z]/.test(formData.password)) {
      setFieldErrors({
        password: "Le mot de passe doit contenir au moins une lettre majuscule"
      });
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Le mot de passe doit contenir au moins une lettre majuscule",
      });
      return;
    }

    // Vérifier la présence d'au moins une minuscule
    if (!/[a-z]/.test(formData.password)) {
      setFieldErrors({
        password: "Le mot de passe doit contenir au moins une lettre minuscule"
      });
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Le mot de passe doit contenir au moins une lettre minuscule",
      });
      return;
    }

    // Vérifier la présence d'au moins un chiffre
    if (!/[0-9]/.test(formData.password)) {
      setFieldErrors({
        password: "Le mot de passe doit contenir au moins un chiffre"
      });
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Le mot de passe doit contenir au moins un chiffre",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...registerData } = formData;

      // Nettoyer le numéro de téléphone (enlever les espaces)
      const cleanedData = {
        ...registerData,
        telephone: registerData.telephone.replace(/\s/g, ''),
      };

      console.log('📤 Données envoyées:', cleanedData);

      const response = await authService.register(cleanedData);
      console.log('📥 Réponse reçue:', response);

      if (response.success) {
        toast({
          title: "✅ Utilisateur créé avec succès",
          description: `${formData.prenom} ${formData.nom} a été ajouté au système`,
        });

        // Réinitialiser le formulaire
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          password: "",
          confirmPassword: "",
          role: "RH",
        });
        setFieldErrors({});

        // Fermer le dialog
        setIsDialogOpen(false);

        // Rafraîchir la liste des utilisateurs
        fetchUsers();
      }
    } catch (error: any) {
      console.error('❌ Erreur lors de la création:', error);

      // Déterminer le type d'erreur
      const errorMessage = (error.message || "").toLowerCase();
      let errors: typeof fieldErrors = {};
      let displayMessage = error.message || "Une erreur est survenue lors de la création de l'utilisateur";

      // Erreur d'email dupliqué
      if (errorMessage.includes("email") && (errorMessage.includes("déjà") || errorMessage.includes("existe") || errorMessage.includes("utilisé"))) {
        errors.email = error.message;
        displayMessage = error.message;
      }
      // Erreur de téléphone dupliqué
      else if (errorMessage.includes("téléphone") || errorMessage.includes("telephone")) {
        errors.telephone = error.message;
        displayMessage = error.message;
      }
      // Erreurs de validation de mot de passe
      else if (errorMessage.includes("mot de passe") || errorMessage.includes("password")) {
        errors.password = error.message;
        displayMessage = error.message;
      }

      setFieldErrors(errors);

      toast({
        variant: "destructive",
        title: "Erreur lors de la création",
        description: displayMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b border-orange-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/rh">
                <Button variant="ghost" size="icon" className="hover:bg-orange-100">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/30">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
                  Liste des Utilisateurs
                </h1>
                <p className="text-sm text-gray-600">Gestion des utilisateurs du système</p>
              </div>
            </div>

            {/* Bouton Nouvel utilisateur */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg shadow-[#ff8d13]/30">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Nouvel Utilisateur
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
                    Créer un Nouvel Utilisateur
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour créer un nouveau compte utilisateur
                  </DialogDescription>
                </DialogHeader>

                {/* Formulaire d'inscription */}
                <form onSubmit={handleCreateUser} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prenom" className="text-sm font-semibold text-gray-700">
                        Prénom
                      </Label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                        </div>
                        <Input
                          id="prenom"
                          type="text"
                          placeholder="Prénom"
                          value={formData.prenom}
                          onChange={(e) => {
                            setFormData({ ...formData, prenom: e.target.value });
                            setFieldErrors({ ...fieldErrors, prenom: undefined });
                          }}
                          className={`pl-10 h-12 border-2 ${fieldErrors.prenom ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl`}
                          required
                        />
                      </div>
                      {fieldErrors.prenom && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                          <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                            <span className="text-red-500">⚠</span>
                            {fieldErrors.prenom}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nom" className="text-sm font-semibold text-gray-700">
                        Nom
                      </Label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                        </div>
                        <Input
                          id="nom"
                          type="text"
                          placeholder="Nom"
                          value={formData.nom}
                          onChange={(e) => {
                            setFormData({ ...formData, nom: e.target.value });
                            setFieldErrors({ ...fieldErrors, nom: undefined });
                          }}
                          className={`pl-10 h-12 border-2 ${fieldErrors.nom ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl`}
                          required
                        />
                      </div>
                      {fieldErrors.nom && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                          <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                            <span className="text-red-500">⚠</span>
                            {fieldErrors.nom}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Adresse Email
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@entreprise.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setFieldErrors({ ...fieldErrors, email: undefined });
                        }}
                        className={`pl-10 h-12 border-2 ${fieldErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl`}
                        required
                      />
                    </div>
                    {fieldErrors.email && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                        <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                          <span className="text-red-500">⚠</span>
                          {fieldErrors.email}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone" className="text-sm font-semibold text-gray-700">
                      Téléphone
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                      </div>
                      <Input
                        id="telephone"
                        type="tel"
                        placeholder="622123456 ou +224622123456"
                        value={formData.telephone}
                        onChange={(e) => {
                          setFormData({ ...formData, telephone: e.target.value });
                          setFieldErrors({ ...fieldErrors, telephone: undefined });
                        }}
                        className={`pl-10 h-12 border-2 ${fieldErrors.telephone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl`}
                        required
                      />
                    </div>
                    {fieldErrors.telephone ? (
                      <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                        <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                          <span className="text-red-500">⚠</span>
                          {fieldErrors.telephone}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Format: 6xxxxxxxx (9 chiffres) ou +224 6xxxxxxxx</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-semibold text-gray-700">
                      Rôle
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: "RH" | "ASSISTANT_RH" | "IMPRESSION" | "ADMIN") => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="RH">Ressources Humaines</SelectItem>
                        <SelectItem value="ASSISTANT_RH">Assistant RH</SelectItem>
                        <SelectItem value="IMPRESSION">Service d&apos;Impression</SelectItem>
                        <SelectItem value="ADMIN">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                        Mot de passe
                      </Label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••••"
                          value={formData.password}
                          onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                            setFieldErrors({ ...fieldErrors, password: undefined });
                          }}
                          className={`pl-10 h-12 border-2 ${fieldErrors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl`}
                          required
                        />
                      </div>
                      {fieldErrors.password && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                          <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                            <span className="text-red-500">⚠</span>
                            {fieldErrors.password}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                        Confirmer le mot de passe
                      </Label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                        </div>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => {
                            setFormData({ ...formData, confirmPassword: e.target.value });
                            setFieldErrors({ ...fieldErrors, confirmPassword: undefined });
                          }}
                          className={`pl-10 h-12 border-2 ${fieldErrors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl`}
                          required
                        />
                      </div>
                      {fieldErrors.confirmPassword && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                          <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                            <span className="text-red-500">⚠</span>
                            {fieldErrors.confirmPassword}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg shadow-[#ff8d13]/30"
                    >
                      {isSubmitting ? "Création en cours..." : "Créer l'utilisateur"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-orange-100 bg-gradient-to-r from-orange-50/50 to-amber-50/50">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#ff8d13]" />
                Total Utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-5xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-500 mt-2">Dans le système</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-green-100 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                Utilisateurs Actifs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {stats.active}
                </p>
                <p className="text-sm text-gray-500 mt-2">Connectés récemment</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <UserX className="w-5 h-5 text-gray-600" />
                Utilisateurs Inactifs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
                  {stats.inactive}
                </p>
                <p className="text-sm text-gray-500 mt-2">Non connectés</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-orange-100 bg-gradient-to-r from-orange-50/50 to-amber-50/50">
            <CardTitle className="text-2xl font-bold text-gray-900">Tous les Utilisateurs</CardTitle>
            <CardDescription className="text-gray-600">
              Liste complète de tous les utilisateurs du système
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {users.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Aucun utilisateur trouvé</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-50 hover:to-amber-50">
                      <TableHead className="font-bold text-gray-900">Utilisateur</TableHead>
                      <TableHead className="font-bold text-gray-900">Email</TableHead>
                      <TableHead className="font-bold text-gray-900">Téléphone</TableHead>
                      <TableHead className="font-bold text-gray-900">Rôle</TableHead>
                      <TableHead className="font-bold text-gray-900">Statut</TableHead>
                      <TableHead className="font-bold text-gray-900">Dernière connexion</TableHead>
                      <TableHead className="font-bold text-gray-900 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-[#fff5ed]/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 ring-2 ring-orange-100">
                              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold">
                                {user.prenom?.[0]}{user.nom?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-gray-900">{user.prenom} {user.nom}</p>
                              <p className="text-xs text-gray-500">
                                Créé le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-700">{user.email}</TableCell>
                        <TableCell className="text-sm text-gray-700">{user.telephone || '-'}</TableCell>
                        <TableCell>
                          <Badge className="bg-[#ff8d13] text-white font-semibold">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`w-fit ${user.isActive ? "bg-green-600 text-white" : "bg-gray-500 text-white"} font-semibold`}>
                            {user.isActive ? "Actif" : "Inactif"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.lastLogin ? (
                            <div>
                              <p className="font-medium text-gray-700">
                                {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(user.lastLogin).toLocaleTimeString('fr-FR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-blue-100"
                              onClick={() => window.location.href = `/dashboard/rh/users/${user.id}`}
                              title="Voir détails"
                            >
                              <Eye className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-orange-100"
                              onClick={() => window.location.href = `/dashboard/rh/users/${user.id}/edit`}
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4 text-[#ff8d13]" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-purple-100"
                              onClick={() => handleResetPassword(user.id, `${user.prenom} ${user.nom}`)}
                              title="Réinitialiser le mot de passe"
                            >
                              <KeyRound className="w-4 h-4 text-purple-600" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className={user.isActive ? "hover:bg-orange-100" : "hover:bg-green-100"}
                              onClick={() => handleToggleActive(user.id, user.isActive)}
                              title={user.isActive ? "Désactiver" : "Activer"}
                            >
                              {user.isActive ? (
                                <PowerOff className="w-4 h-4 text-[#ff8d13]" />
                              ) : (
                                <Power className="w-4 h-4 text-green-600" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-red-100"
                              onClick={() => handleDelete(user.id, `${user.prenom} ${user.nom}`)}
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, allUsers.length)} sur {allUsers.length} utilisateurs
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-[#fed7aa] hover:bg-[#fff5ed]"
                  >
                    Précédent
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={
                            page === currentPage
                              ? "bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] text-white"
                              : "border-[#fed7aa] hover:bg-[#fff5ed]"
                          }
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-[#fed7aa] hover:bg-[#fff5ed]"
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
