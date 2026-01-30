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
import { useRouter } from "next/navigation";
import PricingCalculator from "@/components/PricingCalculator";
import { cn } from "@/lib/utils";
import { createShipment, ShipmentAddress, ShipmentPackage } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { Timestamp } from "firebase/firestore";

type ViewMode = "quote" | "book";
type PaymentMethod = "card";

const steps = [
    { id: 1, title: "Package", icon: Package },
    { id: 2, title: "Sender", icon: User },
    { id: 3, title: "Recipient", icon: MapPin },
    { id: 4, title: "Payment", icon: CreditCard },
];

export default function ShipPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("quote");
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();
    const { user } = useAuth();
    const [isBooking, setIsBooking] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

    const handleBookShipment = async () => {
        if (!user) {
            router.push("/login?redirect=/ship");
            return;
        }

        setIsBooking(true);
        try {
            const now = new Date();
            const estimatedDelivery = new Date();
            estimatedDelivery.setDate(now.getDate() + 3);

            const trackingNumber = await createShipment({
                userId: user.uid,
                service: "express",
                sender: {
                    name: "John Sender",
                    street: "123 Sender St",
                    city: "Lagos",
                    state: "LA",
                    postalCode: "100001",
                    country: "Nigeria",
                    phone: "+234 800 000 0000"
                },
                recipient: {
                    name: "Jane Recipient",
                    street: "456 Recipient Rd",
                    city: "London",
                    state: "",
                    postalCode: "SW1A 1AA",
                    country: "United Kingdom",
                    phone: "+44 7000 000000"
                },
                package: {
                    weight: 5,
                    dimensions: { length: 30, width: 20, height: 15 },
                    description: "Electronics",
                    isFragile: true,
                    requiresSignature: true
                },
                price: {
                    base: 200,
                    fuel: 25,
                    insurance: 20,
                    total: 245,
                    currency: "USD"
                },
                estimatedDelivery: Timestamp.fromDate(estimatedDelivery),
                paymentStatus: "paid"
            });

            router.push(`/track?id=${trackingNumber}`);
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Failed to book shipment. Please try again.");
        } finally {
            setIsBooking(false);
        }
    };

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
                            <div className="flex justify-between items-center mb-12 relative px-4">
                                <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white/10 -z-10" />
                                <div
                                    className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-gold-500 to-amber-400 -z-10 transition-all duration-500"
                                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                                />
                                {steps.map((step) => (
                                    <div
                                        key={step.id}
                                        className={cn(
                                            "relative flex flex-col items-center gap-2",
                                            currentStep >= step.id ? "text-gold-400" : "text-white/30"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-navy-900",
                                                currentStep >= step.id
                                                    ? "border-gold-500 text-gold-500 shadow-[0_0_20px_rgba(202,138,4,0.3)]"
                                                    : "border-white/10 bg-navy-900"
                                            )}
                                        >
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider font-body bg-navy-900 px-2">
                                            {step.title}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Form Steps */}
                            <div className="glass-panel p-8 rounded-3xl min-h-[500px] flex flex-col justify-between">
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
                                            <div className="grid grid-cols-3 gap-4">
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
                                                <div className="col-span-2">
                                                    <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                        Dimensions (LxWxH cm)
                                                    </label>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="L"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="W"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="H"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-white/40 mb-2 font-body uppercase tracking-wider">
                                                    Contents Description
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Describe the items..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body resize-none"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 rounded border-white/20 bg-transparent text-gold-500 focus:ring-gold-500"
                                                    />
                                                    <span className="text-white font-body">Fragile Item</span>
                                                </label>
                                                <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 rounded border-white/20 bg-transparent text-gold-500 focus:ring-gold-500"
                                                    />
                                                    <span className="text-white font-body">Insurance (+ $20)</span>
                                                </label>
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
                                                        placeholder="+1 (555) 000-0000"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-all font-body"
                                                    />
                                                </div>
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
                                                <label className="block text-sm text-white/40 mb-4 font-body uppercase tracking-wider">
                                                    Payment Method
                                                </label>
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <button
                                                        onClick={() => setPaymentMethod("card")}
                                                        className={cn(
                                                            "p-4 rounded-xl border flex items-center justify-center gap-2 transition-all",
                                                            "bg-gold-500/10 border-gold-500/50 text-gold-400"
                                                        )}
                                                    >
                                                        <CreditCard className="w-5 h-5" />
                                                        <span className="font-bold uppercase tracking-wider text-sm">Card</span>
                                                    </button>
                                                </div>

                                                <div className="space-y-6">
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
                                                : handleBookShipment()
                                        }
                                        disabled={isBooking}
                                        className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(202,138,4,0.3)] transition-all"
                                    >
                                        {isBooking ? (
                                            <div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                {currentStep === 4 ? "Confirm Booking" : "Continue"}
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
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
