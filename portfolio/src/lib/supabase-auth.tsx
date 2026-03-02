"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface SignUpMeta {
    full_name: string;
    business_name: string;
    phone?: string;
    ruc?: string;
    address?: string;
    business_type?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
    signUpWithEmail: (email: string, password: string, meta: SignUpMeta) => Promise<{ error?: string }>;
    resetPassword: (email: string) => Promise<{ error?: string }>;
    verifyOtp: (email: string, token: string) => Promise<{ error?: string }>;
    resendOtp: (email: string) => Promise<{ error?: string }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        // Mark loader as shown so it won't re-trigger after OAuth redirect
        sessionStorage.setItem("loaderShown", "1");
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/giveaway` },
        });
    };

    const signInWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        return {};
    };

    const signUpWithEmail = async (
        email: string,
        password: string,
        meta: SignUpMeta
    ) => {
        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: meta.full_name,
                    business_name: meta.business_name,
                },
            },
        });

        if (authError) return { error: authError.message };

        // Supabase returns a fake user with an empty identities array if the email is already registered.
        // Inserting with this fake ID causes a foreign key constraint violation.
        if (data.user?.identities && data.user.identities.length === 0) {
            return { error: "Este correo ya está registrado. Por favor, inicia sesión." };
        }

        // Insert giveaway entry with all fields
        const { error: insertError } = await supabase
            .from("giveaway_entries")
            .insert({
                user_id: data.user?.id,
                full_name: meta.full_name,
                email,
                business_name: meta.business_name,
                phone: meta.phone || null,
                ruc: meta.ruc || null,
                address: meta.address || null,
                business_type: meta.business_type || null,
            });

        if (insertError) return { error: insertError.message };

        return {};
    };

    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/giveaway`,
        });
        if (error) return { error: error.message };
        return {};
    };

    const verifyOtp = async (email: string, token: string) => {
        const { error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: "signup",
        });
        if (error) return { error: error.message };
        return {};
    };

    const resendOtp = async (email: string) => {
        const { error } = await supabase.auth.resend({
            type: "signup",
            email,
        });
        if (error) return { error: error.message };
        return {};
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, verifyOtp, resendOtp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
