"use client";

import { Button } from "@/components/ui/button";
import { LogOut, KeyRound, User } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function RHHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleChangePassword = () => {
    router.push("/change-password");
  };

  const handleLogout = () => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
    }
  };

  if (!user) return null;

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-lg flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Gestion des Employés
            </h1>
            <p className="text-sm text-gray-500">
              {user.prenom} {user.nom} - {user.role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#fff5ed] text-[#e67d0f]">
                    {user.prenom.charAt(0)}{user.nom.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block">
                  {user.prenom} {user.nom}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleChangePassword}>
                <KeyRound className="mr-2 h-4 w-4" />
                <span>Changer le mot de passe</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
