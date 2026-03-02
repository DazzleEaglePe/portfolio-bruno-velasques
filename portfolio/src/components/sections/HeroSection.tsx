"use client";

import { motion } from "framer-motion";
import { getPersonalData } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";
import HeroGiveawayCard from "@/components/sections/HeroGiveawayCard";

export default function HeroSection() {
    const { t, locale } = useI18n();
    const personalData = getPersonalData(locale);

    return (
        <section id="hero" className="pt-16 pb-4 md:pt-24 md:pb-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                {/* Left: Text Content */}
                <motion.div {...fadeUp} className="max-w-2xl flex-1 w-full z-10">
                    <p className="text-muted-foreground text-sm md:text-base mb-3 font-mono">{t("hero.greeting")}</p>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight leading-[1.05] mb-6">
                        Bruno<br />Velasques<span className="text-emerald-500">.</span>
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                        {t("hero.subtitle")}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button asChild size="lg" className="rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-shadow">
                            <a href="#projects">{t("hero.cta1")}</a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full border-white/10 hover:bg-white/5">
                            <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                LinkedIn
                            </a>
                        </Button>
                    </div>
                </motion.div>

                {/* Right: 3D Ticket Canvas */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="flex-[1.2] w-full mt-10 lg:mt-0 flex items-center justify-center lg:justify-end"
                >
                    <HeroGiveawayCard />
                </motion.div>
            </div>
        </section>
    );
}
