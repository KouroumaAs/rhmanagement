"use client";

import RHHeader from "@/components/RHHeader";
import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["RH", "ASSISTANT_RH", "ADMIN"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <RHHeader />
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
