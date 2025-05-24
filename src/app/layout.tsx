import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/custom-ui/toast";

export const metadata: Metadata = {
  title: "FarmFi - Farm-to-Table Marketplace",
  description: "Connect farmers and buyers directly with FarmFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`antialiased ${poppins.className}`}>
        <AuthProvider>
          <ToastProvider> {children}</ToastProvider>
        </AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
