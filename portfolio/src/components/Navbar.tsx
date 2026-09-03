"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe2, LogOut, Menu, Ticket, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/supabase-auth";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navKeys = [
    { href: "/#about", key: "nav.about" },
    { href: "/#stack", key: "nav.stack" },
    { href: "/#projects", key: "nav.projects" },
    { href: "/#experience", key: "nav.experience" },
] as const;

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { locale, t, toggleLocale } = useI18n();
    const { user, signOut } = useAuth();

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 28);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
            <nav
                aria-label="Main navigation"
                className={`mx-auto flex h-16 items-center justify-between rounded-2xl border border-transparent bg-transparent px-3 transition-[max-width,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-4 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
                    scrolled
                        ? "max-w-[960px]"
                        : "max-w-[1240px]"
                }`}
            >
                <a href="/#hero" className="group flex items-center gap-3 lg:justify-self-start" aria-label="Bruno Velasques — Home">
                    <span className="grid size-9 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-[11px] font-bold tracking-tight text-white transition group-hover:border-[#baff66]/50 group-hover:text-[#baff66]">
                        BV
                    </span>
                    <span className="hidden leading-tight sm:block">
                        <span className="block text-[13px] font-semibold text-white">Bruno Velasques</span>
                        <span className="block text-[10px] text-zinc-500">Full Stack + AI</span>
                    </span>
                </a>

                <div className={`hidden items-center gap-1 rounded-full border p-1 transition-[background-color,border-color,box-shadow] duration-500 lg:flex lg:justify-self-center ${
                    scrolled
                        ? "border-white/[0.1] bg-[#090909]/72 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl"
                        : "border-white/[0.07] bg-white/[0.025]"
                }`}>
                    {navKeys.map(({ href, key }) => (
                        <a key={href} href={href} className="rounded-full px-3.5 py-2 text-[12px] font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white">
                            {t(key as Parameters<typeof t>[0])}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-1.5 lg:justify-self-end">
                    <button
                        type="button"
                        onClick={toggleLocale}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
                        aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
                    >
                        <Globe2 className="size-3.5" />
                        {locale.toUpperCase()}
                    </button>

                    {mounted && user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon-sm" className="rounded-full bg-[#baff66]/10 text-xs font-bold text-[#baff66] hover:bg-[#baff66]/20 hover:text-[#baff66]">
                                    {(user.user_metadata?.full_name?.[0] || user.email?.[0] || "U").toUpperCase()}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-44 rounded-xl border-white/10 bg-[#111]/95 text-white backdrop-blur-xl">
                                <DropdownMenuItem asChild className="cursor-pointer gap-2 rounded-lg text-xs">
                                    <Link href="/giveaway"><Ticket className="size-3.5" />{t("nav.myEntry")}</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={signOut} className="cursor-pointer gap-2 rounded-lg text-xs text-red-400 focus:text-red-400">
                                    <LogOut className="size-3.5" />{t("nav.signout")}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/giveaway" className="hidden size-9 place-items-center rounded-full text-zinc-400 transition hover:bg-white/[0.06] hover:text-white sm:grid" aria-label="Giveaway">
                            <Ticket className="size-4" />
                        </Link>
                    )}

                    <a href="/#contact" className="group hidden h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-black transition hover:bg-[#baff66] md:inline-flex">
                        {t("nav.contact")}
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>

                    <button
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        className="grid size-9 place-items-center rounded-full border border-white/10 text-white transition hover:bg-white/[0.06] lg:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        {open ? <X className="size-4" /> : <Menu className="size-4" />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
                    >
                        <div className="grid gap-1">
                            {navKeys.map(({ href, key }, index) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.035 }}
                                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                    {t(key as Parameters<typeof t>[0])}
                                    <ArrowUpRight className="size-4 text-zinc-600" />
                                </motion.a>
                            ))}
                            <a href="/#contact" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#baff66] px-4 py-3.5 text-sm font-semibold text-black">
                                {t("nav.contact")} <ArrowUpRight className="size-4" />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
