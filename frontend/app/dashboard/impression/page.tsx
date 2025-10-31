"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/src/hooks/use-toast";
import { badgesService } from "@/src/services/badges.service";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Printer, QrCode, CheckCircle, Clock, Download, Building2, Users, Search, X, LogOut, KeyRound, FileText, Image } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import QRCodeLib from "qrcode";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ImpressionPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [badgeRequests, setBadgeRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBadges, setTotalBadges] = useState(0);
  const [limit, setLimit] = useState(10);
  const [badgeStats, setBadgeStats] = useState<any>(null);

  // Filtres
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("TOUS");
  const [filterStatus, setFilterStatus] = useState("TOUS");
  const [dateDemandeDe, setDateDemandeDe] = useState("");
  const [dateDemandeA, setDateDemandeA] = useState("");
  const [dateImpressionDe, setDateImpressionDe] = useState("");
  const [dateImpressionA, setDateImpressionA] = useState("");

  const { toast } = useToast();

  const stats = [
    {
      title: "En Attente",
      value: badgeStats?.pending?.toString() || "0",
      icon: Clock,
      color: "text-[#ff8d13]",
      bgColor: "bg-[#ff8d13]/10",
    },
    {
      title: "Imprimés Aujourd'hui",
      value: badgeStats?.printedToday?.toString() || "0",
      icon: Printer,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total des Impressions",
      value: badgeStats?.printed?.toString() || "0",
      icon: CheckCircle,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  useEffect(() => {
    fetchBadges();
    fetchBadgeStats();
  }, [currentPage, limit, searchQuery, filterType, filterStatus, dateDemandeDe, dateDemandeA, dateImpressionDe, dateImpressionA]);

  const fetchBadgeStats = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.100.171:5000/api';
      const response = await fetch(`${apiUrl}/badges/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setBadgeStats(data.data);
    } catch (error: any) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const fetchBadges = async () => {
    try {
      setIsLoading(true);

      // Construire les paramètres de requête avec filtres
      const params: any = {
        page: currentPage.toString(),
        limit: limit.toString(),
      };

      if (searchQuery) params.search = searchQuery;
      if (filterType !== "TOUS") params.type = filterType;
      if (filterStatus !== "TOUS") params.status = filterStatus;
      if (dateDemandeDe) params.dateDemandeDe = dateDemandeDe;
      if (dateDemandeA) params.dateDemandeA = dateDemandeA;
      if (dateImpressionDe) params.dateImpressionDe = dateImpressionDe;
      if (dateImpressionA) params.dateImpressionA = dateImpressionA;

      const response = await badgesService.getAll(params);

      // La réponse API: { success: true, data: [...], pagination: {...} }
      const badges = response.data || [];

      setBadgeRequests(badges);
      setTotalPages(response.pagination?.pages || 1);
      setTotalBadges(response.pagination?.total || 0);
    } catch (error: any) {
      console.error('Erreur chargement badges:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de charger les badges",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = (badge: any) => {
    setSelectedBadge(badge);
    setIsPreviewOpen(true);
  };

  const handleReprint = async (badge: any) => {
    try {
      // Appeler l'API pour enregistrer la réimpression
      await badgesService.print(badge.id);

      toast({
        title: "✅ Badge réimprimé",
        description: `Le badge de ${badge.employee?.prenom} ${badge.employee?.nom} a été réimprimé avec succès`,
      });

      // Mettre à jour les stats et la liste
      fetchBadgeStats();
      fetchBadges();

      // Créer la fenêtre d'impression avec le badge
      printBadgeDirectly(badge);
    } catch (error: any) {
      console.error("Erreur lors de la réimpression:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de réimprimer le badge",
      });
    }
  };

  const printBadgeDirectly = (badge: any) => {
    if (!badge) return;

    // Ouvrir la page du modèle avec auto-impression
    const printUrl = `/dashboard/impression/badges/${badge.id}/print?autoprint=true`;
    window.open(printUrl, '_blank');
  };

  const getVerifyUrl = (matricule: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return `${baseUrl}/verify?qr=${matricule}`;
  };

  const downloadQRCode = async (badge: any) => {
    try {
      const matricule = badge.qrCode || badge.employee?.matricule || "N/A";
      const url = getVerifyUrl(matricule);

      // Générer le QR code en tant qu'image
      const qrCodeDataUrl = await QRCodeLib.toDataURL(url, {
        width: 500,
        margin: 2,
        errorCorrectionLevel: 'H',
      });

      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = qrCodeDataUrl;
      link.download = `QR-${matricule}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "QR Code téléchargé",
        description: `Le QR code pour ${badge.employee?.prenom} ${badge.employee?.nom} a été téléchargé`,
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement du QR code:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de télécharger le QR code",
      });
    }
  };

  const downloadPhoto = async (badge: any) => {
    try {
      if (!badge.employee?.photo) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Aucune photo disponible pour cet employé",
        });
        return;
      }

      // Obtenir l'URL de base sans /api
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.100.171:4003/api';
      const baseUrl = apiUrl.replace('/api', '');
      const photoUrl = `${baseUrl}${badge.employee.photo}`;

      // Télécharger la photo
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.download = `Photo-${badge.employee?.matricule || 'employee'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Photo téléchargée",
        description: `La photo de ${badge.employee?.prenom} ${badge.employee?.nom} a été téléchargée`,
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement de la photo:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de télécharger la photo",
      });
    }
  };

  const confirmPrint = async () => {
    try {
      // Marquer le badge comme imprimé
      await badgesService.print(selectedBadge.id);

      toast({
        title: "Badge imprimé",
        description: `Le badge de ${selectedBadge.employee?.prenom} ${selectedBadge.employee?.nom} a été marqué comme imprimé`,
      });

      // Rafraîchir la liste des badges et les stats
      fetchBadges();
      fetchBadgeStats();

      // Créer une fenêtre d'impression avec le badge
      printBadgeDirectly(selectedBadge);

      setIsPreviewOpen(false);
    } catch (error: any) {
      console.error("Erreur lors de l'impression:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible d'imprimer le badge",
      });
    }
  };

  const generateBadgeHTML = (badge: any) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Badge - ${badge.employee?.prenom} ${badge.employee?.nom}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #f5f5f5;
              padding: 20px;
            }

            .badge-container {
              display: flex;
              gap: 20px;
              max-width: 1000px;
            }

            .badge-card {
              width: 350px;
              height: 500px;
              background: linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%);
              border-radius: 15px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
              padding: 25px;
              color: white;
              display: flex;
              flex-direction: column;
              position: relative;
              overflow: hidden;
            }

            .badge-card::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -20%;
              width: 200px;
              height: 200px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              filter: blur(40px);
            }

            .badge-header {
              text-align: center;
              padding-bottom: 15px;
              border-bottom: 2px solid rgba(255, 255, 255, 0.3);
              margin-bottom: 20px;
              position: relative;
              z-index: 1;
            }

            .badge-header h1 {
              font-size: 16px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
            }

            .badge-info {
              flex: 1;
              position: relative;
              z-index: 1;
            }

            .info-row {
              display: grid;
              grid-template-columns: 110px 1fr;
              gap: 10px;
              margin-bottom: 12px;
              align-items: center;
            }

            .info-label {
              font-size: 13px;
              opacity: 0.9;
              font-weight: 500;
            }

            .info-value {
              font-size: 14px;
              font-weight: bold;
              word-break: break-word;
            }

            .badge-qr {
              display: flex;
              justify-content: center;
              padding-top: 15px;
              position: relative;
              z-index: 1;
            }

            .qr-container {
              width: 110px;
              height: 110px;
              background: white;
              border-radius: 10px;
              padding: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }

            .qr-container img {
              width: 100%;
              height: 100%;
            }

            .badge-back {
              width: 350px;
              height: 500px;
              background: white;
              border-radius: 15px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
              padding: 25px;
              border: 2px solid #f97316;
            }

            .back-info {
              margin-bottom: 15px;
            }

            .back-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }

            .back-label {
              font-size: 13px;
              font-weight: 600;
              color: #6b7280;
            }

            .back-value {
              font-size: 13px;
              font-weight: bold;
              color: #111827;
              font-family: monospace;
            }

            .info-box {
              margin-top: 20px;
              padding: 15px;
              background: #dbeafe;
              border-radius: 8px;
              border-left: 4px solid #3b82f6;
            }

            .info-box h3 {
              font-size: 12px;
              font-weight: bold;
              color: #1e40af;
              margin-bottom: 8px;
            }

            .info-box p {
              font-size: 11px;
              color: #1e3a8a;
              line-height: 1.5;
            }

            @media print {
              body {
                background: white;
              }

              .badge-container {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="badge-container">
            <!-- Badge Recto -->
            <div class="badge-card">
              <div class="badge-header">
                <h1>${getBadgeTitle(badge.employee?.type)}</h1>
              </div>

              <div class="badge-info">
                <div class="info-row">
                  <span class="info-label">NOM:</span>
                  <span class="info-value">${badge.employee?.nom || ''}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">PRENOM:</span>
                  <span class="info-value">${badge.employee?.prenom || ''}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">FONCTION:</span>
                  <span class="info-value">${badge.employee?.fonction || ''}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">MATRICULE:</span>
                  <span class="info-value">${badge.employee?.matricule || ''}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">TEL:</span>
                  <span class="info-value">+224669611681</span>
                </div>
                <div class="info-row">
                  <span class="info-label">EMAIL:</span>
                  <span class="info-value" style="font-size: 11px;">contact@dsdguinee.com</span>
                </div>
              </div>

              <div class="badge-qr">
                <div class="qr-container">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&ecc=H&margin=20&data=${encodeURIComponent((process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') + '/verify?qr=' + (badge.qrCode || badge.employee?.matricule || 'N/A'))}" alt="QR Code" />
                </div>
              </div>
            </div>

            <!-- Badge Verso -->
            <div class="badge-back">
              <h2 style="text-align: center; color: #f97316; margin-bottom: 20px; font-size: 18px;">Informations du Badge</h2>

              <div class="back-info">
                <div class="back-row">
                  <span class="back-label">Matricule:</span>
                  <span class="back-value">${badge.employee?.matricule || ''}</span>
                </div>
                <div class="back-row">
                  <span class="back-label">Fonction:</span>
                  <span class="back-value">${badge.employee?.fonction || ''}</span>
                </div>
                <div class="back-row">
                  <span class="back-label">Téléphone:</span>
                  <span class="back-value">+224669611681</span>
                </div>
                <div class="back-row">
                  <span class="back-label">Code QR:</span>
                  <span class="back-value">${badge.qrCode}</span>
                </div>
              </div>

              <div class="info-box">
                <h3>À propos du Code QR</h3>
                <p>
                  Le code QR permet de vérifier instantanément si l'employé travaille toujours dans l'entreprise
                  et si son contrat est valide. Scannez-le pour voir le statut en temps réel.
                </p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center;">
                <p style="font-size: 11px; color: #6b7280;">RH Management DSD Guinée</p>
                <p style="font-size: 10px; color: #9ca3af; margin-top: 5px;">Système de gestion des employés</p>
              </div>
            </div>
          </div>

          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                window.onafterprint = () => window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `;
  };

  const getBadgeTitle = (type: string) => {
    const titles: Record<string, string> = {
      PERSONNELS_DSD: "PERSONNELS DSD GUINEE",
      DNTT: "DNTT",
      STAGIAIRES_DSD: "STAGIAIRES DSD GUINEE",
      BANQUES: "BANQUES",
      MAISONS_PLAQUE: "MAISONS DE PLAQUE",
      DNTT_STAGIAIRES: "DNTT STAGIAIRES",
      DEMARCHEURS: "COLLECTIF DES DEMARCHEURS",
    };
    return titles[type] || type;
  };

  const getStatusBadge = (status: string, printCount?: number) => {
    const variants: Record<string, { label: string; className: string }> = {
      EN_ATTENTE: {
        label: "En attente",
        className: "bg-[#ff8d13] text-white font-semibold",
      },
      IMPRIME: {
        label: printCount && printCount > 1 ? `Badge réimprimé${printCount > 2 ? `(${printCount - 2})` : ""}` : "Badge imprimé",
        className: "bg-green-500 text-white font-semibold",
      },
      REIMPRESSION: {
        label: "Autorisé pour réimpression",
        className: "bg-blue-500 text-white font-semibold",
      },
    };
    const variant = variants[status] || variants.EN_ATTENTE;
    return (
      <Badge className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeLabels: Record<string, string> = {
      PERSONNELS_DSD: "Personnels DSD",
      DNTT: "DNTT",
      STAGIAIRES_DSD: "Stagiaires DSD",
      BANQUES: "Banques",
      MAISONS_PLAQUE: "Maisons de Plaque",
      DNTT_STAGIAIRES: "DNTT Stagiaires",
      DEMARCHEURS: "Démarcheurs",
    };

    const colors: Record<string, string> = {
      PERSONNELS_DSD: "bg-[#ff8d13]",
      DNTT: "bg-blue-600",
      STAGIAIRES_DSD: "bg-green-600",
      BANQUES: "bg-purple-600",
      MAISONS_PLAQUE: "bg-pink-600",
      DNTT_STAGIAIRES: "bg-teal-600",
      DEMARCHEURS: "bg-amber-600",
    };

    return (
      <Badge className={`${colors[type] || "bg-gray-600"} text-white font-semibold`}>
        {typeLabels[type] || type}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#fff5ed]">
      {/* Header */}
      <header className="border-b border-[#fff5ed] bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/impression">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/30 cursor-pointer hover:shadow-xl transition-all">
                  <Printer className="w-6 h-6 text-white" />
                </div>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">Service d&apos;Impression</h1>
                <p className="text-sm text-gray-600">Gestion des badges employés</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user?.role === 'ADMIN' && (
                <>
                  <Link href="/dashboard/rh">
                    <Button variant="outline" className="border-[#fed7aa] hover:bg-[#fff5ed]">
                      <Building2 className="w-4 h-4 mr-2" />
                      Dashboard RH
                    </Button>
                  </Link>
                  <Link href="/dashboard/rh/employees">
                    <Button variant="outline" className="border-[#fed7aa] hover:bg-[#fff5ed]">
                      <Users className="w-4 h-4 mr-2" />
                      Employés
                    </Button>
                  </Link>
                </>
              )}
              {user?.role === 'IMPRESSION' && (
                <>
                  <Link href="/change-password">
                    <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                      <KeyRound className="w-4 h-4 mr-2" />
                      Changer mot de passe
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
                        logout();
                      }
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden group">
              <CardContent className="p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fff5ed]/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600">{stat.title}</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-4 rounded-2xl shadow-lg`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filtres */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Recherche et filtres principaux */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Barre de recherche */}
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Rechercher un employé..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-[#fed7aa] focus:border-[#ff8d13]"
                  />
                </div>

                {/* Filtre par type */}
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="border-[#fed7aa]">
                    <SelectValue placeholder="Type d'employé" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-[300px]">
                    <SelectItem value="TOUS" className="text-base font-semibold py-3 cursor-pointer hover:bg-[#fff5ed]">Tous les types</SelectItem>
                    <SelectItem value="PERSONNELS_DSD" className="text-base font-semibold py-3 cursor-pointer hover:bg-[#fff5ed]">Personnels DSD</SelectItem>
                    <SelectItem value="DNTT" className="text-base font-semibold py-3 cursor-pointer hover:bg-blue-50">DNTT</SelectItem>
                    <SelectItem value="STAGIAIRES_DSD" className="text-base font-semibold py-3 cursor-pointer hover:bg-green-50">Stagiaires DSD</SelectItem>
                    <SelectItem value="BANQUES" className="text-base font-semibold py-3 cursor-pointer hover:bg-purple-50">Banques</SelectItem>
                    <SelectItem value="MAISONS_PLAQUE" className="text-base font-semibold py-3 cursor-pointer hover:bg-pink-50">Maisons de Plaque</SelectItem>
                    <SelectItem value="DNTT_STAGIAIRES" className="text-base font-semibold py-3 cursor-pointer hover:bg-teal-50">DNTT Stagiaires</SelectItem>
                    <SelectItem value="DEMARCHEURS" className="text-base font-semibold py-3 cursor-pointer hover:bg-amber-50">Démarcheurs</SelectItem>
                  </SelectContent>
                </Select>

                {/* Filtre par statut de badge */}
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="border-[#fed7aa]">
                    <SelectValue placeholder="Statut du badge" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="TOUS" className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">Tous les statuts</SelectItem>
                    <SelectItem value="EN_ATTENTE" className="text-base font-semibold py-3 cursor-pointer hover:bg-orange-50">En attente</SelectItem>
                    <SelectItem value="REIMPRESSION" className="text-base font-semibold py-3 cursor-pointer hover:bg-blue-50">Autorisé pour réimpression</SelectItem>
                    <SelectItem value="IMPRIME" className="text-base font-semibold py-3 cursor-pointer hover:bg-green-50">Imprimé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtres par date */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date demande (De)
                  </label>
                  <Input
                    type="date"
                    value={dateDemandeDe}
                    onChange={(e) => setDateDemandeDe(e.target.value)}
                    className="border-[#fed7aa]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date demande (À)
                  </label>
                  <Input
                    type="date"
                    value={dateDemandeA}
                    onChange={(e) => setDateDemandeA(e.target.value)}
                    className="border-[#fed7aa]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date impression (De)
                  </label>
                  <Input
                    type="date"
                    value={dateImpressionDe}
                    onChange={(e) => setDateImpressionDe(e.target.value)}
                    className="border-[#fed7aa]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date impression (À)
                  </label>
                  <Input
                    type="date"
                    value={dateImpressionA}
                    onChange={(e) => setDateImpressionA(e.target.value)}
                    className="border-[#fed7aa]"
                  />
                </div>
              </div>

              {/* Bouton de réinitialisation */}
              {(searchQuery || filterType !== "TOUS" || filterStatus !== "TOUS" || dateDemandeDe || dateDemandeA || dateImpressionDe || dateImpressionA) && (
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterType("TOUS");
                      setFilterStatus("TOUS");
                      setDateDemandeDe("");
                      setDateDemandeA("");
                      setDateImpressionDe("");
                      setDateImpressionA("");
                    }}
                    className="gap-2 border-[#fed7aa] hover:bg-[#fff5ed]"
                  >
                    <X className="w-4 h-4" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Badge Requests Table */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#fff5ed]/50 to-amber-50/50 border-b border-[#fff5ed]">
            <CardTitle className="text-2xl font-bold text-gray-900">Demandes d&apos;Impression</CardTitle>
            <CardDescription className="text-gray-600">Gérer et imprimer les badges des employés</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#fff5ed] hover:bg-[#fff5ed]/50">
                    <TableHead className="font-bold text-gray-700">Employé</TableHead>
                    <TableHead className="font-bold text-gray-700">Type</TableHead>
                    <TableHead className="font-bold text-gray-700">Code QR</TableHead>
                    <TableHead className="font-bold text-gray-700">Date Demande</TableHead>
                    <TableHead className="font-bold text-gray-700">Date Impression</TableHead>
                    <TableHead className="font-bold text-gray-700">Statut</TableHead>
                    <TableHead className="text-right font-bold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex justify-center items-center gap-2">
                          <div className="w-6 h-6 border-2 border-[#ff8d13] border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-gray-600">Chargement...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : badgeRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Aucune demande d&apos;impression en attente
                      </TableCell>
                    </TableRow>
                  ) : (
                    badgeRequests.map((request) => (
                    <TableRow key={request.id} className="border-b border-[#fff5ed] hover:bg-[#fff5ed]/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 ring-2 ring-[#fed7aa]">
                            <AvatarFallback className="bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] text-white font-bold text-sm">
                              {request.employee?.prenom?.[0]}{request.employee?.nom?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-gray-900">{request.employee?.prenom} {request.employee?.nom}</p>
                            <p className="text-sm text-gray-500">{request.employee?.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(request.employee?.type)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-[#ff8d13]" />
                          <span className="text-sm font-mono font-medium text-gray-700">{request.qrCode}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-gray-700">
                        {request.requestDate ? new Date(request.requestDate).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-gray-700">
                        {request.printDate ? new Date(request.printDate).toLocaleDateString() : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status, request.printCount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          {request.status === "REIMPRESSION" ? (
                            <Link href={`/dashboard/impression/badges/${request.id}/print`}>
                              <Button
                                size="sm"
                                className="gap-2 bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-md"
                              >
                                <Printer className="w-4 h-4" />
                                Réimprimer
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              size="sm"
                              className="gap-2 bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-md"
                              disabled={request.status === "IMPRIME"}
                              onClick={() => {
                                if (request.status === "EN_ATTENTE") {
                                  window.location.href = `/dashboard/impression/badges/${request.id}/print`;
                                }
                              }}
                            >
                              <Printer className="w-4 h-4" />
                              {request.status === "EN_ATTENTE" ? "Imprimer" : request.status === "IMPRIME" ? "Imprimé" : "Réimprimer"}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 border-green-200 hover:bg-green-50 text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => downloadQRCode(request)}
                            title="Télécharger le QR code"
                            disabled={request.status === "IMPRIME"}
                          >
                            <Download className="w-4 h-4" />
                            QR Code
                          </Button>
                          {request.employee?.photo && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2 border-blue-200 hover:bg-blue-50 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => downloadPhoto(request)}
                              title="Télécharger la photo"
                              disabled={request.status === "IMPRIME"}
                            >
                              <Image className="w-4 h-4" />
                              Photo
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
            {!isLoading && badgeRequests.length > 0 && (
              <div className="mt-6 flex items-center justify-between border-t border-[#fff5ed] pt-4 px-6 pb-6">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{totalBadges}</span> badge(s) au total
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
      </main>

      {/* Badge Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu du Badge</DialogTitle>
            <DialogDescription>Vérifiez les informations avant l&apos;impression</DialogDescription>
          </DialogHeader>

          {selectedBadge && (
            <div className="space-y-4">
              {/* Badge Card Preview */}
              <div className="relative w-full h-[320px] bg-gradient-to-br from-[#ff8d13] via-[#ff8d13] to-[#ff8d13] rounded-2xl shadow-2xl p-5 text-white overflow-hidden flex flex-col">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12 blur-2xl"></div>
                </div>

                {/* QR Code en haut à droite */}
                <div className="absolute top-5 right-5 z-10 flex flex-col items-center gap-2">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-xl p-2">
                    <QRCodeSVG
                      value={getVerifyUrl(selectedBadge.qrCode || selectedBadge.employee?.matricule || "N/A")}
                      size={84}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <button
                    onClick={() => downloadQRCode(selectedBadge)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white text-[#ff8d13] rounded-lg text-xs font-semibold shadow-md hover:bg-[#fff5ed] transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Télécharger
                  </button>
                </div>

                {/* Content */}
                <div className="relative flex flex-col h-full">
                  {/* Header */}
                  <div className="text-center pb-3 border-b border-white/30 flex-shrink-0 pr-32">
                    <p className="text-base font-bold uppercase tracking-wide">
                      {selectedBadge.employee?.type === "PERSONNELS_DSD" && "PERSONNELS DSD GUINEE"}
                      {selectedBadge.employee?.type === "DNTT" && "DNTT"}
                      {selectedBadge.employee?.type === "STAGIAIRES_DSD" && "STAGIAIRES DSD GUINEE"}
                      {selectedBadge.employee?.type === "BANQUES" && "BANQUES"}
                      {selectedBadge.employee?.type === "MAISONS_PLAQUE" && "MAISONS DE PLAQUE"}
                      {selectedBadge.employee?.type === "DNTT_STAGIAIRES" && "DNTT STAGIAIRES"}
                      {selectedBadge.employee?.type === "DEMARCHEURS" && "COLLECTIF DES DEMARCHEURS"}
                    </p>
                  </div>

                  {/* Employee Info */}
                  <div className="space-y-1.5 text-sm mt-3 flex-grow">
                    <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                      <span className="opacity-90 font-medium">NOM:</span>
                      <span className="font-bold">{selectedBadge.employee?.nom}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                      <span className="opacity-90 font-medium">PRENOM:</span>
                      <span className="font-bold">{selectedBadge.employee?.prenom}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                      <span className="opacity-90 font-medium">FONCTION:</span>
                      <span className="font-bold">{selectedBadge.employee?.fonction}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                      <span className="opacity-90 font-medium">MATRICULE:</span>
                      <span className="font-bold">{selectedBadge.employee?.matricule}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                      <span className="opacity-90 font-medium">TEL:</span>
                      <span className="font-bold">+224669611681</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                      <span className="opacity-90 font-medium">EMAIL:</span>
                      <span className="font-bold text-xs break-all">contact@dsdguinee.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Details */}
              <div className="w-full h-[280px] flex flex-col p-5 bg-white rounded-2xl border-2 border-[#fed7aa] shadow-2xl overflow-auto">
                <div className="space-y-3 flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Matricule:</span>
                    <span className="text-sm font-mono font-bold text-gray-900">{selectedBadge.employee?.matricule}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Fonction:</span>
                    <span className="text-sm font-bold text-gray-900">{selectedBadge.employee?.fonction}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Téléphone:</span>
                    <span className="text-sm font-bold text-gray-900">+224669611681</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Code QR:</span>
                    <span className="text-sm font-mono font-bold text-gray-900">{selectedBadge.qrCode}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t-2 border-[#fed7aa] flex-shrink-0">
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-blue-900 mb-1">À propos du Code QR</p>
                      <p className="text-xs text-blue-800">
                        Le code QR permet de vérifier instantanément si l&apos;employé travaille toujours dans l&apos;entreprise
                        et si son contrat est valide. Scannez-le pour voir le statut en temps réel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  Annuler
                </Button>
                <Button className="flex-1 gap-2 bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg" onClick={confirmPrint}>
                  <Printer className="w-4 h-4" />
                  Confirmer et Imprimer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}