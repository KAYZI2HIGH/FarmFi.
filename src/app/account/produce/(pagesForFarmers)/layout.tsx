import ProtectedRoute from "@/components/ProtectedRoutes";

export default function FarmerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requiredRole="farmer" redirectForUnauthorizedRole="/account/marketplace">
      {children}
    </ProtectedRoute>
  );
}
