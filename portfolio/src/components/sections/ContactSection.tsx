"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { getPersonalData } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { fadeUp } from "@/lib/animations";

export default function ContactSection() {
    const { t, locale } = useI18n();
    const personalData = getPersonalData(locale);

    return (
        <section id="contact" className="scroll-m-28">
            <motion.div {...fadeUp} className="relative isolate overflow-hidden rounded-[32px] border border-white/[0.09] bg-[#0d0d0d] p-6 sm:p-10 lg:p-14">
                <div className="pointer-events-none absolute -right-20 -top-32 -z-10 size-[420px] rounded-full bg-[#8e61ff]/25 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 size-[400px] rounded-full bg-[#baff66]/10 blur-[110px]" />

                <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-end">
                    <div>
                        <span className="section-kicker">{t("nav.contact")}</span>
                        <h2 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                            {locale === "es" ? "¿Tienes una idea ambiciosa?" : "Have an ambitious idea?"}
                            <span className="gradient-text block pb-2">{locale === "es" ? "Hagámosla real." : "Let’s make it real."}</span>
                        </h2>
                        <p className="mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
                            {t("contact.subtitle")}
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a href={`mailto:${personalData.email}`} className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#baff66]">
                                <Mail className="size-4" /> {t("contact.email")}
                                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                            <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-6 text-sm font-semibold text-white transition hover:bg-white/[0.06]">
                                <Linkedin className="size-4" /> LinkedIn
                            </a>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 transition hover:bg-white/[0.065]">
                            <span className="flex items-center gap-3 text-sm font-medium text-zinc-300"><Github className="size-4" /> GitHub</span>
                            <ArrowUpRight className="size-4 text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                        </a>
                        <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 transition hover:bg-white/[0.065]">
                            <span className="flex items-center gap-3 text-sm font-medium text-zinc-300"><Linkedin className="size-4" /> LinkedIn</span>
                            <ArrowUpRight className="size-4 text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                        </a>
                        <div className="rounded-2xl border border-white/[0.09] bg-[#baff66] p-4 text-black">
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em]">Status</p>
                            <p className="mt-2 text-sm font-semibold">{locale === "es" ? "Disponible para conversar" : "Open to a conversation"}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
