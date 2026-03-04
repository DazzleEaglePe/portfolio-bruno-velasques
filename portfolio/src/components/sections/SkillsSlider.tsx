"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techStack } from "@/data/portfolio";
import { techIcons } from "@/data/icons";
import { useI18n } from "@/lib/i18n";
import { fadeUp } from "@/lib/animations";

export default function SkillsSlider() {
    const { t } = useI18n();

    // Testimonial State (used for the integrated stats card)
    const [activeIndex, setActiveIndex] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const totalTestimonials = 3;

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev % totalTestimonials) + 1);
        }, 7000); // 7s per comment
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleSetIndex = (idx: number) => {
        setIsAutoPlaying(false);
        setActiveIndex(idx);
    };

    const backendTechs = [...techStack["Backend"], ...(techStack["Lenguajes"].filter(t => t.name === "Java" || t.name === "Python" || t.name === "Go"))];
    const cloudTechs = [...techStack["Cloud & DevOps"]];
    const dbTechs = techStack["Bases de Datos"];
    const frontendTechs = [...techStack["Frontend"], ...(techStack["Lenguajes"].filter(t => t.name === "TypeScript" || t.name === "JavaScript"))];
    const automationTechs = techStack["Automatización & IA"];

    // Skill card data — ordered for bento grid:
    // Row 1: Frontend (7 techs, wide) + Backend (5 techs, narrow)
    // Row 2: Automation (6 techs, wide) + Cloud (4 techs, narrow)
    // Row 3: Databases (5 techs, full width)
    const cards = [
        {
            techs: frontendTechs,
            titleKey: "skills.frontend.title" as const,
            descKey: "skills.frontend.desc" as const,
            gradient: { hoverClasses: "group-hover:from-rose-500 group-hover:via-pink-500", staticClasses: "from-rose-500 via-pink-500" },
            iconColor: "text-rose-500",
            icon: (
                <svg className="w-8 h-8 text-rose-500 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m5.961-5.961a21.194 21.194 0 00-6.522-6.521m6.521 6.521a21.193 21.193 0 01-6.52 6.521M14.25 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            ),
            span: "md:col-span-2",
        },
        {
            techs: backendTechs,
            titleKey: "skills.backend.title" as const,
            descKey: "skills.backend.desc" as const,
            gradient: { hoverClasses: "group-hover:from-purple-500 group-hover:via-blue-500", staticClasses: "from-purple-500 via-blue-500" },
            iconColor: "text-purple-400",
            icon: (
                <svg className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3" />
                </svg>
            ),
            span: "md:col-span-1",
        },
        {
            techs: automationTechs,
            titleKey: "skills.automation.title" as const,
            descKey: "skills.automation.desc" as const,
            gradient: { hoverClasses: "group-hover:from-emerald-400 group-hover:via-teal-500", staticClasses: "from-emerald-400 via-teal-500" },
            iconColor: "text-emerald-400",
            icon: (
                <svg className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
            ),
            span: "md:col-span-1",
        },
        {
            techs: cloudTechs,
            titleKey: "skills.cloud.title" as const,
            descKey: "skills.cloud.desc" as const,
            gradient: { hoverClasses: "group-hover:from-blue-500 group-hover:via-cyan-500", staticClasses: "from-blue-500 via-cyan-500" },
            iconColor: "text-blue-400",
            icon: (
                <svg className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.361 7.5 7.5 0 00-14.166 1.48A4.5 4.5 0 002.25 15z" />
                </svg>
            ),
            span: "md:col-span-1",
        },
        {
            techs: dbTechs,
            titleKey: "skills.db.title" as const,
            descKey: "skills.db.desc" as const,
            gradient: { hoverClasses: "group-hover:from-amber-400 group-hover:via-orange-500", staticClasses: "from-amber-400 via-orange-500" },
            iconColor: "text-amber-500",
            icon: (
                <svg className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
            ),
            span: "md:col-span-2",
        },
    ];

    return (
        <section
            id="stack"
            className="scroll-m-24"
        >
            {/* Section Header */}
            <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                    {t("skills.heading")}
                </h3>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {cards.map((card, cardIdx) => {
                    // After the 1st card (Frontend, wide), insert the integrated Testimonial card covering col 3
                    const isStatsPosition = cardIdx === 1;
                    return (
                        <React.Fragment key={card.titleKey}>
                            {isStatsPosition && (
                                <motion.div
                                    key="integrated-testimonial"
                                    {...fadeUp}
                                    transition={{ duration: 0.35, delay: 1 * 0.08 }}
                                    className="relative group z-10 hover:z-50 md:col-span-1 md:row-span-2"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    <div className="relative h-full rounded-3xl p-[1px] bg-border/50 dark:bg-white/5 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:via-teal-500 transition-all duration-500">
                                        <div className="relative z-10 p-7 md:p-8 flex flex-col h-full bg-card hover:bg-card/95 backdrop-blur-xl border-none rounded-[23px] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden justify-between min-h-[460px]">

                                            {/* Top: Stats & Title */}
                                            <div>
                                                <span className="text-6xl md:text-7xl font-bold tracking-tight text-foreground dark:text-white leading-none">
                                                    {t("testimonial.count")}
                                                </span>
                                                <h4 className="text-lg md:text-xl font-semibold text-foreground mt-2 whitespace-pre-line leading-tight">
                                                    {t("testimonial.heading")}
                                                </h4>
                                            </div>

                                            {/* Middle: Rotating Quote */}
                                            <div className="flex-1 flex flex-col justify-center py-6 mt-4 border-t border-border/20">
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={activeIndex}
                                                        initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                                                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                                        exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                    >
                                                        <p className="text-sm md:text-base text-foreground/90 dark:text-zinc-300 leading-relaxed font-light">
                                                            &ldquo;{/* @ts-ignore */}{t(`testimonial.${activeIndex}.quote` as any)}&rdquo;
                                                        </p>
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>

                                            {/* Bottom: Avatars, Reviewer & Navigation */}
                                            <div className="flex flex-col gap-4 mt-auto">
                                                <div className="flex items-center gap-3">
                                                    {/* Avatar Group */}
                                                    <div className="flex -space-x-3 shrink-0">
                                                        <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-card object-cover" />
                                                        <img src="https://i.pravatar.cc/100?img=47" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-card object-cover" />
                                                        <img src="https://i.pravatar.cc/100?img=12" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-card object-cover" />
                                                    </div>

                                                    <div className="flex flex-col overflow-hidden min-w-0">
                                                        <div className="flex items-center gap-0.5">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <svg key={s} className="w-3 h-3 text-emerald-500 dark:text-emerald-400 fill-emerald-500 dark:fill-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <AnimatePresence mode="wait">
                                                            <motion.span
                                                                key={activeIndex}
                                                                initial={{ opacity: 0, y: 5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -5 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="text-[10px] text-muted-foreground dark:text-zinc-400 font-mono tracking-tight block truncate"
                                                            >
                                                                {/* @ts-ignore */}
                                                                {t(`testimonial.${activeIndex}.reviewer` as any)}
                                                            </motion.span>
                                                        </AnimatePresence>
                                                    </div>
                                                </div>

                                                {/* Navigation Dots */}
                                                <div className="flex items-center gap-2 pt-4 border-t border-border/10 justify-center">
                                                    {[1, 2, 3].map((idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleSetIndex(idx)}
                                                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx ? "w-6 bg-emerald-500" : "w-1.5 bg-foreground/20 dark:bg-white/20 hover:bg-foreground/40 dark:hover:bg-white/40"
                                                                }`}
                                                            aria-label={`Testimonial ${idx}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <motion.div
                                key={card.titleKey}
                                {...fadeUp}
                                transition={{ duration: 0.35, delay: (cardIdx + (cardIdx >= 3 ? 1 : 0)) * 0.08 }}
                                className={`relative group z-10 hover:z-50 ${card.span}`}
                            >
                                {/* Outer Glow / Blur */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient.staticClasses} rounded-3xl blur-xl opacity-0 group-hover:opacity-15 dark:group-hover:opacity-20 transition-opacity duration-500`} />

                                {/* 1px Gradient Border Wrapper */}
                                <div className={`relative h-full rounded-3xl p-[1px] bg-border/50 dark:bg-white/5 group-hover:bg-gradient-to-br ${card.gradient.hoverClasses} transition-all duration-500`}>

                                    {/* Inner Card Background & Content */}
                                    <div className="relative z-10 p-7 md:p-8 flex flex-col h-full bg-card hover:bg-card/95 backdrop-blur-xl border-none rounded-[23px] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">

                                        <div className="mb-4 h-12 flex items-center">{card.icon}</div>

                                        <h4 className="text-xl sm:text-2xl font-semibold mb-2 tracking-tight text-foreground">
                                            {t(card.titleKey)}
                                        </h4>

                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                                            {t(card.descKey)}
                                        </p>

                                        {/* Tech Icons Row */}
                                        <div className="mt-auto flex flex-wrap gap-2.5 pt-5 border-t border-border/20">
                                            {card.techs.map((tech) => (
                                                <div
                                                    key={tech.name}
                                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/50 border border-border/20 hover:border-border/50 hover:bg-secondary transition-all duration-300"
                                                >
                                                    {techIcons[tech.name] ? (
                                                        <span className="w-4 h-4 text-foreground [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: techIcons[tech.name] }} />
                                                    ) : (
                                                        <span className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center text-[9px] font-bold text-muted-foreground">{tech.name[0]}</span>
                                                    )}
                                                    <span className="text-xs text-muted-foreground font-medium">{tech.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
}
