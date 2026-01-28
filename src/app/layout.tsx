import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cargofly | Caverton Cargo Division - Premium Aviation Logistics",
  description:
    "The pinnacle of West African aviation logistics. Premium cargo services, real-time tracking, and white-glove delivery for discerning clients worldwide.",
  keywords: [
    "cargo",
    "logistics",
    "aviation",
    "shipping",
    "premium freight",
    "West Africa",
    "Caverton",
    "air cargo",
    "express delivery",
  ],
  authors: [{ name: "Caverton Group" }],
  openGraph: {
    title: "Cargofly | Premium Aviation Logistics",
    description:
      "Where luxury meets logistics. Premium cargo services for discerning clients.",
    type: "website",
    locale: "en_US",
    siteName: "Cargofly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cargofly | Premium Aviation Logistics",
    description:
      "Where luxury meets logistics. Premium cargo services for discerning clients.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'"
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
