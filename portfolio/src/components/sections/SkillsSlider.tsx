"use client";

import { motion } from "framer-motion";
import { Bot, Braces, Cloud, Database, ServerCog } from "lucide-react";
import { techStack } from "@/data/portfolio";
import { techIcons } from "@/data/icons";
import { useI18n } from "@/lib/i18n";
import { fadeUp } from "@/lib/animations";

export default function SkillsSlider() {
    const { t, locale } = useI18n();

    const frontendTechs = [...techStack.Frontend, ...techStack.Lenguajes.filter((tech) => ["TypeScript", "JavaScript"].includes(tech.name))];
    const backendTechs = [...techStack.Backend, ...techStack.Lenguajes.filter((tech) => ["Java", "Python", "Go"].includes(tech.name))];
    const cards = [
        {
            number: "01",
            title: t("skills.frontend.title"),
            description: t("skills.frontend.desc"),
            techs: frontendTechs,
            icon: Braces,
            span: "md:col-span-7",
            accent: "text-[#ff7a59]",
            glow: "bg-[#ff7a59]/12",
        },
        {
            number: "02",
            title: t("skills.backend.title"),
            description: t("skills.backend.desc"),
            techs: backendTechs,
            icon: ServerCog,
            span: "md:col-span-5",
            accent: "text-[#baff66]",
            glow: "bg-[#baff66]/10",
        },
        {
            number: "03",
            title: t("skills.automation.title"),
            description: t("skills.automation.desc"),
            techs: techStack["Automatización & IA"],
            icon: Bot,
            span: "md:col-span-6",
            accent: "text-[#a78bfa]",
            glow: "bg-[#8e61ff]/14",
        },
        {
            number: "04",
            title: t("skills.cloud.title"),
            description: t("skills.cloud.desc"),
            techs: techStack["Cloud & DevOps"],
            icon: Cloud,
            span: "md:col-span-3",
            accent: "text-[#60a5fa]",
            glow: "bg-[#3b82f6]/12",
        },
        {
            number: "05",
            title: t("skills.db.title"),
            description: t("skills.db.desc"),
            techs: techStack["Bases de Datos"],
            icon: Database,
            span: "md:col-span-3",
            accent: "text-[#f9c74f]",
            glow: "bg-[#f9c74f]/10",
        },
    ];

    return (
        <section id="stack" className="scroll-m-28">
            <motion.div {...fadeUp} className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <span className="section-kicker">{t("nav.stack")}</span>
                    <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        {locale === "es" ? "Capacidades que conectan idea, código y negocio." : "Capabilities connecting idea, code, and business."}
                    </h2>
                </div>
                <p className="max-w-xs text-sm leading-6 text-zinc-500">
                    {locale === "es" ? "Una combinación práctica de ingeniería, automatización y diseño de producto." : "A practical mix of engineering, automation, and product design."}
                </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-12">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <motion.article
                            key={card.number}
                            {...fadeUp}
                            transition={{ duration: 0.45, delay: index * 0.055 }}
                            className={`group relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#101010] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/[0.15] sm:p-7 ${card.span}`}
                        >
                            <div className={`absolute -right-16 -top-16 size-48 rounded-full blur-3xl transition duration-700 group-hover:scale-125 ${card.glow}`} />
                            <div className="relative flex h-full flex-col">
                                <div className="flex items-start justify-between">
                                    <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">{card.number}</span>
                                    <span className={`grid size-11 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.035] ${card.accent}`}>
                                        <Icon className="size-5" strokeWidth={1.6} />
                                    </span>
                                </div>
                                <div className="mt-10">
                                    <h3 className="text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{card.title}</h3>
                                    <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">{card.description}</p>
                                </div>
                                <div className="mt-auto flex flex-wrap gap-2 pt-8" suppressHydrationWarning>
                                    {card.techs.map((tech) => (
                                        <span key={tech.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[10px] font-medium text-zinc-400 transition group-hover:border-white/[0.1]">
                                            {techIcons[tech.name] ? (
                                                <span className="size-3.5 text-zinc-300 [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: techIcons[tech.name] }} />
                                            ) : (
                                                <span className="size-1.5 rounded-full bg-current opacity-60" />
                                            )}
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}
