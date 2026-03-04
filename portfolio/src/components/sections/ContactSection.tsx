"use client";

import { motion } from "framer-motion";
import { getPersonalData } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

export default function ContactSection() {
    const { t, locale } = useI18n();
    const personalData = getPersonalData(locale);

    return (
        <section id="contact" className="grid md:grid-cols-3 gap-4 scroll-m-24">
            <motion.div {...fadeUp} className="md:col-span-2">
                <Card className="h-full relative overflow-hidden group">
                    {/* Subtle Ambient Light Effect (Hover Only) */}
                    <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 rounded-full bg-emerald-500/20 dark:bg-emerald-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <CardContent className="p-6 md:p-8 flex flex-col justify-center h-full relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">{t("contact.heading")}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">{t("contact.subtitle")}</p>
                        <div className="flex gap-3">
                            <Button asChild size="lg" className="rounded-full">
                                <a href={`mailto:${personalData.email}`}>{t("contact.email")}</a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full">
                                <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.1 }}>
                <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <Card className="h-full hover:bg-secondary/50 transition-all duration-300 group relative overflow-hidden">
                        {/* Subtle Ambient Light Effect (Hover Only) */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-violet-500/20 dark:bg-violet-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
                            <div className="flex justify-between items-start">
                                <svg className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm font-medium mb-1">GitHub</p>
                                <p className="text-xs text-muted-foreground">@DazzleEaglePe</p>
                            </div>
                        </CardContent>
                    </Card>
                </a>
            </motion.div>
        </section>
    );
}
