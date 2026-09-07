import type { Metadata } from "next";
import { Inter, Montserrat, Caveat, Cinzel } from "next/font/google";
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

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kautikefoundation.org"),
  title: "Kautike Charitable Foundation | Ensuring Brighter Futures for Children & Communities",
  description: "Kautike Charitable Foundation is a registered non-profit organization dedicated to child education, nutrition, health, and community welfare across India.",
  openGraph: {
    title: "Kautike Charitable Foundation",
    description: "Ensuring Brighter Futures for Children & Communities.",
    url: "https://kautikefoundation.org",
    siteName: "Kautike Charitable Foundation",
    images: [
      {
        url: "/kautike-logo.png",
        width: 622,
        height: 622,
        alt: "Kautike Charitable Foundation Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Kautike Charitable Foundation",
  "alternateName": ["Kautike Foundation", "Kautike Charity"],
  "url": "https://kautikefoundation.org",
  "logo": "https://kautikefoundation.org/kautike-logo.png",
  "image": "https://kautikefoundation.org/kautike-logo.png",
  "description": "Kautike Charitable Foundation is a registered Section 8 non-profit organization working for child education, nutrition, health, and community empowerment.",
  "email": "info@kautikefoundation.org",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Support & Inquiries",
    "email": "info@kautikefoundation.org",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi", "Marathi"]
  },
  "sameAs": [
    "https://kautikefoundation.org"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${caveat.variable} ${cinzel.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
