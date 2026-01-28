"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Package, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

import { slideDown } from "@/lib/animations";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();

    const navLinks = [
        { name: "Track", href: "/track" },
        { name: "Ship", href: "/ship" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={slideDown}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
                scrolled
                    ? "bg-navy-900/80 backdrop-blur-xl border-white/5 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-50 flex items-center gap-2 group">
                    <div className="relative w-40 h-12">
                        <Image
                            src="/logo.png"
                            alt="Caverton Helicopters"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => {
                            const isActive =
                                pathname === link.href ||
                                (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-body font-medium tracking-wide transition-colors uppercase relative py-2",
                                        isActive ? "text-white" : "text-white/60 hover:text-gold-400"
                                    )}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500 shadow-[0_0_10px_rgba(202,138,4,0.5)]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <Link
                        href="/login"
                        className="text-sm font-body text-white/60 hover:text-white transition-colors"
                    >
                        Sign In
                    </Link>

                    <Link href="/ship">
                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative overflow-hidden group bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 px-6 py-2.5 rounded-full font-body font-bold text-xs uppercase tracking-wider transition-all hover:shadow-[0_0_30px_rgba(202,138,4,0.4)]"
                        >
                            <span className="relative z-10">Ship Now</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Nav Overlay */}
                <motion.div
                    initial={false}
                    animate={isOpen ? { opacity: 1, visibility: "visible" } : { opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-navy-900/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-8 md:hidden"
                >
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-display text-4xl text-white hover:text-gold-400 transition-colors"
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            href="/ship"
                            onClick={() => setIsOpen(false)}
                            className="mt-8 bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 px-8 py-4 rounded-full font-bold uppercase tracking-wider"
                        >
                            Ship Now
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.nav>
    );
}
