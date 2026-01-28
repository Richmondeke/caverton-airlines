"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    User,
    Building2,
    ArrowRight,
    Package,
    Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

export default function RegisterPage() {
    const [accountType, setAccountType] = useState<"personal" | "business">(
        "personal"
    );
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        // Handle registration logic
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-24 px-6 bg-navy-900">
            {/* Background */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-black" />
            <div className="fixed inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative z-10 w-full max-w-lg"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-amber-400 flex items-center justify-center">
                            <Package className="w-6 h-6 text-navy-900" />
                        </div>
                        <div className="text-left">
                            <span className="font-display text-xl font-semibold text-white block">
                                Cargo<span className="text-gold-400">fly</span>
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-body">
                                Caverton Cargo
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="glass-panel rounded-3xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="font-display text-2xl text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-white/40 font-body text-sm">
                            Join thousands of businesses shipping smarter
                        </p>
                    </div>

                    {/* Account Type Toggle */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl border border-white/10 mb-8">
                        <button
                            onClick={() => setAccountType("personal")}
                            className={cn(
                                "flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all font-body",
                                accountType === "personal"
                                    ? "bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 shadow-lg shadow-gold-500/10"
                                    : "text-white/60 hover:text-white"
                            )}
                        >
                            <User className="w-4 h-4" />
                            Personal
                        </button>
                        <button
                            onClick={() => setAccountType("business")}
                            className={cn(
                                "flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all font-body",
                                accountType === "business"
                                    ? "bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 shadow-lg shadow-gold-500/10"
                                    : "text-white/60 hover:text-white"
                            )}
                        >
                            <Building2 className="w-4 h-4" />
                            Business
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                    First Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="John"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                    />
                                </div>
                            </div>
                        </div>

                        {accountType === "business" && (
                            <div>
                                <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                    Company Name
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Acme Inc."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Create a strong password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {[
                                    "At least 8 characters",
                                    "One uppercase letter",
                                    "One number",
                                    "One special character",
                                ].map((req, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-white/40 font-body">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                        {req}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                required
                                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-gold-500 focus:ring-gold-500"
                            />
                            <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors font-body">
                                I agree to the{" "}
                                <Link href="/terms" className="text-gold-400 hover:text-gold-300">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-gold-400 hover:text-gold-300">
                                    Privacy Policy
                                </Link>
                            </span>
                        </label>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                                isLoading
                                    ? "opacity-70 cursor-not-allowed"
                                    : "hover:shadow-[0_0_30px_rgba(202,138,4,0.3)]"
                            )}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-8">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-navy-900 px-4 text-white/40 font-body tracking-wider">
                                    Or register with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all font-body">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all font-body">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub
                            </button>
                        </div>
                    </div>

                    <p className="text-center mt-8 text-white/40 font-body">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-gold-400 hover:text-gold-300 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
