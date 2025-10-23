"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UserPlus, Upload, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/hooks/use-toast";
import { employeeService } from "@/src/services/employee.service";
import { VALIDATION } from "@/src/constants";

export default function NewEmployeePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const initialFormData = {
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse: "",
    dateNaissance: "",
    dateEmbauche: "",
    typeContrat: "CDD" as "CDI" | "CDD" | "STAGE",
    dateFinContrat: "",
    fonction: "",
    matricule: "",
    typeEmploye: "PERSONNELS_DSD",
    photo: null as File | null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // État pour gérer les erreurs de chaque champ
  const [fieldErrors, setFieldErrors] = useState<{
    nom?: string;
    prenom?: string;
    telephone?: string;
    email?: string;
    dateNaissance?: string;
    dateEmbauche?: string;
    dateFinContrat?: string;
    fonction?: string;
    matricule?: string;
  }>({});

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({}); // Réinitialiser les erreurs

    try {
      // Validation du téléphone
      if (formData.telephone && !VALIDATION.PHONE_REGEX.test(formData.telephone)) {
        setFieldErrors({ telephone: "Format invalide. Ex: 620 12 34 56 ou +224 620 12 34 56" });
        toast({
          variant: "destructive",
          title: "Erreur de validation",
          description: "Le numéro de téléphone n'est pas au format guinéen valide",
        });
        setIsSubmitting(false);
        return;
      }

      // Validation: âge minimum 18 ans
      if (formData.dateNaissance) {
        const dateNaissance = new Date(formData.dateNaissance);
        const today = new Date();
        let age = today.getFullYear() - dateNaissance.getFullYear();
        const monthDiff = today.getMonth() - dateNaissance.getMonth();

        // Ajuster l'âge si l'anniversaire n'est pas encore passé cette année
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateNaissance.getDate())) {
          age--;
        }

        if (age < 18) {
          setFieldErrors({ dateNaissance: "L'employé doit avoir au moins 18 ans" });
          toast({
            variant: "destructive",
            title: "⚠️ Date de naissance invalide",
            description: "La date de naissance est trop récente. L'employé doit avoir au moins 18 ans.",
            duration: 5000,
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Validation: date de fin obligatoire pour CDD et STAGE
      if ((formData.typeContrat === 'CDD' || formData.typeContrat === 'STAGE') && !formData.dateFinContrat) {
        setFieldErrors({ dateFinContrat: "La date de fin est obligatoire pour les CDD et STAGE" });
        toast({
          variant: "destructive",
          title: "Erreur de validation",
          description: "La date de fin de contrat est obligatoire pour les CDD et les stages",
        });
        setIsSubmitting(false);
        return;
      }

      // Validation: date de fin doit être supérieure à date d'embauche
      if (formData.dateFinContrat && formData.dateEmbauche) {
        const dateDebut = new Date(formData.dateEmbauche);
        const dateFin = new Date(formData.dateFinContrat);

        if (dateFin <= dateDebut) {
          setFieldErrors({ dateFinContrat: "La date de fin doit être supérieure à la date d'embauche" });
          toast({
            variant: "destructive",
            title: "Erreur de validation",
            description: "La date de fin de contrat doit être supérieure à la date d'embauche",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Validation du matricule
      if (!formData.matricule || formData.matricule.length === 0) {
        setFieldErrors({ matricule: "Le matricule est requis" });
        toast({
          variant: "destructive",
          title: "Erreur de validation",
          description: "Le matricule est requis",
        });
        setIsSubmitting(false);
        return;
      }

      // Créer FormData pour envoyer les données avec la photo
      const formDataToSend = new FormData();
      formDataToSend.append('nom', formData.nom);
      formDataToSend.append('prenom', formData.prenom);
      formDataToSend.append('telephone', formData.telephone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('fonction', formData.fonction);
      formDataToSend.append('matricule', `DSD${formData.matricule}`);
      formDataToSend.append('type', formData.typeEmploye);
      formDataToSend.append('typeContrat', formData.typeContrat);
      formDataToSend.append('dateEmbauche', formData.dateEmbauche);

      if (formData.dateFinContrat) {
        formDataToSend.append('dateFinContrat', formData.dateFinContrat);
      }

      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      }

      console.log('Données envoyées avec photo');

      // Envoyer avec fetch au lieu du service
      const response = await fetch(`${apiUrl}/employees`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();

      console.log('Réponse du serveur:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la création');
      }

      toast({
        title: "✅ Employé créé",
        description: "L'employé a été enregistré avec succès",
      });

      // Réinitialiser le formulaire
      setFormData(initialFormData);
      setPhotoPreview(null);
      setFieldErrors({});

      // Petit délai avant la redirection pour que l'utilisateur voie le toast
      setTimeout(() => {
        router.push("/dashboard/rh/employees");
      }, 500);
    } catch (error: any) {
      console.error('Erreur complète:', error);
      console.error('Message d\'erreur:', error.message);
      console.error('Message d\'erreur en minuscule:', (error.message || "").toLowerCase());

      // Déterminer le type d'erreur
      const errorMessage = (error.message || "").toLowerCase();

      let title = "Erreur de création";
      let description = error.message || "Impossible de créer l'employé";
      let errors: typeof fieldErrors = {};

      // Vérifier si c'est une erreur d'email
      console.log('Test email dupliqué:', errorMessage.includes("email"));
      console.log('Test existe:', errorMessage.includes("existe"));
      console.log('Test unique:', errorMessage.includes("unique"));
      console.log('Test deja:', errorMessage.includes("deja") || errorMessage.includes("déjà"));
      console.log('Test duplicate:', errorMessage.includes("duplicate"));

      // Erreur d'email dupliqué - vérifier si le message contient "email"
      if (errorMessage.includes("email")) {
        title = "Email déjà existant";
        description = `L'email ${formData.email} est déjà utilisé par un autre employé.`;
        errors.email = `L'email ${formData.email} existe déjà`;
      }
      // Erreur de matricule dupliqué
      else if (errorMessage.includes("matricule") && (errorMessage.includes("existe") || errorMessage.includes("unique") || errorMessage.includes("déjà") || errorMessage.includes("deja") || errorMessage.includes("duplicate"))) {
        title = "Matricule déjà existant";
        description = `Le matricule DSD${formData.matricule} est déjà utilisé par un autre employé.`;
        errors.matricule = `Le matricule DSD${formData.matricule} existe déjà`;
      }
      // Erreur de validation email
      else if (errorMessage.includes("email") && (errorMessage.includes("invalide") || errorMessage.includes("invalid") || errorMessage.includes("format"))) {
        title = "Format d'email invalide";
        description = "Veuillez entrer une adresse email valide (ex: nom@domaine.com)";
        errors.email = "Format d'email invalide";
      }
      // Erreur de validation matricule
      else if (errorMessage.includes("matricule") && errorMessage.includes("dsd")) {
        title = "Format de matricule invalide";
        description = "Le matricule doit commencer par DSD suivi de chiffres (ex: DSD001)";
        errors.matricule = "Format de matricule invalide";
      }
      // Erreur de téléphone
      else if (errorMessage.includes("téléphone") || errorMessage.includes("telephone") || errorMessage.includes("phone")) {
        title = "Format de téléphone invalide";
        description = "Veuillez entrer un numéro valide (ex: 6xx xx xx xx ou +224 6xx xx xx xx)";
        errors.telephone = "Format de téléphone invalide";
      }

      console.log('Erreurs définies:', errors);

      setFieldErrors(errors);

      toast({
        variant: "destructive",
        title: title,
        description: description,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b border-[#fff5ed] bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/rh/employees">
              <Button variant="ghost" size="icon" className="hover:bg-violet-100" aria-label="Retour à la liste des employés">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/30">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
                Nouvel Employé
              </h1>
              <p className="text-sm text-gray-600">Enregistrer un nouveau membre du personnel</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-[#fff5ed] to-[#fff5ed] border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Photo de Profil</CardTitle>
              <CardDescription className="text-gray-600">
                Téléchargez une photo pour le badge de l&apos;employé
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-[#fed7aa] bg-violet-50/50 flex items-center justify-center overflow-hidden">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">Photo</p>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("photo")?.click()}
                    className="border-[#fed7aa] hover:bg-violet-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choisir une photo
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">Format: JPG, PNG (Max: 5MB)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-[#fff5ed] to-[#fff5ed] border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Informations Personnelles</CardTitle>
              <CardDescription className="text-gray-600">
                Détails de l&apos;identité de l&apos;employé
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
                    onChange={(e) => {
                      setFormData({ ...formData, prenom: e.target.value });
                      setFieldErrors({ ...fieldErrors, prenom: undefined });
                    }}
                    placeholder="Ex: Amadou"
                    className={`h-11 border-2 ${fieldErrors.prenom ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl`}
                    required
                  />
                  {fieldErrors.prenom && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span>
                      {fieldErrors.prenom}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-sm font-semibold text-gray-700">
                    Nom *
                  </Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => {
                      setFormData({ ...formData, nom: e.target.value });
                      setFieldErrors({ ...fieldErrors, nom: undefined });
                    }}
                    placeholder="Ex: Diallo"
                    className={`h-11 border-2 ${fieldErrors.nom ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl`}
                    required
                  />
                  {fieldErrors.nom && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span>
                      {fieldErrors.nom}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateNaissance" className="text-sm font-semibold text-gray-700">
                  Date de Naissance *
                </Label>
                <Input
                  id="dateNaissance"
                  type="date"
                  value={formData.dateNaissance}
                  onChange={(e) => {
                    setFormData({ ...formData, dateNaissance: e.target.value });
                    setFieldErrors({ ...fieldErrors, dateNaissance: undefined });
                  }}
                  className={`h-11 border-2 ${fieldErrors.dateNaissance ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl`}
                  required
                />
                {fieldErrors.dateNaissance ? (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span>⚠</span>
                    {fieldErrors.dateNaissance}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Âge minimum requis : 18 ans
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-[#fff5ed] to-[#fff5ed] border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Informations de Contact</CardTitle>
              <CardDescription className="text-gray-600">
                Moyens de communication avec l&apos;employé
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
                    onChange={(e) => {
                      setFormData({ ...formData, telephone: e.target.value });
                      setFieldErrors({ ...fieldErrors, telephone: undefined });
                    }}
                    placeholder="620 12 34 56 ou +224 620 12 34 56"
                    className={`h-11 border-2 ${fieldErrors.telephone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl`}
                    required
                  />
                  {fieldErrors.telephone ? (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span>
                      {fieldErrors.telephone}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Format guinéen: doit commencer par 6 (Ex: 620 12 34 56 ou +224 620 12 34 56)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    placeholder="exemple@email.com"
                    className={`h-11 border-2 ${fieldErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl`}
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span>
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse" className="text-sm font-semibold text-gray-700">
                  Adresse
                </Label>
                <Input
                  id="adresse"
                  value={formData.adresse}
                  onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                  placeholder="Rue, Quartier, Ville"
                  className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-[#fff5ed] to-[#fff5ed] border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Informations d&apos;Emploi</CardTitle>
              <CardDescription className="text-gray-600">
                Détails du contrat et du type d&apos;employé
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="typeEmploye" className="text-sm font-semibold text-gray-700">
                  Type d&apos;Employé *
                </Label>
                <Select
                  value={formData.typeEmploye}
                  onValueChange={(value) => setFormData({ ...formData, typeEmploye: value })}
                >
                  <SelectTrigger className="h-11 w-full border-2 border-gray-200 focus:border-[#ff8d13] rounded-xl bg-white text-gray-900 font-medium">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl z-50">
                    <SelectItem value="PERSONNELS_DSD" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Personnels DSD Guinée</SelectItem>
                    <SelectItem value="DNTT" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">DNTT</SelectItem>
                    <SelectItem value="STAGIAIRES_DSD" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Stagiaires DSD Guinée</SelectItem>
                    <SelectItem value="BANQUES" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Banques</SelectItem>
                    <SelectItem value="MAISONS_PLAQUE" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Maisons de Plaque</SelectItem>
                    <SelectItem value="DNTT_STAGIAIRES" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">DNTT Stagiaires</SelectItem>
                    <SelectItem value="DEMARCHEURS" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">Collectif des Démarcheurs</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Sélectionnez la catégorie de badge appropriée pour cet employé
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="fonction" className="text-sm font-semibold text-gray-700">
                    Fonction *
                  </Label>
                  <Input
                    id="fonction"
                    value={formData.fonction}
                    onChange={(e) => {
                      setFormData({ ...formData, fonction: e.target.value });
                      setFieldErrors({ ...fieldErrors, fonction: undefined });
                    }}
                    placeholder="Ex: Développeur, Comptable, etc."
                    className={`h-11 border-2 ${fieldErrors.fonction ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl`}
                    required
                  />
                  {fieldErrors.fonction && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span>
                      {fieldErrors.fonction}
                    </p>
                  )}
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
                        setFieldErrors({ ...fieldErrors, matricule: undefined });
                      }}
                      placeholder="001, 002, 254..."
                      className={`h-11 border-2 ${fieldErrors.matricule ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl flex-1`}
                      required
                      maxLength={10}
                    />
                  </div>
                  {fieldErrors.matricule ? (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span>
                      {fieldErrors.matricule}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Le matricule sera: DSD{formData.matricule || "___"}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="typeContrat" className="text-sm font-semibold text-gray-700">
                  Type de Contrat *
                </Label>
                <Select
                  value={formData.typeContrat}
                  onValueChange={(value: "CDI" | "CDD" | "STAGE") => {
                    setFormData({ ...formData, typeContrat: value, dateFinContrat: value === 'CDI' ? '' : formData.dateFinContrat });
                    setFieldErrors({ ...fieldErrors, dateFinContrat: undefined });
                  }}
                >
                  <SelectTrigger className="h-11 w-full border-2 border-gray-200 focus:border-[#ff8d13] rounded-xl bg-white text-gray-900 font-medium">
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl z-50">
                    <SelectItem value="CDI" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">CDI - Contrat à Durée Indéterminée</SelectItem>
                    <SelectItem value="CDD" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">CDD - Contrat à Durée Déterminée</SelectItem>
                    <SelectItem value="STAGE" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">STAGE - Convention de Stage</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.typeContrat === 'CDI' ? 'Pas de date de fin pour les CDI' : 'Date de fin obligatoire'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="dateEmbauche" className="text-sm font-semibold text-gray-700">
                    Date d&apos;Embauche *
                  </Label>
                  <Input
                    id="dateEmbauche"
                    type="date"
                    value={formData.dateEmbauche}
                    onChange={(e) => {
                      setFormData({ ...formData, dateEmbauche: e.target.value });
                      setFieldErrors({ ...fieldErrors, dateEmbauche: undefined });
                    }}
                    className={`h-11 border-2 ${fieldErrors.dateEmbauche ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl`}
                    required
                  />
                  {fieldErrors.dateEmbauche && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span>
                      {fieldErrors.dateEmbauche}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFinContrat" className="text-sm font-semibold text-gray-700">
                    Date de Fin de Contrat {formData.typeContrat !== 'CDI' && '*'}
                  </Label>
                  <Input
                    id="dateFinContrat"
                    type="date"
                    value={formData.dateFinContrat}
                    onChange={(e) => {
                      setFormData({ ...formData, dateFinContrat: e.target.value });
                      setFieldErrors({ ...fieldErrors, dateFinContrat: undefined });
                    }}
                    min={formData.dateEmbauche || undefined}
                    disabled={formData.typeContrat === 'CDI'}
                    className={`h-11 border-2 ${fieldErrors.dateFinContrat ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-violet-600/10 transition-all rounded-xl ${formData.typeContrat === 'CDI' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    required={formData.typeContrat !== 'CDI'}
                  />
                  {fieldErrors.dateFinContrat ? (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span>
                      {fieldErrors.dateFinContrat}
                    </p>
                  ) : formData.typeContrat === 'CDI' ? (
                    <p className="text-xs text-gray-500 mt-1">
                      Pas de date de fin pour les CDI
                    </p>
                  ) : formData.dateEmbauche ? (
                    <p className="text-xs text-gray-500 mt-1">
                      Doit être après le {new Date(formData.dateEmbauche).toLocaleDateString('fr-FR')}
                    </p>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-[#fff5ed] to-[#fff5ed]">
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
                        <UserPlus className="w-4 h-4" />
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