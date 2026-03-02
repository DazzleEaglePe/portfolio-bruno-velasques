"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/supabase-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navKeys = [
    { href: "/#about", key: "nav.about" },
    { href: "/#experience", key: "nav.experience" },
    { href: "/#stack", key: "nav.stack" },
    { href: "/#projects", key: "nav.projects" },
    { href: "/#contact", key: "nav.contact" },
] as const;

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const { locale, t, toggleLocale } = useI18n();
    const { user, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Theme Tour Effect
    useEffect(() => {
        if (!mounted) return;

        // Wait a moment for rendering before triggering the tour
        const timer = setTimeout(() => {
            if (theme === "light" && localStorage.getItem("themeTourSeen") !== "true") {
                const driverObj = driver({
                    showProgress: false,
                    allowClose: true,
                    overlayColor: "transparent",
                    nextBtnText: "Hacerlo &rarr;",
                    prevBtnText: "&larr; Atrás",
                    doneBtnText: "¡Hecho!",
                    onDestroyed: () => {
                        document.body.classList.remove("theme-tour-active");
                        setThemeDropdownOpen(false);
                        localStorage.setItem("themeTourSeen", "true");
                    },
                    steps: [
                        {
                            element: "#theme-toggle-btn",
                            popover: {
                                title: "Únete al Lado Oscuro ✨",
                                description: "Para la mejor experiencia inmersiva y visual del portafolio, te sugerimos activar el Modo Oscuro.",
                                side: "bottom",
                                align: "end",
                                onNextClick: () => {
                                    // Open the underlying Dropdown Menu dynamically via state
                                    setThemeDropdownOpen(true);
                                    // Wait for Radix UI entering animation
                                    setTimeout(() => {
                                        driverObj.moveNext();
                                    }, 250);
                                }
                            }
                        },
                        {
                            element: "#theme-dark-btn",
                            popover: {
                                title: "Activa la Magia 🌙",
                                description: "Haz clic aquí para aplicar el fondo oscuro y disfrutar del diseño.",
                                side: "left",
                                align: "start",
                                onPrevClick: () => {
                                    // Close the Radix UI Dropdown Menu via state
                                    setThemeDropdownOpen(false);
                                    setTimeout(() => {
                                        driverObj.movePrevious();
                                    }, 250);
                                }
                            }
                        }
                    ]
                });

                // Allow the dropdown to be in the DOM before hooking into it
                if (document.getElementById("theme-toggle-btn")) {
                    document.body.classList.add("theme-tour-active");
                    driverObj.drive();
                }
            }
        }, 1500); // Wait 1.5 seconds after load so it doesn't clash with intro animations

        return () => clearTimeout(timer);
    }, [mounted, theme]);

    return (
        <nav className={`fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${scrolled ? "top-4 md:top-6" : "top-0"
            }`}>
            <div className={`
                flex items-center transition-all duration-500 mx-auto
                ${scrolled
                    ? "gap-1 md:gap-6 px-4 md:px-5 py-2.5 rounded-full border border-white/10 dark:border-white/5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] bg-background/40 dark:bg-zinc-900/40 backdrop-blur-3xl backdrop-saturate-150 w-auto"
                    : "w-full max-w-6xl px-4 sm:px-6 py-4 md:py-6 bg-transparent border-transparent shadow-none justify-between"
                }
            `}>
                {/* Logo */}
                <a href="/#hero" className={`font-mono font-semibold tracking-tight mx-1 md:mx-0 transition-all ${scrolled ? "text-sm w-8 h-8 flex items-center justify-center" : "text-xl"
                    }`}>
                    {"BV"}
                    <span className="text-muted-foreground">.</span>
                </a>

                {/* Right Group: Nav + Controls */}
                <div className="flex items-center gap-1 md:gap-2">
                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navKeys.map(({ href, key }) => (
                            <Button key={href} variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 text-[13px] h-8 rounded-full px-4">
                                <a href={href}>{t(key as Parameters<typeof t>[0])}</a>
                            </Button>
                        ))}
                    </div>

                    {/* Controls separator (Desktop) */}
                    <div className="hidden md:block w-px h-4 bg-border/50 mx-1" />

                    {/* Mobile controls */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-[12px] h-8 w-8 md:w-auto font-mono text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-full md:px-3"
                            onClick={toggleLocale}
                        >
                            <span className="hidden md:inline-block mr-1.5 opacity-70">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </span>
                            {locale.toUpperCase()}
                        </Button>

                        {/* Theme toggle */}
                        {mounted ? (
                            <DropdownMenu open={themeDropdownOpen} onOpenChange={setThemeDropdownOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button id="theme-toggle-btn" variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 relative z-[100000]">
                                        {theme === "dark" ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="min-w-[120px] rounded-xl border-white/10 dark:border-white/5 bg-background/40 dark:bg-zinc-900/40 backdrop-blur-3xl"
                                    onInteractOutside={(e) => {
                                        // Prevent Radix UI from auto-closing the dropdown when Driver.js creates its overlay
                                        if (document.body.classList.contains("theme-tour-active")) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <DropdownMenuItem onClick={() => setTheme("light")} className="text-xs gap-2 rounded-lg cursor-pointer">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                                        {t("theme.light")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem id="theme-dark-btn" onClick={() => setTheme("dark")} className="text-xs gap-2 rounded-lg cursor-pointer">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                                        {t("theme.dark")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")} className="text-xs gap-2 rounded-lg cursor-pointer">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 12V5.25" /></svg>
                                        {t("theme.system")}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="h-8 w-8" />
                        )}

                        {/* User Avatar */}
                        {mounted && (
                            user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-400 text-xs font-bold">
                                            {(user.user_metadata?.full_name?.[0] || user.email?.[0] || "U").toUpperCase()}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="min-w-[160px] rounded-xl border-white/10 dark:border-white/5 bg-background/40 dark:bg-zinc-900/40 backdrop-blur-3xl">
                                        <DropdownMenuItem asChild className="text-xs gap-2 rounded-lg cursor-pointer">
                                            <Link href="/giveaway">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" /></svg>
                                                {t("nav.myEntry")}
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={signOut} className="text-xs gap-2 rounded-lg cursor-pointer text-red-400 focus:text-red-400">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                                            {t("nav.signout")}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                                    onClick={() => router.push("/giveaway")}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                                </Button>
                            )
                        )}

                        {/* Mobile Menu Trigger */}
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full md:hidden hover:bg-foreground/5 ml-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[280px] bg-background/40 dark:bg-zinc-900/40 backdrop-blur-3xl border-white/5">
                                <SheetTitle className="font-mono text-base font-semibold mb-6 tracking-tight">BV<span className="text-muted-foreground">.</span></SheetTitle>

                                <div className="flex flex-col gap-2">
                                    {navKeys.map(({ href, key }) => (
                                        <Button key={href} variant="ghost" size="lg" asChild className="justify-start text-muted-foreground hover:text-foreground font-medium rounded-xl h-11" onClick={() => setOpen(false)}>
                                            <a href={href}>{t(key as Parameters<typeof t>[0])}</a>
                                        </Button>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
