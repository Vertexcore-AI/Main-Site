"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "./image-placeholder";

const businessTypes = [
  {
    name: "Super Markets",
    description:
      "Handle high-volume checkout and multi-aisle stock with barcode scanning and real-time inventory sync.",
  },
  {
    name: "Groceries",
    description:
      "Track fast-moving stock and expiry dates so shelves stay full and nothing goes to waste.",
  },
  {
    name: "Pharmacies",
    description:
      "Batch and expiry tracking built in, so every dispensed item is traceable back to its source.",
  },
  {
    name: "Fashion & Textiles",
    description:
      "Manage size and variant-heavy inventory across every location from one dashboard.",
  },
  {
    name: "Specialty & Boutique Stores",
    description:
      "A checkout flow fast enough for a single till, with reporting that scales as you grow.",
  },
  {
    name: "Retail Shops",
    description:
      "Everything a general retail counter needs — sales, stock, and staff shifts in one place.",
  },
];

export interface ProductFeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ProductFeatureRow {
  title: string;
  description: string;
  points: string[];
  image?: { src: string; alt: string; wide?: boolean };
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export function ProductHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
  image?: { src: string; alt: string };
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs uppercase tracking-widest font-semibold rounded-full mb-5">
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-5">
            {title}
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed mb-8 max-w-xl">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={primaryCta.href}
              target={primaryCta.external ? "_blank" : undefined}
              rel={primaryCta.external ? "noopener noreferrer" : undefined}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold transition-colors"
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </a>
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                target={secondaryCta.external ? "_blank" : undefined}
                rel={secondaryCta.external ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-white/15 text-white hover:bg-white/5 font-semibold transition-colors"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {image ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <ImagePlaceholder className="aspect-[4/3] w-full" />
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function ProductFeatureGrid({
  title,
  cards,
}: {
  title: string;
  cards: ProductFeatureCard[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      <motion.h2
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-extrabold text-white text-center mb-12"
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-neutral-950 border border-white/10 rounded-2xl p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              {card.icon}
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ProductBusinessTypes({
  image,
}: {
  image?: { src: string; alt: string };
}) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="bg-neutral-950 border border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        <div className="p-6 md:p-8">
          <p className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase mb-5">
            Built For Every Business
          </p>
          <ul className="flex flex-col gap-2">
            {businessTypes.map((type, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={type.name}>
                  <button
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                    className={`w-full text-left rounded-2xl px-4 transition-colors duration-200 ${
                      isActive
                        ? "bg-emerald-500/10 border border-emerald-500/20 py-4"
                        : "border border-transparent py-2.5 hover:bg-white/5"
                    }`}
                  >
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        isActive ? "text-white" : "text-neutral-300"
                      }`}
                    >
                      {type.name}
                    </span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-neutral-400 leading-relaxed mt-2 mb-3">
                            {type.description}
                          </p>
                          <Link
                            href="/consultation"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Explore {type.name}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative min-h-[320px] md:min-h-0">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="p-8 h-full flex items-center">
              <ImagePlaceholder className="aspect-video w-full" />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export function ProductFeatureRows({ rows }: { rows: ProductFeatureRow[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 flex flex-col gap-20">
      {rows.map((row, i) => {
        const imageFirst = i % 2 === 1;
        const wide = row.image?.wide;
        return (
          <div
            key={row.title}
            className={`grid grid-cols-1 gap-10 items-center ${
              wide ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" : "lg:grid-cols-2"
            }`}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className={imageFirst ? "lg:order-2" : ""}
            >
              <h3 className="text-2xl font-extrabold text-white mb-4">
                {row.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-5">
                {row.description}
              </p>
              <ul className="flex flex-col gap-2.5">
                {row.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-neutral-300"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={imageFirst ? "lg:order-1" : ""}
            >
              {row.image ? (
                <div
                  className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 ${
                    wide ? "aspect-[16/10] p-3" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={row.image.src}
                    alt={row.image.alt}
                    fill
                    sizes={wide ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 50vw"}
                    className={wide ? "object-contain" : "object-cover object-top"}
                  />
                </div>
              ) : (
                <ImagePlaceholder className="aspect-[4/3] w-full" />
              )}
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}

export function ProductCta({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="bg-emerald-500 rounded-3xl p-10 md:p-14 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
          {title}
        </h2>
        <p className="text-black/70 max-w-xl mx-auto mb-8">{description}</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-black text-white font-bold hover:bg-neutral-900 transition-colors"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}

export function ProductFaq({ items }: { items: ProductFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-28 relative z-10">
      <motion.h2
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-extrabold text-white text-center mb-10"
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.question}
              className="bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm text-neutral-400 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
