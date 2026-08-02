"use client";

import {
  WifiOff,
  Printer,
  Scale,
  CloudUpload,
  Zap,
  PackageSearch,
  HardDrive,
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

export default function VposExpressClient() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      <NavBar />

      <ProductHero
        eyebrow="Point of Sale · Desktop"
        title="A Simple, Offline POS for Small-Scale Business"
        description="VPOS Express is a lightweight desktop app that runs entirely on your PC — no internet required, no monthly cloud dependency, just fast checkout built for small stores."
        primaryCta={{ label: "Request a Demo", href: "/consultation" }}
      />

      <ProductFeatureGrid
        title="Why Choose VPOS Express"
        cards={[
          {
            icon: <WifiOff className="w-5 h-5" />,
            title: "Works Fully Offline",
            description:
              "Runs on a local database on your PC — sell all day with no internet connection required.",
          },
          {
            icon: <Printer className="w-5 h-5" />,
            title: "Thermal Receipt Printing",
            description:
              "Print receipts directly to standard USB thermal printers, no extra setup needed.",
          },
          {
            icon: <Scale className="w-5 h-5" />,
            title: "Weighted & Barcode Pricing",
            description:
              "Scan barcodes or sell by weight for loose items like rice or produce, priced accurately every time.",
          },
          {
            icon: <CloudUpload className="w-5 h-5" />,
            title: "Optional Cloud Backup",
            description:
              "Back up locally by default, or connect Google Drive when you want an off-site copy.",
          },
        ]}
      />

      <ProductBusinessTypes />

      <ProductFeatureRows
        rows={[
          {
            title: "Fast Offline Checkout",
            description:
              "Scan or search products, apply line or bill discounts, and hold bills to resume later — all without waiting on a network connection.",
            points: [
              "Barcode scan or search-based checkout",
              "Hold and resume bills",
              "PIN-gated discounts per staff permission",
            ],
          },
          {
            title: "Stock & Low-Stock Alerts",
            description:
              "Every stock change is logged, so you always have an audit trail alongside simple low-stock visibility.",
            points: [
              "Product, category, and brand management",
              "Weighted and unit-based stock tracking",
              "Low-stock threshold alerts",
            ],
          },
          {
            title: "Local + Cloud Backup",
            description:
              "Your data lives locally by default. Connect Google Drive when you want an automatic off-site backup as well.",
            points: [
              "Local backups with no configuration needed",
              "Optional Google Drive sync",
              "Full backup history log",
            ],
          },
        ]}
      />

      <ProductCta
        title="Ready for a POS That Just Works?"
        description="No servers, no subscriptions to manage — just fast, offline checkout for your store."
        ctaLabel="Request a Demo"
        ctaHref="/consultation"
      />

      <ProductFaq
        items={[
          {
            question: "Does VPOS Express need an internet connection?",
            answer:
              "No. It runs entirely offline on a local database on your PC. An internet connection is only needed if you choose to enable optional Google Drive backup.",
          },
          {
            question: "What printers does it support?",
            answer:
              "Standard USB thermal receipt printers work out of the box for printing bills.",
          },
          {
            question: "Can I sell items by weight, like rice or produce?",
            answer:
              "Yes, VPOS Express supports weighted pricing alongside standard barcode/unit pricing.",
          },
          {
            question: "How is my data backed up?",
            answer:
              "Backups are stored locally by default. You can optionally connect Google Drive for an automatic off-site copy whenever you're online.",
          },
        ]}
      />

      <Footer />
    </div>
  );
}
