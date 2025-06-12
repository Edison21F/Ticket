import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./auth.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EvenTix - Iniciar Sesión | Panel de Administración",
  description: "Accede a tu panel de administración de EvenTix. Gestiona eventos, usuarios y transacciones con herramientas avanzadas.",
  keywords: "eventix, login, administración, eventos, gestión, panel",
  authors: [{ name: "EvenTix Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "noindex, nofollow",
  openGraph: {
    title: "EvenTix - Panel de Administración",
    description: "Plataforma completa para la gestión de eventos y usuarios",
    type: "website",
    locale: "es_ES",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 min-h-screen`}
      >
        <div className="auth-container">
          {children}
        </div>
      </body>
    </html>
  );
}