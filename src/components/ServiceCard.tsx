"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    href: string;
    featured?: boolean;
}

export default function ServiceCard({
    icon,
    title,
    description,
    features,
    href,
    featured = false,
}: ServiceCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "group relative rounded-2xl overflow-hidden transition-all duration-500",
                featured
                    ? "bg-gradient-to-br from-gold-500/20 to-amber-400/10 border border-gold-500/30"
                    : "bg-white/5 border border-white/10 hover:border-gold-500/30"
            )}
        >
            {/* Featured Badge */}
            {featured && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 text-xs font-bold uppercase tracking-wider">
                    Popular
                </div>
            )}

            <div className="p-8">
                {/* Icon */}
                <div
                    className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300",
                        featured
                            ? "bg-gradient-to-br from-gold-500 to-amber-400 text-navy-900"
                            : "bg-white/5 text-gold-400 group-hover:bg-gold-500/20"
                    )}
                >
                    {icon}
                </div>

                {/* Content */}
                <h3 className="font-display text-xl text-white mb-3">{title}</h3>
                <p className="text-white/60 text-sm font-body leading-relaxed mb-6">
                    {description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <div
                                className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                                    featured
                                        ? "bg-gold-500/20 text-gold-400"
                                        : "bg-white/5 text-white/60"
                                )}
                            >
                                <Check className="w-3 h-3" />
                            </div>
                            <span className="text-sm text-white/70 font-body">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Link href={href}>
                    <motion.button
                        whileHover={{ x: 4 }}
                        className={cn(
                            "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors",
                            featured
                                ? "text-gold-400 hover:text-gold-300"
                                : "text-white/60 hover:text-gold-400"
                        )}
                    >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </Link>
            </div>

            {/* Hover Glow Effect */}
            <div
                className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    "bg-gradient-to-t from-gold-500/5 to-transparent"
                )}
            />
        </motion.div>
    );
}
