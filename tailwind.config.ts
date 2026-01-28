import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    800: "#1E3A5F",
                    900: "#0A0F1E",
                },
                gold: {
                    400: "#FBBF24",
                    500: "#CA8A04",
                },
                amber: {
                    400: "#F59E0B",
                },
                glass: {
                    DEFAULT: "rgba(10, 20, 40, 0.4)",
                    border: "rgba(255, 255, 255, 0.08)",
                },
            },
            fontFamily: {
                display: ["var(--font-inter)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            animation: {
                "fade-slide-up": "fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "text-reveal": "textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "glow-pulse": "glowPulse 2s ease-in-out infinite",
                shimmer: "shimmer 2s infinite",
                float: "parallaxFloat 6s ease-in-out infinite",
                "scroll-indicator": "scrollBounce 2s ease-in-out infinite",
                "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            },
            keyframes: {
                fadeSlideUp: {
                    "0%": { opacity: "0", transform: "translateY(60px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                textReveal: {
                    "0%": { clipPath: "inset(0 100% 0 0)", opacity: "0" },
                    "100%": { clipPath: "inset(0 0 0 0)", opacity: "1" },
                },
                glowPulse: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(202, 138, 4, 0.4)" },
                    "50%": { boxShadow: "0 0 40px rgba(202, 138, 4, 0.8)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% center" },
                    "100%": { backgroundPosition: "200% center" },
                },
                parallaxFloat: {
                    "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
                    "50%": { transform: "translateY(-20px) rotate(2deg)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.9)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                scrollBounce: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(10px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
