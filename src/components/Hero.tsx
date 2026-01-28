"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Package, MapPin, ArrowRight, Plane, Globe, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    staggerContainer,
    fadeInUp,
    textReveal,
    scaleIn,
    glowPulse
} from "@/lib/animations";

export default function Hero() {
    const [trackingNumber, setTrackingNumber] = useState("");

    const handleTrack = () => {
        if (trackingNumber.trim()) {
            window.location.href = `/track?id=${encodeURIComponent(trackingNumber)}`;
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-black" />
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100" />

            {/* Floating Orbs */}
            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl"
            />

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
                    alt="Cargo plane loading"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    className="lg:col-span-7 space-y-8"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp}>
                        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md font-body">
                            Premium Aviation Logistics
                        </span>
                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.95] text-white overflow-hidden pb-4">
                            <motion.span className="block" variants={textReveal}>Ship Beyond</motion.span>
                            <motion.span className="block italic text-white/90" variants={textReveal}>
                                Boundaries
                            </motion.span>
                        </h1>
                        <p className="mt-8 text-lg text-white/60 max-w-xl leading-relaxed font-body">
                            The pinnacle of West African cargo services. Where luxury meets
                            logistics, and every shipment is crafted for the discerning.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={staggerContainer}
                        className="flex flex-wrap gap-8 pt-4"
                    >
                        {[
                            { icon: Globe, value: "200+", label: "Countries" },
                            { icon: Package, value: "1M+", label: "Shipments" },
                            { icon: Clock, value: "99%", label: "On Time" },
                        ].map((stat, i) => (
                            <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <stat.icon className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <p className="font-display text-2xl text-white">{stat.value}</p>
                                    <p className="text-xs uppercase tracking-wider text-white/40 font-body">
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <Link href="/ship">
                            <motion.button
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 rounded-xl font-bold uppercase tracking-wider overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(202,138,4,0.4)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Ship Now
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </motion.button>
                        </Link>
                        <Link href="/services">
                            <motion.button
                                whileHover={{ y: -2 }}
                                className="group relative px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-medium uppercase tracking-wider overflow-hidden transition-all hover:border-gold-500/50"
                            >
                                <span className="relative z-10 group-hover:text-gold-400 transition-colors">
                                    Explore Services
                                </span>
                                <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Tracking Widget */}
                <div className="lg:col-span-5 relative mt-10 lg:mt-0">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={scaleIn}
                        className="glass-panel p-1 rounded-3xl"
                    >
                        <div className="bg-navy-900/40 backdrop-blur-xl rounded-[20px] p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                                    <Search className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <h3 className="font-display text-lg text-white">Track Shipment</h3>
                                    <p className="text-xs text-white/40 font-body">
                                        Enter your tracking number
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500/70" />
                                    <input
                                        type="text"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                                        placeholder="e.g., CF-2025-8473629"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body font-mono"
                                        maxLength={20}
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleTrack}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 font-bold uppercase tracking-widest shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 transition-all flex items-center justify-center gap-2"
                                >
                                    <Search className="w-5 h-5" />
                                    <span>Track Package</span>
                                </motion.button>

                                <p className="text-center text-xs text-white/40 font-body">
                                    Real-time tracking powered by GPS technology
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-xs uppercase tracking-wider text-white/40 mb-4 font-body">
                                    Quick Actions
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/ship"
                                        className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                                    >
                                        <Package className="w-4 h-4 text-gold-400" />
                                        <span className="text-sm text-white/80 group-hover:text-white font-body">
                                            Ship Package
                                        </span>
                                    </Link>
                                    <Link
                                        href="/services#rates"
                                        className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                                    >
                                        <MapPin className="w-4 h-4 text-gold-400" />
                                        <span className="text-sm text-white/80 group-hover:text-white font-body">
                                            Get Quote
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Plane Animation */}
                    <motion.div
                        className="absolute -top-10 -right-10 hidden lg:block"
                        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-amber-400/10 backdrop-blur-sm border border-gold-500/20 flex items-center justify-center">
                            <Plane className="w-10 h-10 text-gold-400" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-white/40 font-body">
                    Scroll
                </span>
                <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-gold-400"
                    />
                </div>
            </motion.div>
        </section>
    );
}
