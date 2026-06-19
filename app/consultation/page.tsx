import { Metadata } from "next";
import ConsultationClient from "@/components/ConsultationClient";

export const metadata: Metadata = {
  title: "Book a Strategic Consultation - VertexCore AI",
  description:
    "Take the first step towards digital transformation. Schedule a consultation with our AI and software engineering experts to discuss your project.",
  openGraph: {
    title: "Strategic AI Consultation - VertexCore AI",
    description:
      "Personalized technology strategy session for startups and enterprises.",
    url: "https://vertexcore.ai/consultation",
  },
};

export default function ConsultationPage() {
  return <ConsultationClient />;
}
