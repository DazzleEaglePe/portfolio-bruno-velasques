"use client";

import { useI18n } from "@/lib/i18n";

export default function FooterSection() {
    const { t, locale } = useI18n();
    const year = new Date().getFullYear();

    return (
        <footer className="flex flex-col gap-4 border-t border-white/[0.07] pb-2 pt-7 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Bruno Velasques</p>
            <p>{t("footer.credit")}</p>
            <a href="#hero" className="transition hover:text-white">{locale === "es" ? "Volver arriba ↑" : "Back to top ↑"}</a>
        </footer>
    );
}
