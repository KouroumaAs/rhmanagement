"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/src/hooks/use-toast";
import { employeeService } from "@/src/services/employee.service";

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    dateEmbauche: "",
    dateFinContrat: "",
    fonction: "",
    profil: "",
    diplome: "",
    matricule: "",
    typeEmploye: "PERSONNEL_DSD",
    sousType: "",
    status: "ACTIF",
    motifSuspension: "",
    dateFinSuspension: "",
  });

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
      console.log('Fetching employee with ID:', params.id);

      const response = await employeeService.getById(params.id);
      console.log('Employee response:', response);

      // Handle response structure
      const employee = response.data;
      console.log('Employee data:', employee);

      if (!employee) {
        throw new Error('Employé non trouvé');
      }

      // Extraire seulement le numéro du matricule (enlever le préfixe)
      const matriculeValue = employee.matricule || "";
      // On extrait juste les chiffres à la fin
      const matriculeNumbers = matriculeValue.replace(/\D/g, '');

      setFormData({
        nom: employee.nom || "",
        prenom: employee.prenom || "",
        telephone: employee.telephone || "",
        email: employee.email || "",
        dateEmbauche: employee.dateEmbauche ? new Date(employee.dateEmbauche).toISOString().split('T')[0] : "",
        dateFinContrat: employee.dateFinContrat ? new Date(employee.dateFinContrat).toISOString().split('T')[0] : "",
        fonction: employee.fonction || "",
        profil: employee.profil || "",
        diplome: employee.diplome || "",
        matricule: matriculeNumbers,
        typeEmploye: employee.type || "PERSONNEL_DSD",
        sousType: employee.sousType || "",
        status: employee.status || "ACTIF",
        motifSuspension: employee.motifSuspension || "",
        dateFinSuspension: employee.dateFinSuspension ? new Date(employee.dateFinSuspension).toISOString().split('T')[0] : "",
      });
    } catch (error: any) {
      console.error('Erreur chargement employé:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de charger l'employé",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation: date de fin doit être supérieure à date d'embauche
      if (formData.dateFinContrat && formData.dateEmbauche) {
        const dateDebut = new Date(formData.dateEmbauche);
        const dateFin = new Date(formData.dateFinContrat);

        if (dateFin <= dateDebut) {
          toast({
            variant: "destructive",
            title: "Erreur de validation",
            description: "La date de fin de contrat doit être supérieure à la date d'embauche",
          });
          setIsSubmitting(false);
          return;
        }
      }

      const employeeData: any = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        email: formData.email,
        fonction: formData.fonction,
        profil: formData.profil || undefined,
        diplome: formData.diplome || undefined,
        matricule: `DSD${formData.matricule}`,
        type: formData.typeEmploye,
        sousType: formData.sousType || undefined,
        status: formData.status,
        dateEmbauche: formData.dateEmbauche,
        dateFinContrat: formData.dateFinContrat || undefined,
      };

      // Ajouter les champs de suspension seulement si le statut est SUSPENDU
      if (formData.status === "SUSPENDU") {
        employeeData.motifSuspension = formData.motifSuspension || null;
        employeeData.dateFinSuspension = formData.dateFinSuspension || null;
      } else {
        // Réinitialiser les champs de suspension si le statut n'est plus SUSPENDU
        employeeData.motifSuspension = null;
        employeeData.dateFinSuspension = null;
      }

      await employeeService.update(params.id as string, employeeData);

      toast({
        title: "Employé modifié",
        description: "Les modifications ont été enregistrées avec succès",
      });

      router.push("/dashboard/rh/employees");
    } catch (error: any) {
      console.error('Erreur complète:', error);
      console.error('Message d\'erreur:', error.message);

      // Déterminer le type d'erreur
      const errorMessage = (error.message || "").toLowerCase();

      let title = "Erreur de modification";
      let description = error.message || "Impossible de modifier l'employé";

      // Erreur de matricule dupliqué
      if (errorMessage.includes("matricule") && errorMessage.includes("existe")) {
        title = "Matricule déjà existant";
        description = `Le matricule DSD${formData.matricule} est déjà utilisé par un autre employé. Veuillez en choisir un autre.`;
      }
      // Erreur d'email dupliqué
      else if (errorMessage.includes("email") && errorMessage.includes("existe")) {
        title = "Email déjà existant";
        description = `L'email ${formData.email} est déjà utilisé par un autre employé. Veuillez en choisir un autre.`;
      }
      // Erreur de validation email
      else if (errorMessage.includes("email") && errorMessage.includes("invalide")) {
        title = "Format d'email invalide";
        description = "Veuillez entrer une adresse email valide (ex: nom@domaine.com)";
      }
      // Erreur de validation matricule
      else if (errorMessage.includes("matricule") && errorMessage.includes("dsd")) {
        title = "Format de matricule invalide";
        description = "Le matricule doit commencer par DSD suivi de chiffres (ex: DSD001)";
      }
      // Erreur de téléphone
      else if (errorMessage.includes("téléphone") || errorMessage.includes("telephone")) {
        title = "Format de téléphone invalide";
        description = "Veuillez entrer un numéro valide (ex: 6xx xx xx xx ou +224 6xx xx xx xx)";
      }

      toast({
        variant: "destructive",
        title: title,
        description: description,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b border-[#fff5ed] bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/rh/employees">
              <Button variant="ghost" size="icon" className="hover:bg-violet-100">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Save className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
                Modifier l'Employé
              </h1>
              <p className="text-sm text-gray-600">Mettre à jour les informations de l'employé</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Informations Personnelles</CardTitle>
              <CardDescription className="text-gray-600">
                Détails de l'identité de l'employé
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="prenom" className="text-sm font-semibold text-gray-700">
                    Prénom *
                  </Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    placeholder="Ex: Amadou"
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-sm font-semibold text-gray-700">
                    Nom *
                  </Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="Ex: Diallo"
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Informations de Contact</CardTitle>
              <CardDescription className="text-gray-600">
                Moyens de communication avec l'employé
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-sm font-semibold text-gray-700">
                    Téléphone *
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    placeholder="6xx xx xx xx ou +224 6xx xx xx xx"
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exemple@email.com"
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Informations d'Emploi</CardTitle>
              <CardDescription className="text-gray-600">
                Détails du contrat et du type d'employé
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="typeEmploye" className="text-sm font-semibold text-gray-700">
                    Type d'Employé *
                  </Label>
                  <Select
                    value={formData.typeEmploye}
                    onValueChange={(value) => setFormData({ ...formData, typeEmploye: value })}
                  >
                    <SelectTrigger className="h-11 w-full border-2 border-gray-200 focus:border-[#ff8d13] rounded-xl bg-white text-gray-900 font-medium">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl z-50">
                      <SelectItem value="PERSONNEL_DSD" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Personnel DSD Guinée</SelectItem>
                      <SelectItem value="DNTT" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">DNTT</SelectItem>
                      <SelectItem value="STAGIAIRE_DSD" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Stagiaire DSD Guinée</SelectItem>
                      <SelectItem value="BANQUE" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Banque</SelectItem>
                      <SelectItem value="EMBOUTISSEUR" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Emboutisseur</SelectItem>
                      <SelectItem value="DNTT_STAGIAIRE" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">DNTT Stagiaire</SelectItem>
                      <SelectItem value="DEMARCHEUR" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Collectif des Démarcheurs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-semibold text-gray-700">
                    Statut *
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="h-11 w-full border-2 border-gray-200 focus:border-[#ff8d13] rounded-xl bg-white text-gray-900 font-medium">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl z-50">
                      <SelectItem value="ACTIF" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Actif</SelectItem>
                      <SelectItem value="SUSPENDU" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Suspendu</SelectItem>
                      <SelectItem value="TERMINE" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Champs de suspension - affichés uniquement si le statut est SUSPENDU */}
              {formData.status === "SUSPENDU" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-[#fff5ed] rounded-xl border-2 border-[#fed7aa]">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="motifSuspension" className="text-sm font-semibold text-gray-700">
                      Motif de la suspension
                    </Label>
                    <Input
                      id="motifSuspension"
                      value={formData.motifSuspension}
                      onChange={(e) => setFormData({ ...formData, motifSuspension: e.target.value })}
                      placeholder="Ex: Absence injustifiée, retard répétitif..."
                      className="h-11 border-2 border-orange-300 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="dateFinSuspension" className="text-sm font-semibold text-gray-700">
                      Date de fin de suspension
                    </Label>
                    <Input
                      id="dateFinSuspension"
                      type="date"
                      value={formData.dateFinSuspension}
                      onChange={(e) => setFormData({ ...formData, dateFinSuspension: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="h-11 border-2 border-orange-300 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                    />
                    <p className="text-xs text-orange-700 mt-1">
                      Indiquez jusqu&apos;à quelle date l&apos;employé sera suspendu
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="fonction" className="text-sm font-semibold text-gray-700">
                    Fonction *
                  </Label>
                  <Input
                    id="fonction"
                    value={formData.fonction}
                    onChange={(e) => setFormData({ ...formData, fonction: e.target.value })}
                    placeholder="Ex: Développeur, Comptable, etc."
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profil" className="text-sm font-semibold text-gray-700">
                    Profil
                  </Label>
                  <Input
                    id="profil"
                    value={formData.profil}
                    onChange={(e) => setFormData({ ...formData, profil: e.target.value })}
                    placeholder="Ex: Comptable, Informaticien, etc."
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="diplome" className="text-sm font-semibold text-gray-700">
                    Diplôme
                  </Label>
                  <Select
                    value={formData.diplome}
                    onValueChange={(value) => setFormData({ ...formData, diplome: value })}
                  >
                    <SelectTrigger className="h-11 w-full border-2 border-gray-200 focus:border-[#ff8d13] rounded-xl bg-white text-gray-900 font-medium">
                      <SelectValue placeholder="Sélectionner un diplôme" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl z-50">
                      <SelectItem value="BAC" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">BAC</SelectItem>
                      <SelectItem value="BTS" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">BTS</SelectItem>
                      <SelectItem value="Licence 1" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Licence 1</SelectItem>
                      <SelectItem value="Licence 2" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Licence 2</SelectItem>
                      <SelectItem value="Licence 3" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Licence 3</SelectItem>
                      <SelectItem value="Master 1" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Master 1</SelectItem>
                      <SelectItem value="Master 2" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Master 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="matricule" className="text-sm font-semibold text-gray-700">
                    Matricule *
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="h-11 px-4 border-2 border-gray-200 bg-gray-100 rounded-xl flex items-center font-semibold text-gray-700">
                      DSD
                    </div>
                    <Input
                      id="matricule"
                      type="text"
                      value={formData.matricule}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, matricule: value });
                      }}
                      placeholder="001, 002, 254..."
                      className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl flex-1"
                      required
                      maxLength={10}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Le matricule sera: DSD{formData.matricule || "___"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="dateEmbauche" className="text-sm font-semibold text-gray-700">
                    Date d'Embauche *
                  </Label>
                  <Input
                    id="dateEmbauche"
                    type="date"
                    value={formData.dateEmbauche}
                    onChange={(e) => setFormData({ ...formData, dateEmbauche: e.target.value })}
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFinContrat" className="text-sm font-semibold text-gray-700">
                    Date de Fin de Contrat *
                  </Label>
                  <Input
                    id="dateFinContrat"
                    type="date"
                    value={formData.dateFinContrat}
                    onChange={(e) => setFormData({ ...formData, dateFinContrat: e.target.value })}
                    min={formData.dateEmbauche || undefined}
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl"
                    required
                  />
                  {formData.dateEmbauche && (
                    <p className="text-xs text-gray-500 mt-1">
                      Doit être après le {new Date(formData.dateEmbauche).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-orange-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <span className="text-red-500">*</span> Champs obligatoires
                </p>
                <div className="flex gap-3">
                  <Link href="/dashboard/rh/employees">
                    <Button type="button" variant="outline" className="border-2">
                      Annuler
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#e67d0f] shadow-lg shadow-[#ff8d13]/30 gap-2 min-w-[160px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}
