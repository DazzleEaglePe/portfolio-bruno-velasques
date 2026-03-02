import type { Variants } from "framer-motion";

/**
 * Shared fade-up animation config for framer-motion.
 * Used across all section components for consistent entrance animations.
 */
export const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.1, margin: "-15% 0px -15% 0px" } as const,
    transition: { duration: 0.5 },
};
