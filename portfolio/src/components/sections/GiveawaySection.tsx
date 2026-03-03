"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/supabase-auth";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/animations";
import PhoneInput from "@/components/ui/phone-input";
import { PasswordInput } from "@/components/ui/password-input";
import confetti from "canvas-confetti";

// ─── Types ───────────────────────────────────────────────────────────
type AuthMode = "register" | "login" | "forgot" | "otp" | "success";

// ─── Countdown Hook ──────────────────────────────────────────────────
function useCountdown() {
    const getTarget = () => {
        const now = new Date();
        const target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        return target;
    };

    const calc = () => {
        const diff = Math.max(0, getTarget().getTime() - Date.now());
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            mins: Math.floor((diff / (1000 * 60)) % 60),
            secs: Math.floor((diff / 1000) % 60),
        };
    };

    const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

    useEffect(() => {
        setTime(calc());
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    }, []);

    return time;
}

// ─── Participant Count Hook (Realtime) ───────────────────────────────
function useParticipantCount() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Fetch the count via RPC (bypasses RLS)
        const fetchCount = () => {
            supabase
                .rpc("get_participant_count")
                .then(({ data, error }) => {
                    if (!error) setCount(Number(data) || 0);
                });
        };

        // Initial fetch
        fetchCount();

        // Subscribe to realtime changes on giveaway_entries
        const channel = supabase
            .channel("giveaway_entries_realtime")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "giveaway_entries" },
                () => fetchCount()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return count;
}

// ─── Fire Confetti ───────────────────────────────────────────────────
function fireConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"],
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"],
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    };
    frame();
}

// ─── Main Component ──────────────────────────────────────────────────
export default function GiveawaySection() {
    const { t } = useI18n();
    const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, completeProfile, resetPassword, verifyOtp, resendOtp, signOut } = useAuth();
    const countdown = useCountdown();
    const participantCount = useParticipantCount();

    // Auth mode state
    const [mode, setMode] = useState<AuthMode>("register");

    // Form state — Register
    const [registerStep, setRegisterStep] = useState<1 | 2>(1);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordStrong, setIsPasswordStrong] = useState(false);
    const [phone, setPhone] = useState("");
    const [ruc, setRuc] = useState("");
    const [address, setAddress] = useState("");
    const [businessType, setBusinessType] = useState("");

    // Form state — OTP
    const [otpCode, setOtpCode] = useState("");

    // UI
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendMessage, setResendMessage] = useState("");
    const [entryPosition, setEntryPosition] = useState<number | null>(null);
    const [hasEntry, setHasEntry] = useState<boolean | null>(null);
    const [forgotSuccess, setForgotSuccess] = useState(false);

    // Check if user already has an entry
    useEffect(() => {
        if (!user) {
            setHasEntry(false);
            return;
        }

        // Reset state so loading shimmer shows when fetching
        setHasEntry(null);

        supabase
            .from("giveaway_entries")
            .select("id")
            .eq("user_id", user.id)
            .maybeSingle()
            .then(({ data, error }) => {
                if (error) {
                    console.error("Error fetching entry:", error);
                }
                if (data) {
                    setHasEntry(true);
                    // Get correct global position using RPC instead of restricted table select
                    supabase
                        .rpc("get_giveaway_position", { p_user_id: user.id })
                        .then(({ data: pos_data }) => setEntryPosition(Number(pos_data) || 1));
                } else {
                    setHasEntry(false);
                }
            });
    }, [user]);

    // ─── Handlers ────────────────────────────────────────────────────

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(t("giveaway.modal.passwordMismatch") || "Las contraseñas no coinciden");
            return;
        }

        if (!isPasswordStrong) {
            setError(t("giveaway.modal.passwordWeakError") || "La contraseña debe cumplir con los requisitos");
            return;
        }

        setFormLoading(true);
        setError("");

        const result = await signUpWithEmail(email, password, {
            full_name: fullName,
            business_name: businessName,
            phone: phone || undefined,
            ruc: ruc || undefined,
            address: address || undefined,
            business_type: businessType || undefined,
        });

        if (result.error) {
            if (result.error.includes("rate limit")) {
                setError(t("giveaway.modal.rateLimit") || "Demasiados intentos. Por favor, espera...");
            } else {
                setError(result.error);
            }
        } else {
            // Move to OTP verification
            setMode("otp");
        }
        setFormLoading(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setError("");

        const result = await signInWithEmail(email, password);
        if (result.error) {
            setError(result.error);
        }
        setFormLoading(false);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setError("");

        const result = await resetPassword(email);
        if (result.error) {
            setError(result.error);
        } else {
            setForgotSuccess(true);
        }
        setFormLoading(false);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setError("");
        setResendMessage("");

        const result = await verifyOtp(email, otpCode);
        if (result.error) {
            if (result.error.includes("expired") || result.error.includes("invalid")) {
                setError(t("giveaway.modal.otpExpired"));
            } else {
                setError(result.error);
            }
        } else {
            setMode("success");
            fireConfetti();
        }
        setFormLoading(false);
    };

    const handleResendOtp = async () => {
        setFormLoading(true);
        setError("");
        setResendMessage("");

        const result = await resendOtp(email);
        if (result.error) {
            setError(result.error);
        } else {
            setResendMessage(t("giveaway.modal.otpResent"));
        }
        setFormLoading(false);
    };

    const handleCompleteProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setError("");

        const result = await completeProfile({
            full_name: fullName,
            business_name: businessName,
            phone: phone || undefined,
            ruc: ruc || undefined,
            address: address || undefined,
            business_type: businessType || undefined,
        });

        if (result.error) {
            setError(result.error);
        } else {
            setHasEntry(true);

            // Re-fetch position
            supabase
                .rpc("get_giveaway_position", { p_user_id: user?.id })
                .then(({ data: pos_data }) => setEntryPosition(Number(pos_data) || 1));

            fireConfetti();
        }
        setFormLoading(false);
    };

    const switchMode = (newMode: AuthMode) => {
        setMode(newMode);
        setRegisterStep(1);
        setError("");
        setResendMessage("");
        setForgotSuccess(false);
    };

    // Shared input class
    const inputClass = "w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all";

    // Countdown digit component
    const Digit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-foreground">
                {String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{label}</span>
        </div>
    );

    // Spinner
    const Spinner = () => (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    );

    // ─── Render Complete Profile Form ────────────────────────────────

    const renderCompleteProfileForm = () => {
        return (
            <div className="space-y-5">
                <div>
                    <h4 className="text-lg font-bold mb-1">{t("giveaway.modal.completeTitle") || "Completa tu postulación"}</h4>
                    <p className="text-xs text-muted-foreground">{t("giveaway.modal.completeDesc") || "Faltan un par de datos sobre tu negocio para entrar al sorteo."}</p>
                </div>

                <form onSubmit={handleCompleteProfile} className="space-y-4">
                    <div className="space-y-3 animate-in fade-in duration-300">
                        <input
                            type="text"
                            required
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder={t("giveaway.modal.business")}
                            className={inputClass}
                        />
                        <PhoneInput
                            value={phone}
                            onChange={setPhone}
                            placeholder={t("giveaway.modal.phone")}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                required
                                value={ruc}
                                onChange={(e) => setRuc(e.target.value)}
                                placeholder={t("giveaway.modal.ruc")}
                                className={inputClass}
                            />
                            <input
                                type="text"
                                required
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                placeholder={t("giveaway.modal.businessType")}
                                className={inputClass}
                            />
                        </div>
                        <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder={t("giveaway.modal.address")}
                            className={inputClass}
                        />

                        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={signOut}
                                className="h-11 px-4 rounded-full"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </Button>
                            <Button
                                type="submit"
                                disabled={formLoading || !businessName || !phone || !ruc || !businessType || !address}
                                className="flex-1 h-11 rounded-full text-sm font-semibold"
                            >
                                {formLoading ? <Spinner /> : t("giveaway.modal.completeSubmit") || "Completar Postulación"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    // ─── Render Auth Form ────────────────────────────────────────────

    const renderAuthForm = () => {
        // ── Success State (Confetti) ──
        if (mode === "success") {
            return (
                <div className="flex flex-col items-center text-center gap-5 py-6">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold">{t("giveaway.modal.confettiTitle")}</h4>
                    <p className="text-sm text-muted-foreground max-w-xs">{t("giveaway.modal.confettiDesc")}</p>
                </div>
            );
        }

        // ── OTP Step ──
        if (mode === "otp") {
            return (
                <div className="space-y-5">
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold mb-1">{t("giveaway.modal.otpTitle")}</h4>
                        <p className="text-xs text-muted-foreground">{t("giveaway.modal.otpDesc")}</p>
                        <p className="text-xs text-foreground font-mono mt-1">{email}</p>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="space-y-3">
                        <input
                            type="text"
                            required
                            maxLength={8}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                            placeholder={t("giveaway.modal.otpPlaceholder")}
                            className="w-full h-14 px-4 rounded-xl bg-secondary/50 border border-border/50 text-2xl font-mono text-center text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all tracking-[0.5em]"
                        />

                        {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}
                        {resendMessage && <p className="text-xs text-emerald-500 font-medium text-center">{resendMessage}</p>}

                        <Button
                            type="submit"
                            disabled={formLoading || otpCode.length < 8}
                            className="w-full h-11 rounded-full text-sm font-semibold"
                        >
                            {formLoading ? <Spinner /> : t("giveaway.modal.otpSubmit")}
                        </Button>

                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={formLoading}
                            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-1 disabled:opacity-50"
                        >
                            {t("giveaway.modal.otpResend")}
                        </button>
                    </form>
                </div>
            );
        }

        // ── Forgot Password ──
        if (mode === "forgot") {
            return (
                <div className="space-y-5">
                    <div>
                        <h4 className="text-lg font-bold mb-1">{t("giveaway.modal.forgotTitle")}</h4>
                        <p className="text-xs text-muted-foreground">{t("giveaway.modal.forgotDesc")}</p>
                    </div>

                    {forgotSuccess ? (
                        <div className="flex flex-col items-center text-center gap-4 py-4">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-sm text-foreground font-medium">{t("giveaway.modal.forgotSuccess")}</p>
                            <button
                                type="button"
                                onClick={() => switchMode("login")}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                            >
                                {t("giveaway.modal.forgotBack")}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleForgotPassword} className="space-y-3">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("giveaway.modal.email")}
                                className={inputClass}
                            />

                            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                            <Button
                                type="submit"
                                disabled={formLoading}
                                className="w-full h-11 rounded-full text-sm font-semibold"
                            >
                                {formLoading ? <Spinner /> : t("giveaway.modal.forgotSubmit")}
                            </Button>

                            <button
                                type="button"
                                onClick={() => switchMode("login")}
                                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-1"
                            >
                                {t("giveaway.modal.forgotBack")}
                            </button>
                        </form>
                    )}
                </div>
            );
        }

        // ── Login Mode ──
        if (mode === "login") {
            return (
                <div className="space-y-5">
                    <div>
                        <h4 className="text-lg font-bold mb-1">{t("giveaway.modal.loginTitle")}</h4>
                        <p className="text-xs text-muted-foreground">{t("giveaway.modal.loginDesc")}</p>
                    </div>

                    {/* Google */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 rounded-xl gap-3 text-sm font-medium border-border/50 hover:bg-secondary/50"
                        onClick={signInWithGoogle}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        {t("giveaway.modal.google")}
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-card px-3 text-muted-foreground">
                                {t("giveaway.modal.loginDivider")}
                            </span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-3">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("giveaway.modal.email")}
                            className={inputClass}
                        />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t("giveaway.modal.password")}
                            className={inputClass}
                        />

                        {/* Forgot password link */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => switchMode("forgot")}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {t("giveaway.modal.forgotPassword")}
                            </button>
                        </div>

                        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                        <Button
                            type="submit"
                            disabled={formLoading}
                            className="w-full h-11 rounded-full text-sm font-semibold"
                        >
                            {formLoading ? <Spinner /> : t("giveaway.modal.loginSubmit")}
                        </Button>
                    </form>

                    {/* Switch to Register */}
                    <button
                        type="button"
                        onClick={() => switchMode("register")}
                        className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-1"
                    >
                        {t("giveaway.modal.switchToRegister")}
                    </button>
                </div>
            );
        }

        // ── Register Mode (default) ──
        return (
            <div className="space-y-5">
                <div>
                    <h4 className="text-lg font-bold mb-1">{t("giveaway.modal.title")}</h4>
                    <p className="text-xs text-muted-foreground">{t("giveaway.modal.desc")}</p>
                </div>

                {/* Google Button */}
                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 rounded-xl gap-3 text-sm font-medium border-border/50 hover:bg-secondary/50"
                    onClick={signInWithGoogle}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {t("giveaway.modal.google")}
                </Button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-card px-3 text-muted-foreground">
                            {t("giveaway.modal.divider")}
                        </span>
                    </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Step Tracker */}
                    <div className="flex gap-2 mb-4">
                        <div className={`h-1.5 flex-1 rounded-full transition-colors ${registerStep >= 1 ? "bg-emerald-500" : "bg-border/50"}`} />
                        <div className={`h-1.5 flex-1 rounded-full transition-colors ${registerStep >= 2 ? "bg-emerald-500" : "bg-border/50"}`} />
                    </div>

                    {registerStep === 1 ? (
                        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                            <input
                                type="text"
                                required
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder={t("giveaway.modal.business")}
                                className={inputClass}
                            />
                            <PhoneInput
                                value={phone}
                                onChange={setPhone}
                                placeholder={t("giveaway.modal.phone")}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    required
                                    value={ruc}
                                    onChange={(e) => setRuc(e.target.value)}
                                    placeholder={t("giveaway.modal.ruc")}
                                    className={inputClass}
                                />
                                <input
                                    type="text"
                                    required
                                    value={businessType}
                                    onChange={(e) => setBusinessType(e.target.value)}
                                    placeholder={t("giveaway.modal.businessType")}
                                    className={inputClass}
                                />
                            </div>
                            <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={t("giveaway.modal.address")}
                                className={inputClass}
                            />

                            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                            <Button
                                type="button"
                                onClick={() => {
                                    if (businessName && phone && ruc && businessType && address) {
                                        setError("");
                                        setRegisterStep(2);
                                    } else {
                                        setError(t("giveaway.modal.fillAllFields") || "Por favor, completa todos los campos.");
                                    }
                                }}
                                className="w-full h-11 rounded-full text-sm font-semibold mt-2"
                            >
                                {t("giveaway.modal.next") || "Siguiente"}
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder={t("giveaway.modal.name")}
                                className={inputClass}
                            />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("giveaway.modal.email")}
                                className={inputClass}
                            />

                            <PasswordInput
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t("giveaway.modal.password")}
                                onStrengthChange={setIsPasswordStrong}
                            />

                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder={t("giveaway.modal.confirmPassword") || "Confirmar Contraseña"}
                                className={inputClass}
                            />

                            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setRegisterStep(1)}
                                    className="h-11 px-4 rounded-full"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={formLoading || !isPasswordStrong || password !== confirmPassword}
                                    className="flex-1 h-11 rounded-full text-sm font-semibold"
                                >
                                    {formLoading ? <Spinner /> : t("giveaway.modal.submit")}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>

                {/* Switch to Login */}
                <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-1"
                >
                    {t("giveaway.modal.switchToLogin")}
                </button>
            </div>
        );
    };

    return (
        <section id="giveaway" className="scroll-mt-24">
            <motion.div {...fadeUp}>
                <Card className="relative overflow-hidden">

                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">

                            {/* ── Left Column: Info + Countdown ── */}
                            <div className="p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border/30">
                                {/* Title */}
                                <div>
                                    <Badge variant="outline" className="mb-4 rounded-full text-muted-foreground border-border/50 font-mono text-[10px]">
                                        <span className="relative flex h-1.5 w-1.5 mr-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                        </span>
                                        LIVE
                                    </Badge>

                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                                        {t("giveaway.section.title")}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                                        {t("giveaway.section.prize")}
                                    </p>
                                </div>

                                {/* Countdown */}
                                <div className="mt-8">
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3">
                                        {t("giveaway.section.countdown")}
                                    </p>
                                    <div className="flex gap-5">
                                        <Digit value={countdown.days} label={t("giveaway.section.days")} />
                                        <span className="text-2xl font-bold text-muted-foreground/30 self-start mt-0.5">:</span>
                                        <Digit value={countdown.hours} label={t("giveaway.section.hours")} />
                                        <span className="text-2xl font-bold text-muted-foreground/30 self-start mt-0.5">:</span>
                                        <Digit value={countdown.mins} label={t("giveaway.section.mins")} />
                                        <span className="text-2xl font-bold text-muted-foreground/30 self-start mt-0.5">:</span>
                                        <Digit value={countdown.secs} label={t("giveaway.section.secs")} />
                                    </div>
                                </div>

                                {/* Participant Count */}
                                <div className="mt-8 flex items-center gap-3">
                                    {participantCount > 0 && (
                                        <div className="flex -space-x-2">
                                            {[...Array(Math.min(4, participantCount))].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-bold text-foreground"
                                                >
                                                    {String.fromCharCode(65 + i)}
                                                </div>
                                            ))}
                                            {participantCount > 4 && (
                                                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-mono text-muted-foreground">
                                                    +{participantCount - 4}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <span className="text-sm text-muted-foreground">
                                        <strong className="text-foreground">{participantCount}</strong> {t("giveaway.section.participants")}
                                    </span>
                                </div>
                            </div>

                            {/* ── Right Column: Auth or Dashboard ── */}
                            <div className="p-8 md:p-10 flex flex-col justify-center">
                                {loading || (user && hasEntry === null) ? (
                                    /* Loading shimmer (matches form size) */
                                    <div className="space-y-5 animate-pulse">
                                        <div>
                                            <div className="h-6 w-32 bg-secondary/50 rounded-md mb-2" />
                                            <div className="h-4 w-48 bg-secondary/50 rounded-md" />
                                        </div>

                                        <div className="h-11 w-full bg-secondary/50 rounded-xl" />

                                        <div className="py-2 flex justify-center">
                                            <div className="h-4 w-1/4 bg-secondary/30 rounded-md" />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="h-10 w-full bg-secondary/50 rounded-xl" />
                                            <div className="h-10 w-full bg-secondary/50 rounded-xl" />
                                            <div className="h-10 w-full bg-secondary/50 rounded-xl" />
                                            <div className="h-10 w-full bg-secondary/50 rounded-xl" />
                                            <div className="h-11 w-full bg-secondary/50 rounded-full mt-2" />
                                        </div>
                                    </div>
                                ) : user && hasEntry ? (
                                    /* ── Dashboard (Logged In & Applied) ── */
                                    <div className="flex flex-col gap-5">
                                        {/* Status Header with glow */}
                                        <div className="relative flex items-center gap-4">
                                            {/* Animated Success Icon */}
                                            <div className="relative flex-shrink-0">
                                                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: "3s" }} />
                                                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center">
                                                    <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-base font-bold text-foreground">{t("giveaway.section.registered")}</h4>
                                                <p className="text-sm text-muted-foreground truncate">
                                                    {user.user_metadata?.full_name || user.email}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Position & Stats Card */}
                                        {entryPosition && (
                                            <div className="rounded-xl bg-secondary/30 border border-border/30 p-4 space-y-3">
                                                {/* Position Header */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                                                        {t("giveaway.section.position")}
                                                    </span>
                                                    <span className="text-xs font-mono text-emerald-500 font-bold">
                                                        #{entryPosition} / {participantCount}
                                                    </span>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="relative h-2 rounded-full bg-secondary/80 overflow-hidden">
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: participantCount > 0 ? `${Math.max(((entryPosition) / Math.max(participantCount, 1)) * 100, 12)}%` : "12%" }}
                                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                                    />
                                                </div>

                                                {/* Stats Row */}
                                                <div className="flex items-center gap-3 pt-1">
                                                    <div className="flex -space-x-1.5">
                                                        {Array.from({ length: Math.min(participantCount, 3) }).map((_, i) => (
                                                            <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-secondary to-muted-foreground/20 border-2 border-card" />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {participantCount} {t("giveaway.section.participants")}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Waiting Status */}
                                        <div className="flex items-center gap-2 px-1">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                                            </span>
                                            <p className="text-xs text-muted-foreground">
                                                {t("giveaway.section.waiting")}
                                            </p>
                                        </div>

                                        {/* Sign Out */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={signOut}
                                            className="text-xs text-muted-foreground hover:text-foreground w-full"
                                        >
                                            {t("giveaway.section.signout")}
                                        </Button>
                                    </div>
                                ) : user && hasEntry === false ? (
                                    /* ── Complete Profile (Google Auth users without entry) ── */
                                    renderCompleteProfileForm()
                                ) : (
                                    /* ── Auth Form (Guest) ── */
                                    renderAuthForm()
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}
