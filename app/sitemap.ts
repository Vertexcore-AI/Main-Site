import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vertexcore.ai";
  const lastModified = new Date();

  const routes = [
    "",
    "/services",
    "/solutions",
    "/portfolio",
    "/case-studies",
    "/consultation",
    "/contact",
    "/support",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
