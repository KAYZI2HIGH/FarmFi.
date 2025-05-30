"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  requiredRole,
  redirectForUnauthorizedRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
  redirectForUnauthorizedRole?: string;
}) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathName = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else if (requiredRole && user?.role !== requiredRole) {
      router.push(redirectForUnauthorizedRole || "/");
    }
  }, [isAuthenticated, requiredRole, user?.role, router, pathName]);

  return isAuthenticated ? <>{children}</> : null;
}
