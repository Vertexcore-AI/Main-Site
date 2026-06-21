import { Metadata } from "next";
import PortfolioClient from "@/components/PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio - VertexCore AI",
  description:
    "Explore our portfolio spanning Beauty & Wellness, Hospitality & Food Service, Construction & Engineering, and Retail & Home Improvement.",
  openGraph: {
    title: "VertexCore AI Portfolio",
    description:
      "Showcasing our work across four key industry verticals.",
    url: "https://vertexcore.ai/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
