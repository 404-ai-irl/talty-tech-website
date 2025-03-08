import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";
import Header from "@/components/sections/Header";
import React from "react";

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
        </ThemeProvider>
        <Analytics />
	<SpeedInsights />
      </body>
    </html>
  );
}
