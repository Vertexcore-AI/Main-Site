import { Metadata } from "next";
import ServicesClient from "@/components/ServicesClient";

export const metadata: Metadata = {
  title: "Our Services - AI & Software Engineering Solutions",
  description:
    "Explore our range of digital services including AI-powered software, enterprise engineering, web and mobile development, and e-commerce solutions.",
  openGraph: {
    title: "VertexCore AI Services - Innovative Technology Solutions",
    description:
      "Cutting-edge software development and AI integration services for modern businesses.",
    url: "https://vertexcore.ai/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
