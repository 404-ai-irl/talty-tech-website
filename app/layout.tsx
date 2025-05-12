import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Vercel
// TODO: Remove Vercel
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"

// Globals
import Header from "@/components/globals/Header";
import Footer from "@/components/globals/Footer";
import "./globals.css";

// Font Settings for Theme
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Talty Tech",
  description:
    "Empowering Texas businesses with innovative web development and AI solutions. Our expert team combines modern design with robust technology to create dynamic ecommerce sites, interactive web apps, and automated business platforms.",
  openGraph: {
    title: "Talty Tech",
    description:
      "Empowering Texas businesses with innovative web development and AI solutions. Our expert team combines modern design with robust technology to create dynamic ecommerce sites, interactive web apps, and automated business platforms.",
    // images: [""]
  },
  other: {
    facebookDomainVerification: "ptqet2ozqz9vhfnidumn6y6dxqih3x",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
