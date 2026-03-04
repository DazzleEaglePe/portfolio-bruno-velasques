"use client";

import { motion } from "framer-motion";
import { getProjects } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/section-header";

/* Determine the CTA label based on link type */
function getLinkLabel(link: string | undefined, t: any): string {
    if (!link) return t("projects.private");
    if (link.includes("github.com")) return t("projects.viewGithub");
    return t("projects.visitSite");
}

export default function Projects() {
    const { t, locale } = useI18n();
    const projects = getProjects(locale);

    return (
        <section id="projects" className="py-24 relative w-full">
            <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative">
                <SectionHeader label={t("projects.title")} />

                <div className="mt-16 md:mt-24 flex flex-col gap-6 md:gap-16 pb-24 relative z-10 w-full mx-auto">
                    {projects.map((project, i) => {
                        const isPublic = !!project.link;

                        return (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                                transition={{ duration: 0.5 }}
                                className="sticky w-full"
                                style={{
                                    // 12vh base + 30px offset per card to show the "stack" behind it
                                    top: `calc(12vh + ${i * 30}px)`,
                                }}
                            >
                                <div className={`group/project relative block w-full ${isPublic ? "cursor-pointer" : "cursor-default"}`}>
                                    {isPublic && project.link ? (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20">
                                            <span className="sr-only">{project.title}</span>
                                        </a>
                                    ) : null}

                                    {/* The Card */}
                                    <Card className={`
                                        w-full bg-background/95 hover:bg-muted/30 backdrop-blur-xl transition-colors duration-300 
                                        overflow-hidden border border-border/50 shadow-2xl shadow-black/40
                                        ${isPublic ? "group-hover/project:border-foreground/30" : ""} 
                                        z-10
                                    `}>
                                        <CardContent className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-10">

                                            {/* Icon / Status Container */}
                                            <div className="flex-shrink-0 flex items-center justify-between md:flex-col md:justify-start gap-4">
                                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary/80 flex items-center justify-center text-foreground group-hover/project:scale-110 group-hover/project:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500">
                                                    <svg className="w-6 h-6 text-muted-foreground group-hover/project:text-foreground transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                                    </svg>
                                                </div>

                                                {/* Mobile status indicator (flex-row) vs Desktop (flex-col) */}
                                                <div className="md:mt-4">
                                                    {isPublic ? (
                                                        <div className="flex items-center gap-1.5 opacity-60 group-hover/project:opacity-100 transform md:translate-y-2 group-hover/project:translate-y-0 transition-all">
                                                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hidden lg:inline-block whitespace-nowrap">
                                                                {getLinkLabel(project.link, t).replace(" →", "")}
                                                            </span>
                                                            <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
                                                                <svg className="w-4 h-4 font-bold text-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 border-border/50 gap-1.5 whitespace-nowrap px-2 py-1">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                                <path d="M7 11V7a5 5 0 0110 0v4" />
                                                            </svg>
                                                            <span className="hidden sm:inline-block">{t("projects.private")}</span>
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col flex-grow">
                                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-4 group-hover/project:text-foreground transition-colors">
                                                    {project.title}
                                                </h3>

                                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                                                    {project.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mt-auto">
                                                    {project.tags.map((tag) => {
                                                        const tagLower = tag.toLowerCase();
                                                        let Icon = null;
                                                        if (tagLower.includes("react")) {
                                                            Icon = <svg className="w-3.5 h-3.5 text-[#61DAFB] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2" fill="currentColor" /><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" /></svg>;
                                                        } else if (tagLower.includes("supabase")) {
                                                            Icon = <svg className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5l6.5 6.5H12v-6.5zm0 13l-6.5-6.5H12v6.5z" /></svg>;
                                                        } else if (tagLower.includes("tailwind")) {
                                                            Icon = <svg className="w-3.5 h-3.5 text-[#38B2AC] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.974 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.974 12 6.001 12z" /></svg>;
                                                        } else if (tagLower.includes("n8n")) {
                                                            Icon = <svg className="w-3.5 h-3.5 text-[#EA4B71] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /></svg>;
                                                        } else if (tagLower.includes("php")) {
                                                            Icon = <svg className="w-3.5 h-3.5 text-[#777BB4] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3 13h-2v-4h-2v4H9V9h2v4h2V9h2v6z" /></svg>;
                                                        } else if (tagLower.includes("astro")) {
                                                            Icon = <svg className="w-3.5 h-3.5 text-[#FF5D01] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h4l2-4h8l2 4h4L12 2zm-3 12l3-6 3 6H9z" /></svg>;
                                                        }

                                                        return (
                                                            <Badge key={tag} variant="secondary" className="px-2.5 py-1 text-[11px] md:text-xs font-mono font-normal flex items-center gap-1.5 opacity-90 group-hover/project:bg-secondary/70 transition-colors">
                                                                {Icon}
                                                                {tag}
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
