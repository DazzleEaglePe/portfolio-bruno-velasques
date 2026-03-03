"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

const loadingMessages = {
    es: [
        <><span className="font-light">Preparando mi </span><span className="font-semibold text-white">portfolio</span><span className="font-light">...</span></>,
        <><span className="font-semibold text-white">+2 años</span><span className="font-light"> creando soluciones digitales</span></>,
        <><span className="font-semibold text-white">Fintech</span><span className="font-light"> · </span><span className="font-semibold text-white">Cloud</span><span className="font-light"> · </span><span className="font-semibold text-white">Automatización</span></>,
        <><span className="font-light">¿Listo para </span><span className="font-semibold text-white">conocer mi trabajo</span><span className="font-light">?</span></>,
    ],
    en: [
        <><span className="font-light">Preparing my </span><span className="font-semibold text-white">portfolio</span><span className="font-light">...</span></>,
        <><span className="font-semibold text-white">2+ years</span><span className="font-light"> building digital solutions</span></>,
        <><span className="font-semibold text-white">Fintech</span><span className="font-light"> · </span><span className="font-semibold text-white">Cloud</span><span className="font-light"> · </span><span className="font-semibold text-white">Automation</span></>,
        <><span className="font-light">Ready to </span><span className="font-semibold text-white">explore my work</span><span className="font-light">?</span></>,
    ],
};

// ─── Cycling Language Heading ────────────────────────────────────────
const langLabels = [
    <><span className="font-light">Elige tu </span><span className="font-semibold text-white">idioma</span></>,
    <><span className="font-light">Choose your </span><span className="font-semibold text-white">language</span></>,
];

function LanguageHeading() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIndex((prev) => (prev + 1) % langLabels.length), 2000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="relative h-9 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    className="text-xl md:text-2xl text-zinc-400 font-light tracking-tight text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                    {langLabels[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

type Step = "lang" | "messages";

export default function InitialLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    const [step, setStep] = useState<Step>("lang");
    const [messageIndex, setMessageIndex] = useState(0);
    const { locale, setLocale } = useI18n();

    const messages = loadingMessages[locale] || loadingMessages.es;

    // Check sessionStorage before rendering anything
    useEffect(() => {
        if (sessionStorage.getItem("loaderShown")) {
            setIsLoading(false);
        }
        setChecked(true);
    }, []);

    const handleLanguageSelect = (lang: "es" | "en") => {
        setLocale(lang);
        setStep("messages");
        // Mark loader as shown for this session
        sessionStorage.setItem("loaderShown", "1");
    };

    // Lock scroll while loader is active, reset to top on exit
    useEffect(() => {
        // Prevent browser from restoring scroll position on refresh
        if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        if (isLoading) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            window.scrollTo(0, 0);
        }
        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [isLoading]);

    // Start message cycling when entering messages step
    useEffect(() => {
        if (step !== "messages") return;

        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => {
                if (prev >= messages.length - 1) {
                    clearInterval(messageInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1800);

        const exitTimer = setTimeout(() => setIsLoading(false), 7800);

        return () => {
            clearInterval(messageInterval);
            clearTimeout(exitTimer);
        };
    }, [step, messages.length]);

    // Show skeleton while checking sessionStorage (prevents flash)
    if (!checked) return (
        <div className="fixed inset-0 z-[99999] bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 animate-pulse">
                {/* Navbar skeleton — matches real: py-4 md:py-6, logo text-xl, nav h-8 rounded-full */}
                <div className="flex items-center justify-between py-4 md:py-6">
                    <div className="h-6 w-10 bg-secondary rounded" />
                    <div className="hidden md:flex items-center gap-1">
                        <div className="h-8 w-20 bg-secondary/40 rounded-full" />
                        <div className="h-8 w-24 bg-secondary/40 rounded-full" />
                        <div className="h-8 w-16 bg-secondary/40 rounded-full" />
                        <div className="h-8 w-20 bg-secondary/40 rounded-full" />
                        <div className="h-8 w-20 bg-secondary/40 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-secondary/40 rounded-full" />
                        <div className="h-8 w-8 bg-secondary/40 rounded-full" />
                        <div className="h-8 w-8 bg-secondary/40 rounded-full md:hidden" />
                    </div>
                </div>

                {/* Hero skeleton — matches real: pt-16 md:pt-24, heading ~80px, flex-col lg:flex-row */}
                <div className="pt-16 md:pt-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Left: Text Content */}
                    <div className="max-w-2xl flex-1 w-full space-y-5">
                        {/* Greeting — text-sm font-mono */}
                        <div className="h-4 w-40 bg-secondary/40 rounded" />
                        {/* Name heading — text-5xl to text-[80px] */}
                        <div className="space-y-2">
                            <div className="h-16 sm:h-18 md:h-20 w-72 sm:w-80 md:w-96 bg-secondary rounded-lg" />
                            <div className="h-16 sm:h-18 md:h-20 w-56 sm:w-64 md:w-80 bg-secondary rounded-lg" />
                        </div>
                        {/* Subtitle — text-base md:text-lg max-w-lg */}
                        <div className="space-y-2 pt-2">
                            <div className="h-5 w-full max-w-lg bg-secondary/30 rounded" />
                            <div className="h-5 w-4/5 max-w-md bg-secondary/30 rounded" />
                        </div>
                        {/* Buttons — size="lg" rounded-full h-11 */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="h-11 w-40 bg-secondary rounded-full" />
                            <div className="h-11 w-32 bg-secondary/40 rounded-full" />
                        </div>
                    </div>

                    {/* Right: Card — matches HeroGiveawayCard max-w-md, aspect-square sm/md:h-500 lg:h-550 */}
                    <div className="flex-[1.2] w-full mt-10 lg:mt-0 flex items-center justify-center lg:justify-end">
                        <div className="w-full max-w-md aspect-square md:aspect-auto md:h-[500px] lg:h-[550px] bg-secondary/20 rounded-[2.5rem] border border-border/20" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isLoading && (
                <>
                    {/* Inject global style to robustly lock scroll and hide scrollbar before React hydration */}
                    <style dangerouslySetInnerHTML={{ __html: `html, body { overflow: hidden !important; }` }} />
                    <motion.div
                        key="initial-loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950"
                    >
                        <AnimatePresence mode="wait">
                            {step === "lang" && (
                                <motion.div
                                    key="lang-step"
                                    className="flex flex-col items-center gap-10"
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <LanguageHeading />

                                    <div className="flex gap-6">
                                        {/* Español */}
                                        <button
                                            onClick={() => handleLanguageSelect("es")}
                                            className="group flex flex-col items-center gap-3 px-8 py-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
                                        >
                                            <svg className="w-10 h-10 rounded-md shadow-lg group-hover:scale-110 transition-transform duration-300" viewBox="0 0 640 480" fill="none">
                                                <rect width="640" height="480" fill="#AA151B" />
                                                <rect y="120" width="640" height="240" fill="#F1BF00" />
                                            </svg>
                                            <span className="text-sm text-zinc-400 group-hover:text-white transition-colors font-medium tracking-wide">Español</span>
                                        </button>

                                        {/* English */}
                                        <button
                                            onClick={() => handleLanguageSelect("en")}
                                            className="group flex flex-col items-center gap-3 px-8 py-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
                                        >
                                            <svg className="w-10 h-10 rounded-md shadow-lg group-hover:scale-110 transition-transform duration-300" viewBox="0 0 640 480" fill="none">
                                                <rect width="640" height="480" fill="#012169" />
                                                <path d="M0 0L640 480M640 0L0 480" stroke="#FFF" strokeWidth="60" />
                                                <path d="M0 0L640 480M640 0L0 480" stroke="#C8102E" strokeWidth="40" clipPath="polygon(0 0,320 240,0 480,0 0)" />
                                                <path d="M320 0V480M0 240H640" stroke="#FFF" strokeWidth="100" />
                                                <path d="M320 0V480M0 240H640" stroke="#C8102E" strokeWidth="60" />
                                            </svg>
                                            <span className="text-sm text-zinc-400 group-hover:text-white transition-colors font-medium tracking-wide">English</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === "messages" && (
                                <motion.p
                                    key={`msg-${messageIndex}`}
                                    className="text-2xl md:text-4xl text-zinc-400 tracking-tight text-center px-8 max-w-2xl leading-snug"
                                    initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    {messages[messageIndex]}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
