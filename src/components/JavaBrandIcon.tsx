import React from "react";
import { FaJava } from "react-icons/fa6";

interface JavaBrandIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function JavaBrandIcon({ className, size = 16, ...props }: JavaBrandIconProps) {
  return <FaJava {...props} aria-hidden="true" className={className} size={size} />;
}
