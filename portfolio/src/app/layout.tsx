import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/supabase-auth";
import InitialLoader from "@/components/InitialLoader";

export const metadata: Metadata = {
  title: "Bruno Velasques — Software Developer & UI/UX Designer",
  description: "Portafolio profesional de Bruno Velasques. Desarrollador de software con experiencia en Fintech, microservicios, y diseño UI/UX.",
  keywords: ["Bruno Velasques", "Software Developer", "Full Stack", "UI/UX Designer", "React", "Next.js", "Perú"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
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
