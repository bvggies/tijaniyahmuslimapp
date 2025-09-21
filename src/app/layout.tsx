import type { Metadata } from "next";
import { Inter, Poppins, Amiri } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/layout";
import { PWAInstall } from "@/components/ui/pwa-install";
import { PWAInitializer } from "@/components/ui/pwa-initializer";
import { ForceUpdate } from "@/components/ui/force-update";
import { ClientOnly } from "@/components/ui/client-only";
import { SplashProvider } from "@/components/providers/splash-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Tijaniyah Muslim App - Your Islamic Companion",
  description: "A comprehensive Islamic web application featuring prayer times, Qibla compass, Quran reader, Duas, Tasbih counter, and much more for the Muslim community.",
  keywords: "Islamic app, prayer times, Quran, Duas, Tasbih, Qibla, Muslim, Islam, Tijaniyah",
  authors: [{ name: "Tijaniyah Muslim App Team" }],
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/islamic-scholar.png", type: "image/png" }
    ],
    shortcut: "/favicon.svg",
    apple: "/images/islamic-scholar.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tijaniyah Muslim App",
  },
  openGraph: {
    title: "Tijaniyah Muslim App - Your Islamic Companion",
    description: "A comprehensive Islamic web application featuring prayer times, Qibla compass, Quran reader, Duas, Tasbih counter, and much more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tijaniyah Muslim App",
    description: "Your comprehensive Islamic companion for prayer, reflection, and spiritual growth",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en" className={`${inter.variable} ${poppins.variable} ${amiri.variable}`} suppressHydrationWarning>
          <body className="antialiased" suppressHydrationWarning>
            <SplashProvider>
              <ClientOnly>
                <PWAInitializer />
              </ClientOnly>
              <Layout>
                {children}
              </Layout>
              <ClientOnly>
                <PWAInstall />
                <ForceUpdate />
              </ClientOnly>
            </SplashProvider>
          </body>
        </html>
  );
}
