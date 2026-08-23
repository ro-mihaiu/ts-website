import React from "react";
import { Box } from "lucide-react";
import type { FarmCategory } from "@/types/farm";
import { JavaBrandIcon } from "@/components/JavaBrandIcon";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * Relevant icon for Java Edition.
 */
export function JavaIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return <JavaBrandIcon className={className} {...props} />;
}

/**
 * Relevant icon for Bedrock Edition (Bedrock Block / Cube)
 */
export function BedrockIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return <Box className={className} {...props} />;
}

interface CategoryIconProps extends IconProps {
  category: FarmCategory | string;
}

/**
 * Dynamic Category Icon based on category name
 */
export function CategoryIcon({ category, className, ...props }: CategoryIconProps) {
  const isJava = category.toLowerCase() === "java";
  if (isJava) {
    return <JavaIcon className={className} {...props} />;
  }
  return <BedrockIcon className={className} {...props} />;
}
