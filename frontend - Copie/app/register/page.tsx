"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Lock, Mail, ShieldCheck, Sparkles, User, Phone } from "lucide-react";
import Link from "next/link";
import { authService } from "@/src/services/api";
import { useToast } from "@/src/hooks/use-toast";
import { useAuth } from "@/src/contexts/AuthContext";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    role: "RH" as "RH" | "ASSISTANT_RH" | "IMPRESSION" | "ADMIN",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      let redirectUrl = "/dashboard/rh";
      if (user.role === "ADMIN" || user.role === "RH") {
        redirectUrl = "/dashboard/rh";
      } else if (user.role === "IMPRESSION") {
        redirectUrl = "/dashboard/impression";
      } else if (user.role === "SECURITY") {
        redirectUrl = "/dashboard/security/scan";
      }
      router.push(redirectUrl);
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      console.log('Données envoyées:', registerData);
      const response = await authService.register(registerData);

      if (response.success) {
        toast({
          title: "Compte créé avec succès",
          description: "Vous pouvez maintenant vous connecter",
        });
        router.push("/login");
      }
    } catch (error: any) {
      console.error('Erreur complète:', error);
      console.error('Message d\'erreur:', error.message);

      // Déterminer le type d'erreur
      const errorMessage = (error.message || "").toLowerCase();
      console.log('Message en minuscules:', errorMessage);

      let errors: typeof fieldErrors = {};
      let displayMessage = error.message || "Une erreur est survenue lors de l'inscription";

      // Erreur d'email dupliqué
      if (errorMessage.includes("email") && (errorMessage.includes("déjà") || errorMessage.includes("existe") || errorMessage.includes("utilisé"))) {
        console.log('✅ Erreur email détectée');
        errors.email = error.message; // Utiliser le message exact du backend
        displayMessage = error.message;
      }
      // Erreur de téléphone dupliqué
      else if (errorMessage.includes("téléphone") || errorMessage.includes("telephone")) {
        console.log('✅ Erreur téléphone détectée');
        errors.telephone = error.message;
        displayMessage = error.message;
      }
      // Erreur de matricule dupliqué
      else if (errorMessage.includes("matricule")) {
        console.log('✅ Erreur matricule détectée');
        errors.email = error.message; // Afficher dans email car pas de champ matricule
        displayMessage = error.message;
      }
      // Erreurs de validation de mot de passe (déjà gérées côté client, mais au cas où)
      else if (errorMessage.includes("mot de passe") || errorMessage.includes("password")) {
        console.log('✅ Erreur mot de passe détectée');
        errors.password = error.message;
        displayMessage = error.message;
      }

      console.log('🔍 Erreurs définies:', errors);
      setFieldErrors(errors);

      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: displayMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff8d13] via-[#ff8d13] to-amber-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Register Card */}
      <Card className="w-full max-w-xl relative z-10 border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
        <div className="p-6 space-y-4">
          {/* Logo & Title */}
          <div className="text-center space-y-3">
            <div className="mx-auto relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/50 relative">
                <Building2 className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ff8d13] via-[#ff8d13] to-amber-600 bg-clip-text text-transparent mb-1">
                Créer un Compte
              </h1>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Inscription au système RH Management
              </p>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Votre prénom"
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
                    placeholder="Votre nom"
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
                  placeholder="votre.email@entreprise.com"
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
                  placeholder="620 12 34 56 ou +224 620 12 34 56"
                  value={formData.telephone}
                  onChange={(e) => {
                    setFormData({ ...formData, telephone: e.target.value });
                    setFieldErrors({ ...fieldErrors, telephone: undefined });
                  }}
                  className={`pl-10 h-12 border-2 ${fieldErrors.telephone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#ff8d13]'} focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl`}
                  required
                />
              </div>
              {fieldErrors.telephone && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                  <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                    <span className="text-red-500">⚠</span>
                    {fieldErrors.telephone}
                  </p>
                </div>
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg shadow-[#ff8d13]/30 hover:shadow-xl hover:shadow-[#ff8d13]/40 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Création en cours..." : "Créer mon compte"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Vous avez déjà un compte ? </span>
              <Link href="/login" className="text-[#ff8d13] hover:text-[#e67d0f] font-semibold">
                Se connecter
              </Link>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>Système sécurisé de gestion RH</p>
          </div>
        </div>
      </Card>
    </div>
  );
}