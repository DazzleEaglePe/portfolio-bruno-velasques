"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [windowState, setWindowState] = useState<"normal" | "minimized" | "maximized">("normal");
    const [isClosed, setIsClosed] = useState(false);

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

    const navigateTo = (commandLine: TerminalLine, path: string, label: string) => {
        const msg: TerminalLine = { text: es ? `✓ cd ${label}/ — Redirigiendo...` : `✓ cd ${label}/ — Redirecting...`, color: "text-emerald-500" };
        setLines(prev => [...prev, commandLine, msg]);
        setCommandHistory(prev => [...prev, `cd ${label}`]);
        setHistoryIndex(-1);
        setInputValue("");
        setTimeout(() => router.push(path), 800);
    };

    const processCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        const commandLine: TerminalLine = { text: `$ ${cmd}`, color: "text-foreground/80", isCommand: true };

        // Handle cd <section> dynamically
        if (trimmed.startsWith("cd ")) {
            const target = trimmed.replace("cd ", "").trim().replace(/\/$/, "");
            const routes: Record<string, string> = {
                "home": "/", "/": "/", "~": "/", "..": "/",
                "about": "/#about",
                "experience": "/#experience",
                "skills": "/#skills",
                "projects": "/#projects",
                "contact": "/#contact",
            };
            if (routes[target]) {
                navigateTo(commandLine, routes[target], target === ".." ? "home" : target);
                return;
            } else {
                const errLines: TerminalLine[] = [
                    { text: es ? `⨯ cd: no existe el directorio: '${target}'` : `⨯ cd: no such directory: '${target}'`, color: "text-red-400/70" },
                    { text: es ? "  Usa 'ls' para ver las secciones disponibles." : "  Use 'ls' to see available sections.", color: "text-foreground/40" },
                ];
                setLines(prev => [...prev, commandLine, ...errLines]);
                setCommandHistory(prev => [...prev, cmd.trim()]);
                setHistoryIndex(-1);
                setInputValue("");
                return;
            }
        }

        let responseLines: TerminalLine[] = [];

        switch (trimmed) {
            case "help":
                responseLines = es ? [
                    { text: "", color: "" },
                    { text: "Comandos disponibles:", color: "text-emerald-500" },
                    { text: "  help             — Muestra esta ayuda", color: "text-foreground/60" },
                    { text: "  whoami           — ¿Quién soy?", color: "text-foreground/60" },
                    { text: "  ls               — Listar secciones", color: "text-foreground/60" },
                    { text: "  cd <sección>     — Navegar a una sección", color: "text-foreground/60" },
                    { text: "  cat README.md    — Leer sobre el proyecto", color: "text-foreground/60" },
                    { text: "  home             — Ir al portafolio", color: "text-foreground/60" },
                    { text: "  projects         — Ver mis proyectos", color: "text-foreground/60" },
                    { text: "  about            — Sobre mí", color: "text-foreground/60" },
                    { text: "  contact          — Ir a contacto", color: "text-foreground/60" },
                    { text: "  skills           — Ver mis tecnologías", color: "text-foreground/60" },
                    { text: "  clear            — Limpiar terminal", color: "text-foreground/60" },
                    { text: "", color: "" },
                    { text: "Tip: usa ↑ ↓ para navegar el historial.", color: "text-foreground/30" },
                    { text: "", color: "" },
                ] : [
                    { text: "", color: "" },
                    { text: "Available commands:", color: "text-emerald-500" },
                    { text: "  help             — Show this help", color: "text-foreground/60" },
                    { text: "  whoami           — Who am I?", color: "text-foreground/60" },
                    { text: "  ls               — List sections", color: "text-foreground/60" },
                    { text: "  cd <section>     — Navigate to a section", color: "text-foreground/60" },
                    { text: "  cat README.md    — Read about this project", color: "text-foreground/60" },
                    { text: "  home             — Go to portfolio", color: "text-foreground/60" },
                    { text: "  projects         — View my projects", color: "text-foreground/60" },
                    { text: "  about            — About me", color: "text-foreground/60" },
                    { text: "  contact          — Go to contact", color: "text-foreground/60" },
                    { text: "  skills           — View my technologies", color: "text-foreground/60" },
                    { text: "  clear            — Clear terminal", color: "text-foreground/60" },
                    { text: "", color: "" },
                    { text: "Tip: use ↑ ↓ to navigate command history.", color: "text-foreground/30" },
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

            case "whoami":
                responseLines = [
                    { text: "", color: "" },
                    { text: "  ____                          ", color: "text-emerald-500/60" },
                    { text: " | __ ) _ __ _   _ _ __   ___   ", color: "text-emerald-500/60" },
                    { text: " |  _ \\| '__| | | | '_ \\ / _ \\  ", color: "text-emerald-500/60" },
                    { text: " | |_) | |  | |_| | | | | (_) | ", color: "text-emerald-500/60" },
                    { text: " |____/|_|   \\__,_|_| |_|\\___/  ", color: "text-emerald-500/60" },
                    { text: "", color: "" },
                    { text: es ? "  Bruno Velasques" : "  Bruno Velasques", color: "text-foreground/80" },
                    { text: "  Software Developer & UI/UX Designer", color: "text-emerald-500" },
                    { text: es ? "  📍 Ica, Perú" : "  📍 Ica, Peru", color: "text-foreground/60" },
                    { text: es ? "  🔗 brunovelasques.dev" : "  🔗 brunovelasques.dev", color: "text-foreground/50" },
                    { text: "", color: "" },
                ];
                break;

            case "ls":
            case "dir":
                responseLines = es ? [
                    { text: "", color: "" },
                    { text: "  📂 home/         → Portafolio principal", color: "text-foreground/60" },
                    { text: "  📂 about/        → Sobre mí", color: "text-foreground/60" },
                    { text: "  📂 experience/   → Experiencia laboral", color: "text-foreground/60" },
                    { text: "  📂 skills/       → Tecnologías", color: "text-foreground/60" },
                    { text: "  📂 projects/     → Proyectos", color: "text-foreground/60" },
                    { text: "  📂 contact/      → Contacto", color: "text-foreground/60" },
                    { text: "  ⚠️  not-found    → Estás aquí", color: "text-yellow-500/70" },
                    { text: "", color: "" },
                ] : [
                    { text: "", color: "" },
                    { text: "  📂 home/         → Main portfolio", color: "text-foreground/60" },
                    { text: "  📂 about/        → About me", color: "text-foreground/60" },
                    { text: "  📂 experience/   → Work experience", color: "text-foreground/60" },
                    { text: "  📂 skills/       → Technologies", color: "text-foreground/60" },
                    { text: "  📂 projects/     → Projects", color: "text-foreground/60" },
                    { text: "  📂 contact/      → Contact", color: "text-foreground/60" },
                    { text: "  ⚠️  not-found    → You are here", color: "text-yellow-500/70" },
                    { text: "", color: "" },
                ];
                break;

            case "clear":
                setLines([]);
                setInputValue("");
                return;

            case "cat readme.md":
            case "cat readme":
                responseLines = es ? [
                    { text: "", color: "" },
                    { text: "# brunovelasques.dev", color: "text-foreground/80" },
                    { text: "", color: "" },
                    { text: "Portafolio personal construido con:", color: "text-foreground/60" },
                    { text: "  ◆ Next.js 16  ◆ React 18  ◆ Tailwind CSS", color: "text-emerald-500/70" },
                    { text: "  ◆ Framer Motion  ◆ Shadcn/UI  ◆ TypeScript", color: "text-emerald-500/70" },
                    { text: "", color: "" },
                    { text: "## Secciones", color: "text-foreground/80" },
                    { text: "  → Hero con roles dinámicos (typewriter)", color: "text-foreground/50" },
                    { text: "  → Experiencia laboral + freelance", color: "text-foreground/50" },
                    { text: "  → Proyectos con hover interactivo", color: "text-foreground/50" },
                    { text: "  → Skills slider animado", color: "text-foreground/50" },
                    { text: "  → Terminal 404 interactiva (¡estás aquí!)", color: "text-yellow-500/70" },
                    { text: "", color: "" },
                    { text: "## Autor", color: "text-foreground/80" },
                    { text: "  Bruno Velasques — @velasques_bruno", color: "text-foreground/50" },
                    { text: "  https://brunovelasques.dev", color: "text-emerald-500/60" },
                    { text: "", color: "" },
                ] : [
                    { text: "", color: "" },
                    { text: "# brunovelasques.dev", color: "text-foreground/80" },
                    { text: "", color: "" },
                    { text: "Personal portfolio built with:", color: "text-foreground/60" },
                    { text: "  ◆ Next.js 16  ◆ React 18  ◆ Tailwind CSS", color: "text-emerald-500/70" },
                    { text: "  ◆ Framer Motion  ◆ Shadcn/UI  ◆ TypeScript", color: "text-emerald-500/70" },
                    { text: "", color: "" },
                    { text: "## Sections", color: "text-foreground/80" },
                    { text: "  → Hero with dynamic roles (typewriter)", color: "text-foreground/50" },
                    { text: "  → Work experience + freelance", color: "text-foreground/50" },
                    { text: "  → Projects with interactive hover", color: "text-foreground/50" },
                    { text: "  → Animated skills slider", color: "text-foreground/50" },
                    { text: "  → Interactive 404 terminal (you are here!)", color: "text-yellow-500/70" },
                    { text: "", color: "" },
                    { text: "## Author", color: "text-foreground/80" },
                    { text: "  Bruno Velasques — @velasques_bruno", color: "text-foreground/50" },
                    { text: "  https://brunovelasques.dev", color: "text-emerald-500/60" },
                    { text: "", color: "" },
                ];
                break;

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
        if (trimmed) {
            setCommandHistory(prev => [...prev, cmd.trim()]);
            setHistoryIndex(-1);
        }
        setInputValue("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            processCommand(inputValue);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 
                    ? commandHistory.length - 1 
                    : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInputValue(commandHistory[newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex === -1) return;
            const newIndex = historyIndex + 1;
            if (newIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                setInputValue("");
            } else {
                setHistoryIndex(newIndex);
                setInputValue(commandHistory[newIndex]);
            }
        }
    };

    return (
        <main 
            ref={constraintsRef}
            className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background"
            onClick={() => windowState !== "minimized" && !isClosed && inputRef.current?.focus()}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(150,150,150,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(150,150,150,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_10%,#000_100%)] pointer-events-none"></div>

            {/* Terminal Window */}
            <AnimatePresence>
                {!isClosed && windowState !== "minimized" && (
                    <motion.div
                        drag={windowState !== "maximized"}
                        dragConstraints={constraintsRef}
                        dragMomentum={false}
                        dragElastic={0.05}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`relative z-10 flex flex-col items-center ${
                            windowState === "maximized" 
                                ? "fixed inset-4 max-w-none w-auto" 
                                : "w-full max-w-2xl"
                        }`}
                        style={{ touchAction: "none" }}
                    >
                        <div className={`w-full rounded-xl border border-border/50 bg-foreground/[0.02] overflow-hidden flex flex-col ${
                            windowState === "maximized" ? "h-full" : ""
                        }`}>
                            {/* Terminal Header - Drag Handle */}
                            <div 
                                className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 cursor-grab active:cursor-grabbing select-none shrink-0"
                                onPointerDown={(e) => e.stopPropagation()}
                            >
                                {/* Window Controls */}
                                <div className="flex gap-2">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setIsClosed(true); }}
                                        className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors hover:scale-110 active:scale-95"
                                        title={es ? "Cerrar" : "Close"}
                                    />
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setWindowState("minimized"); }}
                                        className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors hover:scale-110 active:scale-95"
                                        title={es ? "Minimizar" : "Minimize"}
                                    />
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setWindowState(prev => prev === "maximized" ? "normal" : "maximized"); }}
                                        className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors hover:scale-110 active:scale-95"
                                        title={es ? "Maximizar" : "Maximize"}
                                    />
                                </div>
                                <span className="ml-2 font-mono text-[11px] text-muted-foreground/50 select-none flex-1 text-center">
                                    ~/portfolio — {es ? "terminal interactiva" : "interactive terminal"}
                                </span>
                                {/* Spacer to center the title */}
                                <div className="w-[52px]"></div>
                            </div>

                            {/* Terminal Body */}
                            <div 
                                ref={scrollRef}
                                className={`p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-1 overflow-y-auto scrollbar-subtle flex-1 ${
                                    windowState === "maximized" ? "" : "max-h-[60vh]"
                                }`}
                            >
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* macOS-style Floating Dock / Taskbar */}
            <AnimatePresence>
                {(windowState === "minimized" || isClosed) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-border/50 bg-foreground/[0.03] backdrop-blur-xl shadow-lg">
                            <button
                                onClick={() => { setWindowState("normal"); setIsClosed(false); setTimeout(() => inputRef.current?.focus(), 100); }}
                                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-foreground/5 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-foreground/[0.06] border border-border/50 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                </div>
                                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                    {es ? "Terminal" : "Terminal"}
                                </span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
