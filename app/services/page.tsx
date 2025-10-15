"use client"

import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import {
  Code,
  Smartphone,
  Search,
  Palette,
  Cloud,
  ShoppingCart,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle,
  Database,
  GitBranch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  WebDevGraphic,
  MechanicalGraphic,
  SEOGraphic,
  PatentGraphic,
  IoTGraphic,
  DigitalTransformationGraphic,
} from "@/components/animated-service-graphics"

export default function ServicesPage() {
  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Software Solutions",
      description: "Next-gen software built with intelligence, scalability, and precision",
      features: ["Machine Learning Integration", "AI Model Development", "Automated Workflows", "Smart Analytics"],
      price: "Starting at $10,000",
      graphic: <WebDevGraphic />,
      color: "indigo",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Enterprise Software Engineering",
      description: "Robust, secure, and high-performance systems built for business growth",
      features: ["Custom Enterprise Apps", "System Integration", "Security Implementation", "Scalable Architecture"],
      price: "Starting at $15,000",
      graphic: <DigitalTransformationGraphic />,
      color: "slate",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Enterprise Data Architecture",
      description: "Advanced database solutions for modern business intelligence and operations",
      features: ["Data Modeling & Design", "Performance Optimization", "Data Migration Services", "High-Availability Systems"],
      price: "Starting at $8,000",
      graphic: <PatentGraphic />,
      color: "amber",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies",
      features: ["React & Next.js", "Full-Stack Development", "API Integration", "Database Design"],
      price: "Starting at $5,000",
      graphic: <WebDevGraphic />,
      color: "emerald",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "iOS & Android", "App Store Deployment", "Push Notifications"],
      price: "Starting at $8,000",
      graphic: <IoTGraphic />,
      color: "blue",
    },

    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that convert visitors into customers",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      price: "Starting at $3,000",
      graphic: <DigitalTransformationGraphic />,
      color: "pink",
    },
    // SEO & Digital Marketing service card (commented out for future reference)
    /*{
      icon: <Search className="w-8 h-8" />,
      title: "SEO & Digital Marketing",
      description: "Boost your online presence and drive organic traffic to your business",
      features: ["SEO Optimization", "Content Strategy", "Analytics Setup", "Performance Tracking"],
      price: "Starting at $2,000/mo",
      graphic: <SEOGraphic />,
      color: "purple",
    },*/
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "DevOps Automation & CI/CD",
      description: "Enterprise-grade deployment pipelines and automation solutions",
      features: ["Automated Testing", "Continuous Deployment", "Infrastructure as Code", "Release Management"],
      price: "Starting at $6,000",
      graphic: <MechanicalGraphic />,
      color: "rose",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions",
      features: ["AWS/Vercel Setup", "CI/CD Pipelines", "Database Hosting", "Performance Monitoring"],
      price: "Starting at $1,500",
      graphic: <PatentGraphic />,
      color: "cyan",
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "E-commerce Development",
      description: "Complete online stores with payment processing and inventory management",
      features: ["Shopify/Custom", "Payment Integration", "Inventory Management", "Order Processing"],
      price: "Starting at $7,000",
      graphic: <MechanicalGraphic />,
      color: "orange",
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "Discovery Call",
      description: "We discuss your project requirements and goals",
    },
    {
      step: "02",
      title: "Proposal & Planning",
      description: "Detailed project scope and timeline delivered",
    },
    {
      step: "03",
      title: "Development",
      description: "Regular updates and milestone deliveries",
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Go live with ongoing maintenance and support",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-emerald-500 text-white mb-6">Our Services</Badge>
            <h1 className="text-4xl sm:text-6xl font-bold mb-8 leading-tight">
              <span className="text-white">Transform Your </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                Digital Presence
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              From concept to launch, we deliver cutting-edge solutions that drive growth and exceed expectations
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 h-full relative overflow-hidden">
                  {/* Animated Background Graphic */}
                  {service.graphic}

                  <div className="relative z-10">
                    <div className={`text-${service.color}-400 mb-6`}>{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`text-${service.color}-400 font-bold text-lg`}>{service.price}</div>
                      <Link href="/consultation">
                        <Button
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white group-hover:scale-105 transition-transform"
                        >
                          Get Quote <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <Badge className="bg-blue-500 text-white mb-6">Our Process</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">How We Work</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A proven process that ensures quality delivery and client satisfaction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-12 text-center"
          >
            <h3 className="text-3xl font-bold text-black mb-4">Ready to Get Started?</h3>
            <p className="text-black/80 text-xl mb-8">Let's discuss your project and bring your vision to life</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Free Consultation
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
