"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Code } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useRouter } from "next/navigation";

export default function HeroGiveawayCard() {
    const { t, locale } = useI18n();
    const router = useRouter();

    // 3D Tilt Effect Setup (Framer Motion)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Glare Effect Position mapping
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

    // Shadow Offset mapping (moves opposite to mouse for depth)
    const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], ["30px", "-30px"]);
    const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], ["30px", "-30px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleApply = () => {
        router.push("/giveaway");
    };

    return (
        <div
            className="w-full max-w-md lg:max-w-[480px] ml-auto aspect-square md:aspect-auto md:h-[500px] lg:h-[550px] relative group"
            style={{ perspective: 1000 }}
        >
            {/* Reactive Glowing Shadow Offset */}
            <motion.div
                className="absolute inset-0 top-6 left-6 w-[95%] h-[95%] bg-blue-600/25 blur-[60px] rounded-[2.5rem] pointer-events-none transition-colors duration-700 group-hover:bg-blue-500/40 opacity-0 group-hover:opacity-100"
                style={{
                    x: shadowX,
                    y: shadowY,
                }}
            />

            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full relative rounded-[2.5rem] overflow-hidden p-8 lg:p-12 flex flex-col justify-between group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    background: "linear-gradient(145deg, #0e1e4a 0%, #030712 60%, #020617 100%)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05), 0 25px 50px -12px rgba(0,0,0,0.5)",
                }}
            >
                {/* Dynamic Glare Effect */}
                <motion.div
                    className="pointer-events-none absolute inset-0 z-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)",
                        left: glareX,
                        top: glareY,
                        transform: "translate(-50%, -50%)",
                        width: "200%",
                        height: "200%",
                    }}
                />

                {/* Top Shine / Glow Effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-3 bg-[#b1d4ff] p-2 pr-6 rounded-full shadow-lg h-14">
                        <div className="w-10 h-10 bg-[#0f172a] rounded-full flex items-center justify-center shrink-0">
                            <Code className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-[#0f172a] font-bold text-sm leading-tight">
                                {t("giveaway.badge")}
                            </span>
                            <span className="text-[#334155] text-[10px] leading-tight max-w-[120px]">
                                {t("giveaway.badgeSub")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative z-10 flex flex-col gap-3 mt-8">
                    <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
                        {t("giveaway.headline1")} <br />
                        <span className="font-bold">{t("giveaway.hashtag")}</span> <br />
                        <span className="font-bold">{t("giveaway.headline2")}</span>
                    </h3>

                    <div className="w-48 h-[2px] bg-blue-400/50 rounded-full mt-2" />

                    <p className="text-blue-100/90 text-lg lg:text-xl font-light">
                        {t("giveaway.subtitle")}
                    </p>
                </div>

                {/* Bottom Actions */}
                <div className="relative z-10 flex items-end justify-between mt-12 md:mt-auto">
                    {/* CTA Button */}
                    <button
                        onClick={handleApply}
                        className="group flex items-center gap-3 text-white text-base lg:text-lg hover:text-blue-200 transition-colors border-b border-transparent hover:border-blue-200 pb-1"
                    >
                        {t("giveaway.cta")}
                        <div className="bg-white text-[#0f172a] rounded-md p-1 group-hover:bg-blue-100 transition-colors">
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </button>

                    {/* Right Branding */}
                    <div className="text-right flex flex-col items-end">
                        <span className="text-blue-200/60 text-xs uppercase tracking-wider mb-1">
                            {t("giveaway.label")}
                        </span>
                        <span className="text-white text-sm font-light">
                            {t("giveaway.tagline1")} <span className="font-bold underline decoration-blue-500 underline-offset-4 decoration-2">{t("giveaway.taglineName")}</span>,<br />
                            {t("giveaway.tagline2")} <span className="font-bold">{t("giveaway.tagline3")}</span>
                        </span>
                    </div>
                </div>

                {/* Background Decorative Pattern (Optional subtle dots/lines) */}
                <div
                    className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"
                    style={{ transform: "translateZ(-50px)" }}
                />
            </motion.div>
        </div>
    );
}
