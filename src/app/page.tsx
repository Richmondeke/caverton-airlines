"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Plane,
  Truck,
  Globe,
  Package,
  Shield,
  Clock,
  MapPin,
  Zap,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import FeatureGrid from "@/components/FeatureGrid";
import Testimonials from "@/components/Testimonials";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  staggerContainer,
  fadeInUp,
  fadeInLeft,
  scaleIn,
  textReveal
} from "@/lib/animations";

const services = [
  {
    icon: <Plane className="w-6 h-6" />,
    title: "Express Air Freight",
    description:
      "Priority air cargo with guaranteed delivery times. Perfect for time-sensitive shipments across continents.",
    features: [
      "Next-day delivery available",
      "Real-time GPS tracking",
      "Customs clearance included",
      "Temperature-controlled options",
    ],
    href: "/services#express",
    featured: true,
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Ground Transport",
    description:
      "Reliable overland shipping across West Africa with comprehensive regional coverage.",
    features: [
      "Door-to-door delivery",
      "Flexible scheduling",
      "Bulk shipment options",
      "24/7 support",
    ],
    href: "/services#ground",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "International Cargo",
    description:
      "Global reach with local expertise. We handle customs, documentation, and last-mile delivery.",
    features: [
      "200+ countries served",
      "Multi-modal solutions",
      "Duty & tax handling",
      "Insurance included",
    ],
    href: "/services#international",
  },
];

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Handling",
    description:
      "State-of-the-art security protocols and tamper-evident tracking for your peace of mind.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "On-Time Guarantee",
    description:
      "99% on-time delivery rate. When we commit to a timeline, we deliver.",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Real-Time Tracking",
    description:
      "GPS-powered tracking with live updates at every stage of your shipment's journey.",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: "24/7 Concierge",
    description:
      "Dedicated account managers available around the clock for premium clients.",
    span: "wide" as const,
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Quotes",
    description:
      "Get accurate pricing in seconds. No hidden fees, no surprises.",
  },
];

const steps = [
  {
    number: "01",
    title: "Request a Quote",
    description:
      "Enter your shipment details and receive instant, transparent pricing.",
  },
  {
    number: "02",
    title: "Schedule Pickup",
    description:
      "Choose your preferred pickup time. We'll handle the rest.",
  },
  {
    number: "03",
    title: "Track & Receive",
    description:
      "Monitor your shipment in real-time until safe delivery.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="relative py-32 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-800/50 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 font-body">
              Our Services
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Premium Shipping
              <span className="block italic text-white/80">Solutions</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto font-body">
              From express air freight to comprehensive ground transport, we
              offer tailored logistics solutions for the discerning.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-gradient-to-b from-navy-900 to-black border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedCounter value={200} suffix="+" label="Countries Served" />
            <AnimatedCounter value={1000000} suffix="+" label="Shipments Delivered" />
            <AnimatedCounter value={99} suffix="%" label="On-Time Delivery" />
            <AnimatedCounter value={15} suffix=" Yrs" label="Industry Experience" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-navy-800/30 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 font-body">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Built for
              <span className="block italic text-white/80">Excellence</span>
            </h2>
          </motion.div>

          <FeatureGrid features={features} />
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-32 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cargo-hangar.png"
            alt="Cargo operations"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInLeft}>
                <span className="inline-block py-1 px-3 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 font-body">
                  How It Works
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                  Shipping Made
                  <span className="block italic text-white/80">Simple</span>
                </h2>
                <p className="text-white/60 mb-12 font-body leading-relaxed">
                  Three simple steps to get your cargo where it needs to be. Our
                  streamlined process ensures efficiency without compromising on
                  quality.
                </p>
              </motion.div>

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInLeft}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500/20 to-amber-400/10 border border-gold-500/30 flex items-center justify-center font-display text-2xl text-gold-400 group-hover:from-gold-500/30 group-hover:to-amber-400/20 transition-all">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-white/60 font-body">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={fadeInUp}
                className="mt-12"
              >
                <Link href="/ship">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 rounded-xl font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(202,138,4,0.3)] transition-all"
                  >
                    Start Shipping
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="hidden lg:block relative"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/ground-crew.png"
                  alt="Premium cargo operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 right-8 glass-panel rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-amber-400 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-navy-900" />
                    </div>
                    <div>
                      <p className="font-display text-lg text-white">
                        Trusted by Industry Leaders
                      </p>
                      <p className="text-white/60 text-sm font-body">
                        500+ enterprise clients worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-32 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 font-body">
              Testimonials
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Trusted by
              <span className="block italic text-white/80">Industry Leaders</span>
            </h2>
          </motion.div>

          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 via-navy-900 to-black" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-6xl text-white mb-6">
                Ready to Ship?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/60 text-lg font-body mb-10">
                Experience the pinnacle of West African aviation logistics. Get
                started with a quote today.
              </motion.p>
              <motion.div variants={scaleIn} className="flex flex-wrap justify-center gap-4">
                <Link href="/ship">
                  <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-gold-500 to-amber-400 text-navy-900 rounded-xl font-bold uppercase tracking-wider hover:shadow-[0_0_40px_rgba(202,138,4,0.4)] transition-all"
                  >
                    Get a Quote
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-2 px-10 py-5 border border-white/20 text-white rounded-xl font-medium uppercase tracking-wider hover:border-gold-500/50 hover:text-gold-400 transition-all"
                  >
                    Contact Sales
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
