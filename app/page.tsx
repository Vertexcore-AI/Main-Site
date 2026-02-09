import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "VertexCore AI - Transforming Ideas into Digital Solutions",
  description:
    "Transforming ideas into powerful digital solutions that drive growth and innovation for forward-thinking businesses. Specializing in AI, Web, and Mobile development.",
  openGraph: {
    title: "VertexCore AI - Digital Transformation & AI Solutions",
    description:
      "Expert software engineering and AI-driven solutions for your business.",
    url: "https://vertexcore.ai",
  },
};

export default function Home() {
  return <HomeClient />;
}
