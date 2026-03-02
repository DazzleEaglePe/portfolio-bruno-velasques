"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";
import Link from "next/link";

export default function LotteryTicket() {
    const { t } = useI18n();

    return (
        <section id="lottery" className="w-full">
            <motion.div {...fadeUp}>
                <Card className="relative overflow-hidden border-orange-500/30 bg-zinc-950/80 backdrop-blur-xl group h-auto md:h-[400px]">

                    {/* Golden/Emerald Glow Effects */}
                    <div className="absolute -inset-[100px] bg-gradient-to-r from-orange-500/20 via-amber-400/10 to-emerald-500/20 opacity-30 blur-3xl pointer-events-none group-hover:opacity-50 transition-opacity duration-700" />

                    <div className="flex flex-col md:flex-row h-full relative z-10 w-full">

                        {/* Left Side: Image */}
                        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent z-10" />
                            <img
                                src="/Gemini_Generated_Image_6lrehc6lrehc6lre.png"
                                alt="Digital Transformation Concept"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-start border-t md:border-t-0 md:border-l border-orange-500/20 bg-gradient-to-br from-zinc-950/90 to-zinc-900/90">

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                {t("lottery.badge")}
                            </div>

                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                                {t("lottery.title")}
                            </h3>

                            <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed max-w-md">
                                {t("lottery.subtitle")}
                            </p>

                            <Button
                                asChild
                                size="lg"
                                className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-300"
                            >
                                <Link href="/giveaway">
                                    {t("lottery.cta")}
                                </Link>
                            </Button>
                        </div>

                    </div>
                </Card>
            </motion.div>
        </section>
    );
}
