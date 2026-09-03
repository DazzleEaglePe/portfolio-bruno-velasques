"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getPersonalData } from "@/data/portfolio";
import { useI18n } from "@/lib/i18n";
import { fadeUp } from "@/lib/animations";

export default function AboutSection() {
    const { t, locale } = useI18n();
    const personalData = getPersonalData(locale);

    return (
        <section id="about" className="scroll-m-28">
            <motion.div {...fadeUp} className="mb-10 flex items-end justify-between gap-6">
                <div>
                    <span className="section-kicker">{t("about.title")}</span>
                    <h2 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                        {locale === "es" ? (
                            <>Tecnología con criterio, <span className="text-zinc-500">diseño con intención</span> y productos que sí funcionan.</>
                        ) : (
                            <>Technology with judgment, <span className="text-zinc-500">design with intention</span>, and products that work.</>
                        )}
                    </h2>
                </div>
                <span className="hidden font-mono text-xs text-zinc-600 sm:block">01 / 05</span>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-12">
                <motion.article {...fadeUp} className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#101010] p-6 md:col-span-8 md:p-9">
                    <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#8e61ff]/10 blur-3xl" />
                    <div className="relative flex h-full min-h-[310px] flex-col justify-between">
                        <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl sm:leading-relaxed">
                            {personalData.summary}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-2">
                            {[t("about.location"), t("about.exp"), t("about.focus"), t("about.scrum")].map((item) => (
                                <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[11px] font-medium text-zinc-400">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.article>

                <motion.a
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative min-h-[310px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#151515] md:col-span-4"
                >
                    <Image src="/images/bruno_velasques.png" alt="Bruno Velasques" fill className="object-cover object-top grayscale transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                        <div>
                            <p className="text-sm font-semibold text-white">Bruno Velasques</p>
                            <p className="mt-1 flex items-center gap-1 text-[10px] text-zinc-400"><MapPin className="size-3" /> Ica, Perú</p>
                        </div>
                        <span className="grid size-10 place-items-center rounded-full bg-white text-black transition group-hover:bg-[#baff66]"><ArrowUpRight className="size-4" /></span>
                    </div>
                </motion.a>

                <motion.div {...fadeUp} className="grid gap-4 md:col-span-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-[24px] border border-white/[0.08] bg-[#101010] p-6">
                        <span className="text-5xl font-semibold tracking-[-0.06em] text-white">10K<span className="text-[#baff66]">+</span></span>
                        <p className="mt-6 text-xs leading-5 text-zinc-500">{locale === "es" ? "Clientes alcanzados por productos financieros en producción." : "Clients reached by financial products in production."}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/[0.08] bg-[#101010] p-6">
                        <span className="text-5xl font-semibold tracking-[-0.06em] text-white">90<span className="text-[#a78bfa]">%</span></span>
                        <p className="mt-6 text-xs leading-5 text-zinc-500">{locale === "es" ? "Solicitudes resueltas de forma autónoma cada semana." : "Weekly requests resolved autonomously."}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/[0.08] bg-[#101010] p-6">
                        <span className="text-4xl font-semibold tracking-[-0.06em] text-white">40–50<span className="text-[#60a5fa]">%</span></span>
                        <p className="mt-6 text-xs leading-5 text-zinc-500">{locale === "es" ? "Reducción de costos operativos mediante infraestructura centralizada." : "Operating cost reduction through centralized infrastructure."}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/[0.08] bg-[#baff66] p-6 text-black">
                        <span className="text-5xl font-semibold tracking-[-0.06em]">30<span className="text-black/45">%</span></span>
                        <p className="mt-6 text-xs font-medium leading-5 text-black/65">{locale === "es" ? "Menos visitas presenciales gracias a productos bancarios digitales." : "Fewer in-branch visits through digital banking products."}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
