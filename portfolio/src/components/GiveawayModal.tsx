"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/lib/i18n";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import PhoneInput from "@/components/ui/phone-input";
import { PasswordInput } from "@/components/ui/password-input";

// ─── Types ───────────────────────────────────────────────────────────
type ModalMode = "register" | "login" | "forgot" | "otp" | "success";

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

interface GiveawayModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function GiveawayModal({ open, onOpenChange }: GiveawayModalProps) {
    const { t } = useI18n();
    const [mode, setMode] = useState<ModalMode>("register");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendMessage, setResendMessage] = useState("");
    const [forgotSuccess, setForgotSuccess] = useState(false);

    // Form fields — Register
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

    // OTP
    const [otpCode, setOtpCode] = useState("");

    const inputClass = "w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all";

    // Spinner
    const Spinner = () => (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    );

    // ─── Handlers ────────────────────────────────────────────────────

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError("");
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}`,
            },
        });
        if (error) {
            setError(t("giveaway.modal.error"));
            setLoading(false);
        }
    };

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

        setLoading(true);
        setError("");

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        business_name: businessName,
                    },
                },
            });

            if (authError) throw authError;

            // Prevent foreign key violation: Supabase returns a fake user with 0 identities if the email already exists
            if (authData.user?.identities && authData.user.identities.length === 0) {
                throw new Error("Este correo ya está registrado. Por favor, inicia sesión.");
            }

            const { error: insertError } = await supabase
                .from("giveaway_entries")
                .insert({
                    user_id: authData.user?.id,
                    full_name: fullName,
                    email,
                    business_name: businessName,
                    phone: phone || null,
                    ruc: ruc || null,
                    address: address || null,
                    business_type: businessType || null,
                });

            if (insertError) throw insertError;

            setMode("otp");
        } catch (err: any) {
            if (err?.message?.includes("rate limit")) {
                setError(t("giveaway.modal.rateLimit") || "Demasiados intentos. Por favor, espera...");
            } else {
                setError(err?.message || t("giveaway.modal.error"));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
        } else {
            onOpenChange(false);
        }
        setLoading(false);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/giveaway`,
        });
        if (error) {
            setError(error.message);
        } else {
            setForgotSuccess(true);
        }
        setLoading(false);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResendMessage("");

        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otpCode,
            type: "signup",
        });

        if (error) {
            if (error.message.includes("expired") || error.message.includes("invalid")) {
                setError(t("giveaway.modal.otpExpired"));
            } else {
                setError(error.message);
            }
        } else {
            setMode("success");
            fireConfetti();
        }
        setLoading(false);
    };

    const handleResendOtp = async () => {
        setLoading(true);
        setError("");
        setResendMessage("");

        const { error } = await supabase.auth.resend({
            type: "signup",
            email,
        });

        if (error) {
            setError(error.message);
        } else {
            setResendMessage(t("giveaway.modal.otpResent"));
        }
        setLoading(false);
    };

    const switchMode = (newMode: ModalMode) => {
        setMode(newMode);
        setRegisterStep(1);
        setError("");
        setResendMessage("");
        setForgotSuccess(false);
    };

    const handleClose = (val: boolean) => {
        if (!val) {
            // Reset
            setMode("register");
            setRegisterStep(1);
            setError("");
            setResendMessage("");
            setForgotSuccess(false);
            setFullName("");
            setEmail("");
            setBusinessName("");
            setPassword("");
            setConfirmPassword("");
            setIsPasswordStrong(false);
            setPhone("");
            setRuc("");
            setAddress("");
            setBusinessType("");
            setOtpCode("");
        }
        onOpenChange(val);
    };

    // ─── Render Content ──────────────────────────────────────────────

    const renderContent = () => {
        // ── Success (Confetti) ──
        if (mode === "success") {
            return (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-foreground font-bold text-xl">{t("giveaway.modal.confettiTitle")}</p>
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
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                            placeholder={t("giveaway.modal.otpPlaceholder")}
                            className="w-full h-14 px-4 rounded-xl bg-secondary/50 border border-border/50 text-2xl font-mono text-center text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all tracking-[0.5em]"
                        />

                        {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}
                        {resendMessage && <p className="text-xs text-emerald-500 font-medium text-center">{resendMessage}</p>}

                        <Button
                            type="submit"
                            disabled={loading || otpCode.length < 6}
                            className="w-full h-11 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
                        >
                            {loading ? <Spinner /> : t("giveaway.modal.otpSubmit")}
                        </Button>

                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={loading}
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
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-xl font-bold tracking-tight">
                            {t("giveaway.modal.forgotTitle")}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                            {t("giveaway.modal.forgotDesc")}
                        </DialogDescription>
                    </DialogHeader>

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
                                disabled={loading}
                                className="w-full h-11 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
                            >
                                {loading ? <Spinner /> : t("giveaway.modal.forgotSubmit")}
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
                    <DialogHeader className="space-y-2 mb-2">
                        <DialogTitle className="text-xl font-bold tracking-tight">
                            {t("giveaway.modal.loginTitle")}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                            {t("giveaway.modal.loginDesc")}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Google */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 rounded-xl gap-3 text-sm font-medium border-border/50 hover:bg-secondary/50"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
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
                            <span className="bg-background dark:bg-zinc-950 px-3 text-muted-foreground">
                                {t("giveaway.modal.loginDivider")}
                            </span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-3">
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("giveaway.modal.email")} className={inputClass} />
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("giveaway.modal.password")} className={inputClass} />

                        <div className="flex justify-end">
                            <button type="button" onClick={() => switchMode("forgot")} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                {t("giveaway.modal.forgotPassword")}
                            </button>
                        </div>

                        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                        <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all">
                            {loading ? <Spinner /> : t("giveaway.modal.loginSubmit")}
                        </Button>
                    </form>

                    <button type="button" onClick={() => switchMode("register")} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-1">
                        {t("giveaway.modal.switchToRegister")}
                    </button>
                </div>
            );
        }

        // ── Register Mode (default) ──
        return (
            <div className="space-y-5">
                <DialogHeader className="space-y-2 mb-2">
                    <DialogTitle className="text-xl font-bold tracking-tight">
                        {t("giveaway.modal.title")}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                        {t("giveaway.modal.desc")}
                    </DialogDescription>
                </DialogHeader>

                {/* Google Button */}
                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 rounded-xl gap-3 text-sm font-medium border-border/50 hover:bg-secondary/50"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
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
                        <span className="bg-background dark:bg-zinc-950 px-3 text-muted-foreground">
                            {t("giveaway.modal.divider")}
                        </span>
                    </div>
                </div>

                {/* Register Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Step Tracker */}
                    <div className="flex gap-2 mb-4">
                        <div className={`h-1.5 flex-1 rounded-full transition-colors ${registerStep >= 1 ? "bg-emerald-500" : "bg-border/50"}`} />
                        <div className={`h-1.5 flex-1 rounded-full transition-colors ${registerStep >= 2 ? "bg-emerald-500" : "bg-border/50"}`} />
                    </div>

                    {registerStep === 1 ? (
                        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                            <input type="text" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder={t("giveaway.modal.business")} className={inputClass} />
                            <PhoneInput value={phone} onChange={setPhone} placeholder={t("giveaway.modal.phone")} />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" required value={ruc} onChange={(e) => setRuc(e.target.value)} placeholder={t("giveaway.modal.ruc")} className={inputClass} />
                                <input type="text" required value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder={t("giveaway.modal.businessType")} className={inputClass} />
                            </div>
                            <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t("giveaway.modal.address")} className={inputClass} />

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
                                className="w-full h-11 rounded-full text-sm font-semibold mt-2 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
                            >
                                {t("giveaway.modal.next") || "Siguiente"}
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                            <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={t("giveaway.modal.name")} className={inputClass} />
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("giveaway.modal.email")} className={inputClass} />

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
                                    disabled={loading || !isPasswordStrong || password !== confirmPassword}
                                    className="flex-1 h-11 rounded-full text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
                                >
                                    {loading ? <Spinner /> : t("giveaway.modal.submit")}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>

                {/* Switch to Login */}
                <button type="button" onClick={() => switchMode("login")} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-1">
                    {t("giveaway.modal.switchToLogin")}
                </button>
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md rounded-2xl border-white/10 dark:border-white/5 bg-background/95 dark:bg-zinc-950/95 backdrop-blur-3xl shadow-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* Top Gradient Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500" />

                <div className="p-6 pt-5">
                    {renderContent()}
                </div>
            </DialogContent>
        </Dialog>
    );
}
