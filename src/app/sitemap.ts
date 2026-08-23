import type { MetadataRoute } from "next";
import { getAllFarms } from "@/lib/farms";

const siteUrl = "https://theysix.ro-mihaiu.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/about", "/socials", "/server", "/server/about", "/server/events",
    "/server/rules", "/server/staff", "/bot/about", "/bot/commands", "/bot/terms",
    "/bot/tos", "/cookies", "/privacy", "/terms", "/tos",
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const farmRoutes = getAllFarms().map((farm) => ({
    url: `${siteUrl}/farm/${farm.category}/${farm.normalizedDn}`,
    lastModified: farm.date ? new Date(farm.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...farmRoutes];
}