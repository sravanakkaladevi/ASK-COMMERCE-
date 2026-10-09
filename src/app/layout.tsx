import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import LenisProvider from "@/components/providers/LenisProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ASK — Handcrafted Silks | Varanasi & Kanchipuram Heirloom Sarees",
  description:
    "Explore ASK — an ultra-luxury handloom silk boutique featuring authentic Kanjeevarams, Varanasi Kadwa brocades, sheer organzas, and bridal masterweaves woven by generational karigars.",
  keywords: [
    "ASK",
    "ASK Silks",
    "Handcrafted Silks",
    "Banarasi Saree",
    "Kanjeevaram Saree",
    "Pure Zari Saree",
    "Bridal Trousseau",
    "Organza Silk",
    "Chanderi Handloom",
    "Indian Luxury Fashion",
  ],
  authors: [{ name: "ASK Silk Atelier" }],
  openGraph: {
    title: "ASK — Handcrafted Silks | Woven in Heritage, Draped in Splendour",
    description:
      "Six weavers, one thread — authentic handloom sarees direct from master artisans in Varanasi and Kanchipuram.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased scroll-smooth`}
    >
      <body className="bg-[#FAF7F2] text-[#1C1512] font-sans-refined min-h-screen selection:bg-[#7A0C1E] selection:text-white">
        <ToastProvider>
          <CartProvider>
            <LenisProvider>{children}</LenisProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
