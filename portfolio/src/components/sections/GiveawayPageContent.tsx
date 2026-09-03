"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowLeft, Bot, Check, ShieldCheck, Sparkles } from "lucide-react";
import GiveawaySection from "@/components/sections/GiveawaySection";
import { useI18n } from "@/lib/i18n";

export default function GiveawayPageContent() {
    const { t, locale } = useI18n();

    return (
        <main className="relative min-h-screen overflow-hidden pb-20 pt-28 sm:pt-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-[radial-gradient(circle_at_48%_8%,rgba(142,97,255,0.16),transparent_34%),radial-gradient(circle_at_78%_32%,rgba(186,255,102,0.06),transparent_22%)]" />

            <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
                <section className="relative isolate overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#070707] px-5 py-12 shadow-[0_40px_120px_rgba(0,0,0,0.42)] sm:px-8 sm:py-16 lg:px-12 lg:py-20">
                    <div className="hero-orbits pointer-events-none absolute -right-52 -top-24 -z-10 h-[620px] w-[820px] opacity-70" />
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

                    <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-zinc-300">
                                <span className="relative flex size-2">
                                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#baff66] opacity-50" />
                                    <span className="relative inline-flex size-2 rounded-full bg-[#baff66]" />
                                </span>
                                {t("giveaway.page.badge")}
                            </div>

                            <h1 className="mt-7 max-w-3xl text-balance text-[clamp(3.3rem,7vw,6.7rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
                                {locale === "es" ? "Tu negocio," : "Your business,"}
                                <span className="gradient-text block pb-2">{locale === "es" ? "potenciado por IA." : "powered by AI."}</span>
                            </h1>
                            <p className="mt-6 max-w-xl text-pretty text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                                {locale === "es"
                                    ? "Seleccionaremos un negocio para diseñar e implementar un agente conversacional que automatice consultas y operaciones reales."
                                    : "We will select one business to design and implement a conversational agent that automates real inquiries and operations."}
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a href="#giveaway" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#baff66]">
                                    {locale === "es" ? "Quiero participar" : "I want to join"}
                                    <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                </a>
                                <Link href="/" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.07]">
                                    <ArrowLeft className="size-4" /> {t("giveaway.page.back")}
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex min-h-44 flex-col justify-between rounded-[24px] bg-[#baff66] p-5 text-black sm:min-h-52">
                                <Sparkles className="size-5" />
                                <div>
                                    <p className="text-5xl font-semibold tracking-[-0.06em]">01</p>
                                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em]">{locale === "es" ? "Negocio seleccionado" : "Selected business"}</p>
                                </div>
                            </div>
                            <div className="flex min-h-44 flex-col justify-between rounded-[24px] border border-white/[0.08] bg-[#8e61ff] p-5 text-white sm:min-h-52">
                                <Bot className="size-5" />
                                <div>
                                    <p className="text-2xl font-semibold leading-tight tracking-[-0.04em]">{locale === "es" ? "Agente de IA a medida" : "Tailored AI agent"}</p>
                                    <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/55">Strategy + Build</p>
                                </div>
                            </div>
                            <div className="rounded-[24px] border border-white/[0.08] bg-[#111] p-5 sm:col-span-2">
                                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                                    <ShieldCheck className="size-4 text-[#60a5fa]" />
                                    {locale === "es" ? "Qué incluye" : "What is included"}
                                </div>
                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    {[
                                        locale === "es" ? "Descubrimiento del proceso" : "Process discovery",
                                        locale === "es" ? "Diseño conversacional" : "Conversation design",
                                        locale === "es" ? "Implementación del agente" : "Agent implementation",
                                        locale === "es" ? "Acompañamiento inicial" : "Initial support",
                                    ].map((item) => (
                                        <p key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                                            <Check className="size-3.5 text-[#baff66]" /> {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-5">
                    <GiveawaySection />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                        [locale === "es" ? "Sin costo" : "No cost", locale === "es" ? "La implementación para el negocio ganador es gratuita." : "Implementation is free for the winning business."],
                        [locale === "es" ? "Aplicación real" : "Real-world use", locale === "es" ? "Trabajaremos sobre un proceso concreto de tu operación." : "We will work on a concrete process in your operation."],
                        [locale === "es" ? "Proceso claro" : "Clear process", locale === "es" ? "Postula, valida tu correo y espera el sorteo mensual." : "Apply, verify your email, and await the monthly draw."],
                    ].map(([title, description], index) => (
                        <div key={title} className="rounded-[22px] border border-white/[0.07] bg-[#0f0f0f] p-5">
                            <span className="font-mono text-[9px] text-zinc-700">0{index + 1}</span>
                            <h2 className="mt-5 text-sm font-semibold text-zinc-200">{title}</h2>
                            <p className="mt-2 text-xs leading-5 text-zinc-600">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
