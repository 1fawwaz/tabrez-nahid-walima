import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, Great_Vibes, Pinyon_Script } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"],
  variable: "--font-serif", display: "swap",
});
const arabic = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-arabic", display: "swap" });
const pinyon = Pinyon_Script({
  subsets: ["latin"], weight: "400", variable: "--font-pinyon", display: "swap",
});
const greatVibes = Great_Vibes({
  subsets: ["latin"], weight: "400", variable: "--font-great-vibes", display: "swap",
});

export const metadata: Metadata = {
  title: "Tabrez & Nahid — Walima Invitation",
  description: "You are warmly invited to the Walima ceremony of Tabrez and Nahid on 22 November 2026.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FDF4EB" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${arabic.variable} ${pinyon.variable} ${greatVibes.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
