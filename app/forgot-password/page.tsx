"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
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

      {/* Reset Password Card */}
      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
        <div className="p-6 space-y-4">
          {/* Back Button */}
          <Link href="/login">
            <Button variant="ghost" className="hover:bg-[#fff5ed] text-[#ff8d13] -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la connexion
            </Button>
          </Link>

          {!isSubmitted ? (
            <>
              {/* Logo & Title */}
              <div className="text-center space-y-3">
                <div className="mx-auto relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/50">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] via-[#ff8d13] to-amber-600 bg-clip-text text-transparent mb-1">
                    Mot de passe oublié?
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Entrez votre email pour réinitialiser votre mot de passe
                  </p>
                </div>
              </div>

              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg shadow-[#ff8d13]/30 hover:shadow-xl hover:shadow-[#ff8d13]/40 transition-all duration-300 rounded-xl"
                >
                  Envoyer le lien de réinitialisation
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
                    Email envoyé!
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Vérifiez votre boîte mail à <strong>{email}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Un lien de réinitialisation a été envoyé.
                  </p>
                </div>

                <Link href="/login" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 border-orange-200 hover:bg-[#fff5ed] text-[#ff8d13] rounded-xl"
                  >
                    Retour à la connexion
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
