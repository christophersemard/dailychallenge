import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import Layout from "@/components/layout/Layout";
import { Hanken_Grotesk } from "next/font/google";
import { Baloo_2 } from "next/font/google";
import { Toaster } from "sonner";

export const outlineFont = Baloo_2({
  weight: "600", // ou "700" pour plus de contraste
  subsets: ["latin"],
  variable: "--font-outline",
});


const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });


export const metadata: Metadata = {
  title: "DailyChallenge",
  description: "Jeux quotidiens pour cinéphiles et explorateurs",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${hanken.variable} ${outlineFont.variable}`}>
      <body className="font-sans antialiased bg-background">
        <Toaster richColors position="bottom-right" duration={5000} />
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
