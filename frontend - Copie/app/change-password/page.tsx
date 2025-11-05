"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, Lock, Eye, EyeOff, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { authService } from "@/src/services/auth.service";
import { useToast } from "@/src/hooks/use-toast";

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas!");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Vérifier la présence d'au moins une majuscule
    if (!/[A-Z]/.test(formData.newPassword)) {
      setError("Le mot de passe doit contenir au moins une lettre majuscule");
      return;
    }

    // Vérifier la présence d'au moins une minuscule
    if (!/[a-z]/.test(formData.newPassword)) {
      setError("Le mot de passe doit contenir au moins une lettre minuscule");
      return;
    }

    // Vérifier la présence d'au moins un chiffre
    if (!/[0-9]/.test(formData.newPassword)) {
      setError("Le mot de passe doit contenir au moins un chiffre");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError("Le nouveau mot de passe doit être différent de l'ancien");
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setIsSuccess(true);
      toast({
        title: "✅ Mot de passe modifié",
        description: "Votre mot de passe a été changé avec succès",
      });
    } catch (error: any) {
      console.error("❌ Erreur changement mot de passe:", error);

      // Utiliser getUserMessage() pour un message d'erreur clair
      const errorMessage = error.getUserMessage?.() || error.message || "Une erreur est survenue lors du changement de mot de passe";

      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
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

      {/* Change Password Card */}
      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
        <div className="p-6 space-y-4">
          {/* Back Button */}
          <Link href="/dashboard/rh">
            <Button variant="ghost" className="hover:bg-[#fff5ed] text-[#ff8d13] -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au Dashboard
            </Button>
          </Link>

          {!isSuccess ? (
            <>
              {/* Logo & Title */}
              <div className="text-center space-y-3">
                <div className="mx-auto relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/50">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] via-[#ff8d13] to-amber-600 bg-clip-text text-transparent mb-1">
                    Modifier le mot de passe
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Changez votre mot de passe pour sécuriser votre compte
                  </p>
                </div>
              </div>

              {/* Change Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-800">{error}</p>
                    </div>
                  </div>
                )}

                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-sm font-semibold text-gray-700">
                    Mot de passe actuel
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                    </div>
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#ff8d13] transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">
                    Nouveau mot de passe
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                    </div>
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#ff8d13] transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  {formData.newPassword && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg space-y-1.5 text-xs">
                      <p className="font-semibold text-gray-700 mb-2">Exigences du mot de passe:</p>
                      <div className={`flex items-center gap-2 ${formData.newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                        <CheckCircle className={`w-4 h-4 ${formData.newPassword.length >= 8 ? 'opacity-100' : 'opacity-30'}`} />
                        <span>Au moins 8 caractères</span>
                      </div>
                      <div className={`flex items-center gap-2 ${/[A-Z]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <CheckCircle className={`w-4 h-4 ${/[A-Z]/.test(formData.newPassword) ? 'opacity-100' : 'opacity-30'}`} />
                        <span>Une lettre majuscule</span>
                      </div>
                      <div className={`flex items-center gap-2 ${/[a-z]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <CheckCircle className={`w-4 h-4 ${/[a-z]/.test(formData.newPassword) ? 'opacity-100' : 'opacity-30'}`} />
                        <span>Une lettre minuscule</span>
                      </div>
                      <div className={`flex items-center gap-2 ${/[0-9]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <CheckCircle className={`w-4 h-4 ${/[0-9]/.test(formData.newPassword) ? 'opacity-100' : 'opacity-30'}`} />
                        <span>Un chiffre</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm New Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                    Confirmer le nouveau mot de passe
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff8d13] transition-colors" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#ff8d13] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg shadow-[#ff8d13]/30 hover:shadow-xl hover:shadow-[#ff8d13]/40 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Modification en cours...
                    </div>
                  ) : (
                    "Modifier le mot de passe"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center space-y-4 py-4">
                <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Mot de passe modifié!
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Votre mot de passe a été changé avec succès.
                  </p>
                </div>

                <Link href="/dashboard/rh" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 border-[#fed7aa] hover:bg-[#fff5ed] text-[#ff8d13] rounded-xl"
                  >
                    Retour au Dashboard
                  </Button>
                </Link>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>Système sécurisé de gestion RH</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
