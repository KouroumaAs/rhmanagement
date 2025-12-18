"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, Building2, TrendingUp, Clock, AlertCircle, Printer, Settings, LogOut, Activity, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { dashboardService } from "@/src/services/dashboard.service";
import { useToast } from "@/src/hooks/use-toast";
import { useAuth } from "@/src/contexts/AuthContext";

export default function DashboardRH() {
  console.log('🎯 DashboardRH component loaded');
  const [isLoading, setIsLoading] = useState(true);
  const { logout, user } = useAuth();
  console.log('👤 User from context:', user);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    personnelsDSD: 0,
    demarcheurs: 0,
    badgesEnAttente: 0,
    contractsExpiring: 0,
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });
  const [recentEmployees, setRecentEmployees] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    console.log('📊 useEffect - Starting to fetch dashboard data');
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    console.log('🔄 fetchDashboardData called');
    try {
      setIsLoading(true);
      console.log('⏳ isLoading set to true');
      const response = await dashboardService.getStats();
      console.log('✅ getStats response:', response);
      const data = response.data;

      console.log('Dashboard data:', data);
      console.log('Users data:', data.users);
      console.log('Recent users:', data.users?.recent);

      // Calculate stats with safe defaults
      const byType = data.employees?.byType || [];
      const personnelsDSD = byType.find((t: any) => t._id === 'PERSONNELS_DSD')?.count || 0;
      const demarcheurs = byType.find((t: any) => t._id === 'DEMARCHEURS')?.count || 0;

      // Calculate contracts expiring soon (30 days)
      const contractsExpiring = 0; // TODO: Implement logic

      setStats({
        totalEmployees: data.employees?.total || 0,
        activeEmployees: data.employees?.active || 0,
        personnelsDSD,
        demarcheurs,
        badgesEnAttente: data.badges?.enAttente || 0,
        contractsExpiring,
        totalUsers: data.users?.total || 0,
        activeUsers: data.users?.active || 0,
        inactiveUsers: data.users?.inactive || 0,
      });

      // Limit to 2 most recent items
      setRecentEmployees((data.employees?.recent || []).slice(0, 2));
      setRecentUsers((data.users?.recent || []).slice(0, 2));
    } catch (error: any) {
      console.error('❌ Erreur chargement dashboard:', error);
      console.error('❌ Error details:', error.message, error.stack);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de charger les données du dashboard",
      });
    } finally {
      console.log('✔️ Finally block - setting isLoading to false');
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total Employés",
      value: stats.totalEmployees.toString(),
      change: `${stats.activeEmployees} actifs`,
      icon: Users,
      color: "text-[#ff8d13]",
      bgColor: "bg-[#ff8d13]/10",
    },
    {
      title: "Personnels DSD",
      value: stats.personnelsDSD.toString(),
      change: `${((stats.personnelsDSD / stats.totalEmployees) * 100 || 0).toFixed(0)}% du total`,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
    },
    {
      title: "Démarcheurs",
      value: stats.demarcheurs.toString(),
      change: `${((stats.demarcheurs / stats.totalEmployees) * 100 || 0).toFixed(0)}% du total`,
      icon: TrendingUp,
      color: "text-amber-600",
      bgColor: "bg-amber-600/10",
    },
    {
      title: "Badges en Attente",
      value: stats.badgesEnAttente.toString(),
      change: "À imprimer",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      ACTIF: { label: "Actif", className: "bg-green-500 text-white font-semibold" },
      EN_ATTENTE: { label: "En attente", className: "bg-orange-500 text-white font-semibold" },
      INACTIF: { label: "Inactif", className: "bg-gray-500 text-white font-semibold" },
    };
    const variant = variants[status] || variants.INACTIF;
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

  console.log('🎨 Rendering - isLoading:', isLoading);

  if (isLoading) {
    console.log('⏳ Rendering loading screen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  console.log('✅ Rendering dashboard content');
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b border-[#fff5ed] bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/rh">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff8d13]/30 cursor-pointer hover:shadow-xl transition-all">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">Dashboard RH</h1>
                <p className="text-sm text-gray-600">Gestion des ressources humaines</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard/rh/employees">
                <Button variant="outline" className="border-[#fed7aa] hover:bg-[#fff5ed]">
                  <Users className="w-4 h-4 mr-2" />
                  Employés
                </Button>
              </Link>
              {user?.role === 'ADMIN' && (
                <Link href="/dashboard/impression">
                  <Button variant="outline" className="border-[#fed7aa] hover:bg-[#fff5ed]">
                    <Printer className="w-4 h-4 mr-2" />
                    Impression
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden group">
              <CardContent className="p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600">{stat.title}</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">{stat.value}</p>
                    <p className="text-xs text-gray-500 font-medium">{stat.change}</p>
                  </div>
                  <div className={`${stat.bgColor} p-4 rounded-2xl shadow-lg`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Employees */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-[#fff5ed] bg-gradient-to-r from-orange-50/50 to-amber-50/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Employés Récents</CardTitle>
                <CardDescription className="text-gray-600">Les derniers enregistrements effectués</CardDescription>
              </div>
              <Link href="/dashboard/rh/employees">
                <Button variant="outline" className="border-[#fed7aa] hover:bg-[#fff5ed]">Voir tout</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {recentEmployees.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">Aucun employé enregistré</p>
                  <p className="text-sm text-gray-400 mt-2">Commencez par ajouter votre premier employé</p>
                </div>
              ) : (
                recentEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-[#fff5ed] bg-white hover:shadow-md hover:border-[#fed7aa] transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14 ring-2 ring-orange-100 group-hover:ring-orange-300 transition-all">
                        <AvatarFallback className="bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] text-white font-bold text-lg">
                          {employee.prenom?.[0]}{employee.nom?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-gray-900">{employee.prenom} {employee.nom}</p>
                        <p className="text-sm text-gray-500">{employee.telephone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getTypeBadge(employee.type)}
                      {getStatusBadge(employee.status)}
                      <p className="text-sm text-gray-500 w-24 text-right font-medium">
                        {new Date(employee.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Users Section - ADMIN ONLY */}
        {user?.role === 'ADMIN' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Stats Cards */}
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-green-100 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-green-600" />
                    Utilisateurs Actifs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {stats.activeUsers}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Connectés récemment</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <UserX className="w-5 h-5 text-gray-600" />
                    Utilisateurs Inactifs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
                      {stats.inactiveUsers}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Non connectés</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Total Utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {stats.totalUsers}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Dans le système</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Users */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-[#fff5ed] bg-gradient-to-r from-orange-50/50 to-amber-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Utilisateurs Récents</CardTitle>
                    <CardDescription className="text-gray-600">Les 2 derniers utilisateurs actifs</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#fed7aa] hover:bg-[#fff5ed]"
                    onClick={() => window.location.href = '/dashboard/rh/users'}
                  >
                    Voir tout
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {recentUsers.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">Aucun utilisateur</p>
                    </div>
                  ) : (
                    recentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-[#fff5ed] bg-white hover:shadow-md hover:border-[#fed7aa] transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="w-14 h-14 ring-2 ring-orange-100 group-hover:ring-orange-300 transition-all">
                            <AvatarFallback className="bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] text-white font-bold text-lg">
                              {user.prenom?.[0]}{user.nom?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-gray-900">{user.prenom} {user.nom}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={user.isActive ? "bg-green-600 text-white" : "bg-gray-500 text-white"}>
                            {user.isActive ? "Actif" : "Inactif"}
                          </Badge>
                          <Badge className="bg-[#ff8d13] text-white font-semibold">
                            {user.role}
                          </Badge>
                          {user.lastLogin && (
                            <p className="text-sm text-gray-500 w-24 text-right font-medium">
                              {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Quick Actions */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${user?.role === 'ADMIN' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
          <Link href="/dashboard/rh/employees">
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] text-white cursor-pointer group overflow-hidden">
              <CardHeader className="relative z-10">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardTitle className="flex items-center gap-3 relative z-10 text-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold">Gérer les Employés</div>
                    <p className="text-sm font-normal text-white/90 mt-1">Voir et modifier la liste complète</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>

          {user?.role === 'ADMIN' && (
            <Link href="/dashboard/impression">
              <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-amber-500 to-yellow-600 text-white cursor-pointer group overflow-hidden">
                <CardHeader className="relative z-10">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardTitle className="flex items-center gap-3 relative z-10 text-xl">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold">Badges en Attente</div>
                      <p className="text-sm font-normal text-white/90 mt-1">{stats.badgesEnAttente} à imprimer</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          )}

          <Link href="/dashboard/rh/employees">
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-red-500 to-rose-600 text-white cursor-pointer group overflow-hidden">
              <CardHeader className="relative z-10">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardTitle className="flex items-center gap-3 relative z-10 text-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold">Contrats Expirés</div>
                    <p className="text-sm font-normal text-white/90 mt-1">0 contrats à renouveler</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/change-password">
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white cursor-pointer group overflow-hidden">
              <CardHeader className="relative z-10">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardTitle className="flex items-center gap-3 relative z-10 text-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold">Paramètres</div>
                    <p className="text-sm font-normal text-white/90 mt-1">Modifier mot de passe</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}