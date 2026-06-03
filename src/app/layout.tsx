import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ölz Intelligence Radar",
  description: "Market and competitor intelligence for Rudolf Ölz Meisterbäcker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakartaSans.variable} ${cormorantGaramond.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
