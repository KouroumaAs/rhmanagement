"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, CheckCircle, XCircle, AlertTriangle, User, Mail, Phone, Briefcase, Calendar, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/src/hooks/use-toast";
import { BrowserMultiFormatReader } from "@zxing/library";
import { badgesService } from "@/src/services/badges.service";
import { logger } from "@/src/utils/logger";
import type { VerificationResult } from "@/src/types/verification";

export default function QRScannerComponent() {
  const [manualCode, setManualCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const isMountedRef = useRef<boolean>(true);
  const isProcessingRef = useRef<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      stopScanning();
    };
  }, []);

  const verifyQRCode = async (qrCode: string) => {
    // Empêcher l'exécution si le composant est démonté
    if (!isMountedRef.current) {
      logger.warn('⚠️ Tentative de vérification après démontage du composant');
      return;
    }

    // Empêcher les vérifications multiples simultanées
    if (isProcessingRef.current) {
      logger.warn('⚠️ Une vérification est déjà en cours');
      return;
    }

    try {
      isProcessingRef.current = true;
      setIsVerifying(true);
      setVerificationResult(null);

      logger.log('🔍 Code QR à vérifier:', qrCode);
      logger.log('🔍 Longueur:', qrCode.length);
      logger.log('🔍 Type:', typeof qrCode);

      const response = await badgesService.verify(qrCode);
      logger.log('✅ Réponse API:', response);
      const data = response.data;

      // Vérifier à nouveau si le composant est toujours monté avant de mettre à jour l'état
      if (!isMountedRef.current) return;

      if (data) {
        // Adapter les données de l'API au format VerificationResult
        const adaptedResult: VerificationResult = {
          verified: data.valid,
          message: data.valid ? "Badge valide" : "Badge invalide",
          employee: data.employee ? {
            matricule: data.employee.matricule || '',
            prenom: data.employee.name?.split(' ')[0] || '',
            nom: data.employee.name?.split(' ').slice(1).join(' ') || '',
            status: data.status === 'ACTIVE' ? 'ACTIF' : data.status === 'EXPIRED' ? 'TERMINE' : 'SUSPENDU',
            telephone: data.employee.telephone,
            fonction: data.employee.fonction,
            dateFinContrat: undefined
          } : undefined
        };
        
        setVerificationResult(adaptedResult);

        if (data.valid) {
          toast({
            title: "✅ Badge Valide",
            description: `Accès autorisé - Statut: ${data.status}`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "❌ Badge Invalide",
            description: "Ce badge ne peut pas être utilisé",
          });
        }
      }
    } catch (error: any) {
      logger.error('Erreur vérification:', error);

      // Vérifier si le composant est toujours monté avant d'afficher le toast
      if (!isMountedRef.current) return;

      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de vérifier le code QR",
      });
    } finally {
      if (isMountedRef.current) {
        setIsVerifying(false);
      }
      isProcessingRef.current = false;
    }
  };

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    logger.log('🔍 Vérification manuelle du code:', manualCode);
    if (manualCode.trim()) {
      verifyQRCode(manualCode.trim());
    } else {
      logger.warn('⚠️ Code vide');
    }
  };

  const startScanning = async (cameraId?: string) => {
    try {
      logger.log('📷 Démarrage du scanner...');
      if (!codeReaderRef.current) {
        codeReaderRef.current = new BrowserMultiFormatReader();
      }

      const videoInputDevices = await codeReaderRef.current.listVideoInputDevices();
      logger.log('📷 Caméras disponibles:', videoInputDevices.length);
      logger.log('📷 Liste des caméras:', videoInputDevices);

      if (videoInputDevices.length === 0) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Aucune caméra disponible",
        });
        return;
      }

      setCameras(videoInputDevices);

      // Utiliser la caméra fournie ou chercher la caméra arrière
      let selectedDeviceId = cameraId || selectedCamera;

      if (!selectedDeviceId) {
        // Chercher la caméra arrière
        const backCamera = videoInputDevices.find(device =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('arrière') ||
          device.label.toLowerCase().includes('environment') ||
          device.label.toLowerCase().includes('rear')
        );

        if (backCamera) {
          selectedDeviceId = backCamera.deviceId;
          logger.log('📷 Caméra arrière trouvée:', backCamera.label);
        } else {
          selectedDeviceId = videoInputDevices[0].deviceId;
          logger.log('📷 Utilisation de la première caméra');
        }
      }

      setSelectedCamera(selectedDeviceId);
      setIsScanning(true);

      logger.log('📷 Caméra sélectionnée:', selectedDeviceId);
      logger.log('📷 Démarrage de la détection...');

      // Vérifier que l'élément vidéo existe avant de l'utiliser (correction problème #17)
      if (!videoRef.current) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Élément vidéo non disponible",
        });
        setIsScanning(false);
        return;
      }

      codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, error) => {
          // Vérifier si le composant est toujours monté
          if (!isMountedRef.current) {
            logger.warn('⚠️ QR détecté mais composant démonté');
            return;
          }

          // Vérifier si un traitement est déjà en cours
          if (isProcessingRef.current) {
            logger.warn('⚠️ QR détecté mais traitement en cours');
            return;
          }

          if (result) {
            const qrCode = result.getText().trim();
            logger.log('✅ QR Code scanné avec succès:', qrCode);
            logger.log('✅ Longueur:', qrCode.length);

            // Arrêter le scan immédiatement pour éviter les scans multiples
            stopScanning();

            toast({
              title: "✅ QR Code détecté !",
              description: `Code: ${qrCode}`,
            });

            verifyQRCode(qrCode);
          }
        }
      );
      logger.log('📷 Scanner actif et en attente de QR code...');
    } catch (error: any) {
      logger.error('Erreur scan:', error);
      toast({
        variant: "destructive",
        title: "Erreur de scan",
        description: error.message || "Impossible d'accéder à la caméra",
      });
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    try {
      // Arrêter le décodage du scanner
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }

      // Libérer le stream vidéo (correction problème #3)
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          track.stop();
          logger.log('📷 Track arrêté:', track.kind);
        });
        videoRef.current.srcObject = null;
        logger.log('✅ Stream vidéo libéré');
      }

      setIsScanning(false);
      isProcessingRef.current = false;
      logger.log('✅ Scanner arrêté');
    } catch (error) {
      logger.error('Erreur lors de l\'arrêt du scanner:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIF':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'SUSPENDU':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'TERMINE':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const isContractExpired = (dateFinContrat?: string) => {
    if (!dateFinContrat) return false;
    return new Date() > new Date(dateFinContrat);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/rh">
              <Button variant="ghost" size="icon" className="hover:bg-blue-100" aria-label="Retour au dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Vérification QR Code
              </h1>
              <p className="text-sm text-gray-600">Scannez ou entrez le code pour vérifier l'authenticité du badge</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Scanner */}
          <div className="space-y-6">
            {/* Camera Scanner */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-blue-600" />
                  Scanner QR Code
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Utilisez votre caméra pour scanner le badge
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {!isScanning ? (
                    <Button
                      onClick={() => startScanning()}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/30 gap-2"
                      size="lg"
                    >
                      <QrCode className="w-5 h-5" />
                      Activer la Caméra
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative bg-black rounded-xl overflow-hidden">
                        <video
                          ref={videoRef}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 border-4 border-blue-500 rounded-xl pointer-events-none">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white rounded-xl"></div>
                        </div>
                      </div>
                      <Button
                        onClick={stopScanning}
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                        size="lg"
                      >
                        Arrêter le Scan
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Manual Entry */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="text-xl font-bold text-gray-900">Vérification Manuelle</CardTitle>
                <CardDescription className="text-gray-600">
                  Entrez le code QR manuellement
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleManualVerify} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qrCode" className="text-sm font-semibold text-gray-700">
                      Code QR
                    </Label>
                    <Input
                      id="qrCode"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="Ex: QR-2025-ABC123"
                      className="h-11 border-2 border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all rounded-xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isVerifying || !manualCode.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/30"
                    size="lg"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Vérification...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Vérifier
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {verificationResult ? (
              <>
                {/* Status Card */}
                <Card className={`shadow-xl border-2 ${verificationResult.verified ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center gap-4">
                      {verificationResult.verified ? (
                        <CheckCircle className="w-16 h-16 text-green-600" />
                      ) : (
                        <XCircle className="w-16 h-16 text-red-600" />
                      )}
                      <div>
                        <h2 className={`text-2xl font-bold ${verificationResult.verified ? 'text-green-800' : 'text-red-800'}`}>
                          {verificationResult.verified ? 'BADGE VALIDE' : 'BADGE INVALIDE'}
                        </h2>
                        <p className={`text-sm ${verificationResult.verified ? 'text-green-700' : 'text-red-700'}`}>
                          {verificationResult.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Employee Details */}
                {verificationResult.employee && (
                  <Card className="shadow-xl border-0 bg-white">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Informations de l'Employé
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-500 mb-1">Prénom</p>
                          <p className="text-lg font-bold text-gray-900">{verificationResult.employee.prenom}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500 mb-1">Nom</p>
                          <p className="text-lg font-bold text-gray-900">{verificationResult.employee.nom}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Matricule</p>
                        <p className="text-lg font-bold text-blue-600">{verificationResult.employee.matricule}</p>
                      </div>

                      {verificationResult.employee.telephone && (
                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Phone className="w-4 h-4 text-blue-600" />
                            <p className="text-sm font-semibold text-gray-500">Téléphone</p>
                          </div>
                          <p className="text-gray-900">{verificationResult.employee.telephone}</p>
                        </div>
                      )}

                      {verificationResult.employee.fonction && (
                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                            <p className="text-sm font-semibold text-gray-500">Fonction</p>
                          </div>
                          <p className="text-gray-900">{verificationResult.employee.fonction}</p>
                        </div>
                      )}

                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-500 mb-2">Statut</p>
                        <Badge className={`${getStatusColor(verificationResult.employee.status || 'ACTIF')} text-lg px-4 py-2 border-2`}>
                          {verificationResult.employee.status || 'ACTIF'}
                        </Badge>
                      </div>

                      {verificationResult.employee.dateFinContrat && (
                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <p className="text-sm font-semibold text-gray-500">Date de Fin de Contrat</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-gray-900">
                              {new Date(verificationResult.employee.dateFinContrat).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                            {isContractExpired(verificationResult.employee.dateFinContrat) && (
                              <Badge className="bg-red-600 text-white font-semibold gap-1 flex items-center">
                                <AlertTriangle className="w-3 h-3" />
                                Expiré
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Security Warnings */}
                {!verificationResult.verified && (
                  <Card className="shadow-xl border-2 border-yellow-500 bg-yellow-50">
                    <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100 border-b border-yellow-200">
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        Alerte de Sécurité
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <p className="font-semibold text-yellow-900">⚠️ Attention !</p>
                        <ul className="space-y-2 text-sm text-yellow-800">
                          {!verificationResult.employee ? (
                            <>
                              <li>• Ce badge n'existe pas dans le système</li>
                              <li>• Il pourrait s'agir d'un faux badge</li>
                              <li>• Refusez l'accès et contactez la sécurité</li>
                            </>
                          ) : verificationResult.employee.status && verificationResult.employee.status !== 'ACTIF' ? (
                            <>
                              <li>• L'employé a le statut: {verificationResult.employee.status}</li>
                              <li>• Cet employé n'est plus autorisé à accéder aux locaux</li>
                              <li>• Refusez l'accès et signalez l'incident</li>
                            </>
                          ) : verificationResult.employee.dateFinContrat && new Date(verificationResult.employee.dateFinContrat) < new Date() ? (
                            <>
                              <li>• Le contrat de cet employé a expiré</li>
                              <li>• Date d'expiration: {new Date(verificationResult.employee.dateFinContrat).toLocaleDateString('fr-FR')}</li>
                              <li>• Refusez l'accès et contactez les RH</li>
                            </>
                          ) : (
                            <>
                              <li>• {verificationResult.message || 'Badge invalide'}</li>
                              <li>• Refusez l'accès et contactez la sécurité</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="shadow-xl border-0 bg-white">
                <CardContent className="p-12 text-center">
                  <QrCode className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">En attente de scan</h3>
                  <p className="text-gray-600">
                    Scannez un QR code ou entrez-le manuellement pour vérifier son authenticité
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
