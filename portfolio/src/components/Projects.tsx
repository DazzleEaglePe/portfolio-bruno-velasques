"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getProjects } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/section-header";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
    const { t, locale } = useI18n();
    const projects = getProjects(locale);

    // Track hovered project index
    const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

    // Track mouse position globally for the floating image
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for the mouse follow
    const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section id="projects" className="py-24 relative w-full overflow-hidden scroll-m-24">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <SectionHeader label={t("projects.title")} />

                <div className="mt-16 md:mt-24 border-t border-border/40">
                    {projects.map((project, i) => {
                        const isPublic = !!project.link;

                        return (
                            <div
                                key={project.title}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(-1)}
                                className={`group relative border-b border-border/40 py-8 md:py-12 transition-colors duration-500 hover:bg-muted/10 ${isPublic ? "cursor-pointer" : ""}`}
                            >
                                {/* Make the whole row clickable if public */}
                                {isPublic && project.link && (
                                    <Link href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                                        <span className="sr-only">{t("projects.visitSite")}</span>
                                    </Link>
                                )}

                                {/* Desktop / Tablet View (List) */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-0">
                                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 w-full">
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase transition-all duration-500 group-hover:text-primary group-hover:translate-x-4">
                                            {project.title}
                                        </h3>

                                        {/* Tags and Description (Fades out slightly on hover for others, but stays solid for hovered) */}
                                        <div className="flex flex-col gap-3 max-w-sm transition-opacity duration-300">
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.slice(0, 3).map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-[10px] uppercase font-mono bg-secondary/40 text-muted-foreground">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {project.tags.length > 3 && (
                                                    <Badge variant="secondary" className="px-2 py-0.5 text-[10px] uppercase font-mono bg-secondary/40 text-muted-foreground">
                                                        +{project.tags.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Status */}
                                    <div className="flex items-center shrink-0">
                                        {!project.link ? (
                                            <div className="flex items-center gap-2 text-muted-foreground/50 border border-border/30 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                                </svg>
                                                <span className="hidden sm:inline-block">{t("projects.private")}</span>
                                            </div>
                                        ) : project.link.includes("github.com") ? (
                                            <div className="flex items-center gap-2 text-muted-foreground border border-border/50 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                                                </svg>
                                                <span className="hidden sm:inline-block">{t("projects.viewGithub").replace(" →", "")}</span>
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:-rotate-45 transition-all duration-500 text-muted-foreground group-hover:text-primary-foreground">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile Image Inline (Since floating doesn't work well on touch) */}
                                <div className="mt-8 relative w-full aspect-video rounded-xl overflow-hidden block lg:hidden">
                                    {project.image ? (
                                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-secondary/20 flex flex-col items-center justify-center text-muted-foreground/30 border border-border/20">
                                            {isPublic ? (
                                                <svg className="w-12 h-12 mb-2 stroke-[0.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-12 h-12 mb-2 stroke-[0.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                                </svg>
                                            )}
                                            <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Preview</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Floating Image Container (Desktop Only, Pointer Events None) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50 w-[450px] aspect-[4/3] rounded-xl overflow-hidden hidden lg:block shadow-2xl shadow-black/50"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: hoveredIndex !== -1 ? 1 : 0,
                    scale: hoveredIndex !== -1 ? 1 : 0.5,
                    // Slightly tilt based on movement direction (optional, but let's keep it simple)
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="relative w-full h-full bg-background border border-border/50">
                    {/* Render all images, but only show the one matching the hovered index */}
                    {projects.map((project, i) => (
                        <div
                            key={`img-${i}`}
                            className={`absolute inset-0 transition-opacity duration-500 ${hoveredIndex === i ? "opacity-100" : "opacity-0"}`}
                        >
                            {project.image ? (
                                <Image src={project.image} alt={project.title} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-secondary/10 flex flex-col items-center justify-center text-muted-foreground/30">
                                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-foreground via-background to-background" style={{ backgroundSize: '16px 16px', backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)' }} />
                                    {!!project.link ? (
                                        <svg className="w-20 h-20 mb-4 stroke-[0.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-20 h-20 mb-4 stroke-[0.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                        </svg>
                                    )}
                                    <span className="font-mono text-sm uppercase tracking-widest font-semibold opacity-50 relative z-10">
                                        Project Preview
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
