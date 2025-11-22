"use client"

import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Heart,
  ShoppingCart,
  Factory,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Code,
  Database,
  Cloud,
} from "lucide-react"

export default function SolutionsPage() {
  const industries = [
    {
      icon: TrendingUp,
      title: "FinTech",
      subtitle: "Financial Technology",
      description: "Build intelligent financial systems with AI-powered fraud detection, algorithmic trading, and risk assessment.",
      features: ["Fraud Detection", "Algorithmic Trading", "Risk Assessment", "Portfolio Optimization"],
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-500/10 to-green-600/10",
    },
    {
      icon: Heart,
      title: "Healthcare",
      subtitle: "Medical & Life Sciences",
      description: "HIPAA-compliant AI solutions for patient data analysis, diagnostic assistance, and treatment optimization.",
      features: ["Patient Data AI", "Diagnostic Assistance", "Treatment Planning", "Medical Imaging"],
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-600/10",
    },
    {
      icon: ShoppingCart,
      title: "Retail & E-commerce",
      subtitle: "Consumer Experience",
      description: "Transform customer experience with personalization engines, inventory prediction, and dynamic pricing.",
      features: ["Personalization", "Inventory Prediction", "Dynamic Pricing", "Customer Analytics"],
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-600/10",
    },
    {
      icon: Factory,
      title: "Manufacturing",
      subtitle: "Industrial AI",
      description: "Optimize operations with predictive maintenance, quality control, and supply chain intelligence.",
      features: ["Predictive Maintenance", "Quality Control", "Supply Chain AI", "Process Optimization"],
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-500/10 to-red-600/10",
    },
  ]

  const techStack = [
    { icon: Code, name: "Next.js & React", description: "Modern web frameworks" },
    { icon: Database, name: "Python & TensorFlow", description: "AI/ML infrastructure" },
    { icon: Cloud, name: "AWS & Vercel", description: "Cloud deployment" },
    { icon: Shield, name: "Enterprise Security", description: "SOC 2 compliant" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(52,211,153,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(168,85,247,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(52,211,153,0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Enterprise-Grade AI Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-7xl font-black mb-6 leading-tight"
            >
              Transforming{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                Industries
              </span>
              <br />
              with Intelligent AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              We build specialized AI solutions tailored to your industry's unique challenges. From FinTech to Healthcare,
              our expertise drives measurable results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
              >
                <div className="flex items-center space-x-2">
                  <span>Discuss Your Solution</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-600 text-white hover:bg-gray-800 px-8 py-6 text-lg font-semibold rounded-full"
              >
                View Case Studies
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Grid */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Industry <span className="text-emerald-400">Expertise</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Deep domain knowledge across critical industries, delivering solutions that understand your unique challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div
                  className={`relative bg-gradient-to-br ${industry.bgGradient} backdrop-blur-xl border border-gray-700 rounded-3xl p-8 sm:p-10 overflow-hidden transition-all duration-300 hover:border-gray-600`}
                >
                  {/* Background Gradient Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${industry.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <industry.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold text-white mb-2">{industry.title}</h3>
                    <p className="text-gray-400 mb-4">{industry.subtitle}</p>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{industry.description}</p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {industry.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-800 group-hover:border-emerald-500 transition-colors"
                    >
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The VertexCore Engine */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">Technical Excellence</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              The <span className="text-emerald-400">VertexCore</span> Engine
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built on cutting-edge technologies, our solutions are scalable, secure, and future-proof.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <tech.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Build Your <span className="text-emerald-400">Solution?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our industry expertise can transform your business with intelligent AI solutions.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
