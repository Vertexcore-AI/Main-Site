"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CheckCircle, Code } from "lucide-react"

const projects = [
  {
    id: "gaming-forum",
    name: "Gaming Forum",
    description:
      "A comprehensive gaming community platform with user discussions, game reviews, and social features. Built with Laravel and modern web technologies, it provides a seamless user experience with real-time discussions, user profiles, game databases, and community-driven content.",
    image: "/images/Gaming-forum/games.png",
    features: [
      "Real-time discussions and threaded conversations",
      "User authentication and profile management",
      "Game database with ratings and review system",
      "Responsive design for optimal mobile experience",
    ],
    technologies: ["Laravel", "Blade Files", "TailwindCSS", "SQLite Database"],
  },
  {
    id: "spillvision",
    name: "SpillVision",
    description:
      "AI-powered oil spill detection system using computer vision for environmental monitoring. Utilizing YOLO object detection algorithms and trained on comprehensive datasets from Roboflow, this system provides accurate and rapid identification of oil spills in various environments.",
    image: "/images/SpillVision/test-oil_spill.jpg",
    features: [
      "Real-time oil spill detection using YOLO algorithms",
      "Trained on comprehensive Roboflow dataset",
      "Environmental monitoring and alert system",
      "High accuracy across various conditions",
    ],
    technologies: ["Python", "YOLO", "Computer Vision", "Roboflow (Dataset)"],
  },
  {
    id: "plant-harvest",
    name: "Plant Harvest",
    description:
      "Smart agriculture system using AI to detect plant maturity and optimize harvest timing. Using YOLO-based object detection trained on agricultural datasets, the system analyzes plant images to assess maturity levels, detect diseases, and provide harvest recommendations.",
    image: "/images/Plant-harvest/harvest.jpg",
    features: [
      "AI-powered plant maturity detection",
      "Disease identification and prevention",
      "Harvest optimization recommendations",
      "Crop analysis and yield prediction",
    ],
    technologies: ["Python", "YOLO", "Computer Vision", "Roboflow (Dataset)"],
  },
  {
    id: "restaurant-system",
    name: "Restaurant System",
    description:
      "Complete restaurant management solution with ordering, inventory, analytics, and AI chatbot support. Built with Laravel and enhanced with Python analytics, this system handles order management, inventory tracking, staff scheduling, and customer relationship management.",
    image: "/images/Restaurent/foodix.png",
    features: [
      "Comprehensive order and inventory management",
      "Python-based analytics for sales insights",
      "AI chatbot for 24/7 customer support",
      "Real-time kitchen display system",
    ],
    technologies: ["Laravel", "Blade Files", "MySQL Database", "Python (Analytics)", "Chatbase.co (Chatbot Training)"],
  },
  {
    id: "pos-supermarket",
    name: "POS Supermarket System",
    description:
      "Advanced point-of-sale system for supermarkets with real-time inventory and sales management. Built with Laravel and Livewire for dynamic, real-time interactions, this system provides seamless checkout experiences, inventory management, supplier tracking, and sales analytics.",
    image: "/images/POS-supermarket/pos.png",
    features: [
      "Real-time POS with inventory synchronization",
      "Livewire for dynamic, reactive user interface",
      "Python analytics engine for sales forecasting",
      "Multi-user system with role-based access",
    ],
    technologies: ["Laravel", "Blade Files", "Livewire", "Python", "MySQL Database"],
  },
  {
    id: "villa-booking",
    name: "Villa Booking System",
    description:
      "Luxury villa reservation platform with booking management, analytics, and AI customer support. The system features comprehensive booking management, availability calendars, payment processing, and customer relationship tools with Python-powered analytics.",
    image: "/images/Villa-Booking/villa_booking.png",
    features: [
      "Comprehensive booking management system",
      "Secure payment processing and confirmations",
      "Python analytics for revenue optimization",
      "AI chatbot for automated customer support",
    ],
    technologies: ["Laravel", "Blade Files", "MySQL Database", "Python (Analytics)", "Chatbase.co (Chatbot Training)"],
  },
]

export default function ProjectsPage() {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />

      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="py-20 px-4 sm:px-6 bg-black">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              className="text-5xl sm:text-6xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white">Our </span>
              <span className="text-white font-light italic">Projects</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore our portfolio of innovative solutions across various industries
            </motion.p>
          </div>
        </section>

        {/* Projects Section - Zigzag Layout */}
        <section className="py-10 px-4 sm:px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-32">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  ref={(el) => (projectRefs.current[index] = el)}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="min-h-[70vh] flex items-center"
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
                      {/* Project Name */}
                      <div>
                        <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                          {project.name}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">{project.description}</p>
                      </div>

                      {/* Key Features */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                        {project.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            viewport={{ once: false }}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-3">
                          {project.technologies.map((tech, techIndex) => (
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
                      </div>
                    </motion.div>

                    {/* Project Image */}
                    <motion.div
                      className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <div className="relative">
                        {/* Background Glow */}
                        <motion.div
                          className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-3xl"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Image Container */}
                        <div className="relative backdrop-blur-xl border border-gray-700 rounded-3xl p-6 overflow-hidden shadow-2xl bg-gray-900/50">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-auto rounded-xl object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
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
