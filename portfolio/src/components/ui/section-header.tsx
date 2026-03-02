"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

/**
 * Reusable animated section header with label + separator line.
 * Used by Projects and other full-bleed sections.
 */
export function SectionHeader({ label, separatorWidth = "flex-1" }: { label: string; separatorWidth?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-12"
        >
            <h2 className="font-mono text-muted-foreground text-xs tracking-widest uppercase">{label}</h2>
            <Separator className={separatorWidth} />
        </motion.div>
    );
}
