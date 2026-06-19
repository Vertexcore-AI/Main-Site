import { Metadata } from "next";
import SolutionsClient from "@/components/SolutionsClient";

export const metadata: Metadata = {
  title: "AI Solutions for FinTech, Healthcare & Manufacturing",
  description:
    "Specialized AI solutions tailored for FinTech, Healthcare, Retail, and Manufacturing. Transform your industry with intelligent enterprise-grade AI.",
  openGraph: {
    title:
      "VertexCore AI Solutions - Industry-Specific Artificial Intelligence",
    description:
      "Deep domain knowledge and cutting-edge AI for specialized industrial challenges.",
    url: "https://vertexcore.ai/solutions",
  },
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}
