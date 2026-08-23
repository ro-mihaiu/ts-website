import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getFarmByCategoryAndDn, getAllFarms } from "@/lib/farms";
import { FarmDetailView } from "@/components/FarmDetailView";

interface FarmPageProps {
  params: {
    category: string;
    dn: string;
  };
}

export async function generateStaticParams() {
  const farms = getAllFarms();
  const set = new Set<string>();
  const params: { category: string; dn: string }[] = [];

  farms.forEach((farm) => {
    const keys = [farm.dn, `${farm.dn}-dn`, farm.normalizedDn];
    for (const k of keys) {
      if (k && !set.has(`${farm.category}/${k.toLowerCase()}`)) {
        set.add(`${farm.category}/${k.toLowerCase()}`);
        params.push({ category: farm.category, dn: k });
      }
    }
  });

  return params;
}

export async function generateMetadata({ params }: FarmPageProps): Promise<Metadata> {
  const farm = getFarmByCategoryAndDn(params.category, params.dn);
  if (!farm) {
    return {
      title: "Farm Not Found | TheySix",
    };
  }

  const categoryName = farm.category === "build" ? "Build" : farm.category === "java" ? "Java Edition" : "Bedrock Edition";

  return {
    title: `${farm.title} (${categoryName}) | TheySix Minecraft Farms`,
    description: farm.description,
    alternates: {
      canonical: `/farm/${farm.category}/${farm.normalizedDn}`,
    },
    openGraph: {
      title: `${farm.title} - TheySix Minecraft Farm`,
      description: farm.description,
      images: [farm.resolvedThumbnail],
    },
  };
}

export default function FarmDetailPage({ params }: FarmPageProps) {
  const farm = getFarmByCategoryAndDn(params.category, params.dn);

  if (!farm) {
    notFound();
  }

  const allFarms = getAllFarms();

  // Find related farms (same category or farmType, excluding current)
  const relatedFarms = allFarms
    .filter(
      (f) =>
        f.dn !== farm.dn &&
        (f.category === farm.category || f.farmType === farm.farmType)
    )
    .slice(0, 3);

  return <FarmDetailView farm={farm} relatedFarms={relatedFarms} />;
}
