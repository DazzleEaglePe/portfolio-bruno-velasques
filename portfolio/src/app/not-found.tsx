"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const lineVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
        opacity: 1, x: 0,
        transition: { delay: 0.15 * i, duration: 0.3 },
    }),
};

export default function NotFound() {
    const { locale } = useI18n();
    const es = locale === "es";

    const logLines = es ? [
        { prefix: "▲ Next.js 16.1.6", color: "text-foreground/70", type: "info" },
        { prefix: "- Ambiente: producción", color: "text-foreground/50", type: "info" },
        { prefix: "✓ Compilado exitosamente", color: "text-emerald-500", type: "success" },
        { prefix: "○ Esperando petición entrante...", color: "text-foreground/40", type: "info" },
        { prefix: "GET /ruta-desconocida", color: "text-foreground/70", type: "request" },
        { prefix: "⨯ Error 404: Página no encontrada", color: "text-red-400", type: "error" },
        { prefix: "  La ruta solicitada no existe en este proyecto.", color: "text-foreground/40", type: "detail" },
        { prefix: "  Verifica la URL o regresa al portafolio.", color: "text-foreground/40", type: "detail" },
    ] : [
        { prefix: "▲ Next.js 16.1.6", color: "text-foreground/70", type: "info" },
        { prefix: "- Environment: production", color: "text-foreground/50", type: "info" },
        { prefix: "✓ Compiled successfully", color: "text-emerald-500", type: "success" },
        { prefix: "○ Waiting for incoming request...", color: "text-foreground/40", type: "info" },
        { prefix: "GET /unknown-route", color: "text-foreground/70", type: "request" },
        { prefix: "⨯ Error 404: Page not found", color: "text-red-400", type: "error" },
        { prefix: "  The requested route does not exist in this project.", color: "text-foreground/40", type: "detail" },
        { prefix: "  Check the URL or go back to the portfolio.", color: "text-foreground/40", type: "detail" },
    ];

    return (
        <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(150,150,150,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(150,150,150,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_10%,#000_100%)] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                {/* Terminal-style Log Output */}
                <div className="w-full rounded-xl border border-border/50 bg-foreground/[0.02] overflow-hidden mb-10">
                    {/* Terminal Tab Bar */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                        <span className="ml-2 font-mono text-[11px] text-muted-foreground/50 select-none">
                            ~/portfolio
                        </span>
                    </div>

                    {/* Log Lines */}
                    <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-1.5">
                        {logLines.map((line, i) => (
                            <motion.p 
                                key={i}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={lineVariants}
                                className={`${line.color} ${line.type === "error" ? "font-semibold" : ""} ${line.type === "request" ? "mt-3 pt-3 border-t border-border/20" : ""}`}
                            >
                                {line.prefix}
                            </motion.p>
                        ))}

                        {/* Blinking cursor at end */}
                        <motion.div 
                            custom={logLines.length}
                            initial="hidden"
                            animate="visible"
                            variants={lineVariants}
                            className="flex items-center gap-1 mt-4 pt-3 border-t border-border/20"
                        >
                            <span className="text-muted-foreground/50">$</span>
                            <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse"></span>
                        </motion.div>
                    </div>
                </div>

                {/* Clean CTA Buttons - Using standard Shadcn styling */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center"
                >
                    <Button asChild size="lg" className="rounded-full w-full sm:w-auto px-8">
                        <Link href="/">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {es ? "Volver al inicio" : "Back to Home"}
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full w-full sm:w-auto px-8">
                        <Link href="/#projects">
                            {es ? "Ver Proyectos" : "View Projects"}
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
