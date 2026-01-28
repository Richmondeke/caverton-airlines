import { Variants } from "framer-motion";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: premiumEase,
        },
    },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: premiumEase,
        },
    },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: premiumEase,
        },
    },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: premiumEase,
        },
    },
};

export const slideDown: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: premiumEase,
        },
    },
};

export const textReveal: Variants = {
    hidden: {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        y: 10,
    },
    visible: {
        clipPath: "inset(0 0 0 0)",
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.0,
            ease: premiumEase,
        },
    },
};

export const glowPulse: Variants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.05, 1],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};
