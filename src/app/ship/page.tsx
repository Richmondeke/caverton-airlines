"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Package,
    MapPin,
    User,
    CreditCard,
    Check,
    ArrowLeft,
    ArrowRight,
    Shield,
    Clock,
    Plane,
} from "lucide-react";
import PricingCalculator from "@/components/PricingCalculator";
import { cn } from "@/lib/utils";

type ViewMode = "quote" | "book";

const steps = [
    { id: 1, title: "Package", icon: Package },
    { id: 2, title: "Sender", icon: User },
    { id: 3, title: "Recipient", icon: MapPin },
    { id: 4, title: "Payment", icon: CreditCard },
];

export default function ShipPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("quote");
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <div className="min-h-screen pt-32 pb-24 bg-navy-900">
            {/* Background */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-black" />
            <div className="fixed inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 font-body">
                        Ship with Cargofly
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
                        Ship Your
                        <span className="block italic text-white/80">Package</span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto font-body">
                        Get an instant quote or book your shipment with our streamlined
                        process.
                    </p>
                </motion.div>

                {/* View Toggle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center mb-12"
                >
                    <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
                        <button
                            onClick={() => setViewMode("quote")}
                            className={cn(
                                "px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all font-body",
                                viewMode === "quote"
                                    ? "bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900"
                                    : "text-white/60 hover:text-white"
                            )}
                        >
                            Get a Quote
                        </button>
                        <button
                            onClick={() => setViewMode("book")}
                            className={cn(
                                "px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all font-body",
                                viewMode === "book"
                                    ? "bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900"
                                    : "text-white/60 hover:text-white"
                            )}
                        >
                            Book Shipment
                        </button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {viewMode === "quote" ? (
                        <motion.div
                            key="quote"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="max-w-3xl mx-auto"
                        >
                            <PricingCalculator />

                            {/* Trust Indicators */}
                            <div className="mt-8 grid grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <Shield className="w-5 h-5 text-gold-400 flex-shrink-0" />
                                    <span className="text-sm text-white/60 font-body">
                                        Fully Insured
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <Clock className="w-5 h-5 text-gold-400 flex-shrink-0" />
                                    <span className="text-sm text-white/60 font-body">
                                        On-Time Guarantee
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <Plane className="w-5 h-5 text-gold-400 flex-shrink-0" />
                                    <span className="text-sm text-white/60 font-body">
                                        200+ Countries
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="book"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto"
                        >
                            {/* Progress Steps */}
                            <div className="flex items-center justify-center mb-12">
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex items-center">
                                        <button
                                            onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                                            disabled={step.id > currentStep}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-2 rounded-xl transition-all",
                                                step.id === currentStep
                                                    ? "bg-gradient-to-r from-gold-500/20 to-amber-400/10 border border-gold-500/30"
                                                    : step.id < currentStep
                                                        ? "text-gold-400 cursor-pointer hover:bg-white/5"
                                                        : "text-white/30 cursor-not-allowed"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                                    step.id === currentStep
                                                        ? "bg-gradient-to-br from-gold-500 to-amber-400 text-navy-900"
                                                        : step.id < currentStep
                                                            ? "bg-gold-500/20 text-gold-400"
                                                            : "bg-white/5 text-white/30"
                                                )}
                                            >
                                                {step.id < currentStep ? (
                                                    <Check className="w-5 h-5" />
                                                ) : (
                                                    <step.icon className="w-5 h-5" />
                                                )}
                                            </div>
                                            <span
                                                className={cn(
                                                    "hidden sm:block text-sm font-medium font-body",
                                                    step.id === currentStep
                                                        ? "text-white"
                                                        : step.id < currentStep
                                                            ? "text-gold-400"
                                                            : "text-white/30"
                                                )}
                                            >
                                                {step.title}
                                            </span>
                                        </button>
                                        {index < steps.length - 1 && (
                                            <div
                                                className={cn(
                                                    "w-8 md:w-16 h-0.5 mx-2",
                                                    index < currentStep - 1
                                                        ? "bg-gold-500"
                                                        : "bg-white/10"
                                                )}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Form Content */}
                            <div className="glass-panel rounded-3xl p-8 md:p-10">
                                <AnimatePresence mode="wait">
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="font-display text-2xl text-white mb-6">
                                                Package Details
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Package Type
                                                    </label>
                                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-gold-500/50 transition-all font-body appearance-none cursor-pointer">
                                                        <option value="parcel">Parcel</option>
                                                        <option value="document">Document</option>
                                                        <option value="freight">Freight</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Weight (kg)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="0.0"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Length (cm)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="0"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Width (cm)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="0"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Height (cm)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="0"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                    Package Description
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Describe your package contents..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body resize-none"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="font-display text-2xl text-white mb-6">
                                                Sender Information
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="John Doe"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        placeholder="+234 801 234 5678"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                    Pickup Address
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    placeholder="Enter full pickup address..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body resize-none"
                                                />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Lagos"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Country
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nigeria"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="font-display text-2xl text-white mb-6">
                                                Recipient Information
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Jane Smith"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        placeholder="+44 20 1234 5678"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                    Delivery Address
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    placeholder="Enter full delivery address..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body resize-none"
                                                />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="London"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Country
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="United Kingdom"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="font-display text-2xl text-white mb-6">
                                                Review & Payment
                                            </h2>
                                            <div className="p-6 rounded-xl bg-gradient-to-br from-gold-500/10 to-amber-400/5 border border-gold-500/20">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-white/60 font-body">
                                                        Estimated Total
                                                    </span>
                                                    <span className="font-display text-3xl text-white">
                                                        $245.00
                                                    </span>
                                                </div>
                                                <p className="text-xs text-white/40 font-body">
                                                    Includes insurance, customs clearance, and tracking
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="123"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-gold-500 focus:ring-gold-500"
                                                />
                                                <label
                                                    htmlFor="terms"
                                                    className="text-sm text-white/60 font-body"
                                                >
                                                    I agree to the{" "}
                                                    <a href="/terms" className="text-gold-400 hover:text-gold-300">
                                                        Terms of Service
                                                    </a>{" "}
                                                    and{" "}
                                                    <a href="/privacy" className="text-gold-400 hover:text-gold-300">
                                                        Privacy Policy
                                                    </a>
                                                </label>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Navigation */}
                                <div className="flex justify-between mt-8 pt-8 border-t border-white/10">
                                    <button
                                        onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                                        disabled={currentStep === 1}
                                        className={cn(
                                            "flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-body",
                                            currentStep === 1
                                                ? "text-white/30 cursor-not-allowed"
                                                : "text-white/60 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() =>
                                            currentStep < 4
                                                ? setCurrentStep((prev) => prev + 1)
                                                : alert("Booking confirmed!")
                                        }
                                        className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(202,138,4,0.3)] transition-all"
                                    >
                                        {currentStep === 4 ? "Confirm Booking" : "Continue"}
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
