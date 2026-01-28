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
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
    const { signUp } = useAuth();
    const [accountType, setAccountType] = useState<"personal" | "business">("personal");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await signUp(email, password, name);
            // Redirect will be handled by auth state change or router push if needed
            window.location.href = "/ship";
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
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

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-body"
                            role="alert"
                        >
                            {error}
                        </motion.div>
                    )}

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
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    autoComplete="new-password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex items-center h-5">
                                    <div className="w-5 h-5 rounded border border-white/20 bg-white/5 flex items-center justify-center text-gold-500">
                                        <Check className="w-3 h-3" />
                                    </div>
                                </div>
                                <div className="text-sm text-white/60 font-body">
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-gold-400 hover:text-gold-300">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-gold-400 hover:text-gold-300">
                                        Privacy Policy
                                    </Link>
                                </div>
                            </div>
                        </div>

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

                    {/* Login Link */}
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
