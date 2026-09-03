"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, LockKeyhole } from "lucide-react";
import { getProjects } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { fadeUp } from "@/lib/animations";

const FEATURED_INDEXES = [4, 6, 7, 0, 5, 8];
const CARD_SPANS = ["md:col-span-7 md:row-span-2", "md:col-span-5", "md:col-span-5", "md:col-span-4", "md:col-span-4", "md:col-span-4"];
const ACCENTS = [
    "from-[#baff66]/18 via-transparent to-transparent",
    "from-[#5d8cff]/20 via-transparent to-transparent",
    "from-[#ff7657]/18 via-transparent to-transparent",
    "from-[#8e61ff]/22 via-transparent to-transparent",
    "from-[#4d9fff]/18 via-transparent to-transparent",
    "from-[#e879f9]/16 via-transparent to-transparent",
];

export default function Projects() {
    const { t, locale } = useI18n();
    const projects = getProjects(locale);
    const featuredProjects = FEATURED_INDEXES.map((index) => projects[index]).filter(Boolean);

    return (
        <section id="projects" className="scroll-m-28">
            <motion.div {...fadeUp} className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <span className="section-kicker">{t("projects.title")}</span>
                    <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        {locale === "es" ? "Trabajo seleccionado, construido para generar impacto." : "Selected work, built to make an impact."}
                    </h2>
                </div>
                <p className="max-w-xs text-sm leading-6 text-zinc-500">
                    {locale === "es" ? "Fintech, IA aplicada, plataformas B2B y experiencias digitales." : "Fintech, applied AI, B2B platforms, and digital experiences."}
                </p>
            </motion.div>

            <div className="grid auto-rows-[minmax(280px,auto)] gap-4 md:grid-cols-12">
                {featuredProjects.map((project, index) => {
                    const isPublic = Boolean(project.link);
                    const isGithub = project.link?.includes("github.com");
                    const CardTag = isPublic ? "a" : "article";
                    const cardProps = isPublic
                        ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
                        : {};

                    return (
                        <motion.div
                            key={project.title}
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: index * 0.055 }}
                            className={CARD_SPANS[index]}
                        >
                            <CardTag
                                {...cardProps}
                                className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#101010] transition duration-500 hover:-translate-y-1 hover:border-white/[0.16]"
                            >
                                {project.image ? (
                                    <div className={`relative overflow-hidden ${index === 0 ? "min-h-[360px] flex-1" : "h-48"}`}>
                                        <Image src={project.image} alt={project.title} fill className="object-cover object-top transition duration-700 group-hover:scale-[1.035]" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
                                    </div>
                                ) : (
                                    <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${ACCENTS[index]}`}>
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                                        <div className="absolute bottom-4 left-5 flex flex-wrap gap-1.5 pr-5">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="rounded-full border border-white/[0.09] bg-black/25 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-zinc-300 backdrop-blur">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">Project / 0{index + 1}</span>
                                        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/[0.09] bg-white/[0.035] text-zinc-400 transition group-hover:border-white group-hover:bg-white group-hover:text-black">
                                            {isPublic ? (isGithub ? <Github className="size-4" /> : <ArrowUpRight className="size-4" />) : <LockKeyhole className="size-3.5" />}
                                        </span>
                                    </div>
                                    <h3 className={`mt-5 font-semibold leading-[1.05] tracking-[-0.04em] text-white ${index === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                                        {project.title}
                                    </h3>
                                    <p className="mt-3 line-clamp-3 text-xs leading-5 text-zinc-500">{project.description}</p>
                                    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                                        {project.tags.slice(0, 4).map((tag) => (
                                            <span key={tag} className="text-[9px] font-medium uppercase tracking-[0.13em] text-zinc-600">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </CardTag>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
