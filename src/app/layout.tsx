import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
    <html lang="en">
      <body
        className={`antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
