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
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(150,150,150,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(150,150,150,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_10%,#000_100%)] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 w-full max-w-3xl"
            >
                {/* The Code Editor Window */}
                <div className="rounded-2xl overflow-hidden border border-border/50 bg-foreground/[0.02] backdrop-blur-xl shadow-2xl">
                    {/* Window Header */}
                    <div className="flex items-center px-4 py-3 border-b border-border/50 bg-foreground/[0.03]">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm"></div>
                        </div>
                        <div className="flex-1 text-center font-mono text-xs text-muted-foreground/60 select-none cursor-default">
                            app/not-found.tsx — {es ? "Error de Enrutamiento" : "Routing Error"}
                        </div>
                    </div>

                    {/* Window Body - The Code */}
                    <div className="p-6 sm:p-8 md:p-12 font-mono text-xs sm:text-sm md:text-base leading-loose text-muted-foreground relative">
                        
                        {/* Huge 404 Watermark inside the editor */}
                        <div className="absolute right-4 bottom-[20%] md:right-8 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
                            <span className="text-[100px] md:text-[180px] font-black leading-none text-foreground tracking-tighter">
                                404
                            </span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <p><span className="text-emerald-500">import</span> {'{'} <span className="text-foreground/90">redirect</span> {'}'} <span className="text-emerald-500">from</span> <span className="text-emerald-500/80">'next/navigation'</span>;</p>
                            <br/>
                            <p><span className="text-emerald-500">export default async function</span> <span className="text-blue-400">NotFound</span>() {'{'}</p>
                            <p className="ml-4 sm:ml-8"><span className="text-emerald-500">const</span> <span className="text-foreground/90">status</span> = <span className="text-yellow-500">404</span>;</p>
                            <p className="ml-4 sm:ml-8"><span className="text-emerald-500">const</span> <span className="text-foreground/90">error</span> = <span className="text-emerald-500/80">{es ? '"Ruta no identificada"' : '"Route not identified"'}</span>;</p>
                            <br/>
                            <p className="ml-4 sm:ml-8"><span className="text-foreground/40">
                                {es ? '// El componente que buscas no existe o fue movido.' : '// The component you are looking for does not exist or was moved.'}
                            </span></p>
                            <p className="ml-4 sm:ml-8"><span className="text-emerald-500">if</span> (!routeExists) {'{'}</p>
                            <p className="ml-8 sm:ml-16"><span className="text-red-400 font-medium">throw new</span> <span className="text-yellow-200">Error</span>(<span className="text-foreground/90">error</span>);</p>
                            <p className="ml-4 sm:ml-8">{'}'}</p>
                            <br/>
                            <p className="ml-4 sm:ml-8"><span className="text-foreground/40">
                                {es ? '// Redirigiendo a un lugar seguro...' : '// Redirecting to a safe zone...'}
                            </span></p>
                            <p className="ml-4 sm:ml-8"><span className="text-emerald-500">return</span> redirect(<span className="text-emerald-500/80">"/"</span>);</p>
                            <p>{'}'}</p>
                            
                            {/* Blinking Cursor */}
                            <span className="inline-block w-2.5 h-5 bg-emerald-500 animate-pulse mt-2 align-middle"></span>
                        </motion.div>

                        {/* Interactive Actions integrated inside the code editor vibe */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-12 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center gap-4 relative z-10"
                        >
                            <Button asChild size="lg" className="rounded-full font-sans shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-shadow w-full sm:w-auto">
                                <Link href="/">
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    {es ? "Ejecutar redirect('/')" : "Execute redirect('/')"}
                                </Link>
                            </Button>
                            <Button asChild variant="ghost" size="lg" className="rounded-full font-sans hover:bg-foreground/5 w-full sm:w-auto">
                                <Link href="/#projects">
                                    {es ? "Explorar Proyectos" : "Explore Projects"}
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
