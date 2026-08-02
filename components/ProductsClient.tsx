"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendProductRequest } from "@/app/actions/send-product-request";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import {
  Lock,
  X,
  Copy,
  Check,
  ExternalLink,
  Send,
  ChevronRight,
  ChevronLeft,
  Rocket,
} from "lucide-react";
import Image from "next/image";

const DEMO_URL = "https://vpos.demo.vertexcoreai.com/tenant/demo";
const DEMO_USERNAME = "demo";
const DEMO_PASSWORD = "demo1234";

interface ProductImage {
  src: string;
  title: string;
  caption: string;
}

interface Product {
  id: string;
  badge: string;
  format: string;
  name: string;
  type: string;
  description: string;
  demoUrl: string;
  username?: string;
  password?: string;
  images: ProductImage[];
}

const products: Product[] = [
  {
    id: "vpos",
    badge: "Live Product",
    format: "SaaS · Cloud",
    name: "VPOS",
    type: "Point of Sale & Inventory Management",
    description:
      "A cloud-based Point of Sale and inventory management platform. From secure login to real-time stock control, it streamlines sales, tracks inventory across locations, and gives your business a single dashboard to operate from anywhere.",
    demoUrl: DEMO_URL,
    username: DEMO_USERNAME,
    password: DEMO_PASSWORD,
    images: [
      {
        src: "/images/SAAS/Vpos/login.png",
        title: "Login",
        caption:
          "Secure authentication that keeps each business's data isolated and protected.",
      },
      {
        src: "/images/SAAS/Vpos/stock.png",
        title: "Stock & Inventory",
        caption:
          "Real-time inventory control with live stock levels and multi-location tracking.",
      },
    ],
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [activeImage, setActiveImage] = useState(0);
  const [previewImage, setPreviewImage] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const currentImage = product.images[activeImage];
  const multiImage = product.images.length > 1;

  const goPrev = () =>
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  const goNext = () => setActiveImage((prev) => (prev + 1) % product.images.length);

  return (
    <motion.div
      className="bg-neutral-950/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.05)] transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image Carousel - single box with swap */}
      <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            className="absolute inset-0 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPreviewImage(true)}
          >
            <Image
              src={currentImage.src}
              alt={`${product.name} ${currentImage.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-emerald-500 text-black text-[10px] uppercase tracking-wider font-extrabold rounded-md">
            {product.badge}
          </span>
          <span className="px-2.5 py-0.5 bg-black/60 border border-white/10 text-white text-[10px] uppercase tracking-wider font-bold rounded-md">
            {product.format}
          </span>
        </div>
        {multiImage && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 bg-black/50 border border-white/10 text-white text-[10px] uppercase tracking-wider font-bold rounded-md">
            {activeImage + 1} / {product.images.length}
          </div>
        )}

        {/* Caption bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8">
          <div className="text-xs font-bold text-white uppercase tracking-widest">
            {currentImage.title}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-white text-black p-3 rounded-full shadow-lg">
            <ExternalLink className="w-5 h-5" />
          </span>
        </div>

        {/* Carousel controls */}
        {multiImage && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all border border-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeImage ? "bg-emerald-400 w-5" : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-7 flex flex-col gap-4">
        <div>
          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">
            {product.type}
          </div>
          <h3 className="text-2xl font-extrabold text-white group-hover:text-emerald-400 transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed">
          {product.description}
        </p>

        {/* Credentials (only if provided) */}
        {product.username && product.password && (
          <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex-1 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                  Username
                </div>
                <div className="font-mono text-sm text-emerald-300 font-semibold mt-0.5">
                  {product.username}
                </div>
              </div>
              <button
                onClick={() => handleCopy("username", product.username!)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                title="Copy username"
              >
                {copied === "username" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex-1 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                  Password
                </div>
                <div className="font-mono text-sm text-emerald-300 font-semibold mt-0.5">
                  {product.password}
                </div>
              </div>
              <button
                onClick={() => handleCopy("password", product.password!)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                title="Copy password"
              >
                {copied === "password" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Live Demo button - bottom of card */}
        <div className="pt-2 mt-auto">
          <a
            href={product.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-black font-bold transition-all shadow-lg shadow-emerald-500/15"
          >
            Visit Live System
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ===== Fullscreen preview modal ===== */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(false)}
          >
            <motion.div
              className="relative w-full max-w-6xl bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-white/5 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="bg-neutral-950 border border-white/5 text-neutral-400 text-[10px] px-8 py-1.5 rounded-lg w-full max-w-md mx-auto truncate font-mono text-center flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>{product.name} — {currentImage.title}</span>
                </div>
                <button
                  onClick={() => setPreviewImage(false)}
                  className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 bg-neutral-900 p-4">
                <div className="relative w-full rounded-lg overflow-hidden border border-white/5">
                  <img
                    src={currentImage.src}
                    alt={currentImage.title}
                    className="w-full h-auto select-none"
                    loading="eager"
                  />
                </div>
                <p className="text-sm text-neutral-400 mt-4 text-center">
                  {currentImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProductsClient() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: "Custom Build",
    message: "",
  });

  const updateForm = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    startTransition(async () => {
      const res = await sendProductRequest(form);
      if (res.success) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          company: "",
          phone: "",
          product: "Custom Build",
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setErrorMsg(res.error || "Failed to send request. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-black">
      {/* Static grid background with a subtle top radial highlight */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-emerald-500/10 to-transparent rounded-full blur-[120px] z-0 pointer-events-none" />

      <NavBar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        {/* ===== Header ===== */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs uppercase tracking-widest font-semibold rounded-full">
            Live Systems
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Products{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Built by VertexCore AI
            </span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Explore our live systems — SaaS, cloud, and standalone products. Visit
            each one directly to see it in action.
          </p>
        </motion.div>

        {/* ===== Products ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* ===== CTA Form ===== */}
        <motion.div
          className="relative overflow-hidden bg-gradient-to-br from-emerald-500/15 via-neutral-950 to-neutral-950 border border-emerald-500/20 rounded-3xl p-8 md:p-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {/* subtle texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_40%,transparent_100%)] pointer-events-none" />
          <div className="relative max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 text-black rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
                <Rocket className="w-7 h-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Need a System Built for Your Business?
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Tell us what you need — cloud, standalone, or custom — and
                we&apos;ll build it around your workflow. We&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-neutral-950/50 p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-400">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-neutral-900/80 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-400">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-neutral-900/80 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-400">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => updateForm("company", e.target.value)}
                    placeholder="Your company"
                    className="w-full px-4 py-3 bg-neutral-900/80 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-400">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-neutral-900/80 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-400">
                  Product / Service Needed
                </label>
                <select
                  value={form.product}
                  onChange={(e) => updateForm("product", e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-900/80 border border-white/10 rounded-xl text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                >
                  <option value="VPOS">VPOS</option>
                  <option value="LMS">LMS</option>
                  <option value="ERP">ERP</option>
                  <option value="Custom Build">Custom Build</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-400">
                  Project Details
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => updateForm("message", e.target.value)}
                  placeholder="Tell us more about your project..."
                  className="w-full px-4 py-3 bg-neutral-900/80 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-sm h-32 resize-none"
                />
              </div>

              <div className="pt-2">
                {errorMsg && (
                  <div className="mb-4 text-sm text-rose-400 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                    {errorMsg}
                  </div>
                )}
                {success && (
                  <div className="mb-4 text-sm text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Request sent successfully! We&apos;ll get back to you soon.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-black font-bold transition-all shadow-lg shadow-emerald-500/15 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPending ? "Sending..." : "Send Request"}
                  {!isPending && <Send className="w-4 h-4" />}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
