"use client";

import Link from "next/link";
import { CodeRain } from "@/components/code-rain";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { ExpertiseSection } from "@/components/expertise-section";
import { TypingHero } from "@/components/typing-hero";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ServicesViewportSection } from "@/components/services-viewport-section";
import dynamic from "next/dynamic"
const DottedSurface = dynamic(() => import("@/components/dotted-surface"), { ssr: false })
import { Highlight } from "@/components/ui/hero-highlight";

export default function HomeClient() {
  return (
    <main className="relative min-h-screen bg-black text-foreground overflow-x-hidden">
      {/* Content container */}
      <div className="relative z-10">
        <NavBar />
        <ProfileDropdown />

        {/* Hero section with better contrast */}
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Animated Dotted Surface Background */}
          <div className="absolute inset-0 z-0">
            <DottedSurface />
          </div>
          {/* Radial vignette for text contrast over the dots */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.7)_100%)]" />
          <div className="relative z-1 text-center space-y-6">
            {/* Accent tagline - above the headline */}
            <motion.div
              className="relative z-10 mt-16 inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm text-blue-400 font-semibold">
                Building The Intelligence That Shapes The Future
              </p>
            </motion.div>

            {/* Enhanced hero with better contrast */}
            <div className="relative">
              <div className="relative z-10">
                <TypingHero />
              </div>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-8"></div>

            {/* Enhanced description with better contrast */}
            <motion.div
              className="relative space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Main value proposition - bigger and bolder */}
              <p className="relative z-10 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
                Transforming <Highlight delay={1.5}>ideas</Highlight> into
                powerful <Highlight delay={2.0}>digital solutions</Highlight>{" "}
                that drive growth and innovation for{" "}
                <Highlight delay={2.5}>forward-thinking</Highlight> businesses.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Expertise section */}
        <ExpertiseSection />

        {/* Services viewport section */}
        <ServicesViewportSection />

        {/* Terminal CTA section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-12 xl:px-20 relative bg-black">
          <TerminalCTA />
        </section>

        <Footer />
      </div>
    </main>
  );
}

function TerminalCTA() {
  return (
    <div className="relative max-w-5xl mx-auto text-center">
      {/* Ambient glow blobs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-purple-500/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-3xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative space-y-8"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-sm font-medium tracking-[0.2em] uppercase text-emerald-400/70"
        >
          Let's build something great
        </motion.p>

        {/* Big headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
        >
          Ready to{" "}
          <span className="relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              innovate?
            </span>
            {/* Underline glow */}
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed"
        >
          Transform your vision into reality. One conversation is all it takes to get started.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/consultation"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-gray-100 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
          >
            <Zap className="w-4 h-4" />
            Start a Project
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white hover:border-white/30 hover:bg-white/5 transition-all text-base"
          >
            Explore Services
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
