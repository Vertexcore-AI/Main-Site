"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Globe, Smartphone, Laptop, ArrowRight,
  Rocket, Target, Gauge, Users, Zap, Lock,
  Cog, Database, Cloud,
} from "lucide-react"

type Feature = { icon: React.ReactNode; text: string }
type Stat    = { label: string; value: string }
type Tech    = { name: string; logo: string }
type Service = {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  features: Feature[]
  stats: Stat[]
  technologies: Tech[]
  image: string
  accentColor: string
  ring: string
  glow: string
}

const services: Service[] = [
  {
    id: "website",
    title: "Website Development",
    subtitle: "Web Experiences",
    description:
      "Transform your digital presence with cutting-edge websites that convert visitors into customers. Built with the latest technologies for maximum performance and user experience.",
    icon: <Globe className="w-5 h-5" />,
    features: [
      { icon: <Rocket className="w-5 h-5" />, text: "Lightning-fast loading speeds" },
      { icon: <Target className="w-5 h-5" />, text: "Conversion-optimized design" },
      { icon: <Gauge className="w-5 h-5" />,  text: "99.9% uptime guarantee" },
    ],
    stats: [
      { label: "Average Speed Increase", value: "340%" },
      { label: "Conversion Rate Boost",  value: "127%" },
      { label: "Client Satisfaction",    value: "98%"  },
    ],
    technologies: [
      { name: "React",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Bootstrap",   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Tailwind CSS",logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
    image: "/images/web_1.mp4",
    accentColor: "text-cyan-300",
    ring: "border-cyan-400/30",
    glow: "rgba(56,189,248,0.18)",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    subtitle: "Native & Cross-Platform",
    description:
      "Create powerful mobile experiences that engage users and drive business growth. From concept to app store, we deliver apps that users love and businesses depend on.",
    icon: <Smartphone className="w-5 h-5" />,
    features: [
      { icon: <Users className="w-5 h-5" />, text: "Cross-platform compatibility" },
      { icon: <Zap   className="w-5 h-5" />, text: "Real-time synchronization" },
      { icon: <Lock  className="w-5 h-5" />, text: "Advanced security features" },
    ],
    stats: [
      { label: "App Store Rating",   value: "4.8★"      },
      { label: "User Retention",     value: "85%"        },
      { label: "Development Speed",  value: "2x Faster"  },
    ],
    technologies: [
      { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Swift",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    ],
    image: "/images/Mobile.png",
    accentColor: "text-purple-300",
    ring: "border-purple-400/30",
    glow: "rgba(192,132,252,0.18)",
  },
  {
    id: "digital",
    title: "Digital Systems",
    subtitle: "Automation & Integration",
    description:
      "Streamline your operations with intelligent digital systems that automate workflows, integrate seamlessly, and scale with your business growth.",
    icon: <Laptop className="w-5 h-5" />,
    features: [
      { icon: <Cog      className="w-5 h-5" />, text: "Workflow automation" },
      { icon: <Database className="w-5 h-5" />, text: "Data integration" },
      { icon: <Cloud    className="w-5 h-5" />, text: "Cloud-native architecture" },
    ],
    stats: [
      { label: "Efficiency Increase", value: "250%" },
      { label: "Cost Reduction",      value: "60%"  },
      { label: "Error Reduction",     value: "95%"  },
    ],
    technologies: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    ],
    image: "/images/POS.png",
    accentColor: "text-emerald-300",
    ring: "border-emerald-400/30",
    glow: "rgba(45,212,191,0.18)",
  },
]

export function ServicesShowcase() {
  const router = useRouter()
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const reduceMotion = !mounted || !!prefersReduced

  return (
    <div className="space-y-32">
      {services.map((service, i) => {
        const isLast  = i === services.length - 1
        const imgLeft = i % 2 === 1

        return (
          <motion.div
            key={service.id}
            initial={reduceMotion ? false : { opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* ── Image side ── */}
            <div className={imgLeft ? "lg:order-1" : "lg:order-2"}>
              <ServiceImage service={service} reduceMotion={!!reduceMotion} />
            </div>

            {/* ── Text side ── */}
            <div className={`space-y-7 ${imgLeft ? "lg:order-2" : "lg:order-1"}`}>
              {/* Accent pill */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${service.ring} bg-white/[0.04] backdrop-blur-sm`}>
                <span className={service.accentColor}>{service.icon}</span>
                <span className="text-sm font-medium text-gray-300">{service.subtitle}</span>
              </div>

              <h3 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                {service.title}
              </h3>

              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-4">
                {service.features.map((f, fi) => (
                  <motion.div
                    key={fi}
                    initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: fi * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span className={service.accentColor}>{f.icon}</span>
                    <span className="text-gray-300">{f.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 max-w-xl">
                {service.stats.map((s, si) => (
                  <motion.div
                    key={si}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.08, duration: 0.4 }}
                    className="text-center p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">{s.value}</div>
                    <div className="text-[11px] leading-tight text-gray-400">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2.5 max-w-xl">
                {service.technologies.map((t, ti) => (
                  <motion.div
                    key={ti}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ti * 0.05, duration: 0.3 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 hover:border-white/25 transition-colors"
                  >
                    <img src={t.logo} alt={t.name} className="w-5 h-5 object-contain"
                      onError={(e) => { e.currentTarget.style.display = "none" }} />
                    <span className="text-sm text-gray-300 font-medium">{t.name}</span>
                  </motion.div>
                ))}
              </div>

              {isLast && (
                <motion.button
                  onClick={() => router.push("/projects")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-3 px-6 py-3 mt-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-colors cursor-pointer"
                >
                  <span className="text-white font-medium">View Our Projects</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function ServiceImage({ service, reduceMotion }: { service: Service; reduceMotion: boolean }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative"
    >
      {/* Glow */}
      <div
        className="absolute inset-6 rounded-3xl blur-3xl pointer-events-none"
        style={{ backgroundColor: service.glow }}
      />

      {/* Glass frame */}
      <div className={`relative rounded-3xl border ${service.ring} bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl`}>
        {/* Top bar dots */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        </div>

        {/* Image or Video */}
        <motion.div
          animate={reduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full aspect-[4/3]"
        >
          {service.image.endsWith(".mp4") ? (
            <video
              src={service.image}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
