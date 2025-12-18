"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QrCode, CheckCircle, XCircle, AlertTriangle, Search } from "lucide-react";
import { badgesService } from "@/src/services/badges.service";

function VerifyContent() {
  const searchParams = useSearchParams();
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const qrFromUrl = searchParams.get('qr');
    if (qrFromUrl) {
      setQrCode(qrFromUrl);
      // Auto-verify after a short delay
      setTimeout(() => {
        verifyQRCode(qrFromUrl);
      }, 500);
    }
  }, [searchParams, mounted]);

  const verifyQRCode = async (code: string) => {
    try {
      setIsLoading(true);
      setError("");
      setResult(null);

      console.log('🔍 [Frontend] Appel verify avec code:', code);
      const response = await badgesService.verify(code);
      console.log('📥 [Frontend] Réponse reçue:', JSON.stringify(response, null, 2));
      console.log('📥 [Frontend] response.data:', response.data);
      console.log('📥 [Frontend] response.data?.employee:', response.data?.employee);
      setResult(response);
    } catch (err: any) {
      console.error('❌ [Frontend] Erreur verify:', err);
      setError(err.message || "Code QR invalide ou non trouvé");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!qrCode.trim()) {
      setError("Veuillez entrer un code QR");
      return;
    }
    await verifyQRCode(qrCode);
  };

  const getStatusInfo = () => {
    if (!result || !result.employee) {
      return null;
    }

    // Affichage simple avec le matricule trouvé
    return {
      icon: QrCode,
      color: "text-[#ff8d13]",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#ff8d13]/30 mx-auto">
            <QrCode className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
              Vérification de Badge
            </h1>
            <p className="text-gray-600 mt-2">
              Scannez ou entrez le code QR pour vérifier le statut du badge
            </p>
          </div>
        </div>

        {/* Search Card */}
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
            <CardTitle className="text-xl font-bold text-gray-900">Entrez le Code QR</CardTitle>
            <CardDescription>Le code QR se trouve au format QR-XXXX-XXXXXX</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Ex: QR-2025-ABC123"
                value={qrCode}
                onChange={(e) => {
                  setQrCode(e.target.value);
                  setError("");
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                className="h-12 text-lg border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
              />
              <Button
                onClick={handleVerify}
                disabled={isLoading}
                className="h-12 px-8 bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Vérification...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Vérifier
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Result Card */}
        {result && (
          <>
            {result.employee && statusInfo ? (
              <Card className={`shadow-2xl border-2 ${statusInfo.borderColor} ${statusInfo.bgColor}`}>
                <CardContent className="p-8 space-y-6">
                  {/* Employee Info */}
                  {result.employee && (
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex justify-center">
                    <Badge className={`px-4 py-2 text-lg font-bold ${
                      result.employee.status === 'ACTIF' ? 'bg-green-500' :
                      result.employee.status === 'SUSPENDU' ? 'bg-orange-500' :
                      'bg-gray-500'
                    } text-white`}>
                      {result.employee.status || 'N/A'}
                    </Badge>
                  </div>

                  {/* Main Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Matricule */}
                    <div className="text-center md:text-left p-4 bg-white rounded-lg border-2 border-orange-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Matricule</p>
                      <p className="text-2xl font-bold text-gray-900">{result.employee.matricule}</p>
                    </div>

                    {/* Fonction */}
                    <div className="text-center md:text-left p-4 bg-white rounded-lg border-2 border-orange-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Fonction</p>
                      <p className="text-2xl font-bold text-gray-900">{result.employee.fonction || 'N/A'}</p>
                    </div>

                    {/* Nom */}
                    <div className="text-center md:text-left p-4 bg-white rounded-lg border-2 border-orange-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Nom</p>
                      <p className="text-2xl font-bold text-gray-900">{result.employee.nom || 'N/A'}</p>
                    </div>

                    {/* Prénom */}
                    <div className="text-center md:text-left p-4 bg-white rounded-lg border-2 border-orange-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Prénom</p>
                      <p className="text-2xl font-bold text-gray-900">{result.employee.prenom || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Full Name Display */}
                  <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                    <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Employé</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
                      {result.employee.prenom} {result.employee.nom}
                    </p>
                  </div>
                </div>
              )}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-2xl border-2 border-red-200 bg-red-50">
                <CardContent className="p-8">
                  <div className="text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-gray-900 mb-2">Matricule non trouvé</p>
                    <p className="text-gray-600">Aucun employé ne correspond à ce code QR.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyQRCodePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff8d13] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
