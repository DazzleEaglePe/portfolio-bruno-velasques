"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPersonalData } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { fadeUp } from "@/lib/animations";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";

const ROLES_ES = ["Software Developer", "UI/UX Designer", "Consultor TI", "Automatización & IA", "Fintech Engineer"];
const ROLES_EN = ["Software Developer", "UI/UX Designer", "IT Consultant", "AI & Automation Builder", "Fintech Engineer"];

export default function HeroSection() {
    const { t, locale } = useI18n();
    const personalData = getPersonalData(locale);
    const roles = locale === "es" ? ROLES_ES : ROLES_EN;
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [roles.length]);

    return (
        <section id="hero" className="scroll-m-28 pb-4 pt-10 sm:pt-16">
            <motion.div {...fadeUp} className="relative isolate overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#070707] px-5 pb-5 pt-14 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:px-8 sm:pt-20 lg:px-12">
                <div className="hero-orbits pointer-events-none absolute inset-x-0 top-8 -z-10 mx-auto h-[560px] max-w-[880px] opacity-80" />
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_68%)]" />

                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-zinc-300 backdrop-blur-xl sm:text-xs">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#baff66] opacity-50" />
                            <span className="relative inline-flex size-2 rounded-full bg-[#baff66]" />
                        </span>
                        {locale === "es" ? "Disponible para proyectos seleccionados" : "Available for selected projects"}
                    </div>

                    <h1 className="max-w-[980px] text-balance text-[clamp(3rem,8.2vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
                        {locale === "es" ? "Diseño y construyo" : "I design and build"}
                        <span className="gradient-text block pb-2">
                            {locale === "es" ? "productos inteligentes." : "intelligent products."}
                        </span>
                    </h1>

                    <div className="mt-6 h-7 overflow-hidden text-sm font-semibold text-white sm:text-base">
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={roleIndex}
                                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className="inline-flex items-center gap-2"
                            >
                                <Sparkles className="size-4 text-[#baff66]" />
                                {roles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <p className="mt-5 max-w-2xl text-balance text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                        {locale === "es"
                            ? "Convierto problemas complejos en experiencias digitales claras, escalables y listas para crecer — desde fintech hasta agentes de IA."
                            : "I turn complex problems into clear, scalable digital experiences ready to grow — from fintech to AI agents."}
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                        <a href="#projects" className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#baff66]">
                            {t("hero.cta1")}
                            <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                        </a>
                        <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.07]">
                            LinkedIn
                            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 60, rotateX: 8 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto mt-16 max-w-5xl [perspective:1200px] sm:mt-20"
                >
                    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#111] p-2 shadow-[0_36px_90px_rgba(0,0,0,0.7)] sm:p-3">
                        <div className="flex h-9 items-center justify-between px-2 sm:h-11 sm:px-3">
                            <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#ff6b52]" /><span className="size-2 rounded-full bg-[#ffd35c]" /><span className="size-2 rounded-full bg-[#baff66]" /></div>
                            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-zinc-500 sm:text-[10px]">Selected work / 2026</span>
                            <span className="hidden items-center gap-1 text-[10px] text-zinc-500 sm:flex"><MapPin className="size-3" /> Ica, PE</span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-[1.55fr_.8fr] sm:gap-3">
                            <div className="group relative min-h-[230px] overflow-hidden rounded-[17px] border border-white/[0.06] bg-[#151515] sm:min-h-[390px]">
                                <Image src="/images/eca-monitor-dashboard.png" alt="ECA Monitor dashboard" fill priority className="object-cover object-left-top transition duration-700 group-hover:scale-[1.025]" />
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black via-black/65 to-transparent p-5 pt-20">
                                    <div><p className="text-[10px] uppercase tracking-[0.2em] text-[#baff66]">Fintech / Monitoring</p><h2 className="mt-1 text-lg font-semibold text-white sm:text-2xl">ECA Monitor</h2></div>
                                    <span className="grid size-9 place-items-center rounded-full bg-white text-black"><ArrowUpRight className="size-4" /></span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-3">
                                <div className="relative min-h-[145px] overflow-hidden rounded-[17px] border border-white/[0.06] bg-[#171717] sm:min-h-0">
                                    <Image src="/images/decdata-ecommerce-b2b.png" alt="Decdata ecommerce" fill className="object-cover object-top opacity-80 transition duration-700 hover:scale-[1.04] hover:opacity-100" />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 pt-12"><p className="text-xs font-semibold text-white">Decdata B2B</p></div>
                                </div>
                                <div className="relative min-h-[145px] overflow-hidden rounded-[17px] border border-white/[0.06] bg-[linear-gradient(145deg,#201447,#111_60%)] p-4 sm:min-h-0">
                                    <div className="absolute -right-8 -top-8 size-28 rounded-full bg-[#8e61ff]/30 blur-2xl" />
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Impact</p>
                                    <p className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">15<span className="text-[#baff66]">+</span></p>
                                    <p className="mt-1 max-w-[130px] text-[10px] leading-4 text-zinc-400 sm:text-xs">{locale === "es" ? "productos llevados a producción" : "products shipped to production"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
