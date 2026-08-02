"use client";

import {
  Boxes,
  Building2,
  Calculator,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import {
  ProductHero,
  ProductFeatureGrid,
  ProductBusinessTypes,
  ProductFeatureRows,
  ProductCta,
  ProductFaq,
} from "@/components/product-page/sections";

const DEMO_URL = "https://vpos.demo.vertexcoreai.com/tenant/demo";

export default function VposClient() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      <NavBar />

      <ProductHero
        title="A Fully-Featured POS Built for Growing Retail"
        description="VPOS runs your sales, inventory, accounting, and payroll from one cloud dashboard — with real-time stock control across every location you operate."
        primaryCta={{ label: "Visit Live Demo", href: DEMO_URL, external: true }}
        secondaryCta={{ label: "Request a Demo", href: "/consultation" }}
        image={{
          src: "/images/SAAS/Vpos/VPOS_Hero.png",
          alt: "VPOS dashboard and inventory screens on desktop and tablet",
        }}
      />

      <ProductFeatureGrid
        title="Why Choose VPOS"
        cards={[
          {
            icon: <Boxes className="w-5 h-5" />,
            title: "Real-Time Inventory",
            description:
              "FIFO stock allocation with batch and expiry tracking, so every sale pulls from the right stock automatically.",
          },
          {
            icon: <Building2 className="w-5 h-5" />,
            title: "Multi-Location Ready",
            description:
              "Run one dashboard across every branch, with stock and sales visibility for the whole business.",
          },
          {
            icon: <Calculator className="w-5 h-5" />,
            title: "Full Accounting",
            description:
              "Double-entry bookkeeping with automatic journal entries, P&L, balance sheet, and general ledger.",
          },
          {
            icon: <ShieldCheck className="w-5 h-5" />,
            title: "Role-Based Access",
            description:
              "Granular permissions per role — cashier, manager, accountant — so staff only see what they need.",
          },
          {
            icon: <Sparkles className="w-5 h-5" />,
            title: "AI-Powered Insights",
            description:
              "Built-in AI helps you spot sales trends, flag low-stock risk, and surface answers from your own business data.",
          },
        ]}
      />

      <ProductBusinessTypes
        image={{
          src: "/images/SAAS/Vpos/Hmart.jpeg",
          alt: "VPOS running at a live retail store checkout counter",
        }}
      />

      <ProductFeatureRows
        rows={[
          {
            title: "Smart Checkout & Shift Management",
            description:
              "A fast checkout flow backed by proper shift tracking, so every cashier's till reconciles at the end of the day.",
            points: [
              "Multi-item sales with saved/held carts",
              "Cash, card, and credit payment methods",
              "Clock in/out with opening cash and cash reconciliation",
            ],
            image: {
              src: "/images/SAAS/Vpos/Section_2.png",
              alt: "VPOS checkout screen with shopping cart and payment details",
              wide: true,
            },
          },
          {
            title: "Inventory & Batch Tracking",
            description:
              "Stock is tracked at the batch level, so you always know what's expiring and what's running low.",
            points: [
              "FIFO cost allocation across batches",
              "Expiry date tracking with low-stock alerts",
              "Good Receive Notes tied to supplier records",
            ],
            image: {
              src: "/images/SAAS/Vpos/Section_3.png",
              alt: "VPOS stock management table with batch numbers and quantities",
            },
          },
          {
            title: "Accounting & Payroll",
            description:
              "Sales, purchases, and payroll post to the ledger automatically — no manual re-entry into a separate accounting tool.",
            points: [
              "Automatic journal entries from every transaction",
              "Shift-based payroll with EPF/ETF calculations",
              "Income statement, balance sheet, and trial balance reports",
            ],
          },
          {
            title: "AI Built Into the Workflow",
            description:
              "VPOS uses AI to turn your sales and stock data into answers, not just reports — so decisions happen faster.",
            points: [
              "Sales trend and demand insights from your own data",
              "Early low-stock and reorder risk flags",
              "Ask questions about your business in plain language",
            ],
          },
        ]}
      />

      <ProductCta
        title="Ready to Run Your Business on VPOS?"
        description="Try the live demo or talk to us about rolling VPOS out across your locations."
        ctaLabel="Request a Demo"
        ctaHref="/consultation"
      />

      <ProductFaq
        items={[
          {
            question: "Can I use VPOS across multiple locations?",
            answer:
              "Yes. VPOS is built for multi-location retail — stock, sales, and reporting are visible across every branch from one dashboard.",
          },
          {
            question: "Does VPOS handle accounting, or do I need separate software?",
            answer:
              "VPOS includes full double-entry accounting. Sales, purchases, and payroll automatically create journal entries, so you get real financial statements without a separate accounting package.",
          },
          {
            question: "Does VPOS support payroll?",
            answer:
              "Yes, including shift-based hour calculation, overtime, and statutory EPF/ETF deductions.",
          },
          {
            question: "Can I control what each staff member sees?",
            answer:
              "Every route and action is permission-gated by role, so cashiers, managers, and accountants only see the modules relevant to them.",
          },
        ]}
      />

      <Footer />
    </div>
  );
}
