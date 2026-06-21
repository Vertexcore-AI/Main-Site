"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { CodeRain } from "@/components/code-rain";
import { ImageIcon } from "lucide-react";

interface Project {
  id: string;
  brand: string;
  type: string;
  description: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  projects: Project[];
}

const categories: Category[] = [
  {
    id: "beauty-wellness",
    name: "Beauty & Wellness",
    projects: [
      {
        id: "glowza",
        brand: "Glowza",
        type: "Beauty Salon Website",
        description:
          "A modern, elegant website for a premium beauty salon showcasing services, booking, and gallery.",
        tags: ["Beauty", "Wellness", "Web Design"],
      },
    ],
  },
  {
    id: "hospitality-food",
    name: "Hospitality & Food Service",
    projects: [
      {
        id: "savora-cafe",
        brand: "Savora",
        type: "Cafe Website",
        description:
          "A warm, inviting online presence for a specialty coffee shop with menu and location features.",
        tags: ["Cafe", "Food & Beverage"],
      },
      {
        id: "savora-restaurant",
        brand: "Savora",
        type: "Restaurant Website",
        description:
          "A full-featured restaurant website with reservations, menu display, and brand storytelling.",
        tags: ["Restaurant", "Fine Dining"],
      },
    ],
  },
  {
    id: "construction-engineering",
    name: "Construction & Engineering",
    projects: [
      {
        id: "ventora-hvac",
        brand: "Ventora",
        type: "HVAC Services Website",
        description:
          "A professional HVAC service website showcasing residential and commercial solutions.",
        tags: ["HVAC", "Construction"],
      },
      {
        id: "ventora-ac",
        brand: "Ventora",
        type: "AC Services Website",
        description:
          "Dedicated AC service platform with service areas, booking, and maintenance plans.",
        tags: ["AC Services", "Engineering"],
      },
    ],
  },
  {
    id: "retail-home",
    name: "Retail & Home Improvement",
    projects: [
      {
        id: "mosaica",
        brand: "Mosaica",
        type: "Tile Shop Website",
        description:
          "A visually rich tile shop website with product catalog, room visualizer, and project gallery.",
        tags: ["Retail", "Home Improvement", "Tiles"],
      },
    ],
  },
];

const filterOptions = [
  { id: "all", name: "All Projects" },
  ...categories.map((c) => ({ id: c.id, name: c.name })),
];

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((c) => c.id === activeFilter);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <CodeRain />
      </div>
      <NavBar />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-emerald-400">Portfolio</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our work across different industries — each project crafted
            with precision and purpose.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === opt.id
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {opt.name}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredCategories.map((category, ci) => (
            <motion.section
              key={category.id}
              className="mb-20 last:mb-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {category.name}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.projects.map((project, pi) => (
                  <motion.div
                    key={project.id}
                    className="group relative bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: ci * 0.1 + pi * 0.1,
                    }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-800/80 to-gray-900/80 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border-2 border-dashed border-gray-600 group-hover:border-emerald-400/50 transition-colors duration-300">
                        <ImageIcon className="w-7 h-7 text-gray-500 group-hover:text-emerald-400 transition-colors duration-300" />
                      </div>
                      <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                        Add Image
                      </span>
                      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all duration-500" />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-bold text-white">
                          {project.brand}
                        </h3>
                        <span className="text-gray-500 hidden sm:inline">
                          —
                        </span>
                        <span className="text-sm text-emerald-400 font-medium">
                          {project.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
