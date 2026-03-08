"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
    const { locale } = useI18n();

    const es = locale === "es";

    return (
        <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-lg">
                {/* Glitchy 404 number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative mb-6"
                >
                    <span className="text-[160px] sm:text-[200px] font-extrabold leading-none tracking-tighter text-foreground/[0.04] select-none block">
                        404
                    </span>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center text-[72px] sm:text-[96px] font-extrabold tracking-tighter"
                    >
                        4
                        <span className="text-emerald-500">0</span>
                        4
                    </motion.span>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-3 mb-10"
                >
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                        {es ? "Página no encontrada" : "Page not found"}
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                        {es
                            ? "La ruta que buscas no existe o fue movida. Vamos de regreso al portafolio."
                            : "The page you're looking for doesn't exist or has been moved. Let's head back to the portfolio."
                        }
                    </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <Button asChild size="lg" className="rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-shadow">
                        <Link href="/">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {es ? "Volver al inicio" : "Back to Home"}
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full border-white/10 hover:bg-white/5">
                        <Link href="/#projects">
                            {es ? "Ver Proyectos" : "View Projects"}
                        </Link>
                    </Button>
                </motion.div>

                {/* Decorative mono label */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="mt-12 font-mono text-[10px] text-muted-foreground/40 uppercase tracking-[0.3em]"
                >
                    Error 404 — brunovelasques.dev
                </motion.p>
            </div>
        </main>
    );
}
