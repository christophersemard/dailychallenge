import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import Layout from "@/components/layout/Layout"

export const metadata: Metadata = {
  title: "DailyChallenge",
  description: "Jeux quotidiens pour cinéphiles et explorateurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-background`}
      >
        <AuthProvider><Layout>{children}</Layout></AuthProvider>
      </body>
    </html>
  );
}

