import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/corporate-login/"],
    },
    sitemap: "https://vertexcore.ai/sitemap.xml",
  };
}
