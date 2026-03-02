import React, { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Eye, EyeOff, Check, X } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onStrengthChange?: (isStrong: boolean) => void;
    showStrength?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, onChange, onStrengthChange, showStrength = true, value, ...props }, ref) => {
        const { t } = useI18n();
        const [showPassword, setShowPassword] = useState(false);
        const [strength, setStrength] = useState(0);

        const passwordValue = (value as string) || "";

        // Criteria
        const hasMinLength = passwordValue.length >= 8;
        const hasUppercase = /[A-Z]/.test(passwordValue);
        const hasNumber = /[0-9]/.test(passwordValue);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

        useEffect(() => {
            let score = 0;
            if (hasMinLength) score += 1;
            if (hasUppercase) score += 1;
            if (hasNumber && hasSpecialChar) score += 1;

            setStrength(score);

            // Requirment to be considered "strong enough" to submit (e.g. at least 2 out of 3 criteria met)
            if (onStrengthChange) {
                onStrengthChange(score >= 2 && hasMinLength);
            }
        }, [passwordValue, hasMinLength, hasUppercase, hasNumber, hasSpecialChar, onStrengthChange]);

        const getStrengthColor = () => {
            if (passwordValue.length === 0) return "bg-border/50";
            if (strength === 0) return "bg-red-500";
            if (strength === 1) return "bg-orange-500";
            if (strength === 2) return "bg-emerald-500";
            if (strength === 3) return "bg-emerald-500";
            return "bg-border/50";
        };

        const getStrengthText = () => {
            if (passwordValue.length === 0) return "";
            if (strength === 0 || strength === 1) return t("giveaway.modal.passwordWeak") || "Débil";
            if (strength === 2) return t("giveaway.modal.passwordMedium") || "Media";
            if (strength === 3) return t("giveaway.modal.passwordStrong") || "Fuerte";
            return "";
        };

        const CriteriaLine = ({ met, label }: { met: boolean; label: string }) => (
            <div className={`flex items-center gap-2 text-xs transition-colors ${met ? "text-emerald-500" : "text-muted-foreground"}`}>
                {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                <span>{label}</span>
            </div>
        );

        return (
            <div className="w-full space-y-2">
                <div className="relative">
                    <input
                        {...props}
                        ref={ref}
                        type={showPassword ? "text" : "password"}
                        value={value}
                        onChange={onChange}
                        className={`w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all pr-10 ${className || ""}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>

                {showStrength && passwordValue.length > 0 && (
                    <div className="bg-secondary/30 rounded-lg p-3 space-y-3 border border-border/30">
                        {/* Strength Bar */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex gap-1 flex-1 h-1.5">
                                <div className={`flex-1 rounded-full transition-colors duration-300 ${passwordValue.length > 0 ? (strength >= 0 ? getStrengthColor() : "bg-border/50") : "bg-border/50"}`} />
                                <div className={`flex-1 rounded-full transition-colors duration-300 ${passwordValue.length > 0 ? (strength >= 2 ? getStrengthColor() : "bg-border/50") : "bg-border/50"}`} />
                                <div className={`flex-1 rounded-full transition-colors duration-300 ${passwordValue.length > 0 ? (strength >= 3 ? getStrengthColor() : "bg-border/50") : "bg-border/50"}`} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${getStrengthColor().replace("bg-", "text-")}`}>
                                {getStrengthText()}
                            </span>
                        </div>

                        {/* Criteria Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <CriteriaLine met={hasMinLength} label={t("giveaway.modal.passwordMinLength") || "Mínimo 8 caracteres"} />
                            <CriteriaLine met={hasUppercase} label={t("giveaway.modal.passwordUppercase") || "Letra mayúscula"} />
                            <CriteriaLine met={hasNumber} label={t("giveaway.modal.passwordNumber") || "Un número"} />
                            <CriteriaLine met={hasSpecialChar} label={t("giveaway.modal.passwordSpecial") || "Carácter especial (!@#$)"} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";
