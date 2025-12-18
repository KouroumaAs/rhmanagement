"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, Lock, Mail, ShieldCheck, Sparkles, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { authService } from "@/src/services/api";
import { useToast } from "@/src/hooks/use-toast";
import { useAuth } from "@/src/contexts/AuthContext";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  // const [email, setEmail] = useState("admin@gmail.com");
  const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("Ma123456");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();
  const { login, isAuthenticated, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      let redirectUrl = "/dashboard/rh";
      if (user.role === "ADMIN") {
        redirectUrl = "/dashboard/rh";
      } else if (user.role === "RH" || user.role === "ASSISTANT_RH") {
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
    setIsLoading(true);
    setErrorMessage(""); // Effacer les erreurs précédentes

    try {
      const response = await authService.login({ email, password });
      console.log('Réponse login:', response);

      if (response.success) {
        // La structure est: response.data.data (double imbrication)
        const apiResponse = response.data;
        const userData = (apiResponse as any)?.data || apiResponse;

        console.log('User data:', userData);

        if (userData.token && userData.user) {
          // Déterminer l'URL de redirection avant de login
          const role = userData.user.role;
          console.log('Redirection pour le rôle:', role);

          let redirectUrl = "/dashboard/rh";

          if (role === "ADMIN") {
            redirectUrl = "/dashboard/rh";
          } else if (role === "RH" || role === "ASSISTANT_RH") {
            redirectUrl = "/dashboard/rh";
          } else if (role === "IMPRESSION") {
            redirectUrl = "/dashboard/impression";
          } else if (role === "SECURITY") {
            redirectUrl = "/dashboard/security/scan";
          }

          // Sauvegarder dans localStorage et cookies
          localStorage.setItem('token', userData.token);
          localStorage.setItem('user', JSON.stringify(userData.user));
          document.cookie = `token=${userData.token}; path=/; max-age=${7 * 24 * 60 * 60}`;

          // Appeler login pour mettre à jour le contexte
          login(userData.token, userData.user);

          toast({
            title: "Connexion réussie",
            description: `Bienvenue ${userData.user.prenom} ${userData.user.nom}`,
          });

          // Redirection immédiate
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 100);
        } else {
          console.error('Token ou user manquant:', userData);
        }
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);

      // Afficher un message d'erreur général
      setErrorMessage("Identifiant ou mot de passe incorrect");

      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Identifiant ou mot de passe incorrect",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Clean Background with DSD */}
      <div className="absolute inset-0 bg-white">
        {/* Large DSD Text Background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="text-[28rem] font-black select-none tracking-wider" style={{ color: 'rgba(255, 141, 19, 0.08)' }}>
            DSD
          </div>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
        <div className="p-8 space-y-6">
          {/* Logo & Title */}
          <div className="text-center space-y-4">
            <div className="mx-auto relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/50 relative">
                <Building2 className="w-10 h-10 text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff8d13] via-[#ff8d13] to-amber-600 bg-clip-text text-transparent mb-2">
                RH Management
              </h1>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Système de gestion des employés et badges
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Message d'erreur général */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
                <span className="font-bold text-lg">⚠</span>
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-gray-600 group-focus-within:text-[#ff8d13] transition-all duration-300">
                Adresse Email
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10 select-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-white transition-all duration-300" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@entreprise.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(""); // Effacer l'erreur quand l'utilisateur tape
                  }}
                  className="pl-10 h-14 border-3 border-gray-300 bg-gray-50 text-gray-900 hover:bg-white hover:border-gray-400 focus:border-[#ff8d13] focus:border-[4px] focus:ring-8 focus:ring-[#ff8d13]/30 focus:bg-gradient-to-r focus:from-[#fff5ed] focus:to-white focus:text-gray-900 focus:font-medium focus:scale-[1.02] transition-all duration-300 rounded-xl shadow-sm focus:shadow-2xl focus:shadow-[#ff8d13]/20"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold text-gray-600 group-focus-within:text-[#ff8d13] transition-all duration-300">
                Mot de passe
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10 select-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-white transition-all duration-300" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(""); // Effacer l'erreur quand l'utilisateur tape
                  }}
                  className="pl-10 pr-12 h-14 border-3 border-gray-300 bg-gray-50 text-gray-900 hover:bg-white hover:border-gray-400 focus:border-[#ff8d13] focus:border-[4px] focus:ring-8 focus:ring-[#ff8d13]/30 focus:bg-gradient-to-r focus:from-[#fff5ed] focus:to-white focus:text-gray-900 focus:font-medium focus:scale-[1.02] transition-all duration-300 rounded-xl shadow-sm focus:shadow-2xl focus:shadow-[#ff8d13]/20"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-[#ff8d13] hover:scale-125 active:scale-100 transition-all duration-200 z-20 select-none"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#ff8d13] focus:ring-[#ff8d13]" />
                <span className="text-gray-600">Se souvenir de moi</span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg shadow-[#ff8d13]/30 hover:shadow-xl hover:shadow-[#ff8d13]/40 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
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