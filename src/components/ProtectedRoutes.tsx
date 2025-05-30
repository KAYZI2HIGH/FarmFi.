"use client";

import Loading from "@/app/loading";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  requiredRole,
  redirectForUnauthorizedRole = "/",
}: {
  children: React.ReactNode;
  requiredRole?: string;
  redirectForUnauthorizedRole?: string;
}) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathName)}`);
    } else if (requiredRole && user?.role !== requiredRole) {
      router.push(redirectForUnauthorizedRole);
    }
  }, [isAuthenticated, isLoading, requiredRole, user?.role, router, pathName]);

  if (isLoading) {
    return <Loading/>
  }

  return isAuthenticated ? <>{children}</> : null;
}
