"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Package, Plane, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

import { slideDown } from "@/lib/animations";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        handleScroll(); // Check on mount
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
                    ? "bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border-navy-900/5 dark:border-white/5 py-4 shadow-lg"
                    : "bg-transparent py-4 md:py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                {/* Logo */}
                <Link href="/" className="relative z-50 flex items-center gap-2 group">
                    <div className="relative w-32 md:w-40 h-10 md:h-12">
                        {/* Dark Mode Logo (White) - Visible when dark OR when transparent navbar on dark hero (default) */}
                        <Image
                            src="/logo-dark.png"
                            alt="Caverton Helicopters"
                            fill
                            className={cn(
                                "object-contain transition-opacity duration-300",
                                // Hide this white logo ONLY when we are in light mode AND scrolled (white navbar)
                                // If not scrolled in light mode, Hero is still light text on dark bg? 
                                // WAIT: The hero changes to light mode too.
                                // Logic:
                                // Dark Mode: Always White Logo
                                // Light Mode + Scrolled (White bg): Blue Logo
                                // Light Mode + Top (Transparent bg on Light Image): Blue or White? 
                                // Looking at Hero.tsx, Light Mode bg is white/gray. So we need BLUE logo always in Light Mode.
                                theme === "light" ? "opacity-0" : "opacity-100"
                            )}
                            priority
                        />
                        {/* Light Mode Logo (Blue) - Visible when light */}
                        <Image
                            src="/logo-light.png"
                            alt="Caverton Helicopters"
                            fill
                            className={cn(
                                "object-contain transition-opacity duration-300 absolute inset-0",
                                theme === "light" ? "opacity-100" : "opacity-0"
                            )}
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
                                        isActive
                                            ? "text-gold-500 dark:text-gold-400"
                                            : "text-navy-900/70 dark:text-white/70 hover:text-navy-900 dark:hover:text-white"
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

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors text-navy-900 dark:text-white"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <Link
                            href="/login"
                            className="text-sm font-body text-navy-900/60 dark:text-white/60 hover:text-navy-900 dark:hover:text-white transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>

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

                {/* Mobile Menu Button - Moved right */}
                <div className="flex items-center gap-4 md:hidden">
                    {/* Mobile Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-navy-900 dark:text-white"
                    >
                        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    <button
                        className="z-50 text-navy-900 dark:text-white p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Nav Overlay */}
                <motion.div
                    initial={false}
                    animate={isOpen ? { opacity: 1, visibility: "visible" } : { opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-white/98 dark:bg-navy-900/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-8 md:hidden"
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
                                className="font-display text-4xl text-navy-900 dark:text-white hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
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
