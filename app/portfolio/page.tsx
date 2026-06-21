import { Metadata } from "next";
import PortfolioClient from "@/components/PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio - VertexCore AI",
  description:
    "Explore our portfolio of ready-to-deploy website templates spanning Hospitality, Beauty & Wellness, Medical, Retail, Fitness, Travel, and Engineering industries.",
  openGraph: {
    title: "VertexCore AI Portfolio",
    description:
      "Showcasing our premium website templates across key industry verticals.",
    url: "https://vertexcore.ai/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
