import type { Metadata } from "next";
import { Playfair_Display, Comfortaa, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// Playfair Display for elegant headings
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

// Comfortaa for friendly body text
const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

// Space Mono for code blocks
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

// BBH Sans Bartle for header (local font)
const bbhSans = localFont({
  src: "../public/BBH_Sans_Bartle/BBHSansBartle-Regular.ttf",
  variable: "--font-bbh-sans",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claude Code Marketplaces - Discover Plugin Collections",
  description:
    "Discover Claude Code plugin marketplaces. Browse curated collections of extensions for development, productivity, testing, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${comfortaa.variable} ${spaceMono.variable} ${bbhSans.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
