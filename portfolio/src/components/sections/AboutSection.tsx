"use client";

import { motion } from "framer-motion";
import { getPersonalData } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fadeUp } from "@/lib/animations";

export default function AboutSection() {
    const { t, locale } = useI18n();
    const personalData = getPersonalData(locale);

    return (
        <section id="about" className="grid md:grid-cols-3 gap-4">
            <motion.div {...fadeUp} className="md:col-span-2">
                <Card className="h-full">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-5">
                            <Avatar className="w-12 h-12 border border-border">
                                <AvatarImage src="/images/bruno_velasques.png" alt="Bruno Velasques" />
                                <AvatarFallback className="bg-secondary text-foreground font-mono text-base font-semibold">BV</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-base font-semibold">{personalData.name}</h3>
                                <p className="text-sm text-muted-foreground">{personalData.role} & {personalData.subtitle}</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{personalData.summary}</p>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs font-normal">{t("about.location")}</Badge>
                            <Badge variant="secondary" className="text-xs font-normal">{t("about.exp")}</Badge>
                            <Badge variant="secondary" className="text-xs font-normal">{t("about.focus")}</Badge>
                            <Badge variant="secondary" className="text-xs font-normal">{t("about.scrum")}</Badge>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.1 }}>
                <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <Card className="h-full hover:bg-secondary/50 transition-all duration-300 group relative overflow-hidden">
                        {/* Subtle Ambient Light Effect (Hover Only) */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-blue-500/20 dark:bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
                            <div className="flex justify-between items-start">
                                <svg className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm font-medium mb-1">{t("linkedin.cta")}</p>
                                <p className="text-xs text-muted-foreground">linkedin.com/in/bruno-velasques</p>
                            </div>
                        </CardContent>
                    </Card>
                </a>
            </motion.div>
        </section>
    );
}
