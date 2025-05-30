import { AppSidebar } from "@/components/custom-ui/AppSidebar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full overflow-hidden">
          <section className="py-10 !pb-0 w-full h-full">{children}</section>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
