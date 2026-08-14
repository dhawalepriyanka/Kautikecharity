import type { Metadata } from "next";
import { Inter, Montserrat, Caveat } from "next/font/google";
import "./globals.css";
import "./theme.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kautike Charitable Foundation | Ensuring Brighter Futures for Children & Communities",
  description: "Kautike Charitable Foundation works for child rights, education, health & nutrition, and community welfare across India.",
  openGraph: {
    title: "Kautike Charitable Foundation",
    description: "Ensuring Brighter Futures for Children & Communities.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${caveat.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
