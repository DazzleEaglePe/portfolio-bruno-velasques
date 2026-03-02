"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonial() {
    const { t } = useI18n();
    const [activeIndex, setActiveIndex] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const totalTestimonials = 3;

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev % totalTestimonials) + 1);
        }, 7000); // 7s per comment
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleSetIndex = (idx: number) => {
        setIsAutoPlaying(false);
        setActiveIndex(idx);
    };

    return (
        <section id="testimonial" className="py-24 w-full relative overflow-hidden z-10 px-4 xl:px-0">
            <div className="w-full max-w-6xl mx-auto">
                <Card className="bg-card dark:bg-zinc-950 backdrop-blur-3xl border-border/50 dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden group w-full">

                    {/* Subtle Ambient Light Effect (Hover Only) */}
                    <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 rounded-full bg-emerald-500/20 dark:bg-emerald-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <CardContent className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-stretch gap-10 md:gap-16 relative z-10">
                        {/* Left Column */}
                        <div className="flex-[1] w-full flex flex-col justify-between space-y-10">
                            <div>
                                <span className="text-5xl md:text-7xl font-bold tracking-tight text-foreground dark:text-white leading-none">
                                    {t("testimonial.count")}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground dark:text-white mt-2 whitespace-pre-line">
                                    {t("testimonial.heading")}
                                </h2>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-auto">
                                {/* Avatar Group */}
                                <div className="flex -space-x-4">
                                    <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-background dark:border-zinc-950 object-cover" />
                                    <img src="https://i.pravatar.cc/100?img=47" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-background dark:border-zinc-950 object-cover" />
                                    <img src="https://i.pravatar.cc/100?img=12" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-background dark:border-zinc-950 object-cover" />
                                    <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-background dark:border-zinc-950 object-cover" />
                                </div>

                                <div className="flex flex-col gap-1 overflow-hidden">
                                    <div className="flex items-center gap-1">
                                        <span className="text-foreground dark:text-white font-medium mr-1 text-sm">5.0</span>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <svg key={s} className="w-4 h-4 text-emerald-500 dark:text-emerald-400 fill-emerald-500 dark:fill-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                            </svg>
                                        ))}
                                    </div>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={activeIndex}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-[11px] text-muted-foreground dark:text-zinc-400 font-mono tracking-tight block truncate"
                                        >
                                            {/* @ts-ignore */}
                                            {t(`testimonial.${activeIndex}.reviewer` as any)}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex-[1.8] w-full border-t border-border/50 dark:border-white/10 md:border-t-0 md:border-l md:border-border/50 md:dark:border-white/10 pt-8 md:pt-0 md:pl-12 lg:pl-16 flex flex-col justify-between">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex-1"
                                >
                                    <p className="text-lg md:text-xl lg:text-[22px] text-foreground/90 dark:text-zinc-300 leading-relaxed font-light min-h-[140px]">
                                        &ldquo;{/* @ts-ignore */}{t(`testimonial.${activeIndex}.quote` as any)}&rdquo;
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Dots */}
                            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5">
                                {[1, 2, 3].map((idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSetIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx ? "w-8 bg-emerald-500" : "w-2 bg-foreground/20 dark:bg-white/20 hover:bg-foreground/40 dark:hover:bg-white/40"
                                            }`}
                                        aria-label={`Testimonial ${idx}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
