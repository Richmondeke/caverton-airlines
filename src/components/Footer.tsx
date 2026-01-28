"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Package,
    Plane,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowRight,
} from "lucide-react";

const footerLinks = {
    services: [
        { name: "Express Delivery", href: "/services#express" },
        { name: "Air Freight", href: "/services#air" },
        { name: "Ground Transport", href: "/services#ground" },
        { name: "Ocean Freight", href: "/services#ocean" },
        { name: "Customs Clearance", href: "/services#customs" },
    ],
    company: [
        { name: "About Us", href: "/about" },
        { name: "Our Fleet", href: "/about#fleet" },
        { name: "Careers", href: "/about#careers" },
        { name: "Press", href: "/about#press" },
        { name: "Partners", href: "/about#partners" },
    ],
    support: [
        { name: "Track Package", href: "/track" },
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/contact#faq" },
        { name: "Shipping Rates", href: "/services#rates" },
        { name: "Locations", href: "/contact#locations" },
    ],
    legal: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Security", href: "/security" },
    ],
};

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
];

import { fadeInUp } from "@/lib/animations";

export default function Footer() {
    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative bg-navy-900 border-t border-white/5"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-navy-800/50 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Newsletter Section */}
                <div className="py-16 border-b border-white/10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                                Stay Updated
                            </h3>
                            <p className="text-white/60 font-body">
                                Subscribe for exclusive updates and premium shipping offers.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full sm:w-80 bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 px-8 py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(202,138,4,0.3)] transition-shadow"
                            >
                                Subscribe
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="relative w-48 h-14">
                                <Image
                                    src="/logo.png"
                                    alt="Caverton Helicopters"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm mb-6 font-body leading-relaxed">
                            The pinnacle of West African aviation logistics. Where luxury
                            meets logistics, and every shipment is handled with the utmost
                            care.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-display text-lg text-white mb-6">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-gold-400 transition-colors text-sm font-body"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-display text-lg text-white mb-6">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-gold-400 transition-colors text-sm font-body"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-display text-lg text-white mb-6">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-gold-400 transition-colors text-sm font-body"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="font-display text-lg text-white mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                                <span className="text-white/60 text-sm font-body">
                                    Murtala Muhammed Airport
                                    <br />
                                    Lagos, Nigeria
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                                <a
                                    href="tel:+2341234567890"
                                    className="text-white/60 hover:text-gold-400 transition-colors text-sm font-body"
                                >
                                    +234 1 234 5678
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                                <a
                                    href="mailto:cargo@caverton.com"
                                    className="text-white/60 hover:text-gold-400 transition-colors text-sm font-body"
                                >
                                    cargo@caverton.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-sm font-body">
                        © {new Date().getFullYear()} Cargofly — A Caverton Group Company. All
                        rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-white/40 hover:text-white/80 transition-colors text-sm font-body"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Plane */}
            <div className="absolute bottom-20 right-10 opacity-5 pointer-events-none hidden lg:block">
                <Plane className="w-64 h-64 text-gold-500" />
            </div>
        </motion.footer>
    );
}
