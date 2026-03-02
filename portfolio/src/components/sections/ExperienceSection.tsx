"use client";

import { motion } from "framer-motion";
import { getExperiences, getEducation, certifications } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fadeUp } from "@/lib/animations";

export default function ExperienceSection() {
    const { t, locale } = useI18n();
    const experiences = getExperiences(locale);
    const educationItems = getEducation(locale);

    return (
        <section id="experience" className="grid md:grid-cols-3 gap-4">
            <motion.div {...fadeUp} className="md:col-span-2">
                <Card className="h-full">
                    <CardContent className="p-6">
                        <h3 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-5">{t("exp.title")}</h3>
                        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2">
                            {experiences.map((exp, i) => (
                                <AccordionItem key={exp.company} value={`item-${i}`} className="border border-border rounded-lg px-4">
                                    <AccordionTrigger className="hover:no-underline py-3 text-left">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="text-sm font-semibold">{exp.company}</h4>
                                                <Badge variant="outline" className="text-[10px] font-mono">{exp.period}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5">{exp.role}</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-3 pt-0">
                                        <ul className="space-y-1.5">
                                            {exp.achievements.map((ach, j) => (
                                                <li key={j} className="flex gap-2 text-[13px] text-muted-foreground">
                                                    <span className="text-foreground/30 shrink-0">—</span>
                                                    <span>{ach}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
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
