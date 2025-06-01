import ProtectedRoute from "@/components/ProtectedRoutes";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requiredRole="buyer" redirectForUnauthorizedRole="/account/produce">
      {children}
    </ProtectedRoute>
  );
}
