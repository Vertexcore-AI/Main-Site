"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  interface NavItem {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }

  const navItems: NavItem[] = [
    { name: "Services", href: "/services" },
    { name: t("Case Studies"), href: "/case-studies" },
    { name: t("nav.process"), href: "/process" },
    { name: t("nav.support"), href: "/support" },
    { name: "Projects", href: "/projects" },
    { name: t("nav.portfolio"), href: "/live-sites" },
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
