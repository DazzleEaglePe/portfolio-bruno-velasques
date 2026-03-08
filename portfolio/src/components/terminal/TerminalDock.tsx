import { motion, AnimatePresence } from "framer-motion";
import { TerminalState } from "./types";
import { useRouter } from "next/navigation";
import { Home, FolderOpen, Github, Terminal } from "lucide-react";

export function TerminalDock({ terminal }: { terminal: TerminalState }) {
    const { windowState, setWindowState, isClosed, setIsClosed, inputRef, es } = terminal;
    const router = useRouter();

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
            >
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-border/50 bg-foreground/[0.03] backdrop-blur-xl shadow-2xl">
                    {/* Terminal App */}
                    <div className="relative group">
                        <button
                            onClick={() => { 
                                if (!isClosed && windowState !== "minimized") {
                                    setWindowState("minimized");
                                } else {
                                    setWindowState("normal"); 
                                    setIsClosed(false); 
                                    setTimeout(() => inputRef.current?.focus(), 100); 
                                }
                            }}
                            className="w-12 h-12 rounded-xl bg-foreground/[0.06] border border-border/50 flex items-center justify-center hover:bg-foreground/[0.1] hover:scale-110 hover:-translate-y-2 transition-all duration-300 relative z-10"
                        >
                            <Terminal className="w-6 h-6 text-emerald-500" />
                        </button>
                        {/* Puntero activo de que la app está "abierta" en segundo plano */}
                        {!isClosed && (
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground/60"></div>
                        )}
                        {/* Tooltip flotante */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {es ? "Terminal" : "Terminal"}
                        </span>
                    </div>

                    {/* Separador */}
                    <div className="w-[1px] h-8 bg-border/50 mx-1"></div>

                    {/* Home App */}
                    <div className="relative group">
                        <button
                            onClick={() => router.push("/")}
                            className="w-12 h-12 rounded-xl bg-foreground/[0.06] border border-border/50 flex items-center justify-center hover:bg-foreground/[0.1] hover:scale-110 hover:-translate-y-2 transition-all duration-300 relative z-10"
                        >
                            <Home className="w-6 h-6 text-blue-500" />
                        </button>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {es ? "Ir al Inicio" : "Go to Home"}
                        </span>
                    </div>

                    {/* Projects App */}
                    <div className="relative group">
                        <button
                            onClick={() => router.push("/#projects")}
                            className="w-12 h-12 rounded-xl bg-foreground/[0.06] border border-border/50 flex items-center justify-center hover:bg-foreground/[0.1] hover:scale-110 hover:-translate-y-2 transition-all duration-300 relative z-10"
                        >
                            <FolderOpen className="w-6 h-6 text-amber-500" />
                        </button>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {es ? "Ver Proyectos" : "View Projects"}
                        </span>
                    </div>

                    {/* Navbar GitHub Link (Simulado como App) */}
                    <div className="relative group">
                        <a
                            href="https://github.com/DazzleEaglePe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-foreground/[0.06] border border-border/50 flex items-center justify-center hover:bg-foreground/[0.1] hover:scale-110 hover:-translate-y-2 transition-all duration-300 relative z-10"
                        >
                            <Github className="w-6 h-6 text-foreground" />
                        </a>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            GitHub
                        </span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
