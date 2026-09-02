"use client";

import { useState, useRef, useEffect } from "react";

import * as Flags from 'country-flag-icons/react/3x2';

type CountryCode = keyof typeof Flags;

// ─── Country data (flag + dial code) ──────────────────────────
const countries: { code: CountryCode, dial: string, name: string }[] = [
    { code: "PE", dial: "+51", name: "Perú" },
    { code: "MX", dial: "+52", name: "México" },
    { code: "CO", dial: "+57", name: "Colombia" },
    { code: "AR", dial: "+54", name: "Argentina" },
    { code: "CL", dial: "+56", name: "Chile" },
    { code: "EC", dial: "+593", name: "Ecuador" },
    { code: "BO", dial: "+591", name: "Bolivia" },
    { code: "PY", dial: "+595", name: "Paraguay" },
    { code: "UY", dial: "+598", name: "Uruguay" },
    { code: "VE", dial: "+58", name: "Venezuela" },
    { code: "BR", dial: "+55", name: "Brasil" },
    { code: "CR", dial: "+506", name: "Costa Rica" },
    { code: "PA", dial: "+507", name: "Panamá" },
    { code: "DO", dial: "+1", name: "Rep. Dominicana" },
    { code: "GT", dial: "+502", name: "Guatemala" },
    { code: "US", dial: "+1", name: "United States" },
    { code: "ES", dial: "+34", name: "España" },
];

interface PhoneInputProps {
    value: string;
    onChange: (fullPhone: string) => void;
    placeholder?: string;
    className?: string;
}

export default function PhoneInput({ value, onChange, placeholder = "Teléfono", className = "" }: PhoneInputProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(countries[0]); // Default: Peru
    const [localNumber, setLocalNumber] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Parse initial value if provided  (e.g. "+51 954153338")
    useEffect(() => {
        if (value && !localNumber) {
            const match = countries.find(c => value.startsWith(c.dial));
            if (match) {
                setSelected(match);
                setLocalNumber(value.slice(match.dial.length).trim());
            } else {
                setLocalNumber(value);
            }
        }
    }, []);

    // Emit full phone whenever local number or country changes
    useEffect(() => {
        if (localNumber) {
            onChange(`${selected.dial} ${localNumber}`);
        } else {
            onChange("");
        }
    }, [localNumber, selected]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative flex ${className}`} ref={dropdownRef}>
            {/* Country Code Selector */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex h-11 shrink-0 items-center gap-1.5 rounded-l-[14px] border border-r-0 border-white/[0.08] bg-black/25 px-3 text-sm text-white transition-colors hover:bg-black/40"
            >
                {(() => {
                    const Flag = Flags[selected.code];
                    return <Flag className="w-5 h-auto rounded-[2px] shadow-sm" />;
                })()}
                <span className="text-xs font-mono text-muted-foreground">{selected.dial}</span>
                <svg className={`w-3 h-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {/* Number Input */}
            <input
                type="tel"
                value={localNumber}
                onChange={(e) => setLocalNumber(e.target.value.replace(/[^\d\s-]/g, ""))}
                placeholder={placeholder}
                className="h-11 w-full rounded-r-[14px] border border-white/[0.08] bg-black/25 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-[#baff66]/45 focus:ring-2 focus:ring-[#baff66]/10"
            />

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 top-12 z-50 max-h-60 w-64 overflow-y-auto rounded-[14px] border border-white/[0.09] bg-[#111]/95 py-1 shadow-2xl backdrop-blur-xl">
                    {countries.map((country) => {
                        const FlagIcon = Flags[country.code];
                        return (
                            <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                    setSelected(country);
                                    setOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-secondary/50 transition-colors ${selected.code === country.code ? "bg-secondary/30 text-foreground" : "text-muted-foreground"
                                    }`}
                            >
                                <FlagIcon className="w-5 h-auto rounded-[2px] shadow-sm shrink-0" />
                                <span className="flex-1 text-left">{country.name}</span>
                                <span className="text-xs font-mono opacity-60">{country.dial}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
