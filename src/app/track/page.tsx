"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Package,
    MapPin,
    Clock,
    CheckCircle2,
    Copy,
    Check,
    Plane,
    Info,
} from "lucide-react";
import TrackingWidget from "@/components/TrackingWidget";
import TrackingTimeline, {
    sampleTrackingEvents,
} from "@/components/TrackingTimeline";
import { cn } from "@/lib/utils";

function TrackPageContent() {
    const searchParams = useSearchParams();
    const [trackingId, setTrackingId] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const id = searchParams.get("id");
        if (id) {
            setTrackingId(id);
        }
    }, [searchParams]);

    const handleCopy = async () => {
        if (trackingId) {
            await navigator.clipboard.writeText(trackingId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const packageInfo = {
        status: "Out for Delivery",
        estimatedDelivery: "Today, 6:00 PM",
        destination: "London, United Kingdom",
        origin: "Lagos, Nigeria",
        service: "Express Air Freight",
        weight: "2.5 kg",
        dimensions: "30 × 20 × 15 cm",
        transitTime: "2 days",
        progress: 83,
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
                        Track Shipment
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
                        Track Your
                        <span className="block italic text-white/80">Package</span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto font-body">
                        Enter your tracking number to get real-time updates on your shipment&apos;s
                        location and status.
                    </p>
                </motion.div>

                {/* Tracking Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto mb-16"
                >
                    <TrackingWidget
                        variant="page"
                        onTrack={(id) => setTrackingId(id)}
                    />
                </motion.div>

                {/* Results */}
                {trackingId ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid lg:grid-cols-3 gap-8"
                    >
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Status Card */}
                            <div className="glass-panel rounded-2xl p-8">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <p className="text-white/40 text-sm font-body">
                                                Tracking Number
                                            </p>
                                            <button
                                                onClick={handleCopy}
                                                className="text-white/40 hover:text-gold-400 transition-colors"
                                                aria-label={copied ? "Copied" : "Copy tracking number"}
                                            >
                                                {copied ? (
                                                    <Check className="w-4 h-4 text-green-400" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                        <p className="font-mono text-xl text-white">{trackingId}</p>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-gold-500/20 text-gold-400 text-sm font-bold uppercase tracking-wider">
                                        {packageInfo.status}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-8">
                                    <div className="flex justify-between text-sm text-white/40 mb-2 font-body">
                                        <span>Progress</span>
                                        <span>{packageInfo.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${packageInfo.progress}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-gold-500 to-amber-400 rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <Clock className="w-5 h-5 text-gold-400 mb-2" />
                                        <p className="text-xs text-white/40 font-body uppercase tracking-wider mb-1">
                                            Est. Delivery
                                        </p>
                                        <p className="text-white font-medium font-body">
                                            {packageInfo.estimatedDelivery}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <MapPin className="w-5 h-5 text-gold-400 mb-2" />
                                        <p className="text-xs text-white/40 font-body uppercase tracking-wider mb-1">
                                            Destination
                                        </p>
                                        <p className="text-white font-medium font-body">
                                            {packageInfo.destination}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <Plane className="w-5 h-5 text-gold-400 mb-2" />
                                        <p className="text-xs text-white/40 font-body uppercase tracking-wider mb-1">
                                            Service
                                        </p>
                                        <p className="text-white font-medium font-body">
                                            {packageInfo.service}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <CheckCircle2 className="w-5 h-5 text-gold-400 mb-2" />
                                        <p className="text-xs text-white/40 font-body uppercase tracking-wider mb-1">
                                            Transit Time
                                        </p>
                                        <p className="text-white font-medium font-body">
                                            {packageInfo.transitTime}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="glass-panel rounded-2xl p-8">
                                <h2 className="font-display text-2xl text-white mb-8">
                                    Shipment Timeline
                                </h2>
                                <TrackingTimeline
                                    events={sampleTrackingEvents}
                                    currentStatus="Out for Delivery"
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Package Details */}
                            <div className="glass-panel rounded-2xl p-6">
                                <h3 className="font-display text-lg text-white mb-6">
                                    Package Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-white/40 font-body">Weight</span>
                                        <span className="text-white font-body">
                                            {packageInfo.weight}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/40 font-body">Dimensions</span>
                                        <span className="text-white font-body">
                                            {packageInfo.dimensions}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/40 font-body">Origin</span>
                                        <span className="text-white font-body">
                                            {packageInfo.origin}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/40 font-body">Destination</span>
                                        <span className="text-white font-body">
                                            {packageInfo.destination}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Help Card */}
                            <div className="glass-panel rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                                        <Info className="w-5 h-5 text-gold-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-display text-white mb-2">
                                            Need Help?
                                        </h4>
                                        <p className="text-white/60 text-sm font-body mb-4">
                                            Our concierge team is available 24/7 for premium support.
                                        </p>
                                        <a
                                            href="/contact"
                                            className="text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors font-body"
                                        >
                                            Contact Support →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
                            <Package className="w-12 h-12 text-white/20" />
                        </div>
                        <h3 className="font-display text-2xl text-white mb-3">
                            No Tracking Number Entered
                        </h3>
                        <p className="text-white/40 max-w-md mx-auto font-body">
                            Enter your tracking number above to view your shipment&apos;s status
                            and real-time location updates.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function TrackPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-navy-900">
                    <div className="animate-pulse text-white font-body">Loading...</div>
                </div>
            }
        >
            <TrackPageContent />
        </Suspense>
    );
}
