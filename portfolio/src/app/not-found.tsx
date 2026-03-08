"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";

const lineVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
        opacity: 1, x: 0,
        transition: { delay: 0.15 * i, duration: 0.3 },
    }),
};

interface TerminalLine {
    text: string;
    color: string;
    isCommand?: boolean;
}

export default function NotFound() {
    const { locale } = useI18n();
    const es = locale === "es";
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");
    const [showInput, setShowInput] = useState(false);

    const initialLines: TerminalLine[] = es ? [
        { text: "▲ Next.js 16.1.6", color: "text-foreground/70" },
        { text: "- Ambiente: producción", color: "text-foreground/50" },
        { text: "✓ Compilado exitosamente", color: "text-emerald-500" },
        { text: "○ Esperando petición entrante...", color: "text-foreground/40" },
        { text: "GET /ruta-desconocida", color: "text-foreground/70" },
        { text: "⨯ Error 404: Página no encontrada", color: "text-red-400" },
        { text: "  La ruta solicitada no existe en este proyecto.", color: "text-foreground/40" },
        { text: "", color: "" },
        { text: "Escribe 'help' para ver los comandos disponibles.", color: "text-emerald-500/70" },
    ] : [
        { text: "▲ Next.js 16.1.6", color: "text-foreground/70" },
        { text: "- Environment: production", color: "text-foreground/50" },
        { text: "✓ Compiled successfully", color: "text-emerald-500" },
        { text: "○ Waiting for incoming request...", color: "text-foreground/40" },
        { text: "GET /unknown-route", color: "text-foreground/70" },
        { text: "⨯ Error 404: Page not found", color: "text-red-400" },
        { text: "  The requested route does not exist in this project.", color: "text-foreground/40" },
        { text: "", color: "" },
        { text: "Type 'help' to see available commands.", color: "text-emerald-500/70" },
    ];

    const [lines, setLines] = useState<TerminalLine[]>(initialLines);

    // Show input after initial animation completes
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInput(true);
        }, initialLines.length * 150 + 400);
        return () => clearTimeout(timer);
    }, [initialLines.length]);

    // Auto-focus input when it appears
    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    // Auto-scroll to bottom on new lines
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    const processCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        const commandLine: TerminalLine = { text: `$ ${cmd}`, color: "text-foreground/80", isCommand: true };

        let responseLines: TerminalLine[] = [];

        switch (trimmed) {
            case "help":
                responseLines = es ? [
                    { text: "", color: "" },
                    { text: "Comandos disponibles:", color: "text-emerald-500" },
                    { text: "  help       — Muestra esta ayuda", color: "text-foreground/60" },
                    { text: "  home       — Ir al portafolio", color: "text-foreground/60" },
                    { text: "  projects   — Ver mis proyectos", color: "text-foreground/60" },
                    { text: "  about      — Sobre mí", color: "text-foreground/60" },
                    { text: "  contact    — Ir a contacto", color: "text-foreground/60" },
                    { text: "  skills     — Ver mis tecnologías", color: "text-foreground/60" },
                    { text: "  clear      — Limpiar terminal", color: "text-foreground/60" },
                    { text: "", color: "" },
                ] : [
                    { text: "", color: "" },
                    { text: "Available commands:", color: "text-emerald-500" },
                    { text: "  help       — Show this help", color: "text-foreground/60" },
                    { text: "  home       — Go to portfolio", color: "text-foreground/60" },
                    { text: "  projects   — View my projects", color: "text-foreground/60" },
                    { text: "  about      — About me", color: "text-foreground/60" },
                    { text: "  contact    — Go to contact", color: "text-foreground/60" },
                    { text: "  skills     — View my technologies", color: "text-foreground/60" },
                    { text: "  clear      — Clear terminal", color: "text-foreground/60" },
                    { text: "", color: "" },
                ];
                break;

            case "home":
            case "cd /":
            case "cd ~":
                responseLines = [
                    { text: es ? "✓ Redirigiendo al portafolio..." : "✓ Redirecting to portfolio...", color: "text-emerald-500" },
                ];
                setLines(prev => [...prev, commandLine, ...responseLines]);
                setTimeout(() => router.push("/"), 800);
                return;

            case "projects":
                responseLines = [
                    { text: es ? "✓ Navegando a proyectos..." : "✓ Navigating to projects...", color: "text-emerald-500" },
                ];
                setLines(prev => [...prev, commandLine, ...responseLines]);
                setTimeout(() => router.push("/#projects"), 800);
                return;

            case "contact":
                responseLines = [
                    { text: es ? "✓ Abriendo sección de contacto..." : "✓ Opening contact section...", color: "text-emerald-500" },
                ];
                setLines(prev => [...prev, commandLine, ...responseLines]);
                setTimeout(() => router.push("/#contact"), 800);
                return;

            case "skills":
                responseLines = [
                    { text: es ? "✓ Cargando tecnologías..." : "✓ Loading skills...", color: "text-emerald-500" },
                ];
                setLines(prev => [...prev, commandLine, ...responseLines]);
                setTimeout(() => router.push("/#skills"), 800);
                return;

            case "about":
                responseLines = es ? [
                    { text: "", color: "" },
                    { text: "┌─────────────────────────────────────┐", color: "text-border" },
                    { text: "│  Bruno Velasques                    │", color: "text-foreground/80" },
                    { text: "│  Software Developer & UI/UX Designer│", color: "text-emerald-500" },
                    { text: "│  📍 Ica, Perú                       │", color: "text-foreground/60" },
                    { text: "│  Fintech · Full Stack · IA          │", color: "text-foreground/50" },
                    { text: "└─────────────────────────────────────┘", color: "text-border" },
                    { text: "", color: "" },
                ] : [
                    { text: "", color: "" },
                    { text: "┌─────────────────────────────────────┐", color: "text-border" },
                    { text: "│  Bruno Velasques                    │", color: "text-foreground/80" },
                    { text: "│  Software Developer & UI/UX Designer│", color: "text-emerald-500" },
                    { text: "│  📍 Ica, Peru                       │", color: "text-foreground/60" },
                    { text: "│  Fintech · Full Stack · AI          │", color: "text-foreground/50" },
                    { text: "└─────────────────────────────────────┘", color: "text-border" },
                    { text: "", color: "" },
                ];
                break;

            case "clear":
                setLines([]);
                setInputValue("");
                return;

            case "sudo rm -rf /":
            case "sudo rm -rf":
                responseLines = [
                    { text: es ? "⨯ Buen intento... 😏" : "⨯ Nice try... 😏", color: "text-red-400" },
                ];
                break;

            case "":
                setLines(prev => [...prev, commandLine]);
                setInputValue("");
                return;

            default:
                responseLines = [
                    { text: es 
                        ? `⨯ Comando no reconocido: '${trimmed}'. Escribe 'help' para ver opciones.`
                        : `⨯ Command not recognized: '${trimmed}'. Type 'help' for options.`,
                      color: "text-red-400/70" 
                    },
                ];
                break;
        }

        setLines(prev => [...prev, commandLine, ...responseLines]);
        setInputValue("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            processCommand(inputValue);
        }
    };

    return (
        <main 
            className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background"
            onClick={() => inputRef.current?.focus()}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(150,150,150,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(150,150,150,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_10%,#000_100%)] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                {/* Interactive Terminal Window */}
                <div className="w-full rounded-xl border border-border/50 bg-foreground/[0.02] overflow-hidden">
                    {/* Terminal Tab Bar */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                        <span className="ml-2 font-mono text-[11px] text-muted-foreground/50 select-none">
                            ~/portfolio — {es ? "terminal interactiva" : "interactive terminal"}
                        </span>
                    </div>

                    {/* Terminal Body */}
                    <div 
                        ref={scrollRef}
                        className="p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-1 max-h-[60vh] overflow-y-auto scrollbar-subtle"
                    >
                        {/* Initial animated lines */}
                        {lines.map((line, i) => (
                            i < initialLines.length ? (
                                <motion.p 
                                    key={`init-${i}`}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={lineVariants}
                                    className={`${line.color} ${line.text.startsWith("⨯") ? "font-semibold" : ""} ${line.text.startsWith("GET") ? "mt-3 pt-3 border-t border-border/20" : ""} min-h-[1.25rem]`}
                                >
                                    {line.text}
                                </motion.p>
                            ) : (
                                <p 
                                    key={`dynamic-${i}`}
                                    className={`${line.color} ${line.isCommand ? "mt-2" : ""} ${line.text.startsWith("⨯") ? "font-semibold" : ""} min-h-[1.25rem] whitespace-pre`}
                                >
                                    {line.text}
                                </p>
                            )
                        ))}

                        {/* Interactive Input Line */}
                        {showInput && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/20"
                            >
                                <span className="text-emerald-500 select-none shrink-0">$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 bg-transparent outline-none border-none text-foreground/90 caret-emerald-500 font-mono text-xs sm:text-sm placeholder:text-muted-foreground/30"
                                    placeholder={es ? "escribe un comando..." : "type a command..."}
                                    autoComplete="off"
                                    spellCheck={false}
                                />
                                <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse shrink-0"></span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
