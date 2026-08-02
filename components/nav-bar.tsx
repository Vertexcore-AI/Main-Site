"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const businessTypes = [
  "Super Markets",
  "Groceries",
  "Pharmacies",
  "Fashion & Textiles",
  "Specialty & Boutique Stores",
  "Retail Shops",
];

const posProducts = [
  {
    name: "VPOS",
    description: "Fully-featured POS software for retail businesses",
    href: "/products/pos/vpos",
  },
  {
    name: "VPOS Express",
    description:
      "Offline POS software, simplified design for small-scale retail business",
    href: "/products/pos/vpos-express",
  },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!productsOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [productsOpen]);

  interface NavItem {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }

  const navItems: NavItem[] = [
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Support", href: "/support" },
    { name: "Contact Us", href: "/contact" },
  ];



  return (
    <motion.nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 transition-all duration-300 rounded-full border backdrop-blur-md px-6 md:px-8 py-2 ${
        scrolled
          ? "bg-black/75 border-white/10 shadow-lg shadow-black/40"
          : "bg-black/30 border-white/5 shadow-md shadow-black/10"
      }`}
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 overflow-visible"
          >
            <div className="overflow-visible">
              <Image
                src="/images/newlogo-old.png"
                alt="VertexCore AI"
                width={400}
                height={200}
                priority
                className="h-12 w-auto object-contain scale-[1.8] origin-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setProductsOpen((open) => !open)}
                className={`flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 ${
                  productsOpen || pathname.startsWith("/products")
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-gray-300 hover:text-white border border-transparent"
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProductsOpen(false)}
                    />
                    <motion.div
                      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[560px] bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-[200px_1fr]">
                        <div className="p-6 border-r border-white/5">
                          <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase mb-3">
                            Business Types
                          </p>
                          <ul className="space-y-1">
                            {businessTypes.map((type) => (
                              <li
                                key={type}
                                className="text-sm text-gray-300 px-2 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors cursor-default"
                              >
                                {type}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6">
                          <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase mb-3">
                            Point of Sale (POS)
                          </p>
                          <div className="space-y-1">
                            {posProducts.map((product) => (
                              <Link
                                key={product.name}
                                href={product.href}
                                onClick={() => setProductsOpen(false)}
                                className="block px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <p className="text-sm font-semibold text-white">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {product.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-gray-300 hover:text-white border border-transparent"
                }`}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {/* Right side items - Desktop (LanguageSelector and Corporate Login removed) */}
          </div>

          {/* Mobile menu button and Free Consultation */}
          <div className="lg:hidden flex items-center space-x-3">
            <Link href="/consultation">
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium text-xs px-3 py-1.5 rounded-full h-8"
              >
                <Zap className="w-3 h-3 mr-1" />
                Free
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/5 transition-all"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Floating Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden absolute top-[calc(100%+12px)] left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <button
                    onClick={() => setMobileProductsOpen((open) => !open)}
                    className={`w-full flex items-center justify-between text-sm font-semibold px-4 py-2.5 rounded-2xl transition-all duration-200 ${
                      pathname.startsWith("/products")
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-gray-300 hover:text-white border border-transparent"
                    }`}
                  >
                    <span>Products</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-1 pl-4">
                          <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase mb-2">
                            Business Types
                          </p>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                            {businessTypes.map((type) => (
                              <span key={type} className="text-xs text-gray-400">
                                {type}
                              </span>
                            ))}
                          </div>
                          <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase mb-2">
                            Point of Sale (POS)
                          </p>
                          <div className="flex flex-col gap-1">
                            {posProducts.map((product) => (
                              <Link
                                key={product.name}
                                href={product.href}
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileProductsOpen(false);
                                }}
                                className="px-2 py-2 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <p className="text-sm font-semibold text-white">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {product.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={`flex items-center space-x-2 text-sm font-semibold px-4 py-2.5 rounded-2xl transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-gray-300 hover:text-white border border-transparent"
                    }`}
                  >
                    {item.icon && <span className="mr-1">{item.icon}</span>}
                    <span>{item.name}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/5">
                  <Link
                    href="/consultation"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-2xl py-5">
                      <Zap className="w-4 h-4 mr-2" />
                      Free Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
