import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us - Connect with VertexCore AI",
  description:
    "Get in touch with VertexCore AI for your next big project. Email, WhatsApp, or visit us in Kandy. We're ready to transform your ideas into reality.",
  openGraph: {
    title: "Contact VertexCore AI - Let's Talk Innovation",
    description:
      "Reach out to our team of experts for AI and software engineering consulting.",
    url: "https://vertexcore.ai/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
