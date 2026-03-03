"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { getProjects } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { useI18n } from "@/lib/i18n";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { t, locale } = useI18n();
    const projects = getProjects(locale);

    useGSAP(() => {
        const section = sectionRef.current;
        const scrollContainer = scrollContainerRef.current;

        if (!section || !scrollContainer) return;

        const offset = scrollContainer.offsetWidth - window.innerWidth;

        if (offset > 0) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${offset + window.innerWidth * 0.3}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(scrollContainer, {
                x: -offset - 64,
                ease: "none",
            });

            // Style the GSAP pin-spacer to prevent bleed-through
            const st = tl.scrollTrigger;
            if (st) {
                const spacer = (st as any).spacer as HTMLElement | undefined;
                if (spacer) {
                    spacer.style.backgroundColor = "var(--background)";
                    spacer.style.zIndex = "20";
                    spacer.style.position = "relative";
                }
            }
        }
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="w-[100vw] ml-[calc(50%-50vw)] flex flex-col justify-center"
            style={{
                minHeight: "80vh",
                height: "80vh",
                backgroundColor: "var(--background)",
                zIndex: 20,
                position: "relative",
                overflow: "hidden",
            }}
        >

            {/* Static header — cannot use SectionHeader here because its whileInView
                animation with once:false causes the title to fade out during GSAP pinning */}
            <div className="absolute top-16 md:top-24 w-full left-0 flex justify-center pointer-events-none z-20">
                <div className="w-full max-w-6xl px-4 sm:px-6 pointer-events-auto">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{t("projects.title")}</h3>
                    </div>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex items-stretch gap-4 sm:gap-6 pt-[88px] md:pt-[120px] w-max"
            >
                {/* 
                  * To align the first card perfectly with the max-w-6xl grid inside a 100vw container, 
                  * we need a spacer that matches the left margin. 
                  * Math: 
                  * 50vw (center of screen)
                  * - 576px (half of 1152px which is max-w-6xl) 
                  * = the empty space on the left.
                  * We DO NOT subtract the padding from the calculation if the items aren't wrapped in px-4 sm:px-6
                  */}
                <div className="w-[calc(50vw-min(50vw-1rem,576px))] sm:w-[calc(50vw-min(50vw-1.5rem,576px))] shrink-0" />

                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.1, margin: "-15% 0px -15% 0px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="w-[300px] md:w-[400px] lg:w-[450px] shrink-0 h-full"
                    >
                        <HoverCard openDelay={200}>
                            <HoverCardTrigger asChild>
                                {/* Added relative group wrapper */}
                                <div className="relative group/project h-full min-h-[300px] block cursor-pointer">
                                    <Card className="relative h-full bg-card hover:bg-muted/50 transition-colors duration-300 overflow-hidden border-border/50 group-hover/project:border-foreground/20 group/card z-10 m-[1px]">
                                        <CardContent className="p-6 md:p-8 flex flex-col h-full">
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-foreground group-hover/card:scale-110 group-hover/project:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-500">
                                                    <svg className="w-5 h-5 text-muted-foreground group-hover/card:text-foreground transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                                    </svg>
                                                </div>
                                                <svg className="w-5 h-5 text-muted-foreground opacity-0 group-hover/card:opacity-100 transform translate-x-1 group-hover/card:translate-x-0 transition-all font-bold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold mb-3 tracking-tight">{project.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-auto pt-2">
                                                {project.tags.map((tag) => {
                                                    // Map specific tags to simple SVG icons
                                                    const tagLower = tag.toLowerCase();
                                                    let Icon = null;
                                                    if (tagLower.includes("react")) {
                                                        Icon = <svg className="w-3 h-3 text-[#61DAFB] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2" fill="currentColor" /><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" /></svg>;
                                                    } else if (tagLower.includes("supabase")) {
                                                        Icon = <svg className="w-3 h-3 text-[#3ECF8E] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5l6.5 6.5H12v-6.5zm0 13l-6.5-6.5H12v6.5z" /></svg>;
                                                    } else if (tagLower.includes("tailwind")) {
                                                        Icon = <svg className="w-3 h-3 text-[#38B2AC] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.974 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.974 12 6.001 12z" /></svg>;
                                                    } else if (tagLower.includes("n8n")) {
                                                        Icon = <svg className="w-3 h-3 text-[#EA4B71] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /></svg>;
                                                    } else if (tagLower.includes("php")) {
                                                        Icon = <svg className="w-3 h-3 text-[#777BB4] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3 13h-2v-4h-2v4H9V9h2v4h2V9h2v6z" /></svg>;
                                                    } else if (tagLower.includes("astro")) {
                                                        Icon = <svg className="w-3 h-3 text-[#FF5D01] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h4l2-4h8l2 4h4L12 2zm-3 12l3-6 3 6H9z" /></svg>;
                                                    }

                                                    return (
                                                        <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-[10px] md:text-[11px] font-mono font-normal flex items-center gap-1.5 opacity-90 group-hover/project:bg-secondary/70 transition-colors">
                                                            {Icon}
                                                            {tag}
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent
                                side="bottom"
                                align="center"
                                sideOffset={-150}
                                className="w-80 shadow-2xl border-border/50 dark:border-white/10 bg-popover/95 dark:bg-zinc-900/95 backdrop-blur-3xl"
                            >
                                <h4 className="text-sm font-semibold mb-1">{project.title}</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                                <Button asChild size="sm" className="w-full text-xs font-semibold">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">{t("projects.viewGithub")}</a>
                                </Button>
                            </HoverCardContent>
                        </HoverCard>
                    </motion.div>
                ))}

                {/* Right Spacer padding */}
                <div className="w-[calc(50vw-576px)] shrink-0 hidden xl:block" />
            </div>
        </section>
    );
}
