"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    span?: "normal" | "wide" | "tall";
}

interface FeatureGridProps {
    features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    className={cn(
                        "group relative rounded-2xl bg-white/5 border border-white/10 p-8 overflow-hidden transition-all duration-300 hover:border-gold-500/30 hover:bg-white/[0.07]",
                        feature.span === "wide" && "md:col-span-2",
                        feature.span === "tall" && "md:row-span-2"
                    )}
                >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors">
                        <div className="text-gold-400">{feature.icon}</div>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl text-white mb-3">
                        {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm font-body leading-relaxed">
                        {feature.description}
                    </p>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            ))}
        </motion.div>
    );
}
