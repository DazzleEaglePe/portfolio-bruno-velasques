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

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 w-full max-w-2xl"
            >
                {/* On-Brand Glass Card */}
                <div data-slot="card" className="p-8 sm:p-12 md:p-16 rounded-[2rem] flex flex-col items-center text-center mx-auto shadow-2xl">
                    
                    {/* Floating Tech Icon */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 border border-emerald-500/30 rotate-3 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                    >
                         <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                        </svg>
                    </motion.div>

                    {/* Syntax Highlighted Error Message */}
                    <div className="bg-foreground/[0.03] border border-border/50 rounded-xl p-5 mb-8 w-full max-w-sm text-left font-mono text-xs sm:text-sm overflow-hidden relative shadow-inner">
                        <div className="flex gap-2 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            className="text-muted-foreground leading-relaxed"
                        >
                            <span className="text-emerald-500">const</span> <span className="text-foreground/80">page</span> = <span className="text-emerald-500">await</span> findRoute();<br/>
                            <span className="text-emerald-500">if</span> (!page) {'{'} <br/>
                            &nbsp;&nbsp;<span className="text-red-400">throw new</span> Error(<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-500/70">{es ? '"404: Ruta no encontrada"' : '"404: Route not found"'}</span><br/>
                            &nbsp;&nbsp;);<br/>
                            {'}'}
                        </motion.div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                        {es ? "¡Ups! Entorno no válido" : "Oops! Invalid environment"}
                    </h1>
                    
                    <p className="text-muted-foreground text-sm sm:text-base mb-10 max-w-md mx-auto">
                        {es 
                            ? "Parece que te has topado con un error 404. La página que buscas no existe o fue eliminada de este directorio." 
                            : "It seems you've hit a 404 error. The page you are looking for doesn't exist or was removed from this directory."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Button asChild size="lg" className="rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-shadow w-full sm:w-auto">
                            <Link href="/">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {es ? "Regresar al Portafolio" : "Back to Portfolio"}
                            </Link>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
