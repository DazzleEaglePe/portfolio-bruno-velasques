"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getExperiences, getEducation, certifications } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeUp } from "@/lib/animations";

/* Maps emoji chars to their Apple-style image via jsDelivr CDN */
const APPLE_EMOJI_CDN = "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/img/apple/64";
const emojiToCodepoint: Record<string, string> = {
    "🏦": "1f3e6",
    "📊": "1f4ca",
    "🏢": "1f3e2",
    "🎓": "1f393",
    "🛒": "1f6d2",
    "🏥": "1f3e5",
};

function AppleEmoji({ emoji, size = 18 }: { emoji: string; size?: number }) {
    const code = emojiToCodepoint[emoji];
    if (!code) return <span className="text-base">{emoji}</span>;
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={`${APPLE_EMOJI_CDN}/${code}.png`}
            alt={emoji}
            width={size}
            height={size}
            className="inline-block shrink-0"
            style={{ imageRendering: "auto" }}
        />
    );
}

export default function ExperienceSection() {
    const { t, locale } = useI18n();
    const experiences = getExperiences(locale);
    const educationItems = getEducation(locale);

    const [showAll, setShowAll] = useState(false);

    const employment = experiences.filter((e) => e.type === "employment");
    const freelance = experiences.filter((e) => e.type === "freelance");
    const VISIBLE_FREELANCE = 3;
    const hiddenCount = freelance.length - VISIBLE_FREELANCE;

    const renderExperienceCard = (exp: (typeof experiences)[0], i: number, globalIdx: number) => (
        <AccordionItem
            key={exp.company}
            value={`item-${globalIdx}`}
            className="border border-border rounded-lg px-4"
        >
            <AccordionTrigger className="hover:no-underline py-3 text-left">
                <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <AppleEmoji emoji={exp.icon} />
                        <h4 className="text-sm font-semibold">{exp.company}</h4>
                        <Badge variant="outline" className="text-[10px] font-mono">{exp.period}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{exp.role}</p>
                    <Badge variant="secondary" className="text-[10px] font-mono mt-1.5 font-normal">
                        {exp.industry}
                    </Badge>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-0 space-y-3">
                <p className="text-[13px] text-muted-foreground/80 leading-relaxed">
                    {exp.description}
                </p>
                <Separator />
                <ul className="space-y-1.5">
                    {exp.achievements.map((ach, j) => (
                        <li key={j} className="flex gap-2 text-[13px] text-muted-foreground">
                            <span className="text-foreground/30 shrink-0">→</span>
                            <span>{ach}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.stack.map((tech) => (
                        <Badge
                            key={tech}
                            variant="outline"
                            className="text-[10px] font-mono font-normal px-2 py-0.5 bg-secondary/50"
                        >
                            {tech}
                        </Badge>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    );

    return (
        <section id="experience" className="grid md:grid-cols-3 gap-4 scroll-m-24">
            <motion.div {...fadeUp} className="md:col-span-2">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <Tabs defaultValue="employment" className="w-full">
                            {/* Header + segmented control in one line */}
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="font-mono text-xs text-muted-foreground tracking-widest uppercase shrink-0">
                                    {t("exp.title")}
                                </h3>
                                <TabsList className="h-7 p-0.5 bg-secondary/40 rounded-full gap-0.5">
                                    <TabsTrigger
                                        value="employment"
                                        className="text-[10px] font-mono uppercase tracking-wider rounded-full px-3 h-6 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm cursor-pointer"
                                    >
                                        {t("exp.employment")}
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="freelance"
                                        className="text-[10px] font-mono uppercase tracking-wider rounded-full px-3 h-6 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm cursor-pointer"
                                    >
                                        {t("exp.freelance")}
                                        <span className=" text-[9px] text-muted-foreground/60">+15</span>
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="employment" className="mt-4 min-h-[320px]">
                                <Accordion
                                    type="single"
                                    collapsible
                                    defaultValue="item-0"
                                    className="space-y-2"
                                >
                                    {employment.map((exp, i) =>
                                        renderExperienceCard(exp, i, i)
                                    )}
                                </Accordion>
                            </TabsContent>

                            <TabsContent value="freelance" className="mt-4 space-y-3 min-h-[320px]">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="space-y-2"
                                >
                                    {freelance.slice(0, VISIBLE_FREELANCE).map((exp, i) =>
                                        renderExperienceCard(exp, i, employment.length + i)
                                    )}

                                    <AnimatePresence initial={false}>
                                        {showAll && freelance.slice(VISIBLE_FREELANCE).map((exp, i) => (
                                            <motion.div
                                                key={exp.company}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                {renderExperienceCard(exp, VISIBLE_FREELANCE + i, employment.length + VISIBLE_FREELANCE + i)}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </Accordion>

                                {hiddenCount > 0 && (
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="w-full py-2 text-[11px] font-mono text-muted-foreground/60 uppercase tracking-wider hover:text-foreground/80 transition-colors flex items-center justify-center gap-2 group"
                                    >
                                        <div className="h-px flex-1 bg-border group-hover:bg-foreground/20 transition-colors" />
                                        <span className="shrink-0">
                                            {showAll
                                                ? t("exp.showLess")
                                                : `${t("exp.showMore")} (+${hiddenCount})`
                                            }
                                        </span>
                                        <motion.svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            animate={{ rotate: showAll ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="shrink-0"
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </motion.svg>
                                        <div className="h-px flex-1 bg-border group-hover:bg-foreground/20 transition-colors" />
                                    </button>
                                )}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-col gap-4 h-full">
                <Card className="flex-1">
                    <CardContent className="p-6">
                        <h3 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">{t("edu.title")}</h3>
                        <div className="space-y-3">
                            {educationItems.map((edu, i) => (
                                <div key={edu.degree}>
                                    {i > 0 && <Separator className="mb-3" />}
                                    <p className="text-sm font-medium">{edu.degree}</p>
                                    <p className="text-xs text-muted-foreground">{edu.institution} · {edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">{t("cert.title")}</h3>
                        <div className="space-y-2">
                            {certifications.slice(0, 3).map((cert) => (
                                <div key={cert.program} className="flex items-center justify-between">
                                    <p className="text-xs font-medium truncate mr-2">{cert.program}</p>
                                    <span className="text-[10px] text-muted-foreground font-mono shrink-0">{cert.year}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}
