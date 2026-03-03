"use client";

import { motion } from "framer-motion";
import { getExperiences, getEducation, certifications } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

    const employment = experiences.filter((e) => e.type === "employment");
    const freelance = experiences.filter((e) => e.type === "freelance");

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
                {/* Company Description */}
                <p className="text-[13px] text-muted-foreground/80 leading-relaxed">
                    {exp.description}
                </p>

                <Separator />

                {/* Achievements */}
                <ul className="space-y-1.5">
                    {exp.achievements.map((ach, j) => (
                        <li key={j} className="flex gap-2 text-[13px] text-muted-foreground">
                            <span className="text-foreground/30 shrink-0">→</span>
                            <span>{ach}</span>
                        </li>
                    ))}
                </ul>

                {/* Tech Stack */}
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
        <section id="experience" className="grid md:grid-cols-3 gap-4">
            <motion.div {...fadeUp} className="md:col-span-2">
                <Card className="h-full">
                    <CardContent className="p-6 space-y-6">
                        <h3 className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                            {t("exp.title")}
                        </h3>

                        {/* Employment Section */}
                        {employment.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-px flex-1 bg-border" />
                                    <span className="text-[11px] font-mono text-muted-foreground/70 uppercase tracking-wider shrink-0">
                                        {t("exp.employment")}
                                    </span>
                                    <div className="h-px flex-1 bg-border" />
                                </div>
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
                            </div>
                        )}

                        {/* Freelance Section */}
                        {freelance.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-px flex-1 bg-border" />
                                    <span className="text-[11px] font-mono text-muted-foreground/70 uppercase tracking-wider shrink-0">
                                        {t("exp.freelance")}
                                    </span>
                                    <div className="h-px flex-1 bg-border" />
                                </div>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="space-y-2"
                                >
                                    {freelance.map((exp, i) =>
                                        renderExperienceCard(exp, i, employment.length + i)
                                    )}
                                </Accordion>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.1 }} className="space-y-4">
                <Card>
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
