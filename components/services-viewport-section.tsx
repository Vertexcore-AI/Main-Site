"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import Carousel3D from "@/components/carousel-3d"
import {
  Globe,
  Smartphone,
  Cog,
  Package,
  Building2,
  Laptop,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Award,
  Zap,
  Rocket,
  Target,
  Lightbulb,
  Database,
  Cloud,
  Lock,
  Gauge,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    id: "website",
    title: "Website Development",

    description:
      "Transform your digital presence with cutting-edge websites that convert visitors into customers. Built with the latest technologies for maximum performance and user experience.",
    icon: <Globe className="w-8 h-8" />,
    features: [
      { icon: <Rocket className="w-5 h-5" />, text: "Lightning-fast loading speeds" },

      { icon: <Target className="w-5 h-5" />, text: "Conversion-optimized design" },
      { icon: <Gauge className="w-5 h-5" />, text: "99.9% uptime guarantee" },
    ],
    stats: [
      { label: "Average Speed Increase", value: "340%" },
      { label: "Conversion Rate Boost", value: "127%" },
      { label: "Client Satisfaction", value: "98%" },
    ],
    technologies: [
     
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
    gradient: "from-blue-500 via-cyan-400 to-blue-600",
    bgGradient: "from-blue-500/20 via-cyan-400/10 to-blue-600/20",
    accentColor: "text-blue-400",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    subtitle: "Native & Cross-Platform",
    description:
      "Create powerful mobile experiences that engage users and drive business growth. From concept to app store, we deliver apps that users love and businesses depend on.",
    icon: <Smartphone className="w-8 h-8" />,
    features: [
      { icon: <Users className="w-5 h-5" />, text: "Cross-platform compatibility" },
      { icon: <Zap className="w-5 h-5" />, text: "Real-time synchronization" },
      { icon: <Lock className="w-5 h-5" />, text: "Advanced security features" },
    ],
    stats: [
      { label: "App Store Rating", value: "4.8★" },
      { label: "User Retention", value: "85%" },
      { label: "Development Speed", value: "2x Faster" },
    ],
    technologies: [
      { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
      { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ],
    gradient: "from-purple-500 via-pink-400 to-purple-600",
    bgGradient: "from-purple-500/20 via-pink-400/10 to-purple-600/20",
    accentColor: "text-purple-400",
  },
  {
    id: "digital",
    title: "Digital Systems",
    subtitle: "Automation & Integration",
    description:
      "Streamline your operations with intelligent digital systems that automate workflows, integrate seamlessly, and scale with your business growth.",
    icon: <Laptop className="w-8 h-8" />,
    features: [
      { icon: <Cog className="w-5 h-5" />, text: "Workflow automation" },
      { icon: <Database className="w-5 h-5" />, text: "Data integration" },
      { icon: <Cloud className="w-5 h-5" />, text: "Cloud-native architecture" },
    ],
    stats: [
      { label: "Efficiency Increase", value: "250%" },
      { label: "Cost Reduction", value: "60%" },
      { label: "Error Reduction", value: "95%" },
    ],
    technologies: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    ],
    gradient: "from-emerald-500 via-teal-400 to-emerald-600",
    bgGradient: "from-emerald-500/20 via-teal-400/10 to-emerald-600/20",
    accentColor: "text-emerald-400",
  },
  // {
  //   id: "mechanical",
  //   title: "Mechanical Engineering",
  //   subtitle: "Design & Prototyping",
  //   description:
  //     "Bring your physical products to life with precision engineering, rapid prototyping, and manufacturing-ready designs that meet the highest industry standards.",
  //   icon: <Cog className="w-8 h-8" />,
  //   features: [
  //     { icon: <Lightbulb className="w-5 h-5" />, text: "Innovative design solutions" },
  //     { icon: <Code className="w-5 h-5" />, text: "CAD modeling & simulation" },
  //     { icon: <Package className="w-5 h-5" />, text: "Rapid prototyping" },
  //     { icon: <Award className="w-5 h-5" />, text: "Quality assurance" },
  //   ],
  //   stats: [
  //     { label: "Design Accuracy", value: "99.7%" },
  //     { label: "Time to Prototype", value: "72hrs" },
  //     { label: "Manufacturing Ready", value: "100%" },
  //   ],
  //   technologies: [
  //     { name: "SolidWorks", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidworks/solidworks-original.svg" },
  //     { name: "AutoCAD", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/autocad/autocad-original.svg" },
  //     { name: "ANSYS", logo: "https://www.ansys.com/-/media/project/ansys/ansys/global/logo/ansys-logo.svg" },
  //     { name: "3D Printing", logo: "https://cdn-icons-png.flaticon.com/512/3048/3048378.png" },
  //     { name: "CNC", logo: "https://cdn-icons-png.flaticon.com/512/2331/2331903.png" },
  //   ],
  //   gradient: "from-orange-500 via-red-400 to-orange-600",
  //   bgGradient: "from-orange-500/20 via-red-400/10 to-orange-600/20",
  //   accentColor: "text-orange-400",
  // },
  // {
  //   id: "product",
  //   title: "Product Development",
  //   subtitle: "From Idea to Market",
  //   description:
  //     "Transform innovative ideas into market-ready products with our comprehensive development process, from initial concept through successful launch.",
  //   icon: <Package className="w-8 h-8" />,
  //   features: [
  //     { icon: <Target className="w-5 h-5" />, text: "Market research & validation" },
  //     { icon: <Rocket className="w-5 h-5" />, text: "MVP development" },
  //     { icon: <TrendingUp className="w-5 h-5" />, text: "Go-to-market strategy" },
  //     { icon: <Star className="w-5 h-5" />, text: "Post-launch optimization" },
  //   ],
  //   stats: [
  //     { label: "Success Rate", value: "92%" },
  //     { label: "Time to Market", value: "40% Faster" },
  //     { label: "ROI Average", value: "3.2x" },
  //   ],
  //   technologies: [
  //     { name: "Lean Startup", logo: "https://cdn-icons-png.flaticon.com/512/3281/3281289.png" },
  //     { name: "Agile", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968853.png" },
  //     { name: "Design Thinking", logo: "https://cdn-icons-png.flaticon.com/512/3094/3094840.png" },
  //     { name: "Analytics", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googleanalytics/googleanalytics-original.svg" },
  //     { name: "A/B Testing", logo: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png" },
  //   ],
  //   gradient: "from-indigo-500 via-purple-400 to-indigo-600",
  //   bgGradient: "from-indigo-500/20 via-purple-400/10 to-indigo-600/20",
  //   accentColor: "text-indigo-400",
  // },
  // {
  //   id: "architecture",
  //   title: "Architecture Design",
  //   subtitle: "Spaces That Inspire",
  //   description:
  //     "Create stunning architectural designs that blend functionality with aesthetics, delivering spaces that inspire and environments that enhance human experience.",
  //   icon: <Building2 className="w-8 h-8" />,
  //   features: [
  //     { icon: <Lightbulb className="w-5 h-5" />, text: "Sustainable design principles" },
  //     { icon: <Layers className="w-5 h-5" />, text: "3D visualization & VR" },
  //     { icon: <Shield className="w-5 h-5" />, text: "Building code compliance" },
  //     { icon: <Award className="w-5 h-5" />, text: "Award-winning designs" },
  //   ],
  //   stats: [
  //     { label: "Projects Completed", value: "150+" },
  //     { label: "Client Satisfaction", value: "96%" },
  //     { label: "On-Time Delivery", value: "98%" },
  //   ],
  //   technologies: [
  //     { name: "AutoCAD", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/autocad/autocad-original.svg" },
  //     { name: "Revit", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/revit/revit-original.svg" },
  //     { name: "SketchUp", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketchup/sketchup-original.svg" },
  //     { name: "3ds Max", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/3dsmax/3dsmax-original.svg" },
  //     { name: "Lumion", logo: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png" },
  //   ],
  //   gradient: "from-pink-500 via-rose-400 to-pink-600",
  //   bgGradient: "from-pink-500/20 via-rose-400/10 to-pink-600/20",
  //   accentColor: "text-pink-400",
  // },
]

export function ServicesViewportSection() {
  const [activeService, setActiveService] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const router = useRouter()

  // Intersection observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = serviceRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setActiveService(index)
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" },
    )

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavigateToProjects = () => {
    router.push("/projects")
  }

  const scrollToService = (index: number) => {
    serviceRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  return (
    <section ref={containerRef} className="relative py-20 px-4 sm:px-6 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </div>

      {/* Dot Navigation - Left Side */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => scrollToService(index)}
              className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
                activeService === index
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/30 hover:bg-white/60 hover:scale-105"
              }`}
            >
              {/* Tooltip */}
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border border-white/20">
                  {service.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* <motion.div
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800/50 rounded-full border border-gray-700 mb-6 backdrop-blur-sm"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Premium Services</span>
          </motion.div> */}

          <h2 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Services That </span>
            <span className="text-white font-light italic">Transform</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed to accelerate your business growth and digital transformation
          </p>
        </motion.div>

        <div className="relative">
          {/* Services Content */}
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                ref={(el) => (serviceRefs.current[index] = el)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="min-h-[80vh] flex items-center"
              >
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <motion.div
                    className={`space-y-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <div>
                      {/* <motion.div
                        className="inline-flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      >
                        <div className="text-white">{service.icon}</div>
                        <span className="text-sm font-medium text-gray-300">{service.subtitle}</span>
                      </motion.div> */}

                      <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">{service.title}</h3>

                      <p className="text-lg text-gray-300 leading-relaxed mb-8">{service.description}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: false }}
                          className="flex items-center space-x-3"
                        >
                          <div className="text-white">{feature.icon}</div>
                          <span className="text-gray-300">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {service.stats.map((stat, statIndex) => (
                        <motion.div
                          key={statIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: statIndex * 0.1 }}
                          viewport={{ once: false }}
                          className="text-center p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3">
                      {service.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                          viewport={{ once: false }}
                          className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={tech.logo}
                            alt={tech.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <span className="text-sm text-gray-300 font-medium">{tech.name}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Arrow Navigation */}
                    {index === services.length - 1 && (
                      <motion.div
                        className="flex items-center space-x-4 pt-8"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <button
                          onClick={handleNavigateToProjects}
                          className="group flex items-center space-x-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-full transition-all duration-300"
                        >
                          <span className="text-white font-medium">View Our Projects</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                          </motion.div>
                        </button>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Enhanced UI Graphics */}
                  <motion.div
                    className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <ServiceUIGraphic service={service} index={index} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Enhanced UI Graphics Components
function ServiceUIGraphic({ service, index }: { service: any; index: number }) {
  const getServiceGraphic = () => {
    switch (service.id) {
      case "website":
        return <WebsiteUIGraphic service={service} />
      case "mobile":
        return <MobileUIGraphic service={service} />
      case "digital":
        return <DigitalSystemsUIGraphic service={service} />
      case "mechanical":
        return <MechanicalUIGraphic service={service} />
      case "product":
        return <ProductUIGraphic service={service} />
      case "architecture":
        return <ArchitectureUIGraphic service={service} />
      default:
        return <WebsiteUIGraphic service={service} />
    }
  }

  return (
    <div className="relative">
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Main UI Container */}
      <div className="relative backdrop-blur-xl border border-gray-300 rounded-3xl p-6 overflow-hidden shadow-2xl">
        {getServiceGraphic()}
      </div>
    </div>
  )
}

// Magic Bento Helper Functions
const createParticleElement = (x: number, y: number, color: string = "255, 255, 255"): HTMLDivElement => {
  const el = document.createElement("div")
  el.className = "particle"
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

// Particle Card Component
const ParticleCard: React.FC<{
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  particleCount?: number
  glowColor?: string
}> = ({ children, className = "", style, particleCount = 8, glowColor = "255, 255, 255" }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLDivElement[]>([])
  const particlesInitialized = useRef(false)

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return

    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle)
        },
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return

    if (!particlesInitialized.current) {
      initializeParticles()
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return

        const clone = particle.cloneNode(true) as HTMLDivElement
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" })

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        })

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        })
      }, index * 100)

      timeoutsRef.current.push(timeoutId)
    })
  }, [initializeParticles])

  useEffect(() => {
    if (!cardRef.current) return

    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      animateParticles()
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles])

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  )
}

function WebsiteUIGraphic({ service }: { service: any }) {
  const images = [
    "/images/Template_ss/Cosmetics.PNG",
    "/images/Template_ss/Hotel.PNG",
    "/images/Template_ss/ice.PNG",
    "/images/Template_ss/Resturant_1.PNG",
       "/images/Template_ss/Resturant_2.PNG",
    "/images/Template_ss/travel.PNG",
    "/images/Template_ss/GYM.PNG",
     "/images/Template_ss/Ecom.PNG",
       "/images/Template_ss/Dental.PNG",
  ]

  return (
    <div className="w-full h-[400px]">
      <Carousel3D
        images={images}
        imageWidth={430}
        imageHeight={450}
        rotateSpeed={35}
        pauseOnHover={true}
        translateZ={600}
        borderRadius={8}
        pauseDuration={3}
      />
    </div>
  )
}

function MobileUIGraphic({ service }: { service: any }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const templateImages = [
    { img: "/images/Mobile_app_ss/chatchill-screenshot.png", title: "ChatChill App", appName: "ChatChill" },
    { img: "/images/Mobile_app_ss/ss_2.PNG", title: "Mobile App", appName: "App Demo" },
    { img: "/images/Mobile_app_ss/ss_3.PNG", title: "Mobile App", appName: "App Preview" },
  ]

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? templateImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === templateImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex justify-center items-center">
      {/* Enhanced Phone Mockup with Template Showcase */}
      <div className="relative scale-100">
        <div className="w-72 h-[580px] bg-gray-700 rounded-[3rem] p-3 shadow-2xl">
          <div className="w-full h-full bg-gray-800 rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 py-3  text-xs border-b border-gray-100">
              <span className="font-semibold text-gray-300"></span>
              <div className="flex space-x-1 items-center mb-2">
                {/* <div className="w-4 h-2 bg-gray-500 rounded-sm"></div>
                <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div> */}
              </div>
            </div>

            {/* App Content - Template Images */}
            <div className="relative h-[calc(100%-48px)] bg-white overflow-hidden">
              <motion.img
                key={activeImageIndex}
                src={templateImages[activeImageIndex].img}
                alt={templateImages[activeImageIndex].title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 z-10"
              >
                <ArrowRight className="w-4 h-4 text-white rotate-180" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 z-10"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {templateImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

              {/* App Name Overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="text-xs font-semibold text-white">{templateImages[activeImageIndex].appName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl"></div>
      </div>
    </div>
  )
}

function DigitalSystemsUIGraphic({ service }: { service: any }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const systemImages = [
    { img: "/images/SYS_img/perk.PNG", title: "System Dashboard", description: "Digital System Interface" },
    { img: "/images/SYS_img/perk_2.PNG", title: "System Analytics", description: "Performance Metrics" },
    { img: "/images/SYS_img/perk_3.PNG", title: "System Automation", description: "Workflow Integration" },
  ]

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? systemImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === systemImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-6">
      {/* Enhanced System Architecture with Image Carousel */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-lg">
        <div className="relative min-h-[240px] flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
          <motion.img
            key={activeImageIndex}
            src={systemImages[activeImageIndex].img}
            alt={systemImages[activeImageIndex].title}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group z-10"
          >
            <motion.div
              animate={{ x: [-2, 0, -2] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowRight className="w-5 h-5 text-white rotate-180" />
            </motion.div>
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group z-10"
          >
            <motion.div
              animate={{ x: [-2, 0, -2] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.div>
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {systemImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeImageIndex ? "bg-gray-800 w-8" : "bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Enhanced Performance Dashboard */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Efficiency</span>
            <TrendingUp className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">+250%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-gray-600 to-gray-700 h-2 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            ></motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Automation</span>
            <Zap className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">95%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-gray-600 to-gray-700 h-2 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "95%" }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MechanicalUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Enhanced 3D Model Viewer */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-700">3D Model Viewer</h4>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </div>

        {/* 3D Viewport */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-40 flex items-center justify-center relative overflow-hidden shadow-inner">
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-xl"
            animate={{
              rotateY: [0, 360],
              rotateX: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-2 bg-gradient-to-br from-gray-500 to-gray-700 rounded shadow-inner"></div>
          </motion.div>

          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M0 0h20v1H0zM0 0v20h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            {["Rotate", "Zoom", "Pan"].map((tool, index) => (
              <motion.button
                key={tool}
                className={`px-3 py-1 text-xs rounded shadow-sm border transition-colors ${
                  index === 0
                    ? "bg-gray-700 text-white border-gray-800"
                    : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tool}
              </motion.button>
            ))}
          </div>
          <div className="text-xs text-gray-500">Precision: 0.01mm</div>
        </div>
      </div>

      {/* Enhanced Specifications */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Tolerance</span>
            <Target className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">±0.01mm</div>
          <div className="text-xs text-gray-500 mt-1">Industry Leading</div>
        </motion.div>
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Material</span>
            <Package className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-lg font-bold text-gray-800">Titanium</div>
          <div className="text-xs text-gray-500 mt-1">Grade 5</div>
        </motion.div>
      </div>
    </div>
  )
}

function ProductUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Enhanced Product Development Pipeline */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Development Pipeline</h4>
        <div className="space-y-4">
          {["Ideation", "Validation", "MVP", "Launch"].map((stage, index) => (
            <motion.div
              key={stage}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                  index <= 2 ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white" : "bg-gray-300 text-gray-600"
                }`}
                animate={index <= 2 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
              >
                {index <= 2 ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Lightbulb className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Target className="w-4 h-4" />
                )}
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{stage}</span>
                  <span className="text-xs text-gray-500">{index <= 2 ? "Complete" : "In Progress"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1 shadow-inner">
                  <motion.div
                    className={`h-2 rounded-full shadow-sm ${
                      index <= 2 ? "bg-gradient-to-r from-gray-600 to-gray-800" : "bg-gray-300"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: index <= 2 ? "100%" : "60%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Success Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Success Rate</span>
            <Star className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">92%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-gray-600 to-gray-700 h-2 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            ></motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">ROI Average</span>
            <TrendingUp className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">3.2x</div>
          <div className="text-xs text-gray-500 mt-1">Return on Investment</div>
        </motion.div>
      </div>
    </div>
  )
}

function ArchitectureUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Enhanced Blueprint Viewer */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-700">Blueprint Viewer</h4>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </div>

        {/* Blueprint Canvas */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-40 flex items-center justify-center relative overflow-hidden shadow-inner border border-gray-300">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.2'%3E%3Cpath d='M0 0h20v1H0zM0 0v20h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Building Structure */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Foundation */}
            <motion.div
              className="w-32 h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-sm shadow-md"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>

            {/* Walls */}
            <motion.div
              className="w-28 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-t-sm mx-auto -mt-1 shadow-lg relative"
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              {/* Windows */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-gray-300 rounded-sm shadow-inner"></div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-gray-300 rounded-sm shadow-inner"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gray-200 rounded-sm shadow-inner"></div>
            </motion.div>

            {/* Roof */}
            <motion.div
              className="w-32 h-8 bg-gradient-to-r from-gray-600 to-gray-700 transform -skew-y-12 -mt-2 shadow-lg"
              animate={{ rotateZ: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
            ></motion.div>
          </motion.div>
        </div>

        {/* Enhanced Tools */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            {["2D", "3D", "VR"].map((view, index) => (
              <motion.button
                key={view}
                className={`px-3 py-1 text-xs rounded shadow-sm border transition-colors ${
                  index === 1
                    ? "bg-gray-700 text-white border-gray-800"
                    : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {view}
              </motion.button>
            ))}
          </div>
          <div className="text-xs text-gray-500">Scale: 1:100</div>
        </div>
      </div>

      {/* Enhanced Project Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Projects</span>
            <Building2 className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">150+</div>
          <div className="text-xs text-gray-500 mt-1">Completed</div>
        </motion.div>
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Satisfaction</span>
            <Award className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">96%</div>
          <div className="text-xs text-gray-500 mt-1">Client Rating</div>
        </motion.div>
      </div>
    </div>
  )
}
