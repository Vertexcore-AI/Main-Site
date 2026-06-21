"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import {
  Sparkles,
  Utensils,
  Construction,
  ShoppingBag,
  Dumbbell,
  Stethoscope,
  Compass,
  ZoomIn,
  X,
  MessageSquare,
  Mail,
  Calendar,
  ChevronRight,
  Globe,
  ExternalLink,
  Lock
} from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  brand: string;
  type: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  badge?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  projects: Project[];
}

const categories: Category[] = [
  {
    id: "hospitality-food",
    name: "Hospitality & Leisure",
    icon: "Utensils",
    projects: [
      {
        id: "aurora-hotel",
        brand: "Aurora Grand",
        type: "Luxury Hotel & Resort Website",
        description: "A premium hospitality site featuring online bookings, luxury suites showcase, amenity tours, and elegant typography.",
        tags: ["Hotel", "Resort", "Booking System", "Tailwind CSS"],
        image: "/images/Template_ss/Hotel.PNG",
        demoUrl: "https://vertexcoreai.com/demo_sites/Aurora-Grand-Hotel/",
 
      },
      {
        id: "blue-lagoon",
        brand: "Blue Lagoon",
        type: "Beach Resort Website",
        description: "Modern vacation resort experience platform designed to showcase accommodations, amenities, and direct booking capabilities.",
        tags: ["Tourism", "Resort", "Responsive Design", "Interactive Maps"],
        image: "/images/Villa-Booking/villa_booking.png",
        demoUrl: "https://vertexcoreai.com/demo_sites/Blue-Lagoon-Resort/",

      },
      {
        id: "savora-restaurant",
        brand: "Savora Restaurant",
        type: "Fine Dining Website",
        description: "A sleek restaurant template with virtual menu display, reservation scheduling, culinary galleries, and story blocks.",
        tags: ["Restaurant", "Menu Catalog", "Reservations", "SEO Optimized"],
        image: "/images/Template_ss/Resturant_1.PNG",
        demoUrl: "",
       
      },
      {
        id: "savora-cafe",
        brand: "Savora Cafe",
        type: "Artisanal Cafe & Bakery Website",
        description: "Warm, cozy design crafted for boutique cafes, bakeries, and coffee shops to share their menus and store locations.",
        tags: ["Cafe", "Bistro", "Location Finder", "Social Feed"],
        image: "/images/Template_ss/Resturant_2.PNG",
        demoUrl: "",
      },
      {
        id: "sweet-treats",
        brand: "Sweet Treats",
        type: "Ice Cream & Dessert Parlor Website",
        description: "Vibrant, playful, and colorful design showcasing dessert menu, seasonal flavors, and catering event requests.",
        tags: ["Dessert Shop", "Events Booking", "Playful Aesthetics"],
        image: "/images/Template_ss/ice.PNG",
        demoUrl: "",
      }
    ]
  },
  {
    id: "beauty-wellness",
    name: "Beauty & Wellness",
    icon: "Sparkles",
    projects: [
      {
        id: "glowza-spa",
        brand: "Glowza Spa",
        type: "Beauty Salon & Spa Website",
        description: "Elegant, clean layouts built for premium salons, spas, and aesthetic centers. Features services pricing grids and booking calls.",
        tags: ["Spa", "Salon", "Service Pricing", "Lead Generation"],
        image: "/images/Template_ss/Cosmetics.PNG",
        demoUrl: "",
        badge: "Trending",
      }
    ]
  },
  {
    id: "medical-health",
    name: "Medical & Healthcare",
    icon: "Stethoscope",
    projects: [
      {
        id: "ventora-dental",
        brand: "Ventora Dental",
        type: "Modern Dental Clinic Website",
        description: "Trustworthy and professional medical template featuring doctor profiles, appointment requests, and patient testimonials.",
        tags: ["Medical", "Dental Clinic", "Appointment Forms", "HIPAA Friendly"],
        image: "/images/Template_ss/Dental.PNG",
        demoUrl: "",
        badge: "Clean Layout",
      }
    ]
  },
  {
    id: "retail-ecommerce",
    name: "Retail & E-commerce",
    icon: "ShoppingBag",
    projects: [
      {
        id: "mosaica-shop",
        brand: "Mosaica Catalog",
        type: "Home Decor & Catalog Website",
        description: "Sophisticated catalog and product showroom site showcasing high-end tiles, hardware, or home improvement items.",
        tags: ["Retail", "Product Catalog", "Room Visualizer", "Inquiry Forms"],
        image: "/images/Template_ss/Ecom.PNG",
        demoUrl: "",
        badge: "Product Showcase",
      }
    ]
  },
  {
    id: "sports-fitness",
    name: "Sports & Fitness",
    icon: "Dumbbell",
    projects: [
      {
        id: "apex-gym",
        brand: "Apex Gym",
        type: "Fitness Center & Gym Website",
        description: "High-energy template showcasing fitness classes, trainer bios, gym memberships, and visual schedule tables.",
        tags: ["Fitness", "Gym", "Membership Plans", "Class Schedules"],
        image: "/images/Template_ss/GYM.PNG",
        demoUrl: "",
        badge: "High Energy",
      }
    ]
  },
  {
    id: "travel-tourism",
    name: "Travel & Adventure",
    icon: "Compass",
    projects: [
      {
        id: "roamify-travel",
        brand: "Roamify Travel",
        type: "Travel Agency & Tour Booking",
        description: "Adventure-packed travel portal featuring destination discovery, custom tour packages, client reviews, and booking inquiries.",
        tags: ["Travel Agency", "Tour Booking", "Destination Grid"],
        image: "/images/Template_ss/travel.PNG",
        demoUrl: "",
        badge: "Adventure Design",
      }
    ]
  },
  {
    id: "services-engineering",
    name: "Services & Engineering",
    icon: "Construction",
    projects: [
      {
        id: "ventora-hvac",
        brand: "Ventora HVAC",
        type: "HVAC & Engineering Services",
        description: "Professional utility and commercial services page with clear service descriptions, service areas map, and simple quote calculator.",
        tags: ["HVAC", "Maintenance Services", "Quote Form"],
        image: "/images/Template_ss/Dental.PNG",
        demoUrl: "",
      }
    ]
  }
];

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Sparkles":
      return <img src="https://img.icons8.com/fluency/48/makeup.png" alt="makeup" className="w-4 h-4 object-contain" />;
    case "Utensils":
      return <img src="https://img.icons8.com/office/40/service-bell.png" alt="service-bell" className="w-4 h-4 object-contain" />;
    case "Construction":
      return <img src="https://img.icons8.com/fluency/48/truck.png" alt="truck" className="w-4 h-4 object-contain" />;
    case "ShoppingBag":
      return <img src="https://img.icons8.com/fluency/48/shopee.png" alt="shopee" className="w-4 h-4 object-contain" />;
    case "Dumbbell":
      return <img src="https://img.icons8.com/fluency/48/dumbbell.png" alt="dumbbell" className="w-4 h-4 object-contain" />;
    case "Stethoscope":
      return <img src="https://img.icons8.com/fluency/48/syringe-with-a-drop-of-blood.png" alt="syringe-with-a-drop-of-blood" className="w-4 h-4 object-contain" />;
    case "Compass":
      return <img src="https://img.icons8.com/fluency/48/around-the-globe.png" alt="around-the-globe" className="w-4 h-4 object-contain" />;
    default:
      return <Globe className="w-4 h-4" />;
  }
};

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [requestProject, setRequestProject] = useState<Project | null>(null);

  const filterOptions = [
    { id: "all", name: "All Projects", icon: "Globe" },
    ...categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon })),
  ];

  const filteredCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((c) => c.id === activeFilter);

  const handleLivePreviewClick = (project: Project) => {
    if (project.demoUrl) {
      window.open(project.demoUrl, "_blank", "noopener,noreferrer");
    } else {
      setPreviewProject(project);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-black">
      {/* Static grid background with a subtle top radial highlight */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-emerald-500/10 to-transparent rounded-full blur-[120px] z-0 pointer-events-none" />

      <NavBar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs uppercase tracking-widest font-semibold rounded-full">
            VertexCore Templates
          </div> */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Our Website <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Templates</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Ready-to-deploy, fully customizable website templates built for high speed, absolute responsiveness, and strong local SEO.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 p-3 md:p-4 bg-neutral-900/60 backdrop-blur-md border border-white/5 rounded-2xl max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                activeFilter === opt.id
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {getCategoryIcon(opt.icon)}
              <span>{opt.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} className="space-y-20">
            {filteredCategories.map((category, ci) => (
              <motion.section
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: ci * 0.05 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 0 border border-emerald-500/20 rounded-lg">
                      {getCategoryIcon(category.icon)}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                      {category.name}
                    </h2>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/20 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.projects.map((project, pi) => (
                    <motion.div
                      key={project.id}
                      className="group flex flex-col h-full bg-neutral-950/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 hover:bg-neutral-950/80 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all duration-500"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: ci * 0.05 + pi * 0.05,
                      }}
                      whileHover={{ y: -4 }}
                    >
                      {/* Image Container with Zoom & Badge */}
                      <div className="aspect-[16/10] relative bg-neutral-900 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.brand}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Top Accent Badges */}
                        {project.badge && (
                          <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 bg-emerald-500 text-black text-[10px] uppercase tracking-wider font-extrabold rounded-md shadow-lg shadow-emerald-500/20">
                            {project.badge}
                          </div>
                        )}

                        {/* Screen Overlay on Hover */}
                        <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleLivePreviewClick(project)}
                            className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                            title="Live Preview"
                          >
                            <ZoomIn className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex flex-col flex-1 gap-4">
                        <div>
                          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            {getCategoryIcon(category.icon)}
                            <span>{category.name}</span>
                          </div>
                          <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors duration-300">
                            {project.brand}
                          </h3>
                          <div className="text-xs text-neutral-400 font-medium mt-1">
                            {project.type}
                          </div>
                        </div>

                        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Technology Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-4 mt-auto border-t border-white/5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/5 font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Card CTA Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <button
                            onClick={() => handleLivePreviewClick(project)}
                            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/10 bg-neutral-900/40 text-neutral-300 hover:text-white hover:bg-neutral-900 hover:border-white/20 text-xs font-semibold transition-all"
                          >
                            <span>Live Preview</span>
                            {project.demoUrl ? (
                              <ExternalLink className="w-3.5 h-3.5" />
                            ) : (
                              <ZoomIn className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => setRequestProject(project)}
                            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-bold transition-all shadow-md shadow-emerald-500/10"
                          >
                            <span>Get Design</span>
                            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===== FULLSCREEN PREVIEW MODAL ===== */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewProject(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mock Browser Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-white/5 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>

                <div className="bg-neutral-950 border border-white/5 text-neutral-400 text-[10px] px-8 py-1.5 rounded-lg w-full max-w-md mx-auto truncate font-mono text-center flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>preview.vertexcore.ai/{previewProject.id}</span>
                </div>

                <button
                  onClick={() => setPreviewProject(null)}
                  className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Template Screenshot Area */}
              <div className="overflow-y-auto flex-1 bg-neutral-900 p-4 scrollbar-thin scrollbar-thumb-emerald-500/20">
                <div className="relative w-full rounded-lg overflow-hidden border border-white/5">
                  <img
                    src={previewProject.image}
                    alt={previewProject.brand}
                    className="w-full h-auto select-none"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== REQUEST TEMPLATE MODAL ===== */}
      <AnimatePresence>
        {requestProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRequestProject(null)}
          >
            <motion.div
              className="relative w-full max-w-md bg-neutral-950 border border-white/10 rounded-3xl p-8 shadow-2xl text-center flex flex-col gap-6"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div>
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  Request Design
                </h3>
                <p className="text-sm text-neutral-400 mt-2">
                  Select how you'd like to get in touch with our team regarding the <span className="text-emerald-400 font-bold">"{requestProject.brand}"</span> design. We customize all details to fit your business perfectly.
                </p>
              </div>

              {/* Option List */}
              <div className="flex flex-col gap-3">
                {/* WhatsApp Chat Option */}
                <a
                  href={`https://wa.me/94778036074?text=${encodeURIComponent(
                    `Hi VertexCore AI team, I am interested in your "${requestProject.brand}" website template (${requestProject.type}). Can you help me set this up for my business?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">WhatsApp Chat</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Instantly discuss with our team</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                </a>

                {/* Email Inquiry Option */}
                <a
                  href={`mailto:support@vertexcore.ai?subject=${encodeURIComponent(
                    `Inquiry: ${requestProject.brand} Website Template`
                  )}&body=${encodeURIComponent(
                    `Hi VertexCore AI team,\n\nI would like to get a quote and details about customising the "${requestProject.brand}" template (${requestProject.type}) for my business.\n\nLooking forward to hearing from you!`
                  )}`}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-blue-500/10 hover:border-blue-500/30 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">Email Inquiry</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Get a response directly to your inbox</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-blue-400 transition-colors" />
                </a>

                {/* Consultation questionnaire Option */}
                <a
                  href={`/consultation?template=${encodeURIComponent(requestProject.id)}`}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-purple-500/10 hover:border-purple-500/30 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">7-Step Consultation</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Specify detailed business needs</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-purple-400 transition-colors" />
                </a>
              </div>

              {/* Close/Cancel */}
              <button
                onClick={() => setRequestProject(null)}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-2xl text-sm font-semibold transition-all border border-white/5"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

