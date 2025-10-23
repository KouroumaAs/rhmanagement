"use client";

import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function DashboardRHLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["RH", "ASSISTANT_RH", "ADMIN"]}>
      {children}
    </ProtectedRoute>
  );
}
