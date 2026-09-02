"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { useI18n } from "@/lib/i18n";

const loadingMessages = {
    es: [
        {
            plainText: "Preparando una experiencia con criterio.",
            content: <>Preparando una experiencia <span className="text-white">con criterio.</span></>,
        },
        {
            plainText: "Software, diseño e inteligencia artificial.",
            content: <>Software, diseño e <span className="gradient-text">inteligencia artificial.</span></>,
        },
        {
            plainText: "15+ productos llevados a producción.",
            content: <><span className="text-white">15+ productos</span> llevados a producción.</>,
        },
        {
            plainText: "Bienvenido a mi trabajo.",
            content: <>Bienvenido a <span className="text-[#baff66]">mi trabajo.</span></>,
        },
    ],
    en: [
        {
            plainText: "Preparing an experience with intention.",
            content: <>Preparing an experience <span className="text-white">with intention.</span></>,
        },
        {
            plainText: "Software, design, and artificial intelligence.",
            content: <>Software, design, and <span className="gradient-text">artificial intelligence.</span></>,
        },
        {
            plainText: "15+ products shipped to production.",
            content: <><span className="text-white">15+ products</span> shipped to production.</>,
        },
        {
            plainText: "Welcome to my work.",
            content: <>Welcome to <span className="text-[#baff66]">my work.</span></>,
        },
    ],
};

const getReadingDuration = (text: string) => Math.min(2600, Math.max(1750, 950 + text.length * 24));

const languagePrompts = [
    {
        eyebrow: "Primero, lo esencial",
        prefix: "Elige tu",
        keyword: "idioma.",
        description: "Selecciona una opción para descubrir el portafolio en tu idioma preferido.",
    },
    {
        eyebrow: "First things first",
        prefix: "Choose your",
        keyword: "language.",
        description: "Select an option to explore the portfolio in your preferred language.",
    },
];

type Step = "lang" | "messages";

export default function InitialLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    const [step, setStep] = useState<Step>("lang");
    const [messageIndex, setMessageIndex] = useState(0);
    const [promptIndex, setPromptIndex] = useState(0);
    const [keywordIndex, setKeywordIndex] = useState(0);
    const [descriptionIndex, setDescriptionIndex] = useState(0);
    const { locale, setLocale } = useI18n();
    const messages = loadingMessages[locale] || loadingMessages.es;
    const messageDuration = getReadingDuration(messages[messageIndex].plainText);

    useEffect(() => {
        const forceIntro = new URLSearchParams(window.location.search).get("intro") === "1";
        if (!forceIntro && sessionStorage.getItem("loaderShown")) {
            setIsLoading(false);
        }
        setChecked(true);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        document.documentElement.style.overflow = isLoading ? "hidden" : "";
        document.body.style.overflow = isLoading ? "hidden" : "";

        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [isLoading]);

    useEffect(() => {
        if (step !== "lang") return;

        let keywordTimer: number | undefined;
        let descriptionTimer: number | undefined;
        const promptTimer = window.setInterval(() => {
            setPromptIndex((current) => {
                const next = (current + 1) % languagePrompts.length;
                keywordTimer = window.setTimeout(() => setKeywordIndex(next), 360);
                descriptionTimer = window.setTimeout(() => setDescriptionIndex(next), 520);
                return next;
            });
        }, 2800);

        return () => {
            window.clearInterval(promptTimer);
            if (keywordTimer) window.clearTimeout(keywordTimer);
            if (descriptionTimer) window.clearTimeout(descriptionTimer);
        };
    }, [step]);

    useEffect(() => {
        if (step !== "messages") return;

        const messageTimer = window.setTimeout(() => {
            if (messageIndex >= messages.length - 1) {
                setIsLoading(false);
                return;
            }

            setMessageIndex((current) => current + 1);
        }, messageDuration);

        return () => window.clearTimeout(messageTimer);
    }, [messageDuration, messageIndex, messages.length, step]);

    const handleLanguageSelect = (language: "es" | "en") => {
        setLocale(language);
        setMessageIndex(0);
        setStep("messages");
        sessionStorage.setItem("loaderShown", "1");
    };

    const handleSkip = () => {
        sessionStorage.setItem("loaderShown", "1");
        setIsLoading(false);
    };

    if (!checked) {
        return (
            <div className="fixed inset-0 z-[99999] grid place-items-center bg-[#050505]">
                <span className="grid size-11 place-items-center rounded-full border border-white/10 text-xs font-bold text-white">BV</span>
            </div>
        );
    }

    return (
        <AnimatePresence>
            {isLoading && (
                <>
                    <style dangerouslySetInnerHTML={{ __html: "html, body { overflow: hidden !important; }" }} />
                    <motion.div
                        key="initial-loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.015, filter: "blur(5px)", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
                        className="fixed inset-0 z-[99999] isolate overflow-hidden bg-[#050505] text-white"
                    >
                        <div className="hero-orbits pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[760px] w-[960px] -translate-x-1/2 -translate-y-1/2 opacity-75" />
                        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
                        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8e61ff]/12 blur-[120px]" />

                        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-8">
                            <div className="flex items-center gap-3">
                                <span className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-[11px] font-bold">BV</span>
                                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600 sm:block">Portfolio / 2026</span>
                            </div>
                            <button type="button" onClick={handleSkip} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 transition hover:border-white/20 hover:text-white">
                                Skip
                            </button>
                        </div>

                        <div className="flex min-h-full items-center justify-center px-5 py-24">
                            <AnimatePresence mode="wait">
                                {step === "lang" ? (
                                    <motion.div
                                        key="language"
                                        initial={{ opacity: 0, y: 18, filter: "blur(7px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -18, filter: "blur(7px)" }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        className="w-full max-w-3xl text-center"
                                    >
                                        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                                            <Sparkles className="size-3.5 text-[#baff66]" />
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.span
                                                    key={descriptionIndex}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    {languagePrompts[descriptionIndex].eyebrow}
                                                </motion.span>
                                            </AnimatePresence>
                                        </div>
                                        <h1 className="mx-auto mt-6 flex min-h-[1.1em] max-w-3xl flex-wrap items-center justify-center gap-x-[0.22em] text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.span
                                                    key={`prefix-${promptIndex}`}
                                                    initial={{ opacity: 0, y: 12, filter: "blur(7px)" }}
                                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                    exit={{ opacity: 0, y: -12, filter: "blur(7px)" }}
                                                    transition={{ duration: 0.32, ease: "easeOut" }}
                                                >
                                                    {languagePrompts[promptIndex].prefix}
                                                </motion.span>
                                            </AnimatePresence>
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.span
                                                    key={`keyword-${keywordIndex}`}
                                                    initial={{ opacity: 0, y: 12, filter: "blur(7px)" }}
                                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                    exit={{ opacity: 0, y: -12, filter: "blur(7px)" }}
                                                    transition={{ duration: 0.32, ease: "easeOut" }}
                                                    className="gradient-text pb-1"
                                                >
                                                    {languagePrompts[keywordIndex].keyword}
                                                </motion.span>
                                            </AnimatePresence>
                                        </h1>
                                        <div className="relative mx-auto mt-5 min-h-12 max-w-md">
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.p
                                                    key={`description-${descriptionIndex}`}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="absolute inset-0 text-sm leading-6 text-zinc-500"
                                                >
                                                    {languagePrompts[descriptionIndex].description}
                                                </motion.p>
                                            </AnimatePresence>
                                        </div>

                                        <div className="mt-9 grid gap-3 sm:grid-cols-2">
                                            {[
                                                { code: "ES", name: "Español", detail: "Latinoamérica", value: "es" as const, Flag: Flags.ES },
                                                { code: "EN", name: "English", detail: "International", value: "en" as const, Flag: Flags.GB },
                                            ].map((language, index) => (
                                                <motion.button
                                                    key={language.code}
                                                    type="button"
                                                    onClick={() => handleLanguageSelect(language.value)}
                                                    initial={{ opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.12 + index * 0.07 }}
                                                    className="group flex min-h-32 items-center justify-between rounded-[24px] border border-white/[0.08] bg-[#101010]/90 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#141414]"
                                                    aria-label={`Select ${language.name}`}
                                                >
                                                    <span className="flex items-center gap-4">
                                                        <span className={`relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-full border-2 bg-[#171717] shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${index === 0 ? "border-[#baff66]/55" : "border-[#8e61ff]/65"}`}>
                                                            <language.Flag className="h-full w-full scale-[1.5]" title={language.name} />
                                                        </span>
                                                        <span><span className="block text-base font-semibold text-white">{language.name}</span><span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-zinc-600">{language.detail}</span></span>
                                                    </span>
                                                    <ArrowUpRight className="size-4 text-zinc-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="messages"
                                        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="w-full max-w-4xl text-center"
                                    >
                                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#baff66]">
                                            {String(messageIndex + 1).padStart(2, "0")} / {String(messages.length).padStart(2, "0")}
                                        </p>
                                        <div className="relative mt-6 min-h-36 sm:min-h-44">
                                            <AnimatePresence mode="wait">
                                                <motion.p
                                                    key={messageIndex}
                                                    initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                    exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                                                    transition={{ duration: 0.38, ease: "easeOut" }}
                                                    className="absolute inset-0 flex items-center justify-center text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] text-zinc-500 sm:text-5xl"
                                                >
                                                    {messages[messageIndex].content}
                                                </motion.p>
                                            </AnimatePresence>
                                        </div>
                                        <div className="mx-auto mt-7 flex max-w-md gap-2">
                                            {messages.map((_, index) => (
                                                <span key={index} className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                                                    {index < messageIndex && (
                                                        <span className="block h-full w-full rounded-full bg-gradient-to-r from-[#8e61ff] to-[#baff66]" />
                                                    )}
                                                    {index === messageIndex && (
                                                        <motion.span
                                                            key={`progress-${messageIndex}`}
                                                            className="block h-full rounded-full bg-gradient-to-r from-[#8e61ff] to-[#baff66]"
                                                            initial={{ width: "0%" }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ duration: messageDuration / 1000, ease: "linear" }}
                                                        />
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-700 sm:p-8">
                            <span>Software + AI + Product</span>
                            <span>Ica, Perú</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
