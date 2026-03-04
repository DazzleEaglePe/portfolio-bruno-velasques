"use client";

import { useI18n } from "@/lib/i18n";
import GiveawaySection from "@/components/sections/GiveawaySection";
import ContactSection from "@/components/sections/ContactSection";
import Link from "next/link";

export default function GiveawayPageContent() {
    const { t } = useI18n();

    return (
        <main className="relative min-h-screen overflow-hidden">

            {/* Background subtle orbs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-foreground/[0.02] rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-foreground/[0.02] rounded-full blur-[150px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24">

                {/* Hero Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground text-xs font-mono mb-4">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        {t("giveaway.page.badge")}
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                        {t("giveaway.page.title")}<span className="text-emerald-500">.</span>
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                        {t("giveaway.page.desc")}
                    </p>
                </div>

                {/* Giveaway Section */}
                <GiveawaySection />

                {/* Back to Portfolio Link */}
                <div className="text-center mt-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        {t("giveaway.page.back")}
                    </Link>
                </div>
            </div>
        </main>
    );
}
