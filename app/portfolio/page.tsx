import { Metadata } from "next";
import PortfolioClient from "@/components/PortfolioClient";

export const metadata: Metadata = {
  title: "Success Stories & Case Studies - VertexCore AI Portfolio",
  description:
    "Explore our portfolio of successful projects including IoT smart tracking, AI chat platforms, healthcare tech, and more success stories from VertexCore AI.",
  openGraph: {
    title: "VertexCore AI Portfolio - Showcasing Digital Excellence",
    description:
      "A deep dive into the revolutionary solutions we've built for our clients worldwide.",
    url: "https://vertexcore.ai/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
