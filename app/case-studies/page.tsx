"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CheckCircle, Code, TrendingUp, Target, Zap, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const caseStudies = [
  {
    id: "perk-pos-inventory",
    title: "PERK POS & Inventory",
    subtitle: "ML-Driven Inventory Optimization for Retail",
    client: "Multi-Store Retail Chain",
    industry: "Retail & E-commerce",
    tags: ["POS", "Inventory", "AI", "ML", "Forecasting"],
    challenge:
      "A growing retail chain was losing $5M annually due to stockouts and overstock situations. Their manual inventory management couldn't keep pace with demand fluctuations, seasonal trends, and multi-location complexity. Store managers needed days to analyze sales data, missing critical reorder windows.",
    solution:
      "We built PERK, an intelligent POS and inventory management system that transforms raw sales data into actionable insights. The system combines real-time transaction tracking with ML-powered demand forecasting, enabling automated reorder recommendations and reducing decision-making time from days to hours.",
    images: ["/images/Perk/image1.png", "/images/Perk/image2.png"],
    businessGoals: [
      "Reduce stockouts and overstock by 20%",
      "Shorten time-to-insight for sales trends from days to hours",
      "Enable store managers to act on automated reorder recommendations",
      "Optimize inventory holding costs across multiple locations",
    ],
    implementation: [
      {
        title: "Data Collection & Integration",
        description:
          "POS transactions recorded in real-time with periodic snapshots exported to S3 for ML processing. Integrated with existing payment systems and supplier databases.",
      },
      {
        title: "ML Pipeline Architecture",
        description:
          "Python FastAPI service consuming transaction exports. Time-series forecasting using Prophet and LSTM models for demand prediction. Classification models for anomaly detection in sales patterns.",
      },
      {
        title: "Intelligent Reporting",
        description:
          "JSON reports with daily forecasts, reorder points, feature importance analysis, and actionable recommendations. Real-time dashboard showing inventory health across all locations.",
      },
      {
        title: "Live Authoring & Preview",
        description:
          "Built with Antigravity IDE integration for live editing and preview. Experiment tracking with unique IDs for A/B testing different forecasting models.",
      },
    ],
    results: [
      {
        metric: "25%",
        label: "Reduction in Stockouts",
        description: "SKU-level weekly forecasts dramatically reduced out-of-stock situations",
      },
      {
        metric: "30%",
        label: "Lower Holding Costs",
        description: "EOQ-based suggestions optimized inventory levels across all stores",
      },
      {
        metric: "85%",
        label: "Faster Decision Making",
        description: "Automated insights reduced analysis time from 3 days to 4 hours",
      },
      {
        metric: "$1.8M",
        label: "Annual Savings",
        description: "Combined savings from reduced waste and optimized inventory",
      },
    ],
    keyFindings: [
      "Forecast accuracy: 92% for high-velocity SKUs, 78% for seasonal items",
      "Anomaly detection uncovered unusual returns spike on 2025-08-15, traced to supplier batch issue",
      "Multi-location optimization revealed 15% of inventory was in wrong stores",
      "Demand patterns showed strong correlation with local events and weather (0.73 coefficient)",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Prophet (Time-Series)",
      "LSTM (Deep Learning)",
      "Next.js",
      "PostgreSQL",
      "AWS S3",
      "TensorFlow",
    ],
    duration: "16 weeks",
    team: "5 engineers (2 ML, 2 Full-stack, 1 DevOps)",
    testimonial: {
      quote:
        "PERK transformed our inventory management from reactive to predictive. We're now making data-driven decisions in hours instead of days, and our bottom line shows it.",
      author: "Director of Operations",
      company: "Retail Chain",
    },
  },
]

export default function CaseStudiesPage() {
  const caseStudyRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />

      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="py-20 px-4 sm:px-6 bg-black">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Real Results, Real Impact</span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white">Case </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                Studies
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              See how we've helped companies transform their operations with AI-powered solutions and measurable business
              outcomes
            </motion.p>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-10 px-4 sm:px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-32">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  ref={(el) => (caseStudyRefs.current[index] = el)}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  {/* Hero Section */}
                  <div className="mb-16">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{study.title}</h2>
                    <p className="text-2xl text-emerald-400 mb-4">{study.subtitle}</p>
                    <div className="flex flex-wrap gap-6 text-gray-400">
                      <div>
                        <span className="text-gray-500">Client:</span> {study.client}
                      </div>
                      <div>
                        <span className="text-gray-500">Industry:</span> {study.industry}
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span> {study.duration}
                      </div>
                      <div>
                        <span className="text-gray-500">Team:</span> {study.team}
                      </div>
                    </div>
                  </div>

                  {/* Images Showcase */}
                  <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {study.images.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: imgIndex * 0.2 }}
                        viewport={{ once: false }}
                        className="relative"
                      >
                        {/* Background Glow */}
                        <motion.div
                          className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-3xl"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Image Container */}
                        <div className="relative backdrop-blur-xl border border-gray-700 rounded-3xl p-6 overflow-hidden shadow-2xl bg-gray-900/50">
                          <img src={image} alt={`${study.title} screenshot ${imgIndex + 1}`} className="w-full h-auto rounded-xl object-cover" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: false }}
                      className="bg-gradient-to-br from-red-500/10 to-orange-600/10 backdrop-blur-sm border border-red-500/20 rounded-3xl p-8"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <Target className="w-8 h-8 text-red-400" />
                        <h3 className="text-2xl font-bold text-white">The Challenge</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: false }}
                      className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <Zap className="w-8 h-8 text-emerald-400" />
                        <h3 className="text-2xl font-bold text-white">Our Solution</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                    </motion.div>
                  </div>

                  {/* Business Goals */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="mb-16"
                  >
                    <h3 className="text-3xl font-bold text-white mb-8">Business Goals</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {study.businessGoals.map((goal, goalIndex) => (
                        <motion.div
                          key={goalIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: goalIndex * 0.1 }}
                          viewport={{ once: false }}
                          className="flex items-start space-x-3 bg-gray-800/30 border border-gray-700 rounded-xl p-4"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{goal}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Results Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="mb-16"
                  >
                    <h3 className="text-3xl font-bold text-white mb-8">Results & Impact</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {study.results.map((result, resultIndex) => (
                        <motion.div
                          key={resultIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: resultIndex * 0.1 }}
                          viewport={{ once: false }}
                          whileHover={{ y: -5 }}
                          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300"
                        >
                          <div className="text-4xl font-bold text-emerald-400 mb-2">{result.metric}</div>
                          <div className="text-lg font-semibold text-white mb-2">{result.label}</div>
                          <p className="text-sm text-gray-400">{result.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Implementation Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="mb-16"
                  >
                    <h3 className="text-3xl font-bold text-white mb-8">Implementation</h3>
                    <div className="space-y-6">
                      {study.implementation.map((step, stepIndex) => (
                        <motion.div
                          key={stepIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: stepIndex * 0.1 }}
                          viewport={{ once: false }}
                          className="bg-gray-800/30 border border-gray-700 rounded-xl p-6"
                        >
                          <h4 className="text-xl font-semibold text-white mb-3">
                            {stepIndex + 1}. {step.title}
                          </h4>
                          <p className="text-gray-300 leading-relaxed">{step.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Key Findings */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="mb-16"
                  >
                    <h3 className="text-3xl font-bold text-white mb-8">Key Findings</h3>
                    <div className="space-y-4">
                      {study.keyFindings.map((finding, findingIndex) => (
                        <motion.div
                          key={findingIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: findingIndex * 0.1 }}
                          viewport={{ once: false }}
                          className="flex items-start space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
                        >
                          <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{finding}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="mb-16"
                  >
                    <h3 className="text-3xl font-bold text-white mb-8">Tech Stack</h3>
                    <div className="flex flex-wrap gap-3">
                      {study.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                          viewport={{ once: false }}
                          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Code className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-gray-300 font-medium">{tech}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Testimonial */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-12 text-center"
                  >
                    <div className="text-6xl text-emerald-400 mb-6">"</div>
                    <p className="text-2xl text-white mb-8 leading-relaxed italic">{study.testimonial.quote}</p>
                    <div className="text-gray-400">
                      <p className="font-semibold text-white">{study.testimonial.author}</p>
                      <p>{study.testimonial.company}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
