"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
    const { locale } = useI18n();
    const es = locale === "es";

    return (
        <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background">
            {/* Subtle Grid Background patterned after Developer tooling */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(150,150,150,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(150,150,150,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_10%,#000_100%)] pointer-events-none"></div>

            {/* Giant Background 404 Watermark */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
                <span className="text-[30vw] font-extrabold leading-none tracking-tighter text-foreground/[0.02] select-none">
                    404
                </span>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center"
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/30 rotate-3 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                >
                     <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                    {es ? "Ruta no definida" : "Route not defined"}
                </h1>
                
                <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-lg mx-auto">
                    {es 
                        ? "Parece que te has topado con un punto ciego. El componente que buscas no existe o ha sido refactorizado." 
                        : "It seems you've hit a blind spot. The component you are looking for doesn't exist or has been refactored."}
                </p>

                {/* Syntax Highlighted Error Message - Now the visual centerpiece */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-foreground/[0.03] border border-border/50 rounded-xl p-5 sm:p-6 mb-10 w-full max-w-md text-left font-mono text-sm sm:text-base overflow-hidden relative shadow-2xl backdrop-blur-sm"
                >
                    <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-sm"></div>
                    </div>
                    <div className="text-muted-foreground leading-loose">
                        <span className="text-emerald-500">const</span> <span className="text-foreground/90">page</span> = <span className="text-emerald-500">await</span> findRoute();<br/>
                        <span className="text-emerald-500">if</span> (!page) {'{'} <br/>
                        &nbsp;&nbsp;<span className="text-red-400 font-medium">throw new</span> Error(<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-500/80 flex items-center gap-2 mt-1 mb-1">
                            {es ? '"404: Ruta no encontrada"' : '"404: Route not found"'}
                            <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse"></span>
                        </span>
                        &nbsp;&nbsp;);<br/>
                        {'}'}
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                >
                    <Button asChild size="lg" className="rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-shadow w-full sm:w-auto px-8">
                        <Link href="/">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {es ? "Compilar e Ir al Inicio" : "Compile & Go Home"}
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </main>
    );
}
