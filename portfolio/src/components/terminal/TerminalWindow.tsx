import { motion, AnimatePresence } from "framer-motion";
import { TerminalState } from "./types";
import { X, Minus, Maximize2 } from "lucide-react";

// Framer motion variants for the terminal text lines
const lineVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
        opacity: 1, x: 0,
        transition: { delay: 0.15 * i, duration: 0.3 },
    }),
};

export function TerminalWindow({ terminal }: { terminal: TerminalState }) {
    const {
        windowState, setWindowState,
        isClosed, setIsClosed,
        windowSize, setWindowSize,
        lines, initialLines, showInput, inputValue, setInputValue,
        inputRef, scrollRef, constraintsRef, handleKeyDown, es, hasAnimatedRef
    } = terminal;

    return (
        <AnimatePresence>
            {!isClosed && windowState !== "minimized" && (
                <motion.div
                    drag={windowState !== "maximized"}
                    dragConstraints={constraintsRef}
                    dragMomentum={false}
                    dragElastic={0.05}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1,
                        ...(windowState === "maximized" ? { x: 0, y: 0 } : {})
                    }}
                    exit={{ opacity: 0, y: 40, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`z-10 flex flex-col ${
                        windowState === "maximized" 
                            ? "fixed inset-4 sm:inset-6 z-50" 
                            : "relative"
                    }`}
                    style={{ touchAction: "none" }}
                >
                    <div 
                        className={`rounded-xl border border-border/50 bg-foreground/[0.02] flex flex-col shadow-2xl backdrop-blur-sm relative ${
                            windowState === "maximized" 
                                ? "w-full h-full" 
                                : ""
                        }`}
                        style={windowState === "maximized" ? {} : {
                            width: windowSize.width,
                            height: windowSize.height,
                            minWidth: "300px",
                            minHeight: "300px",
                            maxWidth: "95vw",
                            maxHeight: "90vh",
                        }}
                    >
                        {/* Terminal Header - Drag Handle */}
                        <div 
                            className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 cursor-grab active:cursor-grabbing select-none shrink-0"
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            {/* Window Controls */}
                            <div className="flex gap-2 group">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setIsClosed(true); }}
                                    className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center"
                                    title={es ? "Cerrar" : "Close"}
                                >
                                    <X className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setWindowState("minimized"); }}
                                    className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center"
                                    title={es ? "Minimizar" : "Minimize"}
                                >
                                    <Minus className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setWindowState(prev => prev === "maximized" ? "normal" : "maximized"); }}
                                    className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center"
                                    title={es ? "Maximizar" : "Maximize"}
                                >
                                    <Maximize2 className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                                </button>
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
                                windowState === "maximized" ? "" : "max-h-[70vh]"
                            }`}
                        >
                            {lines.map((line, i) => (
                                i < initialLines.length ? (
                                    <motion.p 
                                        key={`init-${i}`}
                                        custom={i}
                                        initial={hasAnimatedRef.current ? "visible" : "hidden"}
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

                        {/* Custom Resize Handle (Bottom Right) */}
                        {windowState === "normal" && (
                            <motion.div
                                className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-50 flex items-end justify-end p-1"
                                onPan={(e, info) => {
                                    setWindowSize(prev => ({
                                        width: Math.max(300, prev.width + info.delta.x),
                                        height: Math.max(300, prev.height + info.delta.y)
                                    }));
                                }}
                            >
                                <svg viewBox="0 0 24 24" className="w-3 h-3 text-muted-foreground/30 rotate-90" stroke="currentColor" strokeWidth="2" fill="none">
                                    <path d="M21 15l-6 6" />
                                    <path d="M21 8l-13 13" />
                                </svg>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
