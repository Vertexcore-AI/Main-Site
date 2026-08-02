import { Metadata } from "next";
import VposExpressClient from "@/components/VposExpressClient";

export const metadata: Metadata = {
  title: "VPOS Express - Offline POS Software - VertexCore AI",
  description:
    "VPOS Express is a lightweight, offline-first desktop POS built for small-scale retail businesses.",
  openGraph: {
    title: "VPOS Express - Offline POS Software - VertexCore AI",
    description:
      "Lightweight, offline-first desktop POS built for small-scale retail businesses.",
    url: "https://vertexcore.ai/products/pos/vpos-express",
  },
};

export default function VposExpressPage() {
  return <VposExpressClient />;
}
