"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { badgesService } from "@/src/services/badges.service";
import { getImageUrl } from "@/src/constants";
import Image from "next/image";
export default function PrintBadgePage() {
  const params = useParams();
  const router = useRouter();
  const badgeId = params.id as string;

  const [badge, setBadge] = useState<any>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Détecter si on doit imprimer automatiquement
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const shouldAutoPrint = searchParams?.get('autoprint') === 'true';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Reset state before fetching
    setBadge(null);
    setQrCodeImage("");
    fetchBadgeData();
  }, [badgeId, mounted]);

  // Auto-impression si demandée
  useEffect(() => {
    if (shouldAutoPrint && badge && qrCodeImage && !isLoading) {
      // Marquer comme imprimé puis imprimer
      const autoPrintBadge = async () => {
        try {
          await badgesService.print(badgeId);
          console.log('✅ Badge marqué comme imprimé (auto-print)');

          // Petit délai pour s'assurer que tout est bien rendu
          setTimeout(() => {
            window.print();
          }, 500);
        } catch (error) {
          console.error('❌ Erreur auto-print:', error);
        }
      };

      const timer = setTimeout(autoPrintBadge, 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldAutoPrint, badge, qrCodeImage, isLoading, badgeId]);

  const fetchBadgeData = async () => {
    try {
      setIsLoading(true);
      // Récupérer les données du badge
      const badgeResponse = await badgesService.getById(badgeId);

      if (badgeResponse.success && badgeResponse.data) {
        setBadge(badgeResponse.data);
      }

      // Récupérer l'image du QR code
      const qrResponse = await badgesService.getQRCode(badgeId);
      if (qrResponse.success && qrResponse.data) {
        setQrCodeImage(qrResponse.data.image);
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = async () => {
    try {
      // Marquer le badge comme imprimé dans la base de données
      await badgesService.print(badgeId);
      console.log('✅ Badge marqué comme imprimé');

      // Ouvrir la fenêtre d'impression
      window.print();
    } catch (error) {
      console.error('❌ Erreur lors de l\'impression:', error);
      alert('Erreur lors de l\'impression du badge. Veuillez réessayer.');
    }
  };

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du badge...</p>
        </div>
      </div>
    );
  }

  if (!badge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Badge non trouvé</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const employee = badge?.employee;

  // Si employee est un string (ID) plutôt qu'un objet, on a un problème
  if (!employee || typeof employee === 'string') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Erreur: Données de l'employé non chargées</p>
          <p className="text-gray-600 mb-4">Type: {typeof employee}</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barre d'actions (cachée à l'impression) */}
      <div className="no-print bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Badge de {employee?.prenom} {employee?.nom}
                </h1>
                <p className="text-sm text-gray-600">Matricule: {employee?.matricule}</p>
              </div>
            </div>
            <Button onClick={handlePrint} className="bg-orange-600 hover:bg-orange-700">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </Button>
          </div>
        </div>
      </div>

      {/* ========== CONTENU À IMPRIMER ========== */}
      <div className="print-container py-8">

        {/* ========== RECTO DU BADGE ========== */}
        <div className="badge-page mb-8">
          {/*
            Conteneur principal du badge
            - TAILLE EXACTE DE L'IMAGE : 661px x 1016px
            - Position relative pour permettre le positionnement absolu des éléments enfants
          */}
          <div className="badge-card" style={{
            position: "relative",
            width: "661px",
            height: "1016px",
            overflow: "hidden",
            border: "2px solid #333",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
          }}>

            {/*
              IMAGE DE FOND - badgeRecto.jpeg
              - Position absolue pour couvrir tout le conteneur
              - zIndex: 1 (couche la plus basse)
            */}
            <img
              src="/images/badgeRecto.jpeg"
              alt="Badge Recto"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1
              }}
            />

            {/*
              ZONE DE CONTENU - Positionnement précis selon l'image badgeRecto.jpeg
              - Position absolue pour placer les éléments aux emplacements exacts
              - zIndex: 2 (au-dessus de l'image de fond)
            */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2
            }}>

              {/*
                1. PHOTO - Rectangle central
                - Position selon l'image : rectangle au centre, en haut
                - Dimensions exactes selon le rectangle sur l'image
                - Affiche la photo dynamique de l'employé
              */}
              <div style={{
                position: "absolute",
                top: "258px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "226px",
                height: "246px",
                border: "2px solid #000",
                overflow: "hidden",
                backgroundColor: "#f0f0f0"
              }}>
                {employee?.photo && getImageUrl(employee.photo) ? (
                  <img
                    src={getImageUrl(employee.photo) || ''}
                    alt={`${employee?.prenom} ${employee?.nom}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    onError={(e) => {
                      // Masquer l'image en cas d'erreur et afficher les initiales
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                {(!employee?.photo || !getImageUrl(employee.photo)) && (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "80px",
                    fontWeight: "bold",
                    color: "#999",
                    backgroundColor: "#e5e7eb"
                  }}>
                    {employee?.prenom?.[0]}{employee?.nom?.[0]}
                  </div>
                )}
              </div>

              {/*
                2. NOM ET PRÉNOM - Remplace le texte "Nom et prenom" sur l'image
                - Position exacte pour couvrir le texte de l'image
                - Fond blanc OPAQUE pour bien masquer le texte de l'image
                - Police très grande et grasse comme sur l'image
              */}
              <div style={{
                position: "absolute",
                top: "510px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                padding: "10px 0"
              }}>
                <p style={{
                  fontSize: "48px",
                  fontWeight: "900",
                  color: "#000",
                  margin: 0,
                  textTransform: "capitalize",
                  letterSpacing: "2px",
                  lineHeight: "1.2"
                }}>
                  {employee?.prenom} {employee?.nom}
                </p>
              </div>

              {/*
                3. TYPE D'EMPLOYÉ - Remplace "Colletif des démarcheurs" sur l'image
                - Position exacte pour couvrir le texte orange de l'image
                - Fond blanc OPAQUE pour bien masquer le texte de l'image
                - Police orange comme sur l'image
              */}
              <div style={{
                position: "absolute",
                top: "588px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                padding: "8px 0"
              }}>
                {employee?.type === "PERSONNEL_DSD" && (
                  <p style={{
                    fontSize: "42px",
                    fontWeight: "400",
                    color: "#ff8d13",
                    margin: 0,
                    fontStyle: "italic"
                  }}>Personnel DSD Guinée</p>
                )}
                {employee?.type === "DNTT" && (
                  <p style={{
                    fontSize: "42px",
                    fontWeight: "400",
                    color: "#ff8d13",
                    margin: 0,
                    fontStyle: "italic"
                  }}>DNTT</p>
                )}
                {employee?.type === "STAGIAIRE_DSD" && (
                  <p style={{
                    fontSize: "42px",
                    fontWeight: "400",
                    color: "#ff8d13",
                    margin: 0,
                    fontStyle: "italic"
                  }}>Stagiaire DSD Guinée</p>
                )}
                {employee?.type === "BANQUE" && (
                  <div style={{ lineHeight: "1.2" }}>
                    <p style={{
                      fontSize: "42px",
                      fontWeight: "400",
                      color: "#ff8d13",
                      margin: 0,
                      fontStyle: "italic"
                    }}>Banque</p>
                    {employee?.sousType && (
                      <p style={{
                        fontSize: "36px",
                        fontWeight: "700",
                        color: "#ff8d13",
                        margin: 0,
                        fontStyle: "italic"
                      }}>{employee.sousType}</p>
                    )}
                  </div>
                )}
                {employee?.type === "EMBOUTISSEUR" && (
                  <div style={{ lineHeight: "1.2" }}>
                    <p style={{
                      fontSize: "42px",
                      fontWeight: "400",
                      color: "#ff8d13",
                      margin: 0,
                      fontStyle: "italic"
                    }}>Emboutisseur</p>
                    {employee?.sousType && (
                      <p style={{
                        fontSize: "36px",
                        fontWeight: "700",
                        color: "#ff8d13",
                        margin: 0,
                        fontStyle: "italic"
                      }}>{employee.sousType}</p>
                    )}
                  </div>
                )}
                {employee?.type === "DNTT_STAGIAIRE" && (
                  <p style={{
                    fontSize: "42px",
                    fontWeight: "400",
                    color: "#ff8d13",
                    margin: 0,
                    fontStyle: "italic"
                  }}>DNTT Stagiaire</p>
                )}
                {employee?.type === "DEMARCHEUR" && (
                  <p style={{
                    fontSize: "42px",
                    fontWeight: "400",
                    color: "#ff8d13",
                    margin: 0,
                    fontStyle: "italic"
                  }}>Collectif des démarcheurs</p>
                )}
              </div>

              {/*
                4. MATRICULE (ID) - En bas à gauche
                - Position : EXACTEMENT sur la même ligne que "ID"
                - Aligné horizontalement avec "ID"
                - COULEUR NOIRE
              */}
              <div style={{
                position: "absolute",
                top: "665px",
                left: "170px"
              }}>
                <p style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  color: "#000",
                  margin: 0,
                  lineHeight: "1"
                }}>
                  {employee?.matricule}
                </p>
              </div>

              {/*
                5. TÉLÉPHONE - Sous le matricule
                - Position : EXACTEMENT sur la même ligne que l'icône téléphone
                - Aligné horizontalement avec l'icône téléphone
                - NUMÉRO COMMUN À TOUS LES EMPLOYÉS
                - COULEUR NOIRE
              */}
              <div style={{
                position: "absolute",
                top: "730px",
                left: "170px"
              }}>
                <p style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  color: "#000",
                  margin: 0,
                  lineHeight: "1"
                }}>
                  +224669611681
                </p>
              </div>

              {/*
                6. EMAIL - Sous le téléphone
                - Position : EXACTEMENT sur la même ligne que l'icône email
                - Aligné horizontalement avec l'icône email
                - EMAIL COMMUN À TOUS LES EMPLOYÉS
                - COULEUR NOIRE
              */}
              <div style={{
                position: "absolute",
                top: "810px",
                left: "170px",
                maxWidth: "430px"
              }}>
                <p style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  color: "#000",
                  margin: 0,
                  lineHeight: "1",
                  wordBreak: "break-all"
                }}>
                  info@dsdguinee.com
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ========== VERSO DU BADGE ========== */}
        <div className="badge-page">
          {/*
            Conteneur principal du VERSO
            - TAILLE EXACTE DE L'IMAGE : 661px x 1016px
            - Position relative pour permettre le positionnement absolu des éléments enfants
          */}
          <div className="badge-card" style={{
            position: "relative",
            width: "661px",
            height: "1016px",
            overflow: "hidden",
            border: "2px solid #333",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
          }}>

            {/*
              IMAGE DE FOND - badgeVerso.jpeg
              - Position absolue pour couvrir tout le conteneur
              - zIndex: 1 (couche la plus basse)
            */}
            <img
              src="/images/badgeVerso.jpeg"
              alt="Badge Verso"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1
              }}
            />

            {/*
              ZONE DE CONTENU - Positionnement du QR code dynamique
              - Position absolue pour placer le QR code à l'emplacement exact
              - zIndex: 2 (au-dessus de l'image de fond)
            */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2
            }}>

              {/*
                QR CODE DYNAMIQUE - Masque le QR code statique de l'image
                - Position : exactement à l'emplacement du QR code sur l'image
                - Fond blanc pour masquer le QR code statique
              */}
              {qrCodeImage && (
                <div style={{
                  position: "absolute",
                  top: "668px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#FFFFFF",
                  padding: "10px"
                }}>
                  <img
                    src={qrCodeImage}
                    alt="QR Code"
                    width="240"
                    height="240"
                    style={{
                      display: "block"
                    }}
                  />
                </div>
              )}

              {/*
                ADRESSE (Icône localisation) - En haut à gauche
                - Position : à droite de l'icône localisation
                - Texte noir
              */}
              <div style={{
                position: "absolute",
                top: "330px",
                left: "150px"
              }}>
                <p style={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#000",
                  margin: 0,
                  lineHeight: "1"
                }}>
                  Conakry, Guinée
                </p>
              </div>

              {/*
                TÉLÉPHONE (Icône téléphone) - Sous l'adresse
                - Position : à droite de l'icône téléphone
                - NUMÉRO COMMUN À TOUS LES EMPLOYÉS
              */}
              <div style={{
                position: "absolute",
                top: "400px",
                left: "150px"
              }}>
                <p style={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#000",
                  margin: 0,
                  lineHeight: "1"
                }}>
                  +224 623 41 87 95
                </p>
              </div>

              {/*
                SITE WEB (Icône globe) - Sous le téléphone
                - Position : à droite de l'icône globe
                - ADRESSE WEB COMMUNE À TOUS LES EMPLOYÉS
              */}
              <div style={{
                position: "absolute",
                top: "480px",
                left: "150px"
              }}>
                <p style={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#000",
                  margin: 0,
                  lineHeight: "1"
                }}>
                  www.dsdguinee.com
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Styles d'impression */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            width: 100% !important;
            height: 100% !important;
          }

          .print-container {
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }

          .badge-page {
            page-break-after: always;
            page-break-inside: avoid;
            break-after: page;
            break-inside: avoid;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100vw !important;
            height: 100vh !important;
            position: relative !important;
          }

          .badge-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .badge-card {
            box-shadow: none !important;
            border: 2px solid #333 !important;
            overflow: hidden !important;
            border-radius: 0 !important;
            position: relative !important;
            width: 661px !important;
            height: 1016px !important;
            transform: none !important;
          }

          .badge-card img {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        @media screen {
          .print-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .badge-page {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }

          .badge-card {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden !important;
          }
        }
      `}</style>
    </div>
  );
}
