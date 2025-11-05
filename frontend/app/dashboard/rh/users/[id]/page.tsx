"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2, User, Mail, Shield, Clock, FileText, Ban, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/src/hooks/use-toast";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const { toast } = useToast();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.100.171:4003/api';

      const response = await fetch(`${apiUrl}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors du chargement");
      }

      const allUsers = Array.isArray(data.data) ? data.data : data.data?.data || [];
      const foundUser = allUsers.find((u: any) => u.id === params.id);

      if (!foundUser) {
        throw new Error("Utilisateur non trouvé");
      }

      setUser(foundUser);
    } catch (error: any) {
      console.error('Erreur chargement utilisateur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de charger l'utilisateur",
      });
      router.push("/dashboard/rh/users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.prenom} ${user.nom} ?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.100.171:4003/api';

      const response = await fetch(`${apiUrl}/auth/users/${params.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la suppression");
      }

      toast({
        title: "✅ Utilisateur supprimé",
        description: `${user.prenom} ${user.nom} a été supprimé avec succès`,
      });

      router.push("/dashboard/rh/users");
    } catch (error: any) {
      console.error('Erreur suppression:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de supprimer l'utilisateur",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleBlock = async () => {
    const action = user.isBlocked ? "débloquer" : "bloquer";

    if (!window.confirm(`Êtes-vous sûr de vouloir ${action} ${user.prenom} ${user.nom} ?`)) {
      return;
    }

    try {
      setIsToggling(true);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.100.171:4003/api';

      const response = await fetch(`${apiUrl}/auth/users/${params.id}/block`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Erreur lors du ${action}`);
      }

      // Update local state
      setUser((prev: any) => ({
        ...prev,
        isBlocked: !prev.isBlocked,
      }));

      toast({
        title: user.isBlocked ? "🔓 Utilisateur débloqué" : "🔒 Utilisateur bloqué",
        description: `${user.prenom} ${user.nom} a été ${user.isBlocked ? "débloqué" : "bloqué"} avec succès`,
      });
    } catch (error: any) {
      console.error('Erreur toggle block:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || `Impossible de ${action} l'utilisateur`,
      });
    } finally {
      setIsToggling(false);
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b border-[#fff5ed] bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/rh/users">
                <Button variant="ghost" size="icon" className="hover:bg-violet-100">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/30">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
                  Détails de l'Utilisateur
                </h1>
                <p className="text-sm text-gray-600">Informations complètes de l'utilisateur</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href={`/dashboard/rh/users/${params.id}/edit`}>
                <Button className="bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#e67d0f] shadow-lg shadow-[#ff8d13]/30 gap-2">
                  <Edit className="w-4 h-4" />
                  Modifier
                </Button>
              </Link>
              <Button
                variant={user.isBlocked ? "default" : "outline"}
                onClick={handleToggleBlock}
                disabled={isToggling}
                className={`gap-2 ${user.isBlocked ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-yellow-600 text-yellow-600 hover:bg-yellow-50'}`}
              >
                {isToggling ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    {user.isBlocked ? "Déblocage..." : "Blocage..."}
                  </>
                ) : (
                  <>
                    {user.isBlocked ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Débloquer
                      </>
                    ) : (
                      <>
                        <Ban className="w-4 h-4" />
                        Bloquer
                      </>
                    )}
                  </>
                )}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#ff8d13]" />
                  Informations Personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Prénom</p>
                    <p className="text-lg font-bold text-gray-900">{user.prenom}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Nom</p>
                    <p className="text-lg font-bold text-gray-900">{user.nom}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-[#ff8d13]" />
                    <p className="text-sm font-semibold text-gray-500">Email</p>
                  </div>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#ff8d13]" />
                  Informations du Compte
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">Rôle</p>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                    {user.role === 'ADMIN' ? 'Administrateur' : user.role}
                  </Badge>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#ff8d13]" />
                    <p className="text-sm font-semibold text-gray-500">Dernière Connexion</p>
                  </div>
                  <p className="text-gray-900">
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : "Jamais connecté"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Status & Meta */}
          <div className="space-y-6">
            {/* Status Cards */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#ff8d13]" />
                  Statut du Compte
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">État du Compte</p>
                  <Badge className={user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                    {user.isBlocked ? '🔒 Bloqué' : '✅ Actif'}
                  </Badge>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 mb-2">Activité</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <p className="text-sm text-gray-700">
                      {user.isActive ? "En ligne" : "Hors ligne"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50 border-b border-[#fff5ed]">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#ff8d13]" />
                  Métadonnées
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Créé le</p>
                  <p className="text-sm text-gray-700">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Dernière modification</p>
                  <p className="text-sm text-gray-700">
                    {new Date(user.updatedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
