"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { techStack } from "@/data/portfolio";
import { techIcons } from "@/data/icons";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { fadeUp } from "@/lib/animations";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SkillsSlider() {
    const { t } = useI18n();

    const backendTechs = [...techStack["Backend"], ...(techStack["Lenguajes"].filter(t => t.name === "Java" || t.name === "Python" || t.name === "Go"))];
    const cloudTechs = [...techStack["Cloud & DevOps"]];
    const dbTechs = techStack["Bases de Datos"];
    const frontendTechs = [...techStack["Frontend"], ...(techStack["Lenguajes"].filter(t => t.name === "TypeScript" || t.name === "JavaScript"))];
    const automationTechs = techStack["Automatización & IA"];

    const skillsSectionRef = useRef<HTMLElement>(null);
    const skillsScrollRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = skillsSectionRef.current;
        const scrollContainer = skillsScrollRef.current;
        if (!section || !scrollContainer) return;

        const offset = scrollContainer.offsetWidth - window.innerWidth;
        if (offset > 0) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${offset + window.innerWidth * 0.5}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 1,
                },
            });
            tl.to(scrollContainer, { x: -offset - 64, ease: "none" });

            // Style the GSAP pin-spacer so Projects can't bleed through
            const st = tl.scrollTrigger;
            if (st) {
                const spacer = (st as any).spacer as HTMLElement | undefined;
                if (spacer) {
                    spacer.style.backgroundColor = "rgb(9 9 11)"; // zinc-950
                    spacer.style.zIndex = "30";
                    spacer.style.position = "relative";
                }
            }
        }
    }, { scope: skillsSectionRef });

    // Skill card data
    const cards = [
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
        },
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
        },
    ];

    return (
        <section
            ref={skillsSectionRef}
            id="stack"
            className="w-[100vw] ml-[calc(50%-50vw)] overflow-hidden flex flex-col justify-center bg-background border-t border-border/10"
            style={{
                minHeight: "80vh",
                height: "80vh",
                zIndex: 50,
                position: "relative"
            }}
        >
            {/* Section Header */}
            <div className="absolute top-16 md:top-24 w-full left-0 flex justify-center pointer-events-none">
                <div className="w-full max-w-6xl px-4 sm:px-6 pointer-events-auto">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{t("skills.heading")}</h3>
                    </div>
                </div>
            </div>

            {/* Horizontal Scrollable Cards */}
            <div ref={skillsScrollRef} className="flex items-stretch gap-4 sm:gap-6 pt-20 md:pt-28 pb-8 w-max">
                {/* Left Spacer */}
                <div className="w-[calc(50vw-min(50vw-1rem,576px))] sm:w-[calc(50vw-min(50vw-1.5rem,576px))] shrink-0" />

                {cards.map((card, cardIdx) => (
                    <motion.div
                        key={card.titleKey}
                        {...fadeUp}
                        transition={{ duration: 0.35, delay: cardIdx * 0.1 }}
                        className="w-[300px] md:w-[320px] shrink-0 relative group z-10 hover:z-50"
                    >
                        {/* Tech Bubbles Overlay */}
                        <div className="absolute inset-0 p-6 pointer-events-none z-40 flex flex-wrap items-center justify-center content-center gap-3 overflow-visible">
                            {card.techs.map((tech, idx) => (
                                <div key={tech.name} className="group/tech relative pointer-events-auto w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-border/20 dark:border-white/10 flex items-center justify-center shadow-xl opacity-0 translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 hover:!scale-125 transition-all duration-500" style={{ transitionDelay: `${idx * 50}ms` }}>
                                    {techIcons[tech.name] ? <span className="w-5 h-5 text-foreground [&>svg]:w-full [&>svg]:h-full backdrop-blur-sm" dangerouslySetInnerHTML={{ __html: techIcons[tech.name] }} /> : <span className="text-xs text-foreground font-medium">{tech.name[0]}</span>}
                                    <span className="absolute -top-10 px-2 py-1 bg-white dark:bg-zinc-900 text-foreground text-xs font-medium rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-border/10 dark:border-white/10 shadow-2xl z-50">{tech.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Outer Glow / Blur */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient.staticClasses} rounded-3xl blur-xl opacity-0 group-hover:opacity-15 dark:group-hover:opacity-20 transition-opacity duration-500`} />

                        {/* 1px Gradient Border Wrapper */}
                        <div className={`relative h-full rounded-3xl p-[1px] bg-border/50 dark:bg-white/5 group-hover:bg-gradient-to-br ${card.gradient.hoverClasses} transition-all duration-500`}>

                            {/* Inner Card Background & Content */}
                            <div className="relative z-10 p-6 flex flex-col h-full bg-card hover:bg-card/95 backdrop-blur-xl border-none rounded-[23px] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">

                                {/* Content Wrapper layer for blur effect */}
                                <div className="flex flex-col h-[240px] md:h-[260px] group-hover:blur-[3px] group-hover:opacity-30 transition-all duration-500">
                                    <div className="mb-6 h-12 flex items-center z-10">{card.icon}</div>

                                    <h4 className="text-xl sm:text-2xl font-semibold mb-3 tracking-tight text-foreground transition-colors duration-300 z-10">
                                        {t(card.titleKey)}
                                    </h4>

                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 group-hover:text-foreground/90 transition-colors duration-300 z-10">
                                        {t(card.descKey)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Right Spacer */}
                <div className="w-[calc(50vw-576px)] shrink-0 hidden xl:block" />
            </div>
        </section>
    );
}
