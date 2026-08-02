import { Metadata } from "next";
import VposClient from "@/components/VposClient";

export const metadata: Metadata = {
  title: "VPOS - Point of Sale Software - VertexCore AI",
  description:
    "VPOS is a fully-featured, cloud-based Point of Sale platform with real-time inventory, multi-location support, full accounting, and payroll.",
  openGraph: {
    title: "VPOS - Point of Sale Software - VertexCore AI",
    description:
      "Cloud-based POS with real-time inventory, multi-location support, full accounting, and payroll.",
    url: "https://vertexcore.ai/products/pos/vpos",
  },
};

export default function VposPage() {
  return <VposClient />;
}
