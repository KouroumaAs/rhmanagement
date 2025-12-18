"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/src/hooks/use-toast";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    role: "RH",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.100.171:4003/api';
      const response = await fetch(`${apiUrl}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data = await response.json();
      const users = data.data || [];
      const user = users.find((u: any) => u.id === params.id);

      if (!user) throw new Error('Utilisateur non trouvé');

      setFormData({
        nom: user.nom || "",
        prenom: user.prenom || "",
        email: user.email || "",
        telephone: user.telephone || "",
        role: user.role || "RH",
      });
    } catch (error: any) {
      console.error('Erreur chargement utilisateur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de charger l'utilisateur",
      });
      router.push('/dashboard/rh/users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.100.171:4003/api';
      const response = await fetch(`${apiUrl}/auth/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la modification');
      }

      toast({
        title: "✅ Utilisateur modifié",
        description: "Les modifications ont été enregistrées avec succès",
      });

      router.push("/dashboard/rh/users");
    } catch (error: any) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur de modification",
        description: error.message || "Impossible de modifier l'utilisateur",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff8d13] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b border-[#fff5ed] bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/rh/users">
              <Button variant="ghost" size="icon" className="hover:bg-[#fff5ed]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Save className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
                Modifier l'Utilisateur
              </h1>
              <p className="text-sm text-gray-600">Mettre à jour les informations de l'utilisateur</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Informations Personnelles</CardTitle>
              <CardDescription className="text-gray-600">
                Détails de l'identité de l'utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="prenom" className="text-sm font-semibold text-gray-700">
                    Prénom *
                  </Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    placeholder="Ex: Amadou"
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-sm font-semibold text-gray-700">
                    Nom *
                  </Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="Ex: Diallo"
                    className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Informations de Contact</CardTitle>
              <CardDescription className="text-gray-600">
                Moyens de communication avec l'utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Adresse Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="exemple@entreprise.com"
                  className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone" className="text-sm font-semibold text-gray-700">
                  Téléphone *
                </Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  placeholder="6xx xx xx xx ou +224 6xx xx xx xx"
                  className="h-11 border-2 border-gray-200 focus:border-[#ff8d13] focus:ring-4 focus:ring-[#ff8d13]/10 transition-all rounded-xl"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Role Information */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-[#fff5ed]">
              <CardTitle className="text-xl font-bold text-gray-900">Rôle et Permissions</CardTitle>
              <CardDescription className="text-gray-600">
                Niveau d'accès de l'utilisateur dans le système
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-semibold text-gray-700">
                  Rôle *
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger className="h-11 w-full border-2 border-gray-200 focus:border-[#ff8d13] rounded-xl bg-white text-gray-900 font-medium">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl z-50">
                    <SelectItem value="RH" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">
                      Ressources Humaines
                    </SelectItem>
                    <SelectItem value="IMPRESSION" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">
                      Service d'Impression
                    </SelectItem>
                    <SelectItem value="ADMIN" className="text-gray-900 hover:bg-[#fff5ed] cursor-pointer">
                      Administrateur
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-orange-50 to-amber-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <span className="text-red-500">*</span> Champs obligatoires
                </p>
                <div className="flex gap-3">
                  <Link href="/dashboard/rh/users">
                    <Button type="button" variant="outline" className="border-2">
                      Annuler
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13] shadow-lg shadow-[#ff8d13]/30 gap-2 min-w-[160px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}
