import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/supabase-auth";
import InitialLoader from "@/components/InitialLoader";

export const metadata: Metadata = {
  metadataBase: new URL("https://brunovelasques.dev"),
  title: "Bruno Velasques — Full Stack, Fintech & AI",
  description: "Portafolio de Bruno Velasques: desarrollo Full Stack, microservicios, arquitectura cloud, fintech e inteligencia artificial aplicada.",
  keywords: ["Bruno Velasques", "Full Stack Developer", "Software Developer", "NestJS", "Spring Boot", "React", "Angular", "Cloud", "Fintech", "Applied AI", "Perú"],
  authors: [{ name: "Bruno Velasques", url: "https://brunovelasques.dev" }],
  creator: "Bruno Velasques",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://brunovelasques.dev",
    title: "Bruno Velasques — Full Stack, Fintech & AI",
    description: "Productos end-to-end para banca, SaaS e inteligencia artificial aplicada.",
    siteName: "Bruno Velasques Portfolio",
    images: [
      {
        url: "/images/bruno_velasques.png", // We should ideally have a dedicated og-image, but this works for now.
        width: 800,
        height: 600,
        alt: "Bruno Velasques - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bruno Velasques — Full Stack, Fintech & AI",
    description: "Productos end-to-end para banca, SaaS e inteligencia artificial aplicada.",
    images: ["/images/bruno_velasques.png"],
    creator: "@velasques_bruno", // Assuming based on Instagram handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Configuración de JSON-LD para SEO Enriquecido (Sitelinks y Knowledge Graph)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://brunovelasques.dev/#person",
        "name": "Bruno Velasques",
        "jobTitle": "Full Stack Software Developer",
        "url": "https://brunovelasques.dev",
        "image": "https://brunovelasques.dev/images/bruno_velasques.png",
        "sameAs": [
          "https://www.linkedin.com/in/bruno-velasques-software-developer/",
          "https://www.instagram.com/velasques_bruno"
        ],
        "alumniOf": "Universidad Privada San Juan Bautista",
        "worksFor": {
          "@type": "Organization",
          "name": "Caja Ica"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://brunovelasques.dev/#website",
        "url": "https://brunovelasques.dev",
        "name": "Bruno Velasques Portfolio",
        "publisher": {
          "@id": "https://brunovelasques.dev/#person"
        }
      }
    ]
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Manrope-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Manrope-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Manrope-ExtraBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <InitialLoader />
              <TooltipProvider delayDuration={200}>
                {children}
              </TooltipProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
