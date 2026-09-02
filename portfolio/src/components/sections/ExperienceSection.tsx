"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BriefcaseBusiness, ChevronDown, GraduationCap } from "lucide-react";
import { certifications, getEducation, getExperiences } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { fadeUp } from "@/lib/animations";

type ExperienceMode = "employment" | "freelance";

export default function ExperienceSection() {
    const { t, locale } = useI18n();
    const experiences = getExperiences(locale);
    const education = getEducation(locale);
    const [mode, setMode] = useState<ExperienceMode>("employment");
    const [showAll, setShowAll] = useState(false);

    const employment = experiences.filter((experience) => experience.type === "employment");
    const freelance = experiences.filter((experience) => experience.type === "freelance");
    const activeItems = mode === "employment" ? employment : freelance;
    const visibleItems = showAll ? activeItems : activeItems.slice(0, 3);

    const changeMode = (nextMode: ExperienceMode) => {
        setMode(nextMode);
        setShowAll(false);
    };

    return (
        <section id="experience" className="scroll-m-28">
            <motion.div {...fadeUp} className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <span className="section-kicker">{t("exp.title")}</span>
                    <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        {locale === "es" ? "Experiencia que combina ejecución y visión de producto." : "Experience combining execution and product vision."}
                    </h2>
                </div>
                <span className="hidden font-mono text-xs text-zinc-600 sm:block">04 / 05</span>
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-12">
                <motion.div {...fadeUp} className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#101010] lg:col-span-8">
                    <div className="flex flex-col gap-5 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                            <BriefcaseBusiness className="size-4 text-[#baff66]" />
                            {locale === "es" ? "Trayectoria" : "Career path"}
                        </div>
                        <div className="flex rounded-full border border-white/[0.08] bg-black/30 p-1">
                            {(["employment", "freelance"] as const).map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => changeMode(item)}
                                    className={`rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition sm:px-4 ${
                                        mode === item ? "bg-white text-black" : "text-zinc-500 hover:text-white"
                                    }`}
                                >
                                    {item === "employment" ? t("exp.employment") : t("exp.freelance")}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                        >
                            {visibleItems.map((experience, index) => (
                                <article key={`${experience.company}-${experience.period}`} className="group grid gap-5 border-b border-white/[0.07] p-5 last:border-b-0 sm:grid-cols-[130px_1fr] sm:p-7">
                                    <div>
                                        <span className="font-mono text-[10px] text-zinc-600">{experience.period}</span>
                                        <p className="mt-2 text-xs text-zinc-500">{experience.industry}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold tracking-[-0.025em] text-white">{experience.company}</h3>
                                                <p className="mt-1 text-xs font-medium text-[#baff66]">{experience.role}</p>
                                            </div>
                                            <span className="font-mono text-[9px] text-zinc-700">0{index + 1}</span>
                                        </div>
                                        <p className="mt-4 text-sm leading-6 text-zinc-500">{experience.description}</p>
                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {experience.stack.slice(0, 6).map((tech) => (
                                                <span key={tech} className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[9px] font-medium text-zinc-500">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {activeItems.length > 3 && (
                        <button type="button" onClick={() => setShowAll((value) => !value)} className="flex w-full items-center justify-center gap-2 border-t border-white/[0.07] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 transition hover:bg-white/[0.025] hover:text-white">
                            {showAll ? t("exp.showLess") : `${t("exp.showMore")} (+${activeItems.length - 3})`}
                            <ChevronDown className={`size-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} />
                        </button>
                    )}
                </motion.div>

                <div className="grid gap-4 lg:col-span-4">
                    <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.08 }} className="rounded-[28px] border border-white/[0.08] bg-[#151515] p-6">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-zinc-400">
                            <GraduationCap className="size-4 text-[#a78bfa]" /> {t("edu.title")}
                        </div>
                        <div className="mt-7 space-y-6">
                            {education.map((item) => (
                                <div key={`${item.degree}-${item.period}`} className="border-l border-white/10 pl-4">
                                    <p className="text-sm font-semibold text-white">{item.degree}</p>
                                    <p className="mt-1 text-xs leading-5 text-zinc-500">{item.institution}<br />{item.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.12 }} className="rounded-[28px] border border-white/[0.08] bg-[#151515] p-6">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-zinc-400">
                            <Award className="size-4 text-[#60a5fa]" /> {t("cert.title")}
                        </div>
                        <div className="mt-6 space-y-4">
                            {certifications.slice(0, 4).map((certification) => (
                                <div key={certification.program} className="flex items-start justify-between gap-4">
                                    <div><p className="text-xs font-medium leading-5 text-zinc-300">{certification.program}</p><p className="text-[10px] text-zinc-600">{certification.institution}</p></div>
                                    <span className="font-mono text-[9px] text-zinc-600">{certification.year}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.16 }} className="rounded-[28px] bg-[#8e61ff] p-6 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">Now / Next</p>
                        <p className="mt-5 text-xl font-semibold leading-tight tracking-[-0.03em]">
                            {locale === "es" ? "Construyendo sistemas de IA útiles, medibles y seguros." : "Building useful, measurable, and safe AI systems."}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
