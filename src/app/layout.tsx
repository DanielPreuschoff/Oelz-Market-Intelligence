import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Ölz CI-Schrift (CD-Manual S. 3: „Grundschriftbild der Kommunikation").
// Eingesetzt für Headlines und Navigation; Fließtext bleibt auf einer
// neutralen UI-Grotesk, weil die Signal-Texte lang und textdicht sind.
const madeTommySoft = localFont({
  variable: "--font-display",
  display: "swap",
  // Es gibt nur drei Schnitte. Die Bereiche verhindern, dass der Browser für
  // font-medium/font-semibold künstlich fettet (faux bold).
  src: [
    { path: "./fonts/MADETommySoft-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/MADETommySoft-Regular.woff2", weight: "400 500", style: "normal" },
    { path: "./fonts/MADETommySoft-Bold.woff2", weight: "600 900", style: "normal" },
  ],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
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
    // Die Font-Variablen müssen auf <html> sitzen: globals.css setzt
    // `html { @apply font-sans }`, und CSS-Variablen vererben nur nach unten.
    // Lagen sie auf <body>, war --font-sans auf <html> leer und alles fiel auf
    // den Browser-Serif zurück.
    <html
      lang="de"
      className={`scroll-smooth ${plusJakartaSans.variable} ${madeTommySoft.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
