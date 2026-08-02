import { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "Products - VertexCore AI",
  description:
    "Explore VertexCore AI's SaaS products. VPOS is a cloud-based Point of Sale & Inventory Management platform with a live demo.",
  openGraph: {
    title: "VertexCore AI Products - VPOS SaaS",
    description:
      "VPOS - Cloud-based Point of Sale & Inventory Management. Try the live demo.",
    url: "https://vertexcore.ai/live-sites",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
