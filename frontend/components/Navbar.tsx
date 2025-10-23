"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Building2, Users, Printer, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (path: string) => pathname.startsWith(path);

  const handleLogout = () => {
    console.log('Déconnexion en cours...');
    logout();
  };

  return (
    <nav className="border-b border-[#ffedd5] bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard/rh" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff8d13] to-[#ff8d13] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] bg-clip-text text-transparent">
              RH Management
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link href="/dashboard/rh">
              <Button
                variant={isActive("/dashboard/rh") && !isActive("/dashboard/rh/employees") ? "default" : "ghost"}
                className={
                  isActive("/dashboard/rh") && !isActive("/dashboard/rh/employees")
                    ? "bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13]"
                    : "hover:bg-[#fff5ed]"
                }
              >
                <Building2 className="w-4 h-4 mr-2" />
                Dashboard RH
              </Button>
            </Link>

            <Link href="/dashboard/rh/employees">
              <Button
                variant={isActive("/dashboard/rh/employees") ? "default" : "ghost"}
                className={
                  isActive("/dashboard/rh/employees")
                    ? "bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13]"
                    : "hover:bg-[#fff5ed]"
                }
              >
                <Users className="w-4 h-4 mr-2" />
                Employés
              </Button>
            </Link>

            <Link href="/dashboard/impression">
              <Button
                variant={isActive("/dashboard/impression") ? "default" : "ghost"}
                className={
                  isActive("/dashboard/impression")
                    ? "bg-gradient-to-r from-[#ff8d13] to-[#ff8d13] hover:from-[#e67d0f] hover:to-[#ff8d13]"
                    : "hover:bg-[#fff5ed]"
                }
              >
                <Printer className="w-4 h-4 mr-2" />
                Impression
              </Button>
            </Link>

            <div className="ml-4 pl-4 border-l border-[#fed7aa] flex items-center gap-2">
              <Link href="/change-password">
                <Button variant="ghost" className="hover:bg-[#fff5ed]">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}